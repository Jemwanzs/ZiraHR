import type { CSSProperties } from "react";
import { PlaceholderIcon, type PlaceholderIconName } from "@/components/media/PlaceholderIcon";

type Tile = {
  icon: PlaceholderIconName;
  tone: "teal" | "orange" | "surface";
  rotate: string;
  className: string;
};

const TILES: Tile[] = [
  { icon: "payslip", tone: "teal", rotate: "-8deg", className: "top-0 right-14 h-20 w-20" },
  { icon: "leave", tone: "orange", rotate: "10deg", className: "top-20 right-0 h-16 w-16" },
  { icon: "analytics", tone: "surface", rotate: "-5deg", className: "top-36 right-20 h-20 w-20" },
];

const toneClasses: Record<Tile["tone"], string> = {
  teal: "bg-teal text-overlay",
  orange: "bg-orange text-overlay",
  surface: "border border-gray-200 bg-white text-teal-deep",
};

/**
 * Firebase-style tilted card cluster beside the hero headline — borrows the
 * *technique* (a handful of angled, icon-bearing tiles suggesting product
 * surface area) rather than any literal Firebase asset, per the precedent
 * already set in docs/03-brand/visual-design-system.md's competitor-review
 * section. Pure CSS (no Motion): this renders in the hero's initial
 * viewport, so it follows the same "no client-JS gating" rule as the ambient
 * glow blobs in HeroSection — see docs/06-technical/performance.md, Phase 9.
 */
export function AngledCardStack() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute top-0 right-0 hidden h-64 w-64 lg:block"
    >
      {TILES.map((tile, index) => (
        <div
          key={tile.icon}
          className={`absolute flex items-center justify-center rounded-2xl shadow-lg animate-[angled-card-float_7s_ease-in-out_infinite] ${toneClasses[tile.tone]} ${tile.className}`}
          style={
            {
              "--card-rotate": tile.rotate,
              transform: `rotate(${tile.rotate})`,
              animationDelay: `${index * 0.6}s`,
            } as CSSProperties
          }
        >
          <PlaceholderIcon name={tile.icon} className="h-8 w-8" />
        </div>
      ))}
    </div>
  );
}
