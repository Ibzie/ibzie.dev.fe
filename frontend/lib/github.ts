import { Project, Paper, PaperStatus } from "./types";

const GH_USER = "Ibzie";
const GH_REPOS = `https://api.github.com/users/${GH_USER}/repos?sort=updated&per_page=100&type=owner`;

function statusFromTopics(topics: string[]): PaperStatus {
  if (topics.includes("paper-published")) return "published";
  if (topics.includes("paper-submitted")) return "submitted";
  return "unpublished";
}

function mapRepo(r: any): Project | Paper | null {
  const topics: string[] = r.topics || [];
  const isPaper = topics.includes("paper");

  const base = {
    name: r.name as string,
    desc: (r.description as string) || "",
    lang: (r.language as string) || "",
    url: r.html_url as string,
    homepage: (r.homepage as string) || null,
    featured: topics.includes("featured"),
    topics,
  };

  if (isPaper) {
    return {
      ...base,
      type: "paper",
      year: ((r.created_at as string) || "").slice(0, 4),
      status: statusFromTopics(topics),
    };
  }

  return { ...base, type: "project" };
}

async function fetchAll() {
  const res = await fetch(GH_REPOS);

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}`);
  }

  const repos = (await res.json()) as any[];
  const projects: Project[] = [];
  const papers: Paper[] = [];

  for (const r of repos) {
    if (r.fork) continue;
    const item = mapRepo(r);
    if (!item) continue;
    if (item.type === "paper") papers.push(item);
    else projects.push(item);
  }

  projects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return { projects, papers };
}

export async function fetchProjects(): Promise<Project[]> {
  const { projects } = await fetchAll();
  return projects;
}

export async function fetchPapers(): Promise<Paper[]> {
  const { papers } = await fetchAll();
  return papers;
}
