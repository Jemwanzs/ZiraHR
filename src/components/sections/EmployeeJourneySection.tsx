import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import type { PlaceholderIconName } from "@/components/media/PlaceholderIcon";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

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

const STAGE_ICONS: Record<(typeof STAGES)[number], PlaceholderIconName> = {
  applicant: "application",
  candidate: "review",
  offer: "offer",
  employee: "directory",
  onboarding: "onboarding",
  attendanceLeave: "attendance",
  payroll: "payslip",
  learning: "learning",
  performance: "performance",
  promotion: "promotion",
  offboarding: "offboarding",
};

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
        <SectionLabel index={1}>{t("eyebrow")}</SectionLabel>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("intro")}
        </h2>
        <p className="mt-3 text-gray-600">{t("supporting")}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STAGES.map((stage, index) => (
          <Reveal key={stage} delay={(index % 4) * 0.06}>
            {/* Bordered card, not just a gap, so each stage reads as one
                unambiguous unit — a bare flex gap made it easy to misread
                which caption belonged to which image once stacked in a
                single column on mobile. */}
            <div className="flex h-full flex-col gap-3 rounded-2xl border border-gray-100 bg-cream/40 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-200 hover:shadow-sm">
              <ScreenshotSlot
                slot={`employeeJourney.stage.${stage}`}
                alt={t(`stages.${stage}`)}
                label={t(`stages.${stage}`)}
                aspect="square"
                icon={STAGE_ICONS[stage]}
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
