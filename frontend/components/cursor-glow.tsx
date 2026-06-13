"use client";

import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";

export function CursorGlow() {
  const { theme, mounted } = useTheme();
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!mounted || theme !== "lax") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        width: 400,
        height: 400,
        transform: "translate(-50%, -50%)",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(74,222,128,0.12) 0%, rgba(74,222,128,0) 70%)",
        pointerEvents: "none",
        zIndex: 1,
        transition: "left 0.1s ease-out, top 0.1s ease-out",
      }}
    />
  );
}
