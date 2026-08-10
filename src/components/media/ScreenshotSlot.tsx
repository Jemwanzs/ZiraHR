import Image from "next/image";
import { resolveMediaSlot } from "@/lib/media-manifest";
import { PlaceholderIcon, type PlaceholderIconName } from "@/components/media/PlaceholderIcon";

type ScreenshotSlotProps = {
  slot: string;
  alt: string;
  /** Shown only in the placeholder state — never rendered alongside a real image. */
  label: string;
  aspect?: "video" | "square" | "wide" | "portrait";
  className?: string;
  priority?: boolean;
  /** "dark" for placement on a dark section background (e.g. Ask TiJa). */
  tone?: "light" | "dark";
  /** Which placeholder glyph to show — defaults to a generic grid so
   * existing call sites don't need updating. Pick a content-relevant one
   * (see PlaceholderIcon) so a "coming soon" slot reads as designed rather
   * than interchangeable with every other slot on the page. */
  icon?: PlaceholderIconName;
};

const aspectClasses: Record<NonNullable<ScreenshotSlotProps["aspect"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
};

/**
 * The only way product visuals get rendered anywhere on the site — see
 * docs/08-assets/screenshot-plan.md. Falls back to a clearly-labeled
 * placeholder (never a fabricated screenshot) until a real asset is
 * registered in src/lib/media-manifest.ts for this slot id.
 */
export function ScreenshotSlot({
  slot,
  alt,
  label,
  aspect = "video",
  className = "",
  priority = false,
  tone = "light",
  icon = "dashboard",
}: ScreenshotSlotProps) {
  const src = resolveMediaSlot(slot);

  if (src) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl bg-white shadow-sm ${aspectClasses[aspect]} ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const isDark = tone === "dark";

  return (
    <div
      role="img"
      aria-label={`${label} — product preview coming soon`}
      className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed ${
        isDark
          ? "border-white/20 bg-white/5"
          : "border-gray-300 bg-white/60"
      } ${aspectClasses[aspect]} ${className}`}
    >
      <span
        className={`absolute top-3 right-3 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide uppercase ${
          isDark ? "bg-white/10 text-white/70" : "bg-gray-100 text-gray-500"
        }`}
      >
        Preview
      </span>
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
          isDark ? "bg-white/10 text-orange" : "bg-cream text-teal"
        }`}
      >
        <PlaceholderIcon name={icon} className="h-6 w-6" />
      </div>
      <p
        className={`px-6 text-center text-sm font-medium ${
          isDark ? "text-white/70" : "text-gray-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
}
