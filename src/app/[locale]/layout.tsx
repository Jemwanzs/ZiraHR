import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NavBar } from "@/components/navigation/NavBar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/navigation/StickyMobileCta";
import { OrganizationStructuredData } from "@/components/seo/StructuredData";
import { MotionProvider } from "@/components/motion/MotionProvider";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zirahr.com";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  const isDefault = locale === routing.defaultLocale;
  const path = isDefault ? "/" : `/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: "ZiraHR — One place to run your entire people operation.",
      template: "%s | ZiraHR",
    },
    description: t("supporting"),
    alternates: {
      canonical: path,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          l === routing.defaultLocale ? "/" : `/${l}`,
        ]),
      ),
    },
    openGraph: {
      title: "ZiraHR — One place to run your entire people operation.",
      description: t("supporting"),
      url: path,
      siteName: "ZiraHR",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "ZiraHR — One place to run your entire people operation.",
      description: t("supporting"),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this locale (see next-intl docs on
  // setRequestLocale) rather than forcing every page to dynamic-render.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html lang={locale} className={`${outfit.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-cream text-gray-900 antialiased">
        <OrganizationStructuredData />
        <NextIntlClientProvider>
          <MotionProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-teal focus:px-4 focus:py-2 focus:text-white"
            >
              {t("skipToContent")}
            </a>
            <NavBar />
            <div id="main-content" className="flex flex-1 flex-col">
              {children}
            </div>
            <Footer />
            <StickyMobileCta />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
