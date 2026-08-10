# Responsive Behaviour

Design dedicated mobile compositions — never a shrunk desktop layout (scope §36, brief "Responsive Design").

## Breakpoint strategy

Tailwind defaults extended minimally: `sm` (mobile), `md` (tablet), `lg` (laptop), `xl`/`2xl` (desktop). Design explicitly for four states: desktop, laptop, tablet, mobile — not just "desktop + mobile."

## Navigation

- Desktop: full sticky nav with hover mega menu, glass/blur after scroll.
- Tablet/Mobile: hamburger opens a full-height categorized drawer (accordion groups matching the mega menu columns). Language selector (flags) sits in the drawer header, not hidden behind another menu.
- Sticky bottom CTA bar (`Start with ZiraHR`) appears on mobile once the visitor scrolls past the hero — desktop uses a sticky CTA in the nav bar instead, not a bottom bar.
- **Bug fix**: the fixed bar has no innate awareness of page length, so the very last content on the page (the footer's bottom tagline/Cookie-Preferences row) could end up permanently trapped underneath it with no further scroll room to reveal it — confirmed via a real narrow-viewport screenshot, not just a Puppeteer `fullPage` capture artifact (those *also* show fixed elements at the wrong offset, which is a separate, harmless capture-only quirk — always verify with scroll-and-capture, not `fullPage`, before treating a fixed-position render as a real bug). Fixed with `pb-24 lg:pb-6` on the footer's bottom row (`src/components/layout/Footer.tsx`), reserving enough space that the last row is always scrollable clear of the bar.

## Hero

- Desktop: full cinematic composition, satellite cards assembling around a central dashboard on scroll.
- Mobile: shorter hero, reduced vertical scroll-jack distance, satellite cards simplified to a single swipeable strip rather than a spatial assembly (spatial assembly does not translate to small viewports).

## Product galleries / module showcase

- Desktop: left-nav + right-stage interactive layout, cursor-reactive cards.
- Mobile: left-nav collapses to a horizontal scrollable tab strip above a single full-width stage; touch-swipe replaces cursor-hover for switching modules.

## Employee journey scroll story

- Desktop: pinned/sticky scroll-driven sequence.
- Mobile: still scroll-driven, but un-pinned (avoids mobile scroll-jack jank/perf cost) — each stage is its own full-width card in a normal scroll flow, connected by a simple vertical line rather than a pinned stage.

## Video

- Desktop: autoplay-muted where performance allows.
- Mobile: no giant autoplay hero video — poster image + tap-to-play, lighter-weight encodes.

## Interactive product tour

- Desktop: full six-button simulated interface.
- Mobile: simplified to the two or three highest-value interactions (e.g. Request Leave, Ask TiJa) rather than all six, to avoid a cramped touch experience.

## Forms

- Progressive signup (`/signup`) steps stack full-width on mobile, one field group per screen, larger touch targets, sticky "Continue" button.

## Motion

`prefers-reduced-motion` disables scroll-jacking, parallax, and connector-line animation everywhere (not just mobile) — replaced with simple fade/opacity transitions or static states.
