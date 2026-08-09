import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { PricingCalculator } from "@/components/product/PricingCalculator";
import { Section } from "@/components/layout/Section";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.pricing" });
  return buildPageMetadata({
    locale,
    route: "/pricing",
    title: t("headline"),
    description: t("supporting"),
  });
}

/**
 * No real rate card exists yet — the module-by-module, per-employee
 * pricing *mechanism* shown here is real (per explicit client direction),
 * but every number in PricingCalculator is clearly labeled illustrative
 * rather than presented as an actual quote. See
 * docs/06-technical/pricing-calculator.md.
 */
export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.pricing");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[{ label: b("pricing"), href: "/pricing" }]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.pricing.hero"
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("coreHr"), href: "/core-hr" },
        { label: b("payroll"), href: "/payroll" },
        { label: b("employeeSelfService"), href: "/employee-self-service" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    >
      <Section tone="cream">
        <PricingCalculator />
      </Section>
    </ProductPageLayout>
  );
}
