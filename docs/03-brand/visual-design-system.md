# Visual Design System

Premium, modern, calm, highly polished, African but globally competitive, product-led, visually alive, minimal without feeling empty, warm rather than sterile. Apple-quality restraint in hierarchy and motion — without copying Apple's branding or site layouts.

## Canvas

Warm Cream is the default page background — not white, not yellow-cream, "extremely subtle warmth." White is used generously for cards, product stages, and clean content blocks that need to pop off the cream. Soft Gray handles structural separation and typography hierarchy (secondary text, dividers, muted backgrounds), not as a decorative color.

## Color discipline

The product's own UI screenshots/mockups provide most of the color on the page — the design system itself stays deliberately restrained (cream/white/gray, with blue and orange used narrowly and intentionally). See `colors.md` for exact tokens and usage rules.

## Typography

Outfit throughout — see `typography.md`.

## Motion

See `motion-language.md`. Motion communicates hierarchy and relationships, never decoration for its own sake.

## Imagery

Real SoftHR product UI wherever possible (placeholder mockups until real assets are supplied — see `/docs/08-assets`). Where people imagery is used at all, it must read modern, diverse, African, and business-relevant — not generic global stock photography.

## Elevation & surfaces

Cards use soft shadows, not hard borders, to separate from the cream canvas — consistent with "calm" rather than "busy." Corner radii stay generous and consistent (a single radius scale defined once in Tailwind config, not ad-hoc per component).

## Density

Short copy, strong hierarchy, generous whitespace. No giant paragraphs anywhere on the site, including product pages — if a claim needs three sentences to explain, it likely belongs in `/resources`, not on a landing page.

## Later addition: competitor-reference redesign pass

Client explicitly asked to review two competitor sites (Meridian HR, SeamlessHR) and "borrow a lot" for a UI/animation depth pass. What was adopted vs. deliberately left out, and why:

- **Adopted**: bold/oversized hero display type with one color-highlighted phrase (Meridian's technique, re-implemented in our own palette — see `colors.md`'s `--color-orange-deep`); numbered section eyebrow labels (`SectionLabel`, "01 · YOUR PEOPLE") giving the homepage's section sequence an explicit editorial rhythm; a subtle dotted-grid decorative background texture (`DotGrid`) behind "poster" moments; a denser stat-forward opening for the Dashboards section.
- **Deliberately not adopted**: SeamlessHR's hero is built around real human/office photography — we have none, and fabricating stock-style "people" imagery would misrepresent the product the same way an invented testimonial would (scope §39's core rule). Meridian's multi-country flag list (`KE·UG·NG·CI·GH·ZA`) implies operations in six countries; SoftHR is Kenya-first with Africa expansion *planned*, so copying that nav treatment would overstate current reach. Meridian's scattered third-party-app integration cards imply OAuth connections to named external tools we don't actually offer — not built. Meridian's dense ~12-tile KPI wall was not replicated with invented numbers to match its density; the Dashboards section instead reuses the three real stats already established elsewhere (hero reel, product tour) rather than fabricating nine more.
