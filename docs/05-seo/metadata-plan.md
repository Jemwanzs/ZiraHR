# Metadata Plan

## Mechanism

Next.js Metadata API (`generateMetadata` per route segment), locale-aware — every locale variant of a page gets its own title/description, not a copy of the English metadata.

## Per-page requirements

- **Title**: unique, includes primary keyword target from `keyword-map.md` where applicable, brand suffix (` | ZiraHR`), kept under ~60 characters.
- **Description**: unique, ~150–160 characters, written as genuine copy (not keyword-stuffed), matches the page's actual content.
- **Canonical URL**: self-referencing canonical on every page, locale-aware (`https://zirahr.com/fr/payroll` canonicalizes to itself, not to the English version).
- **`hreflang` alternates**: every localized page declares `en`/`fr`/`sw` alternates + `x-default` pointing at the English version, via Next.js `alternates.languages`.
- **OpenGraph**: `og:title`, `og:description`, `og:image` (dedicated per page-type OG image, see `08-assets/asset-requirements.md`), `og:locale`.
- **Twitter/X card**: `summary_large_image`, mirrors OG title/description.

## Defaults vs overrides

A root `generateMetadata` in `src/app/[locale]/layout.tsx` sets sitewide defaults (title template, default OG image, `metadataBase`); every route overrides title/description/canonical/OG image specifically. No page ships with the raw sitewide default as its actual metadata — that's a signal a page was shipped without SEO review.

## Sitemap & robots

- `src/app/sitemap.ts` — generates all locale × route combinations, excludes `/api/*`, excludes any page explicitly marked `noindex` (e.g. thank-you/confirmation pages after form submission).
- `src/app/robots.ts` — allows all except `/api/*`; points to the sitemap.

## Non-indexable pages

Form confirmation/thank-you states, and any interactive-tour internal states, are `noindex, follow` — they're real UX states, not content pages, and shouldn't compete in search results with their parent page.
