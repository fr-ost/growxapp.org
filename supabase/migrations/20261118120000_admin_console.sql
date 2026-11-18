-- Admin console: user directory, statistics, session sign-out and a general admin audit log.
--
-- Additive and non-destructive: one new append-only table and five new functions. No existing table, row or
-- function is changed. Like the gift and early-bird functions, every function re-checks public.admins (so a server
-- bug cannot let a non-admin act) and is executable by the website server (service_role) only, never by browser roles.
--
-- Deliberately NOT here: deleting users, marking orders or payments as paid, editing subscriptions or trials, and
-- granting X-account slots without a payment. Premium is granted manually through gifts (existing), which never touch
-- payments, subscriptions or trials.

-- ================================================================ admin audit log
create table public.admin_actions (
  id              bigint generated always as identity primary key,
  admin_id        uuid not null,                                 -- no FK: history survives
  target_user_id  uuid,                                          -- no FK: history survives
  action          text not null check (action in (
                    'revoke_sessions', 'suspend', 'unsuspend', 'confirm_email', 'send_password_reset', 'change_email')),
  reason          text check (reason is null or length(reason) <= 500),
  details         jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now()
);
create index admin_actions_target_idx on public.admin_actions (target_user_id, id desc);

alter table public.admin_actions enable row level security;
revoke all on public.admin_actions from anon, authenticated, service_role;
grant select on public.admin_actions to service_role;     -- written only through the functions below
create trigger admin_actions_append_only
  before update or delete on public.admin_actions
  for each row execute function public.premium_gift_events_append_only();

-- Records an action the server performed through the Supabase Auth admin API (suspend, confirm email, ...).
create or replace function public.admin_log_action(p_admin uuid, p_target uuid, p_action text, p_reason text, p_details jsonb default '{}'::jsonb)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_reason text := nullif(btrim(coalesce(p_reason, '')), '');
  v_id bigint;
begin
  if not public._is_admin(p_admin) then raise exception 'not_admin' using errcode = '42501'; end if;
  if p_action not in ('suspend', 'unsuspend', 'confirm_email', 'send_password_reset', 'change_email') then
    raise exception 'invalid_action' using errcode = '22023';
  end if;
  if v_reason is not null and length(v_reason) > 500 then raise exception 'reason_too_long' using errcode = '22023'; end if;
  if p_target is null or not exists (select 1 from public.profiles where id = p_target) then
    return jsonb_build_object('status', 'not_found');
  end if;
  insert into public.admin_actions (admin_id, target_user_id, action, reason, details)
  values (p_admin, p_target, p_action, v_reason, coalesce(p_details, '{}'::jsonb))
  returning id into v_id;
  return jsonb_build_object('status', 'ok', 'id', v_id);
end;
$$;

-- ================================================================ sign out everywhere
-- Deleting the user's Supabase Auth sessions also deletes their refresh tokens, so neither the website nor the
-- extension can renew a token, and check_active_session() reports 'revoked' for both. The user can sign in again
-- (to stop that, suspend the account). An admin cannot do this to their own account here.
create or replace function public.admin_revoke_sessions(p_admin uuid, p_user uuid, p_reason text)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_reason text := nullif(btrim(coalesce(p_reason, '')), '');
  v_auth integer := 0;
  v_slots integer := 0;
begin
  if not public._is_admin(p_admin) then raise exception 'not_admin' using errcode = '42501'; end if;
  if v_reason is null or length(v_reason) < 3 then return jsonb_build_object('status', 'error', 'code', 'reason_required'); end if;
  if length(v_reason) > 500 then return jsonb_build_object('status', 'error', 'code', 'reason_too_long'); end if;
  if p_user = p_admin then return jsonb_build_object('status', 'error', 'code', 'self'); end if;
  if not exists (select 1 from public.profiles where id = p_user) then return jsonb_build_object('status', 'not_found'); end if;
  begin
    delete from auth.sessions where user_id = p_user;
    get diagnostics v_auth = row_count;
  exception when insufficient_privilege then
    return jsonb_build_object('status', 'error', 'code', 'auth_sessions_denied');
  end;
  delete from public.active_sessions where user_id = p_user;
  get diagnostics v_slots = row_count;
  insert into public.admin_actions (admin_id, target_user_id, action, reason, details)
  values (p_admin, p_user, 'revoke_sessions', v_reason, jsonb_build_object('auth_sessions', v_auth, 'active_slots', v_slots));
  return jsonb_build_object('status', 'ok', 'sessions', v_auth);
