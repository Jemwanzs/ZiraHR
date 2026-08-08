import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
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
 * No pricing tiers exist yet — the page is deliberately honest about
 * pricing being custom rather than inventing plan names/numbers (scope
 * "never fabricate", docs/00-source/build-brief.md Explicit Do-Nots).
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
    />
  );
}
