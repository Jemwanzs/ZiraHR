type LogoProps = {
  /** Icon-only (e.g. collapsed mobile states) vs icon + "SoftHR" wordmark. */
  variant?: "full" | "mark";
  className?: string;
};

/**
 * The SHR mark — a merged S / H+R monogram (H and R share their right
 * vertical stroke, R's bowl and leg grow out of it) — see
 * public/brand/shr-mark.svg, the source used for favicon.ico/icon.svg/
 * apple-icon.png. Inlined here (not an <img>) so it scales crisply at any
 * nav/drawer size without an extra image request.
 */
function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="SoftHR"
    >
      <rect width="120" height="120" rx="26" fill="#0B4F6C" />
      <rect x="14" y="30" width="26" height="8" fill="#fff" />
      <rect x="14" y="30" width="8" height="34" fill="#fff" />
      <rect x="14" y="56" width="26" height="8" fill="#fff" />
      <rect x="32" y="56" width="8" height="34" fill="#fff" />
      <rect x="14" y="82" width="26" height="8" fill="#fff" />
      <rect x="50" y="30" width="8" height="60" fill="#fff" />
      <rect x="76" y="30" width="8" height="60" fill="#fff" />
      <rect x="50" y="56" width="34" height="8" fill="#fff" />
      <path
        d="M 84 30 L 92 30 Q 104 30 104 42 Q 104 54 92 54 L 84 54 Z"
        fill="#fff"
      />
      <line
        x1="88"
        y1="54"
        x2="106"
        y2="90"
        stroke="#fff"
        strokeWidth="9"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Logo({ variant = "full", className = "" }: LogoProps) {
  if (variant === "mark") {
    return <Mark className={`h-8 w-8 ${className}`} />;
  }

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Mark className="h-8 w-8 shrink-0" />
      <span className="text-lg font-semibold tracking-tight text-gray-900">
        SoftHR
      </span>
    </span>
  );
}
