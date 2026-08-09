-- Newsletter subscriptions — see docs/06-technical/supabase.md.
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  locale text,
  status text not null default 'subscribed',
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;
-- No policies — server-side only via the service-role key. See
-- 20260809000001_demo_requests.sql for the rationale.
