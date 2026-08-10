# Screenshot Plan

## The `ScreenshotSlot` component

Every place the scope calls for real product UI renders through one shared component (`src/components/media/ScreenshotSlot.tsx`) rather than a raw `<Image>`. It takes a `slot` id (e.g. `"hero.dashboard"`, `"payroll.workflow"`) and looks up a real asset path from a small manifest (`src/lib/media-manifest.ts`). Until a real asset exists for a given slot id, it renders a labeled placeholder composition (soft card, module icon, dashed border, small "Preview — real product UI coming soon" caption) instead of a broken image or a fake screenshot.

This means: swapping a placeholder for the real screenshot later is a **one-line change in `media-manifest.ts`**, not a rewrite of any section component.

## Slot inventory (maps 1:1 to homepage beats + module pages)

| Slot id | Used in | Placeholder content until real asset supplied |
|---|---|---|
| `hero.dashboard` | Hero (center) | Abstract Executive Dashboard card mockup |
| `hero.satellite.*` (profile, leave, payroll, attendance, performance, recruitment, askTija) | Hero (assembling cards) | Small labeled module chip cards |
| `employeeJourney.stage.*` (11 stages) | Employee Journey | Minimal UI fragment per stage, module-icon-led |
| `connectedRecord.profile` | Everything Connects | Employee profile card mockup |
| `moduleShowcase.*` (per module) | Module Showcase | Workflow diagram / list mockup per module |
| `ess.desktop`, `ess.mobile` | ESS section | Paired desktop/mobile frame mockups |
| `flexibility.settings` | Flexibility | Settings-panel mockup with breadcrumb |
| `approvals.chain` | Approvals | Horizontal chain diagram (built as SVG/HTML, not a screenshot at all — this one may never need a real screenshot) |
| `askTija.interface` | Ask TiJa | Chat-style interface mockup, dark surface |
| `dashboards.*` (executive, hr, finance, my) | Dashboards gallery | Four dashboard card mockups |
| `multiRegion.tree` | Multi-Region | Org-tree diagram (SVG, likely stays diagram not screenshot) |
| module page hero/showcase slots | each `/*` product page | Per-page mockup matching that module |

## Placeholder visual treatment

Distinct from real UI at a glance: dashed 1px border, small top-right "Preview" badge, module icon centered, no fabricated data/numbers inside (never invented employee names, salary figures, or dates that could be mistaken for real product output — abstract shapes/bars instead).

The "module icon" is a real, content-relevant glyph, not one generic grid icon repeated everywhere — `ScreenshotSlot`'s `icon` prop selects from a small shared set (`src/components/media/PlaceholderIcon.tsx`: directory, payslip, leave, attendance, performance, recruitment, learning, collaboration, analytics, askTija, application, review, offer, onboarding, promotion, offboarding, dashboard). Each call site maps its own keys to the relevant icon (see `MODULE_ICONS`/`STAGE_ICONS`/`DASHBOARD_ICONS` in `ModuleShowcaseSection.tsx`/`EmployeeJourneySection.tsx`/`DashboardsSection.tsx`) so a "coming soon" slot reads as designed rather than interchangeable with every other slot on the page — still clearly iconographic, never a fake screenshot.

## Promotion path

When you supply real assets: drop files into the matching `/public/screenshots/...` folder, add the path to `media-manifest.ts` against the matching slot id, placeholder disappears automatically for that slot. No other code changes required.
