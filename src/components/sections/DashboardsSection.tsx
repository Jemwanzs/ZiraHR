"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import type { PlaceholderIconName } from "@/components/media/PlaceholderIcon";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DashboardScene } from "@/components/sections/ProductScenes";
import { DotGrid } from "@/components/ui/DotGrid";

const DASHBOARDS = ["executive", "hr", "finance", "my"] as const;

const DASHBOARD_ICONS: Record<(typeof DASHBOARDS)[number], PlaceholderIconName> = {
  executive: "analytics",
  hr: "directory",
  finance: "payslip",
  my: "dashboard",
};

/**
 * scope §20 — animated horizontal gallery, hover/tap brings a dashboard
 * forward while the others recede.
 */
export function DashboardsSection() {
  const t = useTranslations("dashboards");
  const tRoot = useTranslations();
  const [focused, setFocused] = useState<(typeof DASHBOARDS)[number] | null>(
    null,
  );

  return (
    <Section tone="white" className="relative overflow-hidden">
      <DotGrid className="opacity-70" />

      <Reveal className="relative mx-auto max-w-2xl text-center">
        <SectionLabel index={8}>{t("eyebrow")}</SectionLabel>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("headline")}
        </h2>
      </Reveal>

      {/* One connected dashboard, stated plainly: the same three live
          numbers used in the hero reel and product tour, reused here
          rather than inventing a denser KPI wall we don't have real data
          to back — see performance.md for why. */}
      <Reveal delay={0.05} className="relative mx-auto mt-10 max-w-xl">
        <div className="rounded-2xl border border-gray-200 bg-cream/60 px-6 py-5 shadow-sm">
          <DashboardScene t={tRoot} />
        </div>
      </Reveal>

      <div className="relative mt-10 flex flex-wrap justify-center gap-6">
        {DASHBOARDS.map((dashboard) => {
          const isFocused = focused === dashboard;
          const isDimmed = focused !== null && !isFocused;
          const typeLabel = t(`types.${dashboard}`);

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
                alt={typeLabel}
                label={typeLabel}
                aspect="portrait"
                icon={DASHBOARD_ICONS[dashboard]}
              />
              <p className="mt-3 text-center text-sm font-medium text-gray-900">
                {typeLabel}
              </p>
            </button>
          );
        })}
      </div>
    </Section>
  );
}
