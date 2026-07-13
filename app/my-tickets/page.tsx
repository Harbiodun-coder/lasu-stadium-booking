"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type BookingSummary = {
  ticketCode: string;
  matchId: string;
  quantity: number;
  totalAmount: number;
  createdAt: string;
};

export default function MyTicketsPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"email" | "code">("email");
  const [value, setValue] = useState("");
  const [results, setResults] = useState<BookingSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResults(null);

    if (!value.trim()) {
      setError("Enter your email address or ticket code.");
      return;
    }

    if (mode === "code") {
      router.push(`/booking/confirmation/${value.trim()}`);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/bookings?email=${encodeURIComponent(value.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong.");
      } else if (data.bookings.length === 0) {
        setError("No tickets found for that email.");
      } else {
        setResults(data.bookings);
      }
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-5 py-10">
      <h1 className="font-display text-2xl text-chalk mb-2">Find your tickets</h1>
      <p className="text-chalk/60 text-sm mb-6">
        Look up a booking by the email you used, or jump straight to a ticket code.
      </p>

      <div className="flex gap-2 mb-4 text-sm">
        <button
          onClick={() => setMode("email")}
          className={`px-3 py-1.5 rounded ${
            mode === "email" ? "bg-floodlight text-terrace" : "bg-turnstile text-chalk/70"
          }`}
        >
          By email
        </button>
        <button
          onClick={() => setMode("code")}
          className={`px-3 py-1.5 rounded ${
            mode === "code" ? "bg-floodlight text-terrace" : "bg-turnstile text-chalk/70"
          }`}
        >
          By ticket code
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type={mode === "email" ? "email" : "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={mode === "email" ? "you@example.com" : "LASU-XXXXXX"}
          className="flex-1 rounded border border-chalk/20 bg-terrace px-3 py-2 text-chalk focus:outline-none focus:ring-2 focus:ring-floodlight"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-floodlight text-terrace font-display text-sm px-5 py-2 rounded hover:bg-chalk transition-colors disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {error && (
        <p className="text-rust text-sm border border-rust/40 bg-rust/10 rounded px-3 py-2 mt-4">
          {error}
        </p>
      )}

      {results && (
        <div className="mt-6 space-y-3">
          {results.map((b) => (
            <a
              key={b.ticketCode}
              href={`/booking/confirmation/${b.ticketCode}`}
              className="block rounded-lg border border-chalk/15 bg-turnstile px-4 py-3 hover:border-floodlight/60 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-floodlight">{b.ticketCode}</span>
                <span className="text-sm text-chalk/60">
                  {b.quantity} ticket{b.quantity > 1 ? "s" : ""} &middot; ₦
                  {b.totalAmount.toLocaleString()}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
