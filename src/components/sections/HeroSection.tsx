import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import { Reveal } from "@/components/motion/Reveal";

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
 */
export function HeroSection() {
  const t = useTranslations("hero");
  const tCta = useTranslations("cta");

  return (
    <Section tone="cream" className="pt-12 pb-8 sm:pt-20">
      <div className="flex flex-col items-center gap-6 text-center">
        <Reveal>
          <p className="text-sm font-semibold tracking-wide text-teal">
            {t("eyebrow")}
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h1 className="max-w-3xl text-4xl font-semibold text-gray-900 sm:text-5xl lg:text-6xl">
            {t("headline")}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-lg text-gray-600">{t("supporting")}</p>
        </Reveal>
        <Reveal delay={0.15}>
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
        </Reveal>
      </div>

      <Reveal delay={0.2} className="mt-16">
        <div className="relative mx-auto max-w-4xl">
          <ScreenshotSlot
            slot="hero.dashboard"
            alt="ZiraHR executive dashboard"
            label="Executive Dashboard"
            aspect="wide"
            priority
            className="shadow-xl"
          />
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
      </Reveal>
    </Section>
  );
}
