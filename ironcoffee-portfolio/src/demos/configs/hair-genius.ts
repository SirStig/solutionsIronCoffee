import type { DemoConfig } from '../types';

/**
 * Hair Genius Barbershop, Parker CO. NOT READY TO SEND, and the reason is not
 * the page.
 *
 * ## Confirm the shop is still trading before this goes anywhere
 *
 * Four separate signals say something changed in late 2024 or 2025:
 *
 *   - A new entity, **Hair Genius 1 LLC**, filed 02 September 2024 and in good
 *     standing at 11211 Dransfeldt Rd Ste 128. The older Hair Genius LLC, from
 *     2017, is delinquent. A fresh trade name filing followed in Feb 2025.
 *   - The shop's Booksy profile, id 401161, **now resolves to a Hair Genius in
 *     Orlando, Florida**, 8121 Vineland Ave. A Booksy search of Parker returns
 *     no shop-level Hair Genius at all.
 *   - Both barbers named in the reviews have rebranded off the name. Carlos is
 *     now "Carlos @ Lofi Barber" and has moved to 19571 E Mainstreet. Eduardo
 *     still works at Ste 128 but under "Eduardo B&B Barber Shop".
 *   - No review anywhere is dated 2026. The most recent is June 2025.
 *
 * None of that proves they are shut. It does mean a preview addressed to a
 * business that has changed hands is worse than no preview, so this stays a
 * draft until somebody answers the phone.
 *
 * ## The Booksy link is gone, and it had to be
 *
 * This config used to open with a "Book Online" button pointing at Booksy
 * business 401161. **That link now sends a customer in Parker to a barbershop
 * in Orlando.** It was the single most prominent element on the page. The CTA
 * is their phone number now, which is the one contact detail every source
 * agrees on.
 *
 * ## The pitch also changes, and gets much better
 *
 * The old angle was "you are on a free wsite.top subdomain". Weak, and
 * possibly wrong: hair-genius.wsite.top is live and has no title tag at all,
 * but it is an auto-generated scrape of their Yelp page, right down to a baked
 * in "YELP (28)" badge, and it is probably not theirs. Opening with "your
 * website is bad" about a page they never made loses the meeting in one line.
 *
 * The real angle is checkable in ten seconds in front of them. **Their own
 * Facebook page lists their website as Wefixcheaphaircuts.com. That domain
 * lapsed, was re-registered by a domain flipper in October 2024, and today
 * serves a page offering it for sale at $395.** Every customer who has clicked
 * "Website" on their Facebook since then has landed on somebody selling their
 * old address back to them.
 *
 * ## Verified 2026-09-16
 *
 * Address 11211 Dransfeldt Rd Ste 128, self-published and matching the SOS
 * principal office. Phone (303) 805-5348, self-published and consistent on
 * every source with no conflict. Facebook page with 507 followers. No real
 * website. The SOS mailing address on Pony Express Dr is a mailbox; do not
 * print it.
 *
 * ## Still to confirm
 *
 *   - **Who owns it and who cuts there now.** No owner name is published
 *     anywhere. Carlos, George, Wes, Tami, Nolan and Keesha all come from old
 *     reviews.
 *   - **The hours.** Sources split cleanly in two. Three Google-derived
 *     listings say open seven days with Sunday 9 to 5 and late Wednesday and
 *     Thursday; the wsite.top page and Fresha say closed Sunday and a flat 10
 *     to 6. The shop publishes none. Below is the Google version, because that
 *     is what a customer searching today acts on, but it is a coin toss.
 *   - **Prices.** The shop publishes none. Eduardo's Booksy menu runs $34.99
 *     to $74.99, but that is his chair rate and not the shop's, and printing
 *     it as theirs would be wrong in a way that is hard to walk back.
 *   - **Brand colors.** The near-black and rust below is a guess.
 */
const hairGenius: DemoConfig = {
  slug: 'hair-genius',
  createdAt: '2026-09-15',
  template: 'booking',
  // Blocking: confirm the shop is still trading and under whose name.
  draft: true,

  business: {
    name: 'Hair Genius Barbershop',
    tagline: 'Fades, beard work and a chair on Dransfeldt Road.',
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
      body: 'First haircuts included, patiently, which is not every shop.',
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
    heading: 'Suite 128, and worth the walk around the back.',
    body: 'Hair Genius is a barbershop in a suite set back off Dransfeldt Road. It takes a minute to find the first time, which is why the directions link is on this page and the address is not left to do the work on its own. Inside it is classic and modern in equal measure, walk-in when there is a chair and booked when there is not.',
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
      a: 'Yes, including first haircuts, and the shop has a reputation for not rushing them.',
    },
  ],
};

export default hairGenius;
