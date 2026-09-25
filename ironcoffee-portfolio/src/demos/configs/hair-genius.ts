import type { DemoConfig } from '../types';

/**
 * Hair Genius Barbershop, Parker CO.
 *
 * ## The ownership question is answered: same family, still theirs
 *
 * Desk research raised a real scare, and it is worth keeping written down
 * because every signal pointed the same wrong way. A new entity, Hair Genius 1
 * LLC, filed September 2024 while the 2017 one went delinquent. A fresh trade
 * name filing in February 2025. The shop's Booksy profile resolving to a Hair
 * Genius in Orlando. Both barbers named in the reviews trading under their own
 * names. No review anywhere dated 2026. Read together that is a business that
 * changed hands.
 *
 * **It did not. It is family run and operated, confirmed by Joshua on
 * 2026-09-16.** An LLC refiling is paperwork, and paperwork is not a story.
 *
 * ## The Booksy link is gone, and that is the thing to tell them
 *
 * This config used to open with a "Book Online" button pointing at Booksy
 * business 401161. **That link sends a customer in Parker to a barbershop in
 * Orlando, Florida.** It was the single most prominent element on the page,
 * and it is still live on every directory that lists them.
 *
 * There is a second one just as checkable. **Their own Facebook page lists
 * their website as Wefixcheaphaircuts.com. That domain lapsed, was
 * re-registered by a domain flipper in October 2024, and today serves a page
 * offering it for sale at $395.** Everyone who has clicked "Website" on their
 * Facebook since then has landed on somebody selling their old address back to
 * them.
 *
 * Two broken links out in the world, both demonstrable in ten seconds in front
 * of them, neither of which is their fault. That is the conversation.
 *
 * (There is also hair-genius.wsite.top, live and with no title tag at all. Do
 * not lead with it. It is an auto-generated scrape of their Yelp page, right
 * down to a baked in "YELP (28)" badge, and it is almost certainly not theirs.
 * Opening with "your website is bad" about a page they never made would lose
 * the meeting in one line.)
 *
 * ## Verified
 *
 * Address 11211 Dransfeldt Rd Ste 128, self-published and matching the SOS
 * principal office. Phone (303) 805-5348, self-published and consistent
 * everywhere with no conflict. Facebook page, 507 followers. Family owned and
 * operated. No real website. The SOS mailing address on Pony Express Dr is a
 * mailbox; do not print it.
 *
 * ## Still to confirm
 *
 *   - **The hours.** Sources split cleanly in two. Three Google-derived
 *     listings say open seven days with Sunday 9 to 5 and late Wednesday and
 *     Thursday; the wsite.top page and Fresha say closed Sunday and a flat 10
 *     to 6. The shop publishes none itself. Below is the Google version,
 *     because that is what a customer searching today acts on, but it is a
 *     coin toss and it is the first question worth asking.
 *   - **Prices.** The shop publishes none. One barber's own Booksy menu runs
 *     $34.99 to $74.99, but that is his chair rate and not the shop's.
 *   - **Brand colors.** The charcoal and rust below is a guess.
 */
