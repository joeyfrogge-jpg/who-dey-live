# WHO DEY LIVE

Immersive Cincinnati Bengals game-day headquarters.

**Live site:** deploy to Vercel (one click) — the app uses real ESPN data for schedule, scores, and roster.

```bash
npm install
cp .env.example .env.local
npm run dev
```

```env
NEXT_PUBLIC_SEASON=2026
NEXT_PUBLIC_FORCE_DEMO=false
```

Design matches the provided mobile mockups exactly (dark + orange, bottom nav, live meter, countdown, roster grid). Only the example scores/dates/roster entries were replaced with live 2026 data.
