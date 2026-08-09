import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { DemoRequestForm } from "@/components/forms/DemoRequestForm";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "forms.demoRequest" });
  return buildPageMetadata({
    locale,
    route: "/request-demo",
    title: t("title"),
    description: t("subtitle"),
  });
}

export default async function RequestDemoPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("forms.demoRequest");

  return (
    <main className="flex flex-1 flex-col">
      <Section tone="cream" className="pb-16">
        <Breadcrumbs items={[{ label: t("title"), href: "/request-demo" }]} />
        <div className="mx-auto mt-8 max-w-lg text-center">
          <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 text-gray-600">{t("subtitle")}</p>
        </div>
        <div className="mx-auto mt-10 max-w-lg">
          <DemoRequestForm />
        </div>
      </Section>
    </main>
  );
}
