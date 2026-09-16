import type { DemoConfig } from '../types';

/**
 * Fictional. Shows off the `booking` template: a priced service menu, stylist
 * bios, and a booking button that is the whole point of the page.
 */
const copperAndComb: DemoConfig = {
  slug: 'copper-and-comb',
  createdAt: '2026-09-15',
  template: 'booking',
  showcase: true,
  tier: 'starter',

  business: {
    name: 'Copper & Comb',
    tagline: 'A small salon that runs on time.',
    city: 'Parker',
    state: 'CO',
    address: '2260 Pine Drive, Suite 4',
    phone: '(720) 555-0188',
    email: 'frontdesk@copperandcomb.example',
  },

  brand: {
    primary: '#1F3A38',
    secondary: '#12211F',
    accent: '#C08552',
    font: 'luxe',
  },

  hero: {
    headline: 'Book in thirty seconds. Keep the appointment.',
    sub: 'Five chairs, no double-booking, and a stylist who actually has time to talk about what you want before they start cutting.',
    image: 'demos/copper-and-comb/hero',
    ctaLabel: 'Book Online',
    // Points at the priced service list, which is where someone actually
    // decides. A real salon would send this to its booking system.
    ctaHref: '#services',
  },

  services: [
    {
      title: 'Cut & style',
      icon: 'scissors',
      body: 'Consultation, shampoo, cut and finish. Ninety minutes for the first visit so we get it right.',
      price: '$65+',
    },
    {
      title: 'Color',
      icon: 'brush',
      body: 'Single process, gloss or full highlight. Price depends on length and density, so we quote before we start.',
      price: 'From $120',
    },
    {
      title: 'Balayage',
      icon: 'sparkle',
      body: 'Hand-painted, lived-in, grows out without a line. Plan three to four hours.',
      price: 'From $185',
    },
    {
      title: 'Extensions',
      icon: 'comb',
      body: 'Hand-tied wefts, color-matched and cut in. Consultation required first.',
      price: 'Consultation required',
    },
    {
      title: 'Blowout',
      icon: 'chair',
      body: 'Wash and finish, no cut. Book it the morning of the thing.',
      price: '$45',
    },
    {
      title: 'Bridal & events',
      icon: 'calendarCheck',
      body: 'On-site or in the chair, trials included. Book the trial at least a month ahead.',
      price: 'Call for pricing',
    },
  ],

  stats: [
    { value: '5', label: 'Chairs, on purpose', icon: 'chair' },
    { value: '2019', label: 'Open since', icon: 'calendarCheck' },
    { value: '90 min', label: 'First appointment', icon: 'clock' },
    { value: 'No', label: 'Double booking', icon: 'sparkle' },
  ],

  testimonials: [
    {
      quote: 'First salon I have been to that starts when it says it will. I get an hour back every six weeks and my hair has never looked better.',
      name: 'Priya S.',
      detail: 'Client since 2021',
    },
    {
      quote: 'Dana talked me out of what I asked for and gave me something that actually suits my face. I did not know you were allowed to do that.',
      name: 'Erin M.',
      detail: 'Parker',
    },
  ],

  team: [
    {
      name: 'Dana Whitfield',
      role: 'Owner · Color specialist',
      image: 'demos/copper-and-comb/dana',
      bio: 'Opened the shop in 2019 after eleven years behind a chair downtown. Takes the hard corrections nobody else will.',
    },
    {
      name: 'Marcus Reyes',
      role: 'Senior stylist',
      image: 'demos/copper-and-comb/marcus',
      bio: 'Curly hair, textured cuts, and the fastest clean fade in Parker.',
    },
    {
      name: 'Priya Raman',
      role: 'Stylist · Extensions',
      image: 'demos/copper-and-comb/priya',
      bio: 'Hand-tied wefts and long-hair cutting. Books out about three weeks.',
    },
    {
      name: 'Jo Bennett',
      role: 'Stylist',
      image: 'demos/copper-and-comb/jo',
      bio: 'Takes new clients most weeks, and hers is the best first appointment in the shop.',
    },
  ],

  hours: [
    { day: 'Monday', open: 'Closed' },
    { day: 'Tuesday', open: '9am to 7pm' },
    { day: 'Wednesday', open: '9am to 7pm' },
    { day: 'Thursday', open: '9am to 8pm' },
    { day: 'Friday', open: '9am to 8pm' },
    { day: 'Saturday', open: '8am to 5pm' },
    { day: 'Sunday', open: 'Closed' },
  ],

  gallery: [
    'demos/copper-and-comb/interior',
    'demos/copper-and-comb/color-1',
    'demos/copper-and-comb/station',
    'demos/copper-and-comb/color-2',
    'demos/copper-and-comb/cut',
    'demos/copper-and-comb/detail',
  ],

  about: {
    heading: 'Five chairs, on purpose.',
    body: 'Copper & Comb stayed small because the alternative is running late. Every stylist keeps one client at a time, consultations are built into the booking, and if we think what you are asking for will wreck your hair we will say so and offer you something better. Walk-ins welcome when a chair is open, but booking online means it will be.',
    image: 'demos/copper-and-comb/about',
  },

  faq: [
    {
      q: 'How far out do you book?',
      a: 'Two to three weeks for a color, usually within the week for a cut. Cancellations open up constantly, so check the booking page.',
    },
    {
      q: 'What if I am late?',
      a: 'We hold the chair fifteen minutes. After that we may need to shorten the service so the next client is not pushed back.',
    },
    {
      q: 'Do you take walk-ins?',
      a: 'When we have a gap, yes. Call first and we will tell you honestly whether it is worth the drive.',
    },
  ],

  map: { lat: 39.5186, lng: -104.7614 },
};

export default copperAndComb;
