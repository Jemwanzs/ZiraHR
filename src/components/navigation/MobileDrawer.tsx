"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { LanguageSelector } from "@/components/navigation/LanguageSelector";
import {
  PLATFORM_GROUPS,
  SIMPLE_NAV_LINKS,
  SOLUTIONS_ITEMS,
} from "@/components/navigation/navData";

type MobileDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const tNav = useTranslations("nav");
  const tMega = useTranslations("nav.megaMenu");
  const tSolutions = useTranslations("nav.solutionsMenu");
  const tCta = useTranslations("cta");
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden">
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <LanguageSelector />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-gray-700 hover:bg-gray-100"
        >
          ×
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <div className="mb-2 rounded-xl border border-gray-200">
          {PLATFORM_GROUPS.map((group) => {
            const isExpanded = expandedGroup === group.key;
            return (
              <div key={group.key} className="border-b border-gray-200 last:border-b-0">
                <button
                  type="button"
                  aria-expanded={isExpanded}
                  onClick={() =>
                    setExpandedGroup(isExpanded ? null : group.key)
                  }
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-900"
                >
                  {tMega(`${group.key}.groupLabel`)}
                  <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
                </button>
                {isExpanded && (
                  <ul className="flex flex-col gap-1 px-4 pb-3">
                    {group.items.map((item) => (
                      <li key={item.key}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block py-1.5 text-sm text-gray-600"
                        >
                          {tMega(`${group.key}.${item.key}`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="mb-2 rounded-xl border border-gray-200">
          <div className="border-b border-gray-200 px-4 py-3 text-sm font-semibold text-gray-900">
            {tNav("solutions")}
          </div>
          <ul className="flex flex-col gap-1 px-4 py-3">
            {SOLUTIONS_ITEMS.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block py-1.5 text-sm text-gray-600"
                >
                  {tSolutions(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <ul className="flex flex-col gap-1 rounded-xl border border-gray-200 p-2">
          {SIMPLE_NAV_LINKS.map((link) => (
            <li key={link.key}>
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100"
              >
                {tNav(link.key)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-3 border-t border-gray-200 p-4">
        <Button href="/signup" showArrow onClick={onClose} className="w-full">
          {tCta("startWithZiraHR")}
        </Button>
        <Button
          href="/request-demo"
          variant="secondary"
          onClick={onClose}
          className="w-full"
        >
          {tCta("requestDemo")}
        </Button>
      </div>
    </div>
  );
}
