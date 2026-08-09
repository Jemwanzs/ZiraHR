import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/layout/Section";
import { SignupWizard } from "@/components/forms/SignupWizard";
import { buildPageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "forms.signup" });
  return buildPageMetadata({
    locale,
    route: "/signup",
    title: t("step1.title"),
    description: t("metaDescription"),
  });
}

export default async function SignupPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="flex flex-1 flex-col">
      <Section tone="cream">
        <SignupWizard />
      </Section>
    </main>
  );
}
