"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

/**
 * Mobile-only sticky bottom CTA bar, appears once the visitor scrolls past
 * the initial viewport — see docs/02-ux/responsive-behaviour.md. Desktop
 * relies on the always-visible sticky nav CTA instead (no bottom bar there).
 */
export function StickyMobileCta() {
  const tCta = useTranslations("cta");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white/95 p-3 backdrop-blur-md transition-transform duration-300 lg:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Button href="/signup" showArrow className="w-full justify-center">
        {tCta("startWithZiraHR")}
      </Button>
    </div>
  );
}
