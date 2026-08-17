"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PhoneIcon } from "@/components/navigation/PhoneIcon";

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

/**
 * Persistent floating action stack on the page edge — the "call button that
 * jumps to the demo form" concept from the M-Gas reference, adapted to
 * SoftHR's actual funnel: the call icon links straight to /request-demo
 * (per explicit direction) rather than dialing out, and a back-to-top
 * button appears above it once there's somewhere to scroll back to.
 *
 * Positioned mid-right rather than bottom-right so it never stacks with
 * StickyMobileCta's bottom bar (mobile) or the cookie consent modal.
 */
export function FloatingCallButton() {
  const tCta = useTranslations("cta");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.6);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Bottom-right and stacked above StickyMobileCta on small screens (a
    // vertically-centered position there lands mid-hero-text on short
    // viewports); only recentered mid-viewport once lg: drops that bottom
    // bar and there's room to the side of the hero content instead.
    <div className="fixed right-4 bottom-24 z-30 flex flex-col items-center gap-2 sm:right-6 lg:top-1/2 lg:bottom-auto lg:-translate-y-1/2">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={tCta("backToTopAria")}
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition-all duration-300 hover:text-teal-deep ${
          showBackToTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-2 opacity-0"
        }`}
      >
        <ArrowUpIcon className="h-4.5 w-4.5" />
      </button>

      <Link
        href="/request-demo"
        aria-label={tCta("floatingCallAria")}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-orange text-overlay shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-orange-deep"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-orange opacity-60 animate-ping"
        />
        <PhoneIcon className="relative h-6 w-6" />
      </Link>
    </div>
  );
}
