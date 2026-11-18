import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadEntitlement } from "@/lib/entitlement/load";
import type { Entitlement } from "@/lib/entitlement/types";
import { getBillable, isBillableId } from "@/lib/billing/catalog";

/**
 * Admin console reads (service role). Callers MUST have checked isAdmin() for the verified session user first; the
 * database functions used here check public.admins again.
 */

export const USER_FILTERS = ["all", "premium", "trial", "free", "paid", "gift", "unconfirmed", "suspended", "admins"] as const;
export type UserFilter = (typeof USER_FILTERS)[number];
export const isUserFilter = (v: unknown): v is UserFilter => typeof v === "string" && (USER_FILTERS as readonly string[]).includes(v);

export const USER_FILTER_LABELS: Record<UserFilter, string> = {
  all: "All users",
  premium: "Premium (paid or gift)",
  trial: "On trial",
  free: "Free",
  paid: "Has paid",
  gift: "Has a gift",
  unconfirmed: "Email not confirmed",
  suspended: "Suspended",
  admins: "Admins",
};

export const ADMIN_ACTION_LABELS: Record<string, string> = {
  revoke_sessions: "Signed out everywhere",
  suspend: "Suspended",
  unsuspend: "Unsuspended",
  confirm_email: "Confirmed email",
  send_password_reset: "Sent password reset",
  change_email: "Changed email",
};

export const PAGE_SIZE = 25;

export interface ListedUser {
  id: string;
  email: string | null;
  createdAt: string;
  lastSignInAt: string | null;
  emailConfirmedAt: string | null;
  bannedUntil: string | null;
  providers: string[];
  xAccounts: string[];
  payments: number;
  isAdmin: boolean;
  trialActive: boolean;
  trialUsed: boolean;
  paidActive: boolean;
  giftActive: boolean;
}

export const isSuspended = (bannedUntil: string | null, now = Date.now()) => !!bannedUntil && new Date(bannedUntil).getTime() > now;

/** A short plan label for the directory, from the database flags. The user page shows the full entitlement. */
export function planLabel(u: Pick<ListedUser, "paidActive" | "giftActive" | "trialActive">): string {
  if (u.paidActive) return "Premium (paid)";
  if (u.giftActive) return "Premium (gift)";
  if (u.trialActive) return "Trial";
  return "Free";
}

export async function listUsers(admin: SupabaseClient, adminId: string, opts: { q: string; filter: UserFilter; page: number }) {
  const page = Math.max(1, Math.floor(opts.page) || 1);
  const { data, error } = await admin.rpc("admin_list_users", {
    p_admin: adminId,
    p_query: opts.q.slice(0, 320),
    p_filter: opts.filter,
    p_limit: PAGE_SIZE,
    p_offset: (page - 1) * PAGE_SIZE,
  });
  if (error) throw new Error(`admin_list_users failed: ${error.code ?? "unknown"}`);
  type Row = {
    id: string; email: string | null; created_at: string; last_sign_in_at: string | null; email_confirmed_at: string | null; banned_until: string | null;
    providers: string[] | null; x_accounts: string[] | null; payments: number; is_admin: boolean; trial_active: boolean; trial_used: boolean; paid_active: boolean; gift_active: boolean;
  };
  const r = data as { total: number; rows: Row[] };
  return {
    total: r.total,
    page,
    pages: Math.max(1, Math.ceil(r.total / PAGE_SIZE)),
    rows: r.rows.map<ListedUser>((x) => ({
      id: x.id,
      email: x.email,
      createdAt: x.created_at,
      lastSignInAt: x.last_sign_in_at,
      emailConfirmedAt: x.email_confirmed_at,
      bannedUntil: x.banned_until,
      providers: Array.isArray(x.providers) ? x.providers : [],
      xAccounts: Array.isArray(x.x_accounts) ? x.x_accounts : [],
      payments: x.payments,
      isAdmin: x.is_admin,
      trialActive: x.trial_active,
      trialUsed: x.trial_used,
      paidActive: x.paid_active,
      giftActive: x.gift_active,
    })),
  };
}

