import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** cream (default page canvas), white (card-like contrast), teal (Ask TiJa's deliberate dark break) */
  tone?: "cream" | "white" | "teal";
  containerClassName?: string;
};

const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  cream: "bg-cream text-gray-900",
  white: "bg-white text-gray-900",
  // teal is a fixed dark accent (unchanged across the light/dark site
  // theme — see globals.css), so its text uses the theme-independent
  // --color-overlay token rather than --color-white, which does change
  // per theme.
  teal: "bg-teal text-overlay",
};

/**
 * Shared vertical-rhythm wrapper for homepage/product-page beats — see
 * docs/02-ux/homepage-scope.md. Keeps section spacing/tone consistent so
 * individual section components only worry about their own content.
 */
export function Section({
  children,
  id,
  className = "",
  tone = "cream",
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 sm:py-24 ${toneClasses[tone]} ${className}`}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
