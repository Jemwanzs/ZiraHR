import { getTranslations, setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

/**
 * Temporary scaffold-verification homepage (Phase 2). The full twelve-beat
 * homepage story from docs/02-ux/homepage-scope.md is built in Phase 4 —
 * this only proves the locale routing, translation, font, and design-token
 * pipeline works end-to-end before real sections are layered on top.
 */
export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("hero");
  const cta = await getTranslations("cta");

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <p className="text-sm font-semibold tracking-wide text-teal">
        {t("eyebrow")}
      </p>
      <h1 className="max-w-3xl text-4xl font-semibold text-gray-900 sm:text-5xl">
        {t("headline")}
      </h1>
      <p className="max-w-xl text-lg text-gray-600">{t("supporting")}</p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
        <span className="rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white">
          {cta("startWithZiraHR")} →
        </span>
        <span className="rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900">
          {cta("requestDemo")}
        </span>
      </div>
    </main>
  );
}
