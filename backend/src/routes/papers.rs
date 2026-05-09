use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    Json,
};
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};
use sqlx::PgPool;

use crate::models::paper::{CreatePaperInput, Paper};

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
pub struct PaperListResponse {
    pub papers: Vec<Paper>,
    pub has_more: bool,
}

pub async fn list(
    State(pool): State<PgPool>,
    Query(q): Query<ListQuery>,
) -> Result<Json<PaperListResponse>, StatusCode> {
    let total: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM papers")
        .fetch_one(&pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let rows: Vec<(i64, String, String, String, String, String)> = sqlx::query_as(
        "SELECT id, title, authors, year, status, abstract FROM papers ORDER BY id DESC LIMIT $1 OFFSET $2",
    )
    .bind(q.limit)
    .bind(q.offset)
    .fetch_all(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let papers = rows
        .into_iter()
        .map(|(id, title, authors, year, status, abstract_)| Paper {
            id,
            title,
            authors,
            year,
            status,
            abstract_,
        })
        .collect();

    let has_more = (q.offset + q.limit) < total;

    Ok(Json(PaperListResponse { papers, has_more }))
}

pub async fn create(
    State(pool): State<PgPool>,
    Json(input): Json<CreatePaperInput>,
) -> Result<Json<Paper>, StatusCode> {
    let id: i64 = sqlx::query_scalar(
        "INSERT INTO papers (title, authors, year, status, abstract) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    )
    .bind(&input.title)
    .bind(&input.authors)
    .bind(&input.year)
    .bind(&input.status)
    .bind(&input.abstract_)
    .fetch_one(&pool)
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(Paper {
        id,
        title: input.title,
        authors: input.authors,
        year: input.year,
        status: input.status,
        abstract_: input.abstract_,
    }))
}

pub async fn delete(
    State(pool): State<PgPool>,
    Path(id): Path<i64>,
) -> Result<Json<Value>, StatusCode> {
    let rows_affected = sqlx::query("DELETE FROM papers WHERE id = $1")
        .bind(id)
        .execute(&pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        .rows_affected();

    if rows_affected == 0 {
        return Err(StatusCode::NOT_FOUND);
    }

    Ok(Json(json!({ "deleted": true })))
}
