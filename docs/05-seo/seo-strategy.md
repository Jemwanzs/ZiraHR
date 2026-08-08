# SEO Strategy

## Principle

Build dedicated pages around actual search intent rather than trying to rank the homepage for everything. SEO is designed *before* the marketing pages are implemented (this doc precedes Phase 5), not retrofitted after.

## Three page categories

1. **Module pages** (`/payroll`, `/core-hr`, etc.) — product-led, dual-purpose: convert visitors *and* rank for product-category search intent.
2. **Country/category SEO pages** (`/hr-software-kenya`, `/payroll-software-kenya`, `/hrmis-kenya`, `/hr-software-africa`) — built purely against search intent, each with fully unique copy. Never a template with the country name swapped.
3. **Resource content** (`/resources/*`) — genuinely useful HR guides, not an article dumping ground; supports long-tail and topical authority without cannibalizing the module pages' target keywords.

## Non-negotiables (scope §33/§34)

- No thin duplicate pages.
- No generic "compliant with local regulations" claims — name the actual scheme (PAYE, NSSF, SHIF, Housing Levy) and the actual country.
- No FAQ structured data unless the FAQ is genuinely useful content, not schema-stuffing.
- Server-rendered/indexable content — every marketing page is a Server Component by default; motion/interactivity is layered on top via client components, never gating the base content behind client-side rendering.

## Expansion path

Kenya ships first. `/hr-software-africa` exists at launch as a pan-African entry point; country-specific product/payroll pages beyond Kenya are added only once ZiraHR actually supports that country's payroll/statutory rules — see `01-product/target-market.md`.

## Ownership of keyword targets

See `keyword-map.md` for the page-to-keyword table. See `metadata-plan.md` for how each page type generates its `<title>`/`<meta description>`/OG/canonical. See `structured-data.md` for JSON-LD types per page. See `internal-linking.md` for the linking rules between module pages, SEO pages, and resources.
