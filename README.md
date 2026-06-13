# ibzie.dev — frontend

Personal portfolio for Ibrahim (ibzie). Built as a proper Next.js 14 App Router site.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, SSR) |
| Runtime / Package manager | Bun |
| Styling | CSS Modules + CSS variables |
| Animation | Framer Motion |
| Data | GitHub REST API |

---

## Project structure

```
ibzie.dev.fe/
├── frontend/          Next.js app
│   ├── app/           App Router routes
│   ├── components/    React components
│   ├── lib/           Utilities, types, API client
│   └── styles/        Global styles + CSS variables
└── package.json
```

---

## Getting started

### Prerequisites

- [Bun](https://bun.sh)

### Setup

```bash
cd frontend && bun install
```

### Dev

```bash
# From root
bun run dev
```

Next.js runs on `http://localhost:3000`.

### Build

```bash
bun run build
```

---

## Pro / Lax mode

- Toggle is a pill button in the nav.
- **Pro** — clean, minimal, editorial.
- **Lax** — dark terminal/gaming vibe with playful, magical animations.
- Choice is persisted in `localStorage`.

---

## Data

Projects and papers are pulled from GitHub repos tagged `featured` or `paper` on the `Ibzie` account. GitHub's unauthenticated rate limit is 60 req/hr.