end;
$$;

-- ================================================================ user directory
-- Search (email contains, exact user id, or linked X username contains) + filter + newest first + paging.
-- The plan shown on the page is computed by the website with the same entitlement logic as the extension; the
-- flags here are only for filtering.
create or replace function public.admin_list_users(p_admin uuid, p_query text, p_filter text, p_limit integer, p_offset integer)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_q text := lower(btrim(coalesce(p_query, '')));
  v_x text;
  v_filter text := coalesce(nullif(p_filter, ''), 'all');
  v_limit integer := least(greatest(coalesce(p_limit, 25), 1), 100);
  v_offset integer := greatest(coalesce(p_offset, 0), 0);
  v_total integer;
  v_rows jsonb;
begin
  if not public._is_admin(p_admin) then raise exception 'not_admin' using errcode = '42501'; end if;
  if v_filter not in ('all', 'premium', 'trial', 'free', 'paid', 'gift', 'unconfirmed', 'suspended', 'admins') then
    raise exception 'invalid_filter' using errcode = '22023';
  end if;
  if length(v_q) > 320 then raise exception 'query_too_long' using errcode = '22023'; end if;
  v_x := ltrim(v_q, '@');

  with base as (
    select u.id, u.email, u.created_at, u.last_sign_in_at, u.email_confirmed_at, u.banned_until,
           coalesce(u.raw_app_meta_data -> 'providers', '[]'::jsonb) as providers,
           exists (select 1 from public.trials t where t.user_id = u.id and t.status = 'active' and t.expires_at > now()) as trial_active,
           exists (select 1 from public.trials t where t.user_id = u.id) as trial_used,
           exists (select 1 from public.subscriptions s where s.user_id = u.id and s.access_revoked_at is null
                     and ((s.plan = 'PRO_LIFETIME' and s.status = 'active')
                          or (s.status in ('active', 'past_due') and s.current_period_end > now()))) as paid_active,
           exists (select 1 from public.premium_gifts g where g.user_id = u.id and g.status = 'active'
                     and (g.expires_at is null or g.expires_at > now())) as gift_active,
           (select count(*) from public.payments p where p.user_id = u.id and p.status = 'succeeded')::integer as payments,
           coalesce((select jsonb_agg(b.username order by b.created_at) from public.x_account_bindings b
                      where b.user_id = u.id and b.status = 'active'), '[]'::jsonb) as x_accounts,
           exists (select 1 from public.admins a where a.user_id = u.id) as is_admin
      from auth.users u
     where v_q = ''
        or position(v_q in lower(coalesce(u.email, ''))) > 0
        or u.id::text = v_q
        or (v_x <> '' and exists (select 1 from public.x_account_bindings b
                                   where b.user_id = u.id and position(v_x in b.normalized_username) > 0))
  ), filtered as (
    select * from base
     where case v_filter
             when 'premium' then paid_active or gift_active
             when 'trial' then trial_active and not paid_active and not gift_active
             when 'free' then not trial_active and not paid_active and not gift_active
             when 'paid' then payments > 0
             when 'gift' then gift_active
             when 'unconfirmed' then email_confirmed_at is null
             when 'suspended' then banned_until is not null and banned_until > now()
             when 'admins' then is_admin
             else true
           end
  )
  select (select count(*) from filtered)::integer,
         coalesce((select jsonb_agg(to_jsonb(f) order by f.created_at desc, f.id)
                     from (select * from filtered order by created_at desc, id limit v_limit offset v_offset) f), '[]'::jsonb)
    into v_total, v_rows;

  return jsonb_build_object('status', 'ok', 'total', v_total, 'limit', v_limit, 'offset', v_offset, 'rows', v_rows);
