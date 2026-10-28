# WHO DEY LIVE

**One team. Every Bengals game. Every meaningful moment.**

WHO DEY LIVE is a mobile-first, full-screen Progressive Web App built exclusively for Cincinnati Bengals fans. It is designed to feel and behave like a native iOS app when added to the Home Screen on iPhone or iPad.

Live scores · Real-time Game Center · Who Dey Meter · Countdown to next home game · Full schedule · Roster with search & position filters · Recent results · NFL on FOX theme song on launch.

---

## Run on iPhone / iPad (Recommended)

1. Open the live app URL in **Safari** (not Chrome or other browsers).
2. Tap the **Share** button (square with arrow).
3. Scroll down and tap **Add to Home Screen**.
4. Confirm the name “WHO DEY LIVE” and tap **Add**.
5. Launch the new icon from your Home Screen.

The app now runs in **standalone mode**:
- No Safari UI chrome
- Black translucent status bar
- Full-screen experience with proper safe-area support for notch / Dynamic Island
- Theme song attempts to play on open (iOS may require a first tap)

This is the intended and fully supported way to use WHO DEY LIVE on iOS.

---

## Features

- **Live Game Center** — score, clock, down & distance, play-by-play, Who Dey Meter
- **Home screen** — live game spotlight, next home game countdown, recent results, quick actions
- **Schedule** — full season with filters (All / Home / Away / Upcoming / Completed)
- **Roster** — searchable player grid with position filters (QB, WR, RB, TE, OL, DL, LB, DB, ST)
- **Audio** — NFL on FOX theme plays automatically when the app opens
- **Real data** — live ESPN public endpoints (no API key required). Falls back to verified 2026 demo data only when offline
- **Dark + orange design** matching the original mobile mockups exactly

---

## Live Deploy

Deploy free on Vercel:

**https://vercel.com/new/clone?repository-url=https://github.com/joeyfrogge-jpg/who-dey-live**

After deploy you receive a permanent URL (example: `https://who-dey-live-xxxx.vercel.app`).  
That URL is the working app.  
`https://joeyfrogge-jpg.github.io/who-dey-live/` is only the README and is **not** the app.

---

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

```env
NEXT_PUBLIC_SEASON=2026
NEXT_PUBLIC_FORCE_DEMO=false
```

Open http://localhost:3000 in Safari (or any modern browser).  
For the most accurate iOS experience, use Safari on a real iPhone or the iOS Simulator.

---

## Project Structure

- `src/app/` — pages (Home, Live, Schedule, Players, Game Center, Settings)
- `src/components/` — UI building blocks (Scoreboard, WhoDeyMeter, Countdown, Nav, ThemeAudio…)
- `src/lib/providers/` — ESPN live data + verified demo fallback
- `public/` — static assets including `nfl-on-fox-theme.mp3` and `manifest.webmanifest`
- Fully typed TypeScript + Tailwind + Next.js 15 App Router

---

## Notes

- This is a fan-created experience. It is **not** affiliated with the National Football League or the Cincinnati Bengals organization.
- Scores and stats come from public ESPN endpoints and may be slightly delayed.
- Audio autoplay is subject to iOS Safari rules; the first user interaction will always start the theme if the browser blocked the initial attempt.

**Who Dey!**
