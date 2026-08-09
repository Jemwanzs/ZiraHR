# SEO Checklist

**Status as of Phase 10** — items verified via rendered-HTML/sitemap inspection are checked.

- [x] Every page has a unique, accurate `<title>` and meta description (see `05-seo/metadata-plan.md`) — every route has its own `generateMetadata` pulling translated copy, no page relies on the root layout's default.
- [x] Self-referencing canonical URL on every page, correct per locale.
- [x] `hreflang` alternates (`en`/`fr`/`sw` + `x-default`) present and correct on every localized page. **Found and fixed a gap during Phase 10**: `x-default` was missing from both `lib/seo.ts` (all product/SEO pages) and the root layout (homepage) — added and verified via rendered `<link>` tags and the sitemap's `<xhtml:link>` entries.
- [x] Sitemap (`sitemap.xml`) includes all locale × route combinations (23 routes × 3 locales), excludes `noindex` pages (the 4 legal pages) and `/api/*`.
- [x] `robots.txt` correctly allows crawling and points to the sitemap.
- [x] Heading hierarchy is clean on every page (single `h1`, no skipped levels) — verified via `grep` for `<h1` across every page/layout component.
- [x] Structured data present for the types actually used — Organization (sitewide, root layout), BreadcrumbList (every non-homepage page, generated from the same list that renders the visible trail so they can't drift apart). No SoftwareApplication or FAQPage schema shipped yet — deliberately deferred rather than added speculatively (`05-seo/structured-data.md`'s rule against schema not backed by genuinely valuable rich-result cases). **Not verified**: an actual pass through Google's Rich Results Test (needs a public URL, not available from localhost).
- [x] Breadcrumbs render correctly and match `BreadcrumbList` schema exactly — `Breadcrumbs` component generates both from one `items` list.
- [x] Internal linking: every product/SEO page's `ProductPageLayout` includes a "how it connects" cross-link block to related modules; nav + footer reach every page; no orphans identified.
- [x] `/hr-software-kenya`, `/payroll-software-kenya`, `/hrmis-kenya` each have genuinely distinct content — category overview vs. payroll/statutory depth vs. HRMIS-terminology framing, per `05-seo/keyword-map.md`'s differentiation requirement.
- [x] No thin/duplicate pages — every shipped page has substantive, unique copy (verified content during Phase 5 build, no template-with-name-swapped pages).
- [ ] OpenGraph + Twitter card images render correctly per page type. **Not verified** — `openGraph`/`twitter` metadata fields are wired with title/description/url, but no dedicated OG image assets exist yet (`08-assets/asset-requirements.md`'s `/social` folder is empty); a social share debugger pass is only meaningful once those exist and the site has a real public URL.
- [x] Content is present in server-rendered HTML — every page/section is a Server Component by default; verified via `curl` against the production build showing full text content in the raw HTML (not requiring JS execution).
- [x] 404 page returns a real `404` status code, not a `200` with a "not found" message — verified via `curl -w "%{http_code}"`.

Target: Lighthouse SEO 95+ — **achieved 100** on both the homepage and a representative product page (`06-technical/performance.md`, Phase 9).
