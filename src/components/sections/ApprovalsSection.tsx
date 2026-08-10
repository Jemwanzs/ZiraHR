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
  "custom",
] as const;

const QUEUE_ITEMS = [
  { key: "leaveRequest", status: "pending" },
  { key: "newEmployee", status: "pending" },
  { key: "payrollRun", status: "approved" },
  { key: "salaryAdvance", status: "pending" },
  { key: "profileUpdate", status: "approved" },
] as const;

/**
 * scope §18 — one approval engine, switchable between request types, now
 * extended per explicit client direction: every create/edit/update action
 * can require approval, and tenants can build entirely custom chains (the
 * "+ Build your own" option), not just the six listed types. The queue
 * mockup below is a deliberately-designed illustrative panel (generic role
 * labels, no fabricated names/numbers) — not a claimed screenshot, see
 * docs/08-assets/screenshot-plan.md's placeholder-vs-real distinction.
 */
export function ApprovalsSection() {
  const t = useTranslations("approvals");
  const [active, setActive] = useState<(typeof TYPES)[number]>("leave");
  const isCustom = active === "custom";
  const chainSteps = (isCustom ? t.raw("customChainSteps") : t.raw("chainSteps")) as string[];

  return (
    <Section tone="cream">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-wide text-teal">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("headline")}
        </h2>
        <p className="mt-3 text-gray-600">{t("everyAction")}</p>
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
                : type === "custom"
                  ? "border border-dashed border-gray-300 bg-transparent text-gray-600 hover:bg-white"
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
          <span key={`${step}-${index}`} className="flex items-center gap-3">
            {/* Orange text itself fails WCAG contrast on this light
                background (~2.3:1, see docs/03-brand/colors.md) — the
                orange tint stays as a background accent only, text stays
                dark for readability. */}
            <span
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                !isCustom && index === chainSteps.length - 1
                  ? "bg-orange/15 text-gray-900"
                  : isCustom && index > 0 && index < chainSteps.length - 1
                    ? "border border-dashed border-gray-300 text-gray-500"
                    : "border border-gray-200 text-gray-700"
              }`}
            >
              {step}
              {!isCustom && index === chainSteps.length - 1 ? " ✓" : ""}
            </span>
            {index < chainSteps.length - 1 && (
              <span aria-hidden="true" className="text-gray-300">
                →
              </span>
            )}
          </span>
        ))}
      </Reveal>
      {isCustom && (
        <Reveal delay={0.12} className="mx-auto mt-4 max-w-md text-center">
          <p className="text-sm text-gray-500">{t("customNote")}</p>
        </Reveal>
      )}

      <Reveal delay={0.15} className="mx-auto mt-10 max-w-2xl rounded-2xl bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-5">
          <p className="text-sm font-semibold text-gray-900">{t("queue.title")}</p>
          <p className="mt-1 text-sm text-gray-500">{t("queue.subtitle")}</p>
        </div>
        <ul className="divide-y divide-gray-100">
          {QUEUE_ITEMS.map((item) => (
            <li
              key={item.key}
              className="flex items-center justify-between gap-4 px-6 py-3.5 transition-colors hover:bg-cream/60"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {t(`queue.items.${item.key}.action`)}
                </p>
                <p className="text-xs text-gray-500">
                  {t(`queue.items.${item.key}.requester`)}
                </p>
              </div>
              <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-gray-600">
                <span
                  aria-hidden="true"
                  className={`h-2 w-2 rounded-full ${
                    item.status === "approved" ? "bg-teal" : "bg-orange"
                  }`}
                />
                {t(`queue.statusLabels.${item.status}`)}
              </span>
            </li>
          ))}
        </ul>
      </Reveal>

      <p className="mt-8 text-center text-lg font-medium text-gray-900">
        {t("closingLine")}
      </p>
    </Section>
  );
}
