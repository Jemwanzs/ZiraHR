import { defineRouting } from "next-intl/routing";

/**
 * English is the default locale and serves at the root ("/payroll"),
 * French and Swahili get explicit prefixes ("/fr/payroll", "/sw/payroll").
 * See docs/07-localization/localization-strategy.md.
 */
export const routing = defineRouting({
  locales: ["en", "fr", "sw"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
