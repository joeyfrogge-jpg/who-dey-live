import { getBengalsRoster } from "@/lib/api/bengals";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

export const metadata = { title: "Players" };

export default async function PlayersPage() {
  const { players, freshness } = await getBengalsRoster();

  const byPos = players.reduce<Record<string, typeof players>>((acc, p) => {
    const pos = p.position || "Other";
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(p);
    return acc;
  }, {});

  const order = ["QB", "RB", "WR", "TE", "OT", "OG", "C", "DE", "DT", "LB", "CB", "S", "K", "P", "LS", "Other"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl md:text-4xl tracking-tight">ROSTER</h1>
        <p className="text-bengals-gray-light mt-1">Cincinnati Bengals</p>
        {freshness.isDemo && (
          <p className="mt-2 text-xs">
            <Badge variant="alert">DEMO ROSTER</Badge>
            <span className="ml-2 text-bengals-gray">Key players shown. Full roster via ESPN when available.</span>
          </p>
        )}
      </div>

      {order.map((pos) => {
        const group = byPos[pos];
        if (!group?.length) return null;
        return (
          <section key={pos}>
            <h2 className="font-display text-lg text-bengals-orange mb-3">{pos}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.map((p) => (
                <Link
                  key={p.id}
                  href={`/players/${p.id}`}
                  className="flex items-center gap-3 rounded-lg border border-bengals-charcoal-light bg-bengals-charcoal p-3 hover:border-bengals-orange/40 transition-colors"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-bengals-near-black">
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
                        #{p.jersey}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium truncate">{p.fullName}</p>
                    <p className="text-xs text-bengals-gray">
                      #{p.jersey} · {p.position}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
