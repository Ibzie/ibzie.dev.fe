"use client";

import { useTheme } from "./theme-provider";
import { TextScramble } from "./text-scramble";

export function Hero() {
  const { theme, mounted } = useTheme();
  const isLax = theme === "lax";

  return (
    <section className="hero">
      <p className="subtitle">
        {mounted && isLax ? (
          <TextScramble duration={1000}>
            RPG Completionist & Professional Nerd
          </TextScramble>
        ) : (
          "ML Engineer & Applied Researcher"
        )}
      </p>
      <h1>
        <span className="title-line">Hey, I&apos;m Ibz</span>
        <span className="title-line">
          {mounted && isLax ? " 🎮" : "."}
        </span>
        <span className="cursor" aria-hidden="true" />
      </h1>
      <p className="tagline">
        {mounted && isLax ? (
          <TextScramble duration={1200}>
            I sink ungodly hours into RPGs, tinker with Linux, and build things for fun.
          </TextScramble>
        ) : (
          "I build voice AI agents, train self-supervised models, and ship things that matter."
        )}
      </p>
    </section>
  );
}
