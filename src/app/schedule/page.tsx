import { getBengalsSchedule, getNextGame } from "@/lib/api/bengals";
import { GameCard } from "@/components/schedule/GameCard";
import { Badge } from "@/components/ui/Badge";
import { SEASON } from "@/lib/constants";
import Link from "next/link";

export const metadata = {
  title: "Schedule",
};

export default async function SchedulePage() {
  const { games, freshness } = await getBengalsSchedule();
  const next = getNextGame(games);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight">
          Schedule
        </h1>
        <p className="text-bengals-gray-light mt-1 text-sm">
          {SEASON} · Every Cincinnati Bengals game
        </p>
        {freshness.isDemo && (
          <p className="mt-2 text-xs flex items-center gap-2">
            <Badge variant="alert">DEMO</Badge>
            <span className="text-bengals-gray">Showing verified 2025 results</span>
          </p>
        )}
      </div>

      {next && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-bengals-gray uppercase tracking-wider">
              Next up
            </h2>
            <Link href={`/game/${next.id}/`} className="text-xs text-bengals-orange">
              View →
            </Link>
          </div>
          <GameCard game={next} featured />
        </div>
      )}

      <div className="grid gap-3">
        {games.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>

      {games.length === 0 && (
        <p className="text-center text-bengals-gray py-16">
          No games available yet.
        </p>
      )}
    </div>
  );
}
