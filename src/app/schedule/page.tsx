import { getBengalsSchedule } from "@/lib/api/bengals";
import { GameCard } from "@/components/schedule/GameCard";
import { Badge } from "@/components/ui/Badge";
import { SEASON } from "@/lib/constants";

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

  let filtered = games;
  if (filter === "home") filtered = games.filter((g) => g.isBengalsHome && !g.id.startsWith("bye-"));
  if (filter === "away") filtered = games.filter((g) => !g.isBengalsHome);
  if (filter === "upcoming")
    filtered = games.filter((g) => g.status === "upcoming" || g.status === "pregame");
  if (filter === "completed")
    filtered = games.filter((g) => g.status === "final");

  const filters = [
    { key: "", label: "All" },
    { key: "upcoming", label: "Upcoming" },
    { key: "completed", label: "Completed" },
    { key: "home", label: "Home" },
    { key: "away", label: "Away" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight">
          {SEASON} SCHEDULE
        </h1>
        <p className="text-bengals-gray-light mt-1">
          Every Cincinnati Bengals game. Nothing else.
        </p>
        {freshness.isDemo && (
          <p className="mt-2 text-xs">
            <Badge variant="alert">DEMO</Badge>
            <span className="ml-2 text-bengals-gray">Showing verified 2025 results</span>
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <a
            key={f.key}
            href={f.key ? `/schedule?filter=${f.key}` : "/schedule"}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              (filter || "") === f.key
                ? "bg-bengals-orange text-black"
                : "bg-bengals-charcoal text-bengals-gray-light hover:text-white"
            }`}
          >
            {f.label}
          </a>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((g) => (
          <GameCard key={g.id} game={g} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-bengals-gray py-12">No games match this filter.</p>
      )}
    </div>
  );
}
