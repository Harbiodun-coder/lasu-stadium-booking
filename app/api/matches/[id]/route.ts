import { NextResponse } from "next/server";
import { getMatch } from "@/lib/matches";
import { seatsAvailable } from "@/lib/bookings";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const match = getMatch(params.id);
  if (!match) {
    return NextResponse.json({ error: "Fixture not found." }, { status: 404 });
  }
  return NextResponse.json({
    ...match,
    stands: match.stands.map((s) => ({
      ...s,
      available: seatsAvailable(match.id, s.id),
    })),
  });
}
