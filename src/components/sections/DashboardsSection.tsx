"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
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
 * scope §20. Was four ScreenshotSlot cards shown simultaneously, each with
 * its own "Preview" badge, plus a caption repeated a second time below the
 * card border — a real duplicate-label bug on top of the same card-wall
 * repetition problem this pass has been fixing across the homepage.
 * Rebuilt as a tab switcher (same proven pattern as ModuleShowcaseSection):
 * one role active at a time, with a short honest "what this role sees"
 * description instead of four boxes implying four different screenshots
 * that don't actually differ yet.
 */
export function DashboardsSection() {
  const t = useTranslations("dashboards");
  const tRoot = useTranslations();
  const [active, setActive] = useState<(typeof DASHBOARDS)[number]>("executive");

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

      <div className="relative mx-auto mt-12 max-w-3xl">
        <div className="flex flex-wrap justify-center gap-2">
          {DASHBOARDS.map((dashboard) => (
            <button
              key={dashboard}
              type="button"
              onClick={() => setActive(dashboard)}
              aria-pressed={active === dashboard}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === dashboard
                  ? "bg-teal text-overlay"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t(`types.${dashboard}`)}
            </button>
          ))}
        </div>

        <div className="mt-8 min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid items-center gap-8 sm:grid-cols-2"
            >
              <div>
                <p className="text-sm font-semibold text-teal-deep">
                  {t(`types.${active}`)}
                </p>
                <p className="mt-2 text-gray-600">{t(`descriptions.${active}`)}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {(t.raw(`sees.${active}`) as string[]).map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-gray-200 bg-cream px-3 py-1.5 text-xs font-medium text-gray-700"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <ScreenshotSlot
                slot={`dashboards.${active}`}
                alt={t(`types.${active}`)}
                label={t(`types.${active}`)}
                aspect="portrait"
                icon={DASHBOARD_ICONS[active]}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
