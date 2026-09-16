import type { DemoConfig } from '../types';

/**
 * Fictional. Shows off the `trades` template: service areas, trust badges, a
 * quote form instead of a booking button, and a before/after gallery.
 */
const summitRidge: DemoConfig = {
  slug: 'summit-ridge-services',
  createdAt: '2026-09-15',
  template: 'trades',
  showcase: true,
  tier: 'site',

  pages: [
    { slug: 'services', label: 'Services', kind: 'services' },
    {
      slug: 'areas',
      label: 'Service area',
      kind: 'areas',
      title: 'Where we work',
      intro: 'Elbert and Douglas County, and the towns in between.',
    },
    {
      slug: 'work',
      label: 'Recent work',
      kind: 'gallery',
      title: 'Recent jobs',
      intro: 'Real roofs in this county, photographed the day we finished.',
    },
    {
      slug: 'quote',
      label: 'Free quote',
      kind: 'contact',
      title: 'Get a free quote',
      intro: 'Tell us what is going on and we will get you on the schedule for a free inspection.',
    },
  ],

  business: {
    name: 'Summit Ridge Services',
    tagline: 'Roofing, gutters and siding across Elbert and Douglas County.',
    city: 'Elizabeth',
    state: 'CO',
    phone: '(303) 555-0117',
    email: 'quotes@summitridgeservices.example',
  },

  brand: {
    primary: '#1D4E89',
    secondary: '#10233A',
    accent: '#F08A24',
    font: 'industrial',
  },

  hero: {
    headline: 'Hail damage? We handle the insurance call too.',
    sub: 'Free inspection, photos of everything we find, and a written estimate the same week, not a number scribbled on a business card.',
    image: 'demos/summit-ridge-services/hero',
    ctaLabel: 'Get a Free Quote',
    ctaHref: '#quote',
  },

  badges: [
    'Licensed & insured',
    'Owens Corning preferred',
    '10-year workmanship warranty',
    'Insurance claims handled',
  ],

  services: [
    {
      title: 'Roof replacement',
      icon: 'roof',
      body: 'Full tear-off and replacement, asphalt or metal. We pull the permit, we haul the debris, we run a magnet over your yard twice before we leave.',
      price: 'Free estimate',
    },
    {
      title: 'Storm & hail repair',
      icon: 'storm',
      body: 'We document the damage properly so the adjuster cannot wave it off, and we meet them at your house when they come out.',
      price: 'Free inspection',
    },
    {
      title: 'Gutters & downspouts',
      icon: 'gutter',
      body: 'Seamless aluminum run on site in your color, plus guards if the pines are winning.',
      price: 'Call for pricing',
    },
    {
      title: 'Siding & trim',
      icon: 'hammer',
      body: 'Fiber cement and engineered wood. Usually the same claim as the roof, and worth checking before you sign anything.',
      price: 'Call for pricing',
    },
    {
      title: 'Emergency tarping',
      icon: 'shield',
      body: 'Something opened up overnight. Call and we will get it covered before the next storm, then deal with the rest in daylight.',
      price: '24/7',
    },
  ],

  stats: [
    { value: '10 yr', label: 'Workmanship warranty', icon: 'shield' },
    { value: '1 day', label: 'Most roofs finished', icon: 'clock' },
    { value: 'Free', label: 'Inspection and estimate', icon: 'roof' },
    { value: '8', label: 'Towns we cover', icon: 'route' },
  ],

  testimonials: [
    {
      quote: 'The adjuster tried to call it wear and tear. Summit Ridge had photographs of every bruised shingle and the claim went through the same week.',
      name: 'Rachel D.',
      detail: 'Elizabeth',
    },
    {
      quote: 'Tore off and finished in a day, then ran a magnet over the yard twice. I have two kids and a dog, so that mattered more than the price.',
      name: 'Tom W.',
      detail: 'Franktown',
    },
    {
      quote: 'Storm chasers were knocking on doors the morning after. These are the ones still answering the phone two years later.',
      name: 'Greg H.',
      detail: 'Kiowa',
    },
  ],

  serviceAreas: [
    'Elizabeth',
    'Kiowa',
    'Parker',
    'Franktown',
    'Castle Rock',
    'Elbert',
    'Ponderosa Park',
    'Larkspur',
  ],

  hours: [
    { day: 'Monday', open: '7am to 5pm' },
    { day: 'Tuesday', open: '7am to 5pm' },
    { day: 'Wednesday', open: '7am to 5pm' },
    { day: 'Thursday', open: '7am to 5pm' },
    { day: 'Friday', open: '7am to 4pm' },
    { day: 'Saturday', open: 'By appointment' },
    { day: 'Sunday', open: 'Emergency calls only' },
  ],

  gallery: [
    'demos/summit-ridge-services/roof-after',
    'demos/summit-ridge-services/hail-damage',
    'demos/summit-ridge-services/crew',
    'demos/summit-ridge-services/gutters',
    'demos/summit-ridge-services/siding',
    'demos/summit-ridge-services/truck',
  ],

  about: {
    heading: 'Local crew, not a storm-chasing outfit.',
    body: 'After a big hail event, out-of-state trucks show up in Elbert County within about a day, sign whatever they can, subcontract the work and are gone by spring, and so is the warranty. We live here. Our trucks are parked on 86 in February same as July, and if something we installed leaks in four years you will reach the same person who sold it to you.',
    image: 'demos/summit-ridge-services/about',
  },

  faq: [
    {
      q: 'Do you charge for the inspection?',
      a: 'No. We will climb it, photograph it and tell you honestly whether you have a claim, including when you do not.',
    },
    {
      q: 'Will you deal with my insurance company?',
      a: 'Yes. We document the damage in the format adjusters expect and we are there when they inspect. You still own the claim; we just make it much harder to deny.',
    },
    {
      q: 'How long does a roof take?',
      a: 'Most houses in this area are a single day, two if the weather turns or there is decking to replace.',
    },
    {
      q: 'What does the warranty cover?',
      a: 'Ten years on our workmanship, plus whatever the manufacturer covers on the material, usually thirty years or better on architectural shingle.',
    },
  ],

  map: { lat: 39.3603, lng: -104.5997 },
};

export default summitRidge;
