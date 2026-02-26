use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize, sqlx::FromRow)]
pub struct Paper {
    pub id: i64,
    pub title: String,
    pub authors: String,
    pub year: String,
    pub status: String,
    #[serde(rename = "abstract")]
    pub abstract_: String,
}

#[derive(Debug, Deserialize)]
pub struct CreatePaperInput {
    pub title: String,
    pub authors: String,
    pub year: String,
    pub status: String,
    #[serde(rename = "abstract")]
    pub abstract_: String,
}
