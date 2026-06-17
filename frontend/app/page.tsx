import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import {
  ProLaxText,
  ProLaxHtml,
  ProLaxList,
  LaxOnly,
} from "@/components/pro-lax";

export const metadata = {
  title: "Ibzie - Ibrahim's personal site",
};

const nowPro = [
  "Automating pharmacy logistics at <strong>weel.io</strong>",
  "Experimenting with <strong>DO-VJEPA</strong>, a novel video SSL architecture",
  "Building <strong>Conntrail</strong> to see where and why agents hallucinate, and fixing them in prod when they do fail",
  "Looking for scholarships in the EU for my Master's",
];

const nowLax = [
  "Automating pharmacy logistics at <strong>weel.io</strong> - optimizing the supply chain questline, like planning a smuggling run through Night City",
  "Experimenting with <strong>DO-VJEPA</strong>, a video SSL architecture that might actually see the world properly",
  "Building <strong>Conntrail</strong> to catch agents hallucinating before they derail a production run - no Baldur's Gate save-scumming allowed",
  "Searching for EU scholarships for my Master's - still looking for the right guild, preferably one with a forge like Skyrim",
];

const aboutPro =
  "<p class='about-text'>I'm a 23-year-old ML Engineer and Applied Researcher based in Pakistan, with six years of hands-on work across systems, research, and production. If you're looking for someone who understands what technology your users actually need - and just as importantly, what they don't - then hit me up.</p><p class='about-text'>When I'm not shipping features or closing PRs, I'm buried in research around Robotics, World Models, and Mechanistic Interpretability of LLMs.</p>";

const aboutLax =
  "<p class='about-text'>By day I'm a 23-year-old ML Engineer and Applied Researcher based in Pakistan - but that's the main quest, and this page is about the side content. Think of me as the party member who reads every quest log anyway, just in case something's hidden in there.</p><p class='about-text'>Most evenings I'm chasing 100% completion on <strong>Skyrim</strong>, <strong>Baldur's Gate 3</strong>, and <strong>Cyberpunk 2077</strong> - every cave, every side quest, no skipping. When I'm not gaming, I'm soldering together <strong>Arduino</strong> and <strong>Raspberry Pi</strong> builds, running physics sims in <strong>MuJoCo</strong> just to see what breaks, or attempting to cook a new dish every week with mixed success.</p>";

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
                <div className="lax-stat-number">30+</div>
                <div className="lax-stat-label">New Dishes Attempted</div>
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
