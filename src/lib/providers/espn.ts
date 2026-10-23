/**
 * ESPN public API client for Bengals data.
 * Uses site.api.espn.com (no key required).
 */

import type {
  Game,
  GameDetail,
  GameStatus,
  RosterPlayer,
  Team,
  PlayEvent,
} from "@/types";
import { BENGALS } from "@/lib/constants";
import { formatInTimeZone } from "date-fns-tz";

const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports/football/nfl";
const TEAM_ID = BENGALS.id; // "4"

function mapStatus(espnStatus: string, state?: string): GameStatus {
  const s = (state || espnStatus || "").toLowerCase();
  if (s.includes("in") || s === "in") return "live";
  if (s.includes("halftime") || s === "halftime") return "halftime";
  if (s.includes("final") || s === "post") return "final";
  if (s.includes("pre") || s === "pre") return "pregame";
  if (s.includes("postponed")) return "postponed";
  if (s.includes("delayed")) return "delayed";
  if (s.includes("cancel")) return "cancelled";
  return "upcoming";
}

function toTeam(competitor: any): Team {
  const t = competitor?.team || competitor || {};
  return {
    id: String(t.id || ""),
    name: t.name || t.displayName || "",
    abbreviation: t.abbreviation || "",
    displayName: t.displayName || t.name || "",
    shortDisplayName: t.shortDisplayName || t.abbreviation,
    location: t.location,
    color: t.color,
    alternateColor: t.alternateColor,
    logo: t.logo || (t.logos?.[0]?.href),
    record: competitor?.records?.[0]?.summary || t.recordSummary,
  };
}

function parseGame(event: any, season: number): Game | null {
  try {
    const competition = event.competitions?.[0];
    if (!competition) return null;

    const competitors = competition.competitors || [];
    const home = competitors.find((c: any) => c.homeAway === "home");
    const away = competitors.find((c: any) => c.homeAway === "away");
    if (!home || !away) return null;

    const isBengalsHome = String(home.team?.id) === TEAM_ID;
    const bengalsComp = isBengalsHome ? home : away;
    const oppComp = isBengalsHome ? away : home;

    const statusObj = competition.status || event.status || {};
    const status = mapStatus(statusObj.type?.name || "", statusObj.type?.state);
    const period = statusObj.period;
    const clock = statusObj.displayClock || statusObj.clock;

    const date = event.date || competition.date;
    const kickoffEastern = date
      ? formatInTimeZone(new Date(date), "America/New_York", "EEE, MMM d · h:mm a zzz")
      : "";

    const score =
      status === "upcoming" || status === "pregame"
        ? undefined
        : {
            home: Number(home.score ?? 0),
            away: Number(away.score ?? 0),
            homeRecord: home.records?.[0]?.summary,
            awayRecord: away.records?.[0]?.summary,
          };

    const venue = competition.venue?.fullName || competition.venue?.name;
    const broadcasts = (competition.broadcasts || [])
      .flatMap((b: any) => b.names || [])
      .filter(Boolean);

    return {
      id: String(event.id),
      season,
      seasonType: event.seasonType?.type === 3 ? "postseason" : event.seasonType?.type === 1 ? "preseason" : "regular",
      week: event.week?.number ?? competition.week?.number,
      name: event.name || event.shortName || "",
      shortName: event.shortName,
      date,
      kickoffEastern,
      status,
      period: period ? String(period) : undefined,
      clock: clock || undefined,
      venue,
      isHome: isBengalsHome,
      isBengalsHome,
      bengals: toTeam(bengalsComp),
      opponent: toTeam(oppComp),
      score,
      broadcasts,
      lastUpdated: new Date().toISOString(),
      possession: competition.situation?.possession === home.team?.id ? "home" : competition.situation?.possession === away.team?.id ? "away" : null,
      downDistance: competition.situation?.downDistanceText,
      ballPosition: competition.situation?.possessionText,
    };
  } catch {
    return null;
  }
}

