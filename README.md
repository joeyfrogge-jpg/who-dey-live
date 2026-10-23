# WHO DEY LIVE

Immersive Cincinnati Bengals game-day headquarters.

**Design** matches the mobile mockups exactly (dark + orange, bottom nav, live meter, countdown, roster grid). Only example scores / dates / roster entries were replaced with real 2026 data from ESPN.

## Live App (click this)

The app is a full Next.js app and **must be deployed to Vercel** (free).

**One-click deploy →**  
https://vercel.com/new/clone?repository-url=https://github.com/joeyfrogge-jpg/who-dey-live

After the ~30 second deploy finishes, Vercel gives you a permanent URL like:
`https://who-dey-live-xxxx.vercel.app`

That is the link you click to load the real web app.

> Note: `https://joeyfrogge-jpg.github.io/who-dey-live/` is only the README (GitHub Pages). It is **not** the app.

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

No API keys required.
