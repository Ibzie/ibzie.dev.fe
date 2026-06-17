import { Reveal } from "@/components/reveal";
import { TimelineItem } from "@/components/timeline-item";
import { ProLaxText } from "@/components/pro-lax";

export const metadata = {
  title: "Experience",
  description: "Experience - Ibz's work history, education, and achievements.",
};

const experiences = [
  {
    proDate: "Dec 2025 - Present",
    laxDate: "2025 - Present",
    proTitle: "ML Engineer",
    laxTitle: "ML Engineer",
    proOrg: "Weel",
    laxOrg: "Weel",
    proDesc:
      "Building automation and AI systems for pharmacy logistics, delivery optimizations, and voice AI agents to serve active users at scale.",
    laxDesc:
      "Running the pharmacy logistics questline with AI - automating supply chains, optimizing deliveries, and deploying voice agents that actually talk to people. No quest markers needed.",
  },
  {
    proDate: "2024 - 2025",
    laxDate: "2024 - 2025",
    proTitle: "ML Engineer",
    laxTitle: "ML Engineer",
    proOrg: "TalentBridge / Neste Finland",
    laxOrg: "TalentBridge / Neste Finland",
    proDesc:
      "Automated static automation processes to smart automation with KPI-enforced agentic systems. Built 80+ multilingual voice agents for low-latency conversations happening at large scale.",
    laxDesc:
      "Upgraded old-school automation into smart, KPI-driven agentic systems. Built 80+ multilingual voice agents that handle real conversations at scale - no save-scumming required.",
  },
  {
    proDate: "2024",
    laxDate: "2024",
    proTitle: "Google APAC Solution Challenge",
    laxTitle: "Google APAC Solution Challenge",
    proOrg: "Top 10 Finalist",
    laxOrg: "Top 10 Finalist",
    proDesc:
      "Top 10 finalist with Vocalink - an AI document editor designed for neurodivergent users (ADHD, ASD, dyslexia, dysgraphia, etc.), enabling them to dictate, edit, and transform text naturally without relying on rigid voice commands. <a href='https://www.youtube.com/watch?v=2EHemNhCX64' target='_blank' rel='noopener'>Watch the pitch ↗</a> · <a href='https://certificate.hack2skill.com/legacy/2025H2S03ASC-T00002' target='_blank' rel='noopener'>Certificate ↗</a>",
    laxDesc:
      "Top 10 finalist with Vocalink - an AI document editor that helps neurodivergent users (ADHD, ASD, dyslexia, dysgraphia, etc.) dictate, edit, and reshape text naturally, no rigid voice commands needed. A rare quest where the reward was real impact. <a href='https://www.youtube.com/watch?v=2EHemNhCX64' target='_blank' rel='noopener'>Watch the pitch ↗</a> · <a href='https://certificate.hack2skill.com/legacy/2025H2S03ASC-T00002' target='_blank' rel='noopener'>Certificate ↗</a>",
  },
  {
    proDate: "2021 - 2025",
    laxDate: "2021 - 2025",
    proTitle: "BS Data Science",
    laxTitle: "BS Data Science",
    proOrg: "FAST National University",
    laxOrg: "FAST National University",
    proDesc:
      "Focused on machine learning, computer vision, and applied research. Built projects across self-supervised learning and 3D vision, and made the Dean's List.",
    laxDesc:
      "Leveled up in machine learning, computer vision, and applied research. Built projects spanning self-supervised learning and 3D vision, and made the Dean's List once - not a legendary drop, but I'll take it.",
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
              pro="Production ML, voice AI infrastructure, and research - in that order."
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
