# Component Structure

```
/src
  /app
    /[locale]
      layout.tsx           — root shell: fonts, nav, footer, StructuredData, providers
      page.tsx              — homepage
      not-found.tsx
      /core-hr/page.tsx
      /payroll/page.tsx
      /leave-management/page.tsx
      /attendance-management/page.tsx
      /performance-management/page.tsx
      /recruitment/page.tsx
      /learning-development/page.tsx
      /employee-self-service/page.tsx
      /teams-collaboration/page.tsx
      /analytics/page.tsx
      /ask-tija/page.tsx
      /hr-software-kenya/page.tsx
      /payroll-software-kenya/page.tsx
      /hrmis-kenya/page.tsx
      /hr-software-africa/page.tsx
      /pricing/page.tsx
      /request-demo/page.tsx
      /signup/page.tsx
      /login/page.tsx        — thin redirect to the existing HR app login (PayeKenya)
      /resources/page.tsx
      /company/page.tsx
      /contact/page.tsx
      /legal/privacy/page.tsx
      /legal/terms/page.tsx
      /legal/security/page.tsx
      /legal/cookies/page.tsx
    /api
      /forms/demo-request/route.ts
      /forms/contact/route.ts
      /forms/newsletter/route.ts
    sitemap.ts
    robots.ts
    proxy.ts (next-intl locale routing via Next.js 16's proxy convention — technically at /src/proxy.ts)
  /components
    /layout        — PageShell, Container, Section (shared wrappers)
    /navigation     — NavBar, MegaMenu, MobileDrawer, LanguageSelector, StickyCta
    /sections       — one component per homepage beat (HeroSection, EmployeeJourneySection, ...)
    /product        — ProductPageLayout, ModuleShowcase, WorkflowDiagram, ConnectedRecordDiagram
    /forms          — DemoRequestForm, SignupWizard, ContactForm, NewsletterForm, form primitives (Field, ErrorText)
    /motion         — MotionProvider, useReducedMotion, ScrollReveal, MaskReveal, MagneticButton
    /media          — ScreenshotSlot, VideoSlot (placeholder-aware, see 08-assets/screenshot-plan.md)
    /seo            — StructuredData, Breadcrumbs
    /ui             — Button, Badge, Card, Tabs — small design-system primitives
  /lib
    /supabase       — server-only client factory
    /validation     — zod schemas shared by client + server (demoRequestSchema, contactSchema, newsletterSchema)
    analytics.ts    — track() abstraction, no provider wired yet
    slack.ts        — best-effort webhook notifier
  /i18n
    routing.ts      — next-intl locale config
    request.ts      — next-intl request config
  /messages
    en.json, fr.json, sw.json
/public
  /brand /product /screenshots /videos /icons /customers /illustrations /social
/supabase
  /migrations       — SQL migration files (see supabase.md)
```

## Rules

- No single "God" homepage component — each beat in `02-ux/homepage-scope.md` is its own file under `/components/sections`, composed in `app/[locale]/page.tsx`.
- Reusable section primitives (`Section`, `Container`) enforce consistent spacing/max-width rather than each section hand-rolling its own layout.
- `ScreenshotSlot`/`VideoSlot` are the *only* way product visuals are rendered — never an `<img>`/`<video>` inlined directly in a section component — so swapping placeholders for real assets later is a data change, not a component rewrite. See `08-assets/screenshot-plan.md`.
- Server Components by default; a component becomes a Client Component only when it needs interactivity/motion/state — marked explicitly, not defensively.
