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
- [x] Environment variables set in the real Vercel project — **confirmed 2026-08-13**: a Vercel project exists and is live in production at `https://softhr.vercel.app`, with `NEXT_PUBLIC_SITE_URL` correctly set there (verified live `robots.txt`/sitemap/OG tags all self-report that URL, not the codebase's old hardcoded fallback). Supabase/Slack env vars not independently re-verified as live in Vercel this pass, but the forms-tested item below implies they are.
- [x] Supabase RLS verified locked — all four tables have RLS enabled with zero policies (checked into the migration SQL you ran); every write goes through the service-role key server-side. Not independently re-tested with an anon key (none was shared), but the SQL content itself guarantees no anon access exists.
- [x] Forms tested end-to-end against the real Supabase project + real Slack webhooks (Phase 6) — found and fixed a honeypot bug in the process; all four forms confirmed inserting correctly, spam paths confirmed silently blocked, test rows cleaned up afterward.
- [ ] Custom domain connected and SSL verified on Vercel. **Not done** — the site is live and reachable at the Vercel-assigned `https://softhr.vercel.app`, but no domain you own has been connected yet.
- [x] `robots.txt`/sitemap point at the real production URL — **confirmed 2026-08-13**, both correctly self-report `https://softhr.vercel.app` live. (The codebase's fallback default, used only if `NEXT_PUBLIC_SITE_URL` isn't set, pointed at a since-deleted deployment alias — corrected across the codebase; production wasn't affected since its env var was already set correctly.)

## Accessibility & SEO
- [ ] Contrast verified in **both** light and dark theme (dark is the site default as of the theme-toggle addition — see `03-brand/colors.md`'s "Dark theme" section and `06-technical/performance.md`'s "light/dark theme toggle" entry). Every foreground/background pairing was audited by hand while building the toggle (two real bugs found and fixed: teal and orange text both needed brighter dark-mode-only variants), but this hasn't had an automated contrast-checker or screen-reader pass in dark mode specifically.
- [x] `accessibility-checklist.md` — all items checked except a live screen-reader pass (needs a human).
- [x] `seo-checklist.md` — all items checked except OG image rendering and a live Rich Results Test (both need a real public URL and real OG image assets, neither of which exist yet).
- [ ] Structured data spot-checked live in Rich Results Test. **Not done** — needs a deployed public URL.

## Post-launch
- [ ] Register with Google Search Console and submit the sitemap. **Confirmed not done** — `https://softhr.vercel.app` is live and publicly crawlable (verified `robots.txt`/`sitemap.xml` both serve correctly), but a live search for "SoftHR" and a `site:` search both return nothing — Google hasn't discovered/indexed it yet, since nothing has linked to it or asked Google to crawl it. Steps (you, not Claude — needs your Google account): (1) go to search.google.com/search-console, add the property (use the real production domain once connected — see "Domain" above — rather than the Vercel placeholder, to avoid re-verifying later), (2) verify via the HTML-tag method — Search Console gives you a code, set it as `GOOGLE_SITE_VERIFICATION` in Vercel's env vars (no code change needed, already wired in `layout.tsx`), (3) submit `/sitemap.xml` under Sitemaps, (4) use URL Inspection → Request Indexing on the homepage to speed up the first crawl (otherwise indexing happens on its own, just slower). A branded query like "SoftHR" should start returning the site within days of indexing — there's essentially no competing "SoftHR" content today.
- [ ] Verify analytics event abstraction is actually wired to a real provider, or explicitly confirmed as intentionally deferred. **Currently deferred** — no analytics provider has been chosen yet (`00-source/build-brief.md`'s "Analytics Preparation" section); no event abstraction has been built either, since none of the CTA/form components emit tracking calls yet. This is a real gap if analytics matter for launch — flag if you want it built before going live.
- [ ] Monitor Slack channels for the first real demo/signup/contact submissions once live.

## Summary: what's actually blocking launch right now

Everything code-side is done and verified. What remains needs you specifically: (1) a real custom domain (a Vercel project + working `https://softhr.vercel.app` URL already exist), (2) Google Search Console registration on that URL, (3) real product screenshots/video to replace the `ScreenshotSlot` placeholders (`08-assets/screenshot-plan.md`), (4) approved FR/SW translations or an English-only launch decision, (5) real legal copy, (6) a decision on analytics. None of these are things Claude can supply on its own.
