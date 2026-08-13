import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.company" });
  return buildPageMetadata({
    locale,
    route: "/company",
    title: t("headline"),
    description: t("mission"),
  });
}

export default async function CompanyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.company");
  const b = await getTranslations("breadcrumbs");

  return (
    <main className="flex flex-1 flex-col">
      <Section tone="cream" className="pb-12">
        <Breadcrumbs items={[{ label: b("company"), href: "/company" }]} />
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-teal-deep">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
            {t("headline")}
          </h1>
          <p className="mt-3 text-gray-600">{t("mission")}</p>
        </div>
      </Section>

      <Section tone="white">
        <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-cream p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {t("careersTitle")}
            </h2>
            <p className="mt-2 text-sm text-gray-600">{t("careersBody")}</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-cream p-6">
            <h2 className="text-lg font-semibold text-gray-900">
              {t("partnersTitle")}
            </h2>
            <p className="mt-2 text-sm text-gray-600">{t("partnersBody")}</p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Button href="/contact" showArrow>
            {t("contactCta")}
          </Button>
        </div>
      </Section>
    </main>
  );
}
