export type PlaceholderIconName =
  | "directory"
  | "payslip"
  | "leave"
  | "attendance"
  | "performance"
  | "recruitment"
  | "learning"
  | "collaboration"
  | "analytics"
  | "askTija"
  | "application"
  | "review"
  | "offer"
  | "onboarding"
  | "promotion"
  | "offboarding"
  | "dashboard";

type PlaceholderIconProps = {
  name: PlaceholderIconName;
  className?: string;
};

const PATHS: Record<PlaceholderIconName, string> = {
  // People directory — a small grid of profile circles.
  directory:
    "M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM8 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm8 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  // Payslip — a document with a currency line.
  payslip:
    "M6 3h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 9h6M9 15h4",
  // Leave — a calendar with a check.
  leave: "M4 5h16v16H4V5Zm0 5h16M8 3v4M16 3v4M9 16l2 2 4-4",
  // Attendance — a clock face.
  attendance: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3 2",
  // Performance — a target with an arrow-like tick.
  performance: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 4h.01",
  // Recruitment — a briefcase.
  recruitment: "M4 8h16v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8Zm4 0V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M4 13h16",
  // Learning — an open book / graduation cap hybrid.
  learning: "M12 4 3 8l9 4 9-4-9-4Zm-6 6v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5",
  // Collaboration — overlapping chat bubbles.
  collaboration:
    "M8 12a4 4 0 1 1 4.9 3.9L8 17v-2.3A4 4 0 0 1 8 12Zm8-6a4 4 0 0 1 3.9 4.9L20 15h-2.3",
  // Analytics — a bar chart.
  analytics: "M4 20V10m6 10V4m6 16v-7",
  // Ask TiJa — a spark/assistant glyph.
  askTija: "M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  // Application — a document with a plus.
  application: "M6 3h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3 10h6M12 10v6",
  // Review — a magnifying glass, for candidates under evaluation.
  review: "M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm11 18-6-6",
  // Offer — a handshake-like clasped shape (simplified as two overlapping hands via arcs).
  offer: "M3 12h4l3-3 3 3h2l3-3 3 3M3 12v3a2 2 0 0 0 2 2h2M21 12v3a2 2 0 0 0-2 2h-2",
  // Onboarding — a badge with a check.
  onboarding: "M12 3 4 6v6c0 5 3.6 7.7 8 9 4.4-1.3 8-4 8-9V6l-8-3Zm-3 9 2 2 4-4",
  // Promotion — an upward trending arrow.
  promotion: "m4 16 5-5 4 4 7-7M14 8h6v6",
  // Offboarding — a door with an exit arrow.
  offboarding: "M6 3h9v18H6zM9 3v18M15 11h5m0 0-2-2m2 2-2 2",
  // Generic dashboard — a layout grid.
  dashboard: "M4 4h7v7H4V4Zm9 0h7v4h-7V4Zm0 7h7v9h-7v-9ZM4 14h7v6H4v-6Z",
};

/** Small, consistent line-icon set used only inside placeholder previews
 * (ScreenshotSlot) — deliberately iconographic, not a fake screenshot, so
 * a "coming soon" slot reads as designed rather than blank while staying
 * honest about not being real product UI. */
export function PlaceholderIcon({ name, className }: PlaceholderIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
