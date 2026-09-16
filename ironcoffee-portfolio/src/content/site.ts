/**
 * Single source of truth for identity, navigation and social links.
 * Copy lives here so pages stay layout-only and nothing drifts out of sync.
 */

export const site = {
  url: 'https://solutions.ironcoffee.com',
  name: 'Joshua Kac',
  company: 'IronCoffee LLC',

  /** Used verbatim as the <title> suffix and in structured data. */
  title: 'Joshua Kac, Software Engineer',
  role: 'Software engineer',

  /** One sentence. Shows up in search results, link previews and the footer. */
  description:
    'Software engineer building apps people actually use. Currently shipping Beyond25, an AI music curator on iOS, Android and web.',

  email: 'joshua@ironcoffee.com',
  locale: 'en_US',

  /** Absolute path to the default share image. */
  ogImage: '/og-image.png',
} as const;

export const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/SirStig',
    handle: '@SirStig',
    icon: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joshua-kac-aa50b7131',
    handle: 'Joshua Kac',
    icon: 'linkedin',
  },
  {
    label: 'Email',
    href: `mailto:${site.email}`,
    handle: site.email,
    icon: 'mail',
  },
] as const;

/**
 * Four links, one per question a visitor actually arrives with.
 *
 * Apps, Open source and Games used to sit here beside Work, which made the bar
 * look like four categories when it was really one list and three filters of
 * it: /work already groups by exactly those headings. Ten projects do not need
 * four doors. The filter now lives on the page, where the reader can see what
 * they are filtering before they commit to it.
 *
 * Those three routes still exist and are still indexed. They are just not the
 * first thing asked of somebody who has not seen a single project yet.
 */
export const nav = [
  { label: 'Work', href: '/work' },
  { label: 'Websites', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
] as const;

export type SocialLink = (typeof socials)[number];
