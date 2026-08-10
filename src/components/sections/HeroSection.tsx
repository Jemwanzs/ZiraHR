import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import { HeroProductReel } from "@/components/sections/HeroProductReel";

const SATELLITES = [
  { slot: "hero.satellite.profile", label: "Employee Profile" },
  { slot: "hero.satellite.leave", label: "Leave Approval" },
  { slot: "hero.satellite.payroll", label: "Payroll" },
  { slot: "hero.satellite.attendance", label: "Attendance" },
  { slot: "hero.satellite.performance", label: "Performance" },
  { slot: "hero.satellite.recruitment", label: "Recruitment" },
  { slot: "hero.satellite.askTija", label: "Ask TiJa" },
] as const;

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
    <Section tone="cream" className="pt-12 pb-8 sm:pt-20">
      <div className="flex flex-col items-center gap-6 text-center">
        <p className="text-sm font-semibold tracking-wide text-teal">
          {t("eyebrow")}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold text-gray-900 sm:text-5xl lg:text-6xl">
          {t("headline")}
        </h1>
        <p className="max-w-xl text-lg text-gray-600">{t("supporting")}</p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
          <Button href="/signup" showArrow>
            {tCta("startWithZiraHR")}
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
            {SATELLITES.map((item) => (
              <ScreenshotSlot
                key={item.slot}
                slot={item.slot}
                alt={item.label}
                label={item.label}
                aspect="square"
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
