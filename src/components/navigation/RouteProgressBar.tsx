"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Slim top-of-page progress bar shown the instant any internal link is
 * clicked, gone the instant the new route has rendered — so a navigation
 * never reads as "the page froze," even in the rare case a route isn't
 * already prefetched (slow network, or a click that lands before
 * hydration finishes, when Next.js falls back to a full browser
 * navigation). Most navigations here are prefetched static routes and
 * resolve in well under 100ms; this exists for the tail case, not because
 * routing is actually slow.
 */
export function RouteProgressBar() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      // Note: next/link's own click handler calls preventDefault() as part
      // of normal client-side routing — checking event.defaultPrevented
      // here would skip exactly the navigations this is meant to catch.
      if (event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }

      setActive(true);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  useEffect(() => {
    // Pathname change = the new route has committed. Hold the bar at
    // "done" for one beat instead of snapping it away instantly, so a
    // very fast navigation still reads as a deliberate transition.
    if (!active) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setActive(false), 150);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      aria-hidden="true"
      data-route-progress={active ? "active" : "idle"}
      className={`pointer-events-none fixed inset-x-0 top-0 z-[70] h-0.5 bg-teal transition-[transform,opacity] duration-300 ease-out ${
        active ? "origin-left scale-x-100 opacity-100" : "origin-left scale-x-0 opacity-0"
      }`}
      style={{ transitionDuration: active ? "600ms" : "200ms" }}
    />
  );
}
