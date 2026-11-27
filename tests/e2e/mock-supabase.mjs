// Minimal Supabase (GoTrue + PostgREST) mock for local end-to-end testing.
import http from "node:http";
import { createHash, randomUUID } from "node:crypto";
const PORT = Number(process.env.PORT || 54321);
const b64 = (o) => Buffer.from(JSON.stringify(o)).toString("base64url");
const users = new Map(); // email -> user
const tokens = new Map(); // token -> email
const xprofiles = new Map(); // uid -> row
const trials = new Map(); // uid -> row
const trialNames = new Set();
// Permanent X account bindings (public.x_account_bindings), keyed by normalized username: global uniqueness.
const xbindings = new Map();
const releasedBindings = []; const xEvents = []; let bindSeq = 0;
const xDisplay = (v) => { const t = String(v ?? "").replace(/^[ \t\r\n]+|[ \t\r\n]+$/g, "").replace(/^@/, ""); return /^[A-Za-z0-9_]{1,15}$/.test(t) ? t : null; };
function registerX({ p_user, p_username }) {
  const d = xDisplay(p_username); if (!d) return { status: "invalid_username" };
  const norm = d.toLowerCase(); const cur = xbindings.get(norm);
  if (cur) return cur.user_id === p_user ? { status: "already_linked", normalized_username: norm } : { status: "taken" };
  const used = [...xbindings.values()].filter((b) => b.user_id === p_user).length;
  if (used >= 2) return { status: "no_slot", used, allowed: 2 };
  const now = new Date().toISOString();
  xbindings.set(norm, { id: `dddddddd-0000-4000-8000-${String(++bindSeq).padStart(12, "0")}`, user_id: p_user, username: d, normalized_username: norm, status: "active", linked_by: "self", confirmed_at: now, created_at: now, released_at: null, released_by: null, release_reason: null });
  return { status: "linked", binding_id: "b-" + norm, username: d, normalized_username: norm, used: used + 1, allowed: 2 };
}
let n = 0;
let sn = 0;
const log = [];
// Sessions as GoTrue keeps them (auth.sessions), and the server-side active-session slots (public.active_sessions).
const sessions = new Map(); // session id -> user id
const active = new Map(); // `${userId}:${slot}` -> session id
const sid = () => `aaaaaaaa-0000-4000-8000-${String(++sn).padStart(12, "0")}`;

