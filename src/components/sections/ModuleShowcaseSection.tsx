"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import { Reveal } from "@/components/motion/Reveal";

const MODULES = [
  "coreHr",
  "payroll",
  "leave",
  "attendance",
  "performance",
  "recruitment",
  "learningDevelopment",
  "collaboration",
] as const;

/**
 * scope §7 — not twelve identical feature cards. Left-nav module switcher,
 * right-side stage shows that module's headline, capability list, and a
 * placeholder workflow visual.
 */
export function ModuleShowcaseSection() {
  const t = useTranslations("moduleShowcase");
  const [active, setActive] = useState<(typeof MODULES)[number]>("coreHr");

  return (
    <Section tone="white">
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold tracking-wide text-teal">
          {t("eyebrow")}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("heading")}
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[240px_1fr]">
        <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
          {MODULES.map((mod) => (
            <button
              key={mod}
              type="button"
              onClick={() => setActive(mod)}
              aria-pressed={active === mod}
              className={`shrink-0 rounded-full px-4 py-2.5 text-left text-sm font-medium whitespace-nowrap transition-colors lg:rounded-xl ${
                active === mod
                  ? "bg-teal text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t(`${mod}.label`)}
            </button>
          ))}
        </div>

        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid gap-8 sm:grid-cols-2"
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  {t(`${active}.headline`)}
                </h3>
                <ul className="mt-6 flex flex-col gap-3">
                  {t.raw(`${active}.items`).map((item: string) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span aria-hidden="true" className="text-teal">
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <ScreenshotSlot
                slot={`moduleShowcase.${active}`}
                alt={t(`${active}.headline`)}
                label={t(`${active}.label`)}
                aspect="video"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
