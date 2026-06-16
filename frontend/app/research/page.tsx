import { fetchPapers } from "@/lib/github";
import { Paper } from "@/lib/types";
import { PaperCard } from "@/components/paper-card";
import { Reveal } from "@/components/reveal";
import { ProLaxText } from "@/components/pro-lax";

export const metadata = {
  title: "Research",
  description:
    "Research by Ibz — papers on self-supervised learning, 3D vision, and mechanistic interpretability.",
};

export default async function ResearchPage() {
  let papers: Paper[] = [];
  try {
    papers = await fetchPapers();
  } catch (err) {
    console.error("Failed to load papers:", err);
  }

  return (
    <main className="container page">
      <Reveal>
        <header className="page-header">
          <p className="section-label">
            <ProLaxText pro="Papers & Preprints" lax="Achievement unlocks" />
          </p>
          <h1>
            <ProLaxText pro="Research" lax="Quest Log" />
          </h1>
          <p>
            <ProLaxText
              pro="Where the experiments live. Mostly ML, mostly self-supervised, mostly unreasonably ambitious."
              lax="Mostly ML, mostly self-supervised, mostly unreasonably ambitious. Yes, I count that as 'gaming the system.'"
            />
          </p>
        </header>
      </Reveal>

      {papers.length === 0 ? (
        <p className="load-error">No papers found.</p>
      ) : (
        <div className="papers-grid">
          {papers.map((paper, i) => (
            <Reveal key={paper.name} delay={(i % 4) * 0.1}>
              <PaperCard paper={paper} />
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
