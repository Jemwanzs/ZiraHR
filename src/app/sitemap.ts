import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zirahr.com";

/**
 * Only pages that actually exist and are ready to be indexed belong here —
 * see docs/05-seo/metadata-plan.md ("no thin/duplicate pages", "noindex
 * pages excluded"). Append to this list as each phase ships real pages;
 * don't pre-list routes that 404.
 */
const IMPLEMENTED_ROUTES = [
  "",
  "/core-hr",
  "/payroll",
  "/leave-management",
  "/attendance-management",
  "/performance-management",
  "/recruitment",
  "/learning-development",
  "/teams-collaboration",
  "/employee-self-service",
  "/analytics",
  "/ask-tija",
  "/hr-software-kenya",
  "/payroll-software-kenya",
  "/hrmis-kenya",
  "/hr-software-africa",
  "/pricing",
] as const;

function localizedPath(route: string, locale: string) {
  const isDefault = locale === routing.defaultLocale;
  const prefix = isDefault ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${route}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return IMPLEMENTED_ROUTES.map((route) => ({
    url: localizedPath(route, routing.defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, localizedPath(route, locale)]),
      ),
    },
  }));
}
