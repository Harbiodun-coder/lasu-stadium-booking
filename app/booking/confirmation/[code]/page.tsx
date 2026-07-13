import { notFound } from "next/navigation";
import { findBookingByCode } from "@/lib/bookings";
import { getMatch, getStand } from "@/lib/matches";
import TicketStub from "@/components/TicketStub";
import PrintButton from "@/components/PrintButton";

export default function ConfirmationPage({ params }: { params: { code: string } }) {
  const booking = findBookingByCode(params.code);
  if (!booking) notFound();

  const match = getMatch(booking.matchId);
  if (!match) notFound();

  const stand = getStand(match, booking.standId);

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <p className="font-mono text-xs text-floodlight uppercase tracking-widest">
        Booking confirmed
      </p>
      <h1 className="font-display text-2xl text-chalk mt-2 mb-6">
        Your ticket is ready
      </h1>

      <TicketStub booking={booking} match={match} standName={stand?.name ?? ""} />

      <p className="text-sm text-chalk/60 mt-6">
        Save your ticket code <span className="font-mono text-floodlight">{booking.ticketCode}</span>{" "}
        or the email you booked with — you'll need it to look up this ticket again from{" "}
        <a href="/my-tickets" className="underline hover:text-chalk">
          My tickets
        </a>
        .
      </p>

      <PrintButton />
    </div>
  );
}
