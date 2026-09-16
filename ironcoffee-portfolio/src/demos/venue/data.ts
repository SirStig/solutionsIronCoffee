/**
 * The dummy records behind the Wren Hollow sample.
 *
 * One module, imported by both the public booking flow and the owner's
 * dashboard, so the two halves of the sample agree with each other. A visitor
 * who holds a date on the public side and then opens the owner view expects to
 * find it there, and nothing kills a demonstration faster than two screens
 * telling the same person different things.
 *
 * Everything here is invented, fixed, and deterministic. No dates are computed
 * from the clock: a value that changes between the server render and the
 * browser render is a hydration error, and a sample that shows "3 enquiries"
 * in the HTML and "4 enquiries" a moment later looks broken rather than live.
 */

export type BookingStatus = 'free' | 'held' | 'confirmed' | 'closed';

export interface DayRecord {
  /** ISO date. The calendar covers one fixed year so nothing drifts. */
  date: string;
  status: BookingStatus;
  /** Present when held or confirmed. */
  couple?: string;
  guests?: number;
  packageId?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  /** ISO date they asked about, or empty if they did not say. */
  wants: string;
  guests: number;
  message: string;
  received: string;
  state: 'new' | 'open' | 'replied' | 'archived';
  /** Set by the seating planner on the public side, when they used it. */
  seatsPlanned?: number;
}

export interface PackageRecord {
  id: string;
  name: string;
  price: number;
  /** Maximum guests this package covers. */
  capacity: number;
  includes: string[];
  note: string;
}

export interface ContentBlock {
  id: string;
  label: string;
  /** Which part of the public page this drives. */
  field: 'headline' | 'sub' | 'about' | 'tagline';
  value: string;
  /** Characters, as a soft guide in the editor. */
  limit: number;
}

export const PACKAGES: PackageRecord[] = [
  {
    id: 'friday',
    name: 'The Friday',
    price: 4200,
    capacity: 60,
    includes: ['Ceremony lawn', 'Barn until eleven', 'Tables and chairs', 'Someone here all day'],
    note: 'November to April',
  },
  {
    id: 'weekend',
    name: 'The Weekend',
    price: 9800,
    capacity: 140,
    includes: [
      'Friday afternoon to Sunday lunch',
      'Loft and cottage, sleeps fourteen',
      'Ceremony lawn and barn',
      'Rehearsal dinner in the loft',
    ],
    note: 'Books twelve to eighteen months out',
  },
  {
    id: 'elopement',
    name: 'The Elopement',
    price: 1400,
    capacity: 10,
    includes: ['Two hours', 'Ceremony lawn', 'Photographs anywhere on the forty acres'],
    note: 'Weekday mornings',
  },
];

/**
 * Twelve months of 2027, with a handful of dates already spoken for.
 *
 * Generated rather than typed out, but from a fixed seed and a fixed year, so
 * the output is identical on every render in every environment.
 */
