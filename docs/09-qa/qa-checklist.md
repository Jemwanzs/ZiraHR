# QA Checklist

Run at the end of every phase, not only before launch.

## Content integrity
- [ ] No lorem ipsum anywhere in a page that's actually linked/navigable.
- [ ] No fabricated testimonials, customer names, logos, or usage numbers.
- [ ] No invented product functionality — every claim traces to `01-product/product-modules.md`.
- [ ] No unsupported statutory/security/automation claims.
- [ ] Placeholders (screenshots/video) are visually distinct from real content, per `08-assets/screenshot-plan.md`.

## Functional
- [ ] Every nav link, mega-menu item, and footer link resolves (no 404s).
- [ ] Language selector switches locale, persists across navigation and refresh, on every page type (product, resource, demo, signup).
- [ ] All three CTAs (Start with ZiraHR, Request a Demo, Login) route correctly from every page they appear on.
- [ ] Demo request / contact / newsletter forms: client validation, server validation, loading state, success state, duplicate-submission prevention, Supabase row created, Slack notification fires (once credentials exist).
- [ ] Signup wizard: all four steps navigable, back/forward preserves entered data, final step redirects correctly.
- [ ] 404 page renders correctly for an unknown route, in every locale.

## Cross-browser / cross-device
- [ ] Chrome, Safari, Firefox, Edge — desktop.
- [ ] iOS Safari, Android Chrome — mobile.
- [ ] Tablet viewport (both orientations) for at least the homepage and one module page.

## Build
- [ ] `npm run build` succeeds with no errors/warnings that matter.
- [ ] `npm run lint` clean.
- [ ] TypeScript strict mode: no `any` introduced without justification.

See `accessibility-checklist.md`, `seo-checklist.md`, and `launch-checklist.md` for the specialized passes.
