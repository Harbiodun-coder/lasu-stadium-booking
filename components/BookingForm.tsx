"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { StandType } from "@/lib/matches";

type StandWithAvailability = StandType & { available: number };

export default function BookingForm({
  matchId,
  stands,
}: {
  matchId: string;
  stands: StandWithAvailability[];
}) {
  const router = useRouter();
  const [standId, setStandId] = useState(stands[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const selectedStand = stands.find((s) => s.id === standId);
  const total = selectedStand ? selectedStand.price * quantity : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setError("Please fill in your name, email and phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId,
          standId,
          fullName,
          email,
          phone,
          quantity,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }

      router.push(`/booking/confirmation/${data.booking.ticketCode}`);
    } catch {
      setError(
        "Could not reach the server. Check your connection and try again.",
      );
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-3">
        {stands.map((stand) => {
          const soldOut = stand.available <= 0;
          return (
            <label
              key={stand.id}
              className={`flex items-center justify-between rounded-lg border px-4 py-3 cursor-pointer transition-colors ${
                standId === stand.id
                  ? "border-floodlight bg-turnstile"
                  : "border-chalk/15 bg-turnstile/50"
              } ${soldOut ? "opacity-40 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="stand"
                  value={stand.id}
                  checked={standId === stand.id}
                  disabled={soldOut}
                  onChange={() => setStandId(stand.id)}
                  className="accent-floodlight"
                />
                <div>
                  <p className="text-chalk font-medium">{stand.name}</p>
                  <p className="text-xs text-chalk/50">
                    {soldOut ? "Sold out" : `${stand.available} left`}
                  </p>
                </div>
              </div>
              <span className="font-mono text-floodlight">
                ₦{stand.price.toLocaleString()}
              </span>
            </label>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-chalk/70 mb-1">
            Number of tickets
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Math.min(10, Number(e.target.value))))
            }
            className="w-full rounded border border-chalk/20 bg-terrace px-3 py-2 text-chalk focus:outline-none focus:ring-2 focus:ring-floodlight"
          />
        </div>
        <div>
          <label className="block text-sm text-chalk/70 mb-1">Full name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded border border-chalk/20 bg-terrace px-3 py-2 text-chalk focus:outline-none focus:ring-2 focus:ring-floodlight"
            placeholder="e.g. Francis Matthew"
          />
        </div>
        <div>
          <label className="block text-sm text-chalk/70 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border border-chalk/20 bg-terrace px-3 py-2 text-chalk focus:outline-none focus:ring-2 focus:ring-floodlight"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label className="block text-sm text-chalk/70 mb-1">
            Phone number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded border border-chalk/20 bg-terrace px-3 py-2 text-chalk focus:outline-none focus:ring-2 focus:ring-floodlight"
            placeholder="080..."
          />
        </div>
      </div>

      {error && (
        <p className="text-rust text-sm border border-rust/40 bg-rust/10 rounded px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex items-center justify-between border-t border-chalk/10 pt-4">
        <div>
          <p className="text-xs text-chalk/50">Total</p>
          <p className="font-display text-xl text-chalk">
            ₦{total.toLocaleString()}
          </p>
        </div>
        <button
          type="submit"
          disabled={
            submitting || !selectedStand || selectedStand.available <= 0
          }
          className="bg-floodlight text-terrace font-display text-sm px-6 py-3 rounded hover:bg-chalk transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Booking..." : "Confirm booking"}
        </button>
      </div>
    </form>
  );
}
