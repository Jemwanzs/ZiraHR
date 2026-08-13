"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type NavDropdownProps = {
  label: string;
  panel: ReactNode;
  /** Mega menu panels span the full nav width; simple dropdowns don't. */
  fullWidth?: boolean;
};

/**
 * Shared open/close + hover/keyboard mechanics for both the Platform mega
 * menu and the simpler Solutions dropdown — see
 * docs/02-ux/website-information-architecture.md.
 */
export function NavDropdown({ label, panel, fullWidth }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        containerRef.current?.querySelector("button")?.focus();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function openNow() {
    window.clearTimeout(closeTimeout.current);
    setOpen(true);
  }

  function closeSoon() {
    closeTimeout.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openNow}
      onMouseLeave={closeSoon}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-deep"
      >
        {label}
        <span
          aria-hidden="true"
          className={`text-xs transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div
          className={`absolute top-full left-0 z-50 mt-2 rounded-2xl border border-gray-200 bg-white shadow-xl ${
            fullWidth ? "w-screen max-w-3xl" : "w-64"
          }`}
        >
          {panel}
        </div>
      )}
    </div>
  );
}
