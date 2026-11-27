import { NextResponse, type NextRequest } from "next/server";
import {
  errorFromExchange,
  errorFromProviderParams,
  GOOGLE_FLOW,
  isNewOAuthUser,
  loginErrorPath,
  NEW_SIGNUP_COOKIE,
  type AuthErrorCode,
} from "@/lib/auth/flow";
import { isSupabaseConfigured } from "@/lib/env";
import { registerWebSession } from "@/lib/session/web";
import { ensureAutoTrial } from "@/lib/trial/auto";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/validation/auth";

/** One JSON line per outcome, with no personal data (no email, user id, code or token). */
function log(event: string, fields: Record<string, unknown>) {
  console.log(JSON.stringify({ event, ...fields }));
}

/**
 * The PKCE callback for Continue with Google (flow=google) and for email links (sign-up confirmation, password
 * reset): exchanges ?code= for a session cookie, then registers this browser as the account's active website
 * session (the same step as a password sign-in), so the device rules apply to every way in.
 * Redirects stay on the host that served this request, so the cookie that was just set (and the PKCE verifier cookie
 * set when the flow started) are visible. Any failure goes back to /login with a plain-words message and the same
 * `next`.
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const params = url.searchParams;
  const google = params.get("flow") === GOOGLE_FLOW;
  const flow = google ? "google" : "email_link";
  const next = safeNextPath(params.get("next"));

  const fail = (error: AuthErrorCode, extra: Record<string, unknown> = {}) => {
    log("auth_callback_failed", { flow, reason: error, ...extra });
    return NextResponse.redirect(new URL(loginErrorPath(error, next), url.origin));
  };

  // Supabase reports a failed or cancelled sign-in as ?error=…&error_code=…&error_description=…
  const providerError = params.get("error");
  const providerCode = params.get("error_code");
  if (providerError || providerCode) {
    return fail(
      errorFromProviderParams({ google, error: providerError, code: providerCode, description: params.get("error_description") }),
      { provider_error: (providerError ?? "").slice(0, 40), provider_code: (providerCode ?? "").slice(0, 40) },
    );
  }

  if (!isSupabaseConfigured()) return fail(google ? "google_unavailable" : "auth_callback");

  const code = params.get("code");
  if (!code) return fail(google ? "google_failed" : "auth_callback", { missing: "code" });

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error || !data?.session) {
    return fail(errorFromExchange({ google, next, error }), { code: error?.code ?? error?.name ?? null, status: error?.status ?? null });
  }

  if (!(await registerWebSession(supabase))) {
    // A sign-in that is not registered must not stay signed in (same rule as the password sign-in).
    await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);
    return fail("session_failed");
  }

  // A new account's Premium trial starts now (email confirmed or Google-verified); never blocks the sign-in.
  await ensureAutoTrial(data.user);

  const res = NextResponse.redirect(new URL(next, url.origin));
  if (google) {
    const isNew = isNewOAuthUser(data.user);
    log("google_sign_in", { new_user: isNew });
    // A brand-new account: the browser reports the same sign-up conversion as an email sign-up (when enabled).
    if (isNew) {
      res.cookies.set(NEW_SIGNUP_COOKIE, "google", {
        path: "/",
        maxAge: 600,
        sameSite: "lax",
        secure: url.protocol === "https:",
        httpOnly: false,
      });
    }
  }
  return res;
}
