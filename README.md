# WHO DEY LIVE

Immersive Cincinnati Bengals game-day headquarters.

**Design** matches the mobile mockups exactly (dark + orange, bottom nav, live meter, countdown, roster grid). Only example scores / dates / roster entries were replaced with real 2026 data from ESPN.

## Live App

Deploy to Vercel (free):

**https://vercel.com/new/clone?repository-url=https://github.com/joeyfrogge-jpg/who-dey-live**

After deploy you get a permanent URL like `https://who-dey-live-xxxx.vercel.app` — that is the working app link.

> `https://joeyfrogge-jpg.github.io/who-dey-live/` is only the README. It is not the app.

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

```env
NEXT_PUBLIC_SEASON=2026
NEXT_PUBLIC_FORCE_DEMO=false
```

Real data from ESPN public endpoints. No API keys required.
