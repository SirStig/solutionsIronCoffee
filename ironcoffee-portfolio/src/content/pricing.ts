/**
 * What a website costs, and the case for paying for one.
 *
 * Kept here with the rest of the copy so the page stays layout only, and so
 * changing a price is one edit in one file.
 *
 * Two things this file is built around, both learned the hard way.
 *
 * One: never put the build price next to a monthly price. A subscription wins
 * $1,800 against $204 a year on arithmetic and always will, and running that
 * comparison on your own sales page just teaches the reader to run it. The
 * monthly plan is the thing that belongs beside a subscription, because that
 * is a fair fight and it is winnable.
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
  /** What actually gets built. This is what the price is for. */
  built: string[];
  timeline: string;
  /** Which sample on the gallery page is this tier. */
  seeIt?: { label: string; slug: string };
  featured?: boolean;
}

/**
 * Three tiers, and the difference between them is not page count.
 *
 * This is the version that took the longest to get right, because the obvious
 * way to write it is wrong. A ladder that reads "one page / five pages / more
 * pages" makes the second step look like a 260% markup for four more pages,
 * and any reader doing that arithmetic concludes they are being had.
 *
 * What actually changes is whether there is software behind the page. The
 * first tier is a website: words, pictures, a phone number, and nothing that
 * can break. The second is an application that happens to have a website on
 * the front, with a database, rules about who may change what, and a screen
 * the owner logs into. The third adds the owner running it themselves.
 *
 * So every tier answers the same question, `login`, and the answers are "no",
 * "you do" and "you and your staff do". Two hundred dollars to thirty-two
 * hundred stops looking like a markup and starts looking like three different
 * jobs, which is what it is.
 */
export const tiers: Tier[] = [
  {
    id: 'site',
    name: 'A site',
    price: '$200 to $500',
    summary: 'One page, or the whole thing. Words, photos, a phone number.',
    login: 'Nothing to log into',
    built: [
      'Pages written for you, not a blank template',
      'Your photos, colors and logo',
      'Tap to call, tap for directions',
      'Set up so you turn up in Google',
    ],
    timeline: 'A week, maybe two',
    seeIt: { label: 'All five samples are this', slug: 'ridgeline-smokehouse' },
  },
  {
    id: 'software',
    name: 'A site with software behind it',
    price: 'From $1,800',
    summary: 'A database. Things that change, and a screen where you see them.',
    login: 'You log in',
    built: [
      'Real bookings, orders or stock, not a form',
      'A database, and rules about what can change it',
      'A screen where you see it and change it',
      'It emails or texts you when something happens',
    ],
    timeline: 'Quoted once we know what it keeps track of',
    featured: true,
  },
  {
    id: 'system',
    name: 'A system',
    price: 'From $3,200',
    summary: 'The whole thing, and you run it without calling me.',
    login: 'You and your staff log in',
    built: [
      'Edit your own pages, prices and photos',
      'Staff accounts, each seeing only their part',
      'Card payments and the money side',
      'Toast, Square, Booksy, Shopify wired in',
    ],
    timeline: 'Quoted after we talk',
    seeIt: { label: 'Wren Hollow is this one', slug: 'wren-hollow' },
  },
];

/**
 * The sentence that does the most work on the whole page.
 *
 * Someone who has just seen five good-looking sample sites and then a price of
 * $3,200 needs to be told, before they ask, that the samples are the cheap
 * tier. Otherwise the only conclusion available is that the expensive tier is
 * the same thing with a bigger number on it.
 */
export const ladderNote =
  'Every sample in the gallery is the first tier. That is what five hundred dollars looks like. The difference higher up is not more pages, it is software: a database, a login, and a screen only you can see.';

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
    question: 'Want a booking system?',
    diy: 'An app that rents you one, monthly, forever',
    mine: 'Built into your site, and it is yours',
  },
  {
    question: 'Who writes the words?',
    diy: 'You stare at a blank box',
    mine: 'I write it, you tell me what I got wrong',
  },
  {
    question: 'Who fixes it at 8pm?',
    diy: 'A help article and a chat window',
    mine: 'You text me',
  },
  {
    question: 'If you stop paying?',
    diy: 'Site goes dark, domain comes off, their ads go on',
    mine: 'You keep the site. It is yours either way',
  },
  {
    question: 'Can you move it later?',
    diy: 'You can export the text, not the site',
    mine: 'Take the files anywhere, any host',
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
    q: 'Wix is thirty dollars a month. You are eighteen hundred.',
    a: 'Wix sells you the tool. Nobody at Wix writes your page, takes your photos or finishes it. That part is still yours to do, and it is the part that stops people.',
  },
  {
    q: 'I could do it myself in a weekend.',
    a: 'You could start it in a weekend. In one 2025 survey of people who tried, half never got it live and a fifth never went back to it.',
  },
  {
    q: 'What if I see it and hate it?',
    a: 'Then you say so and you owe me nothing. You see the real site before any money moves.',
  },
  {
    q: 'Do I have to pay it all up front?',
    a: 'Half when you approve it, half when it goes live.',
  },
  {
    q: 'Who owns it?',
    a: 'You do. Domain in your name, files yours, and I hand the lot over whenever you ask.',
  },
  {
    q: 'Do I need the monthly plan?',
    a: 'No. Host it yourself for a few dollars a month. Most people take it because they would rather text me than learn any of this.',
  },
  {
    q: 'I already have a site.',
    a: 'Send me the link. If it is fine I will tell you it is fine.',
  },
  {
    q: 'Will this get me more customers?',
    a: 'It gets you the ones already searching for what you do. Nobody can promise you the rest, and anyone who does is guessing.',
  },
  {
    q: 'My nephew said he would do it.',
    a: 'He might. Ask who picks up the phone in eight months when something breaks.',
  },
  {
    q: 'What do you need from me?',
    a: 'Photos, your hours, and about an hour on the phone.',
  },
];

/** What happens after you say yes. Four steps, one line each. */
export const steps = [
  {
    title: 'A phone call',
    body: 'Twenty minutes. What you do and who walks in.',
  },
  {
    title: 'I build it',
    body: 'A real site with your photos. You get a link.',
  },
  {
    title: 'You mark it up',
    body: 'Tell me what is wrong. This is the part that makes it yours.',
  },
  {
    title: 'It goes live',
    body: 'Domain pointed, Google updated, and a call so you can edit your own hours.',
  },
];
