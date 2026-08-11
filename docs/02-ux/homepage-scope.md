# Homepage Scope — Section by Section

The homepage tells one continuous story (scope §40), not a feature list. Twelve beats, each mapped to a component under `src/components/sections/`.

| # | Beat | Component (proposed) | Content source |
|---|---|---|---|
| 01 | This is SoftHR (Hero) | `HeroSection` | scope §4 (hero copy + cinematic product composition) |
| 02 | See it (cinematic product reveal) | part of `HeroSection` scroll continuation | scope §4 hero visual |
| 03 | Follow an employee (Amina's journey) | `EmployeeJourneySection` | scope §5 |
| 04 | Everything connects (one employee record) | `ConnectedRecordSection` | scope §6 |
| 05 | Explore the platform (module showcase) | `ModuleShowcaseSection` | scope §7 |
| 06 | See employees use it (ESS) | `EssSection` | scope §16 |
| 07 | See how flexible it is (settings/workflows) | `FlexibilitySection` | scope §17 |
| 08 | Approvals | `ApprovalWorkflowSection` | scope §18 |
| 09 | Meet TiJa | `AskTijaSection` | scope §19 |
| 10 | Understand your organization (dashboards) | `DashboardsSection` | scope §20 |
| 11 | Multi-region/branch | `MultiRegionSection` | scope §21 |
| 12 | Trust it (security & governance) | `SecuritySection` | scope §22 |
| 13 | Believe it (customer proof) | `CustomerProofSection` | scope §23 — **stays empty/hidden until real customers exist** |
| 14 | Experience it (interactive product tour) | `ProductTourSection` | scope §24 |
| 15 | Convert (final CTA) | `FinalCtaSection` | scope §29/§40 |

Note: the final build order collapses scope's §40 twelve-step outline and its §1–§24 section list into one sequence — §40 is the narrative order, §1–§24 are the content specs for each beat.

## Section build notes

- **Hero**: eyebrow "THE HR PLATFORM BUILT AROUND YOUR PEOPLE", headline "One place to run your entire people operation.", supporting copy, three CTAs. Visual: Executive Dashboard placeholder centered, six satellite module cards (Employee Profile, Leave approval, Payroll, Attendance, Performance, Recruitment, Ask TiJa) that assemble on scroll. Placeholder now; real screenshots swap in later (see `08-assets/screenshot-plan.md`).
- **Employee Journey**: scroll-driven, pinned section, stage indicator (Applicant→...→Offboarding), tiny UI fragment per stage — signature piece, gets the most animation budget.
- **Connected Record**: central employee profile card, animated SVG connector lines radiating to 9 module chips. Static fallback (no connectors, simple grid) under `prefers-reduced-motion`.
- **Module Showcase**: left-nav + right-stage interactive component; six modules from `product-modules.md`; each module swap re-plays its workflow animation (e.g. Payroll's Draft→Review→Approve→Process→Disburse).
- **ESS**: split desktop/mobile layout shown side-by-side; list of employee capabilities as a checklist, not paragraphs.
- **Flexibility**: Settings UI placeholder, animated breadcrumb (Regions→Branches→Departments→Roles→Workflows→Leave Policies→Payroll Rules→Security).
- **Approvals**: horizontal chain diagram, swappable between Leave/Payroll/Salary Advance/Promotion/Disciplinary/Data Imports via a small tab control.
- **Ask TiJa**: only section permitted to break the cream/white canvas with a dark background (scope §19) — deliberate visual interruption, signals "different kind of feature."
- **Dashboards**: horizontal gallery (Executive/HR/Finance/My Dashboard), hover/tap brings a card forward with elevation + scale, others recede.
- **Multi-Region**: org tree diagram + three role-based "what I see" callouts (My Region / My Branch / Whole Organization).
- **Security**: capability checklist (Roles & Permissions, Data Visibility, MFA, Audit Logs, Approval Workflows, Export Controls, Working-Hour Controls, Geo-fencing, Activity Logs) — no unverified security claims.
- **Customer Proof**: component built and ready, but rendered empty/omitted from the live page until real logos/testimonials exist — never filled with placeholder names.
- **Product Tour**: lightweight simulated interface, six buttons (Run Payroll, Request Leave, Approve Request, Open Employee Profile, Ask TiJa, View Dashboard) — each opens a small scripted, non-authenticated demo interaction, not a live app connection.
- **Final CTA**: "Ready to run HR differently?" + Start with SoftHR / Request a Demo.

## What the homepage explicitly does not do

No twelve identical feature cards (§7). No giant static dashboard screenshot as the hero visual (§4). No long paragraphs. No fabricated testimonials/logos/numbers (§23).
