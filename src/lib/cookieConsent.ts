export type CookieCategory = "statistics" | "marketing" | "preferences";

export type CookieConsentState = {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
  preferences: boolean;
};

const STORAGE_KEY = "zirahr-cookie-consent";
const CONSENT_EVENT = "zirahr-cookie-consent-change";

export const DEFAULT_CONSENT: CookieConsentState = {
  necessary: true,
  statistics: false,
  marketing: false,
  preferences: false,
};

const ALL_ALLOWED: CookieConsentState = {
  necessary: true,
  statistics: true,
  marketing: true,
  preferences: true,
};

/**
 * Minimal client-only consent store — see docs/06-technical/cookie-consent.md.
 * No server round-trip, no cookie of its own (deliberately simple:
 * localStorage is enough for gating client-side scripts, which is the only
 * thing that currently needs to check this — no analytics/marketing
 * provider is wired up yet, but this is the plumbing they'll check against
 * when one is).
 */
export function readConsent(): CookieConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return null;
    return { ...DEFAULT_CONSENT, ...parsed, necessary: true };
  } catch {
    return null;
  }
}

export function writeConsent(consent: CookieConsentState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
}

export function allowAllConsent(): CookieConsentState {
  return { ...ALL_ALLOWED };
}

export function subscribeToConsentChange(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Stable snapshot for useSyncExternalStore — true/false, never an object,
 * so it doesn't produce a new reference (and a spurious re-render) on every
 * call the way `readConsent()` would. */
export function hasStoredConsent(): boolean {
  return readConsent() !== null;
}

export function getServerConsentSnapshot(): boolean {
  // SSR/first-paint has no access to localStorage — assume "not yet
  // consented" so the server-rendered HTML matches the client's very first
  // render pass; useSyncExternalStore then safely resyncs to the real
  // value immediately after hydration. See docs/06-technical/cookie-consent.md.
  return false;
}

export const OPEN_PREFERENCES_EVENT = "zirahr-cookie-consent-open";

export function openCookiePreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}
