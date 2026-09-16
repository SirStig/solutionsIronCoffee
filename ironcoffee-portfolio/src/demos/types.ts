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
  | 'trades';

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
  | 'craft';

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
 * Only ever populated for the fictional gallery samples. Putting words in a
 * real customer's mouth on a preview for a real business is not a shortcut
 * worth taking, so the real configs leave this out and the templates simply
 * do not render the section.
 */
export interface DemoTestimonial {
  quote: string;
  name: string;
  detail?: string;
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
  | 'order';

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

  /** Gallery samples only. See DemoTestimonial. */
  testimonials?: DemoTestimonial[];

  /**
   * Extra pages. Absent means a single page site, which is the entry tier.
   *
   * The home page keeps a condensed version of anything that moves onto its
   * own page, so a visitor who never clicks still sees it.
   */
  pages?: DemoPage[];

  /** Which price this sample is demonstrating. Gallery samples only. */
  tier?: 'starter' | 'standard' | 'custom';

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
}
