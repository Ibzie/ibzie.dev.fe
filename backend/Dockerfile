FROM rust:1.77-alpine AS builder
RUN apk add --no-cache musl-dev libpq-dev
WORKDIR /app
COPY Cargo.toml Cargo.lock ./
COPY src/ ./src/
COPY migrations/ ./migrations/
RUN cargo build --release

FROM alpine:3.19
RUN apk add --no-cache libpq
WORKDIR /app
COPY --from=builder /app/target/release/backend .
COPY migrations/ ./migrations/
EXPOSE 8080
CMD ["./backend"]
