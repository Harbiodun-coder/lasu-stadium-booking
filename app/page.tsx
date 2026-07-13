import MatchCard from "@/components/MatchCard";
import { matches } from "@/lib/matches";

export default function HomePage() {
  const next = matches[0];

  return (
    <div>
      <section className="bg-turf-lines bg-terrace border-b border-chalk/10">
        <div className="max-w-5xl mx-auto px-5 py-14">
          <p className="font-mono text-xs text-floodlight uppercase tracking-widest">
            Next up at LASU Stadium
          </p>
          <h1 className="font-display text-3xl sm:text-5xl text-chalk mt-3 leading-tight">
            {next.homeTeam}
            <span className="text-floodlight"> vs </span>
            {next.awayTeam}
          </h1>
          <p className="mt-3 text-chalk/70">
            {new Date(next.kickoff).toLocaleDateString("en-GB", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
            &middot; Kick-off{" "}
            {new Date(next.kickoff).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            &middot; {next.venue}
          </p>
          <a
            href={`/matches/${next.id}`}
            className="inline-block mt-6 bg-floodlight text-terrace font-display text-sm px-6 py-3 rounded hover:bg-chalk transition-colors"
          >
            Book this fixture
          </a>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 py-10">
        <h2 className="font-display text-xl text-chalk mb-5">Upcoming fixtures</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
