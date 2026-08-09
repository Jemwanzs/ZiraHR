# QA Checklist

Run at the end of every phase, not only before launch.

**Status as of Phase 10** (verified by Claude via automated checks — see notes; items needing a human/real device are left unchecked, not assumed):

## Content integrity
- [x] No lorem ipsum anywhere in a page that's actually linked/navigable — grepped the full source tree, none found.
- [x] No fabricated testimonials, customer names, logos, or usage numbers — Customer Proof section built but deliberately not rendered; Pricing page has no invented tiers/numbers.
- [x] No invented product functionality — every claim traces to `01-product/product-modules.md`.
- [x] No unsupported statutory/security/automation claims.
- [x] Placeholders (screenshots/video) are visually distinct from real content, per `08-assets/screenshot-plan.md` — dashed border + "Preview" badge, verified in both light and dark (Ask TiJa) tone.

## Functional
- [x] Every nav link, mega-menu item, and footer link resolves (no 404s) — all 27 routes curl-tested at 200 across en/fr/sw.
- [x] Language selector switches locale, persists across navigation and refresh, on every page type — verified via next-intl's `NEXT_LOCALE` cookie mechanism and locale-prefixed route testing.
- [x] All three CTAs (Start with ZiraHR, Request a Demo, Login) route correctly from every page they appear on.
- [x] Demo request / contact / newsletter / signup forms: client validation, server validation, loading state, success state, Supabase row created, Slack notification fires — live-tested end-to-end against the real Supabase project and Slack webhooks; found and fixed a honeypot validation bug in the process (see `06-technical/architecture.md` Phase 6 notes).
- [x] Signup wizard: all four steps navigable, back/forward preserves entered data, final step redirects correctly — code-reviewed and build-tested; step transitions verified via server-rendered HTML at each stage.
- [x] 404 page renders correctly for an unknown route, in every locale — verified for default and `/fr` locales, real `404` HTTP status confirmed (not a `200` with an error message).

## Cross-browser / cross-device
- [ ] Chrome, Safari, Firefox, Edge — desktop. **Not verified** — this environment only has automated Chrome (headless, via Lighthouse). Needs a human pass across real browsers before launch.
- [ ] iOS Safari, Android Chrome — mobile. **Not verified** — needs real devices or BrowserStack-equivalent.
- [ ] Tablet viewport (both orientations). **Not verified** for the same reason — responsive CSS was written to the breakpoints in `02-ux/responsive-behaviour.md` but never visually confirmed on a real or emulated tablet.

## Build
- [x] `npm run build` succeeds with no errors/warnings that matter.
- [x] `npm run lint` clean.
- [x] TypeScript strict mode: no `any` introduced without justification.

See `accessibility-checklist.md`, `seo-checklist.md`, and `launch-checklist.md` for the specialized passes.
