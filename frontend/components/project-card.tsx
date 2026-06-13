import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const badge = project.featured ? (
    <span className="featured-badge">Featured</span>
  ) : null;

  return (
    <article className="project-card">
      <h3>
        {badge}
        {project.name}
      </h3>
      <p className="desc">{project.desc}</p>
      <div className="tags">
        <span className="tag">{project.lang || "Code"}</span>
      </div>
      <div className="card-links">
        <a href={project.url} target="_blank" rel="noopener">
          Repo ↗
        </a>
        {project.homepage && (
          <a href={project.homepage} target="_blank" rel="noopener">
            Demo ↗
          </a>
        )}
      </div>
    </article>
  );
}
