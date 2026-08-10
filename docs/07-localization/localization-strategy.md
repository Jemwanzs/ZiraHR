# Localization Strategy

## Languages at launch

English (default), French, Swahili.

## Routing

`next-intl`, `localePrefix: 'as-needed'` — English serves at the root (no `/en` prefix), French and Swahili get explicit prefixes (`/fr`, `/sw`). See `06-technical/routing.md` for the full route table.

## Language selector

- Compact flag + code trigger: flag (🇬🇧/🇫🇷/🇰🇪 equivalents, see below) plus the two-letter code (EN/FR/SW) — Kenya's flag stands in for Swahili since there isn't a standard "Swahili" flag and Kenya is the primary market.
- **Real inline SVG flags, not Unicode flag emoji** (`src/components/ui/FlagIcon.tsx`). The original flag-only build used emoji, which look correct on macOS/iOS/Android but render as bare two-letter fallback text ("GB", "FR", "KE") on Windows — Windows fonts have no glyphs for regional-indicator emoji pairs. This was caught from a real screenshot during a feedback pass and fixed by drawing the three flags as SVG, which is font-independent and renders identically everywhere.
- Desktop: trigger shown in the nav bar; click opens an animated dropdown (Motion fade/scale) listing all three locales as flag + full autonym (English/Français/Kiswahili) + code, with a check mark on the active one.
- Mobile: same control, placed in the drawer header.
- Fully keyboard-navigable (arrow keys between options, `Enter`/`Space` to select, `Esc` to close), `role="menu"`/`role="menuitemradio"`, with the full language name as visible text now doing the job the old flag-only build needed `aria-label`s for.

## Persistence

Selecting a language sets a `NEXT_LOCALE` cookie; persists across page navigation, refresh, and return visits — including on product pages, resource pages, and demo/signup pages, per the explicit requirement.

## Translation architecture

No hardcoded strings in components. All copy lives in `src/messages/{en,fr,sw}.json`, accessed via `next-intl`'s `useTranslations`/`getTranslations`, referenced by structured keys — see `translation-keys.md`.

## Translation completeness policy

English is written and approved first (source of truth — see `04-content/`). French and Swahili started as **structurally complete placeholders** (every key present, values prefixed `[FR] ...` / `[SW] ...`) so the i18n architecture could be fully exercised and testable before real translations existed.

**Status update**: once the site went live, visitors switching to French/Swahili saw the raw `[FR]`/`[SW]`-prefixed English text, which reads as broken rather than "translation pending." Client decision: replace the placeholders with real (AI-translated) French and Swahili immediately rather than leave visibly-broken text live, instead of waiting for human-approved copy. Both `fr.json` and `sw.json` are now fully translated (formal business register, Kenya-appropriate Swahili) with zero remaining `[FR]`/`[SW]` markers — Kenyan statutory acronyms (PAYE, NSSF, SHIF, Housing Levy) and the ZiraHR/TiJa product names are intentionally left untranslated in both locales, matching what would appear on an actual Kenyan payslip regardless of interface language.

This is AI-translated content, not yet reviewed by a human fluent speaker — treat it as a strong stopgap, not a final state. Swap in human-reviewed copy whenever it becomes available, section by section; there's no internal "pending review" flag surfaced to visitors, so any correction is a direct edit to `fr.json`/`sw.json`.

## Locale-aware formatting

Dates, numbers, and currency use `Intl` APIs keyed off the active locale from day one, even though only KES/Kenya content ships initially — avoids a retrofit when a second country/currency is added.
