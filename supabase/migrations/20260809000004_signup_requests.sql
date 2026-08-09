-- Progressive signup wizard submissions from /signup — see
-- docs/06-technical/supabase.md. Captured here before redirecting into the
-- real HRMIS app's organization setup journey (there's no account-creation
-- system on the marketing site itself).
create table if not exists public.signup_requests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  work_email text not null,
  phone text,
  company_name text not null,
  country text not null,
  industry text,
  employee_count text,
  branch_count text,
  department_count text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.signup_requests enable row level security;
-- No policies — server-side only via the service-role key. See
-- 20260809000001_demo_requests.sql for the rationale.
