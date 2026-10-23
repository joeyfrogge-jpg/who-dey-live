/**
 * ESPN public endpoints — no API key required.
 */
import type { Game, GameDetail, RosterPlayer, Team, GameStatus } from "@/types";
import { BENGALS, SEASON } from "@/lib/constants";
import { formatKickoff } from "@/lib/time/eastern";

const ESPN_SITE = "https://site.api.espn.com/apis/site/v2/sports/football/nfl";
const TEAM_ID = BENGALS.id;

function mapStatus(s?: string): GameStatus {
  if (!s) return "upcoming";
  const u = s.toLowerCase();
  if (u.includes("halftime")) return "halftime";
  if (u.includes("in") || u === "status_in_progress") return "live";
  if (u.includes("final") || u === "status_final") return "final";
  if (u.includes("postpone")) return "postponed";
  if (u.includes("delay")) return "delayed";
  if (u.includes("cancel")) return "cancelled";
  return "upcoming";
}

function mapTeam(t: any): Team {
  return {
    id: String(t?.id ?? ""),
    name: t?.name ?? t?.displayName ?? "",
    abbreviation: t?.abbreviation ?? "",
    displayName: t?.displayName ?? t?.name ?? "",
    shortDisplayName: t?.shortDisplayName,
    location: t?.location,
    color: t?.color,
    alternateColor: t?.alternateColor,
    logo: t?.logo ?? t?.logos?.[0]?.href,
    record: t?.record?.items?.[0]?.summary ?? t?.recordSummary,
  };
}

function eventToGame(ev: any, season: number): Game | null {
  try {
    const comp = ev.competitions?.[0];
    if (!comp) return null;
    const competitors = comp.competitors || [];
    const home = competitors.find((c: any) => c.homeAway === "home");
    const away = competitors.find((c: any) => c.homeAway === "away");
    if (!home || !away) return null;
    const isBengalsHome = String(home.id) === TEAM_ID || home.team?.abbreviation === "CIN";
    const oppSide = isBengalsHome ? away : home;
    const date = ev.date || comp.date;
    const status = mapStatus(ev.status?.type?.name || ev.status?.type?.description || comp.status?.type?.name);
    let score: { home: number; away: number } | undefined;
    if (home.score != null && away.score != null) {
      score = { home: Number(home.score) || 0, away: Number(away.score) || 0 };
    }
    return {
      id: String(ev.id),
      season,
      week: ev.week?.number ?? comp.week?.number,
      seasonType: ev.season?.type === 1 ? "preseason" : ev.season?.type === 3 ? "postseason" : "regular",
      date,
      kickoffEastern: formatKickoff(date),
      status,
      period: ev.status?.period ?? comp.status?.period,
      clock: ev.status?.displayClock ?? comp.status?.displayClock,
      isBengalsHome,
      isHome: isBengalsHome,
      venue: comp.venue?.fullName || comp.venue?.name,
      opponent: mapTeam(oppSide.team || oppSide),
      homeTeam: mapTeam(home.team || home),
      awayTeam: mapTeam(away.team || away),
      score,
      broadcast: comp.broadcasts?.[0]?.names?.[0] || comp.geoBroadcasts?.[0]?.media?.shortName,
    };
  } catch {
    return null;
  }
}

export async function fetchEspnTeamSchedule(season = SEASON): Promise<{ games: Game[]; error?: string }> {
  try {
    const url = `${ESPN_SITE}/teams/${TEAM_ID}/schedule?season=${season}`;
    const res = await fetch(url, { next: { revalidate: 60 }, headers: { Accept: "application/json" } });
    if (!res.ok) return { games: [], error: `ESPN ${res.status}` };
    const data = await res.json();
    const games: Game[] = [];
    for (const ev of data.events || []) {
      const g = eventToGame(ev, season);
      if (g) games.push(g);
    }
    return { games };
  } catch (e: any) {
    return { games: [], error: e?.message || "ESPN fetch failed" };
  }
}