function mkUser(email, confirmed) {
  const u = { id: `00000000-0000-4000-8000-${String(++n).padStart(12, "0")}`, aud: "authenticated", role: "authenticated", email,
    email_confirmed_at: confirmed ? new Date().toISOString() : null, created_at: new Date().toISOString(),
    app_metadata: { provider: "email", providers: ["email"] }, user_metadata: {}, identities: [{ id: "i", provider: "email" }] };
  users.set(email, u); return u;
}
/** A login creates a NEW session; a refresh keeps the session id (like GoTrue). */
function session(u, existing) {
  const id = existing ?? sid();
  if (!existing) sessions.set(id, u.id);
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const t = `${b64({ alg: "HS256", typ: "JWT" })}.${b64({ sub: u.id, email: u.email, aud: "authenticated", role: "authenticated", exp, iat: exp - 3600, session_id: id })}.sig`;
  tokens.set(t, u.email);
  return { access_token: t, token_type: "bearer", expires_in: 3600, expires_at: exp, refresh_token: `r_${id}`, user: u };
}
const revokeSession = (id) => sessions.delete(id);
const slotKey = (user, client, strict) => `${user}:${strict ? "account" : client}`;
const rpcSessions = {
  register({ p_user, p_session, p_client, p_strict }) {
    if (sessions.get(p_session) !== p_user) return { status: "session_not_found" };
    const key = slotKey(p_user, p_client, p_strict);
    const old = active.get(key);
    for (const [k, v] of active) if (v === p_session && k !== key) active.delete(k);
    active.set(key, p_session);
    let revoked = 0;
    if (p_strict) { for (const [id, u] of [...sessions]) if (u === p_user && id !== p_session) { revokeSession(id); revoked++; } }
    else if (old && old !== p_session && revokeSession(old)) revoked = 1;
    return { status: "active", revoked };
  },
  check({ p_user, p_session, p_client, p_strict }) {
    const exists = sessions.get(p_session) === p_user;
    if ([...active].some(([k, v]) => v === p_session && k.startsWith(p_user))) return exists ? "active" : "revoked";
    if (active.has(slotKey(p_user, p_client, p_strict))) return "revoked";
    if (!exists) return "revoked";
    active.set(slotKey(p_user, p_client, p_strict), p_session);
    return "active";
  },
  release({ p_user, p_session }) {
    let had = false;
    for (const [k, v] of [...active]) if (v === p_session && k.startsWith(p_user)) { active.delete(k); had = true; }
    if (sessions.get(p_session) === p_user) revokeSession(p_session);
    return had;
  },
};
mkUser("demo@example.com", true);
mkUser("unconfirmed@example.com", false);
mkUser("other@example.com", true);
mkUser("brokendb@example.com", true); // simulates a project without migrations
mkUser("nopay@example.com", true); // only the payments table is missing
const ADMIN_USER = mkUser("admin@example.com", true); // listed in public.admins
mkUser("support-target@example.com", false); // admin console: confirm email, suspend / unsuspend, sign out everywhere
// Continue with Google: an existing password account (with an X account linked earlier) and an unconfirmed one.
const PW_FIRST = mkUser("pw-first@example.com", true);
mkUser("unconfirmed-google@example.com", false);
const adminActions = []; // public.admin_actions (append-only)
const userById = (id) => [...users.values()].find((u) => u.id === id) ?? null;
const banned = (u) => !!u.banned_until && new Date(u.banned_until).getTime() > Date.now();
// ---- admin state (public.admins, premium_gifts + events, early_bird_settings + events)
const adminIds = new Set([ADMIN_USER.id]);
// One confirmed early-bird payment of the admin account (for invoices).
const INVOICE_PAYMENT_ID = "eeeeeeee-0000-4000-8000-000000000001";
const mockPayments = [{ id: INVOICE_PAYMENT_ID, user_id: ADMIN_USER.id, provider: "nowpayments", provider_payment_id: "5599001", product: "PRO_LIFETIME_EARLY", amount_minor: 2999, currency: "USD", status: "succeeded", refunded_minor: 0, asset: "bnbbsc", order_id: null, created_at: "2026-10-18T15:50:00Z", updated_at: "2026-10-18T15:51:00Z" }];
const paymentsFor = (url, userId) => { const id = (url.searchParams.get("id") || "").replace("eq.", ""); return mockPayments.filter((p) => (!userId || p.user_id === userId) && (!id || p.id === id)); };
const gifts = []; const giftEvents = []; const ebEvents = [];
const eb = { enabled: true, cap: 100, alloc: 100, sold: 37, updated_at: new Date().toISOString() };
const ebStatus = () => ({ state: !eb.enabled ? "off" : eb.sold >= eb.cap ? "sold_out" : "available", enabled: eb.enabled, sold: eb.sold, open_reservations: 0, sales_cap: eb.cap, campaign_allocation: eb.alloc, remaining: Math.max(0, eb.cap - eb.sold), updated_at: eb.updated_at });
const emailOf = (id) => [...users.values()].find((u) => u.id === id)?.email ?? null;
const DUR = { "7d": 7, "30d": 30, "90d": 90, "1y": 365 };
const adminRpc = {
  admin_stats: () => {
    const all = [...users.values()];
    const day = (d) => d.toISOString().slice(0, 10);
    const signups = Array.from({ length: 14 }, (_, i) => { const d = new Date(Date.now() - (13 - i) * 86400000); return { day: day(d), count: all.filter((u) => u.created_at.slice(0, 10) === day(d)).length }; });
    const ok = mockPayments.filter((x) => x.status === "succeeded");
    const gross = ok.reduce((n, x) => n + x.amount_minor, 0);
    return { users_total: all.length, users_7d: all.length, users_30d: all.length, unconfirmed: all.filter((u) => !u.email_confirmed_at).length, suspended: all.filter(banned).length, admins: adminIds.size,
      trials_active: trials.size, trials_total: trials.size, paid_active: 0, lifetime: 0, gifts_active: gifts.filter((g) => g.status === "active").length, payments_succeeded: ok.length, payments_30d: ok.length,
      revenue: { USD: { gross, refunded: 0, net: gross } }, revenue_30d: { USD: gross }, orders_open: 0, orders_refund_required: 0, x_accounts_active: xbindings.size, sessions_active: active.size, signups_14d: signups };
  },
  admin_list_users: ({ p_query, p_filter, p_limit, p_offset }) => {
    const q = String(p_query || "").trim().toLowerCase(); const x = q.replace(/^@/, "");
    const rows = [...users.values()].map((u) => ({ id: u.id, email: u.email, created_at: u.created_at, last_sign_in_at: null, email_confirmed_at: u.email_confirmed_at, banned_until: u.banned_until ?? null,
      providers: u.app_metadata.providers, trial_active: trials.has(u.id), trial_used: trials.has(u.id), paid_active: false,
      gift_active: gifts.some((g) => g.user_id === u.id && g.status === "active"), payments: mockPayments.filter((pp) => pp.user_id === u.id && pp.status === "succeeded").length,
      x_accounts: [...xbindings.values()].filter((b) => b.user_id === u.id).map((b) => b.username), is_admin: adminIds.has(u.id) }))
      .filter((r) => !q || r.email.includes(q) || r.id === q || [...xbindings.values()].some((b) => b.user_id === r.id && b.normalized_username.includes(x)))
      .filter((r) => ({ all: true, premium: r.paid_active || r.gift_active, trial: r.trial_active && !r.gift_active, free: !r.trial_active && !r.gift_active, paid: r.payments > 0, gift: r.gift_active,
        unconfirmed: !r.email_confirmed_at, suspended: !!r.banned_until && new Date(r.banned_until) > new Date(), admins: r.is_admin })[p_filter || "all"])
      .reverse();
    return { status: "ok", total: rows.length, limit: p_limit, offset: p_offset, rows: rows.slice(p_offset, p_offset + p_limit) };
  },
  admin_revoke_sessions: ({ p_admin, p_user, p_reason }) => {
    if (!String(p_reason || "").trim()) return { status: "error", code: "reason_required" };
    if (p_user === p_admin) return { status: "error", code: "self" };
    let n = 0; for (const [id, uid] of [...sessions]) if (uid === p_user) { sessions.delete(id); n++; }
    let m = 0; for (const k of [...active.keys()]) if (k.startsWith(p_user)) { active.delete(k); m++; }
    adminActions.unshift({ id: adminActions.length + 1, admin_id: p_admin, target_user_id: p_user, action: "revoke_sessions", reason: p_reason, details: { auth_sessions: n, active_slots: m }, created_at: new Date().toISOString() });
    return { status: "ok", sessions: n };
  },
  admin_log_action: ({ p_admin, p_target, p_action, p_reason, p_details }) => {
    adminActions.unshift({ id: adminActions.length + 1, admin_id: p_admin, target_user_id: p_target, action: p_action, reason: p_reason, details: p_details ?? {}, created_at: new Date().toISOString() });
    return { status: "ok", id: adminActions.length };
  },
  admin_find_user: ({ p_email }) => { const u = users.get(String(p_email).trim().toLowerCase()); return u ? { status: "ok", user_id: u.id, email: u.email, created_at: u.created_at } : { status: "not_found" }; },
  admin_grant_gift: ({ p_admin, p_user, p_duration, p_reason }) => {
    if (gifts.some((g) => g.user_id === p_user && g.status === "active" && (!g.expires_at || Date.parse(g.expires_at) > Date.now()))) return { status: "active_gift_exists" };
    const now = new Date(); const g = { id: `9${String(gifts.length + 1).padStart(7, "0")}-0000-4000-8000-000000000000`, user_id: p_user, granted_by: p_admin, duration: p_duration, starts_at: now.toISOString(), expires_at: p_duration === "lifetime" ? null : new Date(now.getTime() + DUR[p_duration] * 864e5).toISOString(), status: "active", reason: p_reason, revoked_at: null, revoked_by: null, revoke_reason: null, created_at: now.toISOString() };
    gifts.unshift(g); giftEvents.unshift({ id: giftEvents.length + 1, user_id: p_user, admin_id: p_admin, action: "grant", duration: p_duration, prev_expires_at: null, new_expires_at: g.expires_at, reason: p_reason, created_at: g.created_at });
    return { status: "granted", gift_id: g.id, expires_at: g.expires_at };
  },
  admin_revoke_gift: ({ p_admin, p_gift, p_reason }) => { const g = gifts.find((x) => x.id === p_gift); if (!g) return { status: "not_found" }; if (g.status === "revoked") return { status: "already_revoked" }; Object.assign(g, { status: "revoked", revoked_at: new Date().toISOString(), revoked_by: p_admin, revoke_reason: p_reason }); giftEvents.unshift({ id: giftEvents.length + 1, user_id: g.user_id, admin_id: p_admin, action: "revoke", duration: g.duration, prev_expires_at: g.expires_at, new_expires_at: g.expires_at, reason: p_reason, created_at: g.revoked_at }); return { status: "revoked" }; },
  admin_extend_gift: () => ({ status: "extended", expires_at: null }),
  admin_set_early_bird: ({ p_admin, p_remaining, p_enabled, p_reason, p_expected_updated_at }) => {
    if (p_expected_updated_at && p_expected_updated_at !== eb.updated_at) return { status: "stale" };
    if (eb.sold + p_remaining > eb.alloc) return { status: "exceeds_allocation", max_remaining: eb.alloc - eb.sold };
    ebEvents.unshift({ id: ebEvents.length + 1, admin_id: p_admin, action: "set_inventory", sold_at_change: eb.sold, prev_enabled: eb.enabled, new_enabled: p_enabled, prev_remaining: Math.max(0, eb.cap - eb.sold), new_remaining: p_remaining, prev_allocation: eb.alloc, new_allocation: eb.alloc, reason: p_reason, created_at: new Date().toISOString() });
    Object.assign(eb, { cap: eb.sold + p_remaining, enabled: p_enabled, updated_at: new Date().toISOString() });
    return { status: "saved" };
  },
  admin_increase_early_bird_allocation: () => ({ status: "saved" }),
  admin_change_x_account: ({ p_admin, p_binding_id, p_action, p_reason, p_new_username }) => {
    if (String(p_reason || "").trim().length < 10) return { status: "reason_required" };
    const cur = [...xbindings.values()].find((b) => b.id === p_binding_id);
    if (!cur) return releasedBindings.some((b) => b.id === p_binding_id) ? { status: "not_active" } : { status: "not_found" };
    const actor = `support:${emailOf(p_admin)}`;
    let d = null;
    if (p_action === "replace") { d = xDisplay(p_new_username); if (!d) return { status: "invalid_username" }; if (xbindings.has(d.toLowerCase())) return { status: d.toLowerCase() === cur.normalized_username ? "unchanged" : "taken" }; }
    xbindings.delete(cur.normalized_username);
    releasedBindings.push({ ...cur, status: "released", released_at: new Date().toISOString(), released_by: actor, release_reason: p_reason });
    xEvents.unshift({ id: xEvents.length + 1, user_id: cur.user_id, action: "released", username: cur.username, actor, reason: p_reason, created_at: new Date().toISOString() });
    if (d) {
      const now = new Date().toISOString();
      xbindings.set(d.toLowerCase(), { ...cur, id: `dddddddd-0000-4000-8000-${String(++bindSeq).padStart(12, "0")}`, username: d, normalized_username: d.toLowerCase(), linked_by: actor, confirmed_at: now, created_at: now });
      xEvents.unshift({ id: xEvents.length + 1, user_id: cur.user_id, action: "linked", username: d, actor, reason: p_reason, created_at: now });
    }
    return { status: d ? "replaced" : "released" };
  },
};

