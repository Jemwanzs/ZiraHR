import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.hrSoftwareAfrica",
  });
  return buildPageMetadata({
    locale,
    route: "/hr-software-africa",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function HrSoftwareAfricaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.hrSoftwareAfrica");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[
        { label: b("hrSoftwareAfrica"), href: "/hr-software-africa" },
      ]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.hrSoftwareAfrica.hero"
      capabilities={t.raw("capabilities")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("coreHr"), href: "/core-hr" },
        { label: b("hrSoftwareKenya"), href: "/hr-software-kenya" },
        { label: b("payroll"), href: "/payroll" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
