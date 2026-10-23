import { getBengalsSchedule, getNextGame } from "@/lib/api/bengals";
import { GameCard } from "@/components/schedule/GameCard";
import { Badge } from "@/components/ui/Badge";
import { SEASON } from "@/lib/constants";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 300;

export const metadata = {
  title: "Schedule",
};

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const { games, freshness } = await getBengalsSchedule();
  const next = getNextGame(games);

  let filtered = games;
  if (filter === "home") filtered = games.filter((g) => g.isBengalsHome && !g.id.startsWith("bye-"));
  if (filter === "away") filtered = games.filter((g) => !g.isBengalsHome && !g.id.startsWith("bye-"));
  if (filter === "upcoming")
    filtered = games.filter((g) => g.status === "upcoming" || g.status === "pregame");
  if (filter === "completed")
    filtered = games.filter((g) => g.status === "final");

  const filters = [
    { key: "", label: "All" },
    { key: "home", label: "Home" },
    { key: "away", label: "Away" },
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Completed" },
  ];

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

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const active = (filter || "") === f.key;
          return (
            <Link
              key={f.key}
              href={f.key ? `/schedule?filter=${f.key}` : "/schedule"}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-bengals-orange text-black shadow-orange-glow"
                  : "bg-bengals-charcoal text-bengals-gray-light border border-bengals-charcoal-light hover:text-white hover:border-bengals-gray"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {/* Next up highlight */}
      {next && !filter && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-bengals-gray uppercase tracking-wider">
              Next up
            </h2>
            <Link href={`/game/${next.id}`} className="text-xs text-bengals-orange">
              View →
            </Link>
          </div>
          <GameCard game={next} featured />
        </div>
      )}

      {/* Game list */}
      <div className="grid gap-3">
        {filtered.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-bengals-gray py-16">
          No games match this filter.
        </p>
      )}
    </div>
  );
}
