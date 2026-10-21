import { getBengalsSchedule, getRecentResults } from "@/lib/api/bengals";
import { GameCard } from "@/components/schedule/GameCard";
import { SEASON } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const metadata = { title: "Archive" };

export default async function ArchivePage() {
  const { games } = await getBengalsSchedule();
  const completed = getRecentResults(games, 50);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight">GAME ARCHIVE</h1>
        <p className="text-bengals-gray-light mt-1">
          Completed {SEASON} Bengals games
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {completed.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>

      {completed.length === 0 && (
        <p className="text-center text-bengals-gray py-12">No completed games yet this season.</p>
      )}
    </div>
  );
}
