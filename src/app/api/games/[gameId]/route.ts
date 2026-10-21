import { NextResponse } from "next/server";
import { getGameDetail } from "@/lib/api/bengals";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await params;
  try {
    const data = await getGameDetail(gameId);
    if (!data.detail) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to load game" }, { status: 500 });
  }
}
