import type { DemoConfig } from '../types';

/**
 * Jill's Feed & Country Supply, Elizabeth CO.
 *
 * ## The closure scare, and why this file no longer leads with it
 *
 * Desk research in September 2026 made a strong case that this shop had closed
 * a year earlier: a dated Nextdoor neighbor saying so, a post on their own
 * page beginning "THANK YOU EVERYONE! 10 years ago a dream came to fruition",
 * search engines rendering that post's title as "closing after 10 years", and
 * a Secretary of State registration gone delinquent with no filing since
 * December 2024.
 *
 * **They are open.** Joshua confirmed it directly on 2026-09-16.
 *
 * Worth keeping the wrong answer written down, because the reasoning looked
 * airtight and every piece of it was circumstantial. A neighbor can be wrong
 * about which shop. A ten year anniversary post reads exactly like a closing
 * post to a search engine that only has the first line. A delinquent periodic
 * report means somebody did not file a form, not that they locked the door.
 * None of that beats one person who knows.
 *
 * ## Verified
 *
 * Owner **Jill Walkinshaw**. Incorporated **3 February 2015** as Jill's Feed &
 * Country Supply, Inc., so eleven years this spring, in a building that was
 * Frank's Feed and Supply before her. Address **125 S Tabor St** per the
 * Secretary of State's own filing, which settles the S Tabor / Tabor
 * disagreement across the directories. Phone (303) 646-4730 and
 * jillsfeed80107@gmail.com, both self-published on Facebook. Won **Best Pet
 * Supply Store** in Colorado Community Media's Best of the Best 2022, Elbert
 * County edition. No website has ever existed: jillsfeed.com and
 * jillsfeedandcountrysupply.com do not resolve, and no listing carries a
 * website field.
 *
 * Two services are concrete rather than inferred, and both are on the page
 * because they are the reason people drive out rather than order online:
 * **they load the feed for you**, and **they fill propane tanks**. Note filling
 * rather than exchanging. This file used to say exchange, which is a different
 * service with a different price, and is exactly the sort of detail the owner
 * reads first.
 *
 * ## Still to confirm, in one visit
 *
 *   - **The hours.** Directories agree on Monday to Saturday but disagree on
 *     whether the doors open at 8 or 9 and whether Saturday ends at 5 or 6.
 *     What is below is the most commonly listed version.
 *   - **The brands, and what is usually in stock.** Categories only here.
 *   - **Brand colors**, eyedroppered off the sign. The palette is a guess.
 *   - **Photographs.** Until then the page is illustrated and says so.
 */
const jillsFeed: DemoConfig = {
  slug: 'jills-feed',
  createdAt: '2026-09-15',
  template: 'retail',

  business: {
    name: "Jill's Feed & Country Supply",
    tagline: 'Feed, hay and chicks, and somebody to load it for you.',
    city: 'Elizabeth',
    state: 'CO',
    address: '125 S Tabor St',
    phone: '(303) 646-4730',
    email: 'jillsfeed80107@gmail.com',
    facebookUrl: 'https://www.facebook.com/JillsFeed80107/',
  },

  // Archivo: wide and heavy, which is the right register for agriculture and
  // is nothing like the warm Fraunces on the Kiowa salon. Colors are a guess.
  brand: {
    primary: '#6B7B3A',
    secondary: '#2B3220',
    accent: '#C2892F',
    font: 'industrial',
    motif: 'wheat',
  },

  hero: {
    headline: 'Call first. We will tell you what is on the shelf.',
    sub: "Jill's has been on Tabor Street since 2015. Ring before you hitch up the trailer and save yourself the drive.",
    image: 'art:feed-plains',
    ctaLabel: 'Call the Store',
    ctaHref: 'tel:+13036464730',
  },

  /*
   * Categories, no brands and no prices.
   *
   * What is on the shelf this week is the one thing a feed store's customers
   * actually ring about, and it is the one thing nobody can know from a desk.
   */
  products: [
    {
      group: 'Feed',
      icon: 'sack',
      items: [
        { name: 'Horse feed' },
        { name: 'Poultry feed' },
        { name: 'Goat and sheep' },
        { name: 'Cattle' },
      ],
    },
    {
      group: 'Hay and bedding',
      icon: 'hay',
      items: [
        { name: 'Hay' },
        { name: 'Straw' },
        { name: 'Pine shavings' },
        { name: 'Alfalfa' },
      ],
    },
    {
      group: 'Animal health and seed',
      icon: 'heart',
      items: [
        { name: 'Animal health products' },
        { name: 'Supplements' },
        { name: 'Seed' },
      ],
    },
  ],

  services: [
    {
      title: 'We load it for you',
      icon: 'truck',
      body: 'Pull up and somebody comes out. Nobody here expects you to wrestle a fifty pound sack into a truck bed on your own.',
    },
    {
      title: 'Propane filled',
      icon: 'bottle',
      body: 'Bring the tank you already own and we will fill it, rather than swapping it for somebody else’s.',
    },
    {
      title: 'Chicks in season',
      icon: 'chick',
      body: 'Ring ahead in spring to find out what has come in and what is still to come.',
    },
  ],

  marquee: [
    'Locally owned since 2015',
    'We load it for you',
    'Propane filled, not swapped',
    'Chicks in season',
    'Hay, straw and shavings',
  ],

  // The most commonly listed version. Directories disagree on the opening
  // hour and on Saturday's close, so this is the first thing to confirm.
  hours: [
    { day: 'Monday', open: '8am to 6pm' },
    { day: 'Tuesday', open: '8am to 6pm' },
    { day: 'Wednesday', open: '8am to 6pm' },
    { day: 'Thursday', open: '8am to 6pm' },
    { day: 'Friday', open: '8am to 6pm' },
    { day: 'Saturday', open: '8am to 6pm' },
    { day: 'Sunday', open: 'Closed' },
  ],

  gallery: [
    'art:feed-sacks',
    'art:feed-brooder',
    'art:feed-hay',
    'art:feed-propane',
  ],

  about: {
    heading: 'Eleven years on Tabor Street.',
    body: "Jill Walkinshaw opened Jill's Feed & Country Supply in February 2015, in a building that had been a feed store long before that. It carries feed, hay, bedding, seed, animal health products and chicks for Elizabeth and the country around it, fills propane, and loads your truck while you are still getting your wallet out. In 2022 it was voted Best Pet Supply Store in Elbert County.",
    image: 'art:feed-seed',
  },

  faq: [
    {
      q: 'Do you have chicks in?',
      a: 'It depends on the week and the season. Ring and ask, because they go quickly and what is in this week may not be in next.',
    },
    {
      q: 'Do you fill propane or exchange it?',
      a: 'Fill. Bring the tank you already have and you get it back with propane in it, rather than trading a good tank for whatever is in the cage.',
    },
    {
      q: 'Will somebody help me load?',
      a: 'Yes. That is normal here, not a favor, and you do not need to ask twice.',
    },
  ],
};

export default jillsFeed;
