use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use serde_json::{json, Value};
use sqlx::SqlitePool;

use crate::models::paper::{CreatePaperInput, Paper};

pub async fn list(State(pool): State<SqlitePool>) -> Result<Json<Vec<Paper>>, StatusCode> {
    let rows: Vec<(i64, String, String, String, String, String)> = sqlx::query_as(
        "SELECT id, title, authors, year, status, abstract FROM papers ORDER BY id DESC",
    )
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

    Ok(Json(papers))
}

pub async fn create(
    State(pool): State<SqlitePool>,
    Json(input): Json<CreatePaperInput>,
) -> Result<Json<Paper>, StatusCode> {
    let id: i64 = sqlx::query_scalar(
        "INSERT INTO papers (title, authors, year, status, abstract) VALUES (?, ?, ?, ?, ?) RETURNING id",
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
    State(pool): State<SqlitePool>,
    Path(id): Path<i64>,
) -> Result<Json<Value>, StatusCode> {
    let rows_affected = sqlx::query("DELETE FROM papers WHERE id = ?")
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
