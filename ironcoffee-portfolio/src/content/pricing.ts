/**
 * What a website costs. Kept here with the rest of the copy so the page stays
 * layout only, and so changing a price is one edit in one file.
 *
 * Published on purpose. The objection that kills a small business enquiry is
 * not "I do not want a website", it is a silent assumption that the answer is
 * five figures. A number on the page ends that before it starts.
 */

/**
 * What the business gets out of it, in their terms.
 *
 * Every line is an outcome. The mechanism belongs further down the page:
 * nobody has ever bought a website because of how it was built.
 */
export const outcomes = [
  {
    title: 'People can find you at all',
    body: 'Someone searching for what you do right now is finding your competitor, or a Facebook page nobody has touched since spring. That is what not having one actually costs.',
  },
  {
    title: 'You stop answering the same four questions',
    body: 'Are you open, what does it cost, do you have it in, where are you. Answered before the phone rings, so the calls you do take are worth taking.',
  },
  {
    title: 'You look like you are still trading',
    body: 'Fair or not, people decide in seconds whether a business is still going. A real site settles it. A dead page settles it the other way.',
  },
  {
    title: 'It gets done without you doing it',
    body: 'Most businesses without a website are not short of money. They are short of a free weekend. This takes about an hour of your time, total.',
  },
];

export interface Tier {
  id: string;
  name: string;
  price: string;
  /** Sits under the price. One line. */
  summary: string;
  /** Who should stop reading here and pick this one. */
  bestFor: string;
  features: string[];
  timeline: string;
  featured?: boolean;
}

export const tiers: Tier[] = [
  {
    id: 'starter',
    name: 'One page',
    price: '$500',
    summary: 'Everything on one scrolling page.',
    bestFor:
      'A business whose customers only need the hours, the phone number and a reason to trust you.',
    features: [
      'One page, built around a single call to action',
      'Your photos, colors and logo',
      'Hours, map and click to call',
      'Works properly on a phone',
      'Live in Google search',
      'One round of changes after you see it',
    ],
    timeline: 'About a week',
  },
  {
    id: 'standard',
    name: 'Full site',
    price: '$1,800',
    summary: 'The one most businesses need.',
    bestFor:
      'Anyone with a menu, a service list, staff, or more to say than fits on one screen.',
    features: [
      'Five to seven pages, written and laid out for you',
      'Menu, services or product listings',
      'Contact and quote forms that reach your inbox',
      'Photo galleries',
      'Google Business Profile tidied up and linked',
      'Set up so you show up for local searches',
      'Two rounds of changes',
      'A walkthrough call so you know how it works',
    ],
    timeline: 'Two to three weeks',
    featured: true,
  },
  {
    id: 'custom',
    name: 'Something bigger',
    price: 'From $3,200',
    summary: 'Priced on what it actually takes.',
    bestFor:
      'Online ordering, real booking systems, more than one location, or selling something.',
    features: [
      'Everything in the full site',
      'Online ordering or booking wired in',
      'Online store and payments',
      'Multiple locations, each with its own page',
      'Customer accounts or member areas',
      'Whatever the job turns out to need',
    ],
    timeline: 'Quoted after we talk',
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
  note: 'Optional. Cancel whenever you like and the site is yours to take with you.',
  features: [
    'Hosting, domain and the security certificate',
    'Backups, and someone to call when something breaks',
    'Small text and photo changes, as many as you need',
    'Seasonal hours and holiday notices',
    'Software kept current so nothing goes stale',
    'A plain summary each month of how many people visited',
  ],
};

export interface PricingFaq {
  q: string;
  a: string;
}

export const pricingFaq: PricingFaq[] = [
  {
    q: 'Do I have to pay it all up front?',
    a: 'Half to start, half when you are happy with it and it goes live. If you get to the end and do not want it, you do not pay the second half.',
  },
  {
    q: 'Who owns the site?',
    a: 'You do. The domain is in your name, the files are yours, and if you ever want to move it somewhere else I will hand it over without a fuss.',
  },
  {
    q: 'What do you need from me?',
    a: 'Photos, your hours, and about an hour of your time on the phone. I write the words and you tell me where I got your business wrong.',
  },
  {
    q: 'Do I need the monthly plan?',
    a: 'No. You can host it yourself for a few dollars a month. Most people take it because they would rather text me than learn how any of it works.',
  },
  {
    q: 'What if I already have a website?',
    a: 'Then the question is whether it earns its keep. Send me the link and I will tell you honestly whether it needs replacing or just needs fixing.',
  },
  {
    q: 'How do I know it will be fast?',
    a: 'Open any of the sample sites on your phone and run a speed test on it. That is the same build you would get.',
  },
];
