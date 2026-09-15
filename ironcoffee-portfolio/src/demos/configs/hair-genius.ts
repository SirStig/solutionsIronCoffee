import type { DemoConfig } from '../types';

/**
 * Hair Genius Barbershop, Parker CO. NOT READY TO SEND.
 *
 * Different pitch from the others. They are not websiteless: they have
 * hair-genius.wsite.top, a free Website.com subdomain that serves a page with
 * no title tag. So the opening line is not "you need a website", it is "you
 * have a placeholder on somebody else's domain, and it is the first thing a
 * new customer sees."
 *
 * Verified 2026-09-15: name, address, phone, opening hours, Booksy booking,
 * and the wsite.top subdomain.
 *
 * Still needed from a visit:
 *   - The service list and prices from Booksy or the wall.
 *   - Barber names, if they want them on the site. They were hiring, so a
 *     "join us" line may be worth more to them than another bio.
 *   - Brand colors from the shop.
 *   - Photos. Everything here is generic barbering imagery for layout only.
 */
const hairGenius: DemoConfig = {
  slug: 'hair-genius',
  createdAt: '2026-09-15',
  template: 'booking',
  draft: true,
  placeholderPhotos: true,

  business: {
    name: 'Hair Genius Barbershop',
    tagline: 'Cuts, fades and beard work in Parker.',
    city: 'Parker',
    state: 'CO',
    address: '11211 Dransfeldt Rd #128',
    phone: '(303) 805-5348',
    facebookUrl: 'https://www.facebook.com/hairgeniusparkercolorado/',
  },

  // TODO: placeholder palette. Eyedropper the real one off the shop.
  brand: {
    primary: '#1C1C1E',
    secondary: '#0E0E10',
    accent: '#C0462F',
    font: 'sans',
  },

  hero: {
    headline: 'Book a barber in Parker, not a phone call.',
    sub: 'Walk in when there is a chair, book ahead when there is not. Open seven days.',
    image: 'demos/hair-genius/hero',
    ctaLabel: 'Book Online',
    ctaHref:
      'https://booksy.com/en-us/401161_hair-genius-parker-colorado_barber-shop_14955_parker',
  },

  // TODO: pull the real list and prices from their Booksy page before sending.
  services: [
    { title: 'Haircut', icon: 'scissors', body: 'Scissor or clipper, finished how you want it.', price: 'Call for pricing' },
    { title: 'Fade', icon: 'razor', body: 'Skin, low, mid or high.', price: 'Call for pricing' },
    { title: 'Beard trim', icon: 'comb', body: 'Line up and shape.', price: 'Call for pricing' },
    { title: 'Color', icon: 'brush', body: 'Ask at the chair.', price: 'Call for pricing' },
  ],

  hours: [
    { day: 'Monday', open: '10am to 6pm' },
    { day: 'Tuesday', open: '10am to 6pm' },
    { day: 'Wednesday', open: '10am to 7pm' },
    { day: 'Thursday', open: '10am to 7pm' },
    { day: 'Friday', open: '10am to 6pm' },
    { day: 'Saturday', open: '10am to 6pm' },
    { day: 'Sunday', open: '9am to 5pm' },
  ],

  gallery: [
    'demos/hair-genius/chair',
    'demos/hair-genius/fade',
    'demos/hair-genius/tools',
    'demos/hair-genius/detail',
  ],

  about: {
    // TODO: replace once you have spoken to them.
    heading: 'Open seven days, on Dransfeldt Road.',
    body: 'Hair Genius Barbershop cuts in Parker seven days a week, taking both walk-ins and booked appointments.',
    image: 'demos/hair-genius/about',
  },
};

export default hairGenius;
