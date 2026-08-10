# Performance

## Targets

Lighthouse (production-equivalent build): **Performance 90+, Accessibility 95+, Best Practices 95+, SEO 95+**. Checked at the end of Phase 9, but performance is treated as a design constraint throughout — not a cleanup pass bolted on at the end.

## Techniques

- **Images**: `next/image` everywhere, AVIF/WebP with fallback, explicit dimensions (no layout shift), lazy-loaded below the fold, eagerly loaded + `priority` only for the actual LCP element (typically the hero's central dashboard placeholder/screenshot).
- **Video**: poster-image fallback always present; muted autoplay only where it doesn't compete with page weight (desktop, above a certain viewport, and only for short hero-length clips); paused via `IntersectionObserver` when scrolled out of view; no autoplaying video at all on mobile hero (scope §35/§36 explicit rule).
- **Fonts**: Outfit self-hosted via `next/font/google`, preloaded, `font-display: swap` semantics handled by `next/font` automatically — no external font request at runtime.
- **JS**: minimal third-party scripts (none at launch beyond what's explicitly wired later, e.g. an analytics provider once chosen); route-level code splitting is automatic under App Router. (Section-level dynamic imports for the heaviest client components were considered but turned out unnecessary — see Phase 9 results below — so this was not implemented; revisit if a future page's bundle grows large enough to matter.)
- **Animation init**: `Reveal` (the shared scroll-entrance wrapper) animates via `whileInView`, so off-screen sections don't animate until scrolled near — not literally "lazy-initialized" beyond that.
- **Reduced motion**: enforced once, sitewide, via `MotionProvider` (`MotionConfig reducedMotion="user"` from Motion) wrapping the whole app in the root layout — every `motion.*` component automatically honors the OS-level `prefers-reduced-motion` setting. See `03-brand/motion-language.md`.

## What performance work explicitly avoids

Sacrificing Core Web Vitals for visual polish is treated as a bug, not a trade-off — an animation that hitches breaks the "premium" feeling the whole site is built to create, so a janky effect gets simplified or cut, not shipped anyway.

## Measurement

Lighthouse run against `npm run build && npm start` (production build, not `next dev`) — dev-server numbers are not representative and are never used to claim a target is met.

## Phase 9 audit results

Run locally via `npx lighthouse` against a real Chrome instance, production build, default (throttled) Lighthouse settings.

**Homepage — before fix**: Performance 76 / Accessibility 96 / Best Practices 100 / SEO 100. LCP 3.8s, TBT 480ms.

Root cause: the Hero section's eyebrow/headline/supporting text/CTAs were wrapped in `Reveal` (a `whileInView` fade-in starting at `opacity: 0`). The H1 headline was Lighthouse's identified LCP element, so it stayed invisible until the Motion bundle loaded, hydrated, and its `IntersectionObserver` fired — directly inflating LCP. Scroll-reveal animations only make sense for content revealed *as you scroll past it*; the hero is already in the initial viewport, so animating its entrance was actively counterproductive.

**Fix**: removed `Reveal` from `HeroSection` entirely — it's a plain, instantly-rendered Server Component now with no client-side gating.

**Homepage — after fix**: Performance **94** / Accessibility **96** / Best Practices **100** / SEO **100**. LCP 2.9s (score 0.8 — the remaining gap is consistent with Lighthouse's simulated CPU/network throttling rather than a real bottleneck; TTFB was 20ms and there were no render-blocking resources), TBT 120ms (score 0.97).

**`/payroll` (representative product page)**: Performance **95** / Accessibility **96** / Best Practices **100** / SEO **100** — confirms the fix generalizes and product pages (which don't share the Hero's original problem) were already solid.

All four categories meet or exceed the 90+/95+/95+/95+ targets. Re-run this audit once real product screenshots/video replace the `ScreenshotSlot` placeholders (`docs/08-assets/screenshot-plan.md`) — real images will be heavier than the current placeholder `<div>`s, so LCP/byte-weight should be re-verified at that point, particularly for the hero's `priority`-loaded dashboard image.

## Later addition: HeroProductReel (client-requested animated hero)

The static hero dashboard placeholder was later replaced with `HeroProductReel` — an always-on, auto-cycling animated component (four scenes, `setInterval`-driven, several concurrent Motion animations per scene) mounted directly in the initial viewport. This is exactly the kind of addition that risks quietly reintroducing the Phase 9 regression, so it was re-audited rather than assumed safe: **Performance 95 / Accessibility 96 / Best Practices 100 / SEO 100**, LCP 2.7s, TBT 120ms — all targets still met, performance actually improved slightly. This held because the reel is a separate component mounted *below* the (still plain, still instant, still server-rendered) hero text — the H1 stays the LCP element and stays ungated, exactly as the Phase 9 fix established. Re-verify again if the reel's scene count or animation complexity grows.

## Later addition: CapabilityCloud (long-list UI depth pass)

The flat multi-column checkmark lists used for per-page capability lists (Core HR: 14 items, Payroll: 16 items, ESS: 11 items) were replaced with `CapabilityCloud` — a staggered, `whileInView`-triggered pill cloud (`src/components/ui/CapabilityCloud.tsx`), used by `ProductPageLayout` and `EssSection`. Motivation: a long vertical checklist reads as a "list dump" even when each item's copy is already short; wrapping the same items into a compact, hover-interactive chip cloud reads as a designed component instead. Per-item stagger is capped at `index * 0.04s` (max 0.4s) so a 16-item list doesn't produce a visibly slow cascade. All items are plain `motion.span` elements below the fold on every page that uses them — no LCP-element risk, consistent with the Phase 9 rule (only content in the initial viewport needs the "don't gate the LCP element" caution; these lists sit further down the page).
