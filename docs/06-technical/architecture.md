# Architecture

## Stack decisions

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16, App Router | Server-rendered/indexable by default (SEO requirement), file-based routing matches the flat route map cleanly, Vercel-native. Planned as "Next.js 15" before kickoff; 16 was the actual current stable release when scaffolding started (Aug 2026), and the brief calls for current stable versions — see the Next.js 16 note below |
| Language | TypeScript, strict mode | Maintainability requirement from brief |
| UI | React 19.2 (canary features via Next 16's App Router) | Ships with Next.js 16 |
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

## Next.js 16 note

Next.js 16 was released between the scope being written and implementation starting, and became the version `create-next-app@latest` installs. Per the brief's "use current stable versions" instruction, we built on 16 rather than pinning back to 15. The change that actually affects this codebase: the `middleware.ts` file convention is deprecated in favor of `proxy.ts` (function name `proxy`). We adopted `proxy.ts` from the start (`src/proxy.ts`) rather than building on a convention that's already deprecated on day one. Everything else about the planned architecture (App Router, Server Components by default, async `params`, Metadata API) was already written against post-v15 async-request-API assumptions and needed no changes.

## High-level request flow

1. Visitor hits a route → `src/proxy.ts` (wrapping next-intl's `createMiddleware`) resolves locale from cookie/`Accept-Language`/URL, sets `NEXT_LOCALE` cookie, rewrites to the matched `[locale]` segment.
2. Route renders as a Server Component by default — content is present in the initial HTML (SEO requirement).
3. Motion/interactive pieces are Client Components nested inside, hydrated on top of server-rendered content — never gating base content behind client rendering.
4. Forms POST to `/api/forms/*` Route Handlers, which validate (Zod), spam-check, insert via Supabase service role, best-effort notify Slack, return a typed JSON response.

## Development phases

See the approved plan (`calm-spinning-parasol.md`) for the authoritative 11-phase sequence: Docs → Scaffold → Global shell → Homepage → Product/SEO pages → Forms/Supabase/Slack → Resources/Company/Legal → Motion/A11y pass → Performance pass → QA → Vercel handoff. Each phase commits and pushes to `main` once in a working state.
