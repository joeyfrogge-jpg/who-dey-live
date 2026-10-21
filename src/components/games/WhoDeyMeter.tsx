"use client";

import { motion } from "framer-motion";
import type { Game } from "@/types";
import { getBengalsScore } from "@/lib/api/bengals";
import { cn } from "@/lib/utils/cn";

/**
 * WHO DEY METER — playful, application-generated fan-energy visualization.
 * NOT an official statistic or measurement of crowd noise.
 * Deterministic formula based on score differential + game state.
 */
function calculateMeter(game: Game): number {
  const score = getBengalsScore(game);
  if (!score) return 35; // neutral pregame

  const diff = score.bengals - score.opponent;
  let base = 50 + diff * 4;

  if (game.status === "live") {
    // Late-game swings matter more
    const period = Number(game.period) || 1;
    if (period >= 4) base += diff > 0 ? 15 : -10;
    if (diff > 0) base += 10;
  }
  if (game.status === "final") {
    base = diff > 0 ? 90 : diff < 0 ? 15 : 50;
  }
  if (game.status === "halftime") {
    base = 50 + diff * 3;
  }

  return Math.max(5, Math.min(100, Math.round(base)));
}

interface Props {
  game: Game;
}

export function WhoDeyMeter({ game }: Props) {
  const value = calculateMeter(game);

  return (
    <div className="rounded-lg border border-bengals-charcoal-light bg-bengals-charcoal p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display text-sm tracking-wide text-bengals-orange">
          WHO DEY METER
        </h3>
        <span className="text-xs text-bengals-gray">Fan energy (app-generated)</span>
      </div>
      <div className="relative h-4 rounded-full bg-bengals-near-black overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full",
            value >= 70 ? "bg-gradient-to-r from-bengals-orange to-bengals-orange-bright" :
            value >= 40 ? "bg-bengals-orange/80" : "bg-bengals-gray"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <p className="mt-2 text-right font-score text-lg text-white">{value}</p>
      <p className="text-[10px] text-bengals-gray mt-1">
        Playful visualization based on score & game state. Not official.
      </p>
    </div>
  );
}
