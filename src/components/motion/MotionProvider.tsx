"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Sitewide reduced-motion enforcement — see docs/03-brand/motion-language.md
 * ("prefers-reduced-motion disables scroll-jacking, parallax, and
 * connector-line animation site-wide, implemented once as a shared hook...
 * not re-implemented per section"). `reducedMotion="user"` makes every
 * `motion.*` component in the app automatically honor the OS-level
 * prefers-reduced-motion setting, so individual sections don't each need
 * their own check.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
