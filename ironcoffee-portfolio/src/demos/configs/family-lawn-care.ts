import type { DemoConfig } from '../types';

/**
 * Family Lawn Care, Parker CO. NOT READY TO SEND, and the thinnest of the
 * live prospects.
 *
 * Verified 2026-09-15: they exist, they run a Facebook page at
 * facebook.com/lawncareparker, they are a father-and-son operation doing full
 * service lawn care in Parker, and they have no website. lawncareparker.com
 * resolves but is a parked lander, not theirs.
 *
 * That is genuinely all that is public. In particular:
 *   - NO PHONE NUMBER is published anywhere I could find, which is why
 *     `business.phone` is absent rather than guessed. The whole page currently
 *     points at a quote form instead, which is a fair demonstration but is not
 *     what the finished site should do.
 *   - No address, no service area list, no prices, no team names.
 *
 * Before this is worth building properly, message the Facebook page and get a
 * phone number and a service list. It is a five minute job and without it the
 * preview has nothing concrete in it.
 */
const familyLawnCare: DemoConfig = {
  slug: 'family-lawn-care',
  createdAt: '2026-09-15',
  template: 'trades',
  draft: true,
  placeholderPhotos: true,

  business: {
    name: 'Family Lawn Care',
    tagline: 'Full service lawn care in Parker, father and son.',
    city: 'Parker',
    state: 'CO',
    // No phone published anywhere public. Do not invent one.
    facebookUrl: 'https://www.facebook.com/lawncareparker/',
  },

  // TODO: placeholder palette. Get it from their truck or their logo.
  brand: {
    primary: '#2F6B34',
    secondary: '#16301A',
    accent: '#D8A024',
    font: 'sans',
  },

  hero: {
    headline: 'A father and son who mow your lawn themselves.',
    sub: 'Full service lawn care in Parker. The people who quote the job are the people who turn up to do it.',
    image: 'demos/family-lawn-care/hero',
    ctaLabel: 'Get a Quote',
    ctaHref: '#quote',
  },

  // TODO: confirm every one of these. "Full service lawn care" is the only
  // description that is actually public, so this is an educated skeleton, not
  // a verified list. Do not send it until they have read it back to you.
  services: [
    {
      title: 'Mowing and trimming',
      body: 'Regular cuts through the season, edges and walks blown clean.',
      price: 'Free quote',
    },
    {
      title: 'Aeration',
      body: 'Spring and fall, to get water and air into Front Range clay.',
      price: 'Free quote',
    },
    {
      title: 'Fertilizing and weed control',
      body: 'Scheduled through the growing season.',
      price: 'Free quote',
    },
    {
      title: 'Spring and fall cleanup',
      body: 'Leaves, dead growth and beds tidied either side of winter.',
      price: 'Free quote',
    },
  ],

  // TODO: confirm how far they actually travel.
  serviceAreas: ['Parker'],

  // TODO: no published hours. Confirm before sending.
  hours: [
    { day: 'Monday', open: 'Call to confirm' },
    { day: 'Tuesday', open: 'Call to confirm' },
    { day: 'Wednesday', open: 'Call to confirm' },
    { day: 'Thursday', open: 'Call to confirm' },
    { day: 'Friday', open: 'Call to confirm' },
    { day: 'Saturday', open: 'Call to confirm' },
    { day: 'Sunday', open: 'Closed' },
  ],

  gallery: [
    'demos/family-lawn-care/lawn',
    'demos/family-lawn-care/mower',
    'demos/family-lawn-care/edging',
    'demos/family-lawn-care/cleanup',
  ],

  about: {
    heading: 'A family business, not a franchise.',
    body: 'Family Lawn Care is a father and son doing full service lawn care in Parker. The person who quotes your yard is the person who cuts it.',
    image: 'demos/family-lawn-care/about',
  },
};

export default familyLawnCare;
