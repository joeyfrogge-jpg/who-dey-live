/** WHO DEY LIVE — Core domain types */

export type GameStatus =
  | "upcoming"
  | "pregame"
  | "live"
  | "halftime"
  | "final"
  | "postponed"
  | "delayed"
  | "cancelled";

export type SeasonType = "preseason" | "regular" | "postseason";

export type GamePeriod =
  | "pregame"
  | "1"
  | "2"
  | "halftime"
  | "3"
  | "4"
  | "OT"
  | "final";

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName?: string;
  location?: string;
  color?: string;
  alternateColor?: string;
  logo?: string;
  record?: string;
}

export interface Player {
  id: string;
  fullName: string;
  firstName?: string;
  lastName?: string;
  jersey?: string;
  position?: string;
  headshot?: string;
  teamId?: string;
  status?: "active" | "inactive" | "injured" | "suspended";
}

export interface ScoreSummary {
  home: number;
  away: number;
  homeRecord?: string;
  awayRecord?: string;
}

export interface Linescore {
  period: number | string;
  home: number;
  away: number;
}

export interface PlayEvent {
  id: string;
  sequence?: number;
  quarter: number | string;
  clock: string;
  text: string;
  shortText?: string;
  type?: string;
  scoringPlay?: boolean;
  teamId?: string;
  homeScore?: number;
  awayScore?: number;
  down?: number;
  distance?: number;
  yardLine?: number;
  yardsGained?: number;
  isBengalsPlay?: boolean;
  players?: { id: string; name: string; role?: string }[];
}

export interface DriveSummary {
  id: string;
  teamId: string;
  startPeriod?: number;
  startClock?: string;
  startYardLine?: string;
  endPeriod?: number;
  endClock?: string;
  endYardLine?: string;
  plays: number;
  yards: number;
  timeOfPossession?: string;
  result?: string;
  isScore?: boolean;
  isCurrent?: boolean;
}

export interface TeamStatistics {
  teamId: string;
  totalYards?: number;
  passingYards?: number;
  rushingYards?: number;
  turnovers?: number;
  thirdDownEff?: string;
  fourthDownEff?: string;
  redZoneEff?: string;
  timeOfPossession?: string;
  sacks?: number;
  penalties?: number;
  penaltyYards?: number;
}

export interface PlayerStatistics {
  playerId: string;
  playerName: string;
  position?: string;
  passingYards?: number;
  passingTDs?: number;
  interceptions?: number;
  completions?: number;
  attempts?: number;
  rushingYards?: number;
  rushingTDs?: number;
  receptions?: number;
  receivingYards?: number;
  receivingTDs?: number;
  tackles?: number;
  sacks?: number;
  interceptionsDef?: number;
  fieldGoalsMade?: number;
  fieldGoalsAttempted?: number;
  extraPointsMade?: number;
}

export interface Game {
  id: string;
  season: number;
  seasonType: SeasonType;
  week?: number;
  name: string;
  shortName?: string;
  date: string; // ISO
  kickoffEastern: string; // formatted America/New_York
  status: GameStatus;
  period?: GamePeriod;
  clock?: string;
  venue?: string;
  isHome: boolean; // Bengals home?
  isBengalsHome: boolean;
  bengals: Team;
  opponent: Team;
  score?: ScoreSummary;
  linescores?: Linescore[];
  broadcasts?: string[];
  attendance?: number;
  lastUpdated?: string;
  possession?: "home" | "away" | null;
  downDistance?: string;
  ballPosition?: string;
  timeoutsHome?: number;
  timeoutsAway?: number;
}

export interface ScheduleEntry extends Game {
  // alias for schedule list
}

export interface GameDetail extends Game {
  plays?: PlayEvent[];
  drives?: DriveSummary[];
  teamStats?: TeamStatistics[];
  playerStats?: PlayerStatistics[];
  leaders?: {
    passing?: PlayerStatistics;
    rushing?: PlayerStatistics;
    receiving?: PlayerStatistics;
  };
  winProbability?: { period: number; clock: string; homeWinPct: number }[];
}

export interface RosterPlayer extends Player {
  height?: string;
  weight?: number;
  age?: number;
  experience?: number;
  college?: string;
  seasonStats?: PlayerStatistics;
}

export interface NotificationPreference {
  kickoffReminder: boolean;
  scoreAlerts: boolean;
  majorEvents: boolean;
  finalScore: boolean;
  minutesBeforeKickoff: number;
}

export interface UserPreferences {
  favoritePlayerIds: string[];
  scoreboardLayout: "classic" | "compact" | "gameday";
  notifications: NotificationPreference;
  reducedMotion: boolean;
  theme: "dark" | "system";
  defaultScheduleView: "list" | "calendar";
}

export interface DataFreshness {
  lastFetched: string;
  source: string;
  isStale: boolean;
  isDemo: boolean;
}