export interface AdminStats {
  users_total: number; users_7d: number; users_30d: number; unconfirmed: number; suspended: number; admins: number;
  trials_active: number; trials_total: number; paid_active: number; lifetime: number; gifts_active: number;
  payments_succeeded: number; payments_30d: number;
  revenue: Record<string, { gross: number; refunded: number; net: number }>;
  revenue_30d: Record<string, number>;
  orders_open: number; orders_refund_required: number; x_accounts_active: number; sessions_active: number;
  signups_14d: { day: string; count: number }[];
}

export async function loadStats(admin: SupabaseClient, adminId: string): Promise<AdminStats> {
  const { data, error } = await admin.rpc("admin_stats", { p_admin: adminId });
  if (error) throw new Error(`admin_stats failed: ${error.code ?? "unknown"}`);
  return data as AdminStats;
}

async function emailsFor(admin: SupabaseClient, ids: (string | null | undefined)[]): Promise<Map<string, string>> {
  const unique = [...new Set(ids.filter((x): x is string => !!x))];
  if (!unique.length) return new Map();
  const { data } = await admin.from("profiles").select("id, email").in("id", unique);
  return new Map(((data ?? []) as { id: string; email: string | null }[]).map((r) => [r.id, r.email ?? r.id]));
}

export interface AdminActionRow {
  id: number;
  action: string;
  label: string;
  admin: string;
  targetUserId: string | null;
  target: string | null;
  reason: string | null;
  details: Record<string, unknown>;
  createdAt: string;
}

export async function loadAdminActions(admin: SupabaseClient, opts: { userId?: string; limit?: number } = {}): Promise<AdminActionRow[]> {
  let q = admin.from("admin_actions").select("id, admin_id, target_user_id, action, reason, details, created_at").order("id", { ascending: false }).limit(opts.limit ?? 100);
  if (opts.userId) q = q.eq("target_user_id", opts.userId);
  const { data, error } = await q;
  if (error) throw new Error(`admin_actions read failed: ${error.code ?? "unknown"}`);
  type A = { id: number; admin_id: string; target_user_id: string | null; action: string; reason: string | null; details: Record<string, unknown> | null; created_at: string };
  const rows = (data ?? []) as A[];
  const emails = await emailsFor(admin, rows.flatMap((r) => [r.admin_id, r.target_user_id]));
  return rows.map((r) => ({
    id: r.id,
    action: r.action,
    label: ADMIN_ACTION_LABELS[r.action] ?? r.action,
    admin: emails.get(r.admin_id) ?? r.admin_id,
    targetUserId: r.target_user_id,
    target: r.target_user_id ? emails.get(r.target_user_id) ?? r.target_user_id : null,
    reason: r.reason,
    details: r.details ?? {},
    createdAt: r.created_at,
  }));
}

const productName = (id: string | null) => (id && isBillableId(id) ? getBillable(id).name : id ?? "-");

export interface UserDetail {
  id: string;
  email: string | null;
  createdAt: string;
  lastSignInAt: string | null;
  emailConfirmedAt: string | null;
  bannedUntil: string | null;
  providers: string[];
  isAdmin: boolean;
  entitlement: Entitlement | null;
  trials: { startedAt: string; expiresAt: string; status: string; xUsername: string | null }[];
  subscriptions: { plan: string; status: string; provider: string; currentPeriodEnd: string | null; accessRevokedAt: string | null; createdAt: string }[];
  payments: { id: string; product: string; amountMinor: number | null; currency: string; status: string; refundedMinor: number; createdAt: string }[];
  orders: { id: string; product: string; amountMinor: number | null; currency: string; status: string; createdAt: string; fulfilledAt: string | null }[];
  gifts: { id: string; duration: string; status: "active" | "expired" | "revoked"; startsAt: string; expiresAt: string | null; reason: string | null; grantedBy: string; revokedAt: string | null }[];
  /** Same shape as GET /api/admin/x-accounts (the X accounts panel). */
  x: {
    bindings: { id: string; username: string; status: "active" | "released"; linked_by: string; created_at: string; released_at: string | null; released_by: string | null; release_reason: string | null }[];
    events: { id: number; action: string; username: string; actor: string; reason: string | null; created_at: string }[];
  };
  slotGrants: { slots: number; status: string; createdAt: string }[];
  sessions: { slot: string; activatedAt: string }[];
  actions: AdminActionRow[];
}

