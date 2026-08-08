# Internal Linking

## Principle

Every module page and SEO page should be reachable within a couple of clicks from the homepage (nav mega menu + footer), and should link back to related pages contextually — not just via nav/footer.

## Link patterns

- **Module pages ↔ Core HR**: every module page's "how it connects" section (see `02-ux/product-pages.md` shared template) links to `/core-hr`, reinforcing the single-employee-record story architecturally, not just narratively.
- **SEO category pages → module pages**: `/hr-software-kenya`, `/payroll-software-kenya`, `/hrmis-kenya` each link into the specific module pages they reference (e.g. `/payroll-software-kenya` links to `/payroll` and `/core-hr`), so search-intent traffic lands on a category page and flows naturally into product depth.
- **Resources → module pages**: HR guides/templates link to the relevant module page where genuinely relevant (e.g. a leave-policy template links to `/leave-management`), never forced.
- **Breadcrumbs**: every non-homepage page shows a breadcrumb trail (Home → [Section] → Page) matching its position in the nav/footer hierarchy, paired with `BreadcrumbList` structured data.

## Anchor text

Descriptive, not generic — "See how Payroll works" rather than "Click here" or bare "Learn more" repeated across the page.

## What this avoids

Orphaned pages (every page has at least nav + footer + one contextual inbound link), and keyword-intent collisions between `/hr-software-kenya`, `/payroll-software-kenya`, and `/hrmis-kenya` (each links outward toward different module depth, reinforcing their distinct angles from `keyword-map.md`).
