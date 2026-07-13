export const matches: Match[] = [
  {
    id: "m1",
    homeTeam: "LASU Stars FC",
    awayTeam: "Sunshine Rangers",
    competition: "Lagos Varsity League",
    kickoff: "2026-07-25T16:00:00+01:00",
    venue: "LASU Stadium, Ojo",
    gate: "Gate 2",
    stands: [
      { id: "popular", name: "Popular Stand", price: 1500, capacity: 4000 },
      { id: "main", name: "Main Stand", price: 3500, capacity: 1200 },
      { id: "vip", name: "VIP Pavilion", price: 8000, capacity: 200 },
    ],
  },
  {
    id: "m2",
    homeTeam: "LASU Stars FC",
    awayTeam: "Eko Ballers",
    competition: "Lagos Varsity League",
    kickoff: "2026-08-02T15:30:00+01:00",
    venue: "LASU Stadium, Ojo",
    gate: "Gate 1",
    stands: [
      { id: "popular", name: "Popular Stand", price: 1500, capacity: 4000 },
      { id: "main", name: "Main Stand", price: 3500, capacity: 1200 },
      { id: "vip", name: "VIP Pavilion", price: 8000, capacity: 200 },
    ],
  },
  {
    id: "m3",
    homeTeam: "LASU Stars FC",
    awayTeam: "Badagry United",
    competition: "Governor's Cup — Quarter Final",
    kickoff: "2026-08-16T17:00:00+01:00",
    venue: "LASU Stadium, Ojo",
    gate: "Gate 3",
    stands: [
      { id: "popular", name: "Popular Stand", price: 2000, capacity: 4000 },
      { id: "main", name: "Main Stand", price: 4500, capacity: 1200 },
      { id: "vip", name: "VIP Pavilion", price: 10000, capacity: 200 },
    ],
  },
  {
    id: "m4",
    homeTeam: "LASU Stars FC",
    awayTeam: "UNILAG Mariners",
    competition: "Southwest University League",
    kickoff: "2026-08-30T16:00:00+01:00",
    venue: "LASU Stadium, Ojo",
    gate: "Gate 2",
    stands: [
      { id: "popular", name: "Popular Stand", price: 2000, capacity: 4000 },
      { id: "main", name: "Main Stand", price: 4500, capacity: 1200 },
      { id: "vip", name: "VIP Pavilion", price: 10000, capacity: 200 },
    ],
  },
  {
    id: "m5",
    homeTeam: "LASU Stars FC",
    awayTeam: "YABATECH FC",
    competition: "Inter-Tertiary Championship",
    kickoff: "2026-09-06T15:00:00+01:00",
    venue: "LASU Stadium, Ojo",
    gate: "Gate 1",
    stands: [
      { id: "popular", name: "Popular Stand", price: 1800, capacity: 4000 },
      { id: "main", name: "Main Stand", price: 4000, capacity: 1200 },
      { id: "vip", name: "VIP Pavilion", price: 9000, capacity: 200 },
    ],
  },
  {
    id: "m6",
    homeTeam: "LASU Stars FC",
    awayTeam: "Federal Polytechnic Warriors",
    competition: "University Invitational Cup",
    kickoff: "2026-09-20T17:30:00+01:00",
    venue: "LASU Stadium, Ojo",
    gate: "Gate 3",
    stands: [
      { id: "popular", name: "Popular Stand", price: 1800, capacity: 4000 },
      { id: "main", name: "Main Stand", price: 4000, capacity: 1200 },
      { id: "vip", name: "VIP Pavilion", price: 9000, capacity: 200 },
    ],
  },
  {
    id: "m7",
    homeTeam: "LASU Stars FC",
    awayTeam: "LASPOTECH Lions",
    competition: "Lagos State Cup",
    kickoff: "2026-10-03T16:30:00+01:00",
    venue: "LASU Stadium, Ojo",
    gate: "Gate 2",
    stands: [
      { id: "popular", name: "Popular Stand", price: 2500, capacity: 4000 },
      { id: "main", name: "Main Stand", price: 5000, capacity: 1200 },
      { id: "vip", name: "VIP Pavilion", price: 12000, capacity: 200 },
    ],
  },
  {
    id: "m8",
    homeTeam: "LASU Stars FC",
    awayTeam: "Ikorodu City Academy",
    competition: "Preseason Friendly",
    kickoff: "2026-10-18T15:30:00+01:00",
    venue: "LASU Stadium, Ojo",
    gate: "Gate 1",
    stands: [
      { id: "popular", name: "Popular Stand", price: 1000, capacity: 4000 },
      { id: "main", name: "Main Stand", price: 2500, capacity: 1200 },
      { id: "vip", name: "VIP Pavilion", price: 6000, capacity: 200 },
    ],
  },
  {
    id: "m9",
    homeTeam: "LASU Stars FC",
    awayTeam: "Lagos Islanders FC",
    competition: "Lagos Elite Cup",
    kickoff: "2026-11-01T17:00:00+01:00",
    venue: "LASU Stadium, Ojo",
    gate: "Gate 2",
    stands: [
      { id: "popular", name: "Popular Stand", price: 2200, capacity: 4000 },
      { id: "main", name: "Main Stand", price: 4800, capacity: 1200 },
      { id: "vip", name: "VIP Pavilion", price: 11000, capacity: 200 },
    ],
  },
  {
    id: "m10",
    homeTeam: "LASU Stars FC",
    awayTeam: "University of Ibadan FC",
    competition: "National University Challenge",
    kickoff: "2026-11-15T16:00:00+01:00",
    venue: "LASU Stadium, Ojo",
    gate: "Gate 3",
    stands: [
      { id: "popular", name: "Popular Stand", price: 2500, capacity: 4000 },
      { id: "main", name: "Main Stand", price: 5500, capacity: 1200 },
      { id: "vip", name: "VIP Pavilion", price: 12000, capacity: 200 },
    ],
  },
];

export function getMatch(id: string): Match | undefined {
  return matches.find((m) => m.id === id);
}

export function getStand(match: Match, standId: string): StandType | undefined {
  return match.stands.find((s) => s.id === standId);
}
