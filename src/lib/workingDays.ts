/**
 * Fixed-date Kenyan public holidays only — movable ones (Eid ul-Fitr,
 * Eid ul-Adha, Good Friday, Easter Monday) follow lunar/Easter computus and
 * aren't computed here rather than risk asserting a wrong date. Weekend
 * exclusion (the part the go-live promise actually depends on) is exact;
 * this list is a best-effort supplement. Update yearly.
 */
const KENYA_PUBLIC_HOLIDAYS: Record<string, string[]> = {
  "2026": [
    "2026-01-01", // New Year's Day
    "2026-05-01", // Labour Day
    "2026-06-01", // Madaraka Day
    "2026-10-20", // Mashujaa Day
    "2026-12-12", // Jamhuri Day
    "2026-12-25", // Christmas Day
    "2026-12-26", // Boxing Day
  ],
};

function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function isKenyaPublicHoliday(date: Date): boolean {
  const year = String(date.getFullYear());
  const isoDate = date.toISOString().slice(0, 10);
  return (KENYA_PUBLIC_HOLIDAYS[year] ?? []).includes(isoDate);
}

/** Adds N working days (skipping weekends and known Kenyan public
 * holidays) to `start`, preserving its time-of-day. */
export function addWorkingDays(start: Date, workingDays: number): Date {
  const result = new Date(start.getTime());
  let remaining = workingDays;
  while (remaining > 0) {
    result.setDate(result.getDate() + 1);
    if (!isWeekend(result) && !isKenyaPublicHoliday(result)) {
      remaining -= 1;
    }
  }
  return result;
}

export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  overdue: boolean;
};

/** Calendar time remaining until `target` (already working-day-adjusted by
 * addWorkingDays), broken into days/hours/minutes/seconds for display. */
export function computeCountdown(target: Date, now: Date = new Date()): Countdown {
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, overdue: true };
  }
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, overdue: false };
}
