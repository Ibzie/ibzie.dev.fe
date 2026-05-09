# Future Plan — ibzie.dev

## Architecture map

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   nginx     │────▶│  frontend/   │────▶│  backend/   │
│  (static +  │     │  (Next.js)   │     │  (Axum API) │
│   proxy)    │     │              │     │             │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
┌─────────────┐                               │
│  Soft Serve │◀── webhook (push events) ─────┘
│  (git)      │
└─────────────┘
```

## What's done

- [x] Static FE prototype (`FE-Proto/`) — homepage, experience, contact
- [x] Axum backend with PostgreSQL — repos, commits, papers CRUD
- [x] `POST /api/webhooks/git` — receives push events from Soft Serve, upserts repos + commits
- [x] `docker-compose.yml` — PostgreSQL, Soft Serve, backend, nginx stack
- [x] Frontend build pipeline (`frontend/scripts/build.mjs` — copies FE-Proto to dist)
- [x] API-linked projects & research pages — fetches from `GET /api/repos` and `GET /api/papers`, paginated, infinite scroll
- [x] Featured projects — `featured` boolean on repos, sorts to top, badge on FE
- [x] Demo link conditional — only renders demo button when `demo_url` is present
- [x] PostgreSQL migration — full SQLite → PostgreSQL with Docker Compose service

## What's next

### 1. Migrate FE-Proto to Next.js
Move static HTML/CSS/JS into a proper Next.js app in `frontend/`. Fetch data from backend API (`GET /api/repos`, `GET /api/papers`) instead of plain JS. Keep the same design language (fonts, colors, terminal motif).

### 2. GitHub → Soft Serve migration
Current seed data uses `https://git.ibzie.dev/ibz/...` URLs. The actual repos need to be pushed to Soft Serve:
```bash
git remote add self git.ibzie.dev/ibz/ibz-git
git push self main
```

Once repos live on Soft Serve, the webhook (`POST /api/webhooks/git`) will automatically sync commits into the database on every push.

### 4. Auth gate on paper mutations
`POST /api/papers` and `DELETE /api/papers/:id` are currently open. Add `Authorization: Bearer <ADMIN_TOKEN>` middleware before going live. Load the token from an env var (`PAPER_ADMIN_TOKEN`).

### 5. Commit scoring / sanity metrics
The `repos` table already has `doc_score`, `test_score`, `commit_score`, and `coverage` columns. Write a sync job that:
- Clones repos from Soft Serve
- Runs static analysis (clippy/mypy, test coverage, commit message quality)
- Updates scores in the DB

This feeds the "sanity ring" / metric bar visualizations from the original Next.js component plan.

### 6. Voice agent integration
The README references a `ibzie.dev.voice` repo with a Pipecat voice agent. Wire it in:
- `frontend/components/VoiceModal.tsx` — WebRTC connection to the voice agent
- The agent navigates the portfolio via voice commands, backed by the API

### 7. TLS / HTTPS
Add Let's Encrypt certs to the nginx config for `ibzie.dev` and `git.ibzie.dev`. The docker-compose already maps `:443`.

## API reference

| Method | Path | Status |
|--------|------|--------|
| GET | `/health` | Done |
| GET | `/api/repos` | Done |
| GET | `/api/repos/:name` | Done |
| GET | `/api/repos/:name/commits` | Done |
| POST | `/api/webhooks/git` | Done |
| GET | `/api/papers` | Done |
| POST | `/api/papers` | Needs auth |
| DELETE | `/api/papers/:id` | Needs auth |

## Not planned

- Issues / PRs web UI — Soft Serve is view-only. Use `git` CLI or SSH for write operations.
- User accounts / OAuth — single-user site, no auth needed for readers.
- CI/CD — repos are scored by a batch job, not a pipeline runner.
