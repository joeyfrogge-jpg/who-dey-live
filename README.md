# WHO DEY LIVE

**One team. Every Bengals game. Every meaningful moment.**

A polished, animated, production-minded Cincinnati Bengals football application.

> Fan-created experience. **Not affiliated with** the NFL, the Cincinnati Bengals organization, or ESPN.

**Repository:** https://github.com/joeyfrogge-jpg/who-dey-live

---

## Quick Start

```bash
git clone https://github.com/joeyfrogge-jpg/who-dey-live.git
cd who-dey-live
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Features

- **Bengals-only schedule** — every available game for the selected season
- **Home-game emphasis** — Paycor Stadium spotlight, orange glow, countdowns
- **Live Game Center** — scoreboard, stats, play-by-play when available
- **WHO DEY METER** — playful app-generated fan-energy visualization
- **Player roster & profiles**
- **Game Archive** — completed games with final scores
- **Preferences** — notifications, reduced motion, layout (localStorage)
- **ESPN public API** + verified 2025 demo fallback (no API key required)

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + Bengals design tokens |
| Motion | Framer Motion |
| Validation | Zod |
| Icons | Lucide React |

---

## Environment

```env
NEXT_PUBLIC_SEASON=2025
NEXT_PUBLIC_FORCE_DEMO=false
```

No API keys required for ESPN public endpoints.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm test` | Unit tests (Vitest) |
| `npm run typecheck` | TypeScript check |

---

## Deploy on Vercel

1. Import this repo in [Vercel](https://vercel.com)
2. Framework: **Next.js**
3. Optional env vars from `.env.example`
4. Deploy

---

## Who Dey

Built for Bengals fans who want every game to feel like an event.

**WHO DEY LIVE**
