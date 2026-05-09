use sqlx::PgPool;

pub async fn init_pool() -> Result<PgPool, sqlx::Error> {
    let db_url = std::env::var("DATABASE_URL")
        .unwrap_or_else(|_| "postgres://ibzie:ibzie@localhost:5432/ibzie".to_string());

    PgPool::connect(&db_url).await
}

pub async fn run_migrations(pool: &PgPool) -> Result<(), sqlx::migrate::MigrateError> {
    sqlx::migrate!("./migrations").run(pool).await
}
