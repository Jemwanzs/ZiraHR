import { getLocale, getTranslations } from "next-intl/server";
import { safeJsonLd } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://softhr.vercel.app";

/**
 * Sitewide Organization JSON-LD, rendered once from the root layout — see
 * docs/05-seo/structured-data.md. `logo` now points at the real SHR mark
 * (public/brand/shr-mark.svg); `sameAs` still omitted until verified social
 * profiles exist (docs/08-assets/asset-requirements.md).
 */
export function OrganizationStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SoftHR",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/shr-mark.svg`,
    description:
      "SoftHR is a cloud HRMIS covering the full employee lifecycle — recruitment, onboarding, payroll, leave, attendance, performance, learning and offboarding — for organizations in Kenya and across Africa.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}

/**
 * SoftwareApplication JSON-LD — planned in docs/05-seo/structured-data.md
 * but never actually wired up until this pass. Rendered on the homepage
 * and every product-module page (via ProductPageLayout). `featureList`
 * reuses the same nav.megaMenu group labels shown in the real navigation
 * (docs/01-product/product-modules.md is the ceiling on what's claimed) —
 * never a hand-typed list that could drift from what the site actually
 * says. No `offers`/pricing property: the pricing page is explicitly
 * illustrative-only, and structured data must describe exactly what's
 * rendered, not something flagged as an example.
 */
export async function SoftwareApplicationStructuredData() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "nav.megaMenu" });
  const tHero = await getTranslations({ locale, namespace: "hero" });

  const featureList = [
    t("coreHr.groupLabel"),
    t("workforce.groupLabel"),
    t("payroll.groupLabel"),
    t("talent.groupLabel"),
    t("workplace.groupLabel"),
    t("intelligence.groupLabel"),
  ];

  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SoftHR",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: tHero("supporting"),
    featureList,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
