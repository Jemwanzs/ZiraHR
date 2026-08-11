# CTA Copy & Behaviour

## Three conversion paths (exactly three — do not add more)

| Role | Label | Destination |
|---|---|---|
| Primary | Start with SoftHR → | `/signup` |
| Sales | Request a Demo | `/request-demo` |
| Existing customer | Login | external → main SoftHR app login |

## Hover behaviour (applies to primary CTA everywhere it appears)

- Arrow travels right, gently.
- Background transitions smoothly (not a hard color swap).
- Button raises 1–2px (soft elevation, not a bounce).
- No aggressive/bouncing animation — ever.

## Placement rules

- Nav bar: all three, right-aligned, Login visually de-emphasized relative to the two conversion CTAs.
- Sticky CTA appears once the visitor scrolls past the hero (desktop: nav bar; mobile: bottom bar) — see `02-ux/responsive-behaviour.md`.
- Every homepage section that ends a "beat" (per `02-ux/homepage-scope.md`) may repeat the primary/secondary pair contextually, but the final CTA section is the only place both get full visual weight simultaneously as the page's closing statement.

## Form CTAs

- Request Demo form submit: **Book My SoftHR Demo**
- Signup steps: step-specific "Continue" (not "Next" — keep it human), final step: **Welcome to SoftHR** confirmation, no button (auto-redirect into the app setup journey).

## Analytics

Every CTA click fires a named event through the shared analytics abstraction (`src/lib/analytics.ts`) — see `06-technical/architecture.md` and the event list in the original brief's "Analytics Preparation" section (`00-source/build-brief.md`). Event names: `cta_start_with_zirahr`, `cta_request_demo`, `cta_login`, plus page/section context as a property, not as separate event names (keeps the event taxonomy small).
