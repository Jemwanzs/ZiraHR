"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SOLUTIONS_ITEMS } from "@/components/navigation/navData";

export function SolutionsMenuPanel() {
  const t = useTranslations("nav.solutionsMenu");

  return (
    <ul className="flex flex-col gap-1 p-3">
      {SOLUTIONS_ITEMS.map((item) => (
        <li key={item.key}>
          <Link
            href={item.href}
            className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-teal-deep"
          >
            {t(item.key)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
