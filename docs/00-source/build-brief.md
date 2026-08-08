# Build Brief — Process, Stack & Rules

> Transcribed from the project kickoff instructions given alongside `zirahr-website-scope.md`. This governs *how* we build (process, stack, git, i18n, Supabase), where the scope PDF governs *what* we build.

## Project Framing

Standalone official ZiraHR Landing Page / Marketing Website. Separate codebase from the main ZiraHR HRMIS application, but must represent the same product accurately. Primary market: Kenya, designed from day one to support expansion across Africa. Must be modern, premium, highly visual, fast, SEO-driven, responsive, native modern web stack. Not a simple corporate website — a high-conversion SaaS product website selling ZiraHR as a complete cloud-based HRMIS.

Repository: `https://github.com/Jemwanzs/ZiraHR.git` (source of truth, ship and commit here).

## Stack

Next.js, TypeScript, React, Tailwind CSS, modern component architecture, Framer Motion (or equivalent lightweight animation library), Supabase for database functionality, Vercel for hosting/deployment. Current stable versions. No unnecessary libraries. Priorities: performance, accessibility, SEO, maintainability, responsive behaviour, animation quality, clean architecture.

## Hosting & Infrastructure

Vercel for hosting. Supabase only where database functionality is actually required — demo requests, contact forms, newsletter subscriptions, lead capture, partner enquiries, future gated resources, marketing preferences, CMS-lite data where necessary. Do not move static website content into Supabase unnecessarily; static product/SEO pages stay performant and indexable.

## Git & Repository Rules

Inspect current files before significant changes; don't overwrite unrelated work; keep commits logically grouped; consistent naming; avoid duplicate components; avoid temporary code patches; remove unused imports/dead code. Suggested branch strategy: `main`, `develop`, `feature/*` — **not forced if the existing repo already has a valid workflow**. (Repo was empty at kickoff; we agreed on `main` + `feature/*` without a separate `develop`, see `/docs/06-technical/architecture.md`.)

## Documentation Requirement

