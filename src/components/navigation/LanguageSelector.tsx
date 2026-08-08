"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

const FLAGS: Record<AppLocale, string> = {
  en: "🇬🇧",
  fr: "🇫🇷",
  sw: "🇰🇪",
};

/**
 * Flag-only language switcher — deliberately never shows a written language
 * name (see docs/07-localization/localization-strategy.md). The visible
 * flag is decorative; screen readers get the real label via aria-label on
 * every item, so the control stays accessible despite the flag-only visual.
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
        className="flex h-10 w-10 items-center justify-center rounded-full text-xl transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal"
      >
        <span aria-hidden="true">{FLAGS[locale]}</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label={t("label")}
          className="absolute right-0 z-50 mt-2 flex flex-col gap-1 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg"
        >
          {routing.locales.map((item, index) => (
            <button
              key={item}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={item === locale}
              aria-label={t(`switchTo.${item}`)}
              title={t(`switchTo.${item}`)}
              onClick={() => selectLocale(item)}
              className={`flex h-10 w-10 items-center justify-center rounded-full text-xl transition-colors hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal ${
                item === locale ? "bg-gray-100" : ""
              }`}
            >
              <span aria-hidden="true">{FLAGS[item]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
