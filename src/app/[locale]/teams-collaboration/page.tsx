import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductPageLayout } from "@/components/product/ProductPageLayout";
import { TeamsCollaborationMockup } from "@/components/sections/TeamsCollaborationMockup";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: "pages.teamsCollaboration",
  });
  return buildPageMetadata({
    locale,
    route: "/teams-collaboration",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function TeamsCollaborationPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.teamsCollaboration");
  const b = await getTranslations("breadcrumbs");

  return (
    <ProductPageLayout
      breadcrumbs={[
        { label: b("teamsCollaboration"), href: "/teams-collaboration" },
      ]}
      eyebrow={t("eyebrow")}
      headline={t("headline")}
      supporting={t("supporting")}
      heroSlot="pages.teamsCollaboration.hero"
      heroVisual={<TeamsCollaborationMockup />}
      capabilities={t.raw("capabilities")}
      connectsToHeadline={t("connectsToHeadline")}
      connectsTo={[
        { label: b("coreHr"), href: "/core-hr" },
        { label: b("employeeSelfService"), href: "/employee-self-service" },
        { label: b("analytics"), href: "/analytics" },
      ]}
      ctaHeadline={t("ctaHeadline")}
    />
  );
}
