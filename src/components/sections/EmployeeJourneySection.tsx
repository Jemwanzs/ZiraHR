"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { PlaceholderIcon, type PlaceholderIconName } from "@/components/media/PlaceholderIcon";

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

type StageTone = "teal" | "orange" | "sky";
const STAGE_TONES: Record<(typeof STAGES)[number], StageTone> = {
  applicant: "teal",
  candidate: "orange",
  offer: "sky",
  employee: "teal",
  onboarding: "orange",
  attendanceLeave: "sky",
  payroll: "teal",
  learning: "orange",
  performance: "sky",
  promotion: "teal",
  offboarding: "orange",
};

const toneClasses: Record<StageTone, string> = {
  teal: "bg-teal text-overlay",
  orange: "bg-orange text-overlay",
  sky: "bg-sky text-overlay",
};

/**
 * "Meet Amina" — scope §5. Was a flat 4-column grid of eleven identical
 * dashed-border ScreenshotSlot placeholders, each repeating its own
 * "Preview" badge — the single most repetitive-looking section on the
 * homepage. Rebuilt as a single-thread vertical timeline: a drawn-in
 * connector line with small colored icon markers per beat, borrowing the
 * *sequential-story* technique from a competitor reference (a timestamped
 * notice -> edit -> commit walkthrough) without copying its content or
 * literal timestamps — Amina's stages are numbered beats, not fabricated
 * clock times. No placeholder screenshots here at all: this section was
 * never meant to preview real product UI (that's the hero reel and
 * Dashboards section's job) — it's a conceptual journey diagram, so
 * dropping the "coming soon" imagery entirely is more honest, not less.
 */
export function EmployeeJourneySection() {
  const t = useTranslations("employeeJourney");
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section tone="white">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionLabel index={1}>{t("eyebrow")}</SectionLabel>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("intro")}
        </h2>
        <p className="mt-3 text-gray-600">{t("supporting")}</p>
      </Reveal>

      <div className="relative mx-auto mt-16 max-w-2xl">
        {/* Static track — always visible, no motion, so the timeline never
            shows empty space if JS/animation is slow to kick in. */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-5 w-px -translate-x-1/2 bg-gray-200"
        />
        {/* Colored overlay that draws in on scroll — same "line fills in
            as you scroll past it" idea as ConnectedRecordSection's SVG
            path animation, done with a CSS scaleY here since this is a
            plain div, not SVG. */}
        <motion.div
          aria-hidden="true"
          className="absolute top-0 left-5 w-px origin-top -translate-x-1/2 bg-gradient-to-b from-teal via-orange to-sky"
          style={{ height: `${STAGES.length * 88}px` }}
          initial={shouldReduceMotion ? undefined : { scaleY: 0 }}
          whileInView={shouldReduceMotion ? undefined : { scaleY: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />

        <ol className="relative flex flex-col gap-8">
          {STAGES.map((stage, index) => (
            <motion.li
              key={stage}
              className="relative flex gap-5 pl-14"
              initial={shouldReduceMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (index % 6) * 0.06 }}
            >
              <span
                aria-hidden="true"
                className={`absolute top-0 left-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-sm ${toneClasses[STAGE_TONES[stage]]}`}
              >
                <PlaceholderIcon name={STAGE_ICONS[stage]} className="h-5 w-5" />
              </span>

              <div className="min-w-0 pt-1">
                <p className="text-xs font-semibold tracking-wide text-gray-400">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="text-base font-semibold text-gray-900">
                  {t(`stages.${stage}`)}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {t(`stageCaptions.${stage}`)}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
