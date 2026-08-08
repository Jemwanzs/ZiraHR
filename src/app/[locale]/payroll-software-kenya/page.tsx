import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.payrollSoftwareKenya",
  });
  return buildPageMetadata({
    locale,
    route: "/payroll-software-kenya",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function PayrollSoftwareKenyaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.payrollSoftwareKenya");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[
        { label: b("payrollSoftwareKenya"), href: "/payroll-software-kenya" },
      ]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.payrollSoftwareKenya.hero"
      flowSteps={t.raw("flowSteps")}
      capabilities={t.raw("capabilities")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("payroll"), href: "/payroll" },
        { label: b("coreHr"), href: "/core-hr" },
        { label: b("attendanceManagement"), href: "/attendance-management" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
