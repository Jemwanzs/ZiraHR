import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.leaveManagement" });
  return buildPageMetadata({
    locale,
    route: "/leave-management",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function LeaveManagementPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.leaveManagement");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[{ label: b("leaveManagement"), href: "/leave-management" }]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.leaveManagement.hero"
      flowSteps={t.raw("flowSteps")}
      capabilities={t.raw("capabilities")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("coreHr"), href: "/core-hr" },
        { label: b("attendanceManagement"), href: "/attendance-management" },
        { label: b("payroll"), href: "/payroll" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
