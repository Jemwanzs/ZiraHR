"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";

const TYPES = [
  "leave",
  "payroll",
  "salaryAdvance",
  "promotion",
  "disciplinary",
  "dataImports",
] as const;

/**
 * scope §18 — one approval engine, switchable between request types. The
 * chain itself (Employee -> ... -> Approved) doesn't change per type; only
 * the active label does, which is the point ("your rules", not your
 * pipeline).
 */
export function ApprovalsSection() {
  const t = useTranslations("approvals");
  const [active, setActive] = useState<(typeof TYPES)[number]>("leave");
  const chainSteps = t.raw("chainSteps") as string[];

  return (
    <Section tone="cream">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-wide text-teal">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("headline")}
        </h2>
      </Reveal>

      <Reveal delay={0.05} className="mt-10 flex flex-wrap justify-center gap-2">
        {TYPES.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setActive(type)}
            aria-pressed={active === type}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === type
                ? "bg-teal text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {t(`types.${type}`)}
          </button>
        ))}
      </Reveal>

      <Reveal
        delay={0.1}
        className="mt-10 flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-white p-8 shadow-sm"
      >
        {chainSteps.map((step, index) => (
          <span key={step} className="flex items-center gap-3">
            <span
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                index === chainSteps.length - 1
                  ? "bg-orange/15 text-orange"
                  : "border border-gray-200 text-gray-700"
              }`}
            >
              {step}
              {index === chainSteps.length - 1 ? " ✓" : ""}
            </span>
            {index < chainSteps.length - 1 && (
              <span aria-hidden="true" className="text-gray-300">
                →
              </span>
            )}
          </span>
        ))}
      </Reveal>

      <p className="mt-8 text-center text-lg font-medium text-gray-900">
        {t("closingLine")}
      </p>
    </Section>
  );
}
