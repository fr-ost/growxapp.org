/**
 * Pure helpers for the sign-in flows (password, email links and Google OAuth). No I/O, so they are unit-tested
 * directly and shared by the server actions, the /auth/callback and /auth/confirm routes and the login page.
 */

/** Codes the login page turns into a plain-words message (see LOGIN_ERRORS in src/lib/auth/messages.ts). */
export type AuthErrorCode =
  | "auth_callback"
  | "link_expired"
  | "link_other_browser"
  | "reset_other_browser"
  | "session_failed"
  | "account_unavailable"
  | "google_unavailable"
  | "google_failed"
  | "google_cancelled"
  | "google_expired"
  | "google_other_browser";

export const DEFAULT_NEXT = "/dashboard";

/** The callback marks the Google flow with flow=google, so its errors get Google wording. */
export const GOOGLE_FLOW = "google";

/**
 * Set by /auth/callback for a brand-new Google account (read and cleared in the browser to report the same sign-up
 * conversion as an email sign-up). Not httpOnly: it carries no secret, only "google".
 */
export const NEW_SIGNUP_COOKIE = "gx_new_signup";

const isRecovery = (next: string) => next === "/reset-password" || next.startsWith("/reset-password?") || next.startsWith("/reset-password#");

/**
 * Back to the login page with a message, keeping where the person was going (unless that is the default). A failed
 * password-reset link starts over from the login page ("Forgot password?"), so /reset-password is not kept.
 */
export function loginErrorPath(error: AuthErrorCode, next: string = DEFAULT_NEXT): string {
  const q = new URLSearchParams({ error });
  if (next && next !== DEFAULT_NEXT && !isRecovery(next)) q.set("next", next);
  return `/login?${q.toString()}`;
}

/** A /login or /signup link that keeps a non-default destination. */
export function authPagePath(page: "/login" | "/signup", next?: string): string {
  return next && next !== DEFAULT_NEXT ? `${page}?next=${encodeURIComponent(next)}` : page;
}

/**
 * Supabase reports a failed sign-in back to the redirect URL as ?error=…&error_code=…&error_description=… (for
 * example when the person cancels on Google's page, or an email link has expired).
 */
export function errorFromProviderParams(opts: {
  google: boolean;
  error: string | null;
  code: string | null;
  description: string | null;
}): AuthErrorCode {
  const text = `${opts.error ?? ""} ${opts.code ?? ""} ${opts.description ?? ""}`;
  if (/banned|suspended/i.test(text)) return "account_unavailable";
  if (opts.google) {
    if (/expired/i.test(text)) return "google_expired";
    if (opts.error === "access_denied" || /cancel|denied|consent/i.test(text)) return "google_cancelled";
    return "google_failed";
  }
  return /expired/i.test(text) ? "link_expired" : "auth_callback";
}

/** The error thrown by exchangeCodeForSession, as a login-page code. */
export function errorFromExchange(opts: {
  google: boolean;
  next: string;
  error: { name?: string; code?: string; message?: string; status?: number } | null | undefined;
}): AuthErrorCode {
  const e = opts.error ?? {};
  const text = `${e.name ?? ""} ${e.code ?? ""} ${e.message ?? ""}`;
  // The PKCE verifier lives in a cookie of the browser that started the sign-in: it is missing when the flow
  // finished in another browser (or on another host, e.g. a preview URL).
  const otherBrowser =
    e.code === "pkce_code_verifier_not_found" ||
    /PKCECodeVerifierMissing|code verifier not found|both auth code and code verifier should be non-empty/i.test(text);
  if (/banned|suspended/i.test(text)) return "account_unavailable";
  if (opts.google) {
    if (otherBrowser) return "google_other_browser";
    // A used, expired or unknown code, or a verifier from another (newer) sign-in in this browser: start again.
    if (/expired|flow_state_not_found|bad_code_verifier|does not match|already been used|invalid_grant/i.test(text)) return "google_expired";
    return "google_failed";
  }
  // Supabase unreachable or failing: the link itself may still be fine, so say "try again" rather than "expired".
  if ((e.status ?? 0) >= 500 || /RetryableFetch|fetch failed/i.test(text)) return "session_failed";
  if (isRecovery(opts.next)) return otherBrowser ? "reset_other_browser" : "link_expired";
  // An email confirmation link is verified by Supabase before it redirects here with a code, so the address is
  // confirmed even when this browser cannot finish the sign-in.
  if (otherBrowser) return "link_other_browser";
  return "link_expired";
}

interface OAuthUserLike {
  created_at?: string | null;
  app_metadata?: { provider?: string; providers?: string[] } | null;
  identities?: { provider?: string; created_at?: string | null; last_sign_in_at?: string | null }[] | null;
}

/**
 * True only for the first sign-in of an account that Google sign-in has just created.
 *  - An existing email account that gets linked to Google keeps its own creation time and first provider ("email"),
 *    so it is never counted.
 *  - A returning Google account is older than the window, or (when Supabase reports it) its Google identity has
 *    signed in again well after it was created.
 */
export function isNewOAuthUser(user: OAuthUserLike | null | undefined, now = Date.now(), windowMs = 10 * 60_000): boolean {
  if (!user?.created_at || user.app_metadata?.provider !== "google") return false;
  const created = Date.parse(user.created_at);
  if (!Number.isFinite(created) || now - created < -60_000 || now - created > windowMs) return false;
  const identity = user.identities?.find((i) => i.provider === "google");
  const idCreated = Date.parse(identity?.created_at ?? "");
  const idLastSignIn = Date.parse(identity?.last_sign_in_at ?? "");
  // Supabase stamps a new identity's creation and first sign-in together; a later sign-in moves last_sign_in_at on.
  return !(Number.isFinite(idCreated) && Number.isFinite(idLastSignIn) && idLastSignIn - idCreated > 5_000);
}

/** How the account can sign in, from Supabase's app_metadata (the providers of its linked identities). */
export function signInMethods(appMetadata: { provider?: string; providers?: string[] } | null | undefined): { password: boolean; google: boolean; labels: string[] } {
  const list = new Set([...(appMetadata?.providers ?? []), ...(appMetadata?.provider ? [appMetadata.provider] : [])]);
  if (!list.size) list.add("email");
  const NAMES: Record<string, string> = { email: "email and password", google: "Google" };
  return {
    password: list.has("email"),
    google: list.has("google"),
    labels: [...list].map((p) => NAMES[p] ?? p.charAt(0).toUpperCase() + p.slice(1)),
  };
}
