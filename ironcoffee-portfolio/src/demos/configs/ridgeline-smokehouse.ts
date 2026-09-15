import type { DemoConfig } from '../types';

/**
 * Fictional. Shows off the `food` template: menu sections with prices, an
 * ordering CTA, hours, gallery.
 *
 * The name is invented on purpose. Nothing in the public gallery should be
 * mistakable for a business he can claim as a client.
 */
const ridgelineSmokehouse: DemoConfig = {
  slug: 'ridgeline-smokehouse',
  createdAt: '2026-09-15',
  template: 'food',
  showcase: true,

  business: {
    name: 'Ridgeline Smokehouse',
    tagline: 'Slow-smoked brisket and ribs, twelve hours a day, every day.',
    city: 'Elizabeth',
    state: 'CO',
    address: '418 Main Street',
    phone: '(303) 555-0142',
    email: 'hello@ridgelinesmokehouse.example',
  },

  brand: {
    primary: '#B3451E',
    secondary: '#241C17',
    accent: '#E0A32E',
    font: 'slab',
  },

  hero: {
    headline: 'Brisket worth the drive.',
    sub: 'Oak-smoked overnight, sliced to order, sold until it runs out, which on Saturdays is usually by two.',
    image: 'demos/ridgeline-smokehouse/hero',
    ctaLabel: 'Order Pickup',
    ctaHref: '#menu',
  },

  services: [
    {
      title: 'Pickup orders',
      body: 'Order by phone or online and we will have it boxed, wrapped and hot on the counter at your pickup time.',
    },
    {
      title: 'Catering by the pound',
      body: 'Brisket, pulled pork, ribs and sides for crews, weddings and graduation parties. Two days notice is plenty.',
      price: 'From $18/lb',
    },
    {
      title: 'Whole smoked birds',
      body: 'Order a bird for the holidays and pick it up the morning of. We sell out in November, so call early.',
      price: '$62 each',
    },
  ],

  menu: [
    {
      section: 'By the pound',
      items: [
        {
          name: 'Beef brisket',
          desc: 'Oak-smoked twelve hours. Ask for lean or moist.',
          price: '$26',
        },
        {
          name: 'Pulled pork',
          desc: 'Shoulder, hand-pulled, lightly sauced.',
          price: '$19',
        },
        {
          name: 'St. Louis ribs',
          desc: 'Full rack, dry-rubbed, no sauce until you ask.',
          price: '$29',
        },
        {
          name: 'Smoked turkey breast',
          desc: 'Brined overnight, sliced thin.',
          price: '$21',
        },
        { name: 'Jalapeño cheddar sausage', desc: 'Made in house.', price: '$16' },
      ],
    },
    {
      section: 'Plates',
      items: [
        {
          name: 'One meat plate',
          desc: 'Your pick, two sides, white bread and pickles.',
          price: '$17',
        },
        { name: 'Two meat plate', desc: 'Two picks, two sides.', price: '$23' },
        {
          name: 'The Ridgeline',
          desc: 'Brisket, ribs, sausage, three sides. Feeds two if you are polite about it.',
          price: '$38',
        },
      ],
    },
    {
      section: 'Sides',
      items: [
        { name: 'Green chili mac', price: '$6' },
        { name: 'Vinegar slaw', price: '$4' },
        { name: 'Pit beans', desc: 'Cooked under the brisket.', price: '$5' },
        { name: 'Cornbread', desc: 'Honey butter.', price: '$4' },
      ],
    },
  ],

  hours: [
    { day: 'Monday', open: 'Closed' },
    { day: 'Tuesday', open: '11am to 7pm' },
    { day: 'Wednesday', open: '11am to 7pm' },
    { day: 'Thursday', open: '11am to 7pm' },
    { day: 'Friday', open: '11am to 8pm' },
    { day: 'Saturday', open: '11am to 8pm' },
    { day: 'Sunday', open: '11am to 4pm' },
  ],

  gallery: [
    'demos/ridgeline-smokehouse/brisket',
    'demos/ridgeline-smokehouse/pit',
    'demos/ridgeline-smokehouse/plate',
    'demos/ridgeline-smokehouse/counter',
    'demos/ridgeline-smokehouse/ribs',
    'demos/ridgeline-smokehouse/patio',
  ],

  about: {
    heading: 'Two brothers and a five-hundred gallon offset.',
    body: 'We started on a trailer at the Elizabeth farmers market in 2014 and moved into the Main Street building three years later. The pit has not gone cold since. Everything is smoked here, overnight, over Colorado oak. No gas assist, no holding cabinet, no second location. When it sells out we close, and we would rather do that than serve you something we would not eat.',
    image: 'demos/ridgeline-smokehouse/about',
  },

  faq: [
    {
      q: 'Do you take reservations?',
      a: 'No, it is counter service and first come. Call ahead for pickup and you will skip the line entirely.',
    },
    {
      q: 'What time do you sell out?',
      a: 'Weekdays we usually make it to close. Saturdays the brisket is often gone by two, so come early or call to check.',
    },
    {
      q: 'Can you do gluten free?',
      a: 'All the meat is gluten free. The rub has no flour. Skip the bread and the mac and you are set.',
    },
  ],

  map: { lat: 39.3608, lng: -104.5983 },
};

export default ridgelineSmokehouse;
