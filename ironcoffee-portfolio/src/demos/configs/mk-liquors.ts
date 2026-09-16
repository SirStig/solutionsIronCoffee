import type { DemoConfig } from '../types';

/**
 * MK Liquors, Kiowa CO.
 *
 * ## The name question is settled, and the answer is MK
 *
 * This file used to open with a warning that Yelp lists a "KC Liquors" at 240
 * Comanche and that the shop may have changed hands. It has not. Colorado's
 * Department of Revenue publishes its liquor licensee registry as open data,
 * and the record for 240 Comanche St reads:
 *
 *   Licensee  KRAFT & COMPANY, LLC
 *   DBA       MK LIQUORS
 *   License   43-01282-0000, Retail Liquor Store (city)
 *   Expires   2027-02-14
 *
 * It is the only license at that address, and there is **no KC Liquors
 * licensed anywhere in Colorado**. The nearest name in the state is JKC Liquor
 * in Calhan, thirty five miles away. The Yelp listing is simply wrong.
 *
 * That expiry date is also the best "still open" signal any of these prospects
 * has. Colorado retail liquor licenses renew annually, so a license running to
 * February 2027 was renewed around February 2026, and a liquor store cannot
 * legally trade without one. This one is open.
 *
 * ## Verified 2026-09-16
 *
 * Kraft & Company, LLC, entity 20011136224, formed 10 July 2001, in good
 * standing, registered agent Pamela Sue Kraft of Kiowa. Address 240 Comanche
 * St. Retail liquor store license, so full spirits, wine and beer to take
 * away. No website: mkliquors.com is M K Liquor Store of Houston, Texas, an
 * unrelated family business, and kcliquors.com does not resolve.
 *
 * **One trap.** facebook.com/mkliquors is "MK Wine & Liquor" of Colorado
 * Springs, a different business entirely. The Kiowa page is
 * facebook.com/212919092843135 and is login-walled, so it is not linked here
 * until somebody confirms it is theirs.
 *
 * ## Still to confirm, in one phone call
 *
 *   - **Which number is live.** (303) 953-0154 is consistent across seven
 *     directories and is used here. (303) 621-2575 appears on the incorrect
 *     Yelp listing, and 303-621 is the Kiowa exchange, so it is plausible.
 *   - **The hours.** Yahoo and Yelp agree exactly on what is below, which is
 *     the strongest hours signal of any prospect in this folder, but they may
 *     be drawing on one upstream feed. One search snippet describes the shop
 *     as "a 24-hour liquor store"; that contradicts the same listing's own
 *     hours and Colorado caps retail liquor sales at 8am to midnight, so it is
 *     a scraping artifact. **Never print it.**
 *   - **Owner names.** Reviews say "Pam and Mike", and the registered agent is
 *     Pamela Kraft, which makes MK read as Mike and Kraft. Likely, not
 *     verified, and not on the page for that reason.
 *   - **What year the store opened.** The LLC dates to 2001. The store may not.
 *   - **Brand colors and photos.** Nothing visual about this business exists
 *     online at all. The palette below is a guess.
 *
 * ## Worth knowing before the call
 *
 * Their moat is distance, and a customer said it better than any marketing
 * would: "Their prices may be a dollar or two more for a few items, but it's a
 * long way to the alternative stores with little customer service." Another
 * names the service that goes with it: "They have made special orders for me,
 * but they also have a great selection." Both are real, published and
 * unattributed to a full name, and neither is on this page, because a preview
 * for a real business does not print customer quotes without asking.
 */
