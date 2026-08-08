# Asset Requirements

## Structure

```
/public
  /brand          — logo lockups (light/dark), favicon, wordmark
  /product         — general product UI captures not tied to a specific screenshot-plan slot
  /screenshots     — organized by module: /screenshots/core-hr, /payroll, /leave, /attendance,
                      /recruitment, /performance, /learning-development, /collaboration, /ess, /ask-tija
  /videos          — /videos/hero, /payroll, /leave, /attendance, /employee-profile, /recruitment, /ask-tija
                      (each with a compressed .mp4/.webm + a poster .jpg/.webp of the same name)
  /icons           — module icons, UI glyphs (SVG)
  /customers       — customer logos — populated only once real, permission-cleared logos exist
  /illustrations   — lightweight supporting SVG illustration assets
  /social          — OG/social share images per page-type
```

## Sourcing rule (scope §38/§39)

Reuse genuine ZiraHR product UI and existing brand assets wherever possible. In this environment specifically, the real HRMIS codebase is not available (see `00-source/zirahr-website-scope.md` deviation note) — so at kickoff every slot above is filled with a clearly-labeled placeholder (see `screenshot-plan.md`), swapped for the real asset the moment you drop it into the matching folder.

## Never do

- Never use generic stock photography as a substitute for product UI.
- Never fabricate customer logos or testimonial imagery.
- Never ship a placeholder that could be mistaken for a real screenshot — placeholders carry a visible "Preview" treatment (label, dashed border, or watermark — decided in `screenshot-plan.md`) precisely so they're never confused with the real product.

## Formats

- Screenshots: source at 2x resolution, served via `next/image` as AVIF/WebP with responsive `sizes`.
- Video: H.264 `.mp4` primary + `.webm` where feasible, always paired with a static poster image.
- Icons/illustrations: SVG, inlined for small UI glyphs, `next/image` for larger illustration assets.
