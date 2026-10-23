import { getBengalsSchedule, getRecentResults, didBengalsWin } from "@/lib/api/bengals";
import { GameCard } from "@/components/schedule/GameCard";
import { Badge } from "@/components/ui/Badge";
import { SEASON } from "@/lib/constants";

export const metadata = { title: "Archive" };

export default async function ArchivePage() {
  const { games, freshness } = await getBengalsSchedule();
  const completed = getRecentResults(games, 50);

  const wins = completed.filter((g) => didBengalsWin(g) === true).length;
  const losses = completed.filter((g) => didBengalsWin(g) === false).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight">Archive</h1>
        <p className="text-bengals-gray-light mt-1 text-sm">
          Completed {SEASON} Bengals games
        </p>
        {freshness.isDemo && (
          <p className="mt-2">
            <Badge variant="alert">DEMO</Badge>
          </p>
        )}
      </div>

      {completed.length > 0 && (
        <div className="flex gap-4 rounded-xl border border-bengals-charcoal-light bg-bengals-charcoal px-4 py-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-bengals-gray">Wins</p>
            <p className="font-score text-2xl font-bold text-bengals-orange">{wins}</p>
          </div>
          <div className="w-px bg-bengals-charcoal-light" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-bengals-gray">Losses</p>
            <p className="font-score text-2xl font-bold text-bengals-gray-light">{losses}</p>
          </div>
          <div className="w-px bg-bengals-charcoal-light" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-bengals-gray">Games</p>
            <p className="font-score text-2xl font-bold text-white">{completed.length}</p>
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {completed.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>

      {completed.length === 0 && (
        <p className="text-center text-bengals-gray py-16">
          No completed games yet this season.
        </p>
      )}
    </div>
  );
}
