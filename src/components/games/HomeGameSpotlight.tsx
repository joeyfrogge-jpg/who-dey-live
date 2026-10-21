"use client";

import { motion } from "framer-motion";
import type { Game } from "@/types";
import { Countdown } from "@/components/animations/Countdown";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { MapPin } from "lucide-react";

interface Props {
  game: Game;
}

export function HomeGameSpotlight({ game }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl border border-bengals-orange/50 bg-gradient-to-br from-bengals-charcoal via-[#1a0f0a] to-bengals-near-black shadow-orange-glow-lg"
    >
      {/* Animated light beams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 left-1/4 h-64 w-1 bg-gradient-to-b from-bengals-orange/40 to-transparent rotate-12"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute -top-10 right-1/3 h-48 w-1 bg-gradient-to-b from-bengals-orange/30 to-transparent -rotate-6"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        />
        <div className="absolute inset-0 bg-tiger-stripe opacity-30" />
      </div>

      <div className="relative p-6 md:p-10">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant="home">HOME GAME</Badge>
          <Badge variant="orange">PAYCOR STADIUM</Badge>
          {game.week && <span className="text-sm text-bengals-gray">Week {game.week}</span>}
        </div>

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display text-3xl md:text-5xl tracking-tight text-white mb-2"
        >
          vs {game.opponent.displayName}
        </motion.h2>

        <p className="text-bengals-gray-light mb-6 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-bengals-orange" />
          {game.venue || "Paycor Stadium"} · {game.kickoffEastern}
        </p>

        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-bengals-gray mb-3 text-center">
            Kickoff Countdown
          </p>
          <Countdown target={game.date} size="lg" />
        </div>

        <Link
          href={`/game/${game.id}`}
          className="inline-flex items-center justify-center rounded-md bg-bengals-orange px-6 py-3 font-bold text-black hover:bg-bengals-orange-bright transition-colors shadow-orange-glow"
        >
          View Game Center
        </Link>
      </div>
    </motion.section>
  );
}
