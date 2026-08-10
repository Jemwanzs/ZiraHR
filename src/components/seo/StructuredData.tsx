import { safeJsonLd } from "@/lib/seo";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zirahr.com";

/**
 * Sitewide Organization JSON-LD, rendered once from the root layout — see
 * docs/05-seo/structured-data.md. `logo` now points at the real ZHR mark
 * (public/brand/zhr-mark.svg); `sameAs` still omitted until verified social
 * profiles exist (docs/08-assets/asset-requirements.md).
 */
export function OrganizationStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZiraHR",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/zhr-mark.svg`,
    description:
      "ZiraHR is a cloud HRMIS covering the full employee lifecycle — recruitment, onboarding, payroll, leave, attendance, performance, learning and offboarding — for organizations in Kenya and across Africa.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
