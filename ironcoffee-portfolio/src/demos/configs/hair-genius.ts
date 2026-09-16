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
    headline: 'A proper skin fade, in a suite off Dransfeldt Road.',
    sub: 'Walk in if there is a chair free. Ring first if you would rather not find out the hard way.',
    image: 'art:barber-room',
    ctaLabel: 'Call the Shop',
    ctaHref: 'tel:+13038055348',
  },

  // No prices. The shop publishes none and the only public numbers belong to
  // one barber's own book.
  services: [
    {
      title: 'Haircut',
      icon: 'scissors',
      body: 'Scissor or clipper, finished the way you asked for it rather than the way it was quickest.',
      price: 'Call for pricing',
    },
    {
      title: 'Skin fade',
      icon: 'razor',
      body: 'Low, mid, high or bald, blended properly rather than stepped.',
      price: 'Call for pricing',
    },
    {
      title: 'Beard trim and line up',
      icon: 'comb',
      body: 'Shaped to the jaw, edges clean, hot towel if you want one.',
      price: 'Call for pricing',
    },
    {
      title: 'Kids',
      icon: 'child',
      body: 'First haircuts included, and nobody here is in a hurry about it.',
      price: 'Call for pricing',
    },
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
    'art:barber-chair',
    'art:barber-fade',
    'art:barber-tools',
    'art:barber-razor',
  ],

  about: {
    heading: 'Family run, in Suite 128.',
    body: 'Hair Genius is a family owned and operated barbershop in a suite set back off Dransfeldt Road. It takes a minute to find the first time, which is why the directions link is on this page and the address is not left to do the work on its own. Inside it is classic and modern in equal measure: walk in when there is a chair, ring ahead when there is not.',
    image: 'art:barber-pole',
  },

  faq: [
    {
      q: 'Do you take walk-ins?',
      a: 'Yes, when there is a chair. Afternoons are the busy stretch, so a call first saves you standing around.',
    },
    {
      q: 'Where exactly are you?',
      a: 'Suite 128 at 11211 Dransfeldt Road. It is set back off the road, so use the directions link rather than the address alone.',
    },
    {
      q: 'Do you cut kids’ hair?',
      a: 'Yes, first haircuts included. Say it is their first when you ring and there will be time set aside for it.',
    },
  ],
};

export default hairGenius;
