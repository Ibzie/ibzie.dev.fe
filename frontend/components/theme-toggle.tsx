"use client";

import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isLax = theme === "lax";

  return (
    <button
      className="mode-toggle"
      type="button"
      aria-label="Toggle Pro / Lax mode"
      aria-pressed={isLax}
      onClick={toggle}
    >
      <span className="mode-toggle-state">{isLax ? "Lax" : "Pro"}</span>
    </button>
  );
}
