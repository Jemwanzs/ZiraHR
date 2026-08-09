"use client";

import { useTranslations } from "next-intl";
import { openCookiePreferences } from "@/lib/cookieConsent";

export function CookiePreferencesLink() {
  const t = useTranslations("cookieConsent");

  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="text-sm text-gray-500 hover:text-teal"
    >
      {t("manageLink")}
    </button>
  );
}
