import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { buildPageMetadata } from "@/lib/seo";

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
 * No real customer-facing HRMIS app exists to link out to yet (the
 * previous version linked to PayeKenya, an unrelated placeholder that
 * shouldn't be presented as SoftHR's login) — see
 * docs/06-technical/component-structure.md. Until a real app URL exists,
 * this page is honest about that instead of linking somewhere wrong:
 * organizations get access during onboarding, so the only real next step
 * from here is requesting a demo.
 */
export default async function LoginPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("pages.login");
  const tCta = await getTranslations("cta");
  const b = await getTranslations("breadcrumbs");

  return (
    <main className="flex flex-1 flex-col">
      <Section tone="cream" className="text-center">
        <Breadcrumbs items={[{ label: b("login"), href: "/login" }]} />
        <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4">
          <p className="text-sm font-semibold tracking-wide text-teal-deep">
            {t("eyebrow")}
          </p>
          <h1 className="text-3xl font-semibold text-gray-900">
            {t("headline")}
          </h1>
          <p className="text-gray-600">{t("supporting")}</p>
          <Button href="/request-demo" showArrow className="mt-2">
            {tCta("requestDemo")}
          </Button>
        </div>
      </Section>
    </main>
  );
}
