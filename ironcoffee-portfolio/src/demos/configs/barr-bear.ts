import type { DemoConfig } from '../types';

/**
 * Barr Bear Country Cuts and MORE, Kiowa CO. NOT READY TO SEND.
 *
 * Verified 2026-09-15 from public listings: name, address, phone, owner,
 * opening hours, and that they take bookings through Fresha. No website found
 * on any listing and barrbearcountrycuts.com does not resolve, so the pitch
 * premise holds.
 *
 * Still needed from a visit:
 *   - The service list and prices. Nothing public breaks it down, and guessing
 *     what a haircut costs in front of the person who sets the price is the
 *     fastest way to look careless.
 *   - Brand colors from the sign.
 *   - Whether "and MORE" means retail, tanning, waxing or something else. It
 *     is in their own name, so it matters to them.
 *   - Photos. Everything here is generic barbering imagery for layout only.
 *
 * Angle: they are on Fresha, so booking is solved. The gap is that nobody
 * searching "barber Kiowa" finds anything they own.
 */
const barrBear: DemoConfig = {
  slug: 'barr-bear',
  createdAt: '2026-09-15',
  template: 'booking',
  draft: true,
  placeholderPhotos: true,

  business: {
    name: 'Barr Bear Country Cuts',
    // TODO: replace with how LeAnn describes the shop herself.
    tagline: 'Cuts, trims and styling in Kiowa.',
    city: 'Kiowa',
    state: 'CO',
    address: '312 Comanche St',
    phone: '(303) 621-2420',
    facebookUrl:
      'https://www.facebook.com/p/Barr-Bear-Country-Cuts-and-MORE-100069513674143/',
  },

  // TODO: placeholder palette. Eyedropper the real one off the signage.
  brand: {
    primary: '#7A4A24',
    secondary: '#2A1C12',
    accent: '#C9A227',
    font: 'slab',
  },

  hero: {
    headline: 'A chair in Kiowa, booked in thirty seconds.',
    sub: 'Locally owned, on Comanche Street, and open early on Saturdays.',
    image: 'demos/barr-bear/hero',
    ctaLabel: 'Book a Chair',
    // TODO: point this at the real Fresha booking page for the shop.
    ctaHref: 'https://www.fresha.com/lvp/barr-bear-country-cuts-comanche-street-kiowa-7rEeZe',
  },

  // TODO: no prices until LeAnn gives them to you. "Call for pricing" is the
  // honest placeholder and reads fine on a finished site.
  services: [
    {
      title: 'Haircuts',
      body: 'Cuts for men, women and children.',
      price: 'Call for pricing',
    },
    {
      title: 'Beard trims',
      body: 'Shaping and tidying.',
      price: 'Call for pricing',
    },
    {
      title: 'Styling and color',
      body: 'Ask in the chair and she will tell you what will work.',
      price: 'Call for pricing',
    },
  ],

  hours: [
    { day: 'Monday', open: 'Closed' },
    { day: 'Tuesday', open: '8am to 5pm' },
    { day: 'Wednesday', open: '8am to 5pm' },
    { day: 'Thursday', open: '8am to 5pm' },
    { day: 'Friday', open: '8am to 5pm' },
    { day: 'Saturday', open: '7am to 2pm' },
    { day: 'Sunday', open: 'Closed' },
  ],

  gallery: [
    'demos/barr-bear/chair',
    'demos/barr-bear/tools',
    'demos/barr-bear/clippers',
    'demos/barr-bear/detail',
  ],

  about: {
    // TODO: replace. This is only what the listings actually say.
    heading: 'Locally owned, in Kiowa.',
    body: 'Barr Bear Country Cuts is owned and run by LeAnn Goetz on Comanche Street in Kiowa, cutting hair for the town and the country around it.',
    image: 'demos/barr-bear/about',
  },
};

export default barrBear;
