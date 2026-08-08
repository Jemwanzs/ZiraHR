"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import { Reveal } from "@/components/motion/Reveal";

const DASHBOARDS = ["executive", "hr", "finance", "my"] as const;

/**
 * scope §20 — animated horizontal gallery, hover/tap brings a dashboard
 * forward while the others recede.
 */
export function DashboardsSection() {
  const t = useTranslations("dashboards");
  const [focused, setFocused] = useState<(typeof DASHBOARDS)[number] | null>(
    null,
  );

  return (
    <Section tone="white">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-wide text-teal">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("headline")}
        </h2>
      </Reveal>

      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {DASHBOARDS.map((dashboard) => {
          const isFocused = focused === dashboard;
          const isDimmed = focused !== null && !isFocused;

          return (
            <button
              key={dashboard}
              type="button"
              onMouseEnter={() => setFocused(dashboard)}
              onMouseLeave={() => setFocused(null)}
              onFocus={() => setFocused(dashboard)}
              onBlur={() => setFocused(null)}
              className={`w-full max-w-xs shrink-0 rounded-2xl text-left transition-all duration-300 ${
                isFocused ? "scale-105 shadow-xl" : "shadow-sm"
              } ${isDimmed ? "opacity-60" : "opacity-100"}`}
            >
              <ScreenshotSlot
                slot={`dashboards.${dashboard}`}
                alt={`${t(`types.${dashboard}`)} dashboard`}
                label={`${t(`types.${dashboard}`)} Dashboard`}
                aspect="portrait"
              />
              <p className="mt-3 text-center text-sm font-medium text-gray-900">
                {t(`types.${dashboard}`)}
              </p>
            </button>
          );
        })}
      </div>
    </Section>
  );
}
