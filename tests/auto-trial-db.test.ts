import type { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { addUser, asRole, freshDb } from "./helpers/pg";

/**
 * The automatic trial on the REAL migrations (PGlite): start_account_trial starts a trial without an X account,
 * the first linked X account binds it, and one trial per X account still holds.
 */
let db: PGlite;
beforeAll(async () => {
  db = await freshDb();
});
afterAll(async () => db.close());

type R = { status: string; [k: string]: unknown };
type Trial = { user_id: string; x_username_normalized: string | null; status: string; revoked_reason: string | null; started_at: string; expires_at: string };

const confirmed = async () => {
  const u = await addUser(db);
  await db.query("update auth.users set email_confirmed_at = now() where id = $1", [u]);
  return u;
};
const start = async (user: string, days = 30) =>
  (await db.query<{ r: R }>("select public.start_account_trial($1::uuid, $2) as r", [user, days])).rows[0].r;
const register = async (user: string, name: string) =>
  (await db.query<{ r: R }>("select public.register_x_account($1::uuid, $2) as r", [user, name])).rows[0].r;
const trial = async (user: string) =>
  (await db.query<Trial>("select user_id, x_username_normalized, status, revoked_reason, started_at, expires_at from public.trials where user_id = $1", [user])).rows[0];

describe("start_account_trial", () => {
  it("starts a 30-day trial for a confirmed account with no X account, unbound", async () => {
    const u = await confirmed();
    const r = await start(u);
    expect(r).toMatchObject({ status: "started", x_username: null });
    const t = await trial(u);
    expect(t).toMatchObject({ status: "active", x_username_normalized: null, revoked_reason: null });
    const days = (Date.parse(t.expires_at) - Date.parse(t.started_at)) / 86_400_000;
    expect(Math.round(days)).toBe(30);
  });

  it("refuses an unconfirmed email, an unknown account and a second trial", async () => {
    const unconfirmed = await addUser(db);
    expect(await start(unconfirmed)).toEqual({ status: "email_not_verified" });
    expect(await trial(unconfirmed)).toBeUndefined();
    expect(await start("00000000-0000-4000-8000-00000000dead")).toEqual({ status: "no_account" });
    const u = await confirmed();
    expect((await start(u)).status).toBe("started");
    expect(await start(u)).toEqual({ status: "already_used" });
    expect((await db.query("select 1 from public.trials where user_id = $1", [u])).rows).toHaveLength(1);
  });

  it("rejects out-of-range lengths", async () => {
    const u = await confirmed();
    await expect(start(u, 0)).rejects.toThrow(/invalid_trial_days/);
    await expect(start(u, 61)).rejects.toThrow(/invalid_trial_days/);
  });

  it("binds at once to an X account linked before the trial started", async () => {
    const u = await confirmed();
    expect((await register(u, "Early_Bird")).status).toBe("linked");
    expect(await start(u)).toMatchObject({ status: "started", x_username: "early_bird" });
    expect((await trial(u)).x_username_normalized).toBe("early_bird");
  });

  it("refuses when the account's first X account already used a trial elsewhere", async () => {
    // An old trial bound to "reused" (for example from the self-reported era); the binding itself is free again.
    const old = await confirmed();
    await db.query("insert into public.trials (user_id, x_username_normalized, started_at, expires_at, status) values ($1, 'reused', now() - interval '40 days', now() - interval '10 days', 'expired')", [old]);
    const u = await confirmed();
    expect((await register(u, "reused")).status).toBe("linked");
    expect(await start(u)).toEqual({ status: "x_account_trial_used" });
    expect(await trial(u)).toBeUndefined();
  });

  it("is callable only by the service role", async () => {
    const u = await confirmed();
    for (const role of ["anon", "authenticated"] as const) {
      await expect(asRole(db, role, u, () => db.query("select public.start_account_trial($1::uuid, 30)", [u]))).rejects.toThrow(/permission denied/);
    }
    const r = await asRole(db, "service_role", null, () => db.query<{ r: R }>("select public.start_account_trial($1::uuid, 30) as r", [u]));
    expect(r.rows[0].r.status).toBe("started");
  });
});

describe("binding the trial to the first linked X account", () => {
  it("the first link binds the active trial; later links change nothing", async () => {
    const u = await confirmed();
    await start(u);
    expect((await register(u, "First_One")).status).toBe("linked");
    expect(await trial(u)).toMatchObject({ x_username_normalized: "first_one", status: "active" });
    expect((await register(u, "second_one")).status).toBe("linked");
    expect(await trial(u)).toMatchObject({ x_username_normalized: "first_one", status: "active" });
  });

  it("an X account that already had a trial on another account ends this account's trial", async () => {
    const a = await confirmed();
    await start(a);
    expect((await register(a, "shared_x")).status).toBe("linked");
    // support releases it from A, then B links the same X account
    const bindingId = (await db.query<{ id: string }>("select id from public.x_account_bindings where user_id = $1", [a])).rows[0].id;
    await db.query("select public.support_change_x_account($1::uuid, 'release', 'support:test', 'Moved to another account, ticket 1')", [bindingId]);
    const b = await confirmed();
    await start(b);
    expect((await register(b, "shared_x")).status).toBe("linked");
    expect(await trial(b)).toMatchObject({ status: "revoked", revoked_reason: "x_account_trial_used", x_username_normalized: null });
    expect(await trial(a)).toMatchObject({ status: "active", x_username_normalized: "shared_x" });
  });

  it("does not touch an expired trial or an account without a trial", async () => {
    const u = await confirmed();
    await db.query("insert into public.trials (user_id, x_username_normalized, started_at, expires_at, status) values ($1, null, now() - interval '40 days', now() - interval '10 days', 'active')", [u]);
    expect((await register(u, "late_link")).status).toBe("linked");
    expect((await trial(u)).x_username_normalized).toBeNull();
    const none = await confirmed();
    expect((await register(none, "no_trial_acct")).status).toBe("linked");
    expect(await trial(none)).toBeUndefined();
  });

  it("legacy start_trial still works with a self-reported username", async () => {
    const u = await confirmed();
    await db.query("insert into public.x_profiles (user_id, x_username) values ($1, 'Legacy_Name')", [u]);
    const r = await db.query<{ x_username_normalized: string }>("select x_username_normalized from public.start_trial($1::uuid, 30)", [u]);
    expect(r.rows[0].x_username_normalized).toBe("legacy_name");
  });

  it("revoked_reason is only allowed on revoked trials", async () => {
    const u = await confirmed();
    await start(u);
    await expect(db.query("update public.trials set revoked_reason = 'x_account_trial_used' where user_id = $1", [u])).rejects.toThrow(/trials_revoked_reason_check/);
  });
});
