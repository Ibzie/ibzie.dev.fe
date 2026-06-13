export type RepoType = "project" | "paper";

export type PaperStatus = "published" | "submitted" | "unpublished";

export interface Project {
  type: "project";
  name: string;
  desc: string;
  lang: string;
  url: string;
  homepage: string | null;
  featured: boolean;
  topics: string[];
}

export interface Paper {
  type: "paper";
  name: string;
  desc: string;
  lang: string;
  url: string;
  homepage: string | null;
  featured: boolean;
  topics: string[];
  year: string;
  status: PaperStatus;
}

export type RepoItem = Project | Paper;
