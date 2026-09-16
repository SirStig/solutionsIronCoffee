import type { DemoConfig } from '../types';

/**
 * Jill's Feed & Country Supply, Elizabeth CO. **PROBABLY CLOSED. DO NOT SEND.**
 *
 * ## Read this before touching anything else in the file
 *
 * The evidence that this business shut in late summer 2025 is strong enough
 * that it should be treated as closed until a phone call says otherwise:
 *
 *   - A neighbour on Nextdoor, **6 September 2025**, in their own words:
 *     "Does anyone have Jill's as in Jill's feed store home number? I haven't
 *     been to town until today to discover she has closed her business."
 *   - A Facebook post on the shop's own page whose body begins "THANK YOU
 *     EVERYONE! 10 years ago a dream came to fruition and I opened Jill's
 *     Feed...". Several search engines render its page title as "Jill's Feed
 *     and Country Supply closing after 10 years." The body itself is behind
 *     Facebook's login wall and the Internet Archive was offline, so this is
 *     strongly indicated rather than read.
 *   - The company incorporated in **February 2015**. "Ten years" lands in 2025
 *     and matches the September sighting exactly.
 *   - Colorado Secretary of State status is **Delinquent**, with no filing
 *     since December 2024 and the January 2026 periodic report never filed.
 *   - The most recent review anywhere is **April 2025**. Nothing later exists.
 *   - The Nextdoor page for the address now renders under the name of the
 *     **previous** occupant, Franks Feed & Supply.
 *
 * What says otherwise is entirely automated: the Facebook About page still
 * renders "Open now", Yelp is not prefixed CLOSED, and several aggregators
 * still publish hours. Scraped listings outlive the businesses in them, which
 * is exactly the trap this whole folder exists to avoid.
 *
 * **One call to (303) 646-4730 settles it.** A disconnected number is itself
 * the answer. There is nothing to gain from opening a cold pitch with a
 * website for a shop that closed a year ago, and quite a lot to lose.
 *
 * ## Why the file is still here
 *
 * The page itself is finished and good, and the six illustrations in
 * `components/scenes/feed.tsx` are drawn for feed and country supply
 * generally, not for this business. If another feed store in the county is
 * worth approaching, this is a config file and a folder of artwork away from
 * being their preview instead.
 *
 * ## Verified, for whoever picks that up
 *
 * Owner **Jill Walkinshaw**; incorporated 3 February 2015 as Jill's Feed &
 * Country Supply, Inc. Address **125 S Tabor St** per the Secretary of State's
 * own filing, which settles the S Tabor / Tabor disagreement across the
 * directories. Phone (303) 646-4730 and jillsfeed80107@gmail.com, both
 * self-published on Facebook. Won Best Pet Supply Store in Colorado Community
 * Media's Best of the Best 2022 for Elbert County. No website ever existed;
 * jillsfeed.com and jillsfeedandcountrysupply.com do not resolve.
 *
 * The hours below were consistent across several directory listings, but the
 * listings disagree on whether the shop opened at 8 or 9 and on Saturday's
 * closing time, and all of it is moot if the doors are shut.
 */
const jillsFeed: DemoConfig = {
  slug: 'jills-feed',
  createdAt: '2026-09-15',
  template: 'retail',

  /*
   * Live, and the one page in this folder to phone before you send.
   *
   * The header sets out the evidence that this shop closed around September
   * 2025, and it is strong: a dated neighbor on Nextdoor, a "closing after ten
   * years" post on their own page, and a Secretary of State registration that
   * went delinquent. Everything saying otherwise is a scraped listing.
   *
   * One call to (303) 646-4730 settles it. A disconnected number is the
   * answer. If it is answered, this page is ready.
   */

  business: {
    name: "Jill's Feed & Country Supply",
    // TODO: replace once you have heard how they describe themselves.
    tagline: 'Feed, seed and animal health supplies in Elizabeth.',
    city: 'Elizabeth',
    state: 'CO',
    address: '125 S Tabor St',
    phone: '(303) 646-4730',
    email: 'jillsfeed80107@gmail.com',
    facebookUrl: 'https://www.facebook.com/JillsFeed80107/',
  },

  // TODO: placeholder palette. Eyedropper the real one off their signage.
  brand: {
    primary: '#6B7B3A',
    secondary: '#2B3220',
    accent: '#C2892F',
    font: 'industrial',
    motif: 'wheat',
  },

  hero: {
    // TODO: the headline should name the one thing people phone to ask about.
    // For a feed store that is nearly always stock: "do you have chicks in".
    headline: 'Feed, seed and supplies, in stock in Elizabeth.',
    sub: 'Call ahead and we will tell you what is on the shelf before you make the drive.',
    image: 'art:feed-plains',
    ctaLabel: 'Call the Store',
    ctaHref: 'tel:+13036464730',
  },

  // Only the categories confirmed from public listings. Do not add brands,
  // prices or availability until you have seen them on the shelf.
  products: [
    {
      group: 'What we carry',
      icon: 'sack',
      items: [
        { name: 'Livestock and poultry feed' },
        { name: 'Animal health products' },
        { name: 'Seed' },
        { name: 'Chicks' },
        { name: 'Hay' },
        { name: 'Propane tank exchange' },
      ],
    },
  ],

  services: [
    {
      title: 'Call to check stock',
      icon: 'phone',
      body: 'Ring the store before you drive out and we will tell you what is on hand.',
    },
    {
      title: 'Propane tank exchange',
      icon: 'bottle',
      body: 'Swap an empty cylinder for a full one while you are picking up feed.',
    },
  ],

  // Consistent across several directory listings. Worth one confirming glance
  // at the door, since a wrong closing time is the detail an owner spots first.
  hours: [
    { day: 'Monday', open: '8am to 6pm' },
    { day: 'Tuesday', open: '8am to 6pm' },
    { day: 'Wednesday', open: '8am to 6pm' },
    { day: 'Thursday', open: '8am to 6pm' },
    { day: 'Friday', open: '8am to 6pm' },
    { day: 'Saturday', open: '8am to 6pm' },
    { day: 'Sunday', open: 'Closed' },
  ],

  // No storefront or exterior shots on purpose. A generic interior reads as
  // "this is the layout"; a photograph of somebody else's building with a sign
  // on it reads as a claim about their premises.
  gallery: [
    'art:feed-sacks',
    'art:feed-brooder',
    'art:feed-hay',
    'art:feed-propane',
  ],

  about: {
    // TODO: replace entirely. This says nothing because nothing is confirmed.
    heading: 'A feed store in Elizabeth.',
    body: "Jill's Feed & Country Supply carries feed, hay, seed, animal health products and chicks for Elizabeth and the surrounding county, and swaps propane cylinders while you are in.",
    image: 'art:feed-seed',
  },
};

export default jillsFeed;
