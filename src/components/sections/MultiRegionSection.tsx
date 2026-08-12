import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ROLE_KEYS = ["regionalManager", "branchManager", "executive"] as const;

/**
 * scope §21 — important for larger African organizations. Org tree +
 * role-based "what I see" callouts.
 */
export function MultiRegionSection() {
  const t = useTranslations("multiRegion");
  const levels = t.raw("levels") as string[];

  return (
    <Section tone="cream">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionLabel index={9}>{t("eyebrow")}</SectionLabel>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("headline")}
        </h2>
      </Reveal>

      <Reveal
        delay={0.05}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        {levels.map((level, index) => (
          <span key={level} className="flex items-center gap-3">
            <span className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700">
              {level}
            </span>
            {index < levels.length - 1 && (
              <span aria-hidden="true" className="text-gray-300">
                ↳
              </span>
            )}
          </span>
        ))}
      </Reveal>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {ROLE_KEYS.map((key) => (
          <Reveal key={key} delay={0.1}>
            <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
              <p className="text-sm text-gray-700">{t(`roleViews.${key}`)}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
