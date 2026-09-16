import type { DemoConfig } from '../types';

/**
 * Barr Bear Country Cuts and MORE, Kiowa CO.
 *
 * The strongest of the live prospects: open, nineteen years in one town, a 5.0
 * average across roughly forty reviews, and nothing online she owns.
 *
 * ## Verified 2026-09-16
 *
 * Owner **Le Ann Goetz**, sole operator. **In business since 1 February 2007**,
 * which two independent records agree on: the BBB profile says "established
 * February 1, 2007" and the Colorado Secretary of State trade name filing for
 * "Barr Bear Country Cuts" carries a formation date of 02/01/2007. Nextdoor's
 * "15 years" is wrong; ignore it. Address 312 Comanche St, self-published on
 * Facebook and matched by BBB, Yahoo, YellowPages and Nextdoor. Email
 * barrbear1@gmail.com, self-published. BBB A+ with no complaints in three
 * years. No website of any kind: barrbearcountrycuts.com and barrbearcuts.com
 * do not resolve, and no listing anywhere carries a website field. She has a
 * Facebook page with 138 followers and that is the whole of it.
 *
 * ## Two corrections to what this file used to say
 *
 * **There is no Fresha booking.** This config used to open with a Fresha CTA
 * and a pitch built on "booking is solved". The Fresha page is an unclaimed
 * scrape and prints, in its own words, "This page uses publicly available
 * information to help people discover this venue. The business is not
 * currently affiliated with or partnered with Fresha." Sending her a preview
 * whose main button hands her customers to a company she has no relationship
 * with would have been the last thing she read. The button is now her phone.
 *
 * **Do not print her name until she spells it.** Le Ann, LeAnn, Leann and
 * LeeAnn all appear in public, including across her own reviews. The page
 * therefore says "Le Ann" once, in prose she can correct in a sentence.
 *
 * ## Still to confirm, in one phone call
 *
 *   - **Which number.** (303) 621-2420 is on her own Facebook page and is used
 *     here for that reason. (303) 905-8246 appears on the Google-derived
 *     listings. One is probably the shop and one her cell.
 *   - **The hours.** She publishes none. Three listings say Tue to Fri 8 to 5
 *     and Sat 7 to 2, but all three are scraping the same Google record, so
 *     that is one source agreeing with itself. Birdeye says Mon to Fri 9 to 6
 *     and closed weekends. What is below is what a customer searching today
 *     is shown, which is the version worth correcting first.
 *   - **The service list and prices.** Nothing is public beyond "$$". Two
 *     separate reviewers volunteer that she undercharges, which makes guessing
 *     worse than asking.
 *   - **What "and MORE" covers now.** Her own words, in a post from 2013:
 *     "Barr Bear does your traditional haircuts, plus all other beauty and
 *     salon needs!!! If you don't know if we do it.....we probably do!!!"
 *     Thirteen years is long enough that it needs re-asking rather than
 *     reprinting, so the page says the sentence she can confirm and no more.
 *   - **Brand colors.** The palette below is a guess and is the one thing on
 *     this page that is meant to be thrown away.
 *
 * ## Worth knowing before the call
 *
 * Two reviewers, unprompted, say she charges too little: "Only problem is she
 * doesn't charge enough" (Harrison Filas, Google, Dec 2025) and "The fact that
 * I have also not found a better price is absolutely awesome" (Jericho,
 * Google, Oct 2025). Those are real, attributed and published, and they are
 * not on this page, because the rule in types.ts is that a preview for a real
 * business does not put customer quotes on it without asking. They belong in
 * the conversation, not in the config.
 */
