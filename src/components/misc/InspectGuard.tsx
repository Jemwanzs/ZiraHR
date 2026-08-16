"use client";

import { useEffect } from "react";

/**
 * Deliberate deterrent, not real protection — see
 * docs/06-technical/security.md. Blocks the context menu and the common
 * DevTools-opening shortcuts. Any determined visitor can still reach
 * DevTools via the browser's own menu, and nothing on the web platform can
 * block OS-level screenshots (Print Screen, phone screenshot gestures) —
 * this only raises friction for casual right-click/shortcut use.
 */
export function InspectGuard() {
  useEffect(() => {
    function handleContextMenu(event: MouseEvent) {
      event.preventDefault();
    }

    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toUpperCase();

      if (key === "F12") {
        event.preventDefault();
        return;
      }

      const ctrlOrCmd = event.ctrlKey || event.metaKey;
      if (!ctrlOrCmd) return;

      // DevTools (Inspect/Console) and View Source shortcuts.
      if (event.shiftKey && (key === "I" || key === "J" || key === "C")) {
        event.preventDefault();
        return;
      }
      if (key === "U") {
        event.preventDefault();
      }
    }

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
