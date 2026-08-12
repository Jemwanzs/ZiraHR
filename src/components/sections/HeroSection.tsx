import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import type { PlaceholderIconName } from "@/components/media/PlaceholderIcon";
import { HeroProductReel } from "@/components/sections/HeroProductReel";

const SATELLITES: Array<{ slot: string; label: string; icon: PlaceholderIconName }> = [
  { slot: "hero.satellite.profile", label: "Employee Profile", icon: "directory" },
  { slot: "hero.satellite.leave", label: "Leave Approval", icon: "leave" },
  { slot: "hero.satellite.payroll", label: "Payroll", icon: "payslip" },
  { slot: "hero.satellite.attendance", label: "Attendance", icon: "attendance" },
  { slot: "hero.satellite.performance", label: "Performance", icon: "performance" },
  { slot: "hero.satellite.recruitment", label: "Recruitment", icon: "recruitment" },
  { slot: "hero.satellite.askTija", label: "Ask TiJa", icon: "askTija" },
];

/**
 * scope §4 / docs/02-ux/homepage-scope.md beat 01–02: not a static dashboard
 * screenshot — a central dashboard with module cards assembling around it.
 *
 * Deliberately NOT wrapped in Reveal/motion — this content is already in
 * the initial viewport, and the hero headline is the page's LCP element.
 * A client-side opacity:0 -> 1 IntersectionObserver animation on it was
 * measured adding ~2.5s to LCP (3.8s vs 1.3s) in the Phase 9 Lighthouse
 * audit, since the text stayed invisible until JS hydrated. Scroll-reveal
 * is for content revealed as you scroll past it, not initial-viewport
 * content — see docs/06-technical/performance.md.
 */
export function HeroSection() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");

  return (
    <Section tone="cream" className="relative overflow-hidden pt-12 pb-8 sm:pt-20">
      {/* Ambient background glow — decorative only, plain CSS (no Motion),
          so it can sit in this Server Component without gating the hero
          text behind client JS the way an animated Reveal wrapper would
          (see docs/06-technical/performance.md, Phase 9). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-10%] left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-[0.15] blur-3xl animate-[hero-glow-drift_16s_ease-in-out_infinite]"
        style={{ background: "var(--color-sky)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-[-8%] h-72 w-72 rounded-full opacity-[0.12] blur-3xl animate-[hero-glow-drift_20s_ease-in-out_infinite_reverse]"
        style={{ background: "var(--color-orange)" }}
      />

      <div className="relative flex flex-col items-center gap-6 text-center">
        <p className="text-sm font-semibold tracking-wide text-teal">
          {t("eyebrow")}
        </p>
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          {t.rich("headline", {
            hl: (chunks) => <span className="text-orange-deep">{chunks}</span>,
          })}
        </h1>
        <p className="max-w-xl text-lg text-gray-600">{t("supporting")}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Button href="/signup" showArrow>
            {tCta("startWithSoftHR")}
          </Button>
          <Button href="/request-demo" variant="secondary">
            {tCta("requestDemo")}
          </Button>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          <Link href="/login" className="hover:text-teal">
            {tCta("alreadyUsing")}
          </Link>
        </p>
      </div>

      <div className="mt-16">
        <div className="relative mx-auto max-w-4xl">
          {/* Animated product reel, not a static screenshot — see
              HeroProductReel's own doc comment. Client-rendered, mounted
              below the (instant, server-rendered) hero text so it never
              gates LCP the way the old Reveal-wrapped version did. */}
          <HeroProductReel />
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {SATELLITES.map((item, index) => (
              <div
                key={item.slot}
                className="animate-[hero-satellite-in_0.5s_ease-out_both] transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                style={{ animationDelay: `${0.5 + index * 0.07}s` }}
              >
                <ScreenshotSlot
                  slot={item.slot}
                  alt={item.label}
                  label={item.label}
                  aspect="square"
                  icon={item.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
