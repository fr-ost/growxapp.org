import { cloneElement, createElement, Fragment, isValidElement, type ReactElement, type ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { NextRequest } from "next/server";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ---------- mocks: Supabase client, session registration, Next request APIs
const exchangeCodeForSession = vi.fn();
const signOut = vi.fn(async () => ({ error: null }));
const signInWithOAuth = vi.fn();
const initialize = vi.fn(async () => ({ error: null }));
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({ auth: { exchangeCodeForSession, signOut, signInWithOAuth, initialize } }),
}));
const registerWebSession = vi.fn(async () => true);
vi.mock("@/lib/session/web", () => ({ registerWebSession: (...a: unknown[]) => registerWebSession(...(a as [])) }));
const redirect = vi.fn((url: string) => {
  throw new Error(`REDIRECT:${url}`);
});
vi.mock("next/navigation", () => ({ redirect: (u: string) => redirect(u) }));
let requestHost = "www.growxapp.org";
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ host: requestHost, "x-forwarded-proto": "https" }),
  cookies: async () => ({ getAll: () => [], get: () => undefined, set: () => undefined }),
}));
let currentUser: unknown = null;
vi.mock("@/lib/supabase/user", () => ({
  getCurrentUser: async () => currentUser,
  getAuthState: async () => ({ user: currentUser, status: currentUser ? "active" : "signed_out" }),
}));

// Supabase's public auth settings, as GET /auth/v1/settings returns them.
let googleEnabled: boolean | "error" = true;
const fetchMock = vi.fn(async (url: string | URL, init?: RequestInit) => {
  void init;
  if (!String(url).endsWith("/auth/v1/settings")) throw new Error(`unexpected fetch ${String(url)}`);
  if (googleEnabled === "error") throw new Error("network down");
  return new Response(JSON.stringify({ external: { email: true, google: googleEnabled } }), { status: 200, headers: { "content-type": "application/json" } });
});

const flow = await import("@/lib/auth/flow");
const { safeNextPath } = await import("@/lib/validation/auth");
const { loginNotice } = await import("@/lib/auth/messages");
const { GET: callback } = await import("@/app/auth/callback/route");
const { googleAction } = await import("@/app/login/actions");
const { GoogleButton } = await import("@/components/google-button");
const { default: LoginPage } = await import("@/app/login/page");
const { default: SignupPage } = await import("@/app/signup/page");

const iso = (msAgo: number) => new Date(Date.now() - msAgo).toISOString();
const googleUser = (createdMsAgo: number, identity?: { created: number; last: number }, lastSignInMsAgo?: number) => ({
  id: "11111111-1111-4111-8111-111111111111",
  email: "new.person@gmail.com",
  created_at: iso(createdMsAgo),
  last_sign_in_at: lastSignInMsAgo === undefined ? undefined : iso(lastSignInMsAgo),
  app_metadata: { provider: "google", providers: ["google"] },
  identities: identity ? [{ provider: "google", created_at: iso(identity.created), last_sign_in_at: iso(identity.last) }] : undefined,
});
const passwordFirstUser = {
  id: "22222222-2222-4222-8222-222222222222",
  email: "member@example.com",
  created_at: "2026-03-01T10:00:00Z",
  app_metadata: { provider: "email", providers: ["email", "google"] },
};
const session = { access_token: "a.b.c", refresh_token: "r" };

