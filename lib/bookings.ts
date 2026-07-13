import fs from "fs";
import path from "path";
import { getMatch, getStand } from "./matches";

export type Booking = {
  ticketCode: string;
  matchId: string;
  standId: string;
  fullName: string;
  email: string;
  phone: string;
  quantity: number;
  totalAmount: number;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "bookings.json");

function ensureStore(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
  }
}

function readAll(): Booking[] {
  ensureStore();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  try {
    return JSON.parse(raw) as Booking[];
  } catch {
    return [];
  }
}

function writeAll(bookings: Booking[]): void {
  ensureStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

function generateTicketCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `LASU-${code}`;
}

export function seatsBooked(matchId: string, standId: string): number {
  return readAll()
    .filter((b) => b.matchId === matchId && b.standId === standId)
    .reduce((sum, b) => sum + b.quantity, 0);
}

export function seatsAvailable(matchId: string, standId: string): number {
  const match = getMatch(matchId);
  const stand = match && getStand(match, standId);
  if (!stand) return 0;
  return Math.max(0, stand.capacity - seatsBooked(matchId, standId));
}

export type CreateBookingResult =
  | { ok: true; booking: Booking }
  | { ok: false; error: string };

export function createBooking(input: {
  matchId: string;
  standId: string;
  fullName: string;
  email: string;
  phone: string;
  quantity: number;
}): CreateBookingResult {
  const match = getMatch(input.matchId);
  if (!match) return { ok: false, error: "This fixture could not be found." };

  const stand = getStand(match, input.standId);
  if (!stand) return { ok: false, error: "That stand is not available for this fixture." };

  if (input.quantity < 1 || input.quantity > 10) {
    return { ok: false, error: "You can book between 1 and 10 tickets at a time." };
  }

  const available = seatsAvailable(input.matchId, input.standId);
  if (available < input.quantity) {
    return {
      ok: false,
      error: `Only ${available} ticket(s) left in the ${stand.name} for this fixture.`,
    };
  }

  const bookings = readAll();
  const booking: Booking = {
    ticketCode: generateTicketCode(),
    matchId: input.matchId,
    standId: input.standId,
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    quantity: input.quantity,
    totalAmount: stand.price * input.quantity,
    createdAt: new Date().toISOString(),
  };

  bookings.push(booking);
  writeAll(bookings);

  return { ok: true, booking };
}

export function findBookingByCode(code: string): Booking | undefined {
  return readAll().find((b) => b.ticketCode.toLowerCase() === code.toLowerCase());
}

export function findBookingsByEmail(email: string): Booking[] {
  return readAll()
    .filter((b) => b.email.toLowerCase() === email.toLowerCase())
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
