import { getBengalsSchedule, getNextGame, getNextHomeGame, getLiveGame, getRecentResults } from "@/lib/api/bengals";
import { HomeGameSpotlight } from "@/components/games/HomeGameSpotlight";
import { GameCard } from "@/components/schedule/GameCard";
import { Scoreboard } from "@/components/scoreboard/Scoreboard";
import { Countdown } from "@/components/animations/Countdown";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { APP_TAGLINE } from "@/lib/constants";
import { Radio, Calendar, Users, UsersRound } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function HomePage() {
  const { games, freshness } = await getBengalsSchedule();
  const live = getLiveGame(games);
  const next = getNextGame(games);
  const nextHome = getNextHomeGame(games);
  const recent = getRecentResults(games, 4);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center pt-2 pb-4">
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight leading-none">
          WHO DEY <span className="text-bengals-orange">LIVE</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base text-bengals-gray-light max-w-md mx-auto">
          {APP_TAGLINE}
        </p>
        {freshness.isDemo && (
          <p className="mt-3 text-xs text-bengals-gray flex items-center justify-center gap-2">
            <Badge variant="alert">DEMO DATA</Badge>
            <span>Using 2025 schedule fallback</span>
          </p>
        )}
      </section>

      {/* Live game spotlight */}
      {live && (
        <section className="space-y-4">
          <h2 className="font-display text-lg flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-bengals-red animate-pulse" />
            LIVE NOW
          </h2>
          <Scoreboard game={live} large showVenue />
          <div className="text-center">
            <Link
              href={`/game/${live.id}`}
              className="inline-flex items-center gap-2 rounded-lg bg-bengals-orange px-6 py-3 font-bold text-black shadow-orange-glow hover:bg-bengals-orange-bright active:scale-[0.98] transition-all"
            >
              Open Game Center
              <span className="text-lg">→</span>
            </Link>
          </div>
        </section>
      )}

      {/* Next home game — highest visual priority */}
      {nextHome && (!next || nextHome.id !== next.id) && (
        <section className="space-y-3">
          <h2 className="font-display text-lg text-bengals-orange tracking-wide">
            NEXT HOME GAME
          </h2>
          <HomeGameSpotlight game={nextHome} />
        </section>
      )}

      {/* Next game */}
      {next && (
        <section className="space-y-3">
          <h2 className="font-display text-lg tracking-wide">
            {next.isBengalsHome ? "NEXT HOME GAME" : "NEXT GAME"}
          </h2>
          {next.isBengalsHome ? (
            <HomeGameSpotlight game={next} />
          ) : (
            <div className="space-y-4">
              <GameCard game={next} featured />
              <div className="rounded-xl border border-bengals-charcoal-light bg-bengals-charcoal p-5">
                <p className="text-[11px] uppercase tracking-[0.2em] text-bengals-gray mb-4 text-center">
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
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg tracking-wide">RECENT RESULTS</h2>
            <Link
              href="/archive"
              className="text-sm text-bengals-orange hover:underline"
            >
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

      {/* Quick links — match mockup style */}
      <section className="grid grid-cols-2 gap-3">
        {[
          { href: "/schedule", label: "Schedule", sub: "Scores & Times", icon: Calendar },
          { href: "/players", label: "Players", sub: "Roster & Stats", icon: Users },
          { href: live ? `/game/${live.id}` : "/schedule", label: "Live", sub: "Bengals Live", icon: Radio },
          { href: "/archive", label: "Community", sub: "Fans & Culture", icon: UsersRound },
        ].map((l) => (
          <Link
            key={l.href + l.label}
            href={l.href}
            className="flex flex-col items-start gap-1 rounded-xl border border-bengals-charcoal-light bg-bengals-charcoal p-4 hover:border-bengals-orange/50 hover:bg-bengals-charcoal-mid transition-colors"
          >
            <l.icon className="h-5 w-5 text-bengals-orange mb-1" />
            <span className="font-medium text-white">{l.label}</span>
            <span className="text-xs text-bengals-gray">{l.sub}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
