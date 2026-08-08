"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import { Reveal } from "@/components/motion/Reveal";

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
 * (authenticated) app.
 */
export function ProductTourSection() {
  const t = useTranslations("productTour");
  const [active, setActive] = useState<(typeof ACTIONS)[number]>(
    "runPayroll",
  );

  return (
    <Section tone="cream">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-wide text-teal">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("headline")}
        </h2>
        <p className="mt-3 text-gray-600">{t("supporting")}</p>
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
            {t(`buttons.${action}`)}
          </button>
        ))}
      </Reveal>

      <div className="mx-auto mt-8 max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ScreenshotSlot
              slot={`productTour.${active}`}
              alt={t(`buttons.${active}`)}
              label={t(`buttons.${active}`)}
              aspect="wide"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
