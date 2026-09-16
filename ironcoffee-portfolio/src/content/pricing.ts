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
  /** One line. What this actually is. */
  summary: string;
  /** Four at most, seven words each. Longer lists read as filler. */
  features: string[];
  timeline: string;
  featured?: boolean;
}

export const tiers: Tier[] = [
  {
    id: 'starter',
    name: 'One page',
    price: '$500',
    summary: 'Hours, phone, what you do, why you.',
    features: [
      'Everything on one scrolling page',
      'Your photos, colors and logo',
      'Tap to call, tap for directions',
      'Listed on Google',
    ],
    timeline: 'About a week',
  },
  {
    id: 'standard',
    name: 'Full site',
    price: '$1,800',
    summary: 'Five to seven pages. What most businesses need.',
    features: [
      'Menu, services or product pages',
      'Forms that reach your inbox',
      'Photo galleries and staff pages',
      'Google Business Profile sorted out',
    ],
    timeline: 'Two to three weeks',
    featured: true,
  },
  {
    id: 'custom',
    name: 'Wired in',
    price: 'From $3,200',
    /* Deliberately not "we build you online ordering". A restaurant does not
       want a bespoke cart with no card processing and no kitchen printer, and
       quoting one is how you lose the room. What they want is the thing they
       already pay for, working properly on their own site. */
    summary: 'Your booking or ordering system, on your own site.',
    features: [
      'Toast, Square, Booksy, Calendly, Shopify',
      'Online store and card payments',
      'A page per location',
      'Priced once we know what you run',
    ],
    timeline: 'Quoted after we talk',
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
