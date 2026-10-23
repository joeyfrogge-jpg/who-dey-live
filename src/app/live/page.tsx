import Link from "next/link";
import { getBengalsSchedule, getLiveGame, getNextGame } from "@/lib/api/bengals";
import { Scoreboard } from "@/components/scoreboard/Scoreboard";
import { GameCard } from "@/components/schedule/GameCard";

export const metadata = { title: "Live" };

export default async function LivePage() {
  const { games } = await getBengalsSchedule();
  const live = getLiveGame(games);
  const next = getNextGame(games);

  if (live) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-2xl tracking-tight flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-bengals-red animate-pulse" />
          LIVE NOW
        </h1>
        <Scoreboard game={live} large showVenue />
        <div className="text-center">
          <Link
            href={`/game/${live.id}`}
            className="inline-flex rounded-lg bg-bengals-orange px-6 py-3 font-bold text-black"
          >
            Open Game Center →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl tracking-tight">No live game</h1>
      <p className="text-bengals-gray-light text-sm">Nothing is live right now.</p>
      {next && (
        <div className="space-y-3">
          <h2 className="text-sm uppercase tracking-wider text-bengals-gray">Next up</h2>
          <GameCard game={next} featured />
          <Link href={`/game/${next.id}`} className="text-sm text-bengals-orange">
            View game center →
          </Link>
        </div>
      )}
      <Link href="/schedule" className="text-sm text-bengals-orange block">
        Full schedule →
      </Link>
    </div>
  );
}
