import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.coreHr" });
  return buildPageMetadata({
    locale,
    route: "/core-hr",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function CoreHrPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.coreHr");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[{ label: b("coreHr"), href: "/core-hr" }]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.coreHr.hero"
      capabilities={t.raw("capabilities")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("payroll"), href: "/payroll" },
        { label: b("leaveManagement"), href: "/leave-management" },
        { label: b("employeeSelfService"), href: "/employee-self-service" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
