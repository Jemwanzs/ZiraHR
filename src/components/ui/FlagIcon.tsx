import type { AppLocale } from "@/i18n/routing";

type FlagIconProps = {
  locale: AppLocale;
  className?: string;
};

/**
 * Inline SVG flags — deliberately not Unicode flag emoji. Windows font
 * rendering has no glyphs for regional-indicator emoji pairs, so 🇬🇧/🇫🇷/🇰🇪
 * fall back to showing raw two-letter codes ("GB", "FR", "KE") as plain
 * text instead of a flag, which is exactly the bug this replaces.
 */
export function FlagIcon({ locale, className }: FlagIconProps) {
  const classes = `inline-block h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px] ${className ?? ""}`;

  if (locale === "fr") {
    return (
      <svg viewBox="0 0 3 2" className={classes} role="img" aria-hidden="true">
        <rect width="3" height="2" fill="#ED2939" />
        <rect width="2" height="2" fill="#fff" />
        <rect width="1" height="2" fill="#002395" />
      </svg>
    );
  }

  if (locale === "sw") {
    return (
      <svg viewBox="0 0 30 20" className={classes} role="img" aria-hidden="true">
        <rect width="30" height="20" fill="#fff" />
        <rect width="30" height="6" fill="#000" />
        <rect width="30" height="6" y="14" fill="#006600" />
        <rect width="30" height="2" y="9" fill="#BB0000" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 60 40" className={classes} role="img" aria-hidden="true">
      <rect width="60" height="40" fill="#012169" />
      <path d="M0,0 60,40 M60,0 0,40" stroke="#fff" strokeWidth="8" />
      <path d="M0,0 60,40 M60,0 0,40" stroke="#C8102E" strokeWidth="3" />
      <path d="M30,0 V40 M0,20 H60" stroke="#fff" strokeWidth="13" />
      <path d="M30,0 V40 M0,20 H60" stroke="#C8102E" strokeWidth="8" />
    </svg>
  );
}
