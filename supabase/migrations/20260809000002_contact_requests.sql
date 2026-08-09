-- Contact form submissions from /contact — see docs/06-technical/supabase.md.
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  subject text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.contact_requests enable row level security;
-- No policies — server-side only via the service-role key. See
-- 20260809000001_demo_requests.sql for the rationale.
