import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.askTija" });
  return buildPageMetadata({
    locale,
    route: "/ask-tija",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function AskTijaPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.askTija");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[{ label: b("askTija"), href: "/ask-tija" }]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.askTija.hero"
      capabilities={t.raw("capabilities")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("analytics"), href: "/analytics" },
        { label: b("payroll"), href: "/payroll" },
        { label: b("coreHr"), href: "/core-hr" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
