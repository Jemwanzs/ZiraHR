"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import {
  getJourneyStartedAtSnapshot,
  getJourneySubmittedAtSnapshot,
  getServerJourneySnapshot,
  startJourney,
  subscribeToJourneyChange,
} from "@/lib/journeyTracking";
import { addWorkingDays, computeCountdown } from "@/lib/workingDays";

const STORAGE_KEY = "softhr-promo-banner-collapsed";
const CHANGE_EVENT = "softhr-promo-banner-change";
const GO_LIVE_WORKING_DAYS = 14;

// Same useSyncExternalStore shape as cookieConsent.ts — sessionStorage reads
// aren't safe during SSR, and flipping state via a mount effect would either
// mismatch the server-rendered HTML or need an extra render pass. The
// server snapshot always reports "collapsed", so a first-time visitor's
// banner opening after hydration reads as the entrance animation, not a
// layout jump. Writes go through setCollapsedStored, which fires this
// event since same-tab sessionStorage writes don't trigger the native
// "storage" event the way cross-tab writes do.
function subscribeToCollapseChange(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}
function getCollapsedSnapshot() {
  return window.sessionStorage.getItem(STORAGE_KEY) === "1";
}
function getServerCollapsedSnapshot() {
  return true;
}
function setCollapsedStored(value: boolean) {
  window.sessionStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/**
 * Dismissible floating promo banner for the homepage — "your 14-working-day
 * go-live journey" pitch, adapted (own brand tokens/copy/layout) from a
 * reference banner pattern the client sent over.
 *
 * The countdown is intent-triggered, not automatic: it stays static at
 * 14:00:00:00 until the visitor clicks "Start Count-Down", at which point
 * that click *is* the start of their personal journey (see
 * src/lib/journeyTracking.ts) — recorded in localStorage immediately, and
 * the countdown starts ticking down live in place. This click deliberately
 * does *not* open the demo form; it's a lighter-weight commitment than
 * booking. The CTA that follows it, "Book Now", is the actual conversion
 * action to /request-demo. Submitting that form marks the journey
 * submitted and re-sends the start timestamp with it (so the lead record
 * isn't dependent only on their browser). The target itself is
 * working-day-adjusted (src/lib/workingDays.ts, which skips weekends and
 * known Kenyan public holidays) — a real per-visitor clock is appropriate
 * here specifically because it now represents a commitment they made, not
 * manufactured urgency for an anonymous visitor.
 *
 * sessionStorage (separate from the journey's own localStorage) governs
 * only whether the banner card itself is open or collapsed-to-a-tab — a
 * per-session promotional nudge, so it resurfaces on a visitor's next visit
 * even though their journey progress persists.
 */
export function PromoBanner() {
  const t = useTranslations("promoBanner");
  const locale = useLocale();
  const collapsed = useSyncExternalStore(
    subscribeToCollapseChange,
    getCollapsedSnapshot,
    getServerCollapsedSnapshot,
  );
  const startedAt = useSyncExternalStore(
    subscribeToJourneyChange,
    getJourneyStartedAtSnapshot,
    getServerJourneySnapshot,
  );
  const submittedAt = useSyncExternalStore(
    subscribeToJourneyChange,
    getJourneySubmittedAtSnapshot,
    getServerJourneySnapshot,
  );
  const [journeyOpen, setJourneyOpen] = useState(false);
  const [, setTick] = useState(0);

  const targetDate = startedAt ? addWorkingDays(new Date(startedAt), GO_LIVE_WORKING_DAYS) : null;
  const targetTime = targetDate?.getTime();

  // Re-render every second while a personal countdown is running (and the
  // card is actually visible), so the displayed seconds genuinely read —
  // computeCountdown itself is a pure function of "now", this timer just
  // forces the next render to call it again. Not started, or collapsed to
  // the side tab where none of this is visible -> no timer running.
  useEffect(() => {
    if (!targetTime || collapsed) return;
    const id = setInterval(() => setTick((value) => value + 1), 1000);
    return () => clearInterval(id);
  }, [targetTime, collapsed]);

  function handleClose() {
    setCollapsedStored(true);
  }

  function handleExpand() {
    setCollapsedStored(false);
  }

  // "Start Count-Down" — deliberately doesn't open the demo form. This is
  // the lightweight commitment: it starts the visitor's personal countdown
  // in place. Booking the actual demo is a separate, later action (the
  // "Book Now" CTA below, once started).
  function handleStartCountdown() {
    startJourney();
  }

  const stages: string[] = t.raw("stages");
  const detailedStages: string[] = t.raw("detailedStages");
  const moduleStrip: string[] = t.raw("moduleStrip");

  const started = Boolean(startedAt);
  const submitted = Boolean(submittedAt);
  const countdown = targetDate
    ? computeCountdown(targetDate)
    : { days: Number(t("countdownDays")), hours: 0, minutes: 0, seconds: 0, overdue: false };

  const dateFormatter = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" });
  const startedCaption =
    started && startedAt && targetDate
      ? t("startedCaption", {
          date: dateFormatter.format(new Date(startedAt)),
          target: dateFormatter.format(targetDate),
        })
      : null;

  const caption = submitted
    ? t("submittedCaption")
    : started
      ? startedCaption
      : t("notStartedCaption");

  const headline = submitted ? (
    t("submittedHeadline")
  ) : started ? (
    t("startedHeadline")
  ) : (
    <>
      <span className="text-orange-deep">{t("headlineHighlight")}</span> {t("headlineRest")}
    </>
  );

  return (
    <>
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            key="promo-banner"
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 140, scale: 0.96 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-1/2 z-30 -translate-y-1/2 sm:inset-x-6 lg:top-24 lg:left-1/2 lg:right-auto lg:w-[min(1180px,94vw)] lg:translate-y-0 lg:-translate-x-1/2"
          >
            {/* Small and centered on narrow screens (a dialog-like card,
                not the full-height top-anchored panel it is from lg up) —
                max-h keeps it clear of the viewport edges either way. */}
            <div className="relative max-h-[80vh] overflow-y-auto rounded-3xl border border-gray-200 bg-white shadow-2xl lg:max-h-[calc(100vh-6rem)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
              >
                <div
                  className="absolute -top-16 -left-16 h-56 w-56 rounded-full opacity-[0.12] blur-3xl"
                  style={{ background: "var(--color-teal)" }}
                />
                <div
                  className="absolute -right-10 -bottom-20 h-64 w-64 rounded-full opacity-[0.14] blur-3xl"
                  style={{ background: "var(--color-orange)" }}
                />
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label={t("closeAria")}
                className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
              >
                <CloseIcon className="h-4 w-4" />
              </button>

              <div className="relative grid gap-5 p-4 sm:gap-8 sm:p-8 lg:grid-cols-[42%_58%] lg:p-10">
                <div className="flex flex-col justify-center gap-3 sm:gap-4">
                  <p className="text-xs font-semibold tracking-wide text-teal-deep">
                    {t("eyebrow")}
                  </p>
                  <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                    {headline}
                  </h2>
                  <p className="max-w-md text-sm text-gray-600 sm:text-base">
                    {t("supporting")}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    {submitted ? (
                      <span className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-5 py-3 text-sm font-semibold text-teal-deep">
                        <CheckIcon className="h-4 w-4" />
                        {t("submittedBadge")}
                      </span>
                    ) : started ? (
                      <Button href="/request-demo" showArrow>
                        {t("ctaBookNow")}
                      </Button>
                    ) : (
                      <Button type="button" onClick={handleStartCountdown}>
                        {t("primaryCta")}
                      </Button>
                    )}
                    <Button variant="ghost" onClick={handleClose}>
                      {t("secondaryCta")}
                    </Button>
                  </div>
                  <p className="mt-1 text-xs font-medium text-gray-400">{t("trust")}</p>
                </div>

                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="relative overflow-hidden rounded-2xl bg-teal p-4 text-overlay shadow-lg sm:p-6">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute top-3 right-3 hidden gap-2 xl:flex"
                    >
                      <div className="h-16 w-24 -rotate-3 overflow-hidden rounded-lg border border-overlay/20 shadow-lg">
                        <Image
                          src="/screenshots/module-showcase-payroll.png"
                          alt=""
                          width={192}
                          height={128}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div className="mt-4 h-16 w-24 rotate-3 overflow-hidden rounded-lg border border-overlay/20 shadow-lg">
                        <Image
                          src="/screenshots/module-showcase-core-hr.png"
                          alt=""
                          width={192}
                          height={128}
                          className="h-full w-full object-cover object-top"
                        />
                      </div>
                    </div>

                    <p className="text-xs font-semibold tracking-wide text-overlay/70">
                      {t("countdownLabel")}
                    </p>
                    {caption && (
                      <p className="mt-1 max-w-[85%] text-xs text-overlay/80">{caption}</p>
                    )}
                    <div className="mt-3 flex items-end gap-2 sm:gap-3 lg:gap-4">
                      <div className="flex flex-col items-center">
                        <motion.span
                          key={started ? "live" : "static"}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.15, duration: 0.4 }}
                          className="text-2xl font-bold tabular-nums sm:text-4xl lg:text-5xl"
                        >
                          {countdown.days}
                        </motion.span>
                        <span className="mt-1 text-[10px] font-semibold tracking-wide text-overlay/70">
                          {t("countdownUnitDays")}
                        </span>
                      </div>
                      <span className="pb-1.5 text-base font-bold text-overlay/30 sm:pb-3 sm:text-2xl lg:pb-4 lg:text-3xl">
                        :
                      </span>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold tabular-nums sm:text-4xl lg:text-5xl">
                          {String(countdown.hours).padStart(2, "0")}
                        </span>
                        <span className="mt-1 text-[10px] font-semibold tracking-wide text-overlay/70">
                          {t("countdownUnitHours")}
                        </span>
                      </div>
                      <span className="pb-1.5 text-base font-bold text-overlay/30 sm:pb-3 sm:text-2xl lg:pb-4 lg:text-3xl">
                        :
                      </span>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold tabular-nums sm:text-4xl lg:text-5xl">
                          {String(countdown.minutes).padStart(2, "0")}
                        </span>
                        <span className="mt-1 text-[10px] font-semibold tracking-wide text-overlay/70">
                          {t("countdownUnitMinutes")}
                        </span>
                      </div>
                      <span className="pb-1.5 text-base font-bold text-overlay/30 sm:pb-3 sm:text-2xl lg:pb-4 lg:text-3xl">
                        :
                      </span>
                      <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold tabular-nums sm:text-4xl lg:text-5xl">
                          {String(countdown.seconds).padStart(2, "0")}
                        </span>
                        <span className="mt-1 text-[10px] font-semibold tracking-wide text-overlay/70">
                          {t("countdownUnitSeconds")}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs font-medium text-overlay/80 sm:mt-5">
                      {stages.map((stage, index) => (
                        <span key={stage} className="flex items-center gap-2">
                          {index === stages.length - 1 ? (
                            <span className="rounded-full bg-orange px-2.5 py-1 font-semibold text-overlay">
                              {stage}
                            </span>
                          ) : (
                            <span>{stage}</span>
                          )}
                          {index < stages.length - 1 && (
                            <span aria-hidden="true" className="text-overlay/40">
                              →
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setJourneyOpen((value) => !value)}
                    aria-expanded={journeyOpen}
                    className="self-start text-sm font-semibold text-teal-deep underline-offset-4 hover:underline"
                  >
                    {journeyOpen ? t("journeyToggleClose") : t("journeyToggleOpen")}
                    <span aria-hidden="true" className="ml-1">
                      {journeyOpen ? "↑" : "↓"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {journeyOpen && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-1.5 overflow-hidden rounded-xl border border-gray-200 bg-cream px-4 py-3 text-xs text-gray-700"
                      >
                        {detailedStages.map((stage) => (
                          <li key={stage} className="py-0.5">
                            {stage}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Skipped on phones — secondary content, and keeping the
                  card compact matters more there than showing it. */}
              <div className="relative hidden border-t border-gray-100 px-6 py-3 sm:block sm:px-8 lg:px-10">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium text-gray-400">
                  {moduleStrip.map((mod, index) => (
                    <span key={mod}>
                      {mod}
                      {index < moduleStrip.length - 1 && (
                        <span aria-hidden="true" className="mx-2 text-gray-300">
                          •
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {collapsed && (
          <motion.button
            key="promo-tab"
            type="button"
            onClick={handleExpand}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3 }}
            aria-label={t("collapsedTabAria")}
            className="fixed top-28 right-0 z-30 flex flex-col items-center gap-1 rounded-l-2xl bg-teal px-2.5 py-4 text-overlay shadow-lg transition-colors hover:bg-teal/90"
          >
            <span className="text-[11px] font-bold tracking-wide [writing-mode:vertical-rl]">
              {t("collapsedTabLine1")}
            </span>
            <span className="text-[10px] font-semibold tracking-wide text-overlay/80 [writing-mode:vertical-rl]">
              {t("collapsedTabLine2")}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
