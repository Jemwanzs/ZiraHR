"use client";

import { motion, useReducedMotion } from "motion/react";

type CapabilityCloudProps = {
  items: string[];
  className?: string;
};

/**
 * Compact, staggered pill cloud for capability/feature lists — replaces the
 * flat checkmark list. A wrapped cloud of short chips reads as a designed
 * cluster even at 14-16 items, where a vertical checklist reads as a wall
 * of text (client feedback: "shorten narrations... no long lists").
 */
export function CapabilityCloud({ items, className }: CapabilityCloudProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={className ?? "flex flex-wrap justify-center gap-2.5"}>
      {items.map((item, index) => (
        <motion.span
          key={item}
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.4,
            delay: shouldReduceMotion ? 0 : Math.min(index * 0.04, 0.4),
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ y: -2 }}
          className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-teal hover:text-teal"
        >
          <span aria-hidden="true" className="text-teal">
            ✓
          </span>
          {item}
        </motion.span>
      ))}
    </div>
  );
}
