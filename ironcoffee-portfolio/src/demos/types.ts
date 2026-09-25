/**
 * The shape of a demo site.
 *
 * A demo is data, not code. Adding a business means one file in `configs/` and
 * a folder of images. It should never mean a change to a template or a
 * component. If you find
 * yourself editing a template to make one business work, the template is
 * missing an option; add the option.
 *
 * Image fields hold **manifest keys**, not URLs: the path under
 * `assets/images/` with no extension, e.g. `demos/sammieds/hero`. The media
 * optimizer turns each source into AVIF + WebP at four widths, and <DemoImage>
 * renders a branded placeholder for any key that is not in the manifest yet, so
 * a config can be written and reviewed before the photos exist.
 */

/** Which layout renders the config. */
export type TemplateName =
  | 'food'
  | 'retail'
  | 'booking'
  | 'professional'
  | 'trades'
  /**
   * The one that is showing off.
   *
   * Scroll-driven animation, a pinned horizontal gallery, a season switcher
   * that runs without JavaScript. It exists because a gallery of five
   * competent small business sites answers "can you build me a website" and
   * does not answer "are you any good", and the second question is the one
   * that makes somebody pick a person over a subscription.
   */
  | 'venue';

/**
 * Which display face sets the headings.
 *
 * Body copy is Inter on every sample. Only the headings change, because a
 * display face at paragraph size is how a site starts looking like a
 * scrapbook, and because the heading is where a stranger decides whether the
 * business looks expensive or looks homemade.
 *
 * Pick by trade, not by taste. Two samples sharing a face is the fastest way
 * for a gallery to read as one template with the names swapped.
 */
export type BrandFont =
  /** Fraunces. Warm and a little odd. Food, coffee, anything handmade. */
  | 'editorial'
  /** Playfair Display. High contrast and formal. Salons, spas, jewelers. */
  | 'luxe'
  /** Archivo, wide and heavy in caps. Trades, haulage, agriculture. */
  | 'industrial'
  /** Outfit. Geometric and calm. Clinics, dentists, family practices. */
  | 'modern'
  /** Bricolage Grotesque. Drawn by hand. Barbers, record shops, bottle shops. */
  | 'craft'
  /** Cormorant, very light at very large sizes. Venues, galleries, florists. */
  | 'estate';

export interface DemoBusiness {
  name: string;
  /** One line, shown under the name. Keep it under 70 characters. */
  tagline: string;
  city: string;
  /** Two-letter code, e.g. 'CO'. */
  state: string;
  address?: string;
  /**
   * Digits, punctuation, whatever reads well. `telHref()` strips it.
   *
   * Optional, because some small businesses genuinely run on a Facebook page
   * and a booking link and publish no number at all. Every template degrades
   * to the next best action rather than inventing one.
   */
  phone?: string;
  email?: string;
  facebookUrl?: string;
  /**
   * IANA zone the hours are kept in, e.g. 'America/Denver', which is also the
   * default. <OpenNow> and the pickup times read the clock in this zone, so a
   * visitor in another state sees the business's hours rather than their own.
   */
  timeZone?: string;
}

export interface DemoBrand {
  /** Hex. Drives buttons, links and section accents. */
  primary: string;
  /** Hex. Deep tone for headers and footers. */
  secondary: string;
  /** Hex. Used sparingly: badges, prices, underlines. */
  accent: string;
  font: BrandFont;
  /** Manifest key, e.g. `demos/sammieds/logo`. */
  logo?: string;
  /**
   * The business's signature mark, tiled behind deep bands.
   *
   * A name from `components/motifs.tsx`: 'wheat', 'blades', 'shears',
   * 'bottles', 'pines'. Leave it out and the bands paint flat, which is the
   * right answer when nothing in the trade draws down to one small shape.
   */
  motif?: string;
}

