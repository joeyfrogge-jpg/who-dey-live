/**
 * Demo schedule + roster fallback when ESPN is unavailable.
 */
import type { Game, GameDetail, RosterPlayer } from "@/types";
import { BENGALS } from "@/lib/constants";
import { formatKickoff } from "@/lib/time/eastern";

const CIN = {
  id: BENGALS.id,
  name: "Bengals",
  abbreviation: "CIN",
  displayName: "Cincinnati Bengals",
  shortDisplayName: "Bengals",
  location: "Cincinnati",
  color: "FB4F14",
  alternateColor: "000000",
  logo: BENGALS.logo,
};

function opp(abbr: string, name: string, loc: string, id: string) {
  return {
    id,
    name,
    abbreviation: abbr,
    displayName: `${loc} ${name}`,
    shortDisplayName: name,
    location: loc,
    logo: `https://a.espncdn.com/i/teamlogos/nfl/500/${abbr.toLowerCase()}.png`,
  };
}

export const DEMO_SCHEDULE: Game[] = [
  {
    id: "demo-2025-1", season: 2025, week: 1, seasonType: "regular",
    date: "2025-09-07T17:00:00Z", kickoffEastern: formatKickoff("2025-09-07T17:00:00Z"),
    status: "final", isBengalsHome: false, venue: "Huntington Bank Field",
    opponent: opp("CLE", "Browns", "Cleveland", "5"),
    homeTeam: opp("CLE", "Browns", "Cleveland", "5"), awayTeam: CIN,
    score: { home: 16, away: 17 },
  },
  {
    id: "demo-2025-2", season: 2025, week: 2, seasonType: "regular",
    date: "2025-09-14T17:00:00Z", kickoffEastern: formatKickoff("2025-09-14T17:00:00Z"),
    status: "final", isBengalsHome: true, venue: "Paycor Stadium",
    opponent: opp("JAX", "Jaguars", "Jacksonville", "30"),
    homeTeam: CIN, awayTeam: opp("JAX", "Jaguars", "Jacksonville", "30"),
    score: { home: 27, away: 24 },
  },
  {
    id: "demo-2025-6", season: 2025, week: 6, seasonType: "regular",
    date: "2025-10-26T17:00:00Z", kickoffEastern: formatKickoff("2025-10-26T17:00:00Z"),
    status: "upcoming", isBengalsHome: true, venue: "Paycor Stadium",
    opponent: opp("GB", "Packers", "Green Bay", "9"),
    homeTeam: CIN, awayTeam: opp("GB", "Packers", "Green Bay", "9"),
  },
  {
    id: "demo-2025-8", season: 2025, week: 8, seasonType: "regular",
    date: "2025-11-09T18:00:00Z", kickoffEastern: formatKickoff("2025-11-09T18:00:00Z"),
    status: "upcoming", isBengalsHome: true, venue: "Paycor Stadium",
    opponent: opp("BAL", "Ravens", "Baltimore", "33"),
    homeTeam: CIN, awayTeam: opp("BAL", "Ravens", "Baltimore", "33"),
  },
  {
    id: "bye-2025-10", season: 2025, week: 10, seasonType: "regular",
    date: "2025-11-16T17:00:00Z", kickoffEastern: "BYE WEEK",
    status: "upcoming", isBengalsHome: true, venue: "—",
    opponent: { id: "bye", name: "Bye", abbreviation: "BYE", displayName: "Bye Week" },
    homeTeam: CIN, awayTeam: { id: "bye", name: "Bye", abbreviation: "BYE", displayName: "Bye Week" },
  },
];

export const DEMO_ROSTER: RosterPlayer[] = [
  { id: "3918298", fullName: "Joe Burrow", jersey: "9", position: "QB", teamId: BENGALS.id, status: "active", headshot: "https://a.espncdn.com/i/headshots/nfl/players/full/3918298.png" },
  { id: "4241389", fullName: "Ja'Marr Chase", jersey: "1", position: "WR", teamId: BENGALS.id, status: "active", headshot: "https://a.espncdn.com/i/headshots/nfl/players/full/4241389.png" },
  { id: "4035687", fullName: "Tee Higgins", jersey: "5", position: "WR", teamId: BENGALS.id, status: "active", headshot: "https://a.espncdn.com/i/headshots/nfl/players/full/4035687.png" },
  { id: "3121422", fullName: "Trey Hendrickson", jersey: "91", position: "DE", teamId: BENGALS.id, status: "active" },
  { id: "4362628", fullName: "Chase Brown", jersey: "30", position: "RB", teamId: BENGALS.id, status: "active" },
];

export function getDemoGameDetail(gameId: string): GameDetail | null {
  const g = DEMO_SCHEDULE.find((x) => x.id === gameId);
  if (!g) return null;
  return {
    ...g,
    plays: g.status === "final" ? [
      { id: "p1", quarter: 4, clock: "2:03", text: "J. Burrow 4-yd TD pass to T. Higgins", scoringPlay: true, isBengalsPlay: true },
    ] : [],
    teamStats: [
      { teamId: BENGALS.id, totalYards: 365, passingYards: 278, rushingYards: 87, turnovers: 1 },
      { teamId: g.opponent.id, totalYards: 312, passingYards: 210, rushingYards: 102, turnovers: 2 },
    ],
  };
}
