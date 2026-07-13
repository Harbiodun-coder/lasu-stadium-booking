# LASU Stadium — Match Ticket Booking System

Design and development of a ticket booking system for a football stadium,
case study: LASU Stadium.

This build covers the **core booking flow**:

1. Browse upcoming fixtures at LASU Stadium
2. View a fixture, choose a stand (Popular / Main / VIP) and quantity
3. Enter details and confirm a booking
4. Receive a ticket with a unique ticket code
5. Look up past tickets later by email or ticket code

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** for styling
- File-based JSON storage (`data/bookings.json`) instead of a full database —
  keeps setup to just `npm install`, no DB server or migrations needed.
  Swappable for Prisma/Postgres later without changing the UI, since all
  data access goes through `lib/bookings.ts`.

## Project structure

```
app/
  page.tsx                          → fixtures listing (home)
  matches/[id]/page.tsx              → fixture detail + booking form
  booking/confirmation/[code]/page.tsx → ticket confirmation
  my-tickets/page.tsx                → look up tickets by email/code
  api/matches/                       → GET fixtures + availability
  api/bookings/                      → POST create booking, GET lookup
components/
  MatchCard.tsx     → fixture card on the listing page
  BookingForm.tsx    → stand selection + booking form (client component)
  TicketStub.tsx     → the ticket design shown on confirmation
  PrintButton.tsx    → print-to-PDF button for the ticket
  SiteHeader.tsx / SiteFooter.tsx
lib/
  matches.ts   → fixture data + types (seeded — swap for a DB later)
  bookings.ts  → booking creation, availability checks, lookups
data/
  bookings.json → where bookings are persisted
```

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Extending this

Ideas if you want to grow this beyond the core flow:

- **Admin panel**: a `/admin` area to add/edit fixtures and see all bookings
  (the seed data in `lib/matches.ts` would move into the same JSON-file or a
  real database).
- **Payments**: plug a provider (e.g. Paystack, since this is a Nigeria-based
  case study) into the booking flow before `createBooking()` is called.
- **QR codes**: generate a scannable QR of the ticket code on the confirmation
  page for gate check-in (an `npm install qrcode.react` away).
- **Real database**: swap the file-based store in `lib/bookings.ts` for
  Prisma + PostgreSQL/MySQL — the function signatures can stay the same, so
  nothing in `app/` or `components/` needs to change.
