# Accessibility Checklist

- [ ] Full keyboard navigation: every interactive element (nav, mega menu, language selector, module showcase tabs, product tour buttons, forms) reachable and operable via keyboard alone.
- [ ] Visible focus states on every interactive element — never suppressed with `outline: none` without a replacement.
- [ ] Language selector: flag-only visually, but exposes real `aria-label`s ("Switch to English" / "Passer au français" / "Badilisha kwenda Kiswahili"), correct `role`/`aria-expanded`/`aria-activedescendant` behaviour, closes on `Esc`, traps focus appropriately while open.
- [ ] Mega menu and mobile drawer: correct `aria-expanded`, `aria-controls`, and focus management on open/close.
- [ ] Semantic HTML throughout — headings in a logical, non-skipping hierarchy (`h1` once per page), `<nav>`, `<main>`, `<footer>` landmarks present.
- [ ] Every image (including placeholder screenshots) has descriptive `alt` text — decorative-only images use `alt=""`.
- [ ] Color contrast: body text and CTA text meet WCAG AA against their actual background (verify sky-blue/orange text-on-cream combinations specifically, per `03-brand/colors.md`).
- [ ] `prefers-reduced-motion: reduce` removes scroll-jacking, parallax, and connector-line animation site-wide, verified on the Employee Journey story and Connected Record section specifically (the two heaviest motion sections).
- [ ] Forms: labels programmatically associated with inputs, error messages announced (`aria-live` or `aria-describedby`), required fields marked both visually and via `aria-required`.
- [ ] Video: no auto-playing content with sound; captions/transcripts considered for any clip carrying spoken narration (flag as a follow-up if a video ends up narrated).
- [ ] Interactive Product Tour and modals/popovers: focus trapped while open, returns to the triggering element on close, dismissible via `Esc`.

Target: Lighthouse Accessibility 95+, but this checklist is the real bar — a high Lighthouse score with a broken keyboard flow still fails QA.