beforeEach(() => {
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://zyzfufifzitjmwxfqbqx.supabase.co";
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_test";
  googleEnabled = true;
  requestHost = "www.growxapp.org";
  currentUser = null;
  vi.stubGlobal("fetch", fetchMock);
  for (const m of [exchangeCodeForSession, signOut, signInWithOAuth, initialize, registerWebSession, redirect, fetchMock]) m.mockClear();
  registerWebSession.mockResolvedValue(true);
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("safeNextPath: only same-site relative destinations", () => {
  it("keeps ordinary paths, query strings and fragments", () => {
    for (const ok of ["/dashboard", "/pricing", "/checkout?plan=PRO_MONTHLY", "/blog/twitter-bio-ideas#examples", "/authors", "/apis"]) {
      expect(safeNextPath(ok)).toBe(ok);
    }
    expect(safeNextPath("/café")).toBe("/caf%C3%A9");
  });
  it("refuses anything that could leave the site or loop back into sign-in", () => {
    const bad = [
      "//evil.com",
      "https://evil.com",
      "http:evil.com",
      "/\\evil.com",
      "\\\\evil.com",
      "javascript:alert(1)",
      "/.//evil.com",
      "/./../..//evil.com",
      "/a\nb",
      "/a\tb",
      " /dashboard",
      "/auth/callback?code=x",
      "/AUTH/confirm",
      "/api/entitlement",
      "/api",
      `/${"a".repeat(2100)}`,
      null,
      undefined,
      5,
      {},
    ];
    for (const b of bad) expect(safeNextPath(b), JSON.stringify(b)).toBe("/dashboard");
    // Encoded slashes stay part of the path on this host.
    expect(safeNextPath("/%2F%2Fevil.com")).toBe("/%2F%2Fevil.com");
    expect(safeNextPath("/x", "/reset-password")).toBe("/x");
    expect(safeNextPath("//x", "/reset-password")).toBe("/reset-password");
  });
});

describe("sign-in flow helpers", () => {
  it("login error paths keep a real destination, never the default or a reset page", () => {
    expect(flow.loginErrorPath("google_cancelled", "/pricing")).toBe("/login?error=google_cancelled&next=%2Fpricing");
    expect(flow.loginErrorPath("google_failed")).toBe("/login?error=google_failed");
    expect(flow.loginErrorPath("google_failed", "/dashboard")).toBe("/login?error=google_failed");
    expect(flow.loginErrorPath("link_expired", "/reset-password")).toBe("/login?error=link_expired");
    expect(flow.authPagePath("/signup", "/checkout?plan=PRO_YEARLY")).toBe("/signup?next=%2Fcheckout%3Fplan%3DPRO_YEARLY");
    expect(flow.authPagePath("/login", "/dashboard")).toBe("/login");
    expect(flow.authPagePath("/login")).toBe("/login");
  });

  it("maps Supabase's ?error= parameters to plain-words codes", () => {
    const p = (google: boolean, error: string | null, code: string | null = null, description: string | null = null) =>
      flow.errorFromProviderParams({ google, error, code, description });
    expect(p(true, "access_denied")).toBe("google_cancelled");
    expect(p(true, "access_denied", null, "The user denied the request")).toBe("google_cancelled");
    expect(p(true, "server_error", null, "Unable to exchange external code")).toBe("google_failed");
    expect(p(true, "invalid_request", "flow_state_expired", "Flow state has expired")).toBe("google_expired");
    expect(p(true, "access_denied", "user_banned", "User is banned")).toBe("account_unavailable");
    expect(p(false, "access_denied", "otp_expired", "Email link is invalid or has expired")).toBe("link_expired");
    expect(p(false, "server_error")).toBe("auth_callback");
  });

  it("maps code-exchange errors, telling apart a missing verifier (other browser) from a used or expired code", () => {
    const x = (google: boolean, error: Record<string, unknown> | null, next = "/dashboard") => flow.errorFromExchange({ google, next, error });
    const missing = { name: "AuthPKCECodeVerifierMissingError", code: "pkce_code_verifier_not_found", message: "PKCE code verifier not found in storage." };
    expect(x(true, missing)).toBe("google_other_browser");
    expect(x(true, { code: "flow_state_not_found", message: "invalid flow state, no valid flow state found", status: 404 })).toBe("google_expired");
    expect(x(true, { code: "flow_state_expired", message: "flow state has expired" })).toBe("google_expired");
    expect(x(true, { code: "bad_code_verifier", message: "code challenge does not match previously saved code verifier" })).toBe("google_expired");
    expect(x(true, { code: "unexpected_failure", message: "boom", status: 500 })).toBe("google_failed");
    expect(x(true, null)).toBe("google_failed");
    expect(x(true, { code: "user_banned", message: "User is banned" })).toBe("account_unavailable");
    expect(x(false, missing)).toBe("link_other_browser");
    // a sign-up confirmation finished in a browser that started another sign-in since: the email is confirmed
    expect(x(false, { code: "bad_code_verifier", message: "code challenge does not match previously saved code verifier" })).toBe("link_other_browser");
    expect(x(false, { code: "bad_code_verifier" }, "/reset-password")).toBe("link_expired");
    expect(x(false, missing, "/reset-password")).toBe("reset_other_browser");
    expect(x(false, { code: "flow_state_not_found" }, "/reset-password")).toBe("link_expired");
    expect(x(false, { code: "flow_state_not_found" })).toBe("link_expired");
    expect(x(false, { name: "AuthRetryableFetchError", message: "fetch failed", status: 0 })).toBe("session_failed");
    expect(x(false, { code: "unexpected_failure", status: 503 }, "/reset-password")).toBe("session_failed");
    expect(x(true, { name: "AuthRetryableFetchError", message: "fetch failed", status: 0 })).toBe("google_failed");
  });

  it("counts only a brand-new Google account as a new sign-up", () => {
    const now = Date.now();
    expect(flow.isNewOAuthUser(googleUser(3_000), now)).toBe(true);
    // created at Supabase's callback, first session issued a moment later (what a real first sign-in looks like)
    expect(flow.isNewOAuthUser(googleUser(3_000, { created: 3_000, last: 3_000 }, 1_000), now)).toBe(true);
    // returning: an old account, a second session, or a Google identity that signed in again later
    expect(flow.isNewOAuthUser(googleUser(2 * 86_400_000), now)).toBe(false);
    expect(flow.isNewOAuthUser(googleUser(2 * 60_000, { created: 2 * 60_000, last: 2 * 60_000 }, 0), now)).toBe(false);
    expect(flow.isNewOAuthUser(googleUser(5 * 60_000, { created: 5 * 60_000, last: 1_000 }), now)).toBe(false);
    // Google taking over an unconfirmed email account made minutes earlier: the identity is newer than the account
    expect(flow.isNewOAuthUser(googleUser(3 * 60_000, { created: 1_000, last: 1_000 }), now)).toBe(false);
    // an email account linked to Google keeps "email" as its first provider
    expect(flow.isNewOAuthUser({ ...passwordFirstUser, created_at: iso(1_000) }, now)).toBe(false);
    expect(flow.isNewOAuthUser({ app_metadata: { provider: "google" } }, now)).toBe(false);
    expect(flow.isNewOAuthUser(null, now)).toBe(false);
  });

  it("lists how an account signs in", () => {
    expect(flow.signInMethods({ provider: "email", providers: ["email"] })).toEqual({ password: true, google: false, labels: ["email and password"] });
    expect(flow.signInMethods({ provider: "google", providers: ["google"] })).toEqual({ password: false, google: true, labels: ["Google"] });
    expect(flow.signInMethods({ provider: "email", providers: ["email", "google"] }).labels).toEqual(["email and password", "Google"]);
    expect(flow.signInMethods(null).labels).toEqual(["email and password"]);
    expect(flow.signInMethods({ providers: ["github"] }).labels).toEqual(["Github"]);
    // a Google account that set a password: Supabase keeps providers ["google"], the flag adds the password
    expect(flow.signInMethods({ provider: "google", providers: ["google"] }, { [flow.PASSWORD_SET_FLAG]: true })).toEqual({ password: true, google: true, labels: ["email and password", "Google"] });
    expect(flow.signInMethods({ provider: "google", providers: ["google"] }, { [flow.PASSWORD_SET_FLAG]: "yes" }).password).toBe(false);
  });

  it("has a message for every code, and none for unknown or hostile values", () => {
    const codes = ["auth_callback", "session_replaced", "link_expired", "link_other_browser", "reset_other_browser", "session_failed", "account_unavailable", "google_unavailable", "google_failed", "google_cancelled", "google_expired", "google_other_browser"];
    for (const c of codes) expect(loginNotice(c)?.text, c).toBeTruthy();
    expect(loginNotice("google_cancelled")?.tone).toBe("info");
    expect(loginNotice("link_other_browser")?.tone).toBe("success");
    for (const bad of ["<script>alert(1)</script>", "constructor", "__proto__", "toString", undefined, 7]) expect(loginNotice(bad)).toBeUndefined();
  });
});

describe("/auth/callback", () => {
  const call = (qs: string, origin = "https://www.growxapp.org") => callback(new NextRequest(`${origin}/auth/callback?${qs}`));
  const location = (r: Response) => r.headers.get("location") ?? "";

  it("first Google sign-in: exchanges the code, registers the web session, lands on next, marks the new sign-up", async () => {
    exchangeCodeForSession.mockResolvedValue({ data: { session, user: googleUser(2_000) }, error: null });
    const r = await call("code=abc-123&flow=google&next=%2Fpricing");
    expect(exchangeCodeForSession).toHaveBeenCalledWith("abc-123");
    expect(registerWebSession).toHaveBeenCalledTimes(1);
    expect([r.status, location(r)]).toEqual([307, "https://www.growxapp.org/pricing"]);
    const marker = (r as unknown as { cookies: { get(n: string): { value: string; maxAge?: number; secure?: boolean; path?: string } | undefined } }).cookies.get(flow.NEW_SIGNUP_COOKIE);
    expect(marker).toMatchObject({ value: "google", maxAge: 600, secure: true, path: "/" });
  });

  it("returning Google users and linked email accounts are not counted as new sign-ups", async () => {
    for (const user of [googleUser(3 * 86_400_000), passwordFirstUser]) {
      exchangeCodeForSession.mockResolvedValue({ data: { session, user }, error: null });
      const r = await call("code=abc&flow=google");
      expect(location(r)).toBe("https://www.growxapp.org/dashboard");
      expect(r.headers.get("set-cookie") ?? "").not.toContain(flow.NEW_SIGNUP_COOKIE);
    }
  });

  it("an email link (no flow=google) keeps working and never sets the Google marker", async () => {
    exchangeCodeForSession.mockResolvedValue({ data: { session, user: googleUser(1_000) }, error: null });
    const r = await call("code=abc&next=%2Freset-password");
    expect(location(r)).toBe("https://www.growxapp.org/reset-password");
    expect(r.headers.get("set-cookie") ?? "").not.toContain(flow.NEW_SIGNUP_COOKIE);
  });

  it("?error= from Supabase/Google goes back to sign-in with a readable message, without exchanging anything", async () => {
    const cases: [string, string][] = [
      ["error=access_denied&error_description=The+user+denied+the+request&flow=google&next=%2Fpricing", "/login?error=google_cancelled&next=%2Fpricing"],
      ["error=server_error&error_description=Unable+to+exchange+external+code&flow=google", "/login?error=google_failed"],
      ["error_code=flow_state_expired&flow=google", "/login?error=google_expired"],
      ["error=access_denied&error_code=user_banned&error_description=User+is+banned&flow=google", "/login?error=account_unavailable"],
      ["error=access_denied&error_code=otp_expired", "/login?error=link_expired"],
      ["error=invalid_request", "/login?error=auth_callback"],
    ];
    for (const [qs, to] of cases) {
      const r = await call(qs);
      expect(location(r), qs).toBe(`https://www.growxapp.org${to}`);
    }
    expect(exchangeCodeForSession).not.toHaveBeenCalled();
    expect(registerWebSession).not.toHaveBeenCalled();
  });

  it("a missing code, or no Supabase configuration, is a readable error", async () => {
    expect(location(await call("flow=google&next=%2Fpricing"))).toBe("https://www.growxapp.org/login?error=google_failed&next=%2Fpricing");
    expect(location(await call("next=%2Fpricing"))).toBe("https://www.growxapp.org/login?error=auth_callback&next=%2Fpricing");
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    expect(location(await call("code=abc&flow=google"))).toBe("https://www.growxapp.org/login?error=google_unavailable");
    expect(exchangeCodeForSession).not.toHaveBeenCalled();
  });

  it("an invalid, used or expired code, or a sign-in finished in another browser, is a readable error", async () => {
    const cases: [Record<string, unknown> | null, string][] = [
      [{ code: "flow_state_not_found", message: "invalid flow state, no valid flow state found", status: 404 }, "google_expired"],
      [{ code: "flow_state_expired", message: "flow state has expired", status: 400 }, "google_expired"],
      [{ name: "AuthPKCECodeVerifierMissingError", code: "pkce_code_verifier_not_found", message: "PKCE code verifier not found in storage.", status: 400 }, "google_other_browser"],
      [{ code: "unexpected_failure", message: "boom", status: 500 }, "google_failed"],
      [null, "google_failed"], // no error, but no session either
    ];
    for (const [error, code] of cases) {
      exchangeCodeForSession.mockResolvedValueOnce({ data: { session: null, user: null }, error });
      const r = await call("code=bad&flow=google&next=%2Fpricing");
      expect(location(r)).toBe(`https://www.growxapp.org/login?error=${code}&next=%2Fpricing`);
    }
    expect(registerWebSession).not.toHaveBeenCalled();
  });

  it("a sign-in whose website session cannot be registered is signed out again (device rules always apply)", async () => {
    exchangeCodeForSession.mockResolvedValue({ data: { session, user: googleUser(1_000) }, error: null });
    registerWebSession.mockResolvedValue(false);
    const r = await call("code=abc&flow=google&next=%2Fpricing");
    expect(signOut).toHaveBeenCalledWith({ scope: "local" });
    expect(location(r)).toBe("https://www.growxapp.org/login?error=session_failed&next=%2Fpricing");
    expect(r.headers.get("set-cookie") ?? "").not.toContain(flow.NEW_SIGNUP_COOKIE);
  });

  it("next can never send the browser to another site", async () => {
    exchangeCodeForSession.mockResolvedValue({ data: { session, user: passwordFirstUser }, error: null });
    for (const next of ["//evil.com", "https://evil.com", "/\\evil.com", "/.//evil.com", "javascript:alert(1)", "/api/session", "/auth/callback"]) {
      const r = await call(`code=abc&flow=google&next=${encodeURIComponent(next)}`);
      const to = new URL(location(r));
      expect([to.host, to.pathname], next).toEqual(["www.growxapp.org", "/dashboard"]);
      const e = new URL(location(await call(`error=access_denied&flow=google&next=${encodeURIComponent(next)}`)));
      expect([e.host, e.pathname, e.searchParams.get("next")], next).toEqual(["www.growxapp.org", "/login", null]);
    }
  });

  it("stays on the host that served the callback (preview deployments)", async () => {
    exchangeCodeForSession.mockResolvedValue({ data: { session, user: passwordFirstUser }, error: null });
    const r = await call("code=abc&flow=google&next=%2Fpricing", "https://growx-git-feature-acme.vercel.app");
    expect(location(r)).toBe("https://growx-git-feature-acme.vercel.app/pricing");
  });

  it("logs outcomes without the code, email or user id", async () => {
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    exchangeCodeForSession.mockResolvedValueOnce({ data: { session, user: googleUser(1_000) }, error: null });
    await call("code=secret-code-value&flow=google");
    exchangeCodeForSession.mockResolvedValueOnce({ data: { session: null, user: null }, error: { code: "flow_state_not_found", message: "x" } });
    await call("code=secret-code-value&flow=google");
    const out = log.mock.calls.map((c) => String(c[0])).join("\n");
    log.mockRestore();
    expect(out).toContain('"event":"google_sign_in"');
    expect(out).toContain('"event":"auth_callback_failed"');
    for (const secret of ["secret-code-value", "new.person@gmail.com", "11111111-1111"]) expect(out).not.toContain(secret);
  });
});

describe("googleAction (Continue with Google)", () => {
  const form = (next?: string) => {
    const f = new FormData();
    if (next !== undefined) f.set("next", next);
    return f;
  };
  const AUTHORIZE = "https://zyzfufifzitjmwxfqbqx.supabase.co/auth/v1/authorize?provider=google";

  it("starts Supabase OAuth with a callback on this host, next and flow=google, and always shows the account chooser", async () => {
    signInWithOAuth.mockResolvedValue({ data: { provider: "google", url: AUTHORIZE }, error: null });
    await expect(googleAction(form("/pricing"))).rejects.toThrow(`REDIRECT:${AUTHORIZE}`);
    expect(signInWithOAuth).toHaveBeenCalledWith({
      provider: "google",
      options: { redirectTo: "https://www.growxapp.org/auth/callback?next=%2Fpricing&flow=google", queryParams: { prompt: "select_account" } },
    });
    // the client has finished reading this browser's cookies before the PKCE verifier is stored
    expect(initialize.mock.invocationCallOrder[0]).toBeLessThan(signInWithOAuth.mock.invocationCallOrder[0]);
    const [url, init] = fetchMock.mock.calls[0];
    expect(String(url)).toBe("https://zyzfufifzitjmwxfqbqx.supabase.co/auth/v1/settings");
    expect((init?.headers as Record<string, string>).apikey).toBe("sb_publishable_test");
  });

  it("works on preview deployments and drops unsafe destinations", async () => {
    requestHost = "growx-git-feature-acme.vercel.app";
    signInWithOAuth.mockResolvedValue({ data: { url: AUTHORIZE }, error: null });
    await expect(googleAction(form("//evil.com"))).rejects.toThrow("REDIRECT:");
    expect(signInWithOAuth.mock.calls[0][0].options.redirectTo).toBe("https://growx-git-feature-acme.vercel.app/auth/callback?next=%2Fdashboard&flow=google");
  });

  it("refuses when Google is not enabled in Supabase (or the check fails), keeping next", async () => {
    for (const state of [false, "error"] as const) {
      googleEnabled = state;
      await expect(googleAction(form("/pricing"))).rejects.toThrow("REDIRECT:/login?error=google_unavailable&next=%2Fpricing");
    }
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    await expect(googleAction(form())).rejects.toThrow("REDIRECT:/login?error=google_unavailable");
    expect(signInWithOAuth).not.toHaveBeenCalled();
  });

  it("a Supabase error while starting is a readable error", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => undefined);
    signInWithOAuth.mockResolvedValue({ data: { provider: "google", url: null }, error: { code: "validation_failed", status: 400, message: "Unsupported provider" } });
    await expect(googleAction(form("/pricing"))).rejects.toThrow("REDIRECT:/login?error=google_failed&next=%2Fpricing");
    err.mockRestore();
  });
});

