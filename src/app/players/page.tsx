import { getBengalsRoster } from "@/lib/api/bengals";
import { Badge } from "@/components/ui/Badge";
import Image from "next/image";

export const metadata = { title: "Roster" };

export default async function PlayersPage() {
  const { players, freshness } = await getBengalsRoster();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl md:text-4xl tracking-tight">Roster</h1>
          <p className="text-bengals-gray-light mt-1 text-sm">Cincinnati Bengals</p>
        </div>
        {freshness.isDemo && <Badge variant="alert">DEMO</Badge>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {players.map((p) => (
          <div
            key={p.id}
            className="group relative flex flex-col items-center gap-2 rounded-xl border border-bengals-charcoal-light bg-bengals-charcoal p-4"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-bengals-near-black ring-2 ring-bengals-charcoal-light">
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
              <p className="mt-1 text-sm font-medium text-white truncate">{p.fullName}</p>
              <p className="text-xs text-bengals-gray">{p.position || "–"}</p>
            </div>
          </div>
        ))}
      </div>

      {players.length === 0 && (
        <p className="text-center text-bengals-gray py-16">No players found.</p>
      )}
    </div>
  );
}
