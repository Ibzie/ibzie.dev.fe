import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import {
  ProLaxText,
  ProLaxHtml,
  ProLaxList,
  LaxOnly,
} from "@/components/pro-lax";

export const metadata = {
  title: "Ibzie — Ibrahim's personal site",
};

const nowPro = [
  "Building <strong>Conntrail</strong>, an observability layer for LangGraph agents",
  "Shipping <strong>80+ production voice AI agents</strong> with Pipecat &amp; WebRTC",
  "Finishing <strong>DO-VJEPA</strong>, a novel video SSL architecture",
  "Playing way too much <strong>Minecraft</strong>",
];

const nowLax = [
  "Finishing my <strong>Dark Urge playthrough</strong> in Baldur's Gate 3",
  "Planning a <strong>netrunner build</strong> for my next Cyberpunk run",
  "Finally playing <strong>The Witcher 3 DLCs</strong> (I know, I know)",
  "Writing a <strong>Neovim plugin</strong> nobody asked for",
  "Collecting <strong>mechanical keyboards</strong> like they're legendary loot",
];

const aboutPro =
  "<p class='about-text'>I'm a 22-year-old ML engineer and applied researcher based in Pakistan. I work on problems at the intersection of production engineering and research — voice AI agents running at scale, novel self-supervised video architectures, and interpretability tooling for Mixture-of-Experts transformers.</p><p class='about-text'>When I'm not shipping ML systems, you'll find me deep in Minecraft redstone engineering, tweaking my Arch Linux dotfiles, or writing open-source tools that I wish someone else had already built.</p>";

const aboutLax =
  "<p class='about-text'>By day I build ML systems. But when the laptop closes, I'm probably 140 hours deep into <strong>Baldur's Gate 3</strong>, theorycrafting my next build or save-scumming dialogue checks like a true degenerate. I've also sunk an embarrassing amount of time into <strong>Cyberpunk 2077</strong> and <strong>The Witcher</strong> — CDPR owns a piece of my soul at this point.</p><p class='about-text'>When I'm not in Faerûn or Night City, I'm ricing my Arch Linux setup, collecting mechanical keyboards, or writing open-source tools that no one asked for but I needed at 3 AM.</p>";

export default function HomePage() {
  return (
    <main className="container page">
      <Reveal>
        <Hero />
      </Reveal>

      <Reveal delay={0.1}>
        <section className="about-me">
          <p className="home-heading">
            <ProLaxText
              pro="Who I am"
              lax="The non-work version of me"
            />
          </p>
          <ProLaxHtml pro={aboutPro} lax={aboutLax} />

          <LaxOnly>
            <div className="lax-stats-grid">
              <div className="lax-stat-card">
                <div className="lax-stat-number">400+</div>
                <div className="lax-stat-label">Hours in BG3</div>
              </div>
              <div className="lax-stat-card">
                <div className="lax-stat-number">3</div>
                <div className="lax-stat-label">Cyberpunk Playthroughs</div>
              </div>
              <div className="lax-stat-card">
                <div className="lax-stat-number">∞</div>
                <div className="lax-stat-label">Gwent Hands Played</div>
              </div>
              <div className="lax-stat-card">
                <div className="lax-stat-number">47</div>
                <div className="lax-stat-label">Keyboard Layouts Tried</div>
              </div>
            </div>
          </LaxOnly>
        </section>
      </Reveal>

      <Reveal delay={0.2}>
        <section className="now">
          <p className="home-heading">
            <ProLaxText
              pro="What I'm into right now"
              lax="Current side quests"
            />
          </p>
          <ProLaxList
            className="now-list"
            itemClassName="now-item"
            pro={nowPro}
            lax={nowLax}
            itemTemplate="<span class='arrow'>→</span> <span>{{value}}</span>"
          />
        </section>
      </Reveal>
    </main>
  );
}
