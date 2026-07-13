import { NextResponse } from "next/server";
import { matches } from "@/lib/matches";
import { seatsAvailable } from "@/lib/bookings";

export async function GET() {
  const withAvailability = matches.map((m) => ({
    ...m,
    stands: m.stands.map((s) => ({
      ...s,
      available: seatsAvailable(m.id, s.id),
    })),
  }));
  return NextResponse.json(withAvailability);
}