export interface DemoHero {
  headline: string;
  sub: string;
  /** Manifest key. */
  image: string;
  /** 'Call Now', 'Book Online', 'See Menu'. Whatever the one action is. */
  ctaLabel: string;
  /** `tel:`, `#menu`, an external booking URL. Anything an <a> accepts. */
  ctaHref: string;
}

export interface DemoService {
  title: string;
  body: string;
  /** Icon name from `components/icons.tsx`. Cards look empty without one. */
  icon?: string;
  /**
   * Never guess. Leave it out, or write 'Call for pricing'. A wrong price in a
   * demo reads as carelessness to the one person you can't look careless in
   * front of.
   */
  price?: string;
}

export interface DemoHours {
  day: string;
  /** '11am to 7pm', 'Closed', 'By appointment'. */
  open: string;
}

export interface DemoMenuItem {
  name: string;
  desc?: string;
  price?: string;
}

export interface DemoMenuSection {
  section: string;
  items: DemoMenuItem[];
}

export interface DemoTeamMember {
  name: string;
  role: string;
  /** Manifest key. */
  image?: string;
  bio?: string;
}

export interface DemoFaq {
  q: string;
  a: string;
}

/** Retail only. The products grid that stands in for a menu. */
export interface DemoProduct {
  name: string;
  desc?: string;
  price?: string;
  /** Free text: 'In stock', 'Seasonal', 'Call to confirm'. */
  availability?: string;
}

export interface DemoProductGroup {
  group: string;
  /** Icon name from `components/icons.tsx`. */
  icon?: string;
  items: DemoProduct[];
}

/**
 * A short, hard number: years open, jobs finished, chairs, whatever the
 * business is actually proud of.
 *
 * Never invent one for a real business. An owner knows how long they have been
 * there and will spot a wrong number instantly.
 */
export interface DemoStat {
  value: string;
  label: string;
  icon?: string;
}

/**
 * A customer quote.
 *
 * Two different things share this shape, and `source` is what tells them
 * apart.
 *
 * Without it, the quote is **written**: a fictional customer of a fictional
 * business, which is fine on a gallery sample and forbidden anywhere else.
 * Putting invented words in a real customer's mouth on a page you are about to
 * send that customer's boss is not a shortcut worth taking, and a test fails
 * the build if a preview carries an uncited quote.
 *
 * With it, the quote is **theirs**: copied verbatim from a review they already
 * have in public, with the platform named on the page so anyone can go and
 * find it. That is not a claim being invented, it is a claim being repeated,
 * and it is the single strongest thing a cold preview can put in front of an
 * owner: proof you looked them up before you wrote to them.
 *
 * Copy it exactly. If anything at all is altered, even capitalizing the first
 * letter, say so in a comment next to it.
 */
export interface DemoTestimonial {
  quote: string;
  /**
   * Who said it. Required in practice on a sample, optional on a preview.
   *
   * Several of these businesses have genuine reviews on aggregators that
   * publish the words and drop the name. The choice there is between printing
   * the quote with the platform alone, or inventing a plausible name to sit
   * under it, and the second is the exact thing the rule against invented
   * testimonials exists to prevent. So this is optional and the attribution
   * degrades to the source on its own.
   */
  name?: string;
  detail?: string;
  /**
   * Where it was published: 'Google', 'Facebook', 'Yelp'.
   *
   * Set only on a verbatim quote of a real, public review. Printed on the page
   * as the attribution, so it is a promise that the words are findable.
   */
  source?: string;
}

/**
 * The page layouts a template can serve beyond its home page.
 *
 * Deliberately a fixed vocabulary rather than a section builder. Each kind
 * renders from data the config already carries, so giving a business a five
 * page site is a list of three-word entries, not a CMS and not a new
 * component. That is the whole difference between the one-page tier and the
 * full-site tier, expressed as data.
 */
