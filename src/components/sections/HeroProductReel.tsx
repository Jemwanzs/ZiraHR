"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";

const SCENES = ["payroll", "leave", "dashboard", "askTija"] as const;
const SCENE_DURATION_MS = 4000;

/**
 * The hero's animated "advert" — a self-contained, code-built product reel
 * (no video file) cycling through four short scenes, per explicit client
 * direction ("a demo video clip or advertisement short clip... designed
 * and animated by claude code here just for zirahr"). Each scene reuses
 * content/wording already established elsewhere on the site (Payroll's
 * Draft->...->Disburse chain, the Approvals queue's "Pending"/"Approved"
 * pattern, Ask TiJa's example prompts) rather than inventing new claims.
 *
 * Deliberately a separate client component mounted *after* the plain-text
 * hero content, not wrapping it — see docs/06-technical/performance.md's
 * Phase 9 note on why the hero text itself must never be gated behind
 * client JS/animation.
 */
export function HeroProductReel() {
  const t = useTranslations("hero.reel");
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
    <div className="relative mx-auto aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="absolute top-0 right-0 left-0 z-10 flex gap-1.5 p-3">
        {SCENES.map((s, index) => (
          <button
            key={s}
            type="button"
            onClick={() => setActive(index)}
            aria-label={t(`${s}.label`)}
            aria-current={index === active}
            className="h-1 flex-1 overflow-hidden rounded-full bg-gray-200"
          >
            <span
              className="block h-full origin-left rounded-full bg-teal"
              style={
                index < active || (index === active && shouldReduceMotion)
                  ? { transform: "scaleX(1)" }
                  : index > active
                    ? { transform: "scaleX(0)" }
                    : {
                        animation: `zirahr-reel-progress ${SCENE_DURATION_MS}ms linear forwards`,
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
        @keyframes zirahr-reel-progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>
    </div>
  );
}

type SceneProps = { t: ReturnType<typeof useTranslations> };

function PayrollScene({ t }: SceneProps) {
  const steps = t.raw("payroll.steps") as string[];
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
        {t("payroll.label")}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {steps.map((step, index) => (
          <motion.span
            key={step}
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.5, duration: 0.3 }}
            className="rounded-full border border-gray-200 bg-cream px-3 py-1.5 text-sm font-medium text-gray-800"
          >
            {step}
          </motion.span>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: steps.length * 0.5, duration: 0.4 }}
        className="flex items-center gap-1.5 text-sm font-semibold text-teal"
      >
        <span aria-hidden="true">✓</span>
        {t("payroll.result")}
      </motion.p>
    </div>
  );
}

function LeaveScene({ t }: SceneProps) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-gray-900">{t("leave.requestTitle")}</p>
      <p className="mt-1 text-xs text-gray-500">{t("leave.requester")}</p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 flex items-center gap-2"
      >
        <motion.span
          animate={{ backgroundColor: ["#F2994A", "#F2994A", "#0B4F6C"] }}
          transition={{ duration: 2.2, times: [0, 0.55, 1] }}
          className="h-2.5 w-2.5 rounded-full"
        />
        <div className="relative h-5 w-24">
          <motion.span
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0] }}
            transition={{ duration: 2.2, times: [0, 0.55, 0.56] }}
            className="absolute inset-0 text-sm font-medium text-gray-700"
          >
            {t("leave.pending")}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 2.2, times: [0, 0.55, 0.6] }}
            className="absolute inset-0 text-sm font-medium text-gray-700"
          >
            {t("leave.approved")}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

function DashboardScene({ t }: SceneProps) {
  const stats = ["employees", "leaveApprovals", "payrollReady"] as const;
  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <div
          key={stat}
          className="rounded-xl border border-gray-200 bg-cream px-3 py-4 text-center"
        >
          <AnimatedCounter
            value={t.raw(`dashboard.stats.${stat}.value`) as number}
            suffix={(t.raw(`dashboard.stats.${stat}.suffix`) as string | undefined) ?? ""}
            delay={index * 0.15}
          />
          <p className="mt-1 text-[11px] text-gray-500">
            {t(`dashboard.stats.${stat}.label`)}
          </p>
        </div>
      ))}
    </div>
  );
}

function AnimatedCounter({
  value,
  suffix,
  delay,
}: {
  value: number;
  suffix: string;
  delay: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  // Lazy initializer, not a mount-effect setState — reduced-motion just
  // shows the final value immediately, nothing to subscribe to.
  const [display, setDisplay] = useState(() => (shouldReduceMotion ? value : 0));

  useEffect(() => {
    if (shouldReduceMotion) return;
    // setDisplay here runs inside Motion's change-event callback, not
    // synchronously in the effect body — the pattern React's own
    // react-hooks/set-state-in-effect rule asks for.
    const unsubscribe = rounded.on("change", setDisplay);
    const controls = animate(count, value, { duration: 1.1, delay });
    return () => {
      unsubscribe();
      controls.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, delay]);

  return (
    <p className="text-xl font-semibold text-gray-900">
      {display}
      {suffix}
    </p>
  );
}

function AskTijaScene({ t }: SceneProps) {
  const question = t("askTija.question") as string;
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-md rounded-xl bg-teal p-5 text-white shadow-sm">
      <p className="text-xs font-semibold tracking-wide text-white/60 uppercase">
        {t("askTija.label")}
      </p>
      <p className="mt-2 text-sm">
        {shouldReduceMotion ? (
          question
        ) : (
          <TypedText text={question} />
        )}
      </p>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.4 }}
        className="mt-3 border-t border-white/15 pt-3 text-sm text-white/85"
      >
        {t("askTija.answer")}
      </motion.p>
    </div>
  );
}

function TypedText({ text }: { text: string }) {
  // No mount-effect reset needed — this component's parent scene remounts
  // fresh every reel cycle (keyed by `${scene}-${cycle}`), so the lazy ""
  // initial state is already correct each time; setShown below only ever
  // runs inside the interval callback, not the effect body directly.
  const [shown, setShown] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index += 1;
      setShown(text.slice(0, index));
      if (index >= text.length) clearInterval(interval);
    }, 28);
    return () => clearInterval(interval);
  }, [text]);

  return <>{shown}</>;
}
