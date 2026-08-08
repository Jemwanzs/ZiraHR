import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.learningDevelopment",
  });
  return buildPageMetadata({
    locale,
    route: "/learning-development",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function LearningDevelopmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.learningDevelopment");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[
        { label: b("learningDevelopment"), href: "/learning-development" },
      ]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.learningDevelopment.hero"
      flowSteps={t.raw("flowSteps")}
      capabilities={t.raw("capabilities")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("performanceManagement"), href: "/performance-management" },
        { label: b("recruitment"), href: "/recruitment" },
        { label: b("coreHr"), href: "/core-hr" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
