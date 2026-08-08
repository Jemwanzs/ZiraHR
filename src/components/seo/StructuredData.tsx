const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zirahr.com";

/**
 * Sitewide Organization JSON-LD, rendered once from the root layout — see
 * docs/05-seo/structured-data.md. Only fields we can back with real data
 * are included: no logo/sameAs until real brand assets and verified social
 * profiles exist (docs/08-assets/asset-requirements.md).
 */
export function OrganizationStructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ZiraHR",
    url: SITE_URL,
    description:
      "ZiraHR is a cloud HRMIS covering the full employee lifecycle — recruitment, onboarding, payroll, leave, attendance, performance, learning and offboarding — for organizations in Kenya and across Africa.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
