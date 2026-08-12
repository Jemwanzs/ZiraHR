"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import {
  ApproveRequestScene,
  AskTijaScene,
  DashboardScene,
  EmployeeProfileScene,
  LeaveScene,
  PayrollScene,
} from "@/components/sections/ProductScenes";
import { SectionLabel } from "@/components/ui/SectionLabel";

const ACTIONS = [
  "runPayroll",
  "requestLeave",
  "approveRequest",
  "openEmployeeProfile",
  "askTija",
  "viewDashboard",
] as const;

/**
 * scope §24 — a lightweight simulated interface, no login required. Each
 * button swaps the preview panel below rather than connecting to the real
 * (authenticated) app. The panel content is the same illustrated scene
 * system as the homepage hero reel (ProductScenes.tsx) — a real designed
 * "sample screen" per action, not a static icon placeholder.
 */
export function ProductTourSection() {
  const t = useTranslations();
  const tTour = useTranslations("productTour");
  const [active, setActive] = useState<(typeof ACTIONS)[number]>(
    "runPayroll",
  );

  return (
    <Section tone="cream">
      <Reveal className="mx-auto max-w-2xl text-center">
        <SectionLabel index={11}>{tTour("eyebrow")}</SectionLabel>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {tTour("headline")}
        </h2>
        <p className="mt-3 text-gray-600">{tTour("supporting")}</p>
      </Reveal>

      <Reveal delay={0.05} className="mt-10 flex flex-wrap justify-center gap-2">
        {ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => setActive(action)}
            aria-pressed={active === action}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === action
                ? "bg-teal text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {tTour(`buttons.${action}`)}
          </button>
        ))}
      </Reveal>

      <div className="mx-auto mt-8 max-w-3xl">
        <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:aspect-video">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
            style={{ background: "var(--color-sky)" }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex w-full items-center justify-center"
            >
              {active === "runPayroll" && <PayrollScene t={t} />}
              {active === "requestLeave" && <LeaveScene t={t} />}
              {active === "approveRequest" && <ApproveRequestScene t={t} />}
              {active === "openEmployeeProfile" && <EmployeeProfileScene t={t} />}
              {active === "askTija" && <AskTijaScene t={t} />}
              {active === "viewDashboard" && <DashboardScene t={t} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
