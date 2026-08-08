import { useTranslations } from "next-intl";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function FinalCtaSection() {
  const t = useTranslations("finalCta");
  const tCta = useTranslations("cta");

  return (
    <Section tone="white" className="text-center">
      <Reveal>
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-gray-900 sm:text-4xl">
          {t("headline")}
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/signup" showArrow>
            {tCta("startWithZiraHR")}
          </Button>
          <Button href="/request-demo" variant="secondary">
            {tCta("requestDemo")}
          </Button>
        </div>
      </Reveal>
    </Section>
  );
}
