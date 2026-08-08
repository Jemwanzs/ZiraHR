import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.hrmisKenya" });
  return buildPageMetadata({
    locale,
    route: "/hrmis-kenya",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function HrmisKenyaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.hrmisKenya");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[{ label: b("hrmisKenya"), href: "/hrmis-kenya" }]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.hrmisKenya.hero"
      capabilities={t.raw("capabilities")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("coreHr"), href: "/core-hr" },
        { label: b("payroll"), href: "/payroll" },
        { label: b("hrSoftwareKenya"), href: "/hr-software-kenya" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
