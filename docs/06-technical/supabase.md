# Supabase

## Scope

Lead-generation only, per the brief: demo requests, contact/enquiries, newsletter subscriptions. Static marketing/product/SEO content is never stored in Supabase — it stays in code (Server Components + message catalogs) for performance and indexability.

## Tables

### `demo_requests`
`id uuid pk default gen_random_uuid()`, `first_name text`, `last_name text`, `work_email text`, `phone text`, `company_name text`, `country text`, `employee_count text`, `interested_modules text[]`, `message text`, `preferred_contact_method text`, `source text` (page/campaign the form was submitted from), `status text default 'new'`, `created_at timestamptz default now()`

### `contact_requests`
`id`, `name text`, `email text`, `phone text`, `company text`, `subject text`, `message text`, `status text default 'new'`, `created_at timestamptz default now()`

### `newsletter_subscribers`
`id`, `email text unique`, `locale text`, `status text default 'subscribed'`, `created_at timestamptz default now()`

### `signup_requests`
**Added beyond the brief's original three tables** — the kickoff conversation explicitly asked for a Slack notification on "signup requests" (see `00-source/build-brief.md`, Integrations Confirmed), which implies the progressive `/signup` wizard (scope §31) needs somewhere to persist what it collects before redirecting into the real HRMIS app's setup journey — there's no account-creation system on this marketing site itself.

`id`, `first_name text`, `last_name text`, `work_email text`, `phone text`, `company_name text`, `country text`, `industry text`, `employee_count text`, `branch_count text`, `department_count text`, `status text default 'new'`, `created_at timestamptz default now()`

## Security model

**Row Level Security is enabled on all three tables with zero policies granted to `anon`/`authenticated` roles** — nothing is readable or writable directly from the browser. All inserts happen server-side, inside Next.js Route Handlers, using the Supabase **service role key** (server-only environment variable, never `NEXT_PUBLIC_*`). This is simpler and safer than writing an "insert-only" RLS policy for anonymous users, which would still be directly abusable (spam, scraping) without a CAPTCHA layer we've deliberately deferred.

Practical effect: even if someone finds the Supabase project URL and anon key, they cannot read or write any lead data — every table is fully locked from the client.

## Server client

`src/lib/supabase/server.ts` exports a single factory that builds a Supabase client from `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (both server-only env vars). Imported only from Route Handlers — never from a Client Component, never from a Server Component that could leak into a client bundle.

## Error handling

Every form Route Handler (`src/app/api/forms/*/route.ts`) wraps its Supabase call in `try/catch`. Without it, a missing/misconfigured env var (`getSupabaseServerClient()` throws synchronously if `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` aren't set) or any other unexpected throw crashed the serverless function with an empty response body — the client's `fetch` couldn't parse it as JSON, so the form just showed a generic error with nothing logged server-side to explain why. This was caught live: both `/api/forms/demo-request` and `/api/forms/signup` were failing in production with a `Content-Length: 0` 500 response, while the exact same request against the exact same Supabase project succeeded locally — confirming the code and schema were correct and pointing at a Vercel Production environment-variable gap rather than a bug. The `try/catch` doesn't fix a missing env var, but it guarantees a real JSON error response and a `console.error` line in the Vercel function logs instead of a silent crash, regardless of the cause.

## Migrations

SQL migration files live in `/supabase/migrations/`, one file per table plus RLS setup, timestamp-prefixed. Written and version-controlled now; actually applied to a real Supabase project once you provide project credentials (Phase 6 dependency, see the approved plan's Risks section).

## Environment variables (documented in `.env.example`, values supplied by you)

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

No `NEXT_PUBLIC_SUPABASE_*` variables exist in this project — there is no client-side Supabase usage.
