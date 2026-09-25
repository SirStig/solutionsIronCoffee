import type { DemoConfig } from '../types';

/**
 * Ninebark Garden Center, Castle Rock CO. Fictional.
 *
 * Shows off the `retail` template: a stock list that answers "have you got it
 * in" without a phone call, a running band of the things a regular already
 * knows, and a seasonal note under a deliberately shallow hero.
 *
 * Exists because the gallery had four samples across five templates, which
 * meant `retail` was the one layout nobody could look at and nobody audited.
 * A nursery earns the slot: stock genuinely changes week to week, which is the
 * exact problem this template is shaped around, and it is the one trade where
 * "call before you drive out" is a real sentence people say.
 *
 * Ninebark is a shrub. The name is invented, and so is everything else here.
 */
const ninebarkGarden: DemoConfig = {
  slug: 'ninebark-garden',
  createdAt: '2026-09-16',
  template: 'retail',
  showcase: true,
  tier: 'site',

  pages: [
    { slug: 'stock', label: 'In stock', kind: 'stock', title: 'What is on the benches' },
    {
      slug: 'services',
      label: 'Services',
      kind: 'services',
      title: 'Beyond the shelves',
    },
    { slug: 'about', label: 'Our story', kind: 'about' },
    { slug: 'visit', label: 'Visit', kind: 'contact', title: 'Come and have a look' },
  ],

  business: {
    name: 'Ninebark Garden Center',
    tagline: 'Plants that live through a Colorado winter.',
    city: 'Castle Rock',
    state: 'CO',
    address: '2140 Founders Parkway',
    phone: '(303) 555-0173',
    email: 'hello@ninebarkgarden.example',
  },

  brand: {
    primary: '#3F6B4A',
    secondary: '#1C2A20',
    accent: '#C8842B',
    font: 'craft',
  },

  hero: {
    headline: 'Grown for six thousand feet.',
    sub: 'Every tree and shrub on our benches has been through a winter here. If it will not survive Castle Rock, we do not sell it.',
    image: 'demos/ninebark-garden/hero',
    ctaLabel: 'See what is in stock',
    ctaHref: '/templates/ninebark-garden/stock',
  },

  marquee: [
    'Everything hardened off outdoors',
    'One-year guarantee on trees and shrubs',
    'Soil testing on the bench',
    'Bulk compost by the yard',
    'We load it for you',
    'Open seven days in season',
  ],

  products: [
    {
      group: 'Trees and shrubs',
      icon: 'leaf',
      items: [
        {
          name: 'Bare-root fruit trees',
          desc: 'Apple, pear, cherry. Grafted on hardy rootstock.',
          price: 'From $65',
          availability: 'Seasonal, March to May',
        },
        {
          name: 'Shade trees, 2-inch caliper',
          desc: 'Maple, honeylocust, hackberry.',
          price: 'From $240',
          availability: 'In stock',
        },
        {
          name: 'Ninebark and serviceberry',
          desc: 'Native shrubs. Both handle wind and bad soil.',
          price: 'From $38',
          availability: 'In stock',
        },
        {
          name: 'Balled-and-burlapped conifers',
          desc: 'Spruce and pine, six to ten feet.',
          price: 'Call for pricing',
          availability: 'Delivery only',
        },
      ],
    },
    {
      group: 'Perennials and annuals',
      icon: 'basket',
      items: [
        {
          name: 'Xeric perennials',
          desc: 'Salvia, penstemon, agastache, yarrow.',
          price: '$12',
          availability: 'In stock',
        },
        {
          name: 'Pollinator flats',
          desc: 'Eighteen plants, mixed, chosen for succession.',
          price: '$96',
          availability: 'In stock',
        },
        {
          name: 'Vegetable starts',
          desc: 'Tomatoes, peppers, squash. Short-season varieties only.',
          price: '$5',
          availability: 'Seasonal, April to June',
        },
        {
          name: 'Hanging baskets',
          desc: 'Made up here, not shipped in.',
          price: 'From $34',
          availability: 'Seasonal, May onward',
        },
      ],
    },
    {
      group: 'Soil and supplies',
      icon: 'sack',
      items: [
        {
          name: 'Compost, by the yard',
          desc: 'Bring a truck or we will deliver locally.',
          price: '$48 a yard',
          availability: 'In stock',
        },
        {
          name: 'Bagged mulch',
          desc: 'Shredded cedar and pine bark.',
          price: '$9 a bag',
          availability: 'In stock',
        },
        {
          name: 'Tools and gloves',
          desc: 'Pruners, trowels, twine, leather gloves.',
          price: 'Priced in store',
          availability: 'In stock',
        },
      ],
    },
  ],

  services: [
    {
      title: 'Free soil test',
      icon: 'leaf',
      body: 'Bring a cup of soil in a bag. We will tell you what is wrong with it and what to do about it, and no, you do not have to buy anything.',
    },
    {
      title: 'Planting plans',
      icon: 'route',
      body: 'Send photos of the space and rough measurements. We will draw up what goes where and what it costs.',
      price: '$120, taken off the plants',
    },
    {
      title: 'Delivery and planting',
      icon: 'truck',
      body: 'Anything over six feet, we will bring it and put it in the ground properly.',
      price: 'From $90',
    },
    {
      title: 'One-year guarantee',
      icon: 'shield',
      body: 'Any tree or shrub that dies inside a year, bring back the tag and we will replace it once.',
    },
  ],

  hours: [
    { day: 'Monday', open: '9am to 6pm' },
    { day: 'Tuesday', open: '9am to 6pm' },
    { day: 'Wednesday', open: '9am to 6pm' },
    { day: 'Thursday', open: '9am to 6pm' },
    { day: 'Friday', open: '9am to 6pm' },
    { day: 'Saturday', open: '8am to 6pm' },
    { day: 'Sunday', open: '9am to 4pm' },
  ],

  gallery: [
    'demos/ninebark-garden/perennials',
    'demos/ninebark-garden/trees',
    'demos/ninebark-garden/seedlings',
    'demos/ninebark-garden/soil',
    'demos/ninebark-garden/tools',
  ],

  about: {
    heading: 'We test the plants so you do not have to.',
    body: 'Ninebark started in 2009 as four hoop houses behind a house on Founders Parkway. Every tree and shrub we sell is grown or finished on site and left outside through the winter, which is the only honest way to find out what survives at six thousand feet with forty-mile-an-hour wind in March. Plenty of things have not. Those are the ones you will not find on our benches, and that is most of what you are paying for.',
    image: 'demos/ninebark-garden/about',
  },

  stats: [
    { value: '2009', label: 'Growing since', icon: 'leaf' },
    { value: '4', label: 'Hoop houses we started with', icon: 'roof' },
    { value: '6,200 ft', label: 'Everything hardened at', icon: 'pin' },
    { value: '3 acres', label: 'Of benches to walk', icon: 'basket' },
  ],

  testimonials: [
    {
      quote: 'They steered me away from the tree I came in for and sold me a cheaper one that is still alive four years later.',
      name: 'Hannah K.',
      detail: 'Castle Rock',
    },
    {
      quote: 'Took a bag of dirt in, got a straight answer and a plan, spent nothing that day.',
      name: 'Luis G.',
      detail: 'Larkspur',
    },
    {
      quote: 'The only place around here that will tell you when something is a bad idea for your yard.',
      name: 'Megan T.',
      detail: 'Franktown',
    },
  ],

  faq: [
    {
      q: 'When do the vegetable starts come in?',
      a: 'Early April, and they are gone by the end of June. Do not plant them out before Mother’s Day whatever the weather is doing.',
    },
    {
      q: 'Do you deliver?',
      a: 'Within about fifteen miles, from $90 depending on the load. Anything balled-and-burlapped has to be delivered because it is heavier than it looks.',
    },
    {
      q: 'Can I bring soil in to be tested?',
      a: 'Yes, a cup in a sandwich bag is plenty. It is free and there is no catch.',
    },
    {
      q: 'What does the guarantee actually cover?',
      a: 'Trees and shrubs, one replacement, inside a year, with the tag. It does not cover anything that was never watered, and we can usually tell.',
    },
  ],

  map: { lat: 39.3722, lng: -104.8561 },
};

export default ninebarkGarden;
