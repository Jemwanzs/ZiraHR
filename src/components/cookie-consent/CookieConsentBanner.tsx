"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  OPEN_PREFERENCES_EVENT,
  getServerConsentSnapshot,
  hasStoredConsent,
  subscribeToConsentChange,
} from "@/lib/cookieConsent";
import { CookieConsentModal } from "@/components/cookie-consent/CookieConsentModal";

/**
 * Decides *whether* the modal should render — see
 * docs/06-technical/cookie-consent.md. Split from the modal itself so the
 * modal (which needs localStorage-derived initial state) only ever mounts
 * client-side, after hydration, avoiding any SSR/client mismatch.
 *
 * hasStoredConsent() is read via useSyncExternalStore rather than in a
 * mount effect + setState — checking localStorage on mount is exactly the
 * "external system" case that hook exists for, and doing it via a plain
 * effect would either mismatch the server-rendered HTML (if read
 * synchronously during render) or double-render on every mount (if set via
 * useState in an effect).
 */
export function CookieConsentBanner() {
  const hasConsent = useSyncExternalStore(
    subscribeToConsentChange,
    hasStoredConsent,
    getServerConsentSnapshot,
  );
  const [manuallyOpened, setManuallyOpened] = useState(false);

  useEffect(() => {
    function handleOpenPreferences() {
      setManuallyOpened(true);
    }
    window.addEventListener(OPEN_PREFERENCES_EVENT, handleOpenPreferences);
    return () =>
      window.removeEventListener(OPEN_PREFERENCES_EVENT, handleOpenPreferences);
  }, []);

  const visible = !hasConsent || manuallyOpened;
  if (!visible) return null;

  return (
    <CookieConsentModal
      dismissible={hasConsent}
      onClose={() => setManuallyOpened(false)}
    />
  );
}