export type PageKind =
  | 'menu'
  | 'services'
  | 'about'
  | 'gallery'
  | 'team'
  | 'faq'
  | 'contact'
  | 'areas'
  | 'insurance'
  | 'stock'
  | 'order'
  /**
   * The owner's side of the same site.
   *
   * Exists because the two expensive tiers are invisible otherwise. A visitor
   * looking at a booking form cannot tell whether it writes to a database or
   * sends an email, and "from $1,800" against "$500" reads as a markup until
   * you can see the screen the owner gets. This is that screen.
   *
   * It is rendered from the config like every other page kind, and it is
   * labeled on the page as a demonstration, because it is one.
   */
  | 'admin';

export interface DemoPage {
  /** URL segment, e.g. 'menu'. Must be unique within the demo. */
  slug: string;
  /** Nav label. Two words at most. */
  label: string;
  kind: PageKind;
  /** Overrides the default heading for that kind. */
  title?: string;
  /** One line under the heading. */
  intro?: string;
}

/**
 * Sentences a template would otherwise have to write for the business.
 *
 * Every one of these makes a promise: a free inspection, food made on site, a
 * front desk that checks your benefits. On a fictional sample that is copy. On
 * a preview for a real business it is a claim the owner has not made, and the
 * one they will spot first. So the templates print a neutral line, or nothing,
 * and a config that knows the promise is true says it here.
 */
/**
 * The blocks a template can move around. Each template reads only the keys it
 * renders and ignores the rest.
 */
export type SectionKey =
  | 'services'
  | 'stock'
  | 'team'
  | 'reviews'
  | 'quote'
  | 'about'
  | 'gallery'
  | 'visit'
  | 'faq';

/** Overrides for one section's heading. Anything left out keeps the default. */
export interface DemoHeading {
  eyebrow?: string;
  title?: string;
  sub?: string;
}

/**
 * How a page is arranged, as opposed to what it says.
 *
 * Two businesses in the same trade used to get the same page in the same
 * order with the colors swapped, and an owner comparing notes with the shop
 * down the road would see it in seconds. Every field is optional and a config
 * without any of them gets the template's own arrangement.
 */
export interface DemoLayout {
  /** Which opening the page uses. Each template has its own default. */
  hero?: 'full' | 'split' | 'panel' | 'strip';
  /** Section heading alignment. Booking centers by default, the rest left. */
  align?: 'left' | 'center';
  /** Edge-to-edge photo wall, or a contained grid inside a section. */
  gallery?: 'bleed' | 'contained';
  /** Section order after the hero. Keys a template does not know are skipped. */
  order?: SectionKey[];
  /** The visit section on a dark ground rather than a tinted one. */
  darkVisit?: boolean;
  /** Services as a ruled list (the Booking default) or as a grid of cards. */
  services?: 'list' | 'cards';
}

export interface DemoCopy {
  /** Under the services heading. 'Every job starts with a free visit.' */
  servicesIntro?: string;
  /** Under the menu heading on the home page. */
  menuIntro?: string;
  /** Under the insurance heading. */
  insuranceIntro?: string;
  /** The lead form's heading. Defaults to a neutral one per trade. */
  formTitle?: string;
  /** The sentence under the lead form's heading. */
  formIntro?: string;
  /** The lead form's button. */
  formSubmit?: string;
  /** Per-section heading overrides, so two pages in one trade read differently. */
  headings?: Partial<Record<SectionKey, DemoHeading>>;
}

/** Pickup ordering. Only read by the 'order' page. */
export interface DemoOrder {
  /**
   * Sales tax as a fraction, e.g. 0.0781. Leave it out and the order summary
   * says tax is worked out at pickup rather than printing a rate nobody
   * confirmed.
   */
  taxRate?: number;
}

export interface DemoConfig {
  /** URL segment and subdomain label: `/demo/<slug>`, `<slug>.ironcoffee.com`. */
  slug: string;
  /** ISO date. Drives the 60-day expiry on outreach previews. */
  createdAt: string;
  template: TemplateName;

  business: DemoBusiness;
  brand: DemoBrand;
  hero: DemoHero;
  services: DemoService[];
  hours: DemoHours[];
  /** Manifest keys. */
  gallery: string[];
  about: { heading: string; body: string; image?: string };

