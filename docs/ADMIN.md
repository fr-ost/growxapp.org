# Admin console: users, payments, audit log, Premium gifts, Early Bird

## Console (users, account controls, payments, audit log)

Migration: `supabase/migrations/20261118120000_admin_console.sql`. **Not yet applied to production; review it, then apply it** (Supabase SQL Editor or `supabase db push`). It is additive: one append-only table (`admin_actions`) and four functions (`admin_list_users`, `admin_stats`, `admin_revoke_sessions`, `admin_log_action`). No existing table, row or function changes. Until it is applied, the new pages show "could not be loaded" and the account controls refuse with `console_not_installed` (nothing is changed). `/api/health` lists `admin_actions` as missing until then.

Pages (admins only; everyone else gets a 404):
* `/admin`: overview (users, new sign-ups, paid Premium, lifetime, gifts, trials, net and 30-day revenue, refunds to make, unconfirmed emails, suspended accounts, linked X accounts, active sessions, 14-day sign-up chart), newest users, recent admin actions, then the gift, invoice, X-account and early-bird panels.
* `/admin/users`: search by email (contains), exact user id or linked X username; filters (premium, trial, free, has paid, gift, unconfirmed, suspended, admins); newest first, 25 per page.
* `/admin/users/:id`: everything about one account: sign-in details, effective plan (same entitlement logic as the extension), trial, subscriptions, payments (with invoice links), checkout orders, slot grants, gifts (grant, extend, revoke), linked X accounts (change, unlink, history), active sessions, and that user's admin history.
* `/admin/payments`: all payments with a status filter, orders that need a manual refund (`refund_required`), open checkouts. Read-only.
* `/admin/audit`: one timeline of every admin change: account controls, gifts, X-account corrections and early-bird edits.

Account controls (`POST /api/admin/users/:id/actions`; reason required, explicit confirmation, logged in `admin_actions` with the admin, time, reason and details):
* **Sign out everywhere**: deletes the user's Supabase Auth sessions (and so their refresh tokens) and active-session slots; the website and the extension are signed out. The user can sign in again. If the database refuses to touch `auth.sessions`, the action reports `auth_sessions_denied`.
* **Suspend / lift suspension**: Supabase Auth ban (`ban_duration`), plus sign-out everywhere. Paid access, payments and all records are kept.
* **Confirm email**, **send password reset** (the same email as "Forgot password"), **change email** (to a confirmed address no other account uses; the old and new address are logged).
* Not on your own account. Against another admin only "lift suspension" and "confirm email" are allowed (remove them from `public.admins` first).

Deliberately not available: deleting accounts (payments and orders block it, and deleting would erase the trial record and reopen a free trial), creating payments or marking orders as paid, editing subscriptions or trials, and granting X-account slots without a payment. To give Premium, use a gift.

## Premium gifts and Early Bird (applied 2026-10-16)

Page: `/admin` (signed-in administrators only; everyone else gets a 404). Migration: `supabase/migrations/20261016165539_admin_gifts_early_bird.sql`. **Applied to production on 2026-10-16** and verified (RLS on all new tables, admin functions service-role only, early bird unchanged: enabled, 100 remaining, 0 sold). The owner account was added to `public.admins`.

## Who is an administrator
* A user is an admin only if their auth user id is in `public.admins`. No API role can write that table: add or remove admins in the **Supabase SQL Editor**:
  ```sql
  insert into public.admins (user_id, note)
  select id, 'owner' from auth.users where email = 'you@example.com';
  -- remove: delete from public.admins where user_id = '<id>';
  ```
* Every admin page and API (`/api/admin/*`) checks the **verified session** user against `public.admins` on the server, requires an active session (single-login), a confirmed email and, for writes, a same-origin request. Every admin database function checks `public.admins` again (`not_admin`), and those functions are executable by the server's service role only. Client-side flags, hidden controls or ids in request bodies are never trusted (bodies are strict: unknown fields are rejected; the admin id always comes from the session).

## Premium gifts
* Stored in `premium_gifts` (recipient, admin, duration, start, expiry, status, reason) with an append-only audit log `premium_gift_events` (grant / extend / revoke, admin, previous and new expiry, reason, time).
* Durations: 7 days, 30 days, 90 days, 1 year, Lifetime. Expiry is computed by the database (`now()`); lifetime has no expiry.
* One running gift per user (granting again answers "extend it instead"). **Extend** adds time from the later of now and the current expiry (an expired gift restarts from now) or makes it lifetime. **Revoke** ends it at once.
* A gift is **not** a payment: nothing is written to `payments`, `checkout_orders` or `subscriptions`, and no NOWPayments call is made.
* Entitlement (`/api/entitlement`, the dashboard, the extension): paid and trial access is computed exactly as before; a valid gift becomes the effective plan (reported as `PRO_MONTHLY` for 7/30 days, `PRO_YEARLY` for 90 days/1 year, `PRO_LIFETIME` for lifetime, with `source: "subscription"` and `gift.effective: true`, because the extension accepts only those values) only when it keeps Premium **longer** (ties go to the paid plan). So revoking or expiring a gift can never remove purchased access, and a paid lifetime stays `PRO_LIFETIME`.
* Recipients can read their own gift's dates and status (RLS), never the internal reason or the admin.

## Lifetime Early Bird
* Prices (fixed in `src/config/pricing.ts`): regular Lifetime **$59.99**, Early Bird **$29.99**, one-time. Initial campaign allocation: **100** successful Early Bird purchases. ($0.99 is not a lifetime price; it is only the X-account slot add-on.)
* Settings (`early_bird_settings`, one row): `enabled`, `sales_cap`, `campaign_allocation`. **Remaining = sales_cap - successful sales.** Successful sales are the rows of `early_adopter_slots`, created only by `billing_apply` for a verified, finished NOWPayments payment of a `PRO_LIFETIME_EARLY` order, once per payment.
* Editing "remaining" sets `sales_cap = sales + remaining` (0 is allowed). It never resets or edits sales, orders or entitlements. It cannot exceed the campaign allocation; raising the allocation is a separate, explicit action that requires a reason. Every change is audited in `early_bird_events` (admin, time, previous/new remaining, enabled, allocation, sales at the time, reason). Stale edits (someone changed it meanwhile) are refused.
* Checkout (server decides): while enabled and spots remain after open reservations, a Lifetime checkout becomes a $29.99 `PRO_LIFETIME_EARLY` order holding a 1-hour reservation; otherwise it is a regular $59.99 `PRO_LIFETIME` order. The browser can only ask for `PRO_LIFETIME`; the database refuses discounted orders when disabled (`early_disabled`) or sold out.
* Reservations and payments: an **unexpired** reservation keeps its $29.99 price and spot even if an admin then lowers the count or disables the offer. A **late** payment (reservation expired) is honoured only while the offer is enabled and spots remain; otherwise the order becomes `refund_required` (refund it manually). Pending, confirming, partially paid, failed and expired payments never use a spot; failed/expired orders release their reservation. Duplicate callbacks are ignored (idempotent events, one slot per payment). A refunded Early Bird sale revokes that buyer's access but still counts as a sale (spots are not recycled automatically; raise "remaining" if you want to offer it again).
* All inventory decisions (reservations, payment fulfilment, admin edits) run under one database lock, so concurrent checkouts cannot oversell (tested with simultaneous connections).
* The public pricing page shows the database's numbers only: "N of T spots left" where N = remaining (set by an admin) and T = the campaign allocation (100). When disabled or at 0 it shows the regular price.
