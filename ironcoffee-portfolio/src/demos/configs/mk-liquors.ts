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
    tagline: 'Family owned, and we will order in whatever you ask for.',
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
    image: 'demos/mk-liquors/hero',
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
      group: 'Beer',
      icon: 'can',
      items: [
        { name: 'By the six pack' },
        { name: 'By the case' },
        { name: 'Seltzers and ciders' },
      ],
    },
    {
      group: 'Wine',
      icon: 'grapes',
      items: [{ name: 'Red' }, { name: 'White' }, { name: 'Sparkling' }],
    },
    {
      group: 'Spirits',
      icon: 'bottle',
      items: [
        { name: 'Whiskey, bourbon and rye' },
        { name: 'Vodka and gin' },
        { name: 'Rum and tequila' },
        { name: 'Mixers' },
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
      title: 'Owner operated',
      icon: 'star',
      body: 'The people behind the counter own the place. That is why you get an answer rather than a shrug toward the shelf.',
    },
  ],

  marquee: [
    'Family owned',
    'Owner operated',
    'Special orders welcome',
    'Beer, wine and spirits',
    'On Comanche Street',
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
    'demos/mk-liquors/shelves',
    'demos/mk-liquors/wine',
    'demos/mk-liquors/beer',
    'demos/mk-liquors/counter',
  ],

  about: {
    heading: 'The one on Comanche Street.',
    body: 'MK Liquors is on Comanche Street in Kiowa, run by the family that owns it rather than by a chain. If what you want is not on the shelf, ask and it can be ordered in. The next store is a long way down the highway, which is the whole reason this one is worth keeping.',
    // Drawn, where the photographs are not. A picture of the trade can
    // stand beside the story; it cannot be the story, and one illustration
    // per page is what stops five previews looking like five stock sets.
    image: 'art:bottle-glasses',
  },

  /*
   * No testimonials, and that is a decision rather than an omission.
   *
   * There are real reviews out there and the words are good: "Very friendly and knowledgeable just the way a small
   * town Liquor store is suppose to be", and "Good selection. Owner
   * opperated and they are very nice people."
   * But every aggregator that carries them strips the reviewer's name and
   * does not say which platform they came from, and `source` is a promise
   * that the quote can be found. Printing "Google review" over a review I
   * cannot confirm was left on Google is inventing a citation, which is the
   * same failure as inventing the quote, only harder to spot.
   *
   * Worth two minutes on the call: ask where their reviews are and this
   * section fills itself. See barr-bear.ts for the shape.
   */

  pages: [
    {
      slug: 'stock',
      label: 'What we carry',
      kind: 'stock',
      intro: 'Categories rather than a brand list, because what is on the shelf this week is a question for the phone.',
    },
    {
      slug: 'about',
      label: 'The store',
      kind: 'about',
      title: 'The one on Comanche Street',
    },
    {
      slug: 'visit',
      label: 'Visit',
      kind: 'contact',
      title: 'Stop by',
      intro: 'On Comanche Street in Kiowa, which is a good deal closer than the drive to Parker.',
    },
  ],

  faq: [
    {
      q: 'Can you order something in for me?',
      a: 'Yes. Ring or come in and tell us what you are after. Special orders are a normal part of the week here, not a favor.',
    },
    {
      q: 'Can you help me pick a wine?',
      a: 'Ask. Tell us the meal or the budget and you will get a straight answer rather than being pointed at a shelf.',
    },
    {
      q: 'Who runs the store?',
      a: 'The family that owns it. The same people are behind the counter, which is the whole difference between here and a chain down the highway.',
    },
  ],

  /*
   * The photography is the trade, not this shop, and the page says so.
   *
   * <DemoShell> prints a line admitting it, which is the point: an owner spots
   * a picture of somebody else's place instantly, and having already said it
   * turns the one weak spot in a cold preview into evidence that you are
   * straight with people. None of these are exteriors, storefronts or signage,
   * because a generic interior reads as a layout while a building reads as a
   * claim about their premises.
   *
   * Clear this flag the day they hand over their own pictures.
   */
  placeholderPhotos: true,

};

export default mkLiquors;
