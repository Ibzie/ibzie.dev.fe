use serde::Serialize;

#[derive(Debug, Serialize)]
pub struct CommitResponse {
    pub hash: String,
    pub msg: String,
    pub author: String,
    pub time: String,
    pub score: i64,
    pub lang: String,
}
