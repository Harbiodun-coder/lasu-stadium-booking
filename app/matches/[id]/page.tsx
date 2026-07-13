import { notFound } from "next/navigation";
import { getMatch } from "@/lib/matches";
import { seatsAvailable } from "@/lib/bookings";
import BookingForm from "@/components/BookingForm";

export default function MatchPage({ params }: { params: { id: string } }) {
  const match = getMatch(params.id);
  if (!match) notFound();

  const stands = match.stands.map((s) => ({
    ...s,
    available: seatsAvailable(match.id, s.id),
  }));

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <p className="font-mono text-xs text-floodlight uppercase tracking-widest">
        {match.competition}
      </p>
      <h1 className="font-display text-2xl sm:text-3xl text-chalk mt-2">
        {match.homeTeam} <span className="text-floodlight">vs</span> {match.awayTeam}
      </h1>
      <p className="mt-2 text-chalk/70 text-sm">
        {new Date(match.kickoff).toLocaleDateString("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}{" "}
        &middot; Kick-off{" "}
        {new Date(match.kickoff).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })}{" "}
        &middot; {match.venue} &middot; {match.gate}
      </p>

      <div className="mt-8 border-t border-chalk/10 pt-8">
        <h2 className="font-display text-lg text-chalk mb-4">Choose your stand</h2>
        <BookingForm matchId={match.id} stands={stands} />
      </div>
    </div>
  );
}
