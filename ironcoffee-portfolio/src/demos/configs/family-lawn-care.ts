import type { DemoConfig } from '../types';

/**
 * Family Lawn Care, Parker CO. Live. Confirm they still trade before following up.
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
 *   - **Prices**. None are published, so every row says "Call for pricing".
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

  /*
   * Live, but the quietest prospect in the folder by a distance.
   *
   * The only visible Facebook post is from May 2020, there are seventy four
   * followers and no reviews anywhere, and there is no state registration.
   * None of that is evidence they have stopped; there is simply almost no
   * evidence of anything.
   *
   * The opening line writes itself and does not depend on any of that:
   * familylawncareco.com, the website their own Facebook page links to, is
   * unregistered, and info@ on that domain has been bouncing ever since.
   */

  business: {
    name: 'Family Lawn Care',
    tagline: 'A father and son doing full service lawn care in Parker.',
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
    sub: 'Full service lawn care in Parker, run by a father and son.',
    image: 'demos/family-lawn-care/hero',
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
      body: 'Cut, trimmed, edged and blown off, as part of full service lawn care.',
    },
    {
      title: 'Core aeration',
      icon: 'route',
      body: 'Spring and fall. Front Range clay packs down hard, and pulling cores is the only thing that genuinely undoes it.',
    },
    {
      title: 'Dethatching and power raking',
      icon: 'basket',
      body: 'Lifts the dead mat out from under the grass so water and seed reach soil instead of sitting on top of it.',
    },
    {
      title: 'Overseeding',
      icon: 'leaf',
      body: 'Right after aerating or raking, while the holes are open. Done in the wrong order it is seed on a lawn.',
    },
  ],

  // No prices are public, so the cards carry none and the intro says it once
  // rather than printing "Call for pricing" four times down the page.
  copy: {
    servicesIntro: 'Call for a price on any of them.',
  },

  // Self-published on their Facebook About tab, and better than most
  // competitors manage: three named subdivisions rather than "Denver metro".
  serviceAreas: ['Bradbury Ranch', 'Clarke Farms', 'Stonegate', 'Parker'],

  /*
   * No hours are published anywhere, and a mobile crew does not really have
   * any. Rather than print seven invented rows, or claim a day off nobody has
   * confirmed, every day points at the one thing that does work: the phone.
   */
  hours: [
    { day: 'Monday', open: 'Call or message' },
    { day: 'Tuesday', open: 'Call or message' },
    { day: 'Wednesday', open: 'Call or message' },
    { day: 'Thursday', open: 'Call or message' },
    { day: 'Friday', open: 'Call or message' },
    { day: 'Saturday', open: 'Call or message' },
    { day: 'Sunday', open: 'Call or message' },
  ],

  gallery: [
    'demos/family-lawn-care/mower',
    'demos/family-lawn-care/edging',
    'demos/family-lawn-care/lawn',
    'demos/family-lawn-care/cleanup',
  ],

  about: {
    heading: 'Two people, and both of them show up.',
    body: 'Family Lawn Care is a father and son working in Parker. In their own words, truly a family owned business, and the person who walks your yard and quotes the work is the person standing behind the mower.',
    // Drawn, where the photographs are not. A picture of the trade can
    // stand beside the story; it cannot be the story, and one illustration
    // per page is what stops five previews looking like five stock sets.
    image: 'art:lawn-sprinkler',
  },

  /*
   * No testimonials, and nothing to quote.
   *
   * Seventy four Facebook followers, one visible post from 2020 and no
   * reviews anywhere: not evidence they have stopped, just almost no evidence
   * of anything. Unlike some of the other previews there is not even
   * unattributed text to come back to, so this page argues from what they
   * say about themselves and from the work, which is the honest way around for
   * a business with no public record.
   */

  pages: [
    {
      slug: 'services',
      label: 'Services',
      kind: 'services',
      intro: 'Four things, done by a father and son. Call for a price on any of them.',
    },
    {
      slug: 'areas',
      label: 'Where we work',
      kind: 'areas',
      intro: 'Bradbury Ranch, Clarke Farms, Stonegate and the rest of Parker.',
    },
    {
      slug: 'visit',
      label: 'Get a quote',
      kind: 'contact',
      title: 'Get a quote',
      intro: 'The person who walks your yard and quotes the work is the person standing behind the mower.',
    },
  ],

  faq: [
    {
      q: 'Which areas do you cover?',
      a: 'Bradbury Ranch, Clarke Farms, Stonegate and the rest of Parker. If you are just outside that, ask anyway.',
    },
    {
      q: 'When should a lawn be aerated?',
      a: 'Spring or fall. Overseeding right afterward, while the holes are still open, is what makes the difference; seed scattered on an unopened lawn mostly feeds birds.',
    },
  ],

  /*
   * The photography is the trade, not this shop, and the page says so.
   *
   * <DemoShell> prints a line admitting it, which is the point: an owner spots
   * a picture of somebody else's place instantly, and having already said it
   * turns the one weak spot in a cold preview into evidence that you are
   * straight with people. None of these are exteriors, storefronts or signage,
   * because a generic interior reads as a layout while a building reads as a
   * claim about their premises.
   *
   * Clear this flag the day they hand over their own pictures.
   */
  placeholderPhotos: true,

};

export default familyLawnCare;
