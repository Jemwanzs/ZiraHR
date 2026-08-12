import type { ReactNode } from "react";

type SectionLabelProps = {
  index: number;
  children: ReactNode;
  /** "dark" for placement on a dark section background (Ask TiJa). */
  tone?: "light" | "dark";
};

/**
 * Numbered eyebrow label ("01 · YOUR PEOPLE") giving the homepage's section
 * sequence an explicit editorial rhythm — a pattern borrowed from reviewing
 * competitor sites (Meridian HR's "/ MANIFESTO — 01" style numbered
 * section labels), re-implemented in our own type/color system rather than
 * copied wholesale.
 */
export function SectionLabel({ index, children, tone = "light" }: SectionLabelProps) {
  return (
    <p
      className={`text-sm font-semibold tracking-wide ${tone === "dark" ? "text-[#FBB768]" : "text-teal"}`}
    >
      <span className={tone === "dark" ? "text-white/40" : "text-gray-400"}>
        {String(index).padStart(2, "0")} ·{" "}
      </span>
      {children}
    </p>
  );
}
