import { NextResponse } from "next/server";
import { createBooking, findBookingsByEmail } from "@/lib/bookings";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { matchId, standId, fullName, email, phone, quantity } = body;

  if (!matchId || !standId || !fullName || !email || !phone || !quantity) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  const result = createBooking({
    matchId,
    standId,
    fullName: String(fullName).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    quantity: Number(quantity),
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 409 });
  }

  return NextResponse.json({ booking: result.booking }, { status: 201 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) {
    return NextResponse.json({ error: "Provide an email to look up tickets." }, { status: 400 });
  }
  return NextResponse.json({ bookings: findBookingsByEmail(email) });
}
