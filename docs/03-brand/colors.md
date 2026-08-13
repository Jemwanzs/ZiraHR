# Colors

Both source documents specify the same palette directionally with slightly different cream hex values (PDF: `#FFF9F2`, brief: `#FFF8EF`). We use the PDF's value as primary since it's the more detailed of the two specs; treat these as **provisional tokens** until a final SoftHR brand guideline supplies exact values — swapping them later is a one-file change (`src/app/globals.css`'s `@theme inline` block — the site is on Tailwind v4, which has no `tailwind.config.ts`), never hardcoded per-component.

## Tokens

| Token | Hex | Usage |
|---|---|---|
| `--color-cream` | `#FFF9F2` | Primary page background |
| `--color-white` | `#FFFFFF` | Cards, product stages, clean content areas — used generously |
| `--color-sky` | `#3FA9F5` | Interactive elements, links, data viz, selected states, product highlights |
| `--color-teal` | `#0B4F6C` | Primary CTAs, nav emphasis, strong product sections — used **sparingly** |
| `--color-orange` | `#F2994A` | Small accents, highlights, "new" badges, motion, secondary CTA states — used **sparingly** |
| `--color-gray-50`…`--color-gray-900` | neutral scale | Structural separation, typography hierarchy, borders, muted text |

## Rules

- **Never** let blue (sky or teal) dominate a full section background — it's an accent/interactive signal, not a canvas color. The explicit instruction is "avoid filling the website with blue."
- Orange is an energy accent only — badges, hover states, small highlight marks, motion trails. Not for large fills or body text.
- Teal is reserved for the primary CTA (`Start with SoftHR`) and a small number of strong anchor moments (e.g. the Ask TiJa section background may use a dark derivative of teal, per its explicit permission to break the cream/white canvas).
- Product screenshots/mockups are the main source of color variety on the page — the chrome around them stays restrained.
- All color tokens are defined once as CSS variables + Tailwind theme extension, referenced by name everywhere (`bg-cream`, `text-teal`, etc.) — no raw hex codes in component files.

## Accessibility

Every text/background pairing must meet WCAG AA contrast (4.5:1 body text, 3:1 large text/UI components). Sky blue on cream and orange on cream are the two combinations most likely to fail at small sizes — verify contrast before using them for text rather than accents, and prefer teal or gray-900 for actual copy.

**Confirmed failures found and fixed during the Phase 8 accessibility pass** (see `06-technical/architecture.md` phase log):
- `text-orange` on cream/white is ~2.3:1 — fails even for large text. Fixed in the Approvals chain (`bg-orange/15 text-orange` → `text-gray-900`, keeping the orange only as a background tint) and the required-field asterisk (switched to `text-red-600`, a stronger and more conventional "required" signal anyway).
- `text-orange` on the dark teal Ask TiJa section is ~3.9:1 — passes for large text but fails the 4.5:1 threshold this small semibold eyebrow text needs. Fixed with a one-off lighter tint (`text-[#FBB768]`, ~5:1) rather than a new token, since it's the only dark-background use of orange text on the site.

**`--color-orange-deep` (`#B8621F`)** — added for the hero headline's highlighted phrase (a UI-depth pass borrowing the "bold headline with one color-highlighted phrase" technique from reviewing competitor sites). Confirmed 2.13:1 for the base `--color-orange` against cream (fails even large-text 3:1), 4.18:1 for `--color-orange-deep` (passes large-text AA with margin). Reserve `--color-orange` for backgrounds/accents/small badges as before; use `--color-orange-deep` specifically when orange needs to be *text* on a light background at any size.

## Dark theme

The site ships a manual light/dark toggle (`ThemeProvider`/`ThemeToggle`, `src/components/theme/`) — **dark is the default** first-paint theme, light is opt-in. Implementation is CSS-variable-driven: the light palette above stays declared on `:root` unchanged (zero regression risk for anyone who switches to light), and a `.dark` class on `<html>` (toggled by `ThemeProvider`, applied server-side by default) overrides the same variable names in `globals.css`. Because every component already referenced tokens rather than raw hex (the "no raw hex codes" rule above), the vast majority of the site — `Section`'s tone classes, `Button`, every product page, forms, footer — inverts correctly with zero component changes.

| Token | Dark value | Notes |
|---|---|---|
| `--color-cream` | `#0D0F10` | Page background |
| `--color-white` | `#1A1B1D` | Card/surface background |
| `--color-gray-50`…`--color-gray-900` | redesigned 10-step ramp | Same "50 ≈ near background, 900 ≈ near foreground" direction as light, values chosen for contrast against the new dark background |
| `--color-orange-deep` | `#FBB768` | Mirror-image of the light-theme fix above — a *deeper* orange fails contrast on near-black the same way the base orange fails on cream. Reuses the amber already proven accessible for orange-on-teal text (`SectionLabel`'s `tone="dark"`) instead of a third one-off shade. |
| `--color-teal-deep` | `#4FC3D4` | New token, not a dark-mode override of `--color-teal` — see below. |
| `--color-sky`, `--color-orange`, `--color-teal` | unchanged | These stay fixed across both themes — see below. |

**Two structural fixed-vs-adaptive splits, both discovered by auditing every existing use of white/teal before shipping this:**

- **`--color-overlay` (fixed, always `#FFFFFF`, never redefined under `.dark`)** — a handful of surfaces are deliberately dark regardless of site theme (Ask TiJa's `tone="teal"` panel — "the one section permitted to break the cream/white canvas," its chat mockup, the Teams & Collaboration mockup, and `ScreenshotSlot`/`SectionLabel`'s `tone="dark"` branches) and rely on translucent white "frosted glass" overlays for internal contrast. Those needed a literal-white token independent of `--color-white`, which does change per theme. Paired with `--color-overlay-ink` (fixed `#1A1815`) for the rare case of dark text sitting on a literal-white chip inside one of those panels (e.g. Ask TiJa's mockup answer bubble).
- **`--color-teal-deep` (adaptive: `#0B4F6C` in light — identical to `--color-teal` — brighter `#4FC3D4` in dark)** — the mirror-image problem. `--color-teal` itself stays fixed across themes because it's used as a *background* (`Button` primary, Ask TiJa's panel, active-pill/badge states), always paired with `--color-overlay` text — lightening it would break that pairing's contrast. But teal is *also* used as *foreground* text/borders/focus-rings on the page's own cream/white surfaces (eyebrows, hover links, focus outlines) — those needed to get brighter in dark mode the same way `--color-orange-deep` does, or they'd read as dark-navy-on-near-black. Every such foreground use across the codebase was swapped from `text-teal`/`border-teal`/`outline-teal` to the `-deep` variant; `bg-teal` usages were left alone.
