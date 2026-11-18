import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const apiUser = vi.fn();
const rpc = vi.fn();
const getUserById = vi.fn();
const updateUserById = vi.fn();
const resetPasswordForEmail = vi.fn();
let adminIds = new Set<string>();
let consoleInstalled = true;

vi.mock("@/lib/api/guards", async (orig) => ({ ...(await orig<typeof import("@/lib/api/guards")>()), requireApiUser: (...a: unknown[]) => apiUser(...a) }));
vi.mock("@/lib/origin", () => ({ requestOrigin: async () => "https://www.growxapp.org" }));
vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => ({
    rpc: (...a: unknown[]) => rpc(...a),
    auth: { admin: { getUserById: (...a: unknown[]) => getUserById(...a), updateUserById: (...a: unknown[]) => updateUserById(...a) }, resetPasswordForEmail: (...a: unknown[]) => resetPasswordForEmail(...a) },
    from: (table: string) => ({
      select: () => ({
        eq: (_c: string, id: string) => ({ maybeSingle: async () => (table === "admins" && adminIds.has(id) ? { data: { user_id: id }, error: null } : { data: null, error: null }) }),
        limit: async () => (table === "admin_actions" && !consoleInstalled ? { data: null, error: { code: "PGRST205" } } : { data: [], error: null }),
      }),
    }),
  }),
}));

const route = await import("@/app/api/admin/users/[id]/actions/route");

const ADMIN = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const USER = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const OTHER_ADMIN = "dddddddd-dddd-4ddd-8ddd-dddddddddddd";
const H = { origin: "https://www.growxapp.org", host: "www.growxapp.org", "content-type": "application/json" };
const call = (id: string, body: unknown) => route.POST(new NextRequest(`https://www.growxapp.org/api/admin/users/${id}/actions`, { method: "POST", headers: H, body: JSON.stringify(body) }), { params: Promise.resolve({ id }) });
const as = (id: string | null) => apiUser.mockResolvedValue(id ? { ok: true, user: { id, email_confirmed_at: "2026-01-01" } } : { ok: false, response: new Response("{}", { status: 401 }) });
const loggedActions = () => rpc.mock.calls.filter((c) => c[0] === "admin_log_action").map((c) => c[1]);

beforeEach(() => {
  vi.clearAllMocks();
  adminIds = new Set([ADMIN, OTHER_ADMIN]);
  consoleInstalled = true;
  as(ADMIN);
  getUserById.mockImplementation(async (id: string) => ({ data: { user: { id, email: "u@example.com", email_confirmed_at: null } }, error: null }));
  updateUserById.mockResolvedValue({ data: {}, error: null });
  resetPasswordForEmail.mockResolvedValue({ data: {}, error: null });
  rpc.mockImplementation(async (fn: string) => ({
    data: { admin_log_action: { status: "ok", id: 1 }, admin_revoke_sessions: { status: "ok", sessions: 2 }, admin_find_user: { status: "not_found" } }[fn],
    error: null,
  }));
});

describe("authorization and validation", () => {
  it("non-admins get 404 and nothing happens; signed-out callers get 401", async () => {
    as(USER);
    expect((await call(OTHER_ADMIN, { action: "suspend", reason: "test reason" })).status).toBe(404);
    as(null);
    expect((await call(USER, { action: "suspend", reason: "test reason" })).status).toBe(401);
    expect(getUserById).not.toHaveBeenCalled();
    expect(updateUserById).not.toHaveBeenCalled();
  });
  it("writes need same-origin and a verified email", async () => {
    await call(USER, { action: "confirm_email", reason: "support ticket" });
    expect(apiUser).toHaveBeenLastCalledWith(expect.anything(), { mutating: true, verifiedEmail: true });
  });
  it("rejects unknown actions, extra fields, missing or long reasons and bad emails", async () => {
    for (const body of [
      { action: "delete_user", reason: "nope nope" },
      { action: "suspend" },
      { action: "suspend", reason: "  " },
      { action: "suspend", reason: "x".repeat(501) },
      { action: "suspend", reason: "fine reason", p_admin: USER },
      { action: "change_email", reason: "fine reason", email: "not-an-email" },
    ]) expect((await call(USER, body)).status).toBe(400);
    expect(updateUserById).not.toHaveBeenCalled();
  });
  it("refuses the admin's own account, unknown accounts and (for most actions) other admins", async () => {
    expect((await call(ADMIN, { action: "suspend", reason: "locking myself" })).status).toBe(409);
    getUserById.mockResolvedValueOnce({ data: { user: null }, error: { message: "not found" } });
    expect((await call(USER, { action: "suspend", reason: "gone user" })).status).toBe(404);
    for (const action of ["suspend", "revoke_sessions", "send_password_reset"]) {
      const r = await call(OTHER_ADMIN, { action, reason: "admin target" });
      expect([r.status, (await r.json()).error.code]).toEqual([409, "target_is_admin"]);
    }
    expect((await call(OTHER_ADMIN, { action: "unsuspend", reason: "restore admin" })).status).toBe(200);
    expect(rpc).not.toHaveBeenCalledWith("admin_revoke_sessions", expect.anything());
  });
});