  /* --- Template-specific. Each template reads only what it needs. -------- */
  menu?: DemoMenuSection[];
  products?: DemoProductGroup[];
  team?: DemoTeamMember[];
  faq?: DemoFaq[];
  /** Three or four numbers worth stating plainly. */
  stats?: DemoStat[];

  /** Promises in the business's own voice. See DemoCopy. */
  copy?: DemoCopy;

  /** Arrangement: hero, order, alignment. See DemoLayout. */
  layout?: DemoLayout;

  /** Settings for the pickup order page. */
  order?: DemoOrder;

  /**
   * Short phrases for the band that slides past under the hero.
   *
   * Four words each, six at the outside. These are the things a regular would
   * say about the place, not slogans: "Brisket until it runs out", "Cash and
   * card", "Dogs welcome on the patio". Leave it out and the band does not
   * render, which is the right answer for a business that has nothing to put
   * in it.
   */
  marquee?: string[];

  /**
   * Written quotes on a sample, verbatim public reviews on a preview.
   * `source` is what separates the two. See DemoTestimonial.
   */
  testimonials?: DemoTestimonial[];

  /**
   * Extra pages. Absent means a single page site, which is the entry tier.
   *
   * The home page keeps a condensed version of anything that moves onto its
   * own page, so a visitor who never clicks still sees it.
   */
  pages?: DemoPage[];

  /**
   * Which rung of the price ladder this sample demonstrates. Gallery only.
   *
   * Named after what gets built, not how many pages it has, because that is
   * the distinction the pricing page is built around: 'site' is words and
   * pictures, 'software' has a database and a login behind it, 'system' adds
   * the owner running it themselves.
   */
  tier?: 'site' | 'software' | 'system';

  /** Trades: the towns served, listed for local search. */
  serviceAreas?: string[];
  /** Trades and professional: short trust signals like 'AAA Approved'. */
  badges?: string[];
  /** Professional: insurers accepted. */
  insurance?: string[];

  /** Renders a "Get directions" link. Deliberately not an embedded map. */
  map?: { lat: number; lng: number };

  /**
   * Set on the fictional businesses in the public gallery. A showcase renders
   * at `/templates/<slug>`, is indexed, never expires, and is labeled as a
   * demonstration rather than as a preview built for a real owner.
   */
  showcase?: boolean;

  /**
   * A config that is still being filled in. It is typechecked and validated by
   * the tests like any other, but it is never prerendered, so there is no page
   * on the deployed site and no link that can be sent by accident.
   *
   * Clear the flag once the hours, the photos and the real details are in.
   */
  draft?: boolean;

  /**
   * The photography is generic category imagery, not this business's own.
   *
   * Says so on the page. An owner spots a picture of somebody else's shop
   * immediately, and having already admitted it turns the one weak spot in a
   * cold preview into evidence that you are straight with people.
   */
  placeholderPhotos?: boolean;

  /**
   * Venue template: the copy that belongs to one venue rather than to the
   * template. Every field is optional, and a missing one drops its line or
   * section rather than printing another business's words.
   */
  venue?: {
    /** Nav label for the sideways gallery, e.g. 'Barn'. Defaults to 'Spaces'. */
    navSpaces?: string;
    /** Small label beside the big statement under the hero. */
    statementLabel?: string;
    /** Heading over the sideways gallery. */
    spacesTitle?: string;
    /** Captions for the first five gallery images, in gallery order. */
    spaceLabels?: string[];
    /** The season switcher. `image` indexes into `gallery`. Absent hides it. */
    seasons?: { id: string; label: string; image: number; note: string }[];
    /** One line under the packages heading: what every package includes. */
    packagesSub?: string;
    /** One line under the dates heading: how holds work. */
    holdPolicy?: string;
    /** Tours line beside the booking flow. */
    tours?: string;
    /** Night photograph for the hero reveal. Defaults to `demos/<slug>/hero-night`. */
    nightImage?: string;
  };
}
