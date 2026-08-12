"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/ui/SectionLabel";

const NODES = [
  "payroll",
  "leave",
  "attendance",
  "performance",
  "learning",
  "documents",
  "assets",
  "recruitment",
  "lifecycle",
  "disciplinary",
] as const;

const RADIUS = 42; // percent of container
const CENTER = 50;

function nodePosition(index: number, total: number) {
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

/**
 * scope §6 "Everything Connects" — a central employee record with animated
 * connector lines to every module, so the platform's architecture reads
 * visually rather than needing an explanation.
 */
export function ConnectedRecordSection() {
  const t = useTranslations("connectedRecord");
  const shouldReduceMotion = useReducedMotion();

  return (
    <Section tone="cream">
      <div className="mx-auto max-w-2xl text-center">
        <SectionLabel index={2}>{t("eyebrow")}</SectionLabel>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("headline")}
        </h2>
        <p className="mt-3 text-gray-600">{t("supporting")}</p>
      </div>

      <div className="relative mx-auto mt-16 hidden aspect-square max-w-2xl lg:block">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          {NODES.map((node, index) => {
            const { x, y } = nodePosition(index, NODES.length);
            return (
              <motion.line
                key={node}
                x1={CENTER}
                y1={CENTER}
                x2={x}
                y2={y}
                stroke="var(--color-gray-300)"
                strokeWidth={0.4}
                initial={shouldReduceMotion ? undefined : { pathLength: 0 }}
                whileInView={shouldReduceMotion ? undefined : { pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
              />
            );
          })}
        </svg>

        <div
          className="absolute flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-teal text-center text-white shadow-lg"
          style={{ left: `${CENTER}%`, top: `${CENTER}%` }}
        >
          <span className="text-xs font-semibold">Employee</span>
          <span className="text-[10px] opacity-80">Record</span>
        </div>

        {NODES.map((node, index) => {
          const { x, y } = nodePosition(index, NODES.length);
          return (
            <motion.div
              key={node}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium whitespace-nowrap text-gray-700 shadow-sm"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.8 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.1, borderColor: "#0B4F6C" }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
            >
              {t(`nodes.${node}`)}
            </motion.div>
          );
        })}
      </div>

      {/* Mobile/tablet: simplified grid, no radial connectors (docs/02-ux/responsive-behaviour.md) */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:hidden">
        {NODES.map((node) => (
          <div
            key={node}
            className="rounded-full border border-gray-200 bg-white px-3 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:border-teal hover:text-teal"
          >
            {t(`nodes.${node}`)}
          </div>
        ))}
      </div>
    </Section>
  );
}
