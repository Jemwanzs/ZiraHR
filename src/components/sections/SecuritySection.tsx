import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

type Capability = { label: string; description: string };

/**
 * scope §22 — real product capabilities only, no unverified "bank-level
 * security" style claims. Expanded per explicit client direction to cover
 * geo-restricted login, working-hours login validation, approval-gated
 * special access, encrypted/passcode report downloads, direct-to-email
 * delivery, and roles/rights drill-down — see docs/01-product/product-modules.md.
 */
export function SecuritySection() {
  const t = useTranslations("security");
  const capabilities = t.raw("capabilities") as Capability[];

  return (
    <Section tone="white">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionLabel index={10}>{t("eyebrow")}</SectionLabel>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("headline")}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability, index) => (
          <Reveal key={capability.label} delay={(index % 3) * 0.05}>
            <div className="h-full rounded-xl border border-gray-200 bg-cream px-5 py-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md">
              <p className="text-sm font-semibold text-gray-900">
                {capability.label}
              </p>
              <p className="mt-1.5 text-sm text-gray-600">
                {capability.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
