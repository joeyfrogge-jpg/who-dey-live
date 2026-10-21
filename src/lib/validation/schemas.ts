import { z } from "zod";

export const TeamSchema = z.object({
  id: z.string(),
  name: z.string(),
  abbreviation: z.string(),
  displayName: z.string(),
  shortDisplayName: z.string().optional(),
  location: z.string().optional(),
  color: z.string().optional(),
  alternateColor: z.string().optional(),
  logo: z.string().optional(),
  record: z.string().optional(),
});

export const GameStatusSchema = z.enum([
  "upcoming",
  "pregame",
  "live",
  "halftime",
  "final",
  "postponed",
  "delayed",
  "cancelled",
]);

export const GameSchema = z.object({
  id: z.string(),
  season: z.number(),
  seasonType: z.enum(["preseason", "regular", "postseason"]),
  week: z.number().optional(),
  name: z.string(),
  shortName: z.string().optional(),
  date: z.string(),
  kickoffEastern: z.string(),
  status: GameStatusSchema,
  period: z.string().optional(),
  clock: z.string().optional(),
  venue: z.string().optional(),
  isHome: z.boolean(),
  isBengalsHome: z.boolean(),
  bengals: TeamSchema,
  opponent: TeamSchema,
  score: z
    .object({
      home: z.number(),
      away: z.number(),
      homeRecord: z.string().optional(),
      awayRecord: z.string().optional(),
    })
    .optional(),
  lastUpdated: z.string().optional(),
});
