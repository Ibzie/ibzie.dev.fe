use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use sqlx::SqlitePool;

use crate::models::{
    commit::CommitResponse,
    repo::{LatestCommit, RepoDetail, RepoMetrics, RepoRow, RepoSummary},
};

pub async fn list(State(pool): State<SqlitePool>) -> Result<Json<Vec<RepoSummary>>, StatusCode> {
    let rows: Vec<RepoRow> = sqlx::query_as("SELECT * FROM repos ORDER BY score DESC")
        .fetch_all(&pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let mut summaries = Vec::with_capacity(rows.len());

    for row in rows {
        let latest: Option<(String, String, String)> = sqlx::query_as(
            "SELECT hash, message, committed_at FROM commits WHERE repo_name = ? ORDER BY id DESC LIMIT 1",
        )
        .bind(&row.name)
        .fetch_optional(&pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        let latest_commit = latest.map(|(hash, msg, time)| LatestCommit { hash, msg, time });

        summaries.push(RepoSummary {
            name: row.name,
            lang: row.lang,
            stars: row.stars,
            score: row.score,
            desc: row.description,
            github_url: row.github_url,
            demo_url: row.demo_url,
            latest_commit,
        });
    }

    Ok(Json(summaries))
}

pub async fn get_one(
    State(pool): State<SqlitePool>,
    Path(name): Path<String>,
) -> Result<Json<RepoDetail>, StatusCode> {
    let row: RepoRow = sqlx::query_as("SELECT * FROM repos WHERE name = ?")
        .bind(&name)
        .fetch_optional(&pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .ok_or(StatusCode::NOT_FOUND)?;

    let latest: Option<(String, String, String)> = sqlx::query_as(
        "SELECT hash, message, committed_at FROM commits WHERE repo_name = ? ORDER BY id DESC LIMIT 1",
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
    State(pool): State<SqlitePool>,
    Path(name): Path<String>,
) -> Result<Json<Vec<CommitResponse>>, StatusCode> {
    let rows: Vec<(String, String, String, i64, String, String)> = sqlx::query_as(
        "SELECT hash, message, author, score, lang, committed_at FROM commits WHERE repo_name = ? ORDER BY id DESC",
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
