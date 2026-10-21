/**
 * Central Bengals data access layer.
 * Tries ESPN first; falls back to demo data with clear labeling.
 */

import type { Game, GameDetail, RosterPlayer, DataFreshness } from "@/types";
import { fetchEspnTeamSchedule, fetchEspnGameSummary, fetchEspnRoster } from "@/lib/providers/espn";
import {
  DEMO_SCHEDULE,
  DEMO_ROSTER,
  getDemoGameDetail,
} from "@/lib/providers/demo-data";
import { SEASON } from "@/lib/constants";

const USE_DEMO = process.env.NEXT_PUBLIC_FORCE_DEMO === "true";

export async function getBengalsSchedule(season = SEASON): Promise<{
  games: Game[];
  freshness: DataFreshness;
}> {
  if (!USE_DEMO) {
    const result = await fetchEspnTeamSchedule(season);
    if (result.games.length > 0 && !result.error) {
      // Only Bengals games by construction
      return {
        games: result.games,
        freshness: {
          lastFetched: new Date().toISOString(),
          source: "espn",
          isStale: false,
          isDemo: false,
        },
      };
    }
  }

  // Demo fallback
  return {
    games: DEMO_SCHEDULE.filter((g) => g.season === season || season === SEASON),
    freshness: {
      lastFetched: new Date().toISOString(),
      source: "demo",
      isStale: false,
      isDemo: true,
    },
  };
}

export async function getGameDetail(gameId: string): Promise<{
  detail: GameDetail | null;
  freshness: DataFreshness;
}> {
  if (!USE_DEMO && !gameId.startsWith("bye-")) {
    const result = await fetchEspnGameSummary(gameId);
    if (result.detail) {
      return {
        detail: result.detail,
        freshness: {
          lastFetched: new Date().toISOString(),
          source: "espn",
          isStale: false,
          isDemo: false,
        },
      };
    }
  }

  const detail = getDemoGameDetail(gameId);
  return {
    detail,
    freshness: {
      lastFetched: new Date().toISOString(),
      source: "demo",
      isStale: false,
      isDemo: true,
    },
  };
}

export async function getBengalsRoster(season = SEASON): Promise<{
  players: RosterPlayer[];
  freshness: DataFreshness;
}> {
  if (!USE_DEMO) {
    const result = await fetchEspnRoster(season);
    if (result.players.length > 0) {
      return {
        players: result.players,
        freshness: {
          lastFetched: new Date().toISOString(),
          source: "espn",
          isStale: false,
          isDemo: false,
        },
      };
    }
  }

  return {
    players: DEMO_ROSTER,
    freshness: {
      lastFetched: new Date().toISOString(),
      source: "demo",
      isStale: false,
      isDemo: true,
    },
  };
}

export function getNextGame(games: Game[]): Game | null {
  const now = Date.now();
  const upcoming = games
    .filter((g) => g.id !== "bye-2025-10" && g.status !== "final" && new Date(g.date).getTime() > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return upcoming[0] || null;
}

export function getNextHomeGame(games: Game[]): Game | null {
  const now = Date.now();
  const upcoming = games
    .filter(
      (g) =>
        g.isBengalsHome &&
        g.id !== "bye-2025-10" &&
        g.status !== "final" &&
        new Date(g.date).getTime() > now
    )
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return upcoming[0] || null;
}

export function getLiveGame(games: Game[]): Game | null {
  return games.find((g) => g.status === "live" || g.status === "halftime") || null;
}

export function getRecentResults(games: Game[], limit = 5): Game[] {
  return games
    .filter((g) => g.status === "final" && g.id !== "bye-2025-10" && g.score)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getBengalsScore(game: Game): { bengals: number; opponent: number } | null {
  if (!game.score) return null;
  if (game.isBengalsHome) {
    return { bengals: game.score.home, opponent: game.score.away };
  }
  return { bengals: game.score.away, opponent: game.score.home };
}

export function didBengalsWin(game: Game): boolean | null {
  const s = getBengalsScore(game);
  if (!s || game.status !== "final") return null;
  return s.bengals > s.opponent;
}
