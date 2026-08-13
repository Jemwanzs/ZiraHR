# Deployment

## Target

Vercel, zero-config Next.js deployment. You connect the GitHub repo (`Jemwanzs/ZiraHR` — repo name predates the SoftHR rebrand, kept as-is) to a Vercel project and supply the project details/env vars — nothing on the code side blocks this; the app builds and runs standalone with `npm run build && npm start` and has no infrastructure dependency beyond the env vars listed in `supabase.md` and `notifications.md`.

## Environments

- **Production** — `main` branch → Vercel production deployment.
- **Preview** — every `feature/*` branch / PR → Vercel preview deployment automatically (default Vercel behaviour once connected), useful for reviewing a phase before merging to `main`.

## Environment variables

Mostly server-only (no `NEXT_PUBLIC_*` secrets — this app has none, since Supabase is server-only and no third-party analytics/CAPTCHA key is wired yet):

```
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
SLACK_WEBHOOK_DEMO_REQUESTS
SLACK_WEBHOOK_SIGNUP
SLACK_WEBHOOK_CONTACT
NEXT_PUBLIC_SITE_URL        (canonical production URL, used for metadataBase/sitemap — non-secret)
NEXT_PUBLIC_APP_URL         (the existing HR app used for Login/Signup redirects — currently PayeKenya, https://www.payekenya.xyz/ — non-secret)
GOOGLE_SITE_VERIFICATION    (Search Console ownership-verification meta tag content — non-secret, optional, only rendered if set)
```

Documented (with blank values) in `.env.example` at the repo root; real values live only in Vercel project settings and local `.env.local` (gitignored).

## Build verification (pre-handoff)

Before a Vercel project existed, "deployment-ready" was verified locally: `npm run build` succeeds, `npm start` serves the production build correctly, and `npm run lint` is clean. This is re-checked at the end of every phase (see `architecture.md`), not deferred to the end of the project — still true now that a real deployment exists.

## Domain

A Vercel project is live in production at `https://softhr.vercel.app` (`NEXT_PUBLIC_SITE_URL` set accordingly there — confirmed live 2026-08-13, and correctly serving `robots.txt`/`sitemap.xml`/canonical/OG tags against that URL). No custom domain has been connected yet, though — this is still the Vercel-assigned subdomain, not a domain you own. If/when you connect a real domain, update `NEXT_PUBLIC_SITE_URL` in Vercel and re-verify Google Search Console against the new domain (see `09-qa/launch-checklist.md`'s Search Console entry for the tradeoffs of registering the `.vercel.app` URL now vs. waiting).

Note: an earlier, now-dead Vercel deployment alias (`zira-hr-jms.vercel.app`, 404s as of 2026-08-13) was hardcoded as the fallback default throughout the codebase and has been corrected to `softhr.vercel.app` everywhere it appeared (`src/lib/seo.ts`, `layout.tsx`, `robots.ts`, `sitemap.ts`, `StructuredData.tsx`, `Breadcrumbs.tsx`, `.env.example`, and this doc). That fallback is only used if `NEXT_PUBLIC_SITE_URL` isn't set — production already has it set correctly, so this was a docs/local-dev-default correction, not a production fix.
