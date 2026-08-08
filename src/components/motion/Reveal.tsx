"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** "up" (default, content rises into place) or "none" (fade only). */
  direction?: "up" | "none";
};

/**
 * Shared scroll-reveal wrapper — the one entrance-animation primitive used
 * across homepage/product sections (docs/03-brand/motion-language.md).
 * Animates once per element, on first viewport intersection, and collapses
 * to a plain fade under prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = direction === "up" && !shouldReduceMotion ? 24 : 0;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
