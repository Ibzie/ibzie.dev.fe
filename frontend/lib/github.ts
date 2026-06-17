import fs from "fs/promises";
import path from "path";
import { Project, Paper, PaperStatus } from "./types";

const GH_USER = "Ibzie";
const GH_REPOS_BASE = `https://api.github.com/users/${GH_USER}/repos?per_page=100&type=owner`;
const GH_REPOS_BY_UPDATED = `${GH_REPOS_BASE}&sort=updated`;
const GH_REPOS_BY_PUSHED = `${GH_REPOS_BASE}&sort=pushed`;
const FEATURED_PROJECTS_FILE = path.join(
  process.cwd(),
  "lib",
  "featured-projects.txt",
);

function repoNameFromLine(line: string): string {
  const trimmed = line.trim();
  if (!trimmed) return "";
  if (trimmed.includes("github.com")) {
    const parts = trimmed.split("/").filter(Boolean);
    return (parts[parts.length - 1] || "").toLowerCase();
  }
  return trimmed.toLowerCase();
}

async function loadFeaturedOrder(): Promise<string[]> {
  try {
    const contents = await fs.readFile(FEATURED_PROJECTS_FILE, "utf-8");
    return contents
      .split("\n")
      .map(repoNameFromLine)
      .filter((name) => name.length > 0);
  } catch {
    return [];
  }
}

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

async function fetchRepos(url: string) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`GitHub API error ${res.status}`);
  }

  return (await res.json()) as any[];
}

export async function fetchProjects(): Promise<Project[]> {
  const [repos, featuredOrder] = await Promise.all([
    fetchRepos(GH_REPOS_BY_PUSHED),
    loadFeaturedOrder(),
  ]);

  const featuredRank = (name: string) => {
    const i = featuredOrder.indexOf(name.toLowerCase());
    return i === -1 ? Infinity : i;
  };

  repos.sort((a, b) => {
    const rankA = featuredRank(a.name);
    const rankB = featuredRank(b.name);
    if (rankA !== rankB) return rankA - rankB;
    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
  });

  const projects: Project[] = [];
  for (const r of repos) {
    if (r.fork) continue;

    const isFeaturedProject = featuredRank(r.name) !== Infinity;

    if (isFeaturedProject) {
      // Featured repos always show on the Projects page, even if they're also papers.
      const topics: string[] = r.topics || [];
      projects.push({
        type: "project",
        name: r.name as string,
        desc: (r.description as string) || "",
        lang: (r.language as string) || "",
        url: r.html_url as string,
        homepage: (r.homepage as string) || null,
        featured: true,
        topics,
      });
      continue;
    }

    const item = mapRepo(r);
    if (!item || item.type === "paper") continue;
    item.featured = false;
    projects.push(item);
  }

  return projects;
}

export async function fetchPapers(): Promise<Paper[]> {
  const repos = await fetchRepos(GH_REPOS_BY_UPDATED);

  const papers: Paper[] = [];
  for (const r of repos) {
    if (r.fork) continue;
    const item = mapRepo(r);
    if (!item || item.type !== "paper") continue;
    papers.push(item);
  }

  return papers;
}
