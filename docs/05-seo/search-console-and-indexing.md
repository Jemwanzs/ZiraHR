# Search Console & Indexing

Everything else in `05-seo/` is about making pages *worth* ranking (metadata, structured data, keyword targeting). This doc covers the separate, later problem: getting Google to actually discover and index the site at all. A technically perfect page ranks for nothing if Google has never crawled it — this was true here even though every item in `metadata-plan.md`/`structured-data.md`/`09-qa/seo-checklist.md` was already correct.

## 2026-08-13: the site wasn't showing up in search — diagnosis

Prompted by the client searching "SoftHR" and finding nothing. Diagnosis, not assumption: live-searched `"SoftHR" HR software Kenya` and `site:zira-hr-jms.vercel.app` — zero results for either. Confirmed via `curl` that the site itself was fine (200 OK, correct `robots.txt`, valid `sitemap.xml`) — so this was a discovery gap, not a broken-page problem. Google simply had never been told the site exists; nothing links to it yet and no one had registered it.

**A real bug found in the process**: `NEXT_PUBLIC_SITE_URL`'s hardcoded fallback (used only if the env var isn't set) pointed at `https://zira-hr-jms.vercel.app` throughout the codebase (`src/lib/seo.ts`, root `layout.tsx`, `robots.ts`, `sitemap.ts`, `StructuredData.tsx`, `Breadcrumbs.tsx`, `.env.example`) — that deployment alias is dead (confirmed 404). The client clarified the real live URL is `https://softhr.vercel.app`, which Vercel's production env already had set correctly for `NEXT_PUBLIC_SITE_URL` (production was never actually broken), so this was a local-dev-default and documentation correction, not a live fix. Every occurrence was updated — see `git log` for the commit. Worth re-checking this class of bug (a hardcoded fallback silently going stale) if the Vercel project or its assigned subdomain ever changes again.

## What "registering with Google" actually means

There's no single "submit my site to Google" action — it's three independent pieces, all inside [Google Search Console](https://search.google.com/search-console) (free, needs a Google account — this part is inherently manual, not something that can be scripted or done from this repo):

1. **Ownership verification** — proves you control the site before Search Console shows you any data about it.
2. **Sitemap submission** — tells Google every URL on the site upfront, rather than relying purely on organic link-following.
3. **Manual indexing request** (URL Inspection → Request Indexing) — a one-URL-at-a-time nudge to crawl sooner than Google would get to it on its own. Optional, rate-limited, not required for indexing to eventually happen.

## Verification: HTML tag method

Chosen over the alternative "upload an HTML file to the site root" method because it fits this app's existing metadata pattern with zero extra routes/files:

- Next's `generateMetadata` (`src/app/[locale]/layout.tsx`) accepts a `verification.google` field that renders `<meta name="google-site-verification" content="...">`.
- Wired conditionally — `...(process.env.GOOGLE_SITE_VERIFICATION && { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } })` — so the tag simply doesn't render until the env var exists; no placeholder/empty meta tag ships in the meantime.
- `GOOGLE_SITE_VERIFICATION` documented in `.env.example` and `06-technical/deployment.md`'s env var table. Non-secret (it's rendered into public HTML), same category as `NEXT_PUBLIC_SITE_URL`.

**Process actually run**: Search Console → Add Property → URL prefix → `https://softhr.vercel.app` → HTML tag method → copied the `content="..."` value (only that value, not the full tag) → set as `GOOGLE_SITE_VERIFICATION` in Vercel's production env vars → redeployed (required — these are statically generated pages, so the env var has to be present *at build time*, adding it alone without a redeploy doesn't take effect) → confirmed live via `curl -s https://softhr.vercel.app | grep google-site-verification` before clicking Verify in Search Console → succeeded.

## Sitemap submission

Submitted `sitemap.xml` (the full URL Search Console asks for is relative to the verified property, i.e. just `sitemap.xml`). Immediately showed **"Couldn't fetch"** with a blank "Last read" column — independently re-verified the sitemap directly (`curl`, including with a spoofed Googlebot user-agent) and confirmed it 200s, serves `Content-Type: application/xml`, and is well-formed (23 `<url>` entries, all tags balanced, valid close). This status is Search Console's default placeholder immediately after submission, before its crawler has actually attempted the fetch — not a real error. Expected to flip to "Success" within hours to a day; re-check before treating a persistent "Couldn't fetch" (with a populated "Last read" date) as a real problem.

## Indexing request

URL Inspection on the homepage correctly reported "URL is not on Google" / "URL is unknown to Google" (expected — nothing has crawled it yet) with `Sitemaps: No referring sitemaps detected` (also expected — Search Console hadn't finished processing the just-submitted sitemap yet). Clicking **Request Indexing** hit a **"Quota Exceeded"** response — Search Console rate-limits manual indexing requests per property/day, more aggressively for a brand-new, no-history property. Not an error to fix: the request simply doesn't go through today; retry tomorrow, or skip it entirely — the sitemap submission alone is sufficient for eventual organic indexing, just slower.

## Status as of 2026-08-13

- Site live and fully crawlable at `https://softhr.vercel.app`.
- Ownership verified in Search Console (HTML tag method, confirmed live).
- Sitemap submitted, fetch status pending (expected, not yet confirmed successful).
- Manual indexing request rate-limited; not yet successfully submitted.
- Not yet appearing in search results — expected at this stage, re-check in a few days.

## What to check next (you, not Claude — needs Search Console access)

- Sitemaps page: confirm `sitemap.xml` flips to "Success" with a real "Last read" date and a nonzero discovered-page count.
- Retry URL Inspection → Request Indexing once the daily quota resets.
- Once indexed, re-search "SoftHR" to confirm it surfaces, and spot-check the Rich Results Test against the live URL for the structured-data types listed in `structured-data.md` (still the one item in `09-qa/seo-checklist.md` blocked purely on "needs a public URL" — that blocker is gone now).
- If/when a real custom domain replaces `softhr.vercel.app` (see `06-technical/deployment.md`'s "Domain" section), this entire verification/sitemap/indexing process needs to be redone against the new domain as its own Search Console property — Google doesn't automatically carry it over, though a proper redirect preserves most of the accumulated signal.
