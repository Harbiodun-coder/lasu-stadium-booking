import type { Match } from "@/lib/matches";
import type { Booking } from "@/lib/bookings";

export default function TicketStub({
  booking,
  match,
  standName,
}: {
  booking: Booking;
  match: Match;
  standName: string;
}) {
  const kickoff = new Date(match.kickoff);

  return (
    <div className="flex flex-col sm:flex-row rounded-xl overflow-hidden border border-chalk/15 shadow-2xl">
      {/* Main panel */}
      <div className="flex-1 bg-terrace-light px-6 py-6 sm:px-8 sm:py-8">
        <p className="font-mono text-xs text-floodlight uppercase tracking-widest">
          {match.competition}
        </p>
        <h2 className="font-display text-xl sm:text-2xl text-chalk mt-2 leading-snug">
          {match.homeTeam} <span className="text-floodlight">vs</span> {match.awayTeam}
        </h2>

        <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-chalk/50 text-xs uppercase tracking-wide">Date</p>
            <p className="text-chalk mt-1">
              {kickoff.toLocaleDateString("en-GB", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-chalk/50 text-xs uppercase tracking-wide">Kick-off</p>
            <p className="text-chalk mt-1">
              {kickoff.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <div>
            <p className="text-chalk/50 text-xs uppercase tracking-wide">Stand</p>
            <p className="text-chalk mt-1">{standName}</p>
          </div>
          <div>
            <p className="text-chalk/50 text-xs uppercase tracking-wide">Gate</p>
            <p className="text-chalk mt-1">{match.gate}</p>
          </div>
          <div>
            <p className="text-chalk/50 text-xs uppercase tracking-wide">Ticket holder</p>
            <p className="text-chalk mt-1">{booking.fullName}</p>
          </div>
          <div>
            <p className="text-chalk/50 text-xs uppercase tracking-wide">Admits</p>
            <p className="text-chalk mt-1">{booking.quantity}</p>
          </div>
        </div>
      </div>

      {/* Perforated divider */}
      <div className="hidden sm:block w-0 border-l-2 border-dashed border-chalk/30 relative">
        <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-terrace" />
        <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-terrace" />
      </div>

      {/* Stub */}
      <div className="bg-turnstile px-6 py-6 sm:px-6 sm:py-8 sm:w-48 flex sm:flex-col items-center justify-between sm:justify-center gap-3 text-center border-t-2 sm:border-t-0 border-dashed border-chalk/30">
        <p className="font-mono text-xs text-chalk/50 uppercase tracking-widest">
          Ticket code
        </p>
        <p className="font-mono text-floodlight text-lg tracking-wider">
          {booking.ticketCode}
        </p>
        <p className="font-mono text-xs text-chalk/50">₦{booking.totalAmount.toLocaleString()}</p>
      </div>
    </div>
  );
}
