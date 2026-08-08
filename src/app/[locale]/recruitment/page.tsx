import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.recruitment" });
  return buildPageMetadata({
    locale,
    route: "/recruitment",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function RecruitmentPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.recruitment");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[{ label: b("recruitment"), href: "/recruitment" }]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.recruitment.hero"
      flowSteps={t.raw("flowSteps")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("coreHr"), href: "/core-hr" },
        { label: b("performanceManagement"), href: "/performance-management" },
        { label: b("learningDevelopment"), href: "/learning-development" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
