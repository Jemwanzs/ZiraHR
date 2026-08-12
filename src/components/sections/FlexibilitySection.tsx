import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import { Reveal } from "@/components/motion/Reveal";

/**
 * scope §17 — "configurable without becoming complicated." Animated
 * breadcrumb of configuration levels alongside a Settings UI placeholder.
 */
export function FlexibilitySection() {
  const t = useTranslations("flexibility");
  const steps = t.raw("steps") as string[];

  return (
    <Section tone="white">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold tracking-wide text-teal">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
            {t("headline")}
          </h2>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {steps.map((step, index) => (
              <span key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-gray-200 bg-cream px-3 py-1.5 text-sm font-medium text-gray-700">
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <span aria-hidden="true" className="text-gray-300">
                    →
                  </span>
                )}
              </span>
            ))}
          </div>

          <p className="mt-8 text-lg font-medium text-gray-900">
            {t("closingLine")}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <ScreenshotSlot
            slot="flexibility.settings"
            alt="SoftHR settings and configuration"
            label="Settings & Configuration"
            aspect="video"
            icon="settings"
          />
        </Reveal>
      </div>
    </Section>
  );
}
