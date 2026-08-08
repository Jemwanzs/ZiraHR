import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import { Reveal } from "@/components/motion/Reveal";

/**
 * scope §16 — major homepage section. Desktop + mobile shown together;
 * capability checklist rather than paragraphs.
 */
export function EssSection() {
  const t = useTranslations("ess");
  const capabilities = t.raw("capabilities") as string[];

  return (
    <Section tone="cream">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold tracking-wide text-teal">
            {t("eyebrow")}
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
            {t("headline")}
          </h2>
          <p className="mt-3 text-lg text-gray-600">{t("supporting")}</p>
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {capabilities.map((item) => (
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
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
          <ScreenshotSlot
            slot="ess.desktop"
            alt="ESS desktop layout"
            label="ESS — Desktop"
            aspect="portrait"
          />
          <ScreenshotSlot
            slot="ess.mobile"
            alt="ESS mobile layout"
            label="ESS — Mobile"
            aspect="portrait"
          />
        </Reveal>
      </div>
    </Section>
  );
}
