# Launch Checklist

Pre-production-launch gate — run once, after all phases are otherwise complete.

## Content
- [ ] All `qa-checklist.md` content-integrity items pass.
- [ ] No `[FR]`/`[SW]` placeholder-translation markers remain (grep check) — or, if French/Swahili aren't fully translated yet, those locales are explicitly excluded from launch rather than shipped half-translated.
- [ ] Legal pages (Privacy/Terms/Security/Cookies) contain real, approved copy — or are excluded from the sitemap/nav until they do.
- [ ] Customer Proof section is either populated with real, verified testimonials/logos, or cleanly omitted from the live page (never a placeholder version shipped).

## Technical
- [ ] Production build (`npm run build && npm start`) verified, not just `next dev`.
- [ ] Lighthouse run against the production build meets targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+ (`06-technical/performance.md`).
- [ ] All environment variables set in the real Vercel project (Supabase, Slack webhooks, `NEXT_PUBLIC_SITE_URL` pointed at the real domain).
- [ ] Supabase RLS verified locked (no anon read/write) against the real project, not just the migration files.
- [ ] Forms tested end-to-end against the real Supabase project + real Slack channels.
- [ ] Domain connected and SSL verified on Vercel.
- [ ] `robots.txt`/sitemap point at the real production domain, not a placeholder.

## Accessibility & SEO
- [ ] `accessibility-checklist.md` fully passed.
- [ ] `seo-checklist.md` fully passed.
- [ ] Structured data spot-checked live (post-deploy) in Rich Results Test, not only locally.

## Post-launch
- [ ] Submit sitemap to Google Search Console (once you have access set up).
- [ ] Verify analytics event abstraction is actually wired to a real provider, or explicitly confirmed as intentionally deferred.
- [ ] Monitor Slack channels for the first real demo/signup/contact submissions to confirm the end-to-end flow works in production, not just in testing.
