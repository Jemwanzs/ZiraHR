# SEO Checklist

- [ ] Every page has a unique, accurate `<title>` and meta description (see `05-seo/metadata-plan.md`) — no default/template metadata left un-overridden.
- [ ] Self-referencing canonical URL on every page, correct per locale.
- [ ] `hreflang` alternates (`en`/`fr`/`sw` + `x-default`) present and correct on every localized page.
- [ ] Sitemap (`sitemap.xml`) includes all locale × route combinations, excludes `noindex` pages and `/api/*`.
- [ ] `robots.txt` correctly allows crawling and points to the sitemap.
- [ ] Heading hierarchy is clean on every page (single `h1`, no skipped levels).
- [ ] Structured data validates in Google's Rich Results Test for every type used (`05-seo/structured-data.md`) — Organization, SoftwareApplication, BreadcrumbList, and any FAQPage instance.
- [ ] Breadcrumbs render correctly and match `BreadcrumbList` schema exactly.
- [ ] Internal linking: no orphaned pages — every page reachable via nav/footer and has at least one contextual inbound link (`05-seo/internal-linking.md`).
- [ ] `/hr-software-kenya`, `/payroll-software-kenya`, `/hrmis-kenya` each have genuinely distinct content (spot-check for unintended overlap/duplication).
- [ ] No thin/duplicate pages — every shipped page has substantive, unique copy.
- [ ] OpenGraph + Twitter card images render correctly per page type (test via a social share debugger).
- [ ] Content is present in server-rendered HTML (view source / disable JS check) — not solely client-rendered.
- [ ] 404 page returns a real `404` status code, not a `200` with a "not found" message.

Target: Lighthouse SEO 95+, alongside the manual checks above (Lighthouse doesn't catch duplicate-intent pages or schema accuracy).
