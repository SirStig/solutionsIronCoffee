/**
 * What the work costs.
 *
 * Source of truth is Joshua's pricing sheet, October 2026. The public
 * number is the "My Price" column. The market column stays in the data
 * and is not printed: two prices on one line is what made the page hard
 * to read. His price is the low end of that band. Use the printed
 * number. The sheet is a starting point: simpler work comes down,
 * harder work goes up.
 *
 * The sheet itself is confidential. Do not publish the family-rate
 * story or the client-count line from the footer. This file is the
 * public card.
 *
 * A range without a rule is not a price, so every line is one number.
 * Add-ons stack. The terms below say how a bill is built.
 *
 * Two layout rules that still hold. The first number a skimming reader
 * meets is the one-page site and the general hourly rate, never a
 * five-figure build sitting next to a monthly price. And schema prices
 * are the `amount` field, never digits stripped out of a formatted
 * string.
 */

/** Whole dollars, with a thousands separator. */
export const usd = (n: number) => `$${n.toLocaleString('en-US')}`;

export interface Priced {
  name: string;
  /** Whole dollars. The public price. */
  amount: number;
  /** Experienced direct rates, low and high, whole dollars. */
  market: readonly [number, number];
  unit?: 'hour' | 'month';
  /** One plain sentence on what the money covers. Only where the name doesn't. */
  note?: string;
}

export const priceLabel = (item: Priced) => {
  const n = usd(item.amount);
  if (item.unit === 'hour') return `${n} an hour`;
  if (item.unit === 'month') return `${n} a month`;
  return n;
};

export const marketLabel = (item: Priced) => {
  const [lo, hi] = item.market;
  const unit =
    item.unit === 'hour' ? ' an hour' : item.unit === 'month' ? ' a month' : '';
  return `Market: ${usd(lo)} to ${usd(hi)}${unit}.`;
};

const line = (
  name: string,
  amount: number,
  marketLo: number,
  marketHi: number,
  unit?: Priced['unit'],
  note?: string,
): Priced => ({ name, amount, market: [marketLo, marketHi], unit, note });

/**
 * Gallery chips. Keyed by the same ids the sample configs use, so a
 * leftover sample URL cannot render a blank chip. The gallery is
 * unpublished. These labels stay honest if someone still opens one.
 */
export const tiers = [
  { id: 'site', chip: 'A site \u00b7 from $1,200' },
  { id: 'software', chip: 'Custom software \u00b7 scoped' },
  { id: 'system', chip: 'A system \u00b7 scoped' },
] as const;

export interface Term {
  title: string;
  body: string;
}

/** Same rules on every line. Short on purpose. */
export const terms: Term[] = [
  {
    title: 'Half up front',
    body: 'Half to start, half when I hand it over. Once I\u2019ve started work the deposit isn\u2019t refundable.',
  },
  {
    title: 'Rush',
    body: 'Need it in under two weeks? Add 25%. Under a week, add 50%.',
  },
  {
    title: 'Revisions',
    body: 'Two rounds of changes per milestone are included. After that it\u2019s hourly.',
  },
  {
    title: 'After delivery',
    body: 'I fix bugs for free for 30 days. After that it\u2019s $150 a month per site if you want me to keep looking after it.',
  },
  {
    title: 'Ownership',
    body: 'It\u2019s yours once the last payment clears, and you get the private repo.',
  },
  {
    title: 'Canceling',
    body: 'Cancel before it\u2019s half done and it\u2019s 25% of the project. After that, 50%.',
  },
  {
    title: 'Bundles',
    body: 'Prices add together. Take a few at once and I knock about 10% off.',
  },
  {
    title: 'Big jobs',
    body: 'If it doesn\u2019t fit a line, we talk it through and I give you one fixed price.',
  },
  {
    title: 'Changes',
    body: 'A fixed price covers what we wrote down at the start. Anything new after that is hourly, or a new quote.',
  },
  {
    title: 'Hosting',
    body: 'Setting up the domain, SSL and CDN is in the project price. After that, hosting is whatever the host charges, plus $20 a month if you want me running it.',
  },
];

/** The five hourly rows on the sheet, in the sheet's order. */
export const hourly: Priced[] = [
  line('Building a website, an app, or the part behind it', 60, 95, 160, 'hour'),
  line('AI work', 75, 80, 140, 'hour'),
  line('Servers and deploys', 70, 100, 180, 'hour'),
  line('Small fixes and advice', 60, 75, 150, 'hour'),
  line('Reading through existing code', 100, 100, 250, 'hour'),
];

