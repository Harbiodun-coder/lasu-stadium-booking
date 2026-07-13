import { NextResponse } from "next/server";
import { findBookingByCode } from "@/lib/bookings";

export async function GET(_req: Request, { params }: { params: { code: string } }) {
  const booking = findBookingByCode(params.code);
  if (!booking) {
    return NextResponse.json({ error: "No ticket found with that code." }, { status: 404 });
  }
  return NextResponse.json({ booking });
}
