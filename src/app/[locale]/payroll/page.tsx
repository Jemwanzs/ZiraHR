import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.payroll" });
  return buildPageMetadata({
    locale,
    route: "/payroll",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function PayrollPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.payroll");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[{ label: b("payroll"), href: "/payroll" }]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.payroll.hero"
      flowSteps={t.raw("flowSteps")}
      capabilities={t.raw("capabilities")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("coreHr"), href: "/core-hr" },
        { label: b("leaveManagement"), href: "/leave-management" },
        { label: b("attendanceManagement"), href: "/attendance-management" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
