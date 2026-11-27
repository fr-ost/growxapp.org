import { beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.fn();
let adminThrows = false;
vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => {
    if (adminThrows) throw new Error("Supabase service role is not configured");
    return { rpc: (...a: unknown[]) => rpc(...a), from: () => ({}) };
  },
}));
let currentUser: unknown = null;
vi.mock("@/lib/supabase/user", () => ({ getCurrentUser: async () => currentUser }));
vi.mock("next/cache", () => ({ revalidatePath: () => undefined }));
const legacy = vi.fn();
vi.mock("@/lib/trial/start", () => ({ startTrial: (...a: unknown[]) => legacy(...a) }));
vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({
    from: () => ({ select: () => ({ eq: () => ({ eq: () => ({ order: () => ({ limit: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }) }) }) }) }),
  }),
}));

const { AUTO_TRIAL_FROM, ensureAutoTrial, qualifiesForAutoTrial, startAccountTrial } = await import("@/lib/trial/auto");
const { startTrialAction } = await import("@/app/dashboard/actions");

const NEW = "2026-11-28T10:00:00Z";
const OLD = "2026-10-01T10:00:00Z";
const user = (o: Partial<{ created_at: string; email_confirmed_at: string | null }> = {}) => ({
  id: "11111111-1111-4111-8111-111111111111",
  created_at: NEW,
  email_confirmed_at: "2026-11-28T10:05:00Z",
  ...o,
});

beforeEach(() => {
  rpc.mockReset();
  legacy.mockReset();
  adminThrows = false;
  currentUser = null;
  vi.spyOn(console, "log").mockImplementation(() => undefined);
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

describe("which accounts get the trial automatically", () => {
  it("confirmed accounts created on or after the launch moment", () => {
    expect(qualifiesForAutoTrial(user())).toBe(true);
    expect(qualifiesForAutoTrial(user({ created_at: AUTO_TRIAL_FROM }))).toBe(true);
    expect(qualifiesForAutoTrial(user({ created_at: OLD }))).toBe(false); // older accounts keep the Start button
    expect(qualifiesForAutoTrial(user({ email_confirmed_at: null }))).toBe(false); // not before the email is confirmed
    expect(qualifiesForAutoTrial(user({ created_at: "not a date" }))).toBe(false);
    expect(qualifiesForAutoTrial(null)).toBe(false);
  });
});

describe("startAccountTrial", () => {
  const admin = () => ({ rpc: (...a: unknown[]) => rpc(...a) }) as never;

  it("calls start_account_trial with the verified user and the 30-day length", async () => {
    rpc.mockResolvedValue({ data: { status: "started", started_at: "s", expires_at: "e" }, error: null });
    expect(await startAccountTrial(admin(), "u1")).toEqual({ status: "started", startedAt: "s", expiresAt: "e" });
    expect(rpc).toHaveBeenCalledWith("start_account_trial", { p_user: "u1", p_days: 30 });
  });

  it("passes through the database's answers and never invents one", async () => {
    for (const status of ["already_used", "x_account_trial_used", "email_not_verified", "no_account"]) {
      rpc.mockResolvedValueOnce({ data: { status }, error: null });
      expect((await startAccountTrial(admin(), "u1")).status).toBe(status);
    }
    rpc.mockResolvedValueOnce({ data: { status: "something_new" }, error: null });
    expect((await startAccountTrial(admin(), "u1")).status).toBe("unavailable");
  });

  it("reports a missing function (migration not applied) separately from other errors", async () => {
    rpc.mockResolvedValueOnce({ data: null, error: { code: "PGRST202", message: "Could not find the function public.start_account_trial" } });
    expect((await startAccountTrial(admin(), "u1")).status).toBe("not_installed");
    rpc.mockResolvedValueOnce({ data: null, error: { code: "57014", message: "timeout" } });
    expect((await startAccountTrial(admin(), "u1")).status).toBe("unavailable");
  });
});

describe("ensureAutoTrial (sign-in paths, dashboard, /api/entitlement)", () => {
  it("starts the trial for a new confirmed account", async () => {
    rpc.mockResolvedValue({ data: { status: "started" }, error: null });
    expect(await ensureAutoTrial(user())).toBe("started");
    expect(rpc).toHaveBeenCalledTimes(1);
  });

  it("skips older and unconfirmed accounts without touching the database", async () => {
    expect(await ensureAutoTrial(user({ created_at: OLD }))).toBe("skipped");
    expect(await ensureAutoTrial(user({ email_confirmed_at: null }))).toBe("skipped");
    expect(await ensureAutoTrial(null)).toBe("skipped");
    expect(rpc).not.toHaveBeenCalled();
  });

  it("never throws, so a sign-in never fails because of the trial", async () => {
    rpc.mockRejectedValueOnce(new Error("network down"));
    expect(await ensureAutoTrial(user())).toBe("unavailable");
    adminThrows = true;
    expect(await ensureAutoTrial(user())).toBe("unavailable");
  });
});

describe("the dashboard's Start button", () => {
  it("starts the trial without a linked X account", async () => {
    currentUser = user({ created_at: OLD });
    rpc.mockResolvedValue({ data: { status: "started" }, error: null });
    const r = await startTrialAction();
    expect(r).toMatchObject({ ok: true });
    expect(r.message).toContain("first X account you run the autopilot with");
  });

  it("explains every refusal in plain words", async () => {
    currentUser = user({ created_at: OLD });
    const cases: [string, RegExp][] = [
      ["already_used", /already used its free trial/],
      ["x_account_trial_used", /already been used with this X account/],
      ["email_not_verified", /Confirm your email/],
    ];
    for (const [status, msg] of cases) {
      rpc.mockResolvedValueOnce({ data: { status }, error: null });
      const r = await startTrialAction();
      expect(r.ok).toBeFalsy();
      expect(r.message).toMatch(msg);
    }
  });

  it("refuses unconfirmed emails and signed-out visitors before anything else", async () => {
    currentUser = user({ email_confirmed_at: null });
    expect((await startTrialAction()).message).toMatch(/Confirm your email/);
    currentUser = null;
    expect((await startTrialAction()).message).toMatch(/sign in/i);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("falls back to the old flow (linked X account required) until the migration is applied", async () => {
    currentUser = user({ created_at: OLD });
    rpc.mockResolvedValue({ data: null, error: { code: "PGRST202", message: "Could not find the function" } });
    const r = await startTrialAction();
    expect(r.message).toMatch(/Link your X account first/);
    expect(legacy).not.toHaveBeenCalled();
  });
});