/** Renders a server-component tree: async components (the Google button) are awaited first. */
async function resolveTree(node: ReactNode): Promise<ReactNode> {
  if (Array.isArray(node)) return Promise.all(node.map(resolveTree));
  if (!isValidElement(node)) return node;
  const el = node as ReactElement<{ children?: ReactNode }>;
  if (typeof el.type === "function" && el.type.constructor.name === "AsyncFunction") {
    return resolveTree(await (el.type as (p: unknown) => Promise<ReactNode>)(el.props));
  }
  if (el.props && "children" in el.props) return cloneElement(el, { children: await resolveTree(el.props.children) });
  return el;
}
const html = async (node: ReactNode) => renderToStaticMarkup(createElement(Fragment, null, await resolveTree(node)));

describe("the Continue with Google button", () => {
  it("renders with the official G mark, the right text, an 'or' divider and the destination", async () => {
    const out = await html(await GoogleButton({ next: "/pricing" }));
    expect(out).toContain('data-testid="google-sign-in"');
    expect(out).toContain("Continue with Google");
    for (const c of ["#EA4335", "#4285F4", "#FBBC05", "#34A853"]) expect(out).toContain(c);
    expect(out).toMatch(/<input type="hidden" name="next" value="\/pricing"\/>/);
    expect(out).toMatch(/aria-hidden="true">.*or.*<\/div>/s);
    expect(out).not.toMatch(/data-testid="google-sign-in"[^>]*disabled/);
  });

  it("is hidden when the Google provider is off in Supabase", async () => {
    googleEnabled = false;
    expect(await GoogleButton({ next: "/pricing" })).toBeNull();
  });

  it("appears above the email form on the log-in and sign-up pages, both keeping next", async () => {
    for (const page of [
      await LoginPage({ searchParams: Promise.resolve({ next: "/pricing" }) }),
      await SignupPage({ searchParams: Promise.resolve({ next: "/pricing" }) }),
    ]) {
      const out = await html(page);
      const g = out.indexOf('data-testid="google-sign-in"');
      expect(g).toBeGreaterThan(-1);
      expect(g).toBeLessThan(out.indexOf('id="email"'));
      expect(out.match(/name="next" value="\/pricing"/g)?.length).toBe(2); // Google form and email form
    }
  });

  it("the log-in page shows Google errors in plain words, and nothing for unknown codes", async () => {
    const out = await html(await LoginPage({ searchParams: Promise.resolve({ error: "google_cancelled" }) }));
    expect(out).toContain("Google sign-in was cancelled.");
    const other = await html(await LoginPage({ searchParams: Promise.resolve({ error: "<b>hi</b>" }) }));
    expect(other).not.toContain("&lt;b&gt;hi");
    expect(other).not.toContain('role="alert"');
  });

  it("signed-in visitors skip the sign-up page, to next", async () => {
    currentUser = passwordFirstUser;
    await expect(SignupPage({ searchParams: Promise.resolve({ next: "/pricing" }) })).rejects.toThrow("REDIRECT:/pricing");
    await expect(SignupPage({ searchParams: Promise.resolve({ next: "//evil.com" }) })).rejects.toThrow("REDIRECT:/dashboard");
  });
});

describe("Content Security Policy and the Google redirect chain", () => {
  it("does not block the form post and its redirects to Supabase and Google", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const { default: config } = await import("../next.config");
    const rules = await config.headers!();
    const csp = rules.flatMap((r) => r.headers).find((h) => h.key === "Content-Security-Policy")?.value ?? "";
    expect(csp).toContain("default-src 'self'");
    const directives = Object.fromEntries(csp.split(";").map((d) => d.trim().split(/\s+/)).map(([k, ...v]) => [k, v]));
    // form-action also applies to the redirects after a form post: if it is ever added, it must allow the chain.
    if (directives["form-action"]) {
      expect(directives["form-action"]).toEqual(expect.arrayContaining(["'self'", "https://zyzfufifzitjmwxfqbqx.supabase.co", "https://accounts.google.com"]));
    }
    expect(directives["navigate-to"]).toBeUndefined();
    expect(directives["connect-src"]).toContain("'self'");
  });
});

