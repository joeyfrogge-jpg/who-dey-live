import { NextResponse } from "next/server";
import { getBengalsSchedule } from "@/lib/api/bengals";

export async function GET() {
  try {
    const data = await getBengalsSchedule();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Failed to load schedule", games: [], freshness: { isDemo: true } },
      { status: 500 }
    );
  }
}
