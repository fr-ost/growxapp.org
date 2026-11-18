import type { NextRequest } from "next/server";
import { z } from "zod";
import { isAdmin, requireAdmin } from "@/lib/admin/auth";
import { errorResponse, jsonResponse } from "@/lib/api/guards";
import { requestOrigin } from "@/lib/origin";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

const reason = z.string().trim().min(3).max(500);
const body = z.discriminatedUnion("action", [
  z.object({ action: z.literal("revoke_sessions"), reason }).strict(),
  z.object({ action: z.literal("suspend"), reason }).strict(),
  z.object({ action: z.literal("unsuspend"), reason }).strict(),
  z.object({ action: z.literal("confirm_email"), reason }).strict(),
  z.object({ action: z.literal("send_password_reset"), reason }).strict(),
  z.object({ action: z.literal("change_email"), reason, email: z.string().trim().toLowerCase().email().max(320) }).strict(),
]);
type Body = z.infer<typeof body>;

/** Long enough to mean "until an admin lifts it" (Supabase Auth takes a Go duration). */
const SUSPEND_DURATION = "876000h";

/**
 * POST /api/admin/users/:userId/actions : account controls for administrators.
 *   revoke_sessions      sign the user out of the website and the extension everywhere
 *   suspend / unsuspend  block or allow sign-in (suspending also signs them out everywhere)
 *   confirm_email        mark the email address as confirmed
 *   send_password_reset  email the user a password reset link (the same email as "Forgot password")
 *   change_email         change the sign-in email (confirmed), if no other account uses it
 * Every action needs a reason and is written to the append-only admin_actions log with the admin and the time.
 * Not available: your own account; suspending, signing out or re-emailing another administrator.
 */
export async function POST(request: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const auth = await requireAdmin(request, { mutating: true });
  if (!auth.ok) return auth.response;
  const { id } = await ctx.params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return errorResponse(404, "user_not_found");
  const parsed = body.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return errorResponse(400, "invalid_request", "Give a reason (3 to 500 characters) and, for an email change, a valid email address.");
  const b: Body = parsed.data;
  if (id === auth.user.id) return errorResponse(409, "self", "Use your own account settings for your account.");

  const admin = createAdminClient();
  // Never act unless the action can be audited: the admin console migration must be applied first.
  const ready = await admin.from("admin_actions").select("id").limit(1);
  if (ready.error) return errorResponse(503, "console_not_installed", "The admin console migration is not applied yet, so nothing was changed.");
  const { data: target, error: targetErr } = await admin.auth.admin.getUserById(id);
  if (targetErr || !target?.user) return errorResponse(404, "user_not_found", "That account no longer exists.");
  if (b.action !== "unsuspend" && b.action !== "confirm_email" && (await isAdmin(id))) {
    return errorResponse(409, "target_is_admin", "That account is an administrator. Remove it from public.admins in the Supabase SQL Editor first.");
  }
  const email = target.user.email ?? null;

  const log = async (details: Record<string, unknown> = {}) => {
    const { data, error } = await admin.rpc("admin_log_action", { p_admin: auth.user.id, p_target: id, p_action: b.action, p_reason: b.reason, p_details: details });
    return !error && (data as { status?: string } | null)?.status === "ok";
  };
  const done = async (details: Record<string, unknown> = {}, extra: Record<string, unknown> = {}) =>
    (await log(details))
      ? jsonResponse({ status: "ok", action: b.action, ...extra })
      : errorResponse(500, "not_logged", "The change was made but could not be written to the audit log. Check the database.");

  switch (b.action) {
    case "revoke_sessions": {
      const { data, error } = await admin.rpc("admin_revoke_sessions", { p_admin: auth.user.id, p_user: id, p_reason: b.reason });
      if (error) return errorResponse(503, "unavailable", "Could not sign the user out. Try again.");
      const r = data as { status: string; code?: string; sessions?: number };
      if (r.status === "ok") return jsonResponse({ status: "ok", action: b.action, sessions: r.sessions ?? 0 }); // logged by the function
      if (r.code === "auth_sessions_denied") return errorResponse(503, "auth_sessions_denied", "This database does not let the server end Supabase Auth sessions.");
      return errorResponse(400, r.code ?? r.status, "Could not sign the user out.");
    }
    case "suspend": {
      const { error } = await admin.auth.admin.updateUserById(id, { ban_duration: SUSPEND_DURATION });
      if (error) return errorResponse(503, "unavailable", "Could not suspend the account. Try again.");
      const { data } = await admin.rpc("admin_revoke_sessions", { p_admin: auth.user.id, p_user: id, p_reason: `Suspended: ${b.reason}`.slice(0, 500) });
      const signedOut = (data as { status?: string } | null)?.status === "ok";
      return done({ signed_out: signedOut }, { signedOut });
    }
    case "unsuspend": {
      const { error } = await admin.auth.admin.updateUserById(id, { ban_duration: "none" });
      if (error) return errorResponse(503, "unavailable", "Could not lift the suspension. Try again.");
      return done();
    }
    case "confirm_email": {
      if (target.user.email_confirmed_at) return errorResponse(409, "already_confirmed", "This email address is already confirmed.");
      const { error } = await admin.auth.admin.updateUserById(id, { email_confirm: true });
      if (error) return errorResponse(503, "unavailable", "Could not confirm the email. Try again.");
      return done();
    }
    case "send_password_reset": {
      if (!email) return errorResponse(409, "no_email", "This account has no email address.");
      const origin = await requestOrigin();
      const { error } = await admin.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback?next=${encodeURIComponent("/reset-password")}` });
      if (error) return errorResponse(error.status === 429 ? 429 : 503, "unavailable", error.status === 429 ? "Too many emails. Wait a few minutes." : "Could not send the email. Try again.");
      return done();
    }
    case "change_email": {
      if (email && b.email === email.toLowerCase()) return errorResponse(409, "unchanged", "That is already the account's email.");
      const { data: found } = await admin.rpc("admin_find_user", { p_admin: auth.user.id, p_email: b.email });
      if ((found as { status?: string } | null)?.status === "ok") return errorResponse(409, "email_taken", "Another GrowX account already uses that email.");
      const { error } = await admin.auth.admin.updateUserById(id, { email: b.email, email_confirm: true });
      if (error) return errorResponse(error.status === 422 ? 409 : 503, error.status === 422 ? "email_taken" : "unavailable", "Could not change the email.");
      return done({ from: email, to: b.email });
    }
  }
}
