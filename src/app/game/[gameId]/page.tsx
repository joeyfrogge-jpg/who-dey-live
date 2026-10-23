import { getGameDetail, getBengalsScore, getBengalsSchedule } from "@/lib/api/bengals";
import { Scoreboard } from "@/components/scoreboard/Scoreboard";
import { WhoDeyMeter } from "@/components/games/WhoDeyMeter";
import { Badge } from "@/components/ui/Badge";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Radio } from "lucide-react";

export async function generateStaticParams() {
  try {
    const { games } = await getBengalsSchedule();
    return games
      .filter((g) => g.id && !g.id.startsWith("bye-"))
      .map((g) => ({ gameId: g.id }));
  } catch {
    return [{ gameId: "demo-2025-1" }];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  const { detail } = await getGameDetail(gameId);
  if (!detail) return { title: "Game Center" };
  const opp = detail.opponent?.abbreviation || "OPP";
  return {
    title: `CIN vs ${opp} · Game Center`,
  };
}

export default async function GameCenterPage({
  params,
}: {
  params: Promise<{ gameId: string }>;
}) {
  const { gameId } = await params;
  const { detail, freshness } = await getGameDetail(gameId);

  if (!detail) notFound();

  const isLive = detail.status === "live" || detail.status === "halftime";
  const isFinal = detail.status === "final";
  const plays = detail.plays?.slice().reverse().slice(0, 12) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-bengals-gray-light hover:text-bengals-orange transition-colors min-h-[44px]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <div className="flex items-center gap-2">
          {isLive && (
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-bengals-red">
              <span className="h-2 w-2 rounded-full bg-bengals-red animate-pulse" />
              LIVE
            </span>
          )}
          {isFinal && <Badge variant="final">FINAL</Badge>}
          {freshness.isDemo && <Badge variant="alert">DEMO</Badge>}
        </div>
      </div>

      <div className="text-center">
        <h1 className="font-display text-2xl md:text-3xl tracking-tight">
          <span className="text-bengals-orange">WHO DEY</span> LIVE
        </h1>
        <p className="text-sm text-bengals-gray mt-1">Live Game Center</p>
      </div>

      <Scoreboard game={detail} large showVenue />
      <WhoDeyMeter game={detail} />

      <div className="flex rounded-lg border border-bengals-charcoal-light bg-bengals-charcoal p-1">
        <button type="button" className="flex-1 rounded-md bg-bengals-orange/20 py-2 text-sm font-bold text-bengals-orange">
          Plays
        </button>
        <button type="button" className="flex-1 rounded-md py-2 text-sm font-medium text-bengals-gray-light">
          Stats
        </button>
        <button type="button" className="flex-1 rounded-md py-2 text-sm font-medium text-bengals-gray-light">
          Drive
        </button>
      </div>

      <section className="space-y-2">
        <h2 className="font-display text-sm tracking-widest text-bengals-gray uppercase">
          Recent Plays
        </h2>

        {plays.length === 0 ? (
          <div className="rounded-lg border border-bengals-charcoal-light bg-bengals-charcoal p-8 text-center text-bengals-gray">
            {isLive
              ? "Waiting for play-by-play data…"
              : isFinal
              ? "Full play-by-play available when connected to live feed."
              : "Game has not started yet."}
          </div>
        ) : (
          <div className="space-y-2">
            {plays.map((play) => (
              <div
                key={play.id}
                className={`rounded-lg border px-3 py-2.5 ${
                  play.scoringPlay
                    ? "border-bengals-orange/50 bg-bengals-orange/10"
                    : "border-bengals-charcoal-light bg-bengals-charcoal"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-bengals-gray mb-0.5">
                      {play.quarter} · {play.clock}
                    </p>
                    <p
                      className={`text-sm leading-snug ${
                        play.scoringPlay ? "font-semibold text-bengals-orange" : "text-white"
                      }`}
                    >
                      {play.text}
                    </p>
                  </div>
                  {play.scoringPlay && (
                    <span className="shrink-0 text-bengals-orange text-lg">★</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div className="pt-4 text-center">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-bengals-orange px-8 py-3.5 font-display text-lg font-bold text-black shadow-orange-glow-lg hover:bg-bengals-orange-bright active:scale-95 transition-all"
        >
          <Radio className="h-5 w-5" />
          WHO DEY
        </button>
        <p className="mt-2 text-[10px] text-bengals-gray">
          Celebrate the moment. Pure fan energy.
        </p>
      </div>
    </div>
  );
}
