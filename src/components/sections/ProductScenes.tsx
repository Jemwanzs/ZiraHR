"use client";

import { useEffect, useState } from "react";
import type { useTranslations } from "next-intl";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "motion/react";

/**
 * Illustrated "sample screen" scenes reused by both HeroProductReel (the
 * homepage hero) and ProductTourSection ("see it in action, before you
 * sign up") — extracted here so the two places that need a live-feeling
 * simulated interface share one implementation instead of drifting apart.
 * Every scene reuses copy already established elsewhere on the site
 * (payroll's Draft->...->Disburse chain, the approvals queue, Ask TiJa's
 * example prompts, the "Amina" persona from the Employee Journey section)
 * rather than inventing new claims, names, or numbers.
 */

export type SceneProps = { t: ReturnType<typeof useTranslations> };

export function PayrollScene({ t }: SceneProps) {
  const steps = t.raw("hero.reel.payroll.steps") as string[];
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <p className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
        {t("hero.reel.payroll.label")}
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
        {t("hero.reel.payroll.result")}
      </motion.p>
    </div>
  );
}

export function LeaveScene({ t }: SceneProps) {
  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-gray-900">{t("hero.reel.leave.requestTitle")}</p>
      <p className="mt-1 text-xs text-gray-500">{t("hero.reel.leave.requester")}</p>
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
            {t("hero.reel.leave.pending")}
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 2.2, times: [0, 0.55, 0.6] }}
            className="absolute inset-0 text-sm font-medium text-gray-700"
          >
            {t("hero.reel.leave.approved")}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}

export function DashboardScene({ t }: SceneProps) {
  const stats = ["employees", "leaveApprovals", "payrollReady"] as const;
  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-3">
      {stats.map((stat, index) => (
        <div
          key={stat}
          className="rounded-xl border border-gray-200 bg-cream px-3 py-4 text-center"
        >
          <AnimatedCounter
            value={t.raw(`hero.reel.dashboard.stats.${stat}.value`) as number}
            suffix={(t.raw(`hero.reel.dashboard.stats.${stat}.suffix`) as string | undefined) ?? ""}
            delay={index * 0.15}
          />
          <p className="mt-1 text-[11px] text-gray-500">
            {t(`hero.reel.dashboard.stats.${stat}.label`)}
          </p>
        </div>
      ))}
    </div>
  );
}

export function AnimatedCounter({
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

export function AskTijaScene({ t }: SceneProps) {
  const question = t("hero.reel.askTija.question") as string;
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full max-w-md rounded-xl bg-teal p-5 text-white shadow-sm">
      <p className="text-xs font-semibold tracking-wide text-white/60 uppercase">
        {t("hero.reel.askTija.label")}
      </p>
      <p className="mt-2 text-sm">
        {shouldReduceMotion ? question : <TypedText text={question} />}
      </p>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.4 }}
        className="mt-3 border-t border-white/15 pt-3 text-sm text-white/85"
      >
        {t("hero.reel.askTija.answer")}
      </motion.p>
    </div>
  );
}

function TypedText({ text }: { text: string }) {
  // No mount-effect reset needed — this component's parent scene remounts
  // fresh every reel cycle/tab switch (always keyed by its parent), so the
  // lazy "" initial state is already correct each time; setShown below
  // only ever runs inside the interval callback, not the effect body
  // directly.
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

/**
 * Reuses the approvals queue's leave-request example (same
 * action/requester text shown in ApprovalsSection's queue list) and plays
 * out an approve action rather than just a static card.
 */
export function ApproveRequestScene({ t }: SceneProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="relative w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-gray-900">
        {t("approvals.queue.items.leaveRequest.action")}
      </p>
      <p className="mt-1 text-xs text-gray-500">
        {t("approvals.queue.items.leaveRequest.requester")}
      </p>
      <div className="mt-4 flex gap-2">
        <span className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500">
          {t("approvals.queue.statusLabels.pending")}
        </span>
      </div>
      <motion.div
        initial={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.35, ease: "backOut" }}
        className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-teal text-white shadow-md"
        aria-hidden="true"
      >
        ✓
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.3 }}
        className="mt-3 text-sm font-semibold text-teal"
      >
        {t("approvals.queue.statusLabels.approved")}
      </motion.p>
    </div>
  );
}

// Full paths used above already resolve from a root-scoped `t`
// (useTranslations() with no namespace) — see ProductTourSection.tsx and
// HeroProductReel.tsx for how `t` is constructed for these scenes.

/**
 * The "Amina" persona already established in the homepage's Employee
 * Journey section — reused here rather than inventing a new fictional
 * employee. No fabricated details (title, email, salary): just the name
 * and a few of the modules her one record connects to.
 */
export function EmployeeProfileScene({ t }: SceneProps) {
  const linkedModules = ["payroll", "leave", "performance"] as const;
  return (
    <div className="flex w-full max-w-sm items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <span
        aria-hidden="true"
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal text-lg font-semibold text-white"
      >
        A
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900">Amina</p>
        <p className="text-xs text-gray-500">{t("employeeJourney.stages.employee")}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {linkedModules.map((mod, index) => (
            <motion.span
              key={mod}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.3 }}
              className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-medium text-gray-700"
            >
              {t(`connectedRecord.nodes.${mod}`)}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}