export async function fetchEspnGameSummary(gameId: string): Promise<{ detail: GameDetail | null; error?: string }> {
  try {
    const url = `${ESPN_SITE}/summary?event=${gameId}`;
    const res = await fetch(url, { next: { revalidate: 15 }, headers: { Accept: "application/json" } });
    if (!res.ok) return { detail: null, error: `ESPN ${res.status}` };
    const data = await res.json();
    const header = data.header;
    const comp = header?.competitions?.[0];
    if (!comp) return { detail: null, error: "No competition" };
    const competitors = comp.competitors || [];
    const home = competitors.find((c: any) => c.homeAway === "home");
    const away = competitors.find((c: any) => c.homeAway === "away");
    const isBengalsHome = String(home?.id) === TEAM_ID || home?.team?.abbreviation === "CIN";
    const date = header?.competitions?.[0]?.date || new Date().toISOString();
    const status = mapStatus(header?.competitions?.[0]?.status?.type?.name);
    const baseGame: Game = {
      id: String(header?.id || gameId),
      season: header?.season?.year || SEASON,
      week: header?.week,
      seasonType: "regular",
      date,
      kickoffEastern: formatKickoff(date),
      status,
      period: header?.competitions?.[0]?.status?.period,
      clock: header?.competitions?.[0]?.status?.displayClock,
      isBengalsHome,
      isHome: isBengalsHome,
      venue: comp.venue?.fullName,
      opponent: mapTeam((isBengalsHome ? away : home)?.team || {}),
      homeTeam: mapTeam(home?.team || {}),
      awayTeam: mapTeam(away?.team || {}),
      score: home?.score != null ? { home: Number(home.score), away: Number(away?.score) || 0 } : undefined,
    };
    const plays: any[] = [];
    const drives = [...(data.drives?.previous || []), ...(data.drives?.current ? [data.drives.current] : [])];
    for (const d of drives) {
      for (const p of d.plays || []) {
        plays.push({
          id: String(p.id),
          quarter: p.period?.number ?? p.period,
          clock: p.clock?.displayValue || "",
          text: p.text || p.shortText || "",
          scoringPlay: p.scoringPlay,
          teamId: p.team?.id,
          isBengalsPlay: String(p.team?.id) === TEAM_ID,
        });
      }
    }
    const teamStats: any[] = [];
    if (data.boxscore?.teams) {
      for (const t of data.boxscore.teams) {
        const stats: any = { teamId: String(t.team?.id) };
        for (const s of t.statistics || []) {
          const name = (s.name || "").toLowerCase();
          if (name.includes("total yard")) stats.totalYards = Number(s.value) || Number(s.displayValue);
          if (name.includes("passing yard")) stats.passingYards = Number(s.value) || Number(s.displayValue);
          if (name.includes("rushing yard")) stats.rushingYards = Number(s.value) || Number(s.displayValue);
          if (name.includes("turnover")) stats.turnovers = Number(s.value) || Number(s.displayValue);
          if (name.includes("possession")) stats.timeOfPossession = s.displayValue;
        }
        teamStats.push(stats);
      }
    }
    return { detail: { ...baseGame, plays: plays.slice(-40).reverse(), teamStats } };
  } catch (e: any) {
    return { detail: null, error: e?.message || "ESPN summary failed" };
  }
}

export async function fetchEspnRoster(season = SEASON): Promise<{ players: RosterPlayer[]; error?: string }> {
  try {
    const url = `${ESPN_SITE}/teams/${TEAM_ID}/roster?season=${season}`;
    const res = await fetch(url, { next: { revalidate: 3600 }, headers: { Accept: "application/json" } });
    if (!res.ok) return { players: [], error: `ESPN ${res.status}` };
    const data = await res.json();
    const players: RosterPlayer[] = [];
    for (const group of data.athletes || []) {
      for (const a of group.items || [group]) {
        if (!a.id) continue;
        players.push({
          id: String(a.id),
          fullName: a.displayName || a.fullName || `${a.firstName || ""} ${a.lastName || ""}`.trim(),
          firstName: a.firstName,
          lastName: a.lastName,
          jersey: a.jersey,
          position: a.position?.abbreviation || a.position?.name,
          headshot: a.headshot?.href,
          teamId: TEAM_ID,
          status: a.status?.type === "active" ? "active" : "inactive",
        });
      }
    }
    return { players };
  } catch (e: any) {
    return { players: [], error: e?.message || "ESPN roster failed" };
  }
}
