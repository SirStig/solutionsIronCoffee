import type { DemoConfig } from '../types';

/**
 * Family Lawn Care, Parker CO. NOT READY TO SEND. Confirm they still trade.
 *
 * ## Two corrections to what this file used to say
 *
 * **They do publish a phone number.** (303) 900-8340, labeled Mobile, on their
 * own Facebook About tab. This config previously said no number existed
 * anywhere and left `business.phone` out on that basis, which meant the page
 * printed "Call to confirm" seven times with nothing to call. The number is
 * invisible to search engines because it lives behind Facebook's login wall,
 * which is a better story to tell them than the one about not having a site.
 *
 * **They once had a real website and it lapsed.** Their Facebook About lists
 * https://familylawncareco.com/contact-us as their website. That domain is
 * **not registered**: Verisign returns "No match", RDAP returns 404, DNS
 * returns NXDOMAIN. Their listed email, info@familylawncareco.com, is on the
 * same dead domain and cannot receive mail. So every person who has clicked
 * through from their Facebook page, and everyone who has emailed that address,
 * has hit nothing. The domain is currently free to register, which is a small
 * favor worth leading with.
 *
 * lawncareparker.com is a GoDaddy parked lander behind privacy protection and
 * is not theirs, despite their Facebook handle being @lawncareparker.
 *
 * ## Confirm they are still operating before spending any more time
 *
 * This is the thinnest prospect in the folder by a distance. The only visible
 * Facebook post is dated 3 May 2020. Seventy four followers. "Not yet rated,
 * 0 reviews." No Google listing, no Yelp, no Nextdoor, no BBB, no Thumbtack,
 * no Angi, and no Colorado Secretary of State registration, which makes this
 * an unregistered family operation rather than a company. There is no evidence
 * they are gone and none that they are here.
 *
 * ## Verified 2026-09-16
 *
 * Their own words, self-published, truncated by Facebook exactly where it
 * stops: "We provide full service lawn care in Parker, Colorado. Truly a
 * family owned busines as my son and I". Father and son, both unnamed.
 *
 * Service area, self-published: Bradbury Ranch, Clarke Farms, Stonegate and
 * Parker. Three named subdivisions is more specific than most competitors
 * publish and it is the best thing on their page.
 *
 * The only concrete services anywhere are in a single post from May 2020:
 * "If you think cre aeration is the only thing you can do for you lawn this
 * spring, think again. Dethatching/power-raking with overseeding is even
 * better!!!!" That gives core aeration, dethatching and overseeding. Mowing is
 * not separately evidenced, but "full service lawn care" is their own phrase
 * and a lawn care outfit that does not mow does not exist, so it stays.
 *
 * ## Still to confirm
 *
 *   - **Are they trading in 2026.** Blocking.
 *   - **Both names**, and which of them runs it.
 *   - **Whether they know familylawncareco.com is gone.**
 *   - **Hours, and whether they want any printed.** None are published
 *     anywhere, and for a two-man mobile crew the honest answer may be that
 *     hours are the wrong question and the phone is the only one that matters.
 *   - **Prices**, or confirmation that "Free quote" is what they want shown.
 *   - **Brand colors.** The green and gold below is a guess.
 *
 * There is not one public customer review of this business anywhere. That is
 * worth saying out loud to them, gently: it is the single cheapest thing they
 * could fix and it would do more than a website will.
 */
const familyLawnCare: DemoConfig = {
  slug: 'family-lawn-care',
  createdAt: '2026-09-15',
  template: 'trades',
  // Blocking: confirm they are still operating.
  draft: true,

  business: {
    name: 'Family Lawn Care',
    tagline: 'A father and son, and the same two people every week.',
    city: 'Parker',
    state: 'CO',
    // Self-published on their Facebook About tab. Confirm it still rings.
    phone: '(303) 900-8340',
    facebookUrl: 'https://www.facebook.com/lawncareparker/',
    // Deliberately no email. Theirs is on a domain that no longer exists, and
    // printing a dead address is worse than printing none.
  },

  // Outfit: geometric and calm, which keeps a two-man crew looking organized
  // rather than looking like a flyer. The colors are a guess.
  brand: {
    primary: '#2F6B34',
    secondary: '#16301A',
    accent: '#D8A024',
    font: 'modern',
    motif: 'blades',
  },

  hero: {
    headline: 'The people who quote your yard are the people who cut it.',
    sub: 'Full service lawn care in Parker. A father and son, no crews, no subcontractors, no different truck every week.',
    image: 'art:lawn-stripes',
    ctaLabel: 'Get a Quote',
    ctaHref: '#quote',
  },

  /*
   * Aeration, dethatching and overseeding come from their own 2020 post and
   * are the only services with public evidence behind them. Mowing is their own
   * phrase "full service lawn care" taken at face value. Everything else that
   * used to be in this list has been cut: a service they do not offer is a
   * worse error on a preview than a short list.
   */
  services: [
    {
      title: 'Mowing through the season',
      icon: 'mower',
      body: 'Cut, trimmed, edged and blown off. The same two people each visit, so nobody has to be told where the gate is.',
      price: 'Free quote',
    },
    {
      title: 'Core aeration',
      icon: 'route',
      body: 'Spring and fall. Front Range clay packs down hard, and pulling cores is the only thing that genuinely undoes it.',
      price: 'Free quote',
    },
    {
      title: 'Dethatching and power raking',
      icon: 'basket',
      body: 'Lifts the dead mat out from under the grass so water and seed reach soil instead of sitting on top of it.',
      price: 'Free quote',
    },
    {
      title: 'Overseeding',
      icon: 'leaf',
      body: 'Straight after aerating or raking, while the holes are open. Done in the wrong order it is seed on a lawn.',
      price: 'Free quote',
    },
  ],

  // Self-published on their Facebook About tab, and better than most
  // competitors manage: three named subdivisions rather than "Denver metro".
  serviceAreas: ['Bradbury Ranch', 'Clarke Farms', 'Stonegate', 'Parker'],

  /*
   * No hours are published anywhere, and a mobile crew does not really have
   * any. Rather than print seven invented rows, every day points at the one
   * thing that does work, which is the phone.
   */
  hours: [
    { day: 'Monday', open: 'Call or message' },
    { day: 'Tuesday', open: 'Call or message' },
    { day: 'Wednesday', open: 'Call or message' },
    { day: 'Thursday', open: 'Call or message' },
    { day: 'Friday', open: 'Call or message' },
    { day: 'Saturday', open: 'Call or message' },
    { day: 'Sunday', open: 'Closed' },
  ],

  gallery: [
    'art:lawn-mower',
    'art:lawn-edge',
    'art:lawn-hedge',
    'art:lawn-leaves',
  ],

  about: {
    heading: 'Two people, and both of them turn up.',
    body: 'Family Lawn Care is a father and son working in Parker. In their own words, truly a family owned business. There is no office, no crew rotation and nobody selling you an upgrade over the phone: the person who walks your yard and quotes the work is the person standing behind the mower on Tuesday.',
    image: 'art:lawn-sprinkler',
  },

  faq: [
    {
      q: 'Which areas do you cover?',
      a: 'Bradbury Ranch, Clarke Farms, Stonegate and the rest of Parker. If you are just outside that, ask anyway.',
    },
    {
      q: 'When should a lawn be aerated?',
      a: 'Spring or fall. Overseeding straight afterwards, while the holes are still open, is what makes the difference; seed scattered on an unopened lawn mostly feeds birds.',
    },
    {
      q: 'Do I need to be home?',
      a: 'No, as long as the gate is unlocked and the dog is in.',
    },
  ],
};

export default familyLawnCare;
