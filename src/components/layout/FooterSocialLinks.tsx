"use client";

import { useState, type ReactNode } from "react";

type Platform = "facebook" | "instagram" | "x" | "youtube";

const PLATFORMS: Platform[] = ["facebook", "instagram", "x", "youtube"];

const ICON_PATHS: Record<Platform, ReactNode> = {
  facebook: <path d="M16 8h-2a2 2 0 0 0-2 2v3H9v3h3v7h3v-7h2.5l.5-3H15v-2a1 1 0 0 1 1-1h2V8Z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.5" />
      <circle cx="17" cy="7" r="0.75" fill="currentColor" stroke="none" />
    </>
  ),
  x: <path d="M5 5l14 14M19 5 5 19" />,
  youtube: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="4" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" />
    </>
  ),
};

/**
 * Placeholder social row — no real SoftHR accounts exist yet (see
 * StructuredData.tsx's own note that `sameAs` stays empty until social
 * links are verified), so these are deliberately inert: no href, and a
 * click reveals "…" instead of pretending to go anywhere. Swap in real
 * hrefs (turn the buttons into links) once accounts exist.
 */
export function FooterSocialLinks() {
  const [active, setActive] = useState<Platform | null>(null);

  return (
    <div className="flex items-center gap-3">
      {PLATFORMS.map((platform) => (
        <div key={platform} className="relative">
          <button
            type="button"
            onClick={() => setActive((current) => (current === platform ? null : platform))}
            aria-label={`${platform} (coming soon)`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-overlay/25 text-overlay transition-transform duration-200 ease-out hover:scale-125 hover:border-overlay/50"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {ICON_PATHS[platform]}
            </svg>
          </button>
          {active === platform && (
            <span
              aria-hidden="true"
              className="absolute -bottom-7 left-1/2 -translate-x-1/2 rounded-full bg-overlay/15 px-2 py-0.5 text-xs font-bold tracking-wider text-overlay"
            >
              •••
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