end;
$$;

-- ================================================================ statistics
create or replace function public.admin_stats(p_admin uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v jsonb;
begin
  if not public._is_admin(p_admin) then raise exception 'not_admin' using errcode = '42501'; end if;
  select jsonb_build_object(
    'users_total', (select count(*) from auth.users),
    'users_7d', (select count(*) from auth.users where created_at > now() - interval '7 days'),
    'users_30d', (select count(*) from auth.users where created_at > now() - interval '30 days'),
    'unconfirmed', (select count(*) from auth.users where email_confirmed_at is null),
    'suspended', (select count(*) from auth.users where banned_until is not null and banned_until > now()),
    'admins', (select count(*) from public.admins),
    'trials_active', (select count(*) from public.trials where status = 'active' and expires_at > now()),
    'trials_total', (select count(*) from public.trials),
    'paid_active', (select count(distinct user_id) from public.subscriptions s where s.access_revoked_at is null
                      and ((s.plan = 'PRO_LIFETIME' and s.status = 'active')
                           or (s.status in ('active', 'past_due') and s.current_period_end > now()))),
    'lifetime', (select count(distinct user_id) from public.subscriptions
                   where plan = 'PRO_LIFETIME' and status = 'active' and access_revoked_at is null),
    'gifts_active', (select count(*) from public.premium_gifts where status = 'active' and (expires_at is null or expires_at > now())),
    'payments_succeeded', (select count(*) from public.payments where status = 'succeeded'),
    'payments_30d', (select count(*) from public.payments where status = 'succeeded' and created_at > now() - interval '30 days'),
    'revenue', coalesce((select jsonb_object_agg(currency, jsonb_build_object('gross', gross, 'refunded', refunded, 'net', gross - refunded))
                           from (select currency, sum(amount_minor)::bigint as gross, sum(refunded_minor)::bigint as refunded
                                   from public.payments where status in ('succeeded', 'refunded', 'disputed') group by currency) r), '{}'::jsonb),
    'revenue_30d', coalesce((select jsonb_object_agg(currency, total)
                               from (select currency, sum(amount_minor - refunded_minor)::bigint as total from public.payments
                                      where status in ('succeeded', 'refunded', 'disputed') and created_at > now() - interval '30 days'
                                      group by currency) r), '{}'::jsonb),
    'orders_open', (select count(*) from public.checkout_orders where status in ('created', 'pending')),
    'orders_refund_required', (select count(*) from public.checkout_orders where status = 'refund_required'),
    'x_accounts_active', (select count(*) from public.x_account_bindings where status = 'active'),
    'sessions_active', (select count(*) from public.active_sessions),
    'signups_14d', (select jsonb_agg(jsonb_build_object('day', d::date, 'count',
                       (select count(*) from auth.users u where u.created_at >= d and u.created_at < d + interval '1 day')) order by d)
                      from generate_series(date_trunc('day', now()) - interval '13 days', date_trunc('day', now()), interval '1 day') d)
  ) into v;
  return v;
end;
$$;

revoke all on function public.admin_log_action(uuid, uuid, text, text, jsonb) from public, anon, authenticated;
revoke all on function public.admin_revoke_sessions(uuid, uuid, text) from public, anon, authenticated;
revoke all on function public.admin_list_users(uuid, text, text, integer, integer) from public, anon, authenticated;
revoke all on function public.admin_stats(uuid) from public, anon, authenticated;
grant execute on function public.admin_log_action(uuid, uuid, text, text, jsonb) to service_role;
grant execute on function public.admin_revoke_sessions(uuid, uuid, text) to service_role;
grant execute on function public.admin_list_users(uuid, text, text, integer, integer) to service_role;
grant execute on function public.admin_stats(uuid) to service_role;
