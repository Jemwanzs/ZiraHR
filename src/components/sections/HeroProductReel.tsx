"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AskTijaScene, DashboardScene, LeaveScene, PayrollScene } from "@/components/sections/ProductScenes";

const SCENES = ["payroll", "leave", "dashboard", "askTija"] as const;
const SCENE_DURATION_MS = 4000;

/**
 * The hero's animated "advert" — a self-contained, code-built product reel
 * (no video file) cycling through four short scenes, per explicit client
 * direction ("a demo video clip or advertisement short clip... designed
 * and animated by claude code here just for zirahr"). Scenes live in
 * ProductScenes.tsx, shared with ProductTourSection's "see it in action"
 * gallery so the two places that need a live-feeling simulated interface
 * don't drift apart.
 *
 * Deliberately a separate client component mounted *after* the plain-text
 * hero content, not wrapping it — see docs/06-technical/performance.md's
 * Phase 9 note on why the hero text itself must never be gated behind
 * client JS/animation.
 */
export function HeroProductReel() {
  const t = useTranslations();
  const shouldReduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const timer = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % SCENES.length;
        if (next === 0) setCycle((c) => c + 1);
        return next;
      });
    }, SCENE_DURATION_MS);
    return () => clearInterval(timer);
  }, [shouldReduceMotion]);

  const scene = SCENES[active];

  return (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl sm:aspect-video">
      {/* Soft decorative depth behind the scene content — fills the frame
          with intentional design instead of blank white, without pulling
          focus from the scene itself. Pure CSS, no extra JS/paint cost. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, color-mix(in srgb, var(--color-sky) 12%, transparent), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--color-orange)" }}
      />

      <div className="absolute top-0 right-0 left-0 z-10 flex gap-1.5 p-3">
        {SCENES.map((s, index) => (
          <button
            key={s}
            type="button"
            onClick={() => setActive(index)}
            aria-label={t(`hero.reel.${s}.label`)}
            aria-current={index === active}
            className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200"
          >
            <span
              className="block h-full origin-left rounded-full bg-teal-deep"
              style={
                index < active || (index === active && shouldReduceMotion)
                  ? { transform: "scaleX(1)" }
                  : index > active
                    ? { transform: "scaleX(0)" }
                    : {
                        animation: `softhr-reel-progress ${SCENE_DURATION_MS}ms linear forwards`,
                      }
              }
            />
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${scene}-${cycle}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="flex h-full w-full items-center justify-center p-8 pt-14"
        >
          {scene === "payroll" && <PayrollScene t={t} />}
          {scene === "leave" && <LeaveScene t={t} />}
          {scene === "dashboard" && <DashboardScene t={t} />}
          {scene === "askTija" && <AskTijaScene t={t} />}
        </motion.div>
      </AnimatePresence>

      <style>{`
        @keyframes softhr-reel-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}
