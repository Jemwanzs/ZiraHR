import { getTranslations } from "next-intl/server";
import { TypingIndicator } from "@/components/ui/TypingIndicator";

/**
 * A real illustrated chat mockup for the Ask TiJa interface slot — reuses
 * the same example exchange as HeroProductReel's AskTijaScene
 * (hero.reel.askTija) rather than inventing new content, so the two stay
 * consistent. Static (no client component needed here since AskTijaSection
 * already wraps this in a server-safe Reveal), but composed to still read
 * as a live interface: a question bubble, a "thinking" beat, and the
 * answer — not a blank placeholder box.
 */
export async function AskTijaInterfaceMockup() {
  const t = await getTranslations("hero.reel.askTija");

  return (
    <div className="relative flex aspect-video flex-col justify-end gap-3 overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-5">
      <span className="absolute top-3 right-3 rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white/70 uppercase">
        Preview
      </span>

      <div className="flex justify-end">
        <p className="max-w-[75%] rounded-2xl rounded-br-sm bg-white/15 px-4 py-2.5 text-sm text-white">
          {t("question")}
        </p>
      </div>

      <div className="flex items-end gap-2">
        <span
          aria-hidden="true"
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-orange text-xs font-bold text-white"
        >
          T
        </span>
        <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-sm text-gray-800 shadow-sm">
          {t("answer")}
        </div>
      </div>

      <div className="flex items-center gap-2 pl-9 text-white/40">
        <TypingIndicator />
      </div>
    </div>
  );
}
