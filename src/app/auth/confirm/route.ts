import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { loginErrorPath, type AuthErrorCode } from "@/lib/auth/flow";
import { isSupabaseConfigured } from "@/lib/env";
import { registerWebSession } from "@/lib/session/web";
import { ensureAutoTrial } from "@/lib/trial/auto";
import { createClient } from "@/lib/supabase/server";
import { safeNextPath } from "@/lib/validation/auth";

const TYPES: readonly EmailOtpType[] = ["signup", "email", "recovery", "invite", "magiclink", "email_change"];

/**
 * Token-hash email links (recommended Supabase SSR email templates). Works
 * even when the link is opened on another device or browser.
 *   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard
 *   {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password
 */
export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const next = safeNextPath(url.searchParams.get("next"), type === "recovery" ? "/reset-password" : "/dashboard");
  const back = (error: AuthErrorCode) => NextResponse.redirect(new URL(loginErrorPath(error, next), url.origin));

  if (tokenHash && type && TYPES.includes(type) && isSupabaseConfigured()) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) {
      if (!(await registerWebSession(supabase))) {
        await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);
        return back("session_failed");
      }
      // A new account's Premium trial starts as soon as its email is confirmed.
      await ensureAutoTrial(data.user);
      return NextResponse.redirect(new URL(next, url.origin));
    }
    return back("link_expired");
  }
  return back("auth_callback");
}
