use sqlx::SqlitePool;
use std::fs;

pub async fn init_pool() -> Result<SqlitePool, sqlx::Error> {
    let db_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "sqlite:./data/ibzie.db".to_string());

    // Ensure data/ directory exists
    if let Some(path) = db_url.strip_prefix("sqlite:") {
        if let Some(parent) = std::path::Path::new(path).parent() {
            fs::create_dir_all(parent).ok();
        }
    }

    SqlitePool::connect(&db_url).await
}

pub async fn run_migrations(pool: &SqlitePool) -> Result<(), sqlx::migrate::MigrateError> {
    sqlx::migrate!("./migrations").run(pool).await
}
