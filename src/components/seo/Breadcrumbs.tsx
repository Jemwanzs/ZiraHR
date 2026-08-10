import { Link } from "@/i18n/navigation";
import { safeJsonLd } from "@/lib/seo";

export type Crumb = { label: string; href: string };

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zirahr.com";

/**
 * Visible breadcrumb trail + matching BreadcrumbList structured data — see
 * docs/05-seo/structured-data.md and docs/05-seo/internal-linking.md. The
 * two must always match exactly, so they're generated from one list here
 * rather than maintained separately.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", href: "/" }, ...items];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href === "/" ? "" : crumb.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-gray-500">
        {trail.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-1">
            {index > 0 && (
              <span aria-hidden="true" className="text-gray-300">
                /
              </span>
            )}
            {index === trail.length - 1 ? (
              <span className="font-medium text-gray-700">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-teal">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }}
      />
    </nav>
  );
}