describe("actions", () => {
  it("sign out everywhere runs the database function (which logs it itself)", async () => {
    const r = await call(USER, { action: "revoke_sessions", reason: "Shared password" });
    expect(await r.json()).toEqual({ status: "ok", action: "revoke_sessions", sessions: 2 });
    expect(rpc).toHaveBeenCalledWith("admin_revoke_sessions", { p_admin: ADMIN, p_user: USER, p_reason: "Shared password" });
    expect(loggedActions()).toEqual([]);
  });
  it("explains when the database may not end Auth sessions", async () => {
    rpc.mockImplementationOnce(async () => ({ data: { status: "error", code: "auth_sessions_denied" }, error: null }));
    const r = await call(USER, { action: "revoke_sessions", reason: "Shared password" });
    expect([r.status, (await r.json()).error.code]).toEqual([503, "auth_sessions_denied"]);
  });
  it("suspend bans sign-in, signs the user out and is logged with the admin and reason", async () => {
    const r = await call(USER, { action: "suspend", reason: "Spam reports" });
    expect(await r.json()).toEqual({ status: "ok", action: "suspend", signedOut: true });
    expect(updateUserById).toHaveBeenCalledWith(USER, { ban_duration: "876000h" });
    expect(rpc).toHaveBeenCalledWith("admin_revoke_sessions", { p_admin: ADMIN, p_user: USER, p_reason: "Suspended: Spam reports" });
    expect(loggedActions()).toEqual([{ p_admin: ADMIN, p_target: USER, p_action: "suspend", p_reason: "Spam reports", p_details: { signed_out: true } }]);
  });
  it("unsuspend lifts the ban", async () => {
    expect((await call(USER, { action: "unsuspend", reason: "Appeal accepted" })).status).toBe(200);
    expect(updateUserById).toHaveBeenCalledWith(USER, { ban_duration: "none" });
    expect(loggedActions()[0]).toMatchObject({ p_action: "unsuspend", p_reason: "Appeal accepted" });
  });
  it("confirm email marks it confirmed, and refuses when it already is", async () => {
    expect((await call(USER, { action: "confirm_email", reason: "Verified by support" })).status).toBe(200);
    expect(updateUserById).toHaveBeenCalledWith(USER, { email_confirm: true });
    getUserById.mockResolvedValueOnce({ data: { user: { id: USER, email: "u@example.com", email_confirmed_at: "2026-01-01" } }, error: null });
    expect((await call(USER, { action: "confirm_email", reason: "again" })).status).toBe(409);
  });
  it("sends the standard password reset email to the account's address", async () => {
    expect((await call(USER, { action: "send_password_reset", reason: "User locked out" })).status).toBe(200);
    expect(resetPasswordForEmail).toHaveBeenCalledWith("u@example.com", { redirectTo: "https://www.growxapp.org/auth/callback?next=%2Freset-password" });
  });
  it("changes the email only when no other account uses it, and logs from/to", async () => {
    expect((await call(USER, { action: "change_email", reason: "Ticket 77", email: "New@Example.com" })).status).toBe(200);
    expect(updateUserById).toHaveBeenCalledWith(USER, { email: "new@example.com", email_confirm: true });
    expect(loggedActions()[0]).toMatchObject({ p_action: "change_email", p_details: { from: "u@example.com", to: "new@example.com" } });

    rpc.mockImplementation(async (fn: string) => ({ data: fn === "admin_find_user" ? { status: "ok", user_id: "someone-else" } : { status: "ok" }, error: null }));
    updateUserById.mockClear();
    const taken = await call(USER, { action: "change_email", reason: "Ticket 78", email: "taken@example.com" });
    expect([taken.status, (await taken.json()).error.code]).toEqual([409, "email_taken"]);
    expect(updateUserById).not.toHaveBeenCalled();
    expect((await call(USER, { action: "change_email", reason: "Ticket 79", email: "u@example.com" })).status).toBe(409);
  });
  it("changes nothing when the console migration is missing", async () => {
    consoleInstalled = false;
    const r = await call(USER, { action: "suspend", reason: "Spam reports" });
    expect([r.status, (await r.json()).error.code]).toEqual([503, "console_not_installed"]);
    expect(updateUserById).not.toHaveBeenCalled();
    expect(rpc).not.toHaveBeenCalled();
  });
  it("says so when the change was made but the audit log failed", async () => {
    rpc.mockImplementation(async (fn: string) => ({ data: fn === "admin_log_action" ? null : { status: "ok" }, error: fn === "admin_log_action" ? { code: "XX000" } : null }));
    const r = await call(USER, { action: "unsuspend", reason: "Appeal accepted" });
    expect([r.status, (await r.json()).error.code]).toEqual([500, "not_logged"]);
  });
});
