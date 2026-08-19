const STARTED_KEY = "softhr-journey-started-at";
const SUBMITTED_KEY = "softhr-journey-submitted-at";
const JOURNEY_EVENT = "softhr-journey-change";

/**
 * Tracks a visitor's personal "14 working day go-live journey" — started
 * the moment they click Book a Demo (see PromoBanner), independent of
 * whether they actually finish the form. localStorage (not sessionStorage)
 * because this must survive closing the tab and returning later; same
 * useSyncExternalStore shape as cookieConsent.ts, including the native
 * "storage" event for cross-tab sync (a same-tab write dispatches
 * JOURNEY_EVENT itself, since "storage" only fires in *other* tabs).
 */
export function subscribeToJourneyChange(callback: () => void) {
  window.addEventListener(JOURNEY_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(JOURNEY_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getJourneyStartedAtSnapshot(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(STARTED_KEY) ?? "";
}

export function getJourneySubmittedAtSnapshot(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(SUBMITTED_KEY) ?? "";
}

export function getServerJourneySnapshot(): string {
  return "";
}

/** Idempotent — a visitor only ever has one journey start. Returns the
 * (possibly pre-existing) ISO timestamp. */
export function startJourney(): string {
  if (typeof window === "undefined") return "";
  const existing = window.localStorage.getItem(STARTED_KEY);
  if (existing) return existing;
  const now = new Date().toISOString();
  window.localStorage.setItem(STARTED_KEY, now);
  window.dispatchEvent(new Event(JOURNEY_EVENT));
  return now;
}

export function markJourneySubmitted(): string {
  if (typeof window === "undefined") return "";
  const now = new Date().toISOString();
  window.localStorage.setItem(SUBMITTED_KEY, now);
  window.dispatchEvent(new Event(JOURNEY_EVENT));
  return now;
}
