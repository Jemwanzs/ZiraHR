-- Demo request submissions from /request-demo — see docs/06-technical/supabase.md.
create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  work_email text not null,
  phone text,
  company_name text not null,
  country text not null,
  employee_count text,
  interested_modules text[] default '{}',
  message text,
  preferred_contact_method text,
  source text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.demo_requests enable row level security;

-- Intentionally no policies: nothing is readable or writable from the
-- browser. All access happens server-side via the service-role key, which
-- bypasses RLS entirely. See docs/06-technical/supabase.md for the
-- rationale (avoids needing an insert-only anon policy that would still be
-- directly abusable without a CAPTCHA layer we've deliberately deferred).
