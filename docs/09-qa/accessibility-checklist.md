# Accessibility Checklist

**Status as of Phase 10** — items verified by code review + rendered-HTML inspection are checked; items needing a real screen reader/AT pass are left unchecked.

- [x] Full keyboard navigation: nav, mega menu, language selector, module showcase tabs, product tour buttons, and forms are all plain `<button>`/`<a>`/`<input>` elements with no `tabindex` traps; the mega menu and mobile drawer additionally support `Esc`-to-close (Phase 8).
- [x] Visible focus states on every interactive element — `Button`, `NavDropdown`, `LanguageSelector`, and form inputs all carry explicit `focus-visible:outline` classes; none suppress the browser default without a replacement.
- [x] Language selector: flag-only visually, exposes real `aria-label`s per locale ("Switch to English" / "Passer au français" / "Badilisha kwenda Kiswahili"), `role="menu"`/`role="menuitemradio"`/`aria-checked`, closes on `Esc` and outside click, arrow-key navigation between options.
- [x] Mega menu and mobile drawer: `aria-haspopup`/`aria-expanded` on triggers; the mobile drawer additionally got full modal semantics in Phase 8 (`role="dialog"`, `aria-modal`, focus trap, return-focus-on-close).
- [x] Semantic HTML throughout — one `h1` per rendered page (verified via `grep` across every page/layout component), `<header>`/`<nav>`/`<main>`/`<footer>` landmarks present in the root layout.
- [x] Every image has descriptive `alt` text — `ScreenshotSlot` requires an `alt` prop for the real-image path and uses `role="img"` + `aria-label` for its placeholder state; decorative icons (arrows, checkmarks) are `aria-hidden="true"`.
- [x] Color contrast — Phase 8 found and fixed two real WCAG AA failures (orange text in the Approvals chain and the Ask TiJa eyebrow, both ~2.3–3.9:1); see `03-brand/colors.md`.
- [x] `prefers-reduced-motion: reduce` — enforced sitewide via `MotionProvider` (Motion's `MotionConfig reducedMotion="user"`) rather than per-section checks, added in Phase 8.
- [x] Forms: labels programmatically associated via `htmlFor`/`id`; `FormField` now injects `aria-required`, `aria-invalid`, and `aria-describedby` (pointing at the error message's id) onto every input automatically; errors render with `role="alert"` for immediate announcement.
- [ ] Video: no real video exists yet (placeholders only) — revisit when `08-assets/video-plan.md` clips are added.
- [x] Mobile drawer (the site's one modal-like overlay): focus trapped while open, returns to the triggering element on close, dismissible via `Esc` (Phase 8).
- [ ] **Not verified**: an actual screen reader pass (VoiceOver/NVDA/JAWS). Everything above was verified via code review, rendered-HTML inspection, and ARIA-attribute checks — not a live AT session. Recommended before launch.

Target: Lighthouse Accessibility 95+ — **achieved 96** on both the homepage and a representative product page (`06-technical/performance.md`, Phase 9). This checklist remains the real bar regardless — a high Lighthouse score with a broken keyboard flow still fails QA.