export interface RateGroup {
  id: string;
  title: string;
  /** Only when the heading does not already say it. */
  lede?: string;
  /** What is in the group, short enough to sit under its title on a closed card. */
  blurb?: string;
  lines: Priced[];
}

export const websites: RateGroup = {
  id: 'websites',
  title: 'Websites',
  lede: 'Pointing your domain at the site, and the security certificate, are included.',
  lines: [
    line('One page', 1500, 1500, 5000, undefined,
      'Who you are, what you do and how to reach someone, on a single page.'),
    line('5 to 10 pages', 3500, 2500, 6000, undefined,
      'A proper site with its own design, and a page for each thing you do.'),
    line('10 to 20 pages', 6000, 5000, 12000, undefined,
      'For when there\u2019s a lot to say: services, listings, menus, the lot.'),
    line('Redesign, with the old content moved over', 3000, 2000, 8000),
    line('WordPress custom theme', 2000, 1500, 5000),
    line('Webflow or Framer site', 2500, 2000, 7000),
    line('Portfolio or personal site', 1200, 1000, 3000),
    line('Restaurant or hospitality site', 2500, 2000, 6000),
    line('Real estate or property listing site', 4000, 3000, 10000),
  ],
};

/** Everything past a website, in the sheet's order. */
export const catalog: RateGroup[] = [
  {
    id: 'backend',
    title: 'The part behind the site',
    blurb: 'APIs, databases, payments and webhooks, background jobs, search.',
    lines: [
      line('The site talking to its data, a small version (REST, about 5 to 10 endpoints)', 2500, 2000, 6000),
      line('The site talking to its data, a large version (REST, 20 or more endpoints)', 7000, 6000, 15000),
      line('A flexible way to ask for that data (GraphQL)', 5000, 4000, 12000),
      line('Designing how the data is stored', 1500, 1000, 4000),
      line('PostgreSQL or MySQL, set up', 1500, 1000, 3000),
      line('MongoDB, set up', 1500, 1000, 3000),
      line('Moving the old data over', 3000, 2000, 8000),
      line('Connecting Stripe, Twilio, or something like them', 800, 500, 2500),
      line('Letting other services ping yours (webhooks)', 1500, 1000, 3000),
      line('Jobs that run in the background', 2000, 1500, 4000),
      line('Search across the content (Elasticsearch or Meilisearch)', 3000, 2000, 6000),
    ],
  },
  {
    id: 'auth',
    title: 'Logins',
    blurb: 'Accounts, sign in with Google or Apple, who can see what.',
    lines: [
      line('Email and password', 1200, 1000, 3000),
      line('Sign in with Google or Apple', 700, 500, 1500),
      line('Who can see what', 2000, 1500, 4000),
      line('A separate space for each customer', 4000, 3000, 10000),
      line('Password reset, and confirming the email', 700, 500, 1500),
      line('A second check at login (two-factor)', 1500, 1000, 3000),
    ],
  },
  {
    id: 'commerce',
    title: 'A store',
    blurb: 'Shopify, or your own checkout and subscriptions on Stripe.',
    lines: [
      line('Shopify, set up with a theme', 2000, 1500, 5000),
      line('Your own store: products, cart, and checkout (Stripe)', 6000, 5000, 15000),
      line('Subscriptions (Stripe Billing)', 2500, 2000, 6000),
      line('A marketplace, more than one seller', 18000, 15000, 50000),
      line('Taking payments', 1500, 1000, 3000),
      line('Tracking inventory', 4000, 3000, 10000),
    ],
  },
  {
    id: 'cms',
    title: 'Editing it yourself',
    blurb: 'So you can change the words yourself without calling me.',
    lines: [
      line('Edit the site yourself (Sanity, Strapi, or Contentful)', 2500, 2000, 6000),
      line('A blog or news section', 700, 500, 2000),
      line('Moving the old pages over', 1500, 1000, 4000),
      line('More than one language', 2000, 1500, 5000),
    ],
  },
  {
    id: 'mobile',
    title: 'Phone apps',
    blurb: 'iPhone and Android, plus getting it into the stores.',
    lines: [
      line('A phone app, first version, 3 to 5 screens (React Native)', 10000, 8000, 25000),
      line('A phone app, 10 or more screens (React Native)', 25000, 20000, 60000),
      line('An iPhone app, written for Apple (Swift)', 18000, 15000, 50000),
      line('An Android app, written for Android (Kotlin)', 18000, 15000, 50000),
      line('Submitting it to the app store', 700, 500, 1500),
      line('Push notifications', 1500, 1000, 3000),
      line('Buying things inside the app', 2500, 2000, 6000),
    ],
  },
  {
    id: 'desktop',
    title: 'Computer apps',
    blurb: 'Mac, Windows, or both from one codebase.',
    lines: [
      line('An app for Mac and Windows (Electron or Tauri)', 7000, 5000, 20000),
      line('A Mac app (Swift)', 12000, 10000, 40000),
      line('A Windows app (.NET or C#)', 12000, 10000, 40000),
      line('An app for several systems (Rust or C++)', 20000, 15000, 60000),
    ],
  },
  {
    id: 'ai',
    title: 'AI',
    blurb: 'Chatbots on your own documents, pulling data out of a mess, voice.',
    lines: [
      line('A chatbot that answers from your own documents', 6000, 5000, 20000),
      line('Pulling structured data out of messy sources', 10000, 8000, 25000),
      line('Sorting or grading things automatically', 6000, 5000, 20000),
      line('Image generation, wired into the product', 2500, 2000, 8000),
      line('A voice agent, on the phone or in the app', 12000, 10000, 40000),
      line('Automation (Zapier, Make, or custom)', 1500, 1000, 5000),
      line('Reading documents, including scans', 4000, 3000, 12000),
    ],
  },
  {
    id: 'devops',
    title: 'Servers',
    blurb: 'Deploys, cloud setup, backups, alerts, and making it faster.',
    lines: [
      line('Deploys that run themselves (CI/CD)', 1500, 1000, 4000),
      line('Cloud setup (AWS, Google Cloud, or Azure)', 3000, 2000, 8000),
      line('Packaging the app so it runs the same everywhere (Docker)', 1500, 1000, 3000),
      line('Many servers, managed together (Kubernetes)', 7000, 5000, 20000),
      line('A server, set up and locked down', 1500, 1000, 4000),
      line('Domain, DNS, the certificate, and the fast-delivery network', 400, 300, 1000),
      line('Alerts when something breaks', 2000, 1500, 5000),
      line('Backups, and a plan if it fails', 2000, 1500, 5000),
      line('Making it faster', 1500, 1000, 4000),
      line('A security check', 3000, 2000, 8000),
    ],
  },
  {
    id: 'other',
    title: 'Everything else',
    blurb: 'Rescuing old software, games, search setup, analytics, email.',
    lines: [
      line('Advice on a hard problem', 100, 100, 250, 'hour'),
      line('Keeping a site running, per site', 150, 75, 300, 'month'),
      line('A few days a month, ongoing', 4000, 3000, 12000, 'month'),
      line('Taking apart old software, or rescuing it', 8000, 5000, 30000),
      line('A game, or work inside a game engine', 20000, 10000, 100000),
      line('Search setup for Google', 1500, 1000, 4000),
      line('Analytics (Google Analytics)', 700, 500, 2000),
      line('Email the site can send', 1500, 1000, 3000),
    ],
  },
];

