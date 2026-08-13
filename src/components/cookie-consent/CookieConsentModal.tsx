"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Toggle } from "@/components/ui/Toggle";
import { useFocusTrap } from "@/lib/useFocusTrap";
import {
  DEFAULT_CONSENT,
  allowAllConsent,
  readConsent,
  writeConsent,
  type CookieCategory,
  type CookieConsentState,
} from "@/lib/cookieConsent";

const TOGGLE_CATEGORIES: CookieCategory[] = ["statistics", "marketing", "preferences"];

type CookieConsentModalProps = {
  /** True once consent has already been recorded once (a voluntary
   * "review preferences" open, not the mandatory first-visit gate) —
   * only then can backdrop-click/Esc close it without a choice. */
  dismissible: boolean;
  onClose: () => void;
};

/**
 * The actual dialog UI — see docs/06-technical/cookie-consent.md.
 * CookieConsentBanner's `visible` gate is `true` on the server for every
 * visitor (getServerConsentSnapshot always reports "no consent yet"), so
 * this component *is* part of the initial SSR HTML whenever dismissible is
 * false (the mandatory first-visit gate) — reading localStorage in that
 * case would mismatch the server render for a returning visitor who
 * already has stored consent. dismissible only ever becomes true after
 * hasConsent has resolved to true post-hydration (see CookieConsentBanner),
 * so a dismissible=true mount is always a fresh, purely client-triggered
 * "review my preferences" reopen — never part of SSR — and can safely read
 * the real stored value.
 */
export function CookieConsentModal({ dismissible, onClose }: CookieConsentModalProps) {
  const t = useTranslations("cookieConsent");
  const [selection, setSelection] = useState<CookieConsentState>(
    () => (dismissible ? (readConsent() ?? DEFAULT_CONSENT) : DEFAULT_CONSENT),
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useFocusTrap(containerRef, true, dismissible ? onClose : undefined);

  function toggleCategory(category: CookieCategory) {
    setSelection((prev) => ({ ...prev, [category]: !prev[category] }));
  }

  function handleAllowSelection() {
    writeConsent(selection);
    onClose();
  }

  function handleAllowAll() {
    writeConsent(allowAllConsent());
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-gray-900/50 p-4"
      role="presentation"
      onClick={(event) => {
        if (dismissible && event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-consent-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-center gap-2">
          <span aria-hidden="true" className="text-xl">
            🔒
          </span>
          <h2 id="cookie-consent-title" className="text-xl font-semibold text-gray-900">
            {t("title")}
          </h2>
        </div>
        <p className="mt-3 text-sm text-gray-600">{t("intro")}</p>

        <div className="mt-6 flex flex-col divide-y divide-gray-100">
          <div className="flex items-start justify-between gap-4 py-4 first:pt-0">
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {t("categories.necessary.label")}
              </p>
              <p className="mt-1 text-sm text-gray-600">
                {t("categories.necessary.description")}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1">
              <Toggle checked disabled label={t("categories.necessary.label")} />
              <span className="text-[11px] text-gray-400">{t("alwaysOn")}</span>
            </div>
          </div>

          {TOGGLE_CATEGORIES.map((category) => (
            <div key={category} className="flex items-start justify-between gap-4 py-4">
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {t(`categories.${category}.label`)}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {t(`categories.${category}.description`)}
                </p>
              </div>
              <Toggle
                checked={selection[category]}
                onChange={() => toggleCategory(category)}
                label={t(`categories.${category}.label`)}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleAllowSelection}
            className="flex-1 rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 transition-colors hover:border-gray-400 hover:bg-gray-50"
          >
            {t("allowSelection")}
          </button>
          <button
            type="button"
            onClick={handleAllowAll}
            className="flex-1 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-overlay transition-colors hover:bg-teal/90"
          >
            {t("allowAll")}
          </button>
        </div>
      </div>
    </div>
  );
}
