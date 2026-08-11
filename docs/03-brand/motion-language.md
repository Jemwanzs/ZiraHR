# Motion Language

Borrow Apple's *philosophy*, not Apple's website. Motion communicates hierarchy and relationships — it is never decoration for its own sake. A delayed animation frame breaks the visual connection between user input and interface response, which is precisely what destroys the "premium" feeling this site is trying to earn — so motion quality is a performance requirement, not just a design one.

## Vocabulary (from scope §28)

Scroll reveals · product screen stacking · mask reveals · subtle parallax · counter animations · animated connectors · morphing cards · horizontal product galleries · sticky storytelling sections · soft hover elevation · subtle magnetic CTA effects · cursor-reactive product cards (desktop only).

## Library

**Motion** (the successor package to Framer Motion) — the single animation library for the whole site. No second animation library is introduced without an explicit decision recorded here.

## Where each technique is used

| Technique | Section |
|---|---|
| Scroll-driven pinned sequence | Employee Journey story |
| Animated SVG connectors | "Everything Connects" |
| Morphing card (candidate → employee) | Recruitment page |
| Horizontal gallery with hover-forward | Dashboards section |
| Cursor-reactive product cards | Module Showcase (desktop only) |
| Magnetic CTA (subtle) | Primary "Start with SoftHR" buttons |
| Counter animation | Any stat callouts once real, verified numbers exist |
| Sticky storytelling | Employee Journey, Flexibility (settings breadcrumb) |

## Hard rules

- No aggressive bouncing on CTAs — hover behaviour is: arrow travels right, background transitions smoothly, button raises 1–2px, nothing more.
- `prefers-reduced-motion: reduce` disables scroll-jacking, parallax, and connector-line draw-on animations site-wide, replaced with simple opacity/fade transitions or static end-states — implemented once as a shared hook (`useReducedMotion`) wrapping every motion-heavy component, not re-implemented per section.
- Animations initialize lazily (on viewport intersection), never all at once on page load.
- Mobile does not get cursor-reactive effects (no cursor) — see `/docs/02-ux/responsive-behaviour.md` for the mobile-specific substitutions per section.
