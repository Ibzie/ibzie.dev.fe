"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?";

interface TextScrambleProps {
  children: string;
  className?: string;
  duration?: number;
}

export function TextScramble({
  children,
  className,
  duration = 1200,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(children);
  const frameRef = useRef<number>();
  const targetRef = useRef(children);

  useEffect(() => {
    targetRef.current = children;
    const target = children;
    const length = target.length;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const revealed = Math.floor(progress * length);

      let out = "";
      for (let i = 0; i < length; i++) {
        if (target[i] === " ") {
          out += " ";
        } else if (i < revealed) {
          out += target[i];
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }

      setDisplay(out);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(target);
      }
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [children, duration]);

  return <span className={className}>{display}</span>;
}
