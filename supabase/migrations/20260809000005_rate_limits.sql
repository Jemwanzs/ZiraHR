-- Server-side rate limiting for /api/forms/* — see docs/06-technical/security.md
-- ("No rate limiting" gap). Backed by Postgres rather than an external
-- service (Upstash/Vercel KV): Supabase is already provisioned, and a
-- DB-backed counter gives the same "shared state across serverless
-- instances" property that an in-memory counter can't, without adding a
-- new dependency.
create table if not exists public.rate_limits (
  key text not null,
  window_start timestamptz not null,
  count integer not null default 1,
  primary key (key, window_start)
);

alter table public.rate_limits enable row level security;
-- No policies — server-only via service-role key, called through the
-- check_rate_limit() function below. See 20260809000001_demo_requests.sql
-- for the rationale.

-- Atomically increments the counter for (key, current window) and reports
-- whether the caller is still within p_max_requests for that window.
-- security definer + fixed search_path so it can be safely exposed via
-- PostgREST rpc() to the service-role key without callers needing direct
-- table grants.
create or replace function public.check_rate_limit(
  p_key text,
  p_max_requests integer,
  p_window_seconds integer
) returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_window_start timestamptz;
  v_count integer;
begin
  v_window_start := to_timestamp(
    floor(extract(epoch from now()) / p_window_seconds) * p_window_seconds
  );

  -- Opportunistic cleanup of this key's expired windows instead of a cron
  -- job — keeps the table small without needing pg_cron provisioned.
  delete from public.rate_limits
  where key = p_key and window_start < v_window_start;

  insert into public.rate_limits (key, window_start, count)
  values (p_key, v_window_start, 1)
  on conflict (key, window_start)
  do update set count = rate_limits.count + 1
  returning count into v_count;

  return v_count <= p_max_requests;
end;
$$;
