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

## Security model

**Row Level Security is enabled on all three tables with zero policies granted to `anon`/`authenticated` roles** — nothing is readable or writable directly from the browser. All inserts happen server-side, inside Next.js Route Handlers, using the Supabase **service role key** (server-only environment variable, never `NEXT_PUBLIC_*`). This is simpler and safer than writing an "insert-only" RLS policy for anonymous users, which would still be directly abusable (spam, scraping) without a CAPTCHA layer we've deliberately deferred.

Practical effect: even if someone finds the Supabase project URL and anon key, they cannot read or write any lead data — every table is fully locked from the client.

## Server client

`src/lib/supabase/server.ts` exports a single factory that builds a Supabase client from `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` (both server-only env vars). Imported only from Route Handlers — never from a Client Component, never from a Server Component that could leak into a client bundle.

## Migrations

SQL migration files live in `/supabase/migrations/`, one file per table plus RLS setup, timestamp-prefixed. Written and version-controlled now; actually applied to a real Supabase project once you provide project credentials (Phase 6 dependency, see the approved plan's Risks section).

## Environment variables (documented in `.env.example`, values supplied by you)

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

No `NEXT_PUBLIC_SUPABASE_*` variables exist in this project — there is no client-side Supabase usage.
