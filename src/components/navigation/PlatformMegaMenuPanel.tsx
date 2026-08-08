"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PLATFORM_GROUPS } from "@/components/navigation/navData";

export function PlatformMegaMenuPanel() {
  const t = useTranslations("nav.megaMenu");

  return (
    <div className="grid grid-cols-2 gap-6 p-6 sm:grid-cols-3 lg:grid-cols-6">
      {PLATFORM_GROUPS.map((group) => (
        <div key={group.key}>
          <p className="mb-3 text-xs font-semibold tracking-wide text-gray-500 uppercase">
            {t(`${group.key}.groupLabel`)}
          </p>
          <ul className="flex flex-col gap-2">
            {group.items.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-sm text-gray-700 hover:text-teal"
                >
                  {t(`${group.key}.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
