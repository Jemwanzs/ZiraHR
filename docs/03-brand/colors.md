# Colors

Both source documents specify the same palette directionally with slightly different cream hex values (PDF: `#FFF9F2`, brief: `#FFF8EF`). We use the PDF's value as primary since it's the more detailed of the two specs; treat these as **provisional tokens** until a final SoftHR brand guideline supplies exact values — swapping them later is a one-file change (`tailwind.config.ts` theme tokens), never hardcoded per-component.

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
