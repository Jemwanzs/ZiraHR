import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactForm } from "@/components/forms/ContactForm";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return buildPageMetadata({
    locale,
    route: "/contact",
    title: t("headline"),
    description: t("supporting"),
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.contact");
  const b = await getTranslations("breadcrumbs");

  return (
    <main className="flex flex-1 flex-col">
      <Section tone="cream" className="pb-16">
        <Breadcrumbs items={[{ label: b("contact"), href: "/contact" }]} />
        <div className="mx-auto mt-8 max-w-lg text-center">
          <p className="text-sm font-semibold tracking-wide text-teal-deep">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
            {t("headline")}
          </h1>
          <p className="mt-3 text-gray-600">{t("supporting")}</p>
        </div>
        <div className="mx-auto mt-10 max-w-lg">
          <ContactForm />
        </div>
      </Section>
    </main>
  );
}
