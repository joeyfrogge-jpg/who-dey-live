/** Bengals identity constants */

export const BENGALS = {
  id: "4", // ESPN team ID
  name: "Bengals",
  abbreviation: "CIN",
  displayName: "Cincinnati Bengals",
  shortDisplayName: "Bengals",
  location: "Cincinnati",
  color: "FB4F14",
  alternateColor: "000000",
  logo: "https://a.espncdn.com/i/teamlogos/nfl/500/cin.png",
  stadium: "Paycor Stadium",
  city: "Cincinnati, OH",
} as const;

export const SEASON = Number(process.env.NEXT_PUBLIC_SEASON || "2025");

export const APP_NAME = "WHO DEY LIVE";
export const APP_TAGLINE = "One team. Every Bengals game. Every meaningful moment.";

export const POLL_INTERVALS = {
  live: 15_000,      // 15s during live games
  pregame: 60_000,   // 1 min pregame
  schedule: 300_000, // 5 min for schedule
  idle: 600_000,     // 10 min when nothing live
} as const;

export const DESIGN_TOKENS = {
  orange: "#FB4F14",
  orangeBright: "#FF6B35",
  black: "#000000",
  nearBlack: "#0A0A0A",
  charcoal: "#1A1A1A",
  white: "#FFFFFF",
  red: "#DC2626",
} as const;
