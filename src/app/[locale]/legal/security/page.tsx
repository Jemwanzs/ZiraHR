import { getTranslations, setRequestLocale } from "next-intl/server";
import { LegalComingSoon } from "@/components/product/LegalComingSoon";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.legal" });
  return {
    ...buildPageMetadata({
      locale,
      route: "/legal/security",
      title: t("security.title"),
      description: t("comingSoonBody"),
    }),
    robots: { index: false, follow: true },
  };
}

export default async function SecurityLegalPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.legal.security");
  const b = await getTranslations("breadcrumbs");

  return (
    <LegalComingSoon
      title={t("title")}
      breadcrumb={{ label: b("security"), href: "/legal/security" }}
    />
  );
}
