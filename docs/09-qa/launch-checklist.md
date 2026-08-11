# Launch Checklist

Pre-production-launch gate — run once, after all phases are otherwise complete.

**Status as of Phase 10.** This checklist splits cleanly into what Claude could verify from this environment and what genuinely needs you (domain, Vercel project, legal review, translations) — the unchecked items below are not oversights, they're the actual remaining gate before this can go live.

## Content
- [x] All `qa-checklist.md` content-integrity items pass.
- [ ] No `[FR]`/`[SW]` placeholder-translation markers remain. **Not done** — French and Swahili are structurally complete (437/437/437 keys match English) but every value is still a `[FR]`/`[SW]`-prefixed placeholder, by design, per `07-localization/localization-strategy.md`. **You need to**: get real, human-approved FR/SW copy before launch, or ship English-only and add the other locales later — don't ship the placeholder text live.
- [ ] Legal pages contain real, approved copy. **Not done** — Privacy/Terms/Security/Cookies are honest "coming soon" pages (`components/product/LegalComingSoon.tsx`), already `noindex` and excluded from the sitemap so this isn't blocking a technical launch, but real legal copy (from you or counsel) is needed before this is a complete, launchable site.
- [x] Customer Proof section is cleanly omitted from the live page (built in the plan, never rendered) rather than shipped with placeholder testimonials.

## Technical
- [x] Production build (`npm run build && npm start`) verified repeatedly across all 10 phases, not just `next dev`.
- [x] Lighthouse run against the production build meets targets — **94/96/100/100** (homepage), **95/96/100/100** (`/payroll`), against the 90+/95+/95+/95+ targets. See `06-technical/performance.md`.
- [ ] All environment variables set in the real Vercel project. **Not done** — you have `.env.local` set locally with real Supabase/Slack values; **you need to**: add the same variables to the Vercel project once it exists, plus update `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_APP_URL` to the real production domains (both are still placeholders — `https://zira-hr-jms.vercel.app` / `https://app.the site`).
- [x] Supabase RLS verified locked — all four tables have RLS enabled with zero policies (checked into the migration SQL you ran); every write goes through the service-role key server-side. Not independently re-tested with an anon key (none was shared), but the SQL content itself guarantees no anon access exists.
- [x] Forms tested end-to-end against the real Supabase project + real Slack webhooks (Phase 6) — found and fixed a honeypot bug in the process; all four forms confirmed inserting correctly, spam paths confirmed silently blocked, test rows cleaned up afterward.
- [ ] Domain connected and SSL verified on Vercel. **Not done** — no domain has been provided yet.
- [ ] `robots.txt`/sitemap point at the real production domain. **Not done** — currently driven by the `NEXT_PUBLIC_SITE_URL` placeholder; this resolves automatically once that env var is set to the real domain in Vercel.

## Accessibility & SEO
- [x] `accessibility-checklist.md` — all items checked except a live screen-reader pass (needs a human).
- [x] `seo-checklist.md` — all items checked except OG image rendering and a live Rich Results Test (both need a real public URL and real OG image assets, neither of which exist yet).
- [ ] Structured data spot-checked live in Rich Results Test. **Not done** — needs a deployed public URL.

## Post-launch
- [ ] Submit sitemap to Google Search Console (once you have access set up).
- [ ] Verify analytics event abstraction is actually wired to a real provider, or explicitly confirmed as intentionally deferred. **Currently deferred** — no analytics provider has been chosen yet (`00-source/build-brief.md`'s "Analytics Preparation" section); no event abstraction has been built either, since none of the CTA/form components emit tracking calls yet. This is a real gap if analytics matter for launch — flag if you want it built before going live.
- [ ] Monitor Slack channels for the first real demo/signup/contact submissions once live.

## Summary: what's actually blocking launch right now

Everything code-side is done and verified. What remains needs you specifically: (1) a Vercel project + real domain, (2) production env vars set there, (3) real product screenshots/video to replace the `ScreenshotSlot` placeholders (`08-assets/screenshot-plan.md`), (4) approved FR/SW translations or an English-only launch decision, (5) real legal copy, (6) a decision on analytics. None of these are things Claude can supply on its own.
