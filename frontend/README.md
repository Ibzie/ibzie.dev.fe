# ibzie.dev — Frontend

Next.js 14 portfolio with App Router, SSR, Framer Motion, and a Pro / Lax theme toggle.

## Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Framer Motion
- CSS Modules / global CSS variables
- Bun

## Commands

```bash
bun install      # install dependencies
bun run dev      # Next.js on http://localhost:3000
bun run build    # production build
bun run start    # start production server
bun run lint     # run ESLint
```

## Routes

- `/` — Home
- `/projects` — GitHub projects tagged `featured`
- `/research` — GitHub repos tagged `paper`
- `/experience` — Career timeline with Pro/Lax swap
- `/contact` — Contact links

## Pro / Lax mode

- Toggle in the nav switches between two personalities.
- **Pro** — clean, minimal, editorial.
- **Lax** — dark terminal/gaming vibe with playful animations.
- Preference is saved to `localStorage` under `ibzie-theme`.