export const generalDev = hourly[0];
export const onePage = websites.lines[0];

export const priceLine = () =>
  `Building is ${priceLabel(generalDev)}. A one-page site is ${priceLabel(onePage)}.`;

export interface PricingFaq {
  q: string;
  a: string;
}

export const pricingFaq: PricingFaq[] = [
  {
    q: 'I just need a website. Where do I look?',
    a: 'The three cards at the top. A one-page site is $1,500. If one page turns out not to be enough, adding more later is hourly work.',
  },
  {
    q: 'I already have a site and need a small change.',
    a: 'That\u2019s $60 an hour. If I have to dig through a lot of someone else\u2019s code first, that part is $100 an hour.',
  },
  {
    q: 'Do I own it when it\u2019s done?',
    a: 'Yes, once the last payment clears. You get the private repo, so you can take it to anyone.',
  },
  {
    q: 'Can you do it faster?',
    a: 'That\u2019s what the rush rate is for. Under two weeks adds 25%, under a week adds 50%.',
  },
  {
    q: 'What I want isn\u2019t on the list.',
    a: 'Email me anyway. Tell me what you want and I\u2019ll quote it as one fixed price.',
  },
  {
    q: 'What happens after it launches?',
    a: 'Bug fixes are free for 30 days. After that I can keep it running for $150 a month, or you can take it from there.',
  },
];
