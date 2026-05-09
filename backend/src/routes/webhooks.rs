use axum::{extract::State, http::StatusCode, Json};
use serde::Deserialize;
use serde_json::{json, Value};
use sqlx::PgPool;

#[derive(Debug, Deserialize)]
pub struct WebhookPayload {
    pub repo: String,
    #[serde(rename = "ref")]
    pub ref_: String,
    #[serde(default)]
    pub commits: Vec<WebhookCommit>,
}

#[derive(Debug, Deserialize)]
pub struct WebhookCommit {
    pub id: String,
    pub message: String,
    #[serde(default)]
    pub author: String,
    #[serde(default)]
    pub timestamp: String,
}

pub async fn handler(
    State(pool): State<PgPool>,
    Json(payload): Json<WebhookPayload>,
) -> Result<Json<Value>, StatusCode> {
    let repo_name = payload.repo.trim().to_string();

    if repo_name.is_empty() || payload.commits.is_empty() {
        return Ok(Json(json!({ "ok": true, "msg": "no commits, skipped" })));
    }

    sqlx::query(
        "INSERT INTO repos (name, lang, stars, score, description, github_url)
         VALUES ($1, 'unknown', 0, 0, '', '')
         ON CONFLICT (name) DO NOTHING",
    )
    .bind(&repo_name)
    .execute(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    for commit in &payload.commits {
        let short_hash: String = commit.id.chars().take(7).collect();
        let author = if commit.author.is_empty() {
            "ibzie".to_string()
        } else {
            commit.author.clone()
        };

        sqlx::query(
            "INSERT INTO commits (repo_name, hash, message, author, lang, score, committed_at)
             VALUES ($1, $2, $3, $4, 'unknown', 0, $5)
             ON CONFLICT (repo_name, hash) DO NOTHING",
        )
        .bind(&repo_name)
        .bind(&short_hash)
        .bind(&commit.message)
        .bind(&author)
        .bind(&commit.timestamp)
        .execute(&pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    }

    tracing::info!(
        "webhook: {}/{} — {} commits",
        repo_name,
        payload.ref_,
        payload.commits.len()
    );

    Ok(Json(json!({ "ok": true, "commits": payload.commits.len() })))
}
