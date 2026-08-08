import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import { Reveal } from "@/components/motion/Reveal";

const STAGES = [
  "applicant",
  "candidate",
  "offer",
  "employee",
  "onboarding",
  "attendanceLeave",
  "payroll",
  "learning",
  "performance",
  "promotion",
  "offboarding",
] as const;

/**
 * "Meet Amina" — scope §5. A scroll-driven story: each stage reveals as the
 * visitor scrolls past it. Deliberately not pinned/scroll-jacked (see
 * docs/02-ux/responsive-behaviour.md) to avoid the jank risk that would
 * undercut the "premium" feeling the motion language is built to create.
 */
export function EmployeeJourneySection() {
  const t = useTranslations("employeeJourney");

  return (
    <Section tone="white">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-wide text-teal">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("intro")}
        </h2>
        <p className="mt-3 text-gray-600">{t("supporting")}</p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((stage, index) => (
          <Reveal key={stage} delay={(index % 4) * 0.06}>
            <div className="flex flex-col gap-3">
              <ScreenshotSlot
                slot={`employeeJourney.stage.${stage}`}
                alt={t(`stages.${stage}`)}
                label={t(`stages.${stage}`)}
                aspect="square"
              />
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {index + 1}. {t(`stages.${stage}`)}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {t(`stageCaptions.${stage}`)}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
