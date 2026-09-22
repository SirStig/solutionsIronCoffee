/**
 * What a website costs, and the case for paying for one.
 *
 * Kept here with the rest of the copy so the page stays layout only, and so
 * changing a price is one edit in one file.
 *
 * Two things this file is built around, both learned the hard way.
 *
 * One: lead with the price most people will pay. The entry tier costs about
 * a year of a website builder, a comparison worth inviting. Never put the
 * $1,800 tier beside a monthly price: a subscription wins that on arithmetic,
 * and printing it teaches the reader to run it.
 *
 * Two: keep it short. Every line here earns its place or it goes. A pricing
 * page that has to be read twice has already lost.
 */

/** Kept in one place because it is quoted in three. */
export const DIY_SURVEY = {
  abandoned: '51%',
  neverReturned: '22%',
  note: 'Survey of 1,000 US adults who tried a website builder, 2025.',
  href: 'https://allaboutcookies.org/web-builder-statistics',
} as const;

export interface Tier {
  id: string;
  name: string;
  price: string;
  /** The one-line answer to "what is this". */
  summary: string;
  /** The question that separates the tiers, answered. */
  login: string;
  /** What actually gets built. Three lines, no more. */
  built: string[];
  timeline: string;
  /**
   * The short form, for the chip on a gallery card.
   *
   * Lives here rather than in the gallery because the two used to be separate
   * lists keyed by tier id, and when the ids changed the gallery kept its old
   * keys, matched nothing, and quietly rendered six empty chips. One list
   * cannot fall out of step with itself.
   */
  chip: string;
  /** Which sample on the gallery page is this tier. */
  seeIt?: { label: string; slug: string };
  /** The tier the page points at. Its badge text, if so. */
  featured?: string;
}

/**
 * Three tiers, and the difference between them is not page count.
 *
 * A ladder that reads "one page / five pages / more pages" makes each step
 * look like a markup for a few more pages. What actually changes is whether
 * there is software behind the page, so every tier answers the same question,
 * `login`: "no", "you do", "you and your staff do". Three different jobs,
 * not three sizes of one.
 *
 * The first tier is the featured one, and that is the point of the page. Most
 * visitors are a small business that needs the $200 site. When the $1,800
 * card carried the highlight, a reader scrolling past saw that number, took
 * it for the price, and left without ever reading the one meant for them.
 * The higher tiers print their prices smaller for the same reason.
 */
export const tiers: Tier[] = [
  {
    id: 'site',
    name: 'A website',
    price: '$200 to $500',
    chip: 'A site \u00b7 $200 to $500',
    summary: 'Words, photos, hours and a phone number. One page or several.',
    login: 'Nothing to log into',
    built: [
      'Written for you, with your photos',
      'Tap to call, tap for directions',
      'Set up to show up on Google',
    ],
    timeline: 'About a week',
    seeIt: { label: 'Most of the samples are this', slug: 'ridgeline-smokehouse' },
    featured: 'Where most start',
  },
  {
    id: 'software',
    name: 'With bookings or orders',
    price: 'From $1,800',
    chip: 'With software \u00b7 from $1,800',
    summary: 'A site with software behind it, and a screen where you run it.',
    login: 'You log in',
    built: [
      'Real bookings, orders or stock',
      'A dashboard only you can see',
      'A text or email when one comes in',
    ],
    timeline: 'Quoted after a call',
  },
  {
    id: 'system',
    name: 'Run by your staff',
    price: 'From $3,200',
    chip: 'A system \u00b7 from $3,200',
    summary: 'All of that, plus staff accounts, payments and your other tools.',
    login: 'You and your staff log in',
    built: [
      'Edit your own pages and prices',
      'Staff accounts and card payments',
      'Square, Toast or Shopify wired in',
    ],
    timeline: 'Quoted after a call',
    seeIt: { label: 'Wren Hollow is this one', slug: 'wren-hollow' },
  },
];

/**
 * The comparison that is worth making.
 *
 * Not price. Who does the work, and what is left standing if the money stops.
 * Every row is checkable by the reader in about a minute, which is the only
 * reason to print a table like this at all.
 */
export interface CompareRow {
  question: string;
  diy: string;
  mine: string;
}

export const compare: CompareRow[] = [
  {
    question: 'Who builds it?',
    diy: 'You do, on a weekend you do not have',
    mine: 'I do, and you see it finished first',
  },
  {
    question: 'Who writes the words?',
    diy: 'You stare at a blank box',
    mine: 'I do, you fix what I got wrong',
  },
  {
    question: 'Who fixes it at 8pm?',
    diy: 'A help article',
    mine: 'You text me',
  },
  {
    question: 'If you stop paying?',
    diy: 'The site goes dark',
    mine: 'You keep it. It is yours',
  },
];

export interface CarePlan {
  name: string;
  price: string;
  note: string;
  features: string[];
}

export const care: CarePlan = {
  name: 'Looking after it',
  price: '$49 to $99 a month',
  note: 'Optional. Cancel any time and the site stays yours.',
  features: [
    'Hosting, domain and certificate',
    'Unlimited small text and photo changes',
    'Your Google listing kept current',
    'Backups, and someone to call',
  ],
};

export interface PricingFaq {
  q: string;
  a: string;
}

/**
 * Objections, in the order they actually come up on a phone call. The answers
 * are short because a long answer to a short worry reads as a sales pitch.
 */
export const pricingFaq: PricingFaq[] = [
  {
    q: 'Wix is thirty dollars a month.',
    a: 'And you still build it yourself. Most sites here cost about a year of Wix, and I do the building.',
  },
  {
    q: 'What if I see it and hate it?',
    a: 'Then you owe nothing. You see the real site before any money moves.',
  },
  {
    q: 'Do I pay it all up front?',
    a: 'Half when you approve it, half when it goes live.',
  },
  {
    q: 'Who owns it?',
    a: 'You do. Domain in your name, files yours, handed over whenever you ask.',
  },
  {
    q: 'Do I need the monthly plan?',
    a: 'No. Host it yourself for a few dollars a month if you like.',
  },
  {
    q: 'Will this get me more customers?',
    a: 'It gets you the ones already searching for what you do. Anyone promising more is guessing.',
  },
];

/** The price, said once near the top. Built from the tiers so it cannot go stale. */
export const priceLine = () =>
  `Most sites are ${tiers[0].price}, fixed. No contract.`;

/** What happens after you say yes. Four steps, one line each. */
export const steps = [
  { title: 'A phone call', body: 'Twenty minutes about what you do.' },
  { title: 'I build it', body: 'With your photos. You get a link.' },
  { title: 'You mark it up', body: 'Tell me what to change.' },
  { title: 'It goes live', body: 'Domain, Google and all.' },
];
