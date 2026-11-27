-- Automatic trial, bound to the first X account.
--
-- A new account's Premium trial starts as soon as the account is active (email confirmed, or a Google sign-in,
-- whose email Google has verified), before any X account is linked. The trial is bound to the FIRST X account the
-- account links - in practice at the first autopilot run in the extension - and that X username can then never start
-- a trial on another account (trials_x_username_key, as before).
--
-- What changes:
--   1. trials.x_username_normalized may be NULL: a trial that is not bound to an X account yet. The unique
--      constraint is unchanged (NULLs never collide; a bound username still cannot repeat).
--   2. trials.revoked_reason (nullable): why a trial ended early. Only 'x_account_trial_used' is written here.
--   3. public.start_account_trial(p_user, p_days): starts the account's trial without needing an X account (bound
--      at once when the account already has one). Service role only. Returns a jsonb status.
--   4. A trigger on x_account_bindings: when an account links an X account while its trial is active and unbound,
--      the trial is bound to that username; if the username already had a trial on another account, this
--      account's trial ends (status 'revoked', reason 'x_account_trial_used'). One trial per X account, as before.
--
-- Not changed: existing trial rows (every one is already bound), public.start_trial (kept for compatibility),
-- subscriptions, payments, gifts, X account bindings and their rules.

alter table public.trials alter column x_username_normalized drop not null;

alter table public.trials add column if not exists revoked_reason text;
alter table public.trials drop constraint if exists trials_revoked_reason_check;
alter table public.trials add constraint trials_revoked_reason_check
  check (revoked_reason is null or (status = 'revoked' and revoked_reason in ('x_account_trial_used')));

comment on column public.trials.x_username_normalized is
  'The X account the trial is bound to (normalized). NULL until the account links its first X account.';
comment on column public.trials.revoked_reason is
  'Why the trial ended early: x_account_trial_used = the first linked X account had already used a trial on another account.';

-- ------------------------------------------------------------------ start_account_trial
create or replace function public.start_account_trial(p_user uuid, p_days integer default 30)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_confirmed timestamptz;
  v_norm text;
  v_row public.trials;
begin
  if p_days is null or p_days < 1 or p_days > 60 then
    raise exception 'invalid_trial_days' using errcode = 'P0001';
  end if;
  if p_user is null or not exists (select 1 from public.profiles where id = p_user) then
    return jsonb_build_object('status', 'no_account');
  end if;
  select email_confirmed_at into v_confirmed from auth.users where id = p_user;
  if v_confirmed is null then
    return jsonb_build_object('status', 'email_not_verified');
  end if;

  -- One start at a time per account (the unique constraint is the final word either way).
  perform pg_advisory_xact_lock(hashtextextended('growx.trial:' || p_user::text, 0));
  if exists (select 1 from public.trials where user_id = p_user) then
    return jsonb_build_object('status', 'already_used');
  end if;

  -- An account that already linked an X account (for example on the website) is bound to its first one now.
  select normalized_username into v_norm
    from public.x_account_bindings
   where user_id = p_user and status = 'active'
   order by created_at asc, id asc
   limit 1;
  if v_norm is not null and exists (select 1 from public.trials where x_username_normalized = v_norm) then
    return jsonb_build_object('status', 'x_account_trial_used');
  end if;

  insert into public.trials (user_id, x_username_normalized, started_at, expires_at, status)
  values (p_user, v_norm, now(), now() + make_interval(days => p_days), 'active')
  returning * into v_row;

  return jsonb_build_object('status', 'started', 'started_at', v_row.started_at, 'expires_at', v_row.expires_at,
                            'x_username', v_row.x_username_normalized);
exception when unique_violation then
  -- a concurrent start won the race (or the username was bound a moment ago): nothing was created here
  return jsonb_build_object('status', 'already_used');
end;
$$;

revoke all on function public.start_account_trial(uuid, integer) from public, anon, authenticated;
grant execute on function public.start_account_trial(uuid, integer) to service_role;

-- ------------------------------------------------------------------ bind on the first X account
create or replace function public.bind_trial_to_x_account()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_trial uuid;
begin
  if new.status <> 'active' then
    return new;
  end if;
  select id into v_trial
    from public.trials
   where user_id = new.user_id and x_username_normalized is null and status = 'active' and expires_at > now()
   for update;
  if v_trial is null then
    return new;               -- no trial, already bound, or ended: nothing to bind
  end if;
  if exists (select 1 from public.trials where x_username_normalized = new.normalized_username) then
    update public.trials set status = 'revoked', revoked_reason = 'x_account_trial_used' where id = v_trial;
  else
    update public.trials set x_username_normalized = new.normalized_username where id = v_trial;
  end if;
  return new;
end;
$$;

revoke all on function public.bind_trial_to_x_account() from public, anon, authenticated;

drop trigger if exists x_account_bindings_bind_trial on public.x_account_bindings;
create trigger x_account_bindings_bind_trial
  after insert on public.x_account_bindings
  for each row execute function public.bind_trial_to_x_account();
