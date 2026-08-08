import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

/**
 * scope §22 — real product capabilities only, no unverified "bank-level
 * security" style claims.
 */
export function SecuritySection() {
  const t = useTranslations("security");
  const capabilities = t.raw("capabilities") as string[];

  return (
    <Section tone="white">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-wide text-teal">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("headline")}
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <Reveal key={capability} delay={(index % 3) * 0.05}>
            <div className="rounded-xl border border-gray-200 bg-cream px-4 py-4 text-center text-sm font-medium text-gray-800">
              {capability}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
