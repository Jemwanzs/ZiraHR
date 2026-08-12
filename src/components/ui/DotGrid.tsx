/**
 * Subtle dotted-grid texture — decorative only, absolutely positioned by
 * the caller. A cheap CSS radial-gradient tile (no image request), used
 * sparingly behind "poster" moments that want a bit more visual texture
 * than a flat background — a technique noticed on competitor reference
 * sites, re-implemented here as plain CSS rather than copied assets.
 */
export function DotGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, color-mix(in srgb, var(--color-gray-400) 45%, transparent) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 70% 60% at 50% 40%, black 40%, transparent 90%)",
      }}
    />
  );
}
