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

/** Body/heading pairing. Resolved to real stacks in `demoFont()`. */
export type BrandFont = 'sans' | 'serif' | 'slab';

export interface DemoBusiness {
  name: string;
  /** One line, shown under the name. Keep it under 70 characters. */
  tagline: string;
  city: string;
  /** Two-letter code, e.g. 'CO'. */
  state: string;
  address?: string;
  /** Digits, punctuation, whatever reads well. `telHref()` strips it. */
  phone: string;
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
  items: DemoProduct[];
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
   * at `/templates/<slug>`, is indexed, never expires, and is labelled as a
   * demonstration rather than as a preview built for a real owner.
   */
  showcase?: boolean;
}
