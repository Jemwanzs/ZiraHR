import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { NavBar } from "@/components/navigation/NavBar";
import { RouteProgressBar } from "@/components/navigation/RouteProgressBar";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCta } from "@/components/navigation/StickyMobileCta";
import { OrganizationStructuredData } from "@/components/seo/StructuredData";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { CookieConsentBanner } from "@/components/cookie-consent/CookieConsentBanner";
import "../globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zira-hr-jms.vercel.app";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Tints the mobile browser chrome (address bar / task-switcher card) with
// the brand teal instead of the browser's default — small polish, easy to
// miss but noticeable when absent on a real phone.
export const viewport: Viewport = {
  themeColor: "#0B4F6C",
};

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
      default: "SoftHR — One place to run your entire people operation.",
      template: "%s | SoftHR",
    },
    description: t("supporting"),
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [
            l,
            l === routing.defaultLocale ? "/" : `/${l}`,
          ]),
        ),
        "x-default": "/",
      },
    },
    openGraph: {
      title: "SoftHR — One place to run your entire people operation.",
      description: t("supporting"),
      url: path,
      siteName: "SoftHR",
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "SoftHR — One place to run your entire people operation.",
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
            <RouteProgressBar />
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
            <CookieConsentBanner />
          </MotionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
