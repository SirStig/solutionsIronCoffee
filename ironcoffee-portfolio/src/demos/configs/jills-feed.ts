import type { DemoConfig } from '../types';

/**
 * Jill's Feed & Country Supply, Elizabeth CO. NOT READY TO SEND.
 *
 * Every field below is either verified from a public listing or marked as
 * needing you. Nothing here is guessed, because a wrong price or a wrong
 * opening time in a preview is the one mistake you cannot walk back in front
 * of a stranger.
 *
 * Verified 2026-09-15 from public directory listings:
 *   name, address, phone, email, Facebook page, and that they carry feed,
 *   animal health products, seed and chicks. No website found, so the pitch
 *   premise holds.
 *
 * Still needed, all of it from a visit or a phone call:
 *   - The brands they actually carry, and what is usually in stock.
 *   - Brand colors, eyedroppered from their sign or their logo.
 *   - One real detail for the About section: how long they have been there,
 *     who runs it, what they are proud of.
 *   - Photos into assets/images/demos/jills-feed/. Until then every image
 *     slot renders a branded gradient, which is why this still looks like
 *     something rather than a page of broken frames.
 *
 * Confirm the street address on arrival too. Yelp says 125 S Tabor St and
 * several aggregators say 125 Tabor St.
 */
const jillsFeed: DemoConfig = {
  slug: 'jills-feed',
  createdAt: '2026-09-15',
  template: 'retail',
  // Clear this once the hours, photos and real details are in.
  draft: true,
  placeholderPhotos: true,

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
    font: 'slab',
  },

  hero: {
    // TODO: the headline should name the one thing people phone to ask about.
    // For a feed store that is nearly always stock: "do you have chicks in".
    headline: 'Feed, seed and supplies, in stock in Elizabeth.',
    sub: 'Call ahead and we will tell you what is on the shelf before you make the drive.',
    image: 'demos/jills-feed/hero',
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
    'demos/jills-feed/feed',
    'demos/jills-feed/chicks',
    'demos/jills-feed/hay',
    'demos/jills-feed/tack',
  ],

  about: {
    // TODO: replace entirely. This says nothing because nothing is confirmed.
    heading: 'A feed store in Elizabeth.',
    body: "Jill's Feed & Country Supply carries feed, hay, seed, animal health products and chicks for Elizabeth and the surrounding county, and swaps propane cylinders while you are in.",
    image: 'demos/jills-feed/about',
  },
};

export default jillsFeed;
