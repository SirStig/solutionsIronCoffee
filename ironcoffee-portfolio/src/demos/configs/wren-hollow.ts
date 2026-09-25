import type { DemoConfig } from '../types';

/**
 * Wren Hollow, Larkspur CO. Fictional, and the one that is showing off.
 *
 * The other four samples answer "can this person build me a website". This one
 * answers the question that actually decides it, which is "are they any good",
 * and it answers it by being a page nobody would mistake for a template: a
 * pinned gallery that moves sideways as you scroll, a headline that arrives a
 * line at a time, photographs that drift inside their frames, and a season
 * switcher built out of radio inputs.
 *
 * A wedding venue rather than a design studio on purpose. A studio site full
 * of tricks impresses other designers. A venue is a real small business with a
 * real ticket price, and an owner looking at this can see their own business
 * in it, which is the only reaction worth anything.
 *
 * `/ ` in the hero headline splits it into the lines that animate.
 */
const wrenHollow: DemoConfig = {
  slug: 'wren-hollow',
  createdAt: '2026-09-16',
  template: 'venue',
  showcase: true,
  tier: 'system',

  /* The admin page is the argument for the price ladder, so it is a real
     route rather than a screenshot. See PageKind['admin']. */
  pages: [
    {
      slug: 'admin',
      label: 'Owner view',
      kind: 'admin',
      title: 'What the owner sees',
    },
  ],

  business: {
    name: 'Wren Hollow',
    tagline: 'Forty acres, one wedding at a time.',
    city: 'Larkspur',
    state: 'CO',
    address: '9140 Spruce Mountain Road',
    phone: '(303) 555-0119',
    email: 'hello@wrenhollow.example',
  },

  brand: {
    primary: '#7A6A52',
    secondary: '#221F1A',
    accent: '#C4A46A',
    font: 'estate',
  },

  hero: {
    headline: 'Forty acres. / One wedding / at a time.',
    sub: 'A restored 1912 barn and the meadow it stands in, an hour south of Denver. One booking a weekend, so the place is yours from Friday.',
    ctaLabel: 'Check a date',
    ctaHref: '#inquire',
    image: 'demos/wren-hollow/hero',
  },

  marquee: [
    'One wedding a weekend',
    'Sleeps fourteen on site',
    'Heated barn, open all year',
    'Bring your own caterer',
    'Ceremony and reception in one place',
  ],

  about: {
    heading: 'Forty acres, one wedding at a time.',
    body: 'We only take one booking a weekend. That means the barn, the meadow, the loft and the whole forty acres belong to one set of people from Friday afternoon until Sunday lunch, and nobody is waiting outside for you to finish.',
    image: 'demos/wren-hollow/about',
  },

  /* Read by the template as three alternating parallax features. */
  services: [
    {
      title: 'The whole weekend, not an afternoon',
      icon: 'calendar',
      body: 'Set up on Friday, get married on Saturday, clear out by Sunday lunch. No four-hour window, no second party arriving behind you, nobody rushing the photographs because another couple is in the parking lot.',
    },
    {
      title: 'Bring whoever you want to cook',
      icon: 'plate',
      body: 'No approved caterer list and no corkage. The kitchen is yours, the bar is yours to stock, and if your uncle wants to smoke a pig for two days in the yard, that is between you and your uncle.',
    },
    {
      title: 'Somewhere to sleep',
      icon: 'bed',
      body: 'The loft over the barn sleeps eight and the cottage across the meadow sleeps six. Nobody is driving down the mountain at midnight, and breakfast happens where the wedding was.',
      price: 'From $480 a night',
    },
  ],

  /* Packages, rendered by the venue template rather than as a stock list. */
  products: [
    {
      group: 'Packages',
      items: [
        {
          name: 'The Friday',
          price: '$4,200',
          desc: 'One day, up to sixty people. Ceremony on the lawn, dinner in the barn, out by eleven.',
          availability: 'November to April',
        },
        {
          name: 'The Weekend',
          price: '$9,800',
          desc: 'Friday afternoon to Sunday lunch, up to a hundred and forty. Loft and cottage included.',
          availability: 'Books twelve to eighteen months out',
        },
        {
          name: 'The Elopement',
          price: '$1,400',
          desc: 'Two of you, two witnesses, two hours. Weekday mornings, decided the week before if you like.',
          availability: 'Any month',
        },
      ],
    },
  ],

  hours: [
    { day: 'Monday', open: 'By appointment' },
    { day: 'Tuesday', open: 'By appointment' },
    { day: 'Wednesday', open: 'By appointment' },
    { day: 'Thursday', open: 'By appointment' },
    { day: 'Friday', open: 'Events only' },
    { day: 'Saturday', open: 'Tours 10am to 2pm' },
    { day: 'Sunday', open: 'Events only' },
  ],

  /* Order matters. The venue template indexes into this for the pinned
     gallery and for the four seasons, so reordering it reorders the page. */
  gallery: [
    'demos/wren-hollow/meadow',
    'demos/wren-hollow/ceremony',
    'demos/wren-hollow/reception',
    'demos/wren-hollow/tables',
    'demos/wren-hollow/suite',
    'demos/wren-hollow/aspens',
    'demos/wren-hollow/winter',
    'demos/wren-hollow/flowers',
  ],

  stats: [
    { value: '1912', label: 'Barn raised', icon: 'pin' },
    { value: '40', label: 'Acres', icon: 'leaf' },
    { value: '140', label: 'Seated, at most', icon: 'plate' },
    { value: '1', label: 'Wedding a weekend', icon: 'star' },
  ],

  testimonials: [
    {
      quote: 'Nobody was waiting for us to be finished. That is the whole thing.',
      name: 'Nadia and Sam',
      detail: 'September',
    },
    {
      quote: 'It snowed the morning of and it turned out to be the best thing that happened all year.',
      name: 'The Ortegas',
      detail: 'February',
    },
    {
      quote: 'We brought our own cook, our own wine and a dog. Nobody blinked at any of it.',
      name: 'Beth and Marnie',
      detail: 'July',
    },
  ],

  faq: [
    {
      q: 'How far ahead do people book?',
      a: 'Twelve to eighteen months for a Saturday between May and October. Winter dates often go with three months’ notice, and weekdays are usually open.',
    },
    {
      q: 'What happens if it rains?',
      a: 'The barn seats a hundred and forty with the ceremony end cleared, so the wet plan is the same building, thirty feet further in. We make the call together at noon.',
    },
    {
      q: 'Can we hold a date?',
      a: 'Seven days, no deposit, no pressure. After that it goes back on the calendar and we will tell you if somebody else asks for it first.',
    },
    {
      q: 'Is there a curfew?',
      a: 'Music off at eleven, because the neighbors are a quarter mile away and we would like to stay on good terms with them. People usually end up around the fire until one.',
    },
    {
      q: 'Do we have to use your caterer?',
      a: 'There is no caterer to use. Bring whoever you want, or cook it yourselves. We will show them the kitchen the week before.',
    },
  ],

  map: { lat: 39.2361, lng: -104.8897 },

  /* Copy the venue template used to carry itself. `image` in each season
     indexes into `gallery` above. The sideways track shows gallery 0 to 4
     and the three features show 1 to 3, so the seasons point past both at
     pictures of their own, except summer, which is the meadow. */
  venue: {
    navSpaces: 'Barn',
    statementLabel: 'Why one at a time',
    spacesTitle: 'Four rooms and a meadow.',
    spaceLabels: [
      'The meadow',
      'The ceremony lawn',
      'The barn, set for dinner',
      'The long tables',
      'The loft',
    ],
    seasons: [
      { id: 'spring', label: 'Spring', image: 7, note: 'Green through to mid June. Cool mornings, long light.' },
      { id: 'summer', label: 'Summer', image: 0, note: 'Wildflowers from July. The meadow is at its best.' },
      { id: 'fall', label: 'Fall', image: 5, note: 'Aspens turn the last week of September, most years.' },
      { id: 'winter', label: 'Winter', image: 6, note: 'Heated barn, snow outside, and the whole place to yourselves.' },
    ],
    packagesSub: 'Every one includes the barn, the meadow, tables, chairs and someone here all day.',
    holdPolicy: 'We hold a date for seven days with no deposit while you think about it.',
    tours: 'Tours Saturdays, 10am to 2pm',
  },
};

export default wrenHollow;
