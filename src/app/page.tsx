import { getBengalsSchedule, getNextGame, getNextHomeGame, getLiveGame, getRecentResults, getBengalsScore, didBengalsWin } from "@/lib/api/bengals";
import { HomeGameSpotlight } from "@/components/games/HomeGameSpotlight";
import { GameCard } from "@/components/schedule/GameCard";
import { Scoreboard } from "@/components/scoreboard/Scoreboard";
import { Countdown } from "@/components/animations/Countdown";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { APP_TAGLINE } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function HomePage() {
  const { games, freshness } = await getBengalsSchedule();
  const live = getLiveGame(games);
  const next = getNextGame(games);
  const nextHome = getNextHomeGame(games);
  const recent = getRecentResults(games, 4);

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="text-center py-6">
        <h1 className="font-display text-4xl md:text-6xl tracking-tight">
          WHO DEY <span className="text-bengals-orange">LIVE</span>
        </h1>
        <p className="mt-2 text-bengals-gray-light max-w-lg mx-auto">{APP_TAGLINE}</p>
        {freshness.isDemo && (
          <p className="mt-3 text-xs text-bengals-gray">
            <Badge variant="alert">DEMO DATA</Badge>
            <span className="ml-2">Using 2025 schedule fallback. Connect ESPN or set FORCE_DEMO=false.</span>
          </p>
        )}
      </section>

      {/* Live game spotlight */}
      {live && (
        <section>
          <h2 className="font-display text-xl mb-4 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-bengals-red animate-pulse" />
            LIVE NOW
          </h2>
          <Scoreboard game={live} large showVenue />
          <div className="mt-4 text-center">
            <Link
              href={`/game/${live.id}`}
              className="inline-flex rounded-md bg-bengals-orange px-5 py-2.5 font-bold text-black hover:bg-bengals-orange-bright"
            >
              Open Game Center
            </Link>
          </div>
        </section>
      )}

      {/* Next home game — highest visual priority */}
      {nextHome && nextHome.id !== next?.id && (
        <section>
          <h2 className="font-display text-xl mb-4 text-bengals-orange">NEXT HOME GAME</h2>
          <HomeGameSpotlight game={nextHome} />
        </section>
      )}

      {/* Next game (if not already shown as home) */}
      {next && (
        <section>
          <h2 className="font-display text-xl mb-4">
            {next.isBengalsHome ? "NEXT HOME GAME" : "NEXT GAME"}
          </h2>
          {next.isBengalsHome ? (
            <HomeGameSpotlight game={next} />
          ) : (
            <div className="space-y-4">
              <GameCard game={next} featured />
              <div className="rounded-lg border border-bengals-charcoal-light bg-bengals-charcoal p-4">
                <p className="text-xs uppercase tracking-widest text-bengals-gray mb-3 text-center">
                  Kickoff Countdown
                </p>
                <Countdown target={next.date} size="md" />
              </div>
            </div>
          )}
        </section>
      )}

      {/* Recent results */}
      {recent.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl">RECENT RESULTS</h2>
            <Link href="/archive" className="text-sm text-bengals-orange hover:underline">
              View archive →
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {recent.map((g) => (
              <GameCard key={g.id} game={g} compact />
            ))}
          </div>
        </section>
      )}

      {/* Quick links */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: "/schedule", label: "Full Schedule" },
          { href: "/players", label: "Roster" },
          { href: "/archive", label: "Game Archive" },
          { href: "/settings", label: "Settings" },
        ].map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="rounded-lg border border-bengals-charcoal-light bg-bengals-charcoal p-4 text-center font-medium hover:border-bengals-orange/40 hover:text-bengals-orange transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </section>
    </div>
  );
}
