# ibzie.dev — frontend

Personal portfolio for Ibrahim (ibzie). This is one of two repositories for the project:

| Repo | Purpose |
|------|---------|
| **ibzie.dev.fe** (this one) | Next.js frontend + Rust/Axum backend |
| **ibzie.dev.voice** | Pipecat voice agent (coming soon) |

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), CSS Modules + CSS variables |
| Backend | Rust · Axum |
| Database | SQLite via sqlx |
| Runtime | Bun |

---

## Project structure

```
ibzie.dev.fe/
├── frontend/          Next.js app
│   ├── app/           Routes: / (portfolio)  /git (explorer)
│   ├── components/
│   │   ├── shared/    GlitchText, NeonBtn, Typewriter, ScanlineOverlay, PixelCat, StatusBar, MiniWave, VoiceWave
│   │   ├── portfolio/ ProjectCard, ResearchCard, TimelineRow, VoiceModal, UploadPaperModal
│   │   └── git/       SanityRing, MetricBar, CommitRow, FileTree, CloneBtn
│   └── lib/           api.ts, types.ts
└── backend/           Rust · Axum
    ├── src/
    │   ├── routes/    repos, papers, health
    │   ├── models/    repo, commit, paper
    │   ├── db.rs      sqlx pool + migrations
    │   └── seed.rs    first-run seed data
    └── migrations/    001_repos, 002_commits, 003_papers
```

---

## Getting started

### Prerequisites

- [Bun](https://bun.sh)
- [Rust](https://rustup.rs) (stable)
- `cargo-watch` (optional, for hot reload): `cargo install cargo-watch`

### Setup

```bash
# Frontend
cp frontend/.env.example frontend/.env.local
cd frontend && bun install

# Backend
cp backend/.env.example backend/.env
```

### Dev

```bash
# From root — runs both concurrently
bun run dev

# Or individually
bun run dev:fe   # Next.js on :3000
bun run dev:be   # Axum on :8080
```

The backend seeds itself on first run (repos, commits, papers).

### Build

```bash
bun run build:fe   # Next.js static export
bun run build:be   # cargo release binary
```

---

## API

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/api/repos` | All repos with latest commit |
| GET | `/api/repos/:name` | Repo detail + metrics + file tree |
| GET | `/api/repos/:name/commits` | Commit history |
| GET | `/api/papers` | Research papers |
| POST | `/api/papers` | Add paper |
| DELETE | `/api/papers/:id` | Delete paper |

---

## What's not built yet

- **Voice agent** — UI is fully wired. Drop a Pipecat WebRTC session into `frontend/lib/voice.ts` when ready.
- **Auth** — paper mutations are currently open. Add `Authorization: Bearer <ADMIN_TOKEN>` before going live.
- **GitHub sync** — commits are seeded manually. A webhook or cron at `POST /api/repos/:name/sync` is the intended path.
