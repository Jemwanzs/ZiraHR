import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.employeeSelfService",
  });
  return buildPageMetadata({
    locale,
    route: "/employee-self-service",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function EmployeeSelfServicePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.employeeSelfService");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[
        { label: b("employeeSelfService"), href: "/employee-self-service" },
      ]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.employeeSelfService.hero"
      capabilities={t.raw("capabilities")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("coreHr"), href: "/core-hr" },
        { label: b("leaveManagement"), href: "/leave-management" },
        { label: b("payroll"), href: "/payroll" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
