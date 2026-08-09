import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zirahr.com";

function pathForLocale(route: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}${route}`;
}

/**
 * Builds the canonical/hreflang/OG/Twitter metadata block every page needs
 * — see docs/05-seo/metadata-plan.md. `route` is locale-agnostic (e.g.
 * "/payroll"); this fills in canonical + alternates for every locale.
 */
export function buildPageMetadata({
  locale,
  route,
  title,
  description,
}: {
  locale: string;
  route: string;
  title: string;
  description: string;
}): Metadata {
  const path = pathForLocale(route, locale);

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, pathForLocale(route, l)]),
        ),
        // x-default points search engines at the English version for
        // visitors whose language doesn't match any of our locales — see
        // docs/05-seo/metadata-plan.md.
        "x-default": pathForLocale(route, routing.defaultLocale),
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "ZiraHR",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export { SITE_URL };
