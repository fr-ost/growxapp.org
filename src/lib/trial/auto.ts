import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { TRIAL_DAYS } from "@/config/pricing";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * The automatic trial: a new account's Premium trial starts as soon as the account is active (email confirmed, or a
 * Google sign-in), without an X account. The database binds it to the first X account the account links - in
 * practice the first autopilot run in the extension - and keeps one trial per account and per X account
 * (supabase/migrations/20261127170000_auto_trial.sql).
 *
 * Accounts created before AUTO_TRIAL_FROM keep the Start button on the dashboard (same rules, no X account needed).
 */
export const AUTO_TRIAL_FROM = "2026-11-27T00:00:00Z";

export type AccountTrialStatus =
  | "started"
  | "already_used"
  | "x_account_trial_used"
  | "email_not_verified"
  | "no_account"
  /** start_account_trial is not in this database yet (migration not applied): callers fall back. */
  | "not_installed"
  | "unavailable";

export interface AccountTrialResult {
  status: AccountTrialStatus;
  startedAt?: string;
  expiresAt?: string;
}

const KNOWN: readonly AccountTrialStatus[] = ["started", "already_used", "x_account_trial_used", "email_not_verified", "no_account"];

function log(event: string, fields: Record<string, unknown>) {
  console.log(JSON.stringify({ event, ...fields }));
}

/** Starts the account's trial (service role). `userId` MUST come from a verified session. */
export async function startAccountTrial(admin: SupabaseClient, userId: string): Promise<AccountTrialResult> {
  const { data, error } = await admin.rpc("start_account_trial", { p_user: userId, p_days: TRIAL_DAYS });
  if (error) {
    const e = error as { code?: string; message?: string };
    // PostgREST: the function does not exist (yet).
    if (e.code === "PGRST202" || /could not find the function/i.test(e.message ?? "")) return { status: "not_installed" };
    log("start_account_trial_failed", { code: e.code ?? null });
    return { status: "unavailable" };
  }
  const r = (Array.isArray(data) ? data[0] : data) as { status?: string; started_at?: string; expires_at?: string } | null;
  const status = KNOWN.includes(r?.status as AccountTrialStatus) ? (r!.status as AccountTrialStatus) : "unavailable";
  return { status, startedAt: r?.started_at, expiresAt: r?.expires_at };
}

interface UserLike {
  id: string;
  created_at?: string | null;
  email_confirmed_at?: string | null;
}

/** A confirmed account created on or after AUTO_TRIAL_FROM gets its trial without asking. */
export function qualifiesForAutoTrial(user: UserLike | null | undefined): boolean {
  if (!user?.email_confirmed_at || !user.created_at) return false;
  const created = Date.parse(user.created_at);
  return Number.isFinite(created) && created >= Date.parse(AUTO_TRIAL_FROM);
}

/**
 * Starts a new account's trial if it qualifies and has none. Never throws: signing in must never fail because of
 * the trial. Returns "skipped" when the account doesn't qualify.
 */
export async function ensureAutoTrial(user: UserLike | null | undefined): Promise<AccountTrialStatus | "skipped"> {
  if (!user || !qualifiesForAutoTrial(user)) return "skipped";
  try {
    const r = await startAccountTrial(createAdminClient(), user.id);
    if (r.status === "started") log("trial_auto_started", {});
    return r.status;
  } catch (e) {
    log("trial_auto_failed", { message: e instanceof Error ? e.message.slice(0, 80) : "unknown" });
    return "unavailable";
  }
}
