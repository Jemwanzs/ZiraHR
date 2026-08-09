import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import { Reveal } from "@/components/motion/Reveal";

const PROMPT_KEYS = [
  "contractsExpiring",
  "pendingLeave",
  "payrollVariance",
  "missingBankDetails",
] as const;

/**
 * scope §19 — the one section permitted to break the cream/white canvas
 * with a dark background (deliberate visual interruption). Positioned as
 * workforce intelligence, never as a generic chatbot.
 */
export function AskTijaSection() {
  const t = useTranslations("askTija");

  return (
    <Section tone="teal">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          {/* Brand orange is ~3.9:1 against the teal background here — just
              under WCAG AA's 4.5:1 for text this size. A lighter tint keeps
              the "energy accent" intent while passing contrast (~5:1). */}
          <p className="text-sm font-semibold tracking-wide text-[#FBB768]">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
            {t("headline")}
          </h2>
          <p className="mt-3 text-white/70">{t("positioning")}</p>

          <ul className="mt-8 flex flex-col gap-3">
            {PROMPT_KEYS.map((key) => (
              <li
                key={key}
                className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/90"
              >
                &ldquo;{t(`prompts.${key}`)}&rdquo;
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <ScreenshotSlot
            slot="askTija.interface"
            alt="Ask TiJa interface"
            label="Ask TiJa"
            aspect="video"
            tone="dark"
          />
        </Reveal>
      </div>
    </Section>
  );
}
