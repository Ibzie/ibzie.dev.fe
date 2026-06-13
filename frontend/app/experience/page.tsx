import { Reveal } from "@/components/reveal";
import { TimelineItem } from "@/components/timeline-item";
import { ProLaxText } from "@/components/pro-lax";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Experience",
  description: "Experience — Ibz's work history, education, and achievements.",
};

const experiences = [
  {
    proDate: "Dec 2025 — Present",
    laxDate: "2025 — Present",
    proTitle: "ML Engineer",
    laxTitle: "Baldur's Gate 3 — 400+ Hours",
    proOrg: "Weel",
    laxOrg: "Faerûn, Sword Coast",
    proDesc:
      "Building ML systems for pharmacy logistics — demand forecasting, inventory optimization, and delivery routing. Working end-to-end from data pipelines to production model serving.",
    laxDesc:
      "Multiple playthroughs. Every origin. Tactician. Honor mode attempts. Larian created a masterpiece.",
  },
  {
    proDate: "2024 — 2025",
    laxDate: "2024 — 2025",
    proTitle: "Voice AI Engineer",
    laxTitle: "Cyberpunk 2077 — 3 Playthroughs",
    proOrg: "TalentBridge Finland",
    laxOrg: "Night City",
    proDesc:
      "Designed, built, and deployed 80+ production voice AI agents handling real-time conversations over WebRTC. Architected the Pipecat-based pipeline for low-latency speech-to-speech interaction, managing TTS, STT, and LLM orchestration under strict latency budgets.",
    laxDesc:
      "Netrunner. Solo. Corpo assassin. Done them all. Phantom Liberty is a masterpiece.",
  },
  {
    proDate: "2024",
    laxDate: "2022 — 2023",
    proTitle: "Google APAC Solution Challenge",
    laxTitle: "The Witcher Trilogy Run",
    proOrg: "Top 10 Finalist",
    laxOrg: "The Continent",
    proDesc:
      "Selected as a Top 10 finalist in the Google APAC Solution Challenge for building a technology solution addressing a UN Sustainable Development Goal.",
    laxDesc:
      "Replayed all three. TW3 still one of the best RPGs ever. Yes, I play Gwent.",
  },
  {
    proDate: "2021 — 2025",
    laxDate: "2021 — 2025",
    proTitle: "BS Data Science",
    laxTitle: "BS Data Science",
    proOrg: "FAST National University",
    laxOrg: "FAST National University",
    proDesc:
      "Focused on machine learning, computer vision, and applied research. Published papers on self-supervised learning and 3D vision while building production ML systems on the side.",
    laxDesc:
      "Got a degree while sinking hours into RPGs. Real achievement was beating Honor mode between exams.",
  },
];

export default function ExperiencePage() {
  return (
    <main className="container page">
      <Reveal>
        <header className="page-header">
          <p className="section-label">
            <ProLaxText pro="Where I've been" lax="Achievements Unlocked" />
          </p>
          <h1>
            <ProLaxText pro="Experience" lax="XP Log" />
          </h1>
          <p>
            <ProLaxText
              pro="Production ML, voice AI infrastructure, and research — in that order."
              lax="Career stuff, gaming milestones, and everything in between. 🎮"
            />
          </p>
        </header>
      </Reveal>

      <div className="timeline">
        {experiences.map((exp, i) => (
          <Reveal key={exp.proTitle} delay={(i % 4) * 0.1}>
            <TimelineItem {...exp} />
          </Reveal>
        ))}
      </div>
    </main>
  );
}
