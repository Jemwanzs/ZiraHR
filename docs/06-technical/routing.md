# Routing

## Locale routing

`next-intl` middleware, `localePrefix: 'as-needed'` — English (`en`) is the default locale and serves at the root (`/payroll`), French and Swahili get explicit prefixes (`/fr/payroll`, `/sw/payroll`). Locale resolution order: existing `NEXT_LOCALE` cookie → `Accept-Language` header → default (`en`). Selecting a language sets the cookie so it persists across navigation, refresh, and future visits.

## Full route table

| Route | Locale variants | Type |
|---|---|---|
| `/` | en, fr, sw | Server page |
| `/core-hr` | en, fr, sw | Server page |
| `/payroll` | en, fr, sw | Server page |
| `/leave-management` | en, fr, sw | Server page |
| `/attendance-management` | en, fr, sw | Server page |
| `/performance-management` | en, fr, sw | Server page |
| `/recruitment` | en, fr, sw | Server page |
| `/learning-development` | en, fr, sw | Server page |
| `/employee-self-service` | en, fr, sw | Server page |
| `/teams-collaboration` | en, fr, sw | Server page |
| `/analytics` | en, fr, sw | Server page |
| `/ask-tija` | en, fr, sw | Server page |
| `/hr-software-kenya` | en, fr, sw | Server page |
| `/payroll-software-kenya` | en, fr, sw | Server page |
| `/hrmis-kenya` | en, fr, sw | Server page |
| `/hr-software-africa` | en, fr, sw | Server page |
| `/pricing` | en, fr, sw | Server page |
| `/request-demo` | en, fr, sw | Server page + client form |
| `/signup` | en, fr, sw | Server page + client wizard |
| `/login` | en, fr, sw | Thin redirect to HRMIS app |
| `/resources` | en, fr, sw | Server page (index only at launch; `/resources/[category]/[slug]` added when content exists) |
| `/company` | en, fr, sw | Server page |
| `/contact` | en, fr, sw | Server page + client form |
| `/legal/privacy`, `/legal/terms`, `/legal/security`, `/legal/cookies` | en, fr, sw | Server page — **unpublished until real legal copy exists** |
| `/api/forms/demo-request`, `/api/forms/contact`, `/api/forms/newsletter` | locale-agnostic | Route Handler |
| `sitemap.xml`, `robots.txt` | locale-agnostic (sitemap includes all locale URLs) | Generated |

## 404 handling

`app/[locale]/not-found.tsx` — locale-aware 404 page, keeps nav/footer/language selector intact rather than a bare error page, includes a search/links-back affordance.

## Redirects

Managed centrally in `next.config.ts` `redirects()` — any URL restructuring during development goes through a permanent (308) redirect entry there, never a silent route removal, to avoid breaking inbound SEO links once pages are indexed.
