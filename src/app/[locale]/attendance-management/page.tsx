import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.attendanceManagement",
  });
  return buildPageMetadata({
    locale,
    route: "/attendance-management",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function AttendanceManagementPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.attendanceManagement");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[
        { label: b("attendanceManagement"), href: "/attendance-management" },
      ]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.attendanceManagement.hero"
      capabilities={t.raw("capabilities")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("leaveManagement"), href: "/leave-management" },
        { label: b("payroll"), href: "/payroll" },
        { label: b("coreHr"), href: "/core-hr" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
