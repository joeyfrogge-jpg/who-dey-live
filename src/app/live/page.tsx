import { redirect } from "next/navigation";
import { getBengalsSchedule, getLiveGame, getNextGame } from "@/lib/api/bengals";

export const dynamic = "force-dynamic";
export const revalidate = 15;

export default async function LiveRedirectPage() {
  const { games } = await getBengalsSchedule();
  const live = getLiveGame(games);

  if (live) {
    redirect(`/game/${live.id}`);
  }

  const next = getNextGame(games);
  if (next) {
    redirect(`/game/${next.id}`);
  }

  redirect("/schedule");
}
