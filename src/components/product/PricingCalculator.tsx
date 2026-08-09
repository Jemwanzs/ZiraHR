"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Toggle } from "@/components/ui/Toggle";
import { Button } from "@/components/ui/Button";

const ADDON_MODULES = [
  "payroll",
  "leaveManagement",
  "attendance",
  "recruitment",
  "performanceManagement",
  "learningDevelopment",
  "teamsCollaboration",
  "employeeSelfService",
  "analytics",
  "askTija",
] as const;

const DEFAULT_SELECTED = new Set<string>(["payroll", "leaveManagement", "attendance"]);

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-KE", { maximumFractionDigits: 0 }).format(amount);
}

/**
 * Module-by-module, per-employee pricing calculator — see
 * docs/06-technical/pricing-calculator.md. Rates are explicitly labeled
 * illustrative (no real rate card exists yet); the toggle/billing
 * *mechanism* itself is real per client direction — only the numbers are
 * placeholders.
 */
export function PricingCalculator() {
  const t = useTranslations("pages.pricing.calculator");
  const [employeeCount, setEmployeeCount] = useState(50);
  const [selected, setSelected] = useState<Set<string>>(DEFAULT_SELECTED);

  function toggleModule(moduleKey: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(moduleKey)) next.delete(moduleKey);
      else next.add(moduleKey);
      return next;
    });
  }

  const perEmployeeTotal = useMemo(() => {
    return ADDON_MODULES.reduce((sum, key) => {
      if (!selected.has(key)) return sum;
      const rate = t.raw(`modules.${key}.rate`) as number;
      return sum + rate;
    }, 0);
  }, [selected, t]);

  const monthlyTotal = perEmployeeTotal * Math.max(employeeCount, 0);
  const currency = t("currency");

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="rounded-full bg-orange/15 px-3 py-1 text-xs font-semibold tracking-wide text-gray-900 uppercase">
          {t("illustrativeBadge")}
        </span>
      </div>
      <p className="mt-2 text-sm text-gray-500">{t("illustrativeNote")}</p>

      <div className="mt-6">
        <label htmlFor="employee-count" className="mb-2 block text-sm font-medium text-gray-900">
          {t("employeeCountLabel")}: <span className="font-semibold">{employeeCount}</span>
        </label>
        <input
          id="employee-count"
          type="range"
          min={1}
          max={500}
          step={1}
          value={employeeCount}
          onChange={(e) => setEmployeeCount(Number(e.target.value))}
          className="w-full accent-teal"
        />
      </div>

      <div className="mt-6 flex flex-col divide-y divide-gray-100 rounded-xl border border-gray-100">
        <div className="flex items-center justify-between gap-4 px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {t("modules.coreHr.label")}
            </p>
            <p className="text-xs text-gray-500">{t("baseIncluded")}</p>
          </div>
          <Toggle checked disabled label={t("modules.coreHr.label")} />
        </div>

        {ADDON_MODULES.map((key) => (
          <div key={key} className="flex items-center justify-between gap-4 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">{t(`modules.${key}.label`)}</p>
              <p className="text-xs text-gray-500">
                {currency} {formatCurrency(t.raw(`modules.${key}.rate`) as number)}{" "}
                {t("perEmployeePerMonth")}
              </p>
            </div>
            <Toggle
              checked={selected.has(key)}
              onChange={() => toggleModule(key)}
              label={t(`modules.${key}.label`)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-cream p-6 text-center">
        <p className="text-sm font-medium text-gray-600">{t("totalLabel")}</p>
        <p className="mt-1 text-4xl font-semibold text-gray-900">
          {currency} {formatCurrency(monthlyTotal)}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {t("totalNote", { count: employeeCount })}
        </p>
      </div>

      <div className="mt-6 flex justify-center">
        <Button href="/request-demo" showArrow>
          {t("cta")}
        </Button>
      </div>
    </div>
  );
}
