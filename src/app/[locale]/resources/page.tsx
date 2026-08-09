import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { buildPageMetadata } from "@/lib/seo";

const CATEGORIES = [
  "blog",
  "guides",
  "templates",
  "helpCentre",
  "productUpdates",
  "hrGlossary",
  "compliance",
] as const;

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.resources" });
  return buildPageMetadata({
    locale,
    route: "/resources",
    title: t("headline"),
    description: t("supporting"),
  });
}

/**
 * scope §32: "should not become an SEO article dumping ground." No real
 * articles exist yet, so this is an honest category index with a
 * "coming soon" state rather than fabricated content — see
 * docs/09-qa/launch-checklist.md.
 */
export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.resources");
  const b = await getTranslations("breadcrumbs");

  return (
    <main className="flex flex-1 flex-col">
      <Section tone="cream" className="pb-12">
        <Breadcrumbs items={[{ label: b("resources"), href: "/resources" }]} />
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-wide text-teal">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
            {t("headline")}
          </h1>
          <p className="mt-3 text-gray-600">{t("supporting")}</p>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((category) => (
            <div
              key={category}
              className="rounded-2xl border border-gray-200 bg-cream p-6"
            >
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-base font-semibold text-gray-900">
                  {t(`categories.${category}.label`)}
                </h2>
                <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-gray-500 uppercase">
                  {t("comingSoon")}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {t(`categories.${category}.description`)}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="cream" className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t("newsletterHeadline")}
        </h2>
        <div className="mt-6 flex justify-center">
          <NewsletterForm />
        </div>
      </Section>
    </main>
  );
}
