import { fetchProjects } from "@/lib/github";
import { Project } from "@/lib/types";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { ProLaxText } from "@/components/pro-lax";

export const metadata = {
  title: "Projects",
  description:
    "Projects by Ibz — voice AI agents, self-supervised learning, interpretability tools, and more.",
};

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    projects = await fetchProjects();
  } catch (err) {
    console.error("Failed to load projects:", err);
  }

  return (
    <main className="container page">
      <Reveal>
        <header className="page-header">
          <p className="section-label">
            <ProLaxText
              pro="What I've shipped"
              lax="Things I've built for fun"
            />
          </p>
          <h1>
            <ProLaxText pro="Projects" lax="Side Projects" />
          </h1>
          <p>
            <ProLaxText
              pro="Real things, running in production or published as open-source. No toy repos."
              lax="Tools I built because I needed them at 3 AM. No CTAs, no monetization, no apologies."
            />
          </p>
        </header>
      </Reveal>

      {projects.length === 0 ? (
        <p className="load-error">No projects found.</p>
      ) : (
        <div className="projects-grid">
          {projects.map((project, i) => (
            <Reveal key={project.name} delay={(i % 4) * 0.1}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      )}
    </main>
  );
}