const barrBear: DemoConfig = {
  slug: 'barr-bear',
  createdAt: '2026-09-15',
  template: 'booking',

  /*
   * Live, not a draft.
   *
   * Nothing anywhere suggests she has stopped: her Facebook renders "Open now"
   * today, reviews land in October and December 2025, Yelp's page was indexed
   * in July 2026, and there is no closure signal of any kind. The trade name
   * registration at the Secretary of State is expired, but she is a sole
   * proprietor and a lapsed name filing is not a shut door.
   *
   * What is still unconfirmed is on the page rather than behind it: the hours
   * are Google's rather than hers, and prices are shown as "Call for pricing"
   * because none are public. Both are the sort of thing a preview is meant to
   * get corrected, and neither is a claim that could embarrass her.
   */

  business: {
    name: 'Barr Bear Country Cuts',
    tagline: 'Cutting hair on Comanche Street since 2007.',
    city: 'Kiowa',
    state: 'CO',
    address: '312 Comanche St',
    // Self-published on her own Facebook page. See the note above about the
    // second number on the Google-derived listings.
    phone: '(303) 621-2420',
    email: 'barrbear1@gmail.com',
    facebookUrl:
      'https://www.facebook.com/p/Barr-Bear-Country-Cuts-and-MORE-100069513674143/',
  },

  /*
   * Fraunces rather than Archivo, which is what this used to be.
   *
   * Archivo heavy in caps is a roofing company's truck. This is one woman who
   * has cut the hair of a town of seven hundred people for nineteen years, and
   * Fraunces is the face in the set that reads warm and slightly handmade
   * without reading cheap.
   *
   * The colors are a guess and are marked as one. Eyedropper them off her sign.
   */
  brand: {
    primary: '#8A4A28',
    secondary: '#2A1A12',
    accent: '#C9982E',
    font: 'editorial',
    motif: 'pines',
  },

  hero: {
    headline: 'Ring Le Ann, and she will fit you in.',
    sub: 'Barr Bear Country Cuts has been on Comanche Street in Kiowa since 2007. Times and prices are quickest to get by picking up the phone.',
    image: 'art:salon-station',
    ctaLabel: 'Call the Shop',
    ctaHref: 'tel:+13036212420',
  },

  /*
   * No prices. Nothing about what she charges is public, and the one thing
   * every review agrees on is that it is less than it should be, so a number
   * invented here would be wrong in the direction that costs her money.
   */
  services: [
    {
      title: 'Haircuts',
      icon: 'scissors',
      body: 'Men, women and children, all in the same chair, without leaving town for it.',
      price: 'Call for pricing',
    },
    {
      title: 'Beard and neck work',
      icon: 'razor',
      body: 'Shaped, trimmed and finished properly rather than squared off in a hurry.',
      price: 'Call for pricing',
    },
    {
      title: 'Color and styling',
      icon: 'brush',
      body: 'Ask in the chair. Nineteen years in one town is nineteen years of knowing what suits who.',
      price: 'Call for pricing',
    },
    {
      title: 'Textured and loc work',
      icon: 'sparkle',
      body: 'Not something every small town shop takes on. Worth asking about when you ring.',
      price: 'Call for pricing',
    },
  ],

  /*
   * What Google shows a customer today. She publishes none herself, and the
   * one dissenting listing is in the header. Confirming this is the first
   * question on the call, because a wrong closing time is the detail an owner
   * spots before anything else on the page.
   */
  hours: [
    { day: 'Monday', open: 'Closed' },
    { day: 'Tuesday', open: '8am to 5pm' },
    { day: 'Wednesday', open: '8am to 5pm' },
    { day: 'Thursday', open: '8am to 5pm' },
    { day: 'Friday', open: '8am to 5pm' },
    { day: 'Saturday', open: '7am to 2pm' },
    { day: 'Sunday', open: 'Closed' },
  ],

  gallery: [
    'art:salon-shears',
    'art:salon-basin',
    'art:salon-color',
    'art:salon-dryer',
  ],

  about: {
    heading: 'Nineteen years, one chair, one town.',
    body: 'Barr Bear Country Cuts has been on Comanche Street since February 2007, owned and run the whole time by Le Ann Goetz. She is a native Coloradan and she lives in Kiowa, which means the person who answers the phone is the person who cuts your hair and the person whose name is over the door. Nineteen years in a town this size is not a business plan, it is a reputation.',
    image: 'art:salon-pines',
  },

  faq: [
    {
      q: 'Do I need an appointment?',
      a: 'Ringing ahead is the surest way to get seen. Call and she will tell you what she has free.',
    },
    {
      q: 'What does "and MORE" mean?',
      a: 'More than haircuts. Call and ask for whatever it is, because the answer is usually yes.',
    },
    {
      q: 'Do you cut children’s hair?',
      a: 'Yes, including the wriggly ones. Say so when you call and she will leave a bit more time.',
    },
  ],
};

export default barrBear;