const send = (res, status, body) => { res.writeHead(status, { "content-type": "application/json" }); res.end(body === undefined ? "" : JSON.stringify(body)); };
// NOTE: like a worst-case GoTrue, an already-issued access token is still accepted here after its session was revoked:
// the application's own active-session check is what must reject it.
const authUser = (req) => { const m = (req.headers.authorization || "").match(/^Bearer (.+)$/); const e = m && tokens.get(m[1]); return e ? users.get(e) : null; };
const sessionOfToken = (req) => { const m = (req.headers.authorization || "").match(/^Bearer (.+)$/); try { return m ? JSON.parse(Buffer.from(m[1].split(".")[1], "base64url").toString()).session_id : null; } catch { return null; } };

registerX({ p_user: PW_FIRST.id, p_username: "LinkedEarlier" });

// ---- Google OAuth through Supabase (PKCE), as GoTrue does it: /authorize -> Google -> /callback -> redirect_to?code=
const s256 = (v) => createHash("sha256").update(v).digest("base64url");
const oauthFlows = new Map(); // flow id -> { redirectTo, challenge }
const authCodes = new Map(); // auth code -> { email, challenge, at, used }
// Supabase's Redirect URLs allow list for this mock: the app under test and the extension.
const REDIRECTS = [/^http:\/\/localhost:3113\//, /^https:\/\/ofiancichfcakbdgekhcahflpoglfgbh\.chromiumapp\.org\//];
const withQuery = (target, params) => { const u = new URL(target); for (const [k, v] of Object.entries(params)) u.searchParams.set(k, v); return u.toString(); };
const esc = (v) => String(v).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const redirectTo = (res, location) => { res.writeHead(302, { location }); res.end(); };
/** What GoTrue does when Google returns a verified email: a new user, or the Google identity linked to the existing one. */
function googleSignIn(email) {
  const now = new Date().toISOString();
  const data = { iss: "https://accounts.google.com", sub: `g-${email}`, provider_id: `g-${email}`, email, email_verified: true, name: "Google Person", full_name: "Google Person", avatar_url: "https://lh3.googleusercontent.com/a/mock", picture: "https://lh3.googleusercontent.com/a/mock" };
  let u = users.get(email);
  if (!u) {
    u = mkUser(email, true);
    u.noPassword = true;
    u.app_metadata = { provider: "google", providers: ["google"] };
    u.identities = [{ id: data.sub, provider: "google", identity_data: data, created_at: now, last_sign_in_at: now }];
    u.user_metadata = { ...data };
    return u;
  }
  const g = u.identities.find((i) => i.provider === "google");
  if (g) { g.last_sign_in_at = now; return u; }
  const identity = { id: data.sub, provider: "google", identity_data: data, created_at: now, last_sign_in_at: now };
  if (!u.email_confirmed_at) {
    // unconfirmed account: its unverified password and identities are removed (pre-account-takeover protection)
    u.email_confirmed_at = now; u.noPassword = true; u.identities = [identity];
    u.app_metadata = { provider: "google", providers: ["google"] };
  } else {
    u.identities = [...u.identities, identity];
    u.app_metadata = { ...u.app_metadata, providers: [...u.app_metadata.providers, "google"] };
  }
  u.user_metadata = { ...data, ...u.user_metadata };
  return u;
}

http.createServer(async (req, res) => {
  let raw = ""; for await (const c of req) raw += c;
  const body = raw ? JSON.parse(raw) : {};
  const url = new URL(req.url, "http://x");
  const p = url.pathname;
  log.push(`${req.method} ${p}${url.search}${p.includes("_active_session") ? " " + raw : ""}`);
  if (p === "/__log") return send(res, 200, log);
  if (p === "/__state") return send(res, 200, { sessions: [...sessions], active: [...active] });
  if (p === "/auth/v1/health") return send(res, 200, { name: "GoTrue" });
  if (p === "/__users") { const u = users.get(String(url.searchParams.get("email") || "").toLowerCase()); return send(res, 200, u ? { count: [...users.values()].filter((x) => x.email === u.email).length, id: u.id, providers: u.app_metadata.providers, confirmed: !!u.email_confirmed_at } : { count: 0 }); }
  if (p === "/auth/v1/settings") {
    if (!req.headers.apikey) return send(res, 401, { message: "No API key found in request" });
    return send(res, 200, { external: { email: true, phone: false, google: true, github: false }, disable_signup: false, mailer_autoconfirm: false, phone_autoconfirm: false, saml_enabled: false });
  }
  if (p === "/auth/v1/authorize") {
    const q = url.searchParams; const to = q.get("redirect_to") || "";
    if (q.get("provider") !== "google") return send(res, 400, { code: 400, error_code: "validation_failed", msg: "Unsupported provider: provider is not enabled" });
    if (!REDIRECTS.some((r) => r.test(to))) return send(res, 400, { msg: "redirect_to is not in the mock's Redirect URLs" });
    if (!q.get("code_challenge") || q.get("code_challenge_method")?.toLowerCase() !== "s256") return send(res, 400, { msg: "PKCE (S256) required" });
    const flow = randomUUID();
    oauthFlows.set(flow, { redirectTo: to, challenge: q.get("code_challenge") });
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    return res.end(`<!doctype html><meta charset="utf-8"><title>Choose an account</title><h1>Choose an account</h1><p>to continue to GrowX (prompt: <span id="prompt">${esc(q.get("prompt") ?? "")}</span>)</p>
<form action="/__google/continue" method="get"><input type="hidden" name="flow" value="${flow}"><label>Email <input id="google-email" name="email" type="email"></label> <button id="google-continue">Continue</button></form>
<p><a id="google-cancel" href="/__google/continue?flow=${flow}&amp;cancel=1">Cancel</a></p>`);
  }
  if (p === "/__google/continue") {
    const id = url.searchParams.get("flow") || ""; const f = oauthFlows.get(id);
    if (!f) return send(res, 400, { msg: "unknown or used flow" });
    oauthFlows.delete(id);
    if (url.searchParams.get("cancel")) return redirectTo(res, withQuery(f.redirectTo, { error: "access_denied", error_description: "The user denied the request" }));
    const email = String(url.searchParams.get("email") || "").trim().toLowerCase();
    if (!email) return send(res, 400, { msg: "email required" });
    const u = googleSignIn(email);
    if (banned(u)) return redirectTo(res, withQuery(f.redirectTo, { error: "access_denied", error_code: "user_banned", error_description: "User is banned" }));
    const code = randomUUID();
    authCodes.set(code, { email, challenge: f.challenge, at: Date.now(), used: false });
    return redirectTo(res, withQuery(f.redirectTo, { code }));
  }
  if (p === "/auth/v1/signup" && req.method === "POST") {
    if (users.has(body.email)) return send(res, 200, { ...users.get(body.email), identities: [] });
    const u = mkUser(body.email, body.email.startsWith("instant"));
    return send(res, 200, u.email_confirmed_at ? session(u) : u);
  }
  const adminUser = p.match(/^\/auth\/v1\/admin\/users\/([0-9a-f-]{36})$/);
  if (adminUser) {
    if (!(req.headers.authorization || "").includes("service-key")) return send(res, 401, { msg: "not admin" });
    const tu = userById(adminUser[1]);
    if (!tu) return send(res, 404, { code: 404, error_code: "user_not_found", msg: "User not found" });
    if (req.method === "PUT") {
      if (body.ban_duration) tu.banned_until = body.ban_duration === "none" ? null : new Date(Date.now() + 100 * 365 * 86400000).toISOString();
      if (body.email_confirm && !tu.email_confirmed_at) tu.email_confirmed_at = new Date().toISOString();
      if (body.email && body.email !== tu.email) { if (users.has(body.email)) return send(res, 422, { error_code: "email_exists", msg: "taken" }); users.delete(tu.email); tu.email = body.email; users.set(tu.email, tu); }
    }
    return send(res, 200, tu);
  }
  if (p === "/auth/v1/token") {
    const gt = url.searchParams.get("grant_type");
    if (gt === "refresh_token") {
      const id = String(body.refresh_token).slice(2); // a revoked session's refresh tokens are gone (ON DELETE CASCADE)
      const uid = sessions.get(id); const u = uid && [...users.values()].find((x) => x.id === uid);
      return u ? send(res, 200, session(u, id)) : send(res, 400, { error_code: "refresh_token_not_found", msg: "bad" });
    }
    if (gt === "pkce") {
      if (!body.auth_code || !body.code_verifier) return send(res, 400, { code: 400, error_code: "validation_failed", msg: "invalid request: both auth code and code verifier should be non-empty" });
      const c = authCodes.get(body.auth_code);
      if (!c || c.used) return send(res, 404, { code: 404, error_code: "flow_state_not_found", msg: "invalid flow state, no valid flow state found" });
      if (Date.now() - c.at > 5 * 60_000) return send(res, 400, { code: 400, error_code: "flow_state_expired", msg: "flow state has expired" });
      if (s256(body.code_verifier) !== c.challenge) return send(res, 400, { code: 400, error_code: "bad_code_verifier", msg: "code challenge does not match previously saved code verifier" });
      c.used = true;
      const gu = users.get(c.email);
      if (banned(gu)) return send(res, 400, { code: 400, error_code: "user_banned", msg: "User is banned" });
      return send(res, 200, session(gu));
    }
    const u = users.get(body.email);
    if (!u || u.noPassword || body.password !== "correct-horse-1") return send(res, 400, { code: 400, error_code: "invalid_credentials", msg: "Invalid login credentials" });
    if (!u.email_confirmed_at) return send(res, 400, { code: 400, error_code: "email_not_confirmed", msg: "Email not confirmed" });
    if (banned(u)) return send(res, 400, { code: 400, error_code: "user_banned", msg: "User is banned" });
    return send(res, 200, session(u));
  }
  if (p === "/auth/v1/user") { const u = authUser(req); if (!u) return send(res, 401, { code: 401, error_code: "bad_jwt", msg: "invalid JWT" }); return send(res, 200, u); }
  if (p === "/auth/v1/logout") { const id = sessionOfToken(req); if (id && url.searchParams.get("scope") === "global") { const u = authUser(req); for (const [k, v] of [...sessions]) if (u && v === u.id) revokeSession(k); } else if (id) revokeSession(id); return send(res, 204); }
  if (p === "/auth/v1/recover") return send(res, 200, {});

  // PostgREST
  const u = authUser(req);
  const isService = (req.headers.authorization || "").includes("service-key");
  if (p === "/rest/v1/rpc/early_adopter_available") return isService ? send(res, 200, true) : send(res, 401, { code: "42501", message: "permission denied" });
  if (p === "/rest/v1/rpc/early_adopter_state") return isService ? send(res, 200, "available") : send(res, 401, { code: "42501", message: "permission denied" });
  const rpcName = p.startsWith("/rest/v1/rpc/") ? p.slice("/rest/v1/rpc/".length) : null;
  if (rpcName === "early_bird_status") return isService ? send(res, 200, ebStatus()) : send(res, 401, { code: "42501", message: "permission denied" });
  if (rpcName && adminRpc[rpcName]) {
    if (!isService) return send(res, 401, { code: "42501", message: "permission denied" });
    if (!adminIds.has(body.p_admin)) return send(res, 403, { code: "42501", message: "not_admin" });
    return send(res, 200, adminRpc[rpcName](body));
  }
  if (rpcName === "register_active_session" || rpcName === "check_active_session" || rpcName === "release_active_session") {
    if (!isService) return send(res, 401, { code: "42501", message: "permission denied" });
    return send(res, 200, rpcName === "register_active_session" ? rpcSessions.register(body) : rpcName === "check_active_session" ? rpcSessions.check(body) : rpcSessions.release(body));
  }
  if (rpcName === "x_account_base_slots") return isService ? send(res, 200, 2) : send(res, 401, { code: "42501", message: "permission denied" });
  if (rpcName === "register_x_account") return isService ? send(res, 200, registerX(body)) : send(res, 401, { code: "42501", message: "permission denied for function register_x_account" });
  if (p === "/rest/v1/rpc/start_trial") {
    if (!isService) return send(res, 401, { code: "42501", message: "permission denied for function start_trial" });
    const uid = body.p_user_id;
    const xp = xprofiles.get(uid);
    if (!xp) return send(res, 400, { code: "P0001", message: "x_username_required" });
    if (trials.has(uid)) return send(res, 409, { code: "23505", message: 'duplicate key value violates unique constraint "trials_user_id_key"' });
    const norm = xp.x_username.toLowerCase();
    if (trialNames.has(norm)) return send(res, 409, { code: "23505", message: 'duplicate key value violates unique constraint "trials_x_username_key"' });
    const started = new Date(); const row = { id: "t" + uid, user_id: uid, x_username_normalized: norm, started_at: started.toISOString(), expires_at: new Date(started.getTime() + body.p_days * 864e5).toISOString(), status: "active" };
    trials.set(uid, row); trialNames.add(norm); return send(res, 200, row);
  }
  const table = p.replace("/rest/v1/", "");
  // trial: the server copies the first linked X account into x_profiles (service role upsert)
  if (isService && table === "x_profiles" && req.method === "POST") { for (const r of Array.isArray(body) ? body : [body]) xprofiles.set(r.user_id, { user_id: r.user_id, x_username: r.x_username }); return send(res, 201); }
  if (isService && req.method === "GET") {
    const eqId = (url.searchParams.get("user_id") || "").replace("eq.", "");
    if (table === "admins") return send(res, 200, adminIds.has(eqId) ? [{ user_id: eqId }] : []);
    if (table === "premium_gifts") return send(res, 200, eqId ? gifts.filter((g) => g.user_id === eqId) : gifts);
    if (table === "premium_gift_events") return send(res, 200, giftEvents);
    if (table === "early_bird_events") return send(res, 200, ebEvents);
    if (table === "x_account_bindings") return send(res, 200, [...xbindings.values(), ...releasedBindings].filter((b) => b.user_id === eqId));
    if (table === "x_account_binding_events") return send(res, 200, eqId ? xEvents.filter((e) => e.user_id === eqId) : xEvents.filter((e) => String(e.actor).startsWith("support:")));
    if (table === "admin_actions") { const t = (url.searchParams.get("target_user_id") || "").replace("eq.", ""); return send(res, 200, adminActions.filter((a) => !t || a.target_user_id === t)); }
    if (table === "trials") return send(res, 200, trials.has(eqId) ? [trials.get(eqId)] : []);
    if (table === "active_sessions") return send(res, 200, [...active].filter(([k]) => k.startsWith(eqId)).map(([k]) => ({ slot: k.split(":")[1], activated_at: new Date().toISOString() })));
    if (table === "payments") return send(res, 200, paymentsFor(url, eqId || null));
    if (table === "profiles") { const ids = (url.searchParams.get("id") || "").replace(/^eq\./, "").replace(/^in\.\(|\)$/g, "").split(",").filter(Boolean); return send(res, 200, ids.map((id) => ({ id, email: emailOf(id) }))); }
    return send(res, 200, []); // health-check probes and empty tables
  }
  if (!u) return send(res, 401, { code: "PGRST301", message: "JWT required" });
  const missing = (t) => send(res, 404, { code: "PGRST205", message: `Could not find the table 'public.${t}' in the schema cache` });
  if (u.email.startsWith("brokendb")) return missing(table);
  if (u.email.startsWith("nopay") && table === "payments") return missing(table);
  const eqUser = (url.searchParams.get("user_id") || "").replace("eq.", "");
  if (eqUser && eqUser !== u.id) return send(res, 200, []); // RLS
  if (table === "trials") return send(res, 200, trials.has(u.id) ? [trials.get(u.id)] : []);
  if (table === "payments") return send(res, 200, paymentsFor(url, u.id));
  if (["subscriptions", "checkout_orders", "subscription_details", "account_slot_grants"].includes(table)) return send(res, 200, []);
  if (table === "premium_gifts") return send(res, 200, gifts.filter((g) => g.user_id === u.id).map(({ status, duration, starts_at, expires_at }) => ({ status, duration, starts_at, expires_at })));
  if (table === "x_account_bindings") {
    if (req.method !== "GET") return send(res, 403, { code: "42501", message: "permission denied for table x_account_bindings" });
    const mine = [...xbindings.values()].filter((b) => b.user_id === u.id);
    const lim = Number(url.searchParams.get("limit") || 0);
    return send(res, 200, lim ? mine.slice(0, lim) : mine);
  }
  if (table === "x_profiles") {
    if (req.method === "GET") return send(res, 200, xprofiles.has(u.id) ? [xprofiles.get(u.id)] : []);
    if (req.method === "POST") { if (body.user_id !== u.id) return send(res, 403, { code: "42501", message: "rls" }); xprofiles.set(u.id, { user_id: u.id, x_username: body.x_username }); return send(res, 201); }
    if (req.method === "PATCH") { xprofiles.set(u.id, { user_id: u.id, x_username: body.x_username }); return send(res, 204); }
  }
  send(res, 404, { message: "not mocked: " + p });
}).listen(PORT, () => console.log("mock supabase on", PORT));
