# WHO DEY LIVE

Immersive Cincinnati Bengals game-day headquarters.

**Design** matches the mobile mockups exactly (dark + orange, bottom nav, live meter, countdown, roster grid). Only example scores / dates / roster entries were replaced with real 2026 data from ESPN.

## One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjoeyfrogge-jpg%2Fwho-dey-live)

After deploy the app is live at `https://your-project.vercel.app` — no env vars required for real ESPN data.

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

Real data is fetched from ESPN public endpoints. Fallback demo data is used only if the network call fails.
