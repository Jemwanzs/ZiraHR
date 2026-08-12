import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import { Reveal } from "@/components/motion/Reveal";
import { CapabilityCloud } from "@/components/ui/CapabilityCloud";
import { SectionLabel } from "@/components/ui/SectionLabel";

/**
 * scope §16 — major homepage section. Desktop + mobile shown together;
 * capability cloud rather than paragraphs or a long checklist.
 */
export function EssSection() {
  const t = useTranslations("ess");
  const capabilities = t.raw("capabilities") as string[];

  return (
    <Section tone="cream">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionLabel index={4}>{t("eyebrow")}</SectionLabel>
          <h2 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl">
            {t("headline")}
          </h2>
          <p className="mt-3 text-lg text-gray-600">{t("supporting")}</p>
          <CapabilityCloud items={capabilities} className="mt-8 flex flex-wrap gap-2.5" />
        </Reveal>

        <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
          <ScreenshotSlot
            slot="ess.desktop"
            alt="ESS desktop layout"
            label="ESS — Desktop"
            aspect="portrait"
            icon="directory"
          />
          <ScreenshotSlot
            slot="ess.mobile"
            alt="ESS mobile layout"
            label="ESS — Mobile"
            aspect="portrait"
            icon="leave"
          />
        </Reveal>
      </div>
    </Section>
  );
}
