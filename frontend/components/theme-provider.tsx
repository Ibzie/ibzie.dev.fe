"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Theme = "pro" | "lax";

interface ThemeContextValue {
  theme: Theme;
  toggle: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "pro",
  toggle: () => {},
  mounted: false,
});

const STORAGE_KEY = "ibzie-theme";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("pro");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let stored: Theme | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    } catch {}

    const initial = stored === "lax" ? "lax" : "pro";
    setTheme(initial);
    applyToDocument(initial);
    setMounted(true);
  }, []);

  useEffect(() => {
    applyToDocument(theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {}
    window.dispatchEvent(
      new CustomEvent("ibzie:theme-changed", { detail: { theme } })
    );
  }, [theme]);

  const toggle = () => {
    setTheme((t) => (t === "pro" ? "lax" : "pro"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

function applyToDocument(theme: Theme) {
  if (theme === "lax") {
    document.documentElement.setAttribute("data-theme", "lax");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

export function useTheme() {
  return useContext(ThemeContext);
}
