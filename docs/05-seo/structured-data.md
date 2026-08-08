# Structured Data

JSON-LD, injected via a shared `<StructuredData>` component (server-rendered `<script type="application/ld+json">`), not third-party schema plugins.

## Types used

- **Organization** — sitewide, in the root layout. Name, logo, URL, sameAs (real social profiles only, once they exist).
- **SoftwareApplication** — homepage and module pages. `applicationCategory: BusinessApplication`, name "ZiraHR", real feature list drawn from `01-product/product-modules.md` (never invented capabilities).
- **BreadcrumbList** — every non-homepage page, matching the visible breadcrumb trail exactly (see `internal-linking.md`).
- **FAQPage** — only on pages that have a genuine, visible FAQ block with real questions users actually ask; never added purely to try to earn a rich-result. Scope explicitly restricts this ("only where genuinely applicable").
- **Product** — considered for `/payroll` and other module pages only if it adds genuine value beyond SoftwareApplication; default to *not* adding it unless there's a concrete rich-result reason, to avoid redundant/conflicting schema on one page.

## Rules

- Structured data must describe exactly what's visible on the page — no schema properties referencing content, ratings, or pricing that don't appear rendered.
- No aggregateRating/review schema until real, verifiable reviews exist (mirrors the "never manufacture testimonials" rule from `04-content`/`00-source`).
- One Organization block sitewide (root layout), not repeated per page.
- Validate every new structured-data addition against Google's Rich Results Test before shipping (manual QA step, tracked in `09-qa/seo-checklist.md`).