function buildYear(): DayRecord[] {
  const out: DayRecord[] = [];
  const booked: Record<string, [string, number, string]> = {
    '2027-05-15': ['Nadia and Sam', 120, 'weekend'],
    '2027-06-05': ['The Ortegas', 90, 'weekend'],
    '2027-06-26': ['Beth and Marnie', 60, 'friday'],
    '2027-07-17': ['Priya and Dev', 135, 'weekend'],
    '2027-08-14': ['The Kellys', 110, 'weekend'],
    '2027-09-11': ['Tom and Ruth', 45, 'friday'],
    '2027-09-25': ['Ana and Jo', 130, 'weekend'],
    '2027-10-09': ['Marin and Cole', 75, 'friday'],
  };
  const held: Record<string, [string, number, string]> = {
    '2027-06-12': ['Hold: Marsh', 100, 'weekend'],
    '2027-08-28': ['Hold: Ferreira', 80, 'weekend'],
  };

  for (let m = 0; m < 12; m += 1) {
    const days = new Date(Date.UTC(2027, m + 1, 0)).getUTCDate();
    for (let d = 1; d <= days; d += 1) {
      const date = `2027-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const weekday = new Date(`${date}T00:00:00Z`).getUTCDay();
      if (booked[date]) {
        out.push({ date, status: 'confirmed', couple: booked[date][0], guests: booked[date][1], packageId: booked[date][2] });
      } else if (held[date]) {
        out.push({ date, status: 'held', couple: held[date][0], guests: held[date][1], packageId: held[date][2] });
      } else if (weekday === 0 || weekday === 2 || weekday === 3 || weekday === 4) {
        // One wedding a weekend means midweek is not on offer at all.
        out.push({ date, status: 'closed' });
      } else {
        out.push({ date, status: 'free' });
      }
    }
  }
  return out;
}

export const YEAR: DayRecord[] = buildYear();

export const ENQUIRIES: Enquiry[] = [
  {
    id: 'e1',
    name: 'Nadia Farrow',
    email: 'nadia.farrow@example.com',
    wants: '2027-05-15',
    guests: 120,
    message:
      'Ceremony outside if the weather holds, dinner in the barn either way. Is the loft free the night before? We would have eight staying.',
    received: '14 June',
    state: 'new',
    seatsPlanned: 120,
  },
  {
    id: 'e2',
    name: 'Tom and Ruth Ayles',
    email: 'trayles@example.com',
    wants: '2027-11-26',
    guests: 45,
    message:
      'Small winter one, mostly family. Do you do the Friday rate in November, and is the barn actually warm?',
    received: '12 June',
    state: 'new',
  },
  {
    id: 'e3',
    name: 'The Ortegas',
    email: 'hello@ortega.example.com',
    wants: '2027-06-05',
    guests: 90,
    message: 'Bringing our own caterer and our own wine. Still fine?',
    received: '9 June',
    state: 'replied',
    seatsPlanned: 88,
  },
  {
    id: 'e4',
    name: 'Beth Mullins',
    email: 'b.mullins@example.com',
    wants: '',
    guests: 60,
    message:
      'No date yet, we are looking at next autumn. Dog in the ceremony, which is non-negotiable.',
    received: '6 June',
    state: 'open',
  },
  {
    id: 'e5',
    name: 'Priya Ranjan',
    email: 'priya.r@example.com',
    wants: '2027-07-17',
    guests: 135,
    message:
      'Two ceremonies, one on the Friday evening and the main one Saturday. Does the weekend package cover that?',
    received: '2 June',
    state: 'open',
    seatsPlanned: 136,
  },
  {
    id: 'e6',
    name: 'Alan Whitcombe',
    email: 'awhit@example.com',
    wants: '2027-04-03',
    guests: 30,
    message: 'Anniversary party rather than a wedding. Do you do those?',
    received: '28 May',
    state: 'archived',
  },
];

/** What the CMS edits, and what the public page reads. */
export const CONTENT: ContentBlock[] = [
  {
    id: 'c1',
    label: 'Headline',
    field: 'headline',
    value: 'Forty acres. One wedding at a time.',
    limit: 60,
  },
  {
    id: 'c2',
    label: 'Under the headline',
    field: 'sub',
    value:
      'A restored 1912 barn and the meadow it stands in, an hour south of Denver. One booking a weekend, so the place is yours from Friday.',
    limit: 200,
  },
  {
    id: 'c3',
    label: 'Search description',
    field: 'tagline',
    value: 'Forty acres, one wedding at a time.',
    limit: 70,
  },
  {
    id: 'c4',
    label: 'Our story',
    field: 'about',
    value:
      'We only take one booking a weekend. That means the barn, the meadow, the loft and the whole forty acres belong to one set of people from Friday afternoon until Sunday lunch, and nobody is waiting outside for you to finish.',
    limit: 400,
  },
];

/* --- Small helpers both halves need -------------------------------------- */

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const money = (n: number) =>
  `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;

/** '2027-05-15' to 'Sat 15 May 2027', without pulling in a date library. */
export function pretty(iso: string): string {
  if (!iso) return 'No date yet';
  const d = new Date(`${iso}T00:00:00Z`);
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getUTCDay()];
  return `${wd} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()].slice(0, 3)} ${d.getUTCFullYear()}`;
}

export const packageById = (id?: string) =>
  PACKAGES.find((p) => p.id === id);
