import type { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { addSession, addUser, asRole, freshDb, uid } from "./helpers/pg";

/** Admin console functions (user directory, stats, sign-out, audit log) on the REAL migrations (PGlite). */
let db: PGlite;
let ADMIN: string;
beforeAll(async () => {
  db = await freshDb();
  ADMIN = await addUser(db);
  await db.query("insert into public.admins (user_id, note) values ($1, 'test admin')", [ADMIN]);
});
afterAll(async () => db.close());

type R = { status: string; [k: string]: unknown };
const rpc = async (sql: string, p: unknown[]) => (await db.query<{ r: R }>(`select ${sql} as r`, p)).rows[0].r;
const list = (q: string, filter = "all", limit = 25, offset = 0) =>
  rpc("public.admin_list_users($1, $2, $3, $4, $5)", [ADMIN, q, filter, limit, offset]) as Promise<{ status: string; total: number; rows: { id: string; email: string; x_accounts: string[]; [k: string]: unknown }[] }>;
const actionsFor = async (u: string) => (await db.query<{ action: string; admin_id: string; reason: string; details: Record<string, number> }>("select action, admin_id, reason, details from public.admin_actions where target_user_id = $1 order by id", [u])).rows;

async function userWith(email: string, extra = "") {
  const id = uid();
  await db.query(`insert into auth.users (id, email${extra ? ", " + extra.split("=")[0] : ""}) values ($1, $2${extra ? ", " + extra.split("=")[1] : ""})`, [id, email]);
  return id;
}

describe("admin console authorization", () => {
  it("only admins can call the console functions; browser roles cannot call them at all", async () => {
    const user = await addUser(db);
    await expect(rpc("public.admin_list_users($1, '', 'all', 10, 0)", [user])).rejects.toThrow(/not_admin/);
    await expect(rpc("public.admin_stats($1)", [user])).rejects.toThrow(/not_admin/);
    await expect(rpc("public.admin_revoke_sessions($1, $2, 'testing it')", [user, ADMIN])).rejects.toThrow(/not_admin/);
    await expect(rpc("public.admin_log_action($1, $2, 'suspend', 'x', '{}')", [user, ADMIN])).rejects.toThrow(/not_admin/);
    for (const [role, sub] of [["authenticated", user], ["anon", null]] as const) {
      await asRole(db, role, sub, async () => {
        await expect(db.query("select public.admin_list_users($1, '', 'all', 10, 0)", [user])).rejects.toThrow(/permission denied/);
        await expect(db.query("select public.admin_stats($1)", [user])).rejects.toThrow(/permission denied/);
        await expect(db.query("select public.admin_revoke_sessions($1, $1, 'x x x')", [user])).rejects.toThrow(/permission denied/);
        await expect(db.query("select * from public.admin_actions")).rejects.toThrow(/permission denied/);
        await expect(db.query("insert into public.admin_actions (admin_id, action) values ($1, 'suspend')", [user])).rejects.toThrow(/permission denied/);
      });
    }
  });
});

describe("user directory", () => {
  it("searches by email, user id and linked X username, newest first, with paging", async () => {
    const a = await userWith("alice.search@example.com", "created_at=now() - interval '1 minute'"); // explicit: same-millisecond inserts would tie
    const b = await userWith("bob.search@example.com");
    expect((await rpc("public.register_x_account($1, 'BobOnX')", [b])).status).toBe("linked");

    const byEmail = await list("SEARCH@example");
    expect(byEmail.total).toBe(2);
    expect(byEmail.rows.map((r) => r.id)).toEqual([b, a]); // newest first
    expect((await list(a)).rows.map((r) => r.id)).toEqual([a]);
    const byX = await list("@bobon");
    expect(byX.rows.map((r) => r.id)).toEqual([b]);
    expect(byX.rows[0].x_accounts).toEqual(["BobOnX"]);
    expect((await list("nobody-matches-this")).total).toBe(0);

    const page1 = await list("search@", "all", 1, 0);
    const page2 = await list("search@", "all", 1, 1);
    expect([page1.total, page1.rows.length, page2.rows[0].id]).toEqual([2, 1, a]);
  });

  it("treats LIKE wildcards in the query as plain text", async () => {
    await userWith("percent%user@example.com");
    expect((await list("%")).rows.every((r) => r.email.includes("%"))).toBe(true);
    expect((await list("_")).rows.every((r) => r.email.includes("_"))).toBe(true);
  });

  it("filters by plan, payments, confirmation, suspension and admin", async () => {
    const free = await userWith("f.free@filter.test");
    const trial = await userWith("f.trial@filter.test");
    const paid = await userWith("f.paid@filter.test", "email_confirmed_at=now()");
    const gift = await userWith("f.gift@filter.test", "banned_until=now() + interval '10 years'");
    await db.query("insert into public.trials (user_id, x_username_normalized, started_at, expires_at, status) values ($1, 'trialuser', now(), now() + interval '30 days', 'active')", [trial]);
    await db.query("insert into public.subscriptions (user_id, provider, plan, status, current_period_end) values ($1, 'nowpayments', 'PRO_YEARLY', 'active', now() + interval '300 days')", [paid]);
    await db.query("insert into public.payments (user_id, provider, provider_payment_id, product, amount_minor, currency, status) values ($1, 'nowpayments', 'p-filter-1', 'PRO_YEARLY', 1499, 'USD', 'succeeded')", [paid]);
    await db.query("insert into public.premium_gifts (user_id, granted_by, duration, expires_at) values ($1, $2, '30d', now() + interval '30 days')", [gift, ADMIN]);

    const ids = async (f: string) => (await list("@filter.test", f, 100)).rows.map((r) => r.id).sort();
    expect(await ids("premium")).toEqual([paid, gift].sort());
    expect(await ids("trial")).toEqual([trial]);
    expect(await ids("free")).toEqual([free]);
    expect(await ids("paid")).toEqual([paid]);
    expect(await ids("gift")).toEqual([gift]);
    expect(await ids("unconfirmed")).toEqual([free, trial, gift].sort());
    expect(await ids("suspended")).toEqual([gift]);
    expect((await list("", "admins", 100)).rows.map((r) => r.id)).toEqual([ADMIN]);
    await expect(list("", "everything")).rejects.toThrow(/invalid_filter/);
  });

  it("clamps the page size", async () => {
    expect(((await list("", "all", 1000)) as unknown as { limit: number }).limit).toBe(100);
    expect(((await list("", "all", 0)) as unknown as { limit: number }).limit).toBe(1);
  });
});

describe("statistics", () => {
  it("counts users, plans, revenue and open work", async () => {
    const before = (await rpc("public.admin_stats($1)", [ADMIN])) as unknown as Record<string, number> & { revenue: Record<string, { gross: number; refunded: number; net: number }> };
    const u = await addUser(db);
    await db.query("insert into public.payments (user_id, provider, provider_payment_id, product, amount_minor, currency, status, refunded_minor) values ($1, 'nowpayments', 'p-stats-1', 'PRO_LIFETIME', 5999, 'USD', 'refunded', 5999)", [u]);
    await db.query("insert into public.payments (user_id, provider, provider_payment_id, product, amount_minor, currency, status) values ($1, 'nowpayments', 'p-stats-2', 'PRO_MONTHLY', 199, 'USD', 'pending')", [u]);
    const after = (await rpc("public.admin_stats($1)", [ADMIN])) as unknown as typeof before & { signups_14d: { day: string; count: number }[] };
    expect(after.users_total).toBe(before.users_total + 1);
    expect(after.users_7d).toBe(before.users_7d + 1);
    const usd = (s: typeof before) => s.revenue.USD ?? { gross: 0, refunded: 0, net: 0 };
    expect(usd(after).gross - usd(before).gross).toBe(5999); // refunded payment counts in gross...
    expect(usd(after).refunded - usd(before).refunded).toBe(5999); // ...and fully in refunds
    expect(usd(after).net).toBe(usd(before).net); // pending payments never count
    expect(after.signups_14d).toHaveLength(14);
    expect(after.admins).toBe(1);
  });
});

describe("sign out everywhere", () => {
  it("deletes the user's auth sessions and active slots, logs it, and needs a reason", async () => {
    const u = await addUser(db);
    const s1 = await addSession(db, u);
    await addSession(db, u);
    await db.query("insert into public.active_sessions (user_id, slot, session_id) values ($1, 'web', $2)", [u, s1]);
    const other = await addUser(db);
    await addSession(db, other);

    expect(await rpc("public.admin_revoke_sessions($1, $2, '  ')", [ADMIN, u])).toEqual({ status: "error", code: "reason_required" });
    expect(await rpc("public.admin_revoke_sessions($1, $2, 'Account shared with a stranger')", [ADMIN, u])).toEqual({ status: "ok", sessions: 2 });
    expect((await db.query("select count(*)::int as n from auth.sessions where user_id = $1", [u])).rows[0]).toEqual({ n: 0 });
    expect((await db.query("select count(*)::int as n from auth.refresh_tokens r join auth.sessions s on s.id = r.session_id where s.user_id = $1", [u])).rows[0]).toEqual({ n: 0 });
    expect((await db.query("select count(*)::int as n from public.active_sessions where user_id = $1", [u])).rows[0]).toEqual({ n: 0 });
    expect((await db.query("select count(*)::int as n from auth.sessions where user_id = $1", [other])).rows[0]).toEqual({ n: 1 }); // nobody else

    // The extension / website check now reports the old session as revoked.
    expect((await db.query<{ r: string }>("select public.check_active_session($1, $2, 'web') as r", [u, s1])).rows[0].r).toBe("revoked");

    const log = await actionsFor(u);
    expect(log).toEqual([{ action: "revoke_sessions", admin_id: ADMIN, reason: "Account shared with a stranger", details: { auth_sessions: 2, active_slots: 1 } }]);
  });

  it("refuses the admin's own account and unknown users", async () => {
    expect(await rpc("public.admin_revoke_sessions($1, $1, 'locking myself out')", [ADMIN])).toEqual({ status: "error", code: "self" });
    expect(await rpc("public.admin_revoke_sessions($1, $2, 'no such user')", [ADMIN, uid()])).toEqual({ status: "not_found" });
  });
});

describe("admin audit log", () => {
  it("records actions with a reason and details and is append-only", async () => {
    const u = await addUser(db);
    const r = await rpc("public.admin_log_action($1, $2, 'change_email', 'User asked by support ticket', $3)", [ADMIN, u, JSON.stringify({ from: "a@x.test", to: "b@x.test" })]);
    expect(r.status).toBe("ok");
    expect(await actionsFor(u)).toEqual([{ action: "change_email", admin_id: ADMIN, reason: "User asked by support ticket", details: { from: "a@x.test", to: "b@x.test" } }]);
    await expect(db.query("update public.admin_actions set reason = 'rewritten'")).rejects.toThrow(/audit_log_append_only/);
    await expect(db.query("delete from public.admin_actions")).rejects.toThrow(/audit_log_append_only/);
    await expect(rpc("public.admin_log_action($1, $2, 'revoke_sessions', 'x', '{}')", [ADMIN, u])).rejects.toThrow(/invalid_action/);
    await expect(rpc("public.admin_log_action($1, $2, 'suspend', $3, '{}')", [ADMIN, u, "x".repeat(501)])).rejects.toThrow(/reason_too_long/);
    expect(await rpc("public.admin_log_action($1, $2, 'suspend', 'x', '{}')", [ADMIN, uid()])).toEqual({ status: "not_found" });
  });
});
