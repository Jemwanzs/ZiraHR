# Typography

## Family

**Outfit** — self-hosted via `next/font/google`, preloaded, variable weight axis where available. No fallback font decision needed at kickoff since no existing SoftHR-approved font was found in this environment; if one surfaces later, this is a single-file change (`src/app/[locale]/layout.tsx` font import + Tailwind theme).

## Scale

- **Display** (huge, selective use only — one or two per page, e.g. "HR. Connected." or a homepage section headline): Bold/Semi-Bold, tight line-height, large negative letter-spacing at the largest sizes.
- **Headline** (section headers): Semi-Bold.
- **Body**: Regular, generous line-height (1.5–1.6) for readability against the cream background.
- **Supporting/caption**: Regular, smaller size, gray-600/700 for de-emphasis.

## Rules

- Avoid excessive uppercase — the hero eyebrow ("THE HR PLATFORM BUILT AROUND YOUR PEOPLE") is one of the few deliberate exceptions, not a pattern to repeat throughout.
- Headlines stay short — one line where possible, two at most on mobile.
- No long paragraphs anywhere in marketing copy; body copy blocks cap around 2–3 short sentences before breaking into a list, card, or new section.
- Type scale, weights, and line-heights are defined once in the Tailwind theme (`fontSize` scale with paired `lineHeight`), not tuned ad-hoc per component.
