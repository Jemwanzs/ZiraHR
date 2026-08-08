import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/sections/HeroSection";
import { EmployeeJourneySection } from "@/components/sections/EmployeeJourneySection";
import { ConnectedRecordSection } from "@/components/sections/ConnectedRecordSection";
import { ModuleShowcaseSection } from "@/components/sections/ModuleShowcaseSection";
import { EssSection } from "@/components/sections/EssSection";
import { FlexibilitySection } from "@/components/sections/FlexibilitySection";
import { ApprovalsSection } from "@/components/sections/ApprovalsSection";
import { AskTijaSection } from "@/components/sections/AskTijaSection";
import { DashboardsSection } from "@/components/sections/DashboardsSection";
import { MultiRegionSection } from "@/components/sections/MultiRegionSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { ProductTourSection } from "@/components/sections/ProductTourSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * The twelve-beat homepage story from docs/02-ux/homepage-scope.md and
 * scope §40. Customer Proof (beat 13) is intentionally omitted — it stays
 * built but unrendered until real, verified customers/testimonials exist
 * (docs/02-ux/homepage-scope.md, docs/09-qa/launch-checklist.md).
 */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <EmployeeJourneySection />
      <ConnectedRecordSection />
      <ModuleShowcaseSection />
      <EssSection />
      <FlexibilitySection />
      <ApprovalsSection />
      <AskTijaSection />
      <DashboardsSection />
      <MultiRegionSection />
      <SecuritySection />
      <ProductTourSection />
      <FinalCtaSection />
    </main>
  );
}
