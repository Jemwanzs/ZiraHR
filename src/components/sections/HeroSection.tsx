import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import type { PlaceholderIconName } from "@/components/media/PlaceholderIcon";
import { HeroProductReel } from "@/components/sections/HeroProductReel";
import { AngledCardStack } from "@/components/sections/AngledCardStack";

/** Small inline "spark" glyph for the headline's icon-mid-sentence treatment
 * — borrows Firebase's technique (an icon between two headline clauses),
 * not their flame mark; own shape, sized to sit inline with bold text. */
function HeroSparkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="mx-1 inline-block h-[0.75em] w-[0.75em] -translate-y-[0.05em] align-middle text-orange-deep"
    >
      <path
        d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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

      {/* Decorative only — see AngledCardStack's own doc comment for why
          this is plain CSS and safe to sit in the initial viewport. */}
      <AngledCardStack />

      <div className="relative flex flex-col items-center gap-6 text-center">
        <Link
          href="/ask-tija"
          className="group inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white py-1.5 pr-2 pl-4 text-sm shadow-sm transition-colors hover:border-gray-300"
        >
          <span className="font-semibold text-teal-deep">
            {t("announcementBanner.badge")}
          </span>
          <span className="text-gray-600">{t("announcementBanner.text")}</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-cream px-3 py-1 text-xs font-semibold text-gray-900 transition-transform group-hover:translate-x-0.5">
            {t("announcementBanner.linkLabel")}
            <span aria-hidden="true">→</span>
          </span>
        </Link>

        <p className="text-sm font-semibold tracking-wide text-teal-deep">
          {t("eyebrow")}
        </p>
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          {t.rich("headline", {
            hl: (chunks) => <span className="text-orange-deep">{chunks}</span>,
            icon: () => <HeroSparkIcon />,
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
          <Link href="/login" className="hover:text-teal-deep">
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
