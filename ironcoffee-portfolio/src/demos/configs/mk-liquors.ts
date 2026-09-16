import type { DemoConfig } from '../types';

/**
 * MK Liquors, Kiowa CO. NOT READY TO SEND, and check the name first.
 *
 * WARNING. Yelp carries a listing for "KC LIQUORS" at the same address, 240
 * Comanche, updated August 2026, while every MK listing is an older directory
 * scrape. That pattern usually means the shop changed hands or changed name.
 * Walk past and look at the sign before you contact anybody. Sending a preview
 * addressed to the previous owner's business name is worse than sending
 * nothing.
 *
 * Verified 2026-09-15: address and phone appear consistently across listings,
 * and no website exists. mkliquors.com resolves but belongs to an unrelated
 * store in Texas.
 *
 * Still needed:
 *   - The actual trading name.
 *   - OPENING HOURS. Listings disagree badly, one says 9 to 6 and another says
 *     10 to 9, so none of them are trustworthy.
 *   - What they are known for. A liquor store in a town this size lives on
 *     being the one that stocks a particular thing.
 *   - Brand colors and photos.
 */
const mkLiquors: DemoConfig = {
  slug: 'mk-liquors',
  createdAt: '2026-09-15',
  template: 'retail',
  draft: true,
  placeholderPhotos: true,

  business: {
    // TODO: confirm against the sign. May now be KC Liquors.
    name: 'MK Liquors',
    tagline: 'Beer, wine and spirits on Comanche Street.',
    city: 'Kiowa',
    state: 'CO',
    address: '240 Comanche St',
    phone: '(303) 953-0154',
  },

  // TODO: placeholder palette.
  brand: {
    primary: '#7B2233',
    secondary: '#241016',
    accent: '#C9A227',
    font: 'craft',
  },

  hero: {
    headline: 'The liquor store in Kiowa.',
    sub: 'Beer, wine and spirits on Comanche Street. Call and we will put something aside.',
    image: 'demos/mk-liquors/hero',
    ctaLabel: 'Call the Store',
    ctaHref: 'tel:+13039530154',
  },

  // Categories only. No brands and no prices until somebody has walked the
  // aisles, because a liquor store's whole pitch is what is actually on the
  // shelf this week.
  products: [
    {
      group: 'What we stock',
      icon: 'bottle',
      items: [
        { name: 'Beer, domestic and craft' },
        { name: 'Wine' },
        { name: 'Spirits' },
        { name: 'Mixers and ice' },
      ],
    },
  ],

  services: [
    {
      title: 'Call ahead',
      icon: 'phone',
      body: 'Ring and we will set aside what you need before you drive over.',
    },
    {
      title: 'Special orders',
      icon: 'box',
      body: 'Ask for something we do not carry and we will look into getting it in.',
    },
  ],

  // TODO: every one of these is a placeholder. The listings contradict
  // each other, so confirm in person.
  hours: [
    { day: 'Monday', open: 'Call to confirm' },
    { day: 'Tuesday', open: 'Call to confirm' },
    { day: 'Wednesday', open: 'Call to confirm' },
    { day: 'Thursday', open: 'Call to confirm' },
    { day: 'Friday', open: 'Call to confirm' },
    { day: 'Saturday', open: 'Call to confirm' },
    { day: 'Sunday', open: 'Call to confirm' },
  ],

  gallery: [
    'demos/mk-liquors/shelves',
    'demos/mk-liquors/wine',
    'demos/mk-liquors/beer',
    'demos/mk-liquors/counter',
  ],

  about: {
    heading: 'On Comanche Street.',
    body: 'The liquor store in Kiowa, on Comanche Street, stocking beer, wine and spirits for the town.',
    image: 'demos/mk-liquors/about',
  },
};

export default mkLiquors;
