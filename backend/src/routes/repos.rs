use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    Json,
};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;

use crate::models::{
    commit::CommitResponse,
    repo::{LatestCommit, RepoDetail, RepoMetrics, RepoRow, RepoSummary},
};

#[derive(Debug, Deserialize)]
pub struct ListQuery {
    #[serde(default)]
    offset: i64,
    #[serde(default = "default_limit")]
    limit: i64,
}

fn default_limit() -> i64 {
    6
}

#[derive(Debug, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RepoListResponse {
    pub projects: Vec<RepoSummary>,
    pub has_more: bool,
}

pub async fn list(
    State(pool): State<PgPool>,
    Query(q): Query<ListQuery>,
) -> Result<Json<RepoListResponse>, StatusCode> {
    let total: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM repos")
        .fetch_one(&pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let rows: Vec<RepoRow> = sqlx::query_as(
        "SELECT * FROM repos ORDER BY featured DESC, score DESC LIMIT $1 OFFSET $2",
    )
    .bind(q.limit)
    .bind(q.offset)
    .fetch_all(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let mut projects = Vec::with_capacity(rows.len());

    for row in rows {
        let latest: Option<(String, String, String)> = sqlx::query_as(
            "SELECT hash, message, committed_at FROM commits WHERE repo_name = $1 ORDER BY id DESC LIMIT 1",
        )
        .bind(&row.name)
        .fetch_optional(&pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        let latest_commit = latest.map(|(hash, msg, time)| LatestCommit { hash, msg, time });

        projects.push(RepoSummary {
            name: row.name,
            lang: row.lang,
            stars: row.stars,
            score: row.score,
            desc: row.description,
            github_url: row.github_url,
            demo_url: row.demo_url,
            featured: row.featured,
            latest_commit,
        });
    }

    let has_more = (q.offset + q.limit) < total;

    Ok(Json(RepoListResponse { projects, has_more }))
}

pub async fn get_one(
    State(pool): State<PgPool>,
    Path(name): Path<String>,
) -> Result<Json<RepoDetail>, StatusCode> {
    let row: RepoRow = sqlx::query_as("SELECT * FROM repos WHERE name = $1")
        .bind(&name)
        .fetch_optional(&pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    let latest: Option<(String, String, String)> = sqlx::query_as(
        "SELECT hash, message, committed_at FROM commits WHERE repo_name = $1 ORDER BY id DESC LIMIT 1",
    )
    .bind(&name)
    .fetch_optional(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let latest_commit = latest.map(|(hash, msg, time)| LatestCommit { hash, msg, time });

    let file_tree: serde_json::Value =
        serde_json::from_str(&row.file_tree).unwrap_or(serde_json::json!([]));

    Ok(Json(RepoDetail {
        name: row.name,
        lang: row.lang,
        stars: row.stars,
        score: row.score,
        desc: row.description,
        github_url: row.github_url,
        demo_url: row.demo_url,
        featured: row.featured,
        metrics: RepoMetrics {
            docs: row.doc_score,
            tests: row.test_score,
            commits: row.commit_score,
            coverage: row.coverage,
        },
        file_tree,
        latest_commit,
    }))
}

pub async fn commits(
    State(pool): State<PgPool>,
    Path(name): Path<String>,
) -> Result<Json<Vec<CommitResponse>>, StatusCode> {
    let rows: Vec<(String, String, String, i64, String, String)> = sqlx::query_as(
        "SELECT hash, message, author, score, lang, committed_at FROM commits WHERE repo_name = $1 ORDER BY id DESC",
    )
    .bind(&name)
    .fetch_all(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let result = rows
        .into_iter()
        .map(|(hash, msg, author, score, lang, time)| CommitResponse {
            hash,
            msg,
            author,
            time,
            score,
            lang,
        })
        .collect();

    Ok(Json(result))
}