/** Everything about one account, for the admin user page. Returns null when the account does not exist. */
export async function loadUserDetail(admin: SupabaseClient, userId: string, now = Date.now()): Promise<UserDetail | null> {
  const { data: au, error: auErr } = await admin.auth.admin.getUserById(userId);
  if (auErr || !au?.user) return null;
  const user = au.user as typeof au.user & { banned_until?: string | null };
  const by = (t: string, cols: string) => admin.from(t).select(cols).eq("user_id", userId);
  const [trials, subs, pays, orders, gifts, binds, xev, slots, sess, adminRow, entitlement, actions] = await Promise.all([
    by("trials", "started_at, expires_at, status, x_username_normalized").order("started_at", { ascending: false }),
    by("subscriptions", "plan, status, provider, current_period_end, access_revoked_at, created_at").order("created_at", { ascending: false }),
    by("payments", "id, product, amount_minor, currency, status, refunded_minor, created_at").order("created_at", { ascending: false }).limit(100),
    by("checkout_orders", "id, product, expected_amount_minor, currency, status, created_at, fulfilled_at").order("created_at", { ascending: false }).limit(100),
    by("premium_gifts", "id, duration, status, starts_at, expires_at, reason, granted_by, revoked_at").order("created_at", { ascending: false }),
    by("x_account_bindings", "id, username, status, linked_by, created_at, released_at, released_by, release_reason").order("created_at", { ascending: true }),
    by("x_account_binding_events", "id, action, username, actor, reason, created_at").order("id", { ascending: false }).limit(50),
    by("account_slot_grants", "slots, status, created_at").order("created_at", { ascending: false }),
    by("active_sessions", "slot, activated_at"),
    admin.from("admins").select("user_id").eq("user_id", userId).maybeSingle(),
    loadEntitlement(admin, userId).catch(() => null),
    loadAdminActions(admin, { userId, limit: 50 }).catch(() => []),
  ]);
  const rows = <T,>(r: { data: unknown }) => ((r.data ?? []) as T[]);
  type G = { id: string; duration: string; status: string; starts_at: string; expires_at: string | null; reason: string | null; granted_by: string; revoked_at: string | null };
  const giftRows = rows<G>(gifts);
  const grantors = await emailsFor(admin, giftRows.map((g) => g.granted_by));
  const appMeta = (user.app_metadata ?? {}) as { providers?: string[]; provider?: string };
  return {
    id: user.id,
    email: user.email ?? null,
    createdAt: user.created_at,
    lastSignInAt: user.last_sign_in_at ?? null,
    emailConfirmedAt: user.email_confirmed_at ?? null,
    bannedUntil: user.banned_until ?? null,
    providers: appMeta.providers ?? (appMeta.provider ? [appMeta.provider] : []),
    isAdmin: !!adminRow.data,
    entitlement,
    trials: rows<{ started_at: string; expires_at: string; status: string; x_username_normalized: string | null }>(trials).map((t) => ({ startedAt: t.started_at, expiresAt: t.expires_at, status: t.status, xUsername: t.x_username_normalized })),
    subscriptions: rows<{ plan: string; status: string; provider: string; current_period_end: string | null; access_revoked_at: string | null; created_at: string }>(subs).map((s) => ({
      plan: s.plan, status: s.status, provider: s.provider, currentPeriodEnd: s.current_period_end, accessRevokedAt: s.access_revoked_at, createdAt: s.created_at,
    })),
    payments: rows<{ id: string; product: string; amount_minor: number | null; currency: string; status: string; refunded_minor: number | null; created_at: string }>(pays).map((p) => ({
      id: p.id, product: productName(p.product), amountMinor: p.amount_minor, currency: p.currency, status: p.status, refundedMinor: p.refunded_minor ?? 0, createdAt: p.created_at,
    })),
    orders: rows<{ id: string; product: string; expected_amount_minor: number | null; currency: string; status: string; created_at: string; fulfilled_at: string | null }>(orders).map((o) => ({
      id: o.id, product: productName(o.product), amountMinor: o.expected_amount_minor, currency: o.currency, status: o.status, createdAt: o.created_at, fulfilledAt: o.fulfilled_at,
    })),
    gifts: giftRows.map((g) => ({ id: g.id, duration: g.duration, status: g.status === "revoked" ? "revoked" : g.expires_at && new Date(g.expires_at).getTime() <= now ? "expired" : "active", startsAt: g.starts_at, expiresAt: g.expires_at, reason: g.reason, grantedBy: grantors.get(g.granted_by) ?? g.granted_by, revokedAt: g.revoked_at })),
    x: { bindings: rows<UserDetail["x"]["bindings"][number]>(binds), events: rows<UserDetail["x"]["events"][number]>(xev) },
    slotGrants: rows<{ slots: number; status: string; created_at: string }>(slots).map((s) => ({ slots: s.slots, status: s.status, createdAt: s.created_at })),
    sessions: rows<{ slot: string; activated_at: string }>(sess).map((s) => ({ slot: s.slot, activatedAt: s.activated_at })),
    actions: actions as AdminActionRow[],
  };
}

