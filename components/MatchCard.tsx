import Link from "next/link";
import type { Match } from "@/lib/matches";

function formatKickoff(iso: string) {
  const d = new Date(iso);
  const date = d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const time = d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return { date, time };
}

export default function MatchCard({ match }: { match: Match }) {
  const { date, time } = formatKickoff(match.kickoff);
  const lowestPrice = Math.min(...match.stands.map((s) => s.price));

  return (
    <Link
      href={`/matches/${match.id}`}
      className="group block rounded-lg border border-chalk/15 bg-turnstile hover:border-floodlight/60 transition-colors overflow-hidden"
    >
      <div className="bg-turf-lines bg-terrace-light px-5 py-2 flex items-center justify-between text-xs text-floodlight/90 tracking-wide uppercase">
        <span>{match.competition}</span>
        <span>{match.gate}</span>
      </div>
      <div className="px-5 py-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-lg text-chalk leading-tight">
            {match.homeTeam}
            <span className="text-floodlight mx-2">vs</span>
            {match.awayTeam}
          </h3>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-chalk/70">
          <span>
            {date} &middot; {time}
          </span>
          <span className="font-mono text-floodlight group-hover:text-chalk transition-colors">
            from ₦{lowestPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
