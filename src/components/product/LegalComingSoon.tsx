import { getTranslations } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";
import { Button } from "@/components/ui/Button";

/**
 * Shared shell for every legal page. No real legal copy exists yet, so
 * these are honest "coming soon" pages rather than fabricated Privacy/
 * Terms/Security/Cookie text — see docs/09-qa/launch-checklist.md and
 * docs/04-content/footer-copy.md. Also why these routes are deliberately
 * excluded from sitemap.ts.
 */
export async function LegalComingSoon({
  title,
  breadcrumb,
}: {
  title: string;
  breadcrumb: Crumb;
}) {
  const t = await getTranslations("pages.legal");

  return (
    <main className="flex flex-1 flex-col">
      <Section tone="cream" className="text-center">
        <Breadcrumbs items={[breadcrumb]} />
        <div className="mx-auto mt-8 flex max-w-md flex-col items-center gap-4">
          <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
          <p className="text-gray-600">{t("comingSoonBody")}</p>
          <Button href="/contact" showArrow className="mt-2">
            {t("contactCta")}
          </Button>
        </div>
      </Section>
    </main>
  );
}
