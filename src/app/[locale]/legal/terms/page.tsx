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
      route: "/legal/terms",
      title: t("terms.title"),
      description: t("comingSoonBody"),
    }),
    robots: { index: false, follow: true },
  };
}

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.legal.terms");
  const b = await getTranslations("breadcrumbs");

  return (
    <LegalComingSoon
      title={t("title")}
      breadcrumb={{ label: b("terms"), href: "/legal/terms" }}
    />
  );
}
