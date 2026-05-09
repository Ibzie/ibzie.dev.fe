use axum::{
    routing::{delete, get, post},
    Router,
};
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};

mod db;
mod models;
mod routes;
mod seed;

#[tokio::main]
async fn main() {
    tracing_subscriber::fmt::init();
    dotenvy::dotenv().ok();

    let pool = db::init_pool().await.expect("DB init failed");
    db::run_migrations(&pool).await.expect("Migrations failed");

    let count: i64 = sqlx::query_scalar("SELECT COUNT(*) FROM repos")
        .fetch_one(&pool)
        .await
        .unwrap_or(0);

    if count == 0 {
        seed::run(&pool).await;
    }

    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        .route("/health", get(routes::health::handler))
        .route("/api/repos", get(routes::repos::list))
        .route("/api/repos/:name", get(routes::repos::get_one))
        .route("/api/repos/:name/commits", get(routes::repos::commits))
        .route("/api/webhooks/git", post(routes::webhooks::handler))
        .route("/api/papers", get(routes::papers::list))
        .route("/api/papers", post(routes::papers::create))
        .route("/api/papers/:id", delete(routes::papers::delete))
        .layer(cors)
        .with_state(pool);

    let port: u16 = std::env::var("PORT")
        .ok()
        .and_then(|p| p.parse().ok())
        .unwrap_or(8080);

    let addr = SocketAddr::from(([0, 0, 0, 0], port));
    tracing::info!("Axum listening on {addr}");

    let listener = tokio::net::TcpListener::bind(addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}
