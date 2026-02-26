use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct RepoRow {
    pub id: i64,
    pub name: String,
    pub lang: String,
    pub stars: i64,
    pub score: i64,
    pub description: String,
    pub github_url: String,
    pub demo_url: Option<String>,
    pub file_tree: String,
    pub doc_score: i64,
    pub test_score: i64,
    pub commit_score: i64,
    pub coverage: i64,
}

#[derive(Debug, Serialize)]
pub struct LatestCommit {
    pub hash: String,
    pub msg: String,
    pub time: String,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RepoSummary {
    pub name: String,
    pub lang: String,
    pub stars: i64,
    pub score: i64,
    pub desc: String,
    pub github_url: String,
    pub demo_url: Option<String>,
    pub latest_commit: Option<LatestCommit>,
}

#[derive(Debug, Serialize)]
pub struct RepoMetrics {
    pub docs: i64,
    pub tests: i64,
    pub commits: i64,
    pub coverage: i64,
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RepoDetail {
    pub name: String,
    pub lang: String,
    pub stars: i64,
    pub score: i64,
    pub desc: String,
    pub github_url: String,
    pub demo_url: Option<String>,
    pub metrics: RepoMetrics,
    pub file_tree: serde_json::Value,
    pub latest_commit: Option<LatestCommit>,
}
