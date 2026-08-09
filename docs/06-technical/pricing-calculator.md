# Pricing Calculator

Added per explicit client direction (post-launch feedback), superseding the original Phase 5 decision to keep `/pricing` purely a "talk to us" page with no numbers at all. See the "Pricing rates" decision recorded in that session.

## What's real vs. illustrative

- **Real**: the billing model itself — module-by-module toggles, per-employee/month rate, automatic monthly billing. This is genuine product direction from the client, not invented.
- **Illustrative**: every rate shown (`src/messages/en.json`, `pages.pricing.calculator.modules.*.rate`). No real rate card exists yet. The calculator carries a visible "Illustrative pricing" badge plus an explanatory note at all times — it is never presented as an actual quote, and the page's final CTA is "Get your real rate card," not "Buy now" or similar.

## Structure

- **Core HR** is the always-included foundation module (toggle disabled, marked "Included in every plan") — matches the site's broader "everything connects to Core HR" architecture story.
- The other 10 modules (Payroll, Leave, Attendance, Recruitment, Performance, L&D, Teams & Collaboration, ESS, Analytics, Ask TiJa) are independently toggleable, each with its own illustrative per-employee/month rate.
- Employee count is a slider (1–500), multiplying the sum of selected modules' rates into a live "Estimated monthly total."

## Updating real rates later

When real rates exist, they're a data-only change: edit the `rate` values under `pages.pricing.calculator.modules.*` in `src/messages/en.json` (and the FR/SW equivalents), and remove the "Illustrative pricing" badge/note from `PricingCalculator.tsx` once the numbers are the actual rate card — don't leave the "illustrative" framing in place once real numbers are substituted, that would be misleading in the other direction.
