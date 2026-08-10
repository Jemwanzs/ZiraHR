"use client";

import { motion, useReducedMotion } from "motion/react";

const DOTS = [0, 1, 2];

/** Three pulsing dots — a generic "thinking/responding" cue, not implying
 * any specific message content. */
export function TypingIndicator() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <span className="flex items-center gap-1" aria-hidden="true">
      {DOTS.map((dot) => (
        <motion.span
          key={dot}
          className="h-1.5 w-1.5 rounded-full bg-current"
          animate={shouldReduceMotion ? undefined : { opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: dot * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </span>
  );
}
