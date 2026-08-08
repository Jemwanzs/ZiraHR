# Architecture

## Stack decisions

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 15, App Router | Server-rendered/indexable by default (SEO requirement), file-based routing matches the flat route map cleanly, Vercel-native |
| Language | TypeScript, strict mode | Maintainability requirement from brief |
| UI | React 19 | Ships with Next.js 15 |
| Styling | Tailwind CSS v4 | Design-token-driven theme (colors/type/motion docs map directly to Tailwind theme config), no separate CSS-in-JS runtime cost |
| Animation | Motion (Framer Motion successor) | The one animation library — see `03-brand/motion-language.md` |
| i18n | next-intl | App-Router-native, locale-prefixed routing + middleware, structured message catalogs — matches the "structured translation keys, no hardcoding" requirement exactly |
| Validation | Zod | Shared schema between client and server form validation, no separate form-state library needed |
| Data | @supabase/supabase-js, server-only | Lead capture only, per brief — see `supabase.md` |
| Package manager | npm | Lowest-friction default, zero-config on Vercel |
| Hosting | Vercel | Specified; zero-config for Next.js |

Explicitly **not** used unless a real need emerges later: React Hook Form, a CMS, a state-management library, a test framework, a second animation library, client-exposed Supabase anon writes, CAPTCHA (until spam becomes an actual problem).

## Branch strategy

`main` (always deployable, connected to Vercel production once you link the project) + short-lived `feature/*` branches merged via PR. No separate `develop` branch — agreed as unnecessary overhead for this team size (see `00-source/build-brief.md` — the brief explicitly says not to force its suggested `main/develop/feature` structure if a simpler valid workflow fits better).

## High-level request flow

1. Visitor hits a locale-prefixed route → `middleware.ts` (next-intl) resolves locale from cookie/`Accept-Language`/URL, sets `NEXT_LOCALE` cookie.
2. Route renders as a Server Component by default — content is present in the initial HTML (SEO requirement).
3. Motion/interactive pieces are Client Components nested inside, hydrated on top of server-rendered content — never gating base content behind client rendering.
3. Forms POST to `/api/forms/*` Route Handlers, which validate (Zod), spam-check, insert via Supabase service role, best-effort notify Slack, return a typed JSON response.

## Development phases

See the approved plan (`calm-spinning-parasol.md`) for the authoritative 11-phase sequence: Docs → Scaffold → Global shell → Homepage → Product/SEO pages → Forms/Supabase/Slack → Resources/Company/Legal → Motion/A11y pass → Performance pass → QA → Vercel handoff. Each phase commits and pushes to `main` once in a working state.