export const PAYMENT_STATUSES = ["all", "succeeded", "pending", "confirming", "partially_paid", "failed", "expired", "refunded", "disputed"] as const;
export type PaymentStatusFilter = (typeof PAYMENT_STATUSES)[number];

/** Recent payments and checkout orders, with buyer emails. Orders that need a manual refund are listed separately. */
export async function loadPaymentsAdmin(admin: SupabaseClient, status: PaymentStatusFilter) {
  let pq = admin.from("payments").select("id, user_id, product, amount_minor, currency, status, refunded_minor, provider, created_at").order("created_at", { ascending: false }).limit(200);
  if (status !== "all") pq = pq.eq("status", status);
  const [p, refund, open] = await Promise.all([
    pq,
    admin.from("checkout_orders").select("id, user_id, product, expected_amount_minor, currency, status, created_at").eq("status", "refund_required").order("created_at", { ascending: false }).limit(100),
    admin.from("checkout_orders").select("id, user_id, product, expected_amount_minor, currency, status, created_at").in("status", ["created", "pending"]).order("created_at", { ascending: false }).limit(100),
  ]);
  if (p.error) throw new Error(`payments read failed: ${p.error.code ?? "unknown"}`);
  type P = { id: string; user_id: string; product: string; amount_minor: number | null; currency: string; status: string; refunded_minor: number | null; provider: string; created_at: string };
  type O = { id: string; user_id: string; product: string; expected_amount_minor: number | null; currency: string; status: string; created_at: string };
  const pays = (p.data ?? []) as P[];
  const refunds = (refund.data ?? []) as O[];
  const opens = (open.data ?? []) as O[];
  const emails = await emailsFor(admin, [...pays, ...refunds, ...opens].map((x) => x.user_id));
  const order = (o: O) => ({ id: o.id, userId: o.user_id, buyer: emails.get(o.user_id) ?? o.user_id, product: productName(o.product), amountMinor: o.expected_amount_minor, currency: o.currency, status: o.status, createdAt: o.created_at });
  return {
    payments: pays.map((x) => ({ id: x.id, userId: x.user_id, buyer: emails.get(x.user_id) ?? x.user_id, product: productName(x.product), amountMinor: x.amount_minor, currency: x.currency, status: x.status, refundedMinor: x.refunded_minor ?? 0, provider: x.provider, createdAt: x.created_at })),
    refundRequired: refunds.map(order),
    openOrders: opens.map(order),
  };
}

/** X-account changes made by support (admins), across all users, for the audit log. */
export async function loadSupportXEvents(admin: SupabaseClient, limit = 200) {
  const { data, error } = await admin
    .from("x_account_binding_events")
    .select("id, user_id, action, username, actor, reason, created_at")
    .like("actor", "support:%")
    .order("id", { ascending: false })
    .limit(limit);
  if (error) throw new Error(`x events read failed: ${error.code ?? "unknown"}`);
  type X = { id: number; user_id: string; action: string; username: string; actor: string; reason: string | null; created_at: string };
  const rows = (data ?? []) as X[];
  const emails = await emailsFor(admin, rows.map((r) => r.user_id));
  return rows.map((r) => ({ id: r.id, userId: r.user_id, user: emails.get(r.user_id) ?? r.user_id, action: r.action, username: r.username, admin: r.actor.replace(/^support:/, ""), reason: r.reason, createdAt: r.created_at }));
}
