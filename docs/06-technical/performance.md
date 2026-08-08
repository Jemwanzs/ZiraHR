# Performance

## Targets

Lighthouse (production-equivalent build): **Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+**. Checked at the end of Phase 9, but performance is treated as a design constraint throughout — not a cleanup pass bolted on at the end.

## Techniques

- **Images**: `next/image` everywhere, AVIF/WebP with fallback, explicit dimensions (no layout shift), lazy-loaded below the fold, eagerly loaded + `priority` only for the actual LCP element (typically the hero's central dashboard placeholder/screenshot).
- **Video**: poster-image fallback always present; muted autoplay only where it doesn't compete with page weight (desktop, above a certain viewport, and only for short hero-length clips); paused via `IntersectionObserver` when scrolled out of view; no autoplaying video at all on mobile hero (scope §35/§36 explicit rule).
- **Fonts**: Outfit self-hosted via `next/font/google`, preloaded, `font-display: swap` semantics handled by `next/font` automatically — no external font request at runtime.
- **JS**: minimal third-party scripts (none at launch beyond what's explicitly wired later, e.g. an analytics provider once chosen); route-level code splitting is automatic under App Router; heavy motion/interactive components (Employee Journey scroll story, Product Tour) are dynamically imported so they don't inflate the initial bundle for pages that don't use them.
- **Animation init**: motion hooks initialize on viewport intersection, not on mount for off-screen content.
- **Reduced motion**: `prefers-reduced-motion` alternative implemented once (`useReducedMotion` hook) and applied consistently — see `03-brand/motion-language.md`.

## What performance work explicitly avoids

Sacrificing Core Web Vitals for visual polish is treated as a bug, not a trade-off — an animation that hitches breaks the "premium" feeling the whole site is built to create, so a janky effect gets simplified or cut, not shipped anyway.

## Measurement

Lighthouse run against `npm run build && npm start` (production build, not `next dev`) — dev-server numbers are not representative and are never used to claim a target is met.
