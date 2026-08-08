# Website Information Architecture

## Primary navigation

`Platform | Solutions | Payroll | Resources | Pricing | Company`

Right-aligned: `Language Selector (flags) | Login | Request Demo | Start with ZiraHR`

Sticky nav bar; transitions to a subtle glass/blur background once the user scrolls past the hero.

## Platform mega menu

Six columns, matching `product-modules.md` exactly:

| Core HR | Workforce | Payroll | Talent | Workplace | Intelligence |
|---|---|---|---|---|---|
| Employee Directory | Leave Management | Payroll Processing | Recruitment & ATS | Teams & Collaboration | Dashboards |
| Employee Records | Attendance | Earnings & Benefits | Performance Management | Approvals & Workflows | Analytics |
| Organization Structure | Shifts & Rosters | Deductions | Learning & Development | Notifications | Reports |
| Onboarding | Timesheets | Salary Advance | | | Ask TiJa AI |
| Employee Lifecycle | Overtime | Payslips | | | |
| Documents | | Statutory Compliance | | | |
| ESS | | Payroll Reports | | | |
| | | Disbursements | | | |

## Solutions menu

By buyer segment (footer + nav "Solutions"): HR Teams, Finance Teams, Executives, Managers, Employees. Each links to a short segment framing, not a full duplicate page tree (avoid thin-page proliferation).

## Payroll

Gets a standalone top-level nav item (not just a mega-menu entry) because it is a dedicated high-conversion SEO landing page — reflects its outsized role in HR-software search intent in Kenya.

## Resources

Blog, Guides, Templates, Help Centre, Product Updates, HR Glossary, Compliance. See `/docs/05-seo` and `/docs/08-assets` for how this avoids becoming an SEO dumping ground.

## Company

About, Contact, Careers, Partners.

## Footer architecture

See `/docs/04-content/footer-copy.md` for the full column-by-column link list and bottom tagline.

## Mobile navigation

Mega menu collapses into a categorized drawer (accordion by group: Core HR / Workforce / Payroll / Talent / Workplace / Intelligence), not a flat link dump. Language selector remains flag-only, moves into the drawer header. Sticky bottom CTA (`Start with ZiraHR`) appears once the visitor scrolls past the hero, mirroring desktop's sticky CTA behaviour. See `responsive-behaviour.md`.

## URL conventions

- All product/module pages are flat top-level routes (`/payroll`, not `/platform/payroll`) — matches the SEO page map exactly, keeps URLs short and human-readable.
- Locale prefix comes before the route (`/fr/payroll`), never after.
- No trailing slashes; kebab-case throughout; no query-string-driven canonical content.
