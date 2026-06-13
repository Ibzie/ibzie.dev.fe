import { Paper } from "@/lib/types";

interface PaperCardProps {
  paper: Paper;
}

export function PaperCard({ paper }: PaperCardProps) {
  const statusClass =
    "paper-status" + (paper.status === "published" ? " paper-published" : "");

  return (
    <article className="paper-card">
      <div className="paper-meta">
        <span className="paper-date">{paper.year}</span>
        <span className={statusClass}>{paper.status}</span>
      </div>
      <h3>{paper.name}</h3>
      <p className="abstract">{paper.desc}</p>
      <div className="card-links">
        <a href={paper.url} target="_blank" rel="noopener">
          Repo ↗
        </a>
        {paper.homepage && (
          <a href={paper.homepage} target="_blank" rel="noopener">
            PDF ↗
          </a>
        )}
      </div>
    </article>
  );
}
