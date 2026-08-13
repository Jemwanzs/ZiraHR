import { getTranslations } from "next-intl/server";

/**
 * Real illustrated mockup for the Teams & Collaboration product page's hero
 * slot, replacing the generic ScreenshotSlot placeholder — same intent as
 * AskTijaInterfaceMockup.tsx (a designed illustration, not a fabricated
 * screenshot). Unlike Ask TiJa's mockup, this card sits on the page's
 * regular cream/white canvas rather than a fixed-dark panel, so it uses the
 * normal theme-tracking tokens (bg-white/bg-cream/text-gray-*) instead of
 * the --color-overlay fixed-white token. "Amina" is the persona already
 * established in the homepage's Employee Journey section — reused rather
 * than inventing a new fictional employee.
 */
export async function TeamsCollaborationMockup() {
  const t = await getTranslations("pages.teamsCollaborationMockup");
  const channels = t.raw("channels") as string[];
  const activeChannel = t("activeChannel");

  return (
    <div className="relative flex aspect-video overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <span className="absolute top-3 right-3 z-10 rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-gray-500 uppercase">
        Preview
      </span>

      <div className="hidden w-2/5 shrink-0 flex-col gap-1 border-r border-gray-200 bg-cream p-4 sm:flex">
        <p className="mb-1 text-[10px] font-semibold tracking-wide text-gray-400 uppercase">
          {t("channelsLabel")}
        </p>
        {channels.map((channel) => (
          <span
            key={channel}
            className={`truncate rounded-lg px-2.5 py-1.5 text-left text-sm font-medium ${
              channel === activeChannel
                ? "bg-teal text-overlay"
                : "text-gray-600"
            }`}
          >
            # {channel}
          </span>
        ))}

        <div className="mt-auto flex items-center gap-1.5 pt-3">
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-teal text-[10px] font-bold text-overlay"
          >
            A
          </span>
          <span
            aria-hidden="true"
            className="flex h-6 w-6 items-center justify-center rounded-full bg-orange text-[10px] font-bold text-overlay"
          >
            +2
          </span>
          <span className="text-[11px] text-gray-500">{t("membersLabel")}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-end gap-3 p-5">
        <p className="text-xs font-semibold text-gray-400"># {activeChannel}</p>

        <div className="flex items-end gap-2">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal text-xs font-bold text-overlay"
          >
            A
          </span>
          <p className="max-w-[80%] rounded-2xl rounded-bl-sm bg-cream px-4 py-2.5 text-sm text-gray-800">
            {t("messages.amina")}
          </p>
        </div>

        <div className="flex justify-end">
          <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-teal px-4 py-2.5 text-sm text-overlay">
            {t("messages.you")}
          </p>
        </div>
      </div>
    </div>
  );
}
