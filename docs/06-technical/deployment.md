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
```

Documented (with blank values) in `.env.example` at the repo root; real values live only in Vercel project settings and local `.env.local` (gitignored).

## Build verification (pre-handoff)

Until a Vercel project exists, "deployment-ready" is verified locally: `npm run build` succeeds, `npm start` serves the production build correctly, and `npm run lint` is clean. This is re-checked at the end of every phase (see `architecture.md`), not deferred to the end of the project.

## Domain

Not yet specified by you — `NEXT_PUBLIC_SITE_URL` and canonical/OG URLs use a placeholder (`https://zira-hr-jms.vercel.app`, adjust when the real domain is confirmed) until you provide the production domain.
