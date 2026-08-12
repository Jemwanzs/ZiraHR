# Structured Data

JSON-LD, injected via a shared `<StructuredData>` component (server-rendered `<script type="application/ld+json">`), not third-party schema plugins.

## Types used

- **Organization** — sitewide, in the root layout (`OrganizationStructuredData`). Name, logo, URL, sameAs (real social profiles only, once they exist).
- **SoftwareApplication** (`SoftwareApplicationStructuredData`, `src/components/seo/StructuredData.tsx`) — rendered on the homepage and every product-module page (via `ProductPageLayout`, so all module pages get it automatically). `applicationCategory: BusinessApplication`, `operatingSystem: Web`, name "SoftHR". `featureList` pulls the six `nav.megaMenu` group labels directly from translations at request time — never a hand-typed duplicate that could drift from the real nav. No `offers`/pricing property: the pricing page is explicitly illustrative-only, and structured data must describe exactly what's rendered as real.
- **BreadcrumbList** — every non-homepage page, matching the visible breadcrumb trail exactly (see `internal-linking.md`).
- **FAQPage** — only on pages that have a genuine, visible FAQ block with real questions users actually ask; never added purely to try to earn a rich-result. Scope explicitly restricts this ("only where genuinely applicable") — no such block exists yet, so this type isn't implemented.
- **Product** — considered for `/payroll` and other module pages only if it adds genuine value beyond SoftwareApplication; default to *not* adding it unless there's a concrete rich-result reason, to avoid redundant/conflicting schema on one page.

## Social share image

`src/app/[locale]/opengraph-image.tsx` — a server-generated (Next.js `ImageResponse`/Satori, not a real screenshot) 1200×630 PNG per locale, using the SHR brand mark, the localized headline, and eyebrow copy. Automatically wired into `og:image`/`twitter:image` meta tags by Next.js's file convention — nothing to reference manually in `generateMetadata`. Before this existed, sharing any page link showed no preview image at all.

## Rules

- Structured data must describe exactly what's visible on the page — no schema properties referencing content, ratings, or pricing that don't appear rendered.
- No aggregateRating/review schema until real, verifiable reviews exist (mirrors the "never manufacture testimonials" rule from `04-content`/`00-source`).
- One Organization block sitewide (root layout), not repeated per page.
- Validate every new structured-data addition against Google's Rich Results Test before shipping (manual QA step, tracked in `09-qa/seo-checklist.md`).
