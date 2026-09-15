import type { DemoConfig } from '../types';

/**
 * Fictional. Shows off the `professional` template: a new-patient offer, an
 * insurance list, team bios and an FAQ that answers what people actually
 * hesitate over before booking.
 */
const franktownDental: DemoConfig = {
  slug: 'franktown-family-dental',
  createdAt: '2026-09-15',
  template: 'professional',
  showcase: true,

  business: {
    name: 'Franktown Family Dental',
    tagline: 'Accepting new patients, with evening and Saturday appointments.',
    city: 'Franktown',
    state: 'CO',
    address: '1140 North State Highway 83',
    phone: '(303) 555-0164',
    email: 'appointments@franktownfamilydental.example',
  },

  brand: {
    primary: '#0E7C86',
    secondary: '#0B3A40',
    accent: '#5FB88C',
    font: 'sans',
  },

  hero: {
    headline: 'New patient exam, x-rays and cleaning for $89.',
    sub: 'One visit, no insurance required, no pressure to schedule anything else. Most new patients are in and out in under an hour.',
    image: 'demos/franktown-family-dental/hero',
    ctaLabel: 'Request an Appointment',
    ctaHref: '#appointment',
  },

  badges: [
    'Accepting new patients',
    'Same-day emergencies',
    'Most PPO plans accepted',
    'CareCredit financing',
  ],

  services: [
    {
      title: 'Cleanings & exams',
      body: 'Twice-yearly hygiene, digital x-rays and an oral cancer screening at every visit.',
    },
    {
      title: 'Fillings & crowns',
      body: 'Tooth-colored composite, and same-day crowns milled in our office so you are not wearing a temporary for three weeks.',
    },
    {
      title: 'Emergency care',
      body: 'Cracked tooth, lost crown, abscess. Call before noon and we will see you the same day.',
    },
    {
      title: 'Kids & teens',
      body: 'First visits from age one, sealants, and a hygienist who is genuinely good with nervous children.',
    },
    {
      title: 'Clear aligners',
      body: 'Scanned in-office, no impressions. Free consultation to see whether you are a candidate.',
      price: 'Free consultation',
    },
    {
      title: 'Implants & bridges',
      body: 'Planned and placed here, start to finish, with financing available over twelve or twenty-four months.',
      price: 'Call for pricing',
    },
  ],

  insurance: [
    'Delta Dental',
    'Cigna',
    'Aetna',
    'MetLife',
    'Guardian',
    'United Concordia',
    'Ameritas',
    'Principal',
  ],

  team: [
    {
      name: 'Dr. Alison Park, DDS',
      role: 'General dentist · Owner',
      image: 'demos/franktown-family-dental/dr-park',
      bio: 'University of Colorado School of Dental Medicine. Practising in Douglas County since 2012, and the person you will actually see at your appointment.',
    },
    {
      name: 'Dr. Ben Whitaker, DMD',
      role: 'General dentist',
      image: 'demos/franktown-family-dental/dr-whitaker',
      bio: 'Restorative and implant dentistry. Takes most of the same-day emergency visits.',
    },
    {
      name: 'Maria Delgado, RDH',
      role: 'Lead hygienist',
      image: 'demos/franktown-family-dental/maria',
      bio: 'Eighteen years cleaning teeth and a specialty in patients who have been avoiding the chair for a while.',
    },
  ],

  hours: [
    { day: 'Monday', open: '8am to 5pm' },
    { day: 'Tuesday', open: '8am to 7pm' },
    { day: 'Wednesday', open: '8am to 5pm' },
    { day: 'Thursday', open: '8am to 7pm' },
    { day: 'Friday', open: '8am to 2pm' },
    { day: 'Saturday', open: '9am to 2pm' },
    { day: 'Sunday', open: 'Closed' },
  ],

  gallery: [
    'demos/franktown-family-dental/reception',
    'demos/franktown-family-dental/operatory',
    'demos/franktown-family-dental/scanner',
    'demos/franktown-family-dental/team',
    'demos/franktown-family-dental/kids-room',
    'demos/franktown-family-dental/exterior',
  ],

  about: {
    heading: 'A dental office that runs on schedule.',
    body: 'We kept the practice to two dentists so nobody gets handed off to whoever is free. You will see the same dentist and the same hygienist every visit, appointments start when they are supposed to, and we will tell you plainly which work needs doing now and which can reasonably wait a year. Nobody here is paid to sell you a treatment plan.',
    image: 'demos/franktown-family-dental/about',
  },

  faq: [
    {
      q: 'I do not have insurance. What will this cost?',
      a: 'The new patient exam, x-rays and cleaning is $89. For anything beyond that we give you a written estimate before we begin, and we offer an in-house membership plan that covers preventive care for a flat annual fee.',
    },
    {
      q: 'How soon can I get in?',
      a: 'New patient appointments are usually available within a week. Dental emergencies we see the same day, so call in the morning if you can.',
    },
    {
      q: 'It has been years since I have been to a dentist.',
      a: 'That is most of the people who call us. There is no lecture. We take a look, tell you where things stand, and work out a plan you can actually afford.',
    },
    {
      q: 'Do you see children?',
      a: 'Yes, from their first birthday on. Whole families in one visit is the easiest way to do it, and we will block the appointments back to back.',
    },
  ],

  map: { lat: 39.3897, lng: -104.7472 },
};

export default franktownDental;
