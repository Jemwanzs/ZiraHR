"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "softhr-theme";
const THEME_COLOR: Record<Theme, string> = {
  light: "#0b4f6c",
  dark: "#0d0f10",
};

// A tiny external store (DOM classList + localStorage) read via
// useSyncExternalStore — the React-native way to synchronize with mutable
// state outside React without a useEffect+setState anti-pattern (which
// also risks a render-after-mount flash). getServerSnapshot matches the
// server-rendered default ("dark" — see layout.tsx); the inline no-flash
// script in layout.tsx has already corrected document.documentElement's
// class by the time any client render happens, so getSnapshot reading it
// directly is always accurate, no effect required to "catch up".
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  for (const listener of listeners) listener();
}

function getSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function applyTheme(next: Theme) {
  document.documentElement.classList.toggle("dark", next === "dark");
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // localStorage unavailable (privacy mode, etc.) — theme still applies
    // for this load, just won't persist.
  }
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", THEME_COLOR[next]);
  notify();
}

type ThemeContextValue = {
  theme: Theme;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Manual light/dark toggle (dark is the site default — see
 * docs/03-brand/colors.md). Pairs with the inline no-flash script in
 * src/app/[locale]/layout.tsx, which sets the initial `.dark` class on
 * <html> before hydration.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

/** Source for the inline no-flash script rendered in the root layout's
 * <head> — reads the stored preference synchronously, before first paint,
 * so a visitor who previously chose light mode never sees a flash of the
 * dark default. Kept as a plain string (not an import) because it runs via
 * dangerouslySetInnerHTML outside of React/hydration. */
export const NO_FLASH_THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"){document.documentElement.classList.remove("dark");}}catch(e){}})();`;
