"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { FlagIcon } from "@/components/ui/FlagIcon";

/**
 * Compact flag + language-code switcher. Previously flag-only via Unicode
 * emoji, which rendered as raw text ("GB", "FR", "KE") on Windows — Windows
 * fonts have no glyphs for regional-indicator emoji pairs. Real inline SVG
 * flags (FlagIcon) fix that regardless of OS/font support. Locale
 * persistence across reloads is handled by next-intl's middleware (NEXT_LOCALE
 * cookie, set automatically on every request) — nothing extra needed here.
 */
export function LanguageSelector() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("languageSelector");
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      const currentIndex = routing.locales.indexOf(locale);

      if (event.key === "Escape") {
        setOpen(false);
        containerRef.current?.querySelector("button")?.focus();
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const direction = event.key === "ArrowDown" ? 1 : -1;
        const nextIndex =
          (currentIndex + direction + routing.locales.length) %
          routing.locales.length;
        itemRefs.current[nextIndex]?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, locale]);

  function selectLocale(next: AppLocale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("label")}
        onClick={() => setOpen((value) => !value)}
        className="flex h-9 items-center gap-1.5 rounded-full border border-gray-200 px-2.5 text-xs font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        <FlagIcon locale={locale} />
        <span>{locale.toUpperCase()}</span>
        <svg
          viewBox="0 0 12 8"
          aria-hidden="true"
          className={`h-2 w-2.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 1.5 6 6.5 11 1.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            aria-label={t("label")}
            initial={{ opacity: 0, scale: 0.96, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -6 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 z-50 mt-2 w-48 origin-top-right overflow-hidden rounded-2xl border border-gray-200 bg-white p-1.5 shadow-lg"
          >
            {routing.locales.map((item, index) => {
              const selected = item === locale;
              return (
                <button
                  key={item}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  onClick={() => selectLocale(item)}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                    selected
                      ? "bg-teal/10 text-teal"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <FlagIcon locale={item} />
                  <span className="flex-1 font-medium">{t(`names.${item}`)}</span>
                  <span className="text-xs text-gray-400">{item.toUpperCase()}</span>
                  {selected && (
                    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-teal">
                      <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