export async function fetchEspnTeamSchedule(season: number): Promise<{
  games: Game[];
  error?: string;
}> {
  try {
    const url = `${ESPN_BASE}/teams/${TEAM_ID}/schedule?season=${season}`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      return { games: [], error: `ESPN ${res.status}` };
    }
    const data = await res.json();
    const events = data.events || [];
    const games = events
      .map((e: any) => parseGame(e, season))
      .filter(Boolean) as Game[];

    return { games };
  } catch (e: any) {
    return { games: [], error: e?.message || "fetch failed" };
  }
}

export async function fetchEspnGameSummary(gameId: string): Promise<{
  detail: GameDetail | null;
  error?: string;
}> {
  try {
    const url = `${ESPN_BASE}/summary?event=${gameId}`;
    const res = await fetch(url, {
      next: { revalidate: 15 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return { detail: null, error: `ESPN ${res.status}` };
    const data = await res.json();

    const header = data.header;
    const competition = header?.competitions?.[0] || data.competitions?.[0];
    if (!competition) return { detail: null };

    const eventLike = {
      id: gameId,
      date: competition.date || header?.competitions?.[0]?.date,
      name: header?.name || "",
      shortName: header?.shortName,
      seasonType: header?.season,
      week: header?.week,
      competitions: [competition],
      status: competition.status,
    };
    const season = Number(header?.season?.year || new Date().getFullYear());
    const base = parseGame(eventLike, season);
    if (!base) return { detail: null };

    const plays: PlayEvent[] = [];
    const drives = data.drives?.previous || data.drives?.current ? [data.drives.current, ...(data.drives.previous || [])].filter(Boolean) : [];
    for (const drive of drives) {
      for (const p of drive.plays || []) {
        plays.push({
          id: String(p.id || Math.random()),
          sequence: p.sequenceNumber,
          quarter: p.period?.number ?? p.period,
          clock: p.clock?.displayValue || "",
          text: p.text || p.description || "",
          shortText: p.shortText,
          type: p.type?.text,
          scoringPlay: !!p.scoringPlay,
          teamId: p.team?.id,
          homeScore: p.homeScore,
          awayScore: p.awayScore,
          down: p.start?.down,
          distance: p.start?.distance,
          yardLine: p.start?.yardLine,
          yardsGained: p.statYardage,
          isBengalsPlay: String(p.team?.id) === TEAM_ID,
        });
      }
    }
    plays.sort((a, b) => (b.sequence || 0) - (a.sequence || 0));

    const detail: GameDetail = {
      ...base,
      plays: plays.slice(0, 40),
      drives: drives.map((d: any, i: number) => ({
        id: String(d.id || i),
        teamId: String(d.team?.id || ""),
        plays: d.offensivePlays || d.plays?.length || 0,
        yards: d.yards || 0,
        timeOfPossession: d.timeOfPossession,
        result: d.result?.displayText || d.displayResult,
        isScore: !!d.isScore,
        isCurrent: i === 0,
      })),
    };

    return { detail };
  } catch (e: any) {
    return { detail: null, error: e?.message };
  }
}

export async function fetchEspnRoster(season: number): Promise<{
  players: RosterPlayer[];
  error?: string;
}> {
  try {
    const url = `${ESPN_BASE}/teams/${TEAM_ID}/roster`;
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return { players: [], error: `ESPN ${res.status}` };
    const data = await res.json();

    const players: RosterPlayer[] = [];
    const groups = data.athletes || [];
    for (const group of groups) {
      for (const item of group.items || []) {
        players.push({
          id: String(item.id),
          fullName: item.displayName || item.fullName || `${item.firstName || ""} ${item.lastName || ""}`.trim(),
          firstName: item.firstName,
          lastName: item.lastName,
          jersey: item.jersey,
          position: item.position?.abbreviation || item.position?.name,
          headshot: item.headshot?.href,
          teamId: TEAM_ID,
          status: item.status?.type === "active" ? "active" : "inactive",
          height: item.displayHeight,
          weight: item.weight,
          age: item.age,
          experience: item.experience?.years,
          college: item.college?.name,
        });
      }
    }
    return { players };
  } catch (e: any) {
    return { players: [], error: e?.message };
  }
}
