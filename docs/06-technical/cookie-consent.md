# Cookie Consent

Added in response to explicit client direction (not part of the original scope docs) — see the "attached third image sample" cookie-banner reference from the kickoff-plus-feedback conversation. The visual reference was used for the *pattern* (center-screen blocking modal, category toggles, two primary actions), not copied directly — copy, styling, and category set are original to this build.

## Behaviour

- **First visit**: a center-screen modal blocks interaction (backdrop click and `Esc` do nothing) until the visitor picks **Allow selection** or **Allow all** — matches the explicit requirement that the banner "can't be overlooked."
- **Necessary** cookies are always on and the toggle is disabled — there's no meaningful choice to offer there (the site can't function without them).
- **Statistics**, **Marketing**, and **Preferences** default to off and are independently toggleable.
- **Allow selection** saves whatever the toggles are currently set to (including all-off, if that's what the visitor left them at). **Allow all** flips every category on and saves immediately.
- Once a choice is saved, the modal doesn't reappear on future visits.
- **Cookie Preferences** (footer link) reopens the same modal to review/change the choice at any time — this reopened state *is* dismissible (backdrop click / `Esc` close it without changing anything), since consent has already been recorded once.

## Storage

Client-only — `localStorage` (`src/lib/cookieConsent.ts`), no server round-trip and no Supabase table. This is deliberately simple: the only thing that currently needs to read this value is client-side script-gating, which is itself not wired up yet (no analytics/marketing provider has been chosen — see `00-source/build-brief.md`). `readConsent()`/`writeConsent()` are the two functions anything added later (e.g. a GA4 snippet checking `statistics`) should call.

## Accessibility

Shares the `useFocusTrap` hook (`src/lib/useFocusTrap.ts`) with `MobileDrawer` — Tab loops within the modal, `Esc` closes only when the modal is dismissible (never on the mandatory first-visit gate, by design). `role="dialog"`, `aria-modal`, and `aria-labelledby` are set; each toggle is a real `role="switch"` with `aria-checked` and an accessible label from `cookieConsent.categories.*.label`.

## What this deliberately doesn't do

No IAB/TCF consent-string format, no geo-detection to only show in GDPR-relevant regions, no cookie-scanning to auto-populate the category list — all out of scope for what was asked. If compliance requirements (e.g. actual EU traffic) make any of that necessary later, that's a deliberate scope addition, not an assumption baked in now.
