# Localization Strategy

## Languages at launch

English (default), French, Swahili.

## Routing

`next-intl`, `localePrefix: 'as-needed'` — English serves at the root (no `/en` prefix), French and Swahili get explicit prefixes (`/fr`, `/sw`). See `06-technical/routing.md` for the full route table.

## Language selector

- **No visible language names** — flag-only UI: 🇬🇧 (English), 🇫🇷 (French), 🇰🇪 (Swahili — Kenya flag, not a generic "Swahili" flag, since there isn't a standard one and Kenya is the primary market).
- Desktop: active flag shown in the nav bar; click opens a small popover with the other flags.
- Mobile: same flag-only control, placed in the drawer header.
- Fully keyboard-navigable (arrow keys between options, `Enter`/`Space` to select, `Esc` to close), with `aria-label`s carrying the real text even though it's never visually shown:
  - "Switch to English"
  - "Passer au français"
  - "Badilisha kwenda Kiswahili"
- Popover uses proper `role="menu"`/`role="menuitemradio"` (or a native `<Select>`-equivalent pattern) so screen readers announce it correctly despite the flag-only visual treatment.

## Persistence

Selecting a language sets a `NEXT_LOCALE` cookie; persists across page navigation, refresh, and return visits — including on product pages, resource pages, and demo/signup pages, per the explicit requirement.

## Translation architecture

No hardcoded strings in components. All copy lives in `src/messages/{en,fr,sw}.json`, accessed via `next-intl`'s `useTranslations`/`getTranslations`, referenced by structured keys — see `translation-keys.md`.

## Translation completeness policy

English is written and approved first (source of truth — see `04-content/`). French and Swahili start as **structurally complete placeholders** (every key present, values clearly marked as pending, e.g. prefixed `[FR] ...` / `[SW] ...` during development) so the i18n architecture is fully exercised and testable before real translations exist. Machine translation is never used as the shipped production experience — placeholder markers stay in a locale until a human-approved translation replaces them, and that locale is not promoted to "complete" until it does.

## Locale-aware formatting

Dates, numbers, and currency use `Intl` APIs keyed off the active locale from day one, even though only KES/Kenya content ships initially — avoids a retrofit when a second country/currency is added.