const hairGenius: DemoConfig = {
  slug: 'hair-genius',
  createdAt: '2026-09-15',
  template: 'booking',

  business: {
    name: 'Hair Genius Barbershop',
    tagline: 'A family barbershop in Parker, off Dransfeldt Road.',
    city: 'Parker',
    state: 'CO',
    address: '11211 Dransfeldt Rd #128',
    phone: '(303) 805-5348',
    facebookUrl: 'https://www.facebook.com/hairgeniusparkercolorado/',
  },

  // Bricolage Grotesque, which is the face in the set that was drawn by hand.
  // Correct for a barbershop and deliberately nothing like the country salon
  // in Kiowa, which is the same trade and wants the opposite page.
  brand: {
    // Charcoal rather than the near-black this was, because primary and
    // secondary sitting two steps apart left the illustrations with no mid
    // tone and everything in them came out the same gray.
    primary: '#2B2B31',
    secondary: '#0E0E10',
    accent: '#C0462F',
    font: 'craft',
    motif: 'shears',
  },

  hero: {
    // No "book online" and no "open seven days". One is broken and the other
    // is disputed by half the listings that mention it.
    headline: 'A clean skin fade, in a suite off Dransfeldt Road.',
    sub: 'Walk in if there is a chair free. Call first if you would rather not find out the hard way.',
    image: 'demos/hair-genius/hero',
    ctaLabel: 'Call the Shop',
    ctaHref: 'tel:+13038055348',
  },

  /*
   * Same template as Barr Bear, and it must not look it.
   *
   * Barr Bear opens on a photograph with the hours card over it and centers
   * every heading, which suits one chair in a country town. This is a busier
   * suburban shop, so it gets the other arrangement: the charcoal split hero,
   * the week in a bar underneath, left-aligned heads, the work straight after
   * the services, the reviews before the story, and the visit on dark.
   */
  layout: {
    hero: 'split',
    align: 'left',
    gallery: 'contained',
    order: ['services', 'gallery', 'quote', 'reviews', 'about', 'visit', 'faq'],
    darkVisit: true,
    services: 'cards',
  },

  copy: {
    headings: {
      services: { eyebrow: 'In the chair', title: 'Cuts, fades and beards' },
      gallery: { eyebrow: 'The work', title: 'Clean lines, up close' },
      reviews: { eyebrow: 'Word of mouth', title: 'What customers say' },
      visit: { eyebrow: 'Find the shop', title: 'Suite 128, off Dransfeldt' },
      faq: { title: 'Before you come in' },
    },
  },

  /*
   * No prices, and no price field either.
   *
   * The shop publishes none and the only public numbers belong to one barber's
   * own book, so there is nothing here that could be printed. What changed is
   * how that absence is expressed. Every row used to carry `price: 'Call for
   * pricing'`, which rendered as the same four words repeated down the right
   * hand edge of the widest, emptiest part of the page: a column whose entire
   * content was one sentence, four times. Leaving the field out puts the
   * template into its numbered variant instead, and the question the column
   * was answering is answered once, in the FAQ, where a question belongs.
   */
  services: [
    {
      title: 'Haircut',
      icon: 'scissors',
      body: 'Scissor or clipper, finished the way you asked for it rather than the way it was quickest.',
    },
    {
      title: 'Skin fade',
      icon: 'razor',
      body: 'Low, mid, high or bald, blended properly rather than stepped.',
    },
    {
      title: 'Beard trim and line up',
      icon: 'comb',
      body: 'Shaped to the jaw, with the edges cleaned up.',
    },
    {
      title: 'Kids and teens',
      icon: 'child',
      body: 'Say who the cut is for when you call.',
    },
  ],

  /*
   * Short and true, and every one of them is a restatement of something
   * already on the page rather than a new claim.
   */
  marquee: [
    'Family owned and operated',
    'Walk in if there is a chair',
    'Skin fades',
    'Beard trims and line ups',
    'Kids and teens',
    'Suite 128, off Dransfeldt',
  ],

  // The Google version. See the header: the other half of the sources say
  // closed Sunday and a flat 10 to 6, and the shop settles it in one call.
  hours: [
    { day: 'Monday', open: '10am to 6pm' },
    { day: 'Tuesday', open: '10am to 6pm' },
    { day: 'Wednesday', open: '10am to 7pm' },
    { day: 'Thursday', open: '10am to 7pm' },
    { day: 'Friday', open: '10am to 6pm' },
    { day: 'Saturday', open: '10am to 6pm' },
    { day: 'Sunday', open: '9am to 5pm' },
  ],

  gallery: [
    'demos/hair-genius/chair',
    'demos/hair-genius/fade',
    'demos/hair-genius/tools',
    'demos/hair-genius/detail',
  ],

  about: {
    heading: 'Family run, in Suite 128.',
    body: 'Hair Genius is a barbershop, family owned and operated, in a suite set back off Dransfeldt Road. It takes a minute to find the first time, so give yourself a few extra minutes on your first visit. Walk in when there is a chair, call ahead when there is not.',
    // Drawn, where the photographs are not. A picture of the trade can
    // stand beside the story; it cannot be the story, and one illustration
    // per page is what stops five previews looking like five stock sets.
    image: 'art:barber-pole',
  },

  /*
   * Real reviews, copied word for word, and the page says so.
   *
   * The rule against testimonials on a preview exists to stop invented ones.
   * These are not invented: they are already in public, under these names, on
   * Google, and anybody can go and read them. Repeating a claim a customer
   * already made is a different act from making one up, and `source` is what
   * carries that difference onto the page.
   *
   * Captured 2026-09-16 from the Birdeye mirror of their Google reviews, which
   * showed all four as "a year ago". No date is printed, because "a year ago"
   * relative to a crawl of unknown age is not a date, and a wrong one on a
   * page with somebody's business name at the top is worse than none.
   *
   * The shortest quote is the one the band sets at display size, which is why
   * the fourth is not here. Owen Lindbloom's "Best barber shop I've ever been
   * too" is shorter than Samson's and would have taken the slot, and it
   * carries a typo that at billboard size reads as ours rather than his.
   */
  testimonials: [
    {
      // Verbatim but for the capital I, which he did not use. It leads the
      // band at display size and "i've" there reads as a mistake on our part.
      quote: "Best barbershop experience I've had, great family environment.",
      name: 'Samson Jones',
      source: 'Google',
    },
    {
      quote:
        'This place always gets me and my brother right! Everyone is so talented! Highly recommend!',
      name: 'Carter Wilson',
      source: 'Google',
    },
    {
      quote:
        'The haircuts were absolutely phenomenal and the service was amazing. The shop had multiple teenagers that were bonding and having fun, it was simply a joy to be around such a positive environment.',
      name: 'Cole Mortell',
      source: 'Google',
    },
  ],

  /*
   * Three pages rather than one.
   *
   * Every kind here renders from data already in this file, so this list is
   * the whole difference between the one page tier and the next one up. It is
   * also the part of the preview that is worth pointing at on the call: the
   * question "what would more than one page even hold" is easier to answer by
   * clicking than by describing.
   */
  pages: [
    {
      slug: 'services',
      label: 'Services',
      kind: 'services',
      intro: 'Prices are not published, so call the shop and they will tell you before you come in.',
    },
    {
      slug: 'about',
      label: 'The shop',
      kind: 'about',
      title: 'Family run, in Suite 128',
    },
    {
      slug: 'visit',
      label: 'Visit',
      kind: 'contact',
      title: 'Find the shop',
      intro: 'It is set back off Dransfeldt Road, so the directions link is worth using the first time.',
    },
  ],

  faq: [
    {
      q: 'Do you take walk-ins?',
      a: 'Yes, when there is a chair. A call first saves you standing around.',
    },
    {
      // The question the price column used to answer four times over.
      q: 'What does a cut cost?',
      a: 'Prices are not published online. Call the shop and they will tell you before you come in.',
    },
    {
      q: 'Where exactly are you?',
      a: 'Suite 128 at 11211 Dransfeldt Road. It is set back off the road, so use the directions link rather than the address alone.',
    },
    {
      q: 'Do you cut kids’ hair?',
      a: 'Teenagers, yes. For younger children, call and ask.',
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

export default hairGenius;
