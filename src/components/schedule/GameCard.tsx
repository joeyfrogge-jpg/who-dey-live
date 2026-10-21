"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Game } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { getBengalsScore, didBengalsWin } from "@/lib/api/bengals";
import { cn } from "@/lib/utils/cn";
import { MapPin, Clock } from "lucide-react";

interface GameCardProps {
  game: Game;
  featured?: boolean;
  compact?: boolean;
}

export function GameCard({ game, featured = false, compact = false }: GameCardProps) {
  const isBye = game.id.startsWith("bye-") || game.opponent.abbreviation === "BYE";
  const isHome = game.isBengalsHome;
  const score = getBengalsScore(game);
  const won = didBengalsWin(game);
  const isLive = game.status === "live" || game.status === "halftime";
  const isFinal = game.status === "final";

  if (isBye) {
    return (
      <div className="rounded-lg border border-dashed border-bengals-charcoal-light bg-bengals-charcoal/50 p-4 text-center">
        <Badge variant="bye">BYE WEEK</Badge>
        <p className="mt-2 text-sm text-bengals-gray">Week {game.week}</p>
      </div>
    );
  }

  return (
    <Link href={`/game/${game.id}`}>
      <motion.article
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={cn(
          "relative overflow-hidden rounded-lg border transition-colors",
          isHome
            ? "border-bengals-orange/40 bg-gradient-to-br from-bengals-charcoal via-bengals-charcoal to-bengals-near-black shadow-orange-glow"
            : "border-bengals-charcoal-light bg-bengals-charcoal hover:border-bengals-gray/40",
          featured && "ring-1 ring-bengals-orange/50",
          isLive && "border-bengals-red/60"
        )}
      >
        {/* Tiger stripe accent for home */}
        {isHome && (
          <div className="absolute inset-0 bg-tiger-stripe pointer-events-none opacity-60" />
        )}

        <div className={cn("relative p-4", compact && "p-3")}>
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex flex-wrap gap-1.5">
              {isHome && <Badge variant="home">HOME</Badge>}
              {!isHome && <Badge variant="away">AWAY</Badge>}
              {isLive && <Badge variant="live">LIVE</Badge>}
              {isFinal && <Badge variant="final">FINAL</Badge>}
              {game.week && (
                <span className="text-xs text-bengals-gray">Wk {game.week}</span>
              )}
            </div>
            {game.seasonType !== "regular" && (
              <span className="text-xs uppercase text-bengals-gray">{game.seasonType}</span>
            )}
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Opponent */}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-bengals-gray mb-0.5">
                {isHome ? "vs" : "@"} {game.opponent.displayName}
              </p>
              <p className="font-display text-lg md:text-xl tracking-tight truncate">
                {game.opponent.abbreviation}
              </p>
              {game.opponent.record && (
                <p className="text-xs text-bengals-gray">{game.opponent.record}</p>
              )}
            </div>

            {/* Score or time */}
            <div className="text-right shrink-0">
              {score && (isFinal || isLive) ? (
                <div className="font-score text-2xl md:text-3xl font-bold tabular-nums">
                  <span className={cn(won === true && "text-bengals-orange", won === false && "text-bengals-gray")}>
                    {score.bengals}
                  </span>
                  <span className="text-bengals-gray mx-1">–</span>
                  <span>{score.opponent}</span>
                </div>
              ) : (
                <div className="text-sm text-bengals-gray-light">
                  <Clock className="inline h-3.5 w-3.5 mr-1" />
                  {game.kickoffEastern.replace(" · ", "\n")}
                </div>
              )}
              {isLive && game.clock && (
                <p className="text-xs text-bengals-red mt-0.5">{game.clock}</p>
              )}
            </div>
          </div>

          {game.venue && !compact && (
            <p className="mt-3 flex items-center gap-1 text-xs text-bengals-gray">
              <MapPin className="h-3 w-3" />
              {game.venue}
            </p>
          )}
        </div>
      </motion.article>
    </Link>
  );
}
