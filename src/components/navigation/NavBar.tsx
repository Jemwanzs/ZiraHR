"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/ui/Logo";
import { LanguageSelector } from "@/components/navigation/LanguageSelector";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { NavDropdown } from "@/components/navigation/NavDropdown";
import { PlatformMegaMenuPanel } from "@/components/navigation/PlatformMegaMenuPanel";
import { SolutionsMenuPanel } from "@/components/navigation/SolutionsMenuPanel";
import { MobileDrawer } from "@/components/navigation/MobileDrawer";
import {
  PHONE_NUMBER_DISPLAY,
  PHONE_NUMBER_TEL,
  SIMPLE_NAV_LINKS,
} from "@/components/navigation/navData";
import { PhoneIcon } from "@/components/navigation/PhoneIcon";

/**
 * Sticky nav with a subtle glass/blur transition after scrolling — see
 * docs/02-ux/website-information-architecture.md.
 */
export function NavBar() {
  const tNav = useTranslations("nav");
  const tCta = useTranslations("cta");
  const tCommon = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 24);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-gray-200 bg-white/80 backdrop-blur-md"
            : "border-b border-transparent bg-cream"
        }`}
      >
        <Container className="flex h-16 items-center justify-between gap-4">
          <Link href="/" aria-label={tCommon("brandName")}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <NavDropdown
              label={tNav("platform")}
              panel={<PlatformMegaMenuPanel />}
              fullWidth
            />
            <NavDropdown
              label={tNav("solutions")}
              panel={<SolutionsMenuPanel />}
            />
            {SIMPLE_NAV_LINKS.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                {tNav(link.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={`tel:${PHONE_NUMBER_TEL}`}
              aria-label={tCta("callUsAria", { number: PHONE_NUMBER_DISPLAY })}
              className="flex items-center gap-2 rounded-full bg-orange px-4 py-2 text-sm font-semibold text-overlay transition-colors hover:bg-orange-deep"
            >
              <PhoneIcon className="h-4 w-4" />
              {PHONE_NUMBER_DISPLAY}
            </a>
            <ThemeToggle />
            <LanguageSelector />
            <Link
              href="/login"
              className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
            >
              {tCta("login")}
            </Link>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <a
              href={`tel:${PHONE_NUMBER_TEL}`}
              aria-label={tCta("callUsAria", { number: PHONE_NUMBER_DISPLAY })}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-orange text-overlay"
            >
              <PhoneIcon className="h-4.5 w-4.5" />
            </a>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-gray-900"
            >
              <span aria-hidden="true" className="text-xl">
                ☰
              </span>
            </button>
          </div>
        </Container>
      </header>

      {/* Rendered as a sibling of <header>, not a child — <header> gets
          backdrop-blur-md once scrolled, and backdrop-filter creates a new
          containing block for position:fixed descendants per spec. With
          MobileDrawer nested inside <header>, opening the drawer after
          scrolling positioned it relative to the small sticky header box
          instead of the viewport, producing an overlapping/floating mess
          instead of a proper full-screen overlay. */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
