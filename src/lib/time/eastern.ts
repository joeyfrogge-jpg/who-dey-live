import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { formatDistanceToNowStrict, differenceInSeconds } from "date-fns";

const EASTERN = "America/New_York";

export function toEastern(date: Date | string): Date {
  const d = typeof date === "string" ? new Date(date) : date;
  return toZonedTime(d, EASTERN);
}

export function formatEastern(
  date: Date | string,
  pattern = "EEE, MMM d · h:mm a zzz"
): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatInTimeZone(d, EASTERN, pattern);
}

export function formatKickoff(date: Date | string): string {
  return formatEastern(date, "EEE, MMM d · h:mm a 'ET'");
}

export function formatCountdown(target: Date | string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isPast: boolean;
  label: string;
} {
  const targetDate = typeof target === "string" ? new Date(target) : target;
  const now = new Date();
  const total = differenceInSeconds(targetDate, now);
  const past = total <= 0;

  if (past) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalSeconds: 0,
      isPast: true,
      label: "KICKOFF",
    };
  }

  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  let label = "";
  if (days > 0) label = `${days}d ${hours}h`;
  else if (hours > 0) label = `${hours}h ${minutes}m`;
  else label = `${minutes}m ${seconds}s`;

  return { days, hours, minutes, seconds, totalSeconds: total, isPast: false, label };
}

export function relativeTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return formatDistanceToNowStrict(d, { addSuffix: true });
}

export function isGameDay(date: Date | string): boolean {
  const d = toEastern(typeof date === "string" ? new Date(date) : date);
  const now = toEastern(new Date());
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}
