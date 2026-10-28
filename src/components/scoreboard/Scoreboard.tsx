"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Game } from "@/types";
import { getBengalsScore } from "@/lib/api/bengals";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils/cn";

interface ScoreboardProps {
  game: Game;
  large?: boolean;
  showVenue?: boolean;
}

export function Scoreboard({ game, large = false, showVenue = true }: ScoreboardProps) {
  const score = getBengalsScore(game);
  const isLive = game.status === "live" || game.status === "halftime";
  const isFinal = game.status === "final";
  const isHome = game.isBengalsHome;

  const bengalsScore = score?.bengals ?? 0;
  const oppScore = score?.opponent ?? 0;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-bengals-charcoal",
        isHome ? "border-bengals-orange/50 shadow-orange-glow" : "border-bengals-charcoal-light",
        large && "p-6 md:p-8",
        !large && "p-4"
      )}
    >
      {isHome && <div className="absolute inset-0 bg-tiger-stripe opacity-40 pointer-events-none" />}

      <div className="relative">
        {/* Status row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {isHome && <Badge variant="home">HOME FIELD</Badge>}
            {isLive && <Badge variant="live">{game.status === "halftime" ? "HALFTIME" : "LIVE"}</Badge>}
            {isFinal && <Badge variant="final">FINAL</Badge>}
            {game.status === "upcoming" && <Badge variant="orange">UPCOMING</Badge>}
          </div>
          {isLive && game.clock && (
            <span className="font-score text-sm text-bengals-orange">{game.clock}</span>
          )}
        </div>

        {/* Teams + scores */}
        <div className="grid grid-cols-3 items-center gap-2">
          {/* Bengals */}
          <div className="text-center">
            <p className="text-xs text-bengals-gray mb-1">CIN</p>
            <p className={cn("font-display tracking-tight", large ? "text-2xl md:text-3xl" : "text-xl")}>
              Bengals
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={bengalsScore}
                initial={{ scale: 1.2, color: "#FB4F14" }}
                animate={{ scale: 1, color: "#FFFFFF" }}
                className={cn(
                  "font-score font-bold tabular-nums mt-2",
                  large ? "text-5xl md:text-6xl" : "text-3xl"
                )}
              >
                {score ? bengalsScore : "–"}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Center */}
          <div className="text-center">
            <p className="text-bengals-gray text-sm">vs</p>
            {game.period && isLive && (
              <p className="text-xs text-bengals-gray-light mt-1">Q{game.period}</p>
            )}
          </div>

          {/* Opponent */}
          <div className="text-center">
            <p className="text-xs text-bengals-gray mb-1">{game.opponent.abbreviation}</p>
            <p className={cn("font-display tracking-tight truncate", large ? "text-2xl md:text-3xl" : "text-xl")}>
              {game.opponent.shortDisplayName || game.opponent.name}
            </p>
            <AnimatePresence mode="wait">
              <motion.p
                key={oppScore}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                className={cn(
                  "font-score font-bold tabular-nums mt-2 text-bengals-gray-light",
                  large ? "text-5xl md:text-6xl" : "text-3xl"
                )}
              >
                {score ? oppScore : "–"}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {showVenue && game.venue && (
          <p className="mt-4 text-center text-xs text-bengals-gray">{game.venue}</p>
        )}
        {game.kickoffEastern && game.status === "upcoming" && (
          <p className="mt-2 text-center text-sm text-bengals-orange">{game.kickoffEastern}</p>
        )}
      </div>
    </div>
  );
}
