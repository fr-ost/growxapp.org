"use server";

import { redirect } from "next/navigation";
import { GOOGLE_FLOW, loginErrorPath } from "@/lib/auth/flow";
import { googleSignInAvailable } from "@/lib/auth/google";
import { isSupabaseConfigured } from "@/lib/env";
import { requestOrigin } from "@/lib/origin";
import { registerWebSession } from "@/lib/session/web";
import { createClient } from "@/lib/supabase/server";
import { credentialsSchema, safeNextPath } from "@/lib/validation/auth";

export interface AuthState {
  error?: string;
  fieldErrors?: { email?: string; password?: string };
  success?: string;
  /** Echo of the submitted email so the field is not cleared after an error. */
  email?: string;
}

const NOT_CONFIGURED: AuthState = { error: "Sign-in is temporarily unavailable. Please try again later." };
const emailOnly = credentialsSchema.pick({ email: true });
const passwordOnly = credentialsSchema.pick({ password: true });

/**
 * A server client that has finished reading this browser's auth cookies. Flows that store a PKCE code verifier
 * (Google, sign-up and reset emails) use it, so the client's start-up clean-up of a broken session cookie can never
 * run after, and remove, the verifier that the callback needs.
 */
async function pkceClient() {
  const supabase = await createClient();
  await supabase.auth.initialize();
  return supabase;
}

function fieldErrors(error: { flatten: () => { fieldErrors: Record<string, string[] | undefined> } }) {
  const f = error.flatten().fieldErrors;
  return { email: f.email?.[0], password: f.password?.[0] };
}

export async function loginAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "");
  if (!isSupabaseConfigured()) return { ...NOT_CONFIGURED, email };
  const parsed = credentialsSchema.safeParse({ email, password: formData.get("password") });
  if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error), email };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    if (error.code === "email_not_confirmed") {
      return { error: "Please confirm your email first. Check your inbox (and spam folder) for the link.", email };
    }
    if (error.status === 429) return { error: "Too many attempts. Please wait a minute and try again.", email };
    // Same answer whether or not the address exists (no account enumeration); the hint helps Google-only accounts.
    return { error: (await googleSignInAvailable()) ? "Invalid email or password. If you signed up with Google, use Continue with Google." : "Invalid email or password.", email };
  }
  // This login becomes the active web session; the previous one is revoked.
  if (!(await registerWebSession(supabase))) {
    await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);
    return { error: "We could not complete sign-in. Please try again.", email };
  }
  redirect(safeNextPath(formData.get("next")));
}

export async function signupAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "");
  if (!isSupabaseConfigured()) return { ...NOT_CONFIGURED, email };
  const parsed = credentialsSchema.safeParse({ email, password: formData.get("password") });
  if (!parsed.success) return { fieldErrors: fieldErrors(parsed.error), email };

  const next = safeNextPath(formData.get("next"));
  const supabase = await pkceClient();
  const origin = await requestOrigin();
  const { data, error } = await supabase.auth.signUp({
    ...parsed.data,
    options: { emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(next)}` },
  });
  if (error) {
    if (error.status === 429) return { error: "Too many sign-up attempts. Please wait a few minutes and try again.", email };
    if (error.code === "weak_password") return { fieldErrors: { password: "Choose a stronger password." }, email };
    return { error: "We could not create the account. Please check your details and try again.", email };
  }
  if (data.session) {
    // email confirmation disabled in Supabase: the sign-up created a session, so register it
    if (!(await registerWebSession(supabase))) {
      await supabase.auth.signOut({ scope: "local" }).catch(() => undefined);
      return { error: "We could not complete sign-in. Please try again.", email };
    }
    redirect(next);
  }
  // Supabase answers the same for an address that already has an account (no enumeration), so say what to do then.
  const existing = (await googleSignInAvailable())
    ? "Already have an account with this email? Log in instead, or use Continue with Google if you signed up with Google."
    : "Already have an account with this email? Log in instead.";
  return { success: `Almost done! We sent a confirmation link to your email. Open it to activate your account. ${existing}` };
}

/**
 * "Continue with Google" (sign-in and sign-up are the same flow). Supabase OAuth with PKCE: the code verifier is
 * stored in a cookie on THIS host, so the callback URL is built from the request's own origin (the canonical site in
 * production, the preview URL on a preview). /auth/callback finishes it with the same session registration as a
 * password sign-in. prompt=select_account lets people pick which Google account to use.
 */
export async function googleAction(formData: FormData): Promise<void> {
  const next = safeNextPath(formData.get("next"));
  if (!isSupabaseConfigured() || !(await googleSignInAvailable())) redirect(loginErrorPath("google_unavailable", next));
  const supabase = await pkceClient();
  const callback = new URL("/auth/callback", await requestOrigin());
  callback.searchParams.set("next", next);
  callback.searchParams.set("flow", GOOGLE_FLOW);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: callback.toString(), queryParams: { prompt: "select_account" } },
  });
  if (error || !data?.url) {
    console.error(JSON.stringify({ event: "google_sign_in_start_failed", code: error?.code ?? null, status: error?.status ?? null }));
    redirect(loginErrorPath("google_failed", next));
  }
  redirect(data.url);
}

export async function forgotPasswordAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "");
  if (!isSupabaseConfigured()) return { ...NOT_CONFIGURED, email };
  const parsed = emailOnly.safeParse({ email });
  if (!parsed.success) return { fieldErrors: { email: fieldErrors(parsed.error).email }, email };
  const supabase = await pkceClient();
  const origin = await requestOrigin();
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data.email, {
    redirectTo: `${origin}/auth/callback?next=${encodeURIComponent("/reset-password")}`,
  });
  if (error?.status === 429) return { error: "Too many requests. Please wait a few minutes and try again.", email };
  // Same answer whether or not the account exists (no email enumeration).
  return { success: "If an account exists for that email, a reset link is on its way." };
}

export async function resetPasswordAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured()) return NOT_CONFIGURED;
  const parsed = passwordOnly.safeParse({ password: formData.get("password") });
  if (!parsed.success) return { fieldErrors: { password: fieldErrors(parsed.error).password } };
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser(); // must hold a verified recovery session
  if (!data.user) return { error: "This reset link is invalid or has expired. Request a new one." };
  const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
  if (error) {
    if (error.code === "same_password") return { fieldErrors: { password: "Choose a password you have not used before." } };
    return { error: "We could not update the password. Try a different one." };
  }
  redirect("/dashboard?password=updated");
}
