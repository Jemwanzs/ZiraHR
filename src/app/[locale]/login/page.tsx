import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { buildPageMetadata } from "@/lib/seo";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.zirahr.com";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.login" });
  return buildPageMetadata({
    locale,
    route: "/login",
    title: t("headline"),
    description: t("supporting"),
  });
}

/**
 * Thin page linking out to the real HRMIS app login — auth lives in the
 * main product, not this marketing site (docs/06-technical/component-structure.md).
 */
export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.login");
  const b = await getTranslations("breadcrumbs");

  return (
    <main className="flex flex-1 flex-col">
      <Section tone="cream" className="text-center">
        <Breadcrumbs items={[{ label: b("login"), href: "/login" }]} />
        <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4">
          <p className="text-sm font-semibold tracking-wide text-teal">
            {t("eyebrow")}
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">
            {t("headline")}
          </h1>
          <p className="text-gray-600">{t("supporting")}</p>
          <Button href={APP_URL} external showArrow className="mt-2">
            {t("continue")}
          </Button>
        </div>
      </Section>
    </main>
  );
}