Scope must not live in one giant document only — maintain a `/docs` directory with the structure implemented under `/docs` in this repo (mirrors the brief's recommended tree, plus a `notifications.md` addition for Slack). Keep these updated as development progresses; never delete the source scope file.

## Localization

Support English, French, Swahili from the beginning. Language selector top-right of navigation, **flag-based, no visible language names** (🇬🇧/🇫🇷/🇰🇪). Desktop: active flag in navbar, click opens a polished dropdown/popover of available flags, with hover/active/keyboard-nav/ARIA support. Accessible labels required even though visible names are hidden: "Switch to English", "Passer au français", "Badilisha kwenda Kiswahili".

SEO-friendly locale routing: `/`, `/fr`, `/sw` (English may remain default root locale), e.g. `/payroll`, `/fr/payroll`, `/sw/payroll`. Selection persists across navigation, refresh, product pages, resource pages, demo pages via cookies/locale-aware routing.

Do not hardcode translated strings into components — use structured translation keys (e.g. `navigation.platform`, `hero.heading`, `cta.requestDemo`). English completed first; French/Swahili may use structured placeholders initially if human-approved translations aren't ready yet, but the *architecture* must be complete. No automatic runtime machine translation as the primary experience.

## Design Direction

Premium, modern, calm, highly polished, African but globally competitive, product-led, visually alive, minimal without feeling empty, warm rather than sterile. Apple-quality restraint in hierarchy and motion — without copying Apple's branding or site.

## Brand Colour Direction

Warm Cream primary background (`#FFF8EF` direction), White for cards/product stages, Very Light Gray for structure/separation, Sky Blue for product highlights/selected states/diagrams/links, Deep Teal/Blue for primary CTA and strong anchors, Warm Orange for small energetic accents only. Avoid overusing orange or blue — stay light, calm, spacious, premium.

## Typography

Outfit preferred (unless an existing approved ZiraHR font is already configured — none was found; Outfit confirmed). Large bold display headings, strong spacing, short paragraphs, compact supporting copy, clear hierarchy. Copy tone: calm, professional, contemporary, slightly playful, confident, never exaggerated.

## Navigation & CTAs

Nav: Platform | Solutions | Payroll | Resources | Pricing | Company. Right side: Language Selector | Login | Request Demo | Start with ZiraHR. Modern sticky nav. CTA hover: gentle elevation, smooth background transition, arrow movement, clear focus state, no exaggerated bouncing.

## Media & Video

Support real screenshots, short product videos, product UI animations, interactive workflows, mobile mockups, dashboard previews, motion graphics, lightweight illustrations, SVG graphics. Avoid heavy reliance on generic stock photography; where people imagery is used it should feel modern, diverse, African, business-relevant. Dedicated video slots: hero film, payroll workflow, leave approval, attendance, employee profile, recruitment, Ask TiJa — poster fallback, lazy loading, muted autoplay where appropriate, pause off-screen, mobile-optimized.

## SEO-First Architecture

Build SEO into the project before writing all pages: semantic HTML, server-rendered/indexable content, per-page metadata, canonical URLs, sitemap, robots.txt, OpenGraph, social metadata, structured data, breadcrumbs, clean internal links. SEO documentation precedes implementation of the marketing pages.

Initial SEO page map: `/`, `/core-hr`, `/payroll`, `/leave-management`, `/attendance-management`, `/performance-management`, `/recruitment`, `/learning-development`, `/employee-self-service`, `/hr-software-kenya`, `/payroll-software-kenya`, `/hrmis-kenya`, `/hr-software-africa`, `/request-demo`, `/signup`, `/login`, `/resources`, `/company`, `/contact`. No thin duplicate SEO pages.

## Database Requirements (Supabase)

Initial use: lead-generation functionality only. Entities: `demo_requests` (id, first_name, last_name, work_email, phone, company_name, country, employee_count, interested_modules, message, preferred_contact_method, source, status, created_at), `contact_requests`, `newsletter_subscribers`. Secure RLS policies; private leads never exposed publicly.

## Forms

Validate client-side and server-side, protect against spam, show clear loading state, show success message, prevent accidental duplicate submission, store valid records in Supabase, support analytics events.

## Analytics Preparation

Event tracking hooks for: Request Demo, Signup, Login, Hero CTA, product page visits, pricing interactions, language changes, video plays, product tour interactions, form submissions. Do not hardcode an analytics provider until one is selected — provide a clean event abstraction.

## Performance & Accessibility

Target production Lighthouse: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+. Image optimization, AVIF/WebP, lazy loading, code splitting, optimized fonts, minimal JS, reduced-motion support. Accessibility: keyboard navigation, focus states, semantic structure, ARIA where required, contrast compliance, reduced motion, screen-reader-friendly language selector, accessible modal/dialog behaviour.

## Responsive Design

Design from desktop and mobile intentionally — not shrunk desktop. Support desktop, laptop, tablet, mobile. Some desktop animations switch into swipeable/simplified mobile experiences.

## Asset & Component Structure

`/public`: `/brand /product /screenshots /videos /icons /customers /illustrations /social`. `/components`: `/layout /navigation /sections /product /forms /motion /media /seo /ui`. Reusable section primitives — avoid one massive homepage component.

## Development Process (as originally specified)

Step 1 codebase assessment → Step 2 proposed architecture → Step 3 route map → Step 4 component map → Step 5 documentation files → Step 6 foundation build (design tokens, fonts, navigation, footer, localization, SEO foundation) → Step 7 homepage → Step 8 product pages → Step 9 forms/Supabase → Step 10 SEO pages/resources → Step 11 animations/media → Step 12 QA → Step 13 Vercel deployment. (Consolidated into the 11 phases in `/docs/06-technical/architecture.md`.)

## Explicit Do-Nots

Do not: invent ZiraHR product functionality; copy competitor website content; copy Apple layouts exactly; build one giant React component; hardcode language logic throughout components; put all content into Supabase; add unnecessary animation libraries; sacrifice SEO for animation; sacrifice performance for visual effects; use fake testimonials; use fake customer numbers; add placeholder lorem ipsum in production.

## Integrations Confirmed in Kickoff Conversation

- **Supabase** — project credentials to be supplied by the user.
- **Slack** — notifications for signup requests and demo requests (and by extension, likely contact/newsletter). Implemented as best-effort Slack Incoming Webhook calls from server-side form handlers; webhook URL(s) supplied by the user later. See `/docs/06-technical/notifications.md`.
- **Vercel** — project/site details to be supplied by the user.
