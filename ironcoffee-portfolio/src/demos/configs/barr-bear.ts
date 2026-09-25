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
 * writes "Le Ann" in the headline and the about paragraph, two places she
 * can correct in a sentence. The reviews keep their own spellings.
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
 *   - **The service list and prices.** Nothing is public beyond "$$" and
 *     what Harrison's review names: haircuts, beard trims, shoulder
 *     massages. The page lists those and nothing else. Two
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
 * Google, Oct 2025). Both are real, attributed and published. Harrison's is
 * on this page, word for word and cited to Google, along with two others (see
 * `testimonials`). Jericho's is not, and belongs in the conversation.
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
    headline: 'Call Le Ann, and she will fit you in.',
    sub: 'Barr Bear Country Cuts has been on Comanche Street in Kiowa since 2007. Times and prices are quickest to get by picking up the phone.',
    image: 'demos/barr-bear/hero',
    ctaLabel: 'Call the Shop',
    ctaHref: 'tel:+13036212420',
  },

  /*
   * No prices, and no price field either.
   *
   * Nothing about what she charges is public, and the one thing every review
   * agrees on is that it is less than it should be, so a number invented here
   * would be wrong in the direction that costs her money.
   *
   * Every row used to carry `price: 'Call for pricing'`, which rendered as the
   * same four words repeated down the right hand edge of the widest, emptiest
   * part of the page. Leaving the field out puts the template into its
   * numbered variant and the question is answered once, in the FAQ.
   */
  services: [
    {
      title: 'Haircuts',
      icon: 'scissors',
      body: 'Men, women and children, all in the same chair, without leaving town for it.',
    },
    {
      title: 'Beard and neck work',
      icon: 'razor',
      body: 'Shaped, trimmed and finished properly rather than squared off in a hurry.',
    },
    {
      title: 'Shoulder massages',
      icon: 'chair',
      body: 'Ask about one when you call.',
    },
    {
      title: 'Something else?',
      icon: 'sparkle',
      body: 'Call the shop and ask.',
    },
  ],

  marquee: [
    'Nineteen years, one chair',
    'On Comanche Street since 2007',
    'Men, women and children',
    'Beard and neck work',
    'Shoulder massages',
    'Call and she will fit you in',
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
    'demos/barr-bear/chair',
    'demos/barr-bear/clippers',
    'demos/barr-bear/tools',
    'demos/barr-bear/detail',
  ],

  about: {
    heading: 'Nineteen years, one chair, one town.',
    body: 'Barr Bear Country Cuts has been on Comanche Street since February 2007, owned and run the whole time by Le Ann Goetz. The person who answers the phone is the person who cuts your hair. Nineteen years in a town this size is not a business plan, it is a reputation.',
    // Drawn, where the photographs are not. A picture of the trade can
    // stand beside the story; it cannot be the story, and one illustration
    // per page is what stops five previews looking like five stock sets.
    image: 'art:salon-pines',
  },

  /*
   * Real reviews, copied word for word, and the page names where they came
   * from so anybody can go and read them.
   *
   * Captured 2026-09-16 from the Birdeye mirror of her Google reviews, shown
   * there as eight to twenty four months old. No date is printed: "11 months
   * ago" relative to a crawl of unknown age is not a date, and a wrong one on
   * a page with her name at the top is worse than none.
   *
   * Harrison's is worth reading before the call. It names shoulder massages
   * and a nose hair trim, which is what "and MORE" on her Facebook page turns
   * out to mean, and it ends on her not charging enough, which is the same
   * thing the note above this config says every review agrees on. The reviews
   * were making the argument for the page before the page existed.
   *
   * Her name is spelled three different ways across the three, and all three
   * stay as written. Tidying them would be editing a customer's words, and the
   * inconsistency is itself the evidence that these are real.
   */
  testimonials: [
    {
      quote: 'Excellent shop! The owner Leann is fantastic!',
      name: 'Eileen Kellogg',
      source: 'Google',
    },
    {
      quote:
        'LeAnn is the best. I have hair that grows every direction & she can cut it so it looks great!',
      name: 'Nancy Turner',
      source: 'Google',
    },
    {
      quote:
        'LeeAnn is the best! Great haircuts, beard trims, shoulder massages, and even a nose hair trim. Above and beyond! Only problem is she doesn\u2019t charge enough.',
      name: 'Harrison Filas',
      source: 'Google',
    },
  ],

  pages: [
    {
      slug: 'services',
      label: 'Services',
      kind: 'services',
      intro: 'Prices are not published anywhere, so call and she will tell you.',
    },
    {
      slug: 'about',
      label: 'The shop',
      kind: 'about',
      title: 'Nineteen years, one chair, one town',
    },
    {
      slug: 'visit',
      label: 'Visit',
      kind: 'contact',
      title: 'Find the shop',
      intro: 'On Comanche Street in Kiowa. Calling ahead is the surest way to get seen.',
    },
  ],

  faq: [
    {
      // The question the price column used to answer four times over.
      q: 'What does a cut cost?',
      a: 'Nothing is published online. Call and she will tell you before you come in.',
    },
    {
      q: 'Do I need an appointment?',
      a: 'Calling ahead is the surest way to get seen. Call and she will tell you what she has free.',
    },
    {
      // "and MORE" is quoted as written in the name of her Facebook page.
      q: 'What does “and MORE” mean?',
      a: 'It is part of the shop’s name on Facebook, and it means more than haircuts: customers mention beard trims, shoulder massages and even a nose hair trim. For anything else, call and ask.',
    },
    {
      q: 'Do you cut children’s hair?',
      a: 'Yes, including the wiggly ones. Say so when you call.',
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

export default barrBear;
