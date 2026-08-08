import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.performanceManagement",
  });
  return buildPageMetadata({
    locale,
    route: "/performance-management",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function PerformanceManagementPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.performanceManagement");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[
        { label: b("performanceManagement"), href: "/performance-management" },
      ]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.performanceManagement.hero"
      capabilities={t.raw("capabilities")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("learningDevelopment"), href: "/learning-development" },
        { label: b("coreHr"), href: "/core-hr" },
        { label: b("recruitment"), href: "/recruitment" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
