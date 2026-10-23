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
    const period = Number(game.period) || 1;
    if (period >= 4) base += diff > 0 ? 15 : -10;
    if (diff > 0) base += 10;
  }
  if (game.status === "final") {
    base = diff > 0 ? 92 : diff < 0 ? 18 : 50;
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
  const isHot = value >= 70;
  const isWarm = value >= 40;

  return (
    <div className="rounded-xl border border-bengals-charcoal-light bg-bengals-charcoal p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-bengals-orange/20">
            <span className="text-xs font-bold text-bengals-orange">1</span>
          </div>
          <h3 className="font-display text-sm tracking-wide text-white">
            WHO DEY METER
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-score text-lg font-bold text-white">{value}%</span>
          {isHot && <span className="text-bengals-orange text-sm">🔥</span>}
        </div>
      </div>

      <div className="relative h-3.5 rounded-full bg-bengals-near-black overflow-hidden">
        <motion.div
          className={cn(
            "h-full rounded-full",
            isHot
              ? "bg-gradient-to-r from-bengals-orange to-bengals-orange-bright shadow-[0_0_12px_rgba(251,79,20,0.5)]"
              : isWarm
              ? "bg-bengals-orange/80"
              : "bg-bengals-gray"
          )}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      </div>

      <p className="mt-2 text-[10px] text-bengals-gray">
        App-generated fan energy · based on score & game state · not official
      </p>
    </div>
  );
}
