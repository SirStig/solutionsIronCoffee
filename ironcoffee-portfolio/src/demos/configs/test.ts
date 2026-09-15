import type { DemoConfig } from '../types';

/**
 * The preview that is not for anybody.
 *
 * Two jobs. It keeps `test.ironcoffee.com` pointing at something real, so the
 * wildcard DNS and the certificate can be checked without touching a config
 * meant for an actual business. And it is the only preview in the repo, which
 * means the preview code path stays exercised on every build: the expiry
 * banner, the noindex tag, the contact form that routes to me.
 *
 * It also happens to be the only `retail` config, so that template does not rot
 * while the gallery shows off the other four.
 *
 * `createdAt` needs bumping every couple of months or this will retire itself
 * and start serving the expired page, which is exactly what it should do.
 */
const test: DemoConfig = {
  slug: 'test',
  createdAt: '2026-09-15',
  template: 'retail',

  business: {
    name: 'Kiowa Creek Mercantile',
    tagline: 'Feed, tack and hardware since the road was still dirt.',
    city: 'Kiowa',
    state: 'CO',
    address: '210 County Road 45',
    phone: '(303) 555-0173',
    email: 'store@kiowacreekmercantile.example',
  },

  brand: {
    primary: '#5B6B3A',
    secondary: '#2A2F1E',
    accent: '#C8922B',
    font: 'slab',
  },

  hero: {
    headline: 'Yes, the chicks are in.',
    sub: 'Stop phoning to ask. This page says what is on the shelf and we update it the morning the truck comes.',
    image: 'demos/test/hero',
    ctaLabel: 'See the Stock List',
    ctaHref: '#stock',
  },

  products: [
    {
      group: 'Livestock feed',
      icon: 'sack',
      items: [
        {
          name: 'Layer pellet, 50lb',
          desc: 'Sixteen percent protein.',
          availability: 'In stock',
        },
        {
          name: 'Chick starter, 50lb',
          desc: 'Medicated and unmedicated.',
          availability: 'In stock',
        },
        {
          name: 'Alfalfa cubes, 50lb',
          availability: 'In stock',
        },
        {
          name: 'Sweet feed, 50lb',
          availability: 'Low, more Thursday',
        },
        {
          name: 'Goat and sheep pellet',
          availability: 'In stock',
        },
        {
          name: 'Cracked corn, 50lb',
          availability: 'Out until Friday',
        },
      ],
    },
    {
      group: 'Live birds',
      icon: 'chick',
      items: [
        {
          name: 'Barred Rock pullets',
          desc: 'Straight run, day old.',
          availability: 'In stock',
        },
        {
          name: 'Rhode Island Red pullets',
          availability: 'In stock',
        },
        {
          name: 'Turkey poults',
          desc: 'Ordered in, ask at the counter.',
          availability: 'Call to confirm',
        },
        {
          name: 'Ducklings',
          availability: 'Out until spring',
        },
      ],
    },
    {
      group: 'Around the place',
      icon: 'basket',
      items: [
        { name: 'T-posts and clips', availability: 'In stock' },
        { name: 'Barbed and field wire', availability: 'In stock' },
        { name: 'Stock tanks, 100 to 300 gallon', availability: 'In stock' },
        { name: 'Tank de-icers', desc: 'They go fast in October.', availability: 'In stock' },
        { name: 'Fly spray and wormer', availability: 'In stock' },
        { name: 'Work gloves and muck boots', availability: 'In stock' },
      ],
    },
  ],

  services: [
    {
      title: 'We load it for you',
      icon: 'truck',
      body: 'Pull round the back, tell us what you need and it goes in the truck. Nobody here expects you to carry a fifty pound sack across the lot.',
    },
    {
      title: 'Special orders',
      icon: 'box',
      body: 'If we do not carry it and you need it regularly, we will put it on the order and keep it in for you.',
    },
    {
      title: 'Delivery inside twenty miles',
      icon: 'route',
      body: 'Bulk feed and tanks, most weeks on a Thursday run.',
      price: 'Call for pricing',
    },
  ],

  hours: [
    { day: 'Monday', open: '7am to 6pm' },
    { day: 'Tuesday', open: '7am to 6pm' },
    { day: 'Wednesday', open: '7am to 6pm' },
    { day: 'Thursday', open: '7am to 6pm' },
    { day: 'Friday', open: '7am to 6pm' },
    { day: 'Saturday', open: '8am to 4pm' },
    { day: 'Sunday', open: 'Closed' },
  ],

  gallery: [
    'demos/test/storefront',
    'demos/test/feed-aisle',
    'demos/test/chicks',
    'demos/test/tack',
    'demos/test/loading',
    'demos/test/counter',
  ],

  about: {
    heading: 'Third generation behind the same counter.',
    body: 'The Mercantile opened in 1948 and has been run by the same family ever since. We know what your ground does in April and we know which feed your neighbour swears by. If we do not stock something we will tell you who does, even when that is the big place down the highway.',
    image: 'demos/test/about',
  },

  faq: [
    {
      q: 'How current is the stock list?',
      a: 'Updated most mornings. If something matters, ring first. The page is a good guide and the phone is the truth.',
    },
    {
      q: 'Do you hold things?',
      a: 'For a day, happily. Call and give us a name.',
    },
    {
      q: 'Do you take cards?',
      a: 'Cards, cash and checks from people we know.',
    },
  ],

  map: { lat: 39.3472, lng: -104.4644 },
};

export default test;
