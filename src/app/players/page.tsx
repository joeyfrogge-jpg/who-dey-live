import { getBengalsRoster } from "@/lib/api/bengals";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export const metadata = { title: "Roster" };

const POSITIONS = ["All", "QB", "WR", "RB", "TE", "OL", "DL", "LB", "DB", "ST"] as const;

export default async function PlayersPage({
  searchParams,
}: {
  searchParams: Promise<{ pos?: string }>;
}) {
  const { pos } = await searchParams;
  const { players, freshness } = await getBengalsRoster();

  const activePos = pos || "All";

  const filtered =
    activePos === "All"
      ? players
      : players.filter((p) => {
          const position = (p.position || "").toUpperCase();
          if (activePos === "OL") return ["OT", "OG", "C", "OL", "G", "T"].includes(position);
          if (activePos === "DL") return ["DE", "DT", "DL", "NT"].includes(position);
          if (activePos === "DB") return ["CB", "S", "FS", "SS", "DB"].includes(position);
          if (activePos === "ST") return ["K", "P", "LS"].includes(position);
          return position === activePos;
        });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl md:text-4xl tracking-tight">Roster</h1>
          <p className="text-bengals-gray-light mt-1 text-sm">Cincinnati Bengals</p>
        </div>
        {freshness.isDemo && (
          <Badge variant="alert">DEMO</Badge>
        )}
      </div>

      {/* Search placeholder + position chips */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="search"
            placeholder="Search players"
            disabled
            className="w-full rounded-xl border border-bengals-charcoal-light bg-bengals-charcoal px-4 py-3 text-sm text-white placeholder:text-bengals-gray focus:outline-none focus:border-bengals-orange/50"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {POSITIONS.map((p) => {
            const active = activePos === p;
            return (
              <Link
                key={p}
                href={p === "All" ? "/players" : `/players?pos=${p}`}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? "bg-bengals-orange text-black"
                    : "bg-bengals-charcoal text-bengals-gray-light border border-bengals-charcoal-light hover:text-white"
                }`}
              >
                {p}
              </Link>
            );
          })}
        </div>
      </div>

      {/* 2-column player grid */}
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((p) => (
          <Link
            key={p.id}
            href={`/players/${p.id}`}
            className="group relative flex flex-col items-center gap-2 rounded-xl border border-bengals-charcoal-light bg-bengals-charcoal p-4 hover:border-bengals-orange/50 transition-colors"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-bengals-near-black ring-2 ring-bengals-charcoal-light group-hover:ring-bengals-orange/40 transition-all">
              {p.headshot ? (
                <Image
                  src={p.headshot}
                  alt={p.fullName}
                  fill
                  className="object-cover"
                  sizes="56px"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-bengals-gray text-xs">
                  #{p.jersey || "–"}
                </div>
              )}
            </div>

            <div className="text-center min-w-0 w-full">
              <p className="font-score text-2xl font-bold text-bengals-orange leading-none">
                {p.jersey || "–"}
              </p>
              <p className="mt-1 text-sm font-medium text-white truncate">
                {p.fullName}
              </p>
              <p className="text-xs text-bengals-gray">{p.position || "–"}</p>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-bengals-gray py-16">
          No players found for this position.
        </p>
      )}
    </div>
  );
}
