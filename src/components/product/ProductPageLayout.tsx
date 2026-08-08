import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { ScreenshotSlot } from "@/components/media/ScreenshotSlot";
import { Reveal } from "@/components/motion/Reveal";
import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";

type ConnectsTo = { label: string; href: string };

type ProductPageLayoutProps = {
  breadcrumbs: Crumb[];
  eyebrow: string;
  headline: string;
  supporting: string;
  heroSlot: string;
  /** Either a flat capability checklist (e.g. Core HR)... */
  capabilities?: string[];
  /** ...or a workflow chain (e.g. Payroll: Draft -> Review -> ... -> Disburse). */
  flowSteps?: string[];
  connectsToHeadline: string;
  connectsTo: ConnectsTo[];
  ctaHeadline: string;
  children?: ReactNode;
};

/**
 * Shared skeleton for every module/product page — see
 * docs/02-ux/product-pages.md ("Shared page template"). Keeps the visual
 * language consistent while each page's translated copy stays unique.
 */
export function ProductPageLayout({
  breadcrumbs,
  eyebrow,
  headline,
  supporting,
  heroSlot,
  capabilities,
  flowSteps,
  connectsToHeadline,
  connectsTo,
  ctaHeadline,
  children,
}: ProductPageLayoutProps) {
  const tCta = useTranslations("cta");

  return (
    <main className="flex flex-1 flex-col">
      <Section tone="cream" className="pt-8 pb-8 sm:pt-12">
        <Breadcrumbs items={breadcrumbs} />
        <div className="mt-6 grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold tracking-wide text-teal">
              {eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl">
              {headline}
            </h1>
            <p className="mt-4 text-lg text-gray-600">{supporting}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/signup" showArrow>
                {tCta("startWithZiraHR")}
              </Button>
              <Button href="/request-demo" variant="secondary">
                {tCta("requestDemo")}
              </Button>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ScreenshotSlot
              slot={heroSlot}
              alt={headline}
              label={headline}
              aspect="wide"
              priority
            />
          </Reveal>
        </div>
      </Section>

      {flowSteps && (
        <Section tone="white">
          <Reveal className="flex flex-wrap items-center justify-center gap-3">
            {flowSteps.map((step, index) => (
              <span key={step} className="flex items-center gap-3">
                <span className="rounded-full border border-gray-200 bg-cream px-4 py-2 text-sm font-medium text-gray-700">
                  {step}
                </span>
                {index < flowSteps.length - 1 && (
                  <span aria-hidden="true" className="text-gray-300">
                    →
                  </span>
                )}
              </span>
            ))}
          </Reveal>
        </Section>
      )}

      {capabilities && (
        <Section tone="white">
          <Reveal className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {capabilities.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <span aria-hidden="true" className="text-teal">
                  ✓
                </span>
                {item}
              </div>
            ))}
          </Reveal>
        </Section>
      )}

      {children}

      <Section tone="cream">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {connectsToHeadline}
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {connectsTo.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-teal hover:text-teal"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section tone="white" className="text-center">
        <Reveal>
          <h2 className="mx-auto max-w-xl text-2xl font-semibold text-gray-900 sm:text-3xl">
            {ctaHeadline}
          </h2>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Button href="/signup" showArrow>
              {tCta("startWithZiraHR")}
            </Button>
            <Button href="/request-demo" variant="secondary">
              {tCta("requestDemo")}
            </Button>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}