const mkLiquors: DemoConfig = {
  slug: 'mk-liquors',
  createdAt: '2026-09-15',
  template: 'retail',

  /*
   * Live, not a draft.
   *
   * The state liquor license settles both questions a draft flag exists to
   * hold open: the business is trading, and it is trading under this name.
   * See the header. Two details are still worth a call, and neither is a
   * reason to keep the page unreachable: whether (303) 953-0154 or the number
   * on the incorrect Yelp listing is the live line, and whether the hours
   * below, which Yahoo and Yelp agree on exactly, came from one feed.
   */

  business: {
    // Confirmed against the state liquor license, not against a directory.
    name: 'MK Liquors',
    tagline: 'The bottle shop in Kiowa, and the reason you do not drive to Parker.',
    city: 'Kiowa',
    state: 'CO',
    address: '240 Comanche St',
    phone: '(303) 953-0154',
  },

  // Bricolage Grotesque: the face in the set drawn by hand, which is the right
  // register for a bottle shop. The colors are a guess and are meant to be.
  brand: {
    primary: '#7B2233',
    secondary: '#241016',
    accent: '#C9A227',
    font: 'craft',
    motif: 'bottles',
  },

  hero: {
    headline: 'Ask us for it. If it is not on the shelf, we will order it.',
    sub: 'Beer, wine and spirits on Comanche Street, without the drive to Parker and back.',
    image: 'art:bottle-shelf',
    ctaLabel: 'Call the Store',
    ctaHref: 'tel:+13039530154',
  },

  /*
   * Categories only, and no brands.
   *
   * A liquor store's pitch is what is on the shelf this week, which nobody
   * knows without walking the aisles. Printing a brand list gathered from the
   * internet would be guessing about the one thing the owner checks first.
   */
  products: [
    {
      group: 'What we carry',
      icon: 'bottle',
      items: [
        { name: 'Beer, by the six pack and the case' },
        { name: 'Red and white wine' },
        { name: 'Whiskey, bourbon and rye' },
        { name: 'Vodka, gin, rum and tequila' },
        { name: 'Mixers and ice' },
      ],
    },
  ],

  services: [
    {
      title: 'Special orders',
      icon: 'box',
      body: 'If we do not stock it, ask. Getting a bottle in for somebody is most of what a store this size does.',
    },
    {
      title: 'Wine, with an opinion',
      icon: 'bottle',
      body: 'Tell us the meal or the budget and you will get a straight answer rather than a shrug at the shelf.',
    },
    {
      title: 'Put something aside',
      icon: 'phone',
      body: 'Ring ahead and it will be behind the counter with your name on it when you get here.',
    },
  ],

  marquee: [
    'Family owned',
    'Special orders welcome',
    'Beer, wine and spirits',
    'On Comanche Street',
    'Cash and card',
  ],

  /*
   * Yahoo and Yelp agree exactly on these. See the header for why that is
   * still only "likely", and for the "24 hours" claim that must never be
   * printed.
   */
  hours: [
    { day: 'Monday', open: '10am to 9pm' },
    { day: 'Tuesday', open: '10am to 9pm' },
    { day: 'Wednesday', open: '10am to 9pm' },
    { day: 'Thursday', open: '10am to 9pm' },
    { day: 'Friday', open: '10am to 9pm' },
    { day: 'Saturday', open: '11am to 9pm' },
    { day: 'Sunday', open: '11am to 4pm' },
  ],

  gallery: [
    'art:bottle-row',
    'art:bottle-cooler',
    'art:bottle-wine',
    'art:bottle-barrel',
  ],

  about: {
    heading: 'The one on Comanche Street.',
    body: 'MK Liquors has been the bottle shop in Kiowa for years, run by the family that owns it rather than by a chain. The selection is bigger than a town this size has any right to, and anything that is not on the shelf can be ordered in. The nearest alternative is a long way down the highway, and we would rather you did not have to find that out.',
    image: 'art:bottle-glasses',
  },

  faq: [
    {
      q: 'Can you order something in for me?',
      a: 'Yes. Ring or call in and tell us what you are after. Special orders are a normal part of the week here, not a favor.',
    },
    {
      q: 'Do you take cards?',
      a: 'Yes.',
    },
    {
      q: 'Can I have something put by?',
      a: 'Call ahead and it will be waiting behind the counter rather than gone off the shelf when you arrive.',
    },
  ],
};

export default mkLiquors;
