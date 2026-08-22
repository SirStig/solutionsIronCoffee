/**
 * Every project, in one place.
 *
 * House rules for copy, so this file never bloats again:
 *   tagline   — one line, under ~70 characters. It is the whole pitch.
 *   summary   — two or three sentences. What it is, who it's for, why it exists.
 *   highlights— at most five, each a short phrase, not a sentence.
 *   tech      — at most eight. The ones worth knowing, not the full lockfile.
 *
 * Nothing here should be a number that can go stale. No download counts, no
 * star counts — those get fetched live or not shown at all.
 */

export type Category = 'apps' | 'open-source' | 'games' | 'client';

export type Status =
  | 'live'
  | 'beta'
  | 'in-development'
  | 'archived'
  | 'shut-down';

export interface ProjectLink {
  label: string;
  href: string;
  /** The one link that gets the filled button treatment. */
  primary?: boolean;
}

/** Live version/release badge, resolved at runtime from a public registry. */
export type LiveVersion =
  | { kind: 'pypi'; package: string }
  | { kind: 'npm'; package: string }
  | { kind: 'github-release'; owner: string; repo: string };

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  /** Longer story, shown only on the detail page. Optional by design. */
  story?: string;
  year: string;
  status: Status;
  categories: Category[];
  highlights: string[];
  tech: string[];
  links: ProjectLink[];
  /** Manifest key from src/generated/images.json. */
  image: string;
  gallery?: { name: string; alt: string }[];
  /** Order on the work index. Lower is higher. */
  weight: number;
  featured?: boolean;
  liveVersion?: LiveVersion;
  /** Shown as a small note where relevant — licence, source availability. */
  note?: string;
}

export const statusLabels: Record<Status, string> = {
  live: 'Live',
  beta: 'In beta',
  'in-development': 'In development',
  archived: 'Archived',
  'shut-down': 'Shut down',
};

export const projects: Project[] = [
  {
    slug: 'beyond25',
    name: 'Beyond25',
    tagline: 'Describe any vibe. Get the playlist.',
    summary:
      'An AI music curator that researches before it answers — music press, scene blogs, catalog data — then matches every track against a real streaming catalog so the playlist actually plays. Saves straight to Apple Music or YouTube Music with artwork and ordering intact.',
    story:
      'Most "AI playlist" tools hallucinate tracks that do not exist, then hand you a list you have to rebuild by hand. Beyond25 does the boring part properly: it researches real sources, resolves every track against a live catalog, and writes the finished playlist into your library in one tap. You watch each research step stream in as it works.\n\nThere are two ways in. Type the brief in chat, or open Canvas and shape it with your hands — stack moods, eras, genres and artists on a live canvas and let the same music-native model build from the pile. Blend lets several people contribute to one playlist from a shared link.\n\nIt runs on the web, iPhone, iPad, Android and now natively on Mac. If you would rather nothing left your machine, point it at a local Ollama model and run the whole thing offline.',
    year: '2026',
    status: 'live',
    categories: ['apps'],
    highlights: [
      'Researches real sources, then resolves every track against a live catalog',
      'One-tap save to Apple Music or YouTube Music',
      'Canvas — build a playlist visually instead of describing it',
      'Blend — several people, one playlist, one link',
      'Local mode via Ollama, so nothing leaves your machine',
    ],
    tech: [
      'React Native',
      'Expo',
      'TypeScript',
      'FastAPI',
      'Python',
      'PostgreSQL',
      'Apple Music API',
      'Stripe',
    ],
    links: [
      { label: 'beyond-25.com', href: 'https://www.beyond-25.com', primary: true },
      {
        label: 'App Store',
        href: 'https://apps.apple.com/us/app/beyond25/id6759841636',
      },
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.beyond25.app',
      },
    ],
    image: 'projects/beyond25/playlist-in-chat',
    gallery: [
      {
        name: 'projects/beyond25/curating',
        alt: 'Beyond25 curating a playlist, with each research step streaming in live',
      },
      {
        name: 'projects/beyond25/playlist-detail',
        alt: 'A finished Beyond25 playlist, ready to save to a music library',
      },
      {
        name: 'projects/beyond25/researching',
        alt: 'Beyond25 researching music press and catalog data before building',
      },
      {
        name: 'projects/beyond25/ollama-provider',
        alt: 'Beyond25 configured to run against a local Ollama model',
      },
    ],
    weight: 1,
    featured: true,
  },

  {
    slug: 'ourlee',
    name: 'Ourlee',
    tagline: 'Walking in step, together.',
    summary:
      'A calm shared space for Christian couples and households — one calendar, a daily verse, private notes and your own photo album. No followers, no feed, no comparison. Currently in closed beta.',
    story:
      'Every app built for couples eventually turns into a social network. Ourlee will not. There is no discover tab, no follower count, and nothing to compare yourself against — just a small, quiet room with your own chairs in it.\n\nFour tools that work together: a shared calendar everyone is actually on, a faith layer with a daily verse and multi-day devotionals, private notes for prayer lists and the small things worth remembering, and a photo album that surfaces memories on the day they happened.\n\nIt is deliberately not an AI product. The content is hand-curated and Christ-centred, there is no third-party analytics, and there are no ads. One Expo and React Native Web codebase ships it to iOS, Android and the web at once, against a FastAPI backend.',
    year: '2026',
    status: 'beta',
    categories: ['apps'],
    highlights: [
      'One shared calendar, with Google, CalDAV and EventKit sync',
      'Daily verse and multi-day devotionals',
      'Private notes for prayer lists and reflections',
      'Photos that resurface on the day they happened',
      'Invite only — single-use invites that expire',
    ],
    tech: [
      'Expo',
      'React Native',
      'React Native Web',
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'Redis',
      'Cloudflare R2',
    ],
    links: [{ label: 'ourlee.app', href: 'https://ourlee.app', primary: true }],
    image: 'projects/ourlee/home',
    gallery: [
      { name: 'projects/ourlee/calendar', alt: 'Ourlee shared calendar' },
      {
        name: 'projects/ourlee/faith',
        alt: "Ourlee's daily verse and devotional screen",
      },
      { name: 'projects/ourlee/photos', alt: 'Ourlee shared photo album' },
      {
        name: 'projects/ourlee/together',
        alt: 'The Ourlee together screen, showing shared notes and plans',
      },
    ],
    weight: 2,
    featured: true,
    note: 'Closed beta — no public store listing yet.',
  },

  {
    slug: 'project-yoked',
    name: 'Project Yoked',
    tagline: 'The most ambitious thing I have built. Now on ice.',
    summary:
      'An all-in-one fitness social platform — workout tracking, a video feed, a 1.7M-food nutrition database, per-muscle recovery modelling and AI coaching — built end to end as co-founder and lead developer. Shut down and on hold, but it is the project I learned the most from.',
    story:
      'Project Yoked set out to replace half a dozen fitness subscriptions with one app: a workout library and tracker, a short-form video feed, social features, gamification, progress analytics, a nutrition database north of 1.7 million foods, and a Recovery Engine that modelled per-muscle fatigue against an interactive anatomical model. On top of that sat home-screen widgets, Quick Actions, an Apple Watch app, trail mapping and cardio tracking.\n\nI built and owned the whole stack — FastAPI backend, React web app, React Native mobile, plus all the architecture, infrastructure and deployment.\n\nIt is shut down now and on hold. I am not going to dress that up: it was too much surface area for the team behind it. But almost everything I do well now, I learned building it — and two production libraries fell out of it and outlived it, YokedCache and the Expo Media Engine, both still on public registries.',
    year: '2025',
    status: 'shut-down',
    categories: ['apps'],
    highlights: [
      'Full stack owned end to end — backend, web, mobile, infra',
      'Per-muscle Recovery Engine with an interactive anatomical model',
      'Nutrition database of 1.7M+ foods',
      'Apple Watch app, home-screen widgets and Quick Actions',
      'Spun out two libraries that are still published today',
    ],
    tech: [
      'FastAPI',
      'Python',
      'React',
      'React Native',
      'PostgreSQL',
      'Redis',
      'AWS',
    ],
    links: [],
    image: 'projects/projectyoked',
    gallery: [
      {
        name: 'projects/projectyoked/AProCoachInYourPocket',
        alt: 'Project Yoked AI coaching interface',
      },
      {
        name: 'projects/projectyoked/Recovery1.1.4',
        alt: "Project Yoked's Recovery Engine and anatomical fatigue model",
      },
      {
        name: 'projects/projectyoked/2.6Food700Exercises',
        alt: 'Project Yoked nutrition and exercise library',
      },
      {
        name: 'projects/projectyoked/SocialWithSUbstance',
        alt: 'Project Yoked social feed',
      },
    ],
    weight: 3,
    featured: true,
  },

  {
    slug: 'yokedcache',
    name: 'YokedCache',
    tagline: 'One async caching API. Five backends behind it.',
    summary:
      'A Python caching library with the same async API across in-process memory, Redis, Memcached, disk and SQLite. Tag and pattern invalidation, optional Starlette HTTP middleware, and metrics built in. Published on PyPI.',
    story:
      'YokedCache came out of Project Yoked, where swapping cache backends between local dev and production kept meaning a rewrite. The fix was one async-first API that behaves identically across in-process memory, Redis, Memcached, disk and SQLite — memory works with no setup at all, so tests need no infrastructure.\n\nBeyond get and set it does the parts people usually hand-roll: invalidation by tag or pattern, SQLAlchemy-friendly helpers, optional HTTP caching middleware for Starlette, and production observability through Prometheus, StatsD and OpenTelemetry.',
    year: '2026',
    status: 'live',
    categories: ['open-source'],
    highlights: [
      'One API across memory, Redis, Memcached, disk and SQLite',
      'Invalidation by tag or pattern, not just by key',
      'Optional Starlette HTTP caching middleware',
      'Prometheus, StatsD and OpenTelemetry built in',
      'Memory backend needs zero setup — tests run with no infra',
    ],
    tech: ['Python', 'asyncio', 'Redis', 'Memcached', 'SQLAlchemy', 'Starlette'],
    links: [
      {
        label: 'PyPI',
        href: 'https://pypi.org/project/yokedcache/',
        primary: true,
      },
      { label: 'GitHub', href: 'https://github.com/SirStig/yokedcache' },
    ],
    image: 'projects/yokedcache',
    weight: 4,
    featured: true,
    liveVersion: { kind: 'pypi', package: 'yokedcache' },
    note: 'MIT licensed. Python 3.10+.',
  },

  {
    slug: 'encodeforge',
    name: 'EncodeForge',
    tagline: 'An FFmpeg GUI that does not make you learn FFmpeg.',
    summary:
      'A free, open-source desktop app for video encoding, AI subtitle generation and smart media renaming. Hardware-accelerated encoding, fully local subtitles via faster-whisper, and a scriptable CLI sharing the same core.',
    story:
      'FFmpeg can do anything, which is exactly why it is miserable to use for the things you do every week. EncodeForge wraps the parts that matter in a single desktop app: hardware-accelerated encoding through NVENC, AMF, Quick Sync or VideoToolbox, subtitle generation that runs entirely on your own machine via faster-whisper, and metadata-driven file renaming that pulls from eight sources.\n\nEverything the GUI does, the CLI does too — they share one core, so a batch job is the same code path as a button click. Version 0.5.0 is the first stable release of a full rewrite from JavaFX to PySide6.',
    year: '2026',
    status: 'live',
    categories: ['open-source'],
    highlights: [
      'Hardware encoding via NVENC, AMF, Quick Sync and VideoToolbox',
      'AI subtitles that run fully local — nothing uploaded',
      'Metadata-driven renaming from eight sources',
      'Shared core between the GUI and a scriptable CLI',
      'Windows, macOS and Linux builds',
    ],
    tech: ['Python', 'PySide6', 'Qt 6', 'FFmpeg', 'faster-whisper', 'Nuitka'],
    links: [
      {
        label: 'Download',
        href: 'https://github.com/SirStig/EncodeForge/releases',
        primary: true,
      },
      { label: 'GitHub', href: 'https://github.com/SirStig/EncodeForge' },
    ],
    image: 'projects/encodeforge-encoder',
    gallery: [
      {
        name: 'projects/encodeforge-subtitles',
        alt: 'EncodeForge generating subtitles locally',
      },
      {
        name: 'projects/encodeforge-metadata',
        alt: 'EncodeForge metadata-driven file renaming',
      },
    ],
    weight: 5,
    liveVersion: { kind: 'github-release', owner: 'SirStig', repo: 'EncodeForge' },
    note: 'MIT licensed.',
  },

  {
    slug: 'expo-media-engine',
    name: 'Expo Media Engine',
    tagline: 'Video editing in Expo, without the per-minute bill.',
    summary:
      'A hardware-accelerated video composition engine for Expo — multi-track editing, real-time preview, filters, transitions and audio mixing on both iOS and Android. Built on AVFoundation and MediaCodec, with no proprietary SDK behind it.',
    story:
      'Video editing in React Native usually means renting someone else\'s cloud pipeline and paying per minute. This does it on the device: AVFoundation on iOS, MediaCodec and OpenGL ES 2.0 on Android, exposed through one Expo module.\n\nIt covers the full pipeline — real-time preview, multi-track composition, nine filters, eight transitions, audio mixing and H.264/H.265 export. Written for Project Yoked\'s video feed and published for anyone who needs the same thing.',
    year: '2026',
    status: 'archived',
    categories: ['open-source'],
    highlights: [
      'Multi-track composition with real-time preview',
      'Nine filters and eight transitions',
      'Native AVFoundation and MediaCodec, no proprietary SDK',
      'H.264 and H.265 export, on device',
    ],
    tech: [
      'Kotlin',
      'Swift',
      'TypeScript',
      'Expo Modules API',
      'AVFoundation',
      'MediaCodec',
      'OpenGL ES',
    ],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/SirStig/projectyoked-expo-media-engine',
        primary: true,
      },
    ],
    image: 'projects/expo-media-engine',
    weight: 6,
    liveVersion: { kind: 'npm', package: '@projectyoked/expo-media-engine' },
    note: 'MIT licensed. Requires a dev build — Expo Go is not supported.',
  },

  {
    slug: 'novaswift',
    name: 'NovaSwift',
    tagline: 'Rebuilding a 2002 space classic, natively, in Swift.',
    summary:
      'A fan rebuild of EV Nova written from scratch in Swift so it runs natively on Mac, iPad, iPhone and Apple TV. Newtonian flight and combat, a galaxy map, missions, co-op multiplayer and an in-game plug-in store. Public TestFlight beta.',
    story:
      'EV Nova came out in 2002 and there has never been a good way to play it on modern hardware. NovaSwift is a ground-up rebuild of the engine in Swift — not an emulator, not a wrapper — so it runs natively across Mac, iPad, iPhone and Apple TV.\n\nThe hard part was archaeology. The original ship AI runs off resource tables that had to be reverse-engineered before any of it could be reimplemented, alongside Newtonian flight physics, the galaxy map, the mission system, local Wi-Fi and Game Center co-op, and a plug-in store for community content.\n\nIt ships zero copyrighted game data — you bring your own, the same way OpenMW and OpenRA work. Unofficial and unaffiliated. A Godot port for Linux and Windows is in progress.',
    year: '2026',
    status: 'beta',
    categories: ['games', 'open-source'],
    highlights: [
      'Written from scratch in Swift — native on Mac, iPad, iPhone and Apple TV',
      'Ship AI reconstructed from reverse-engineered resource tables',
      'Newtonian flight and combat',
      'Local Wi-Fi and Game Center co-op',
      'In-game plug-in store for community content',
    ],
    tech: ['Swift', 'SwiftPM', 'Metal', 'Game Center', 'Godot'],
    links: [
      {
        label: 'TestFlight beta',
        href: 'https://testflight.apple.com/join/3FBzwwq1',
        primary: true,
      },
      { label: 'GitHub', href: 'https://github.com/SirStig/NovaSwift' },
    ],
    image: 'projects/novaswift/logo-banner',
    gallery: [
      { name: 'projects/novaswift/flight-hud', alt: 'NovaSwift flight HUD' },
      { name: 'projects/novaswift/galaxy-map', alt: 'NovaSwift galaxy map' },
      {
        name: 'projects/novaswift/multiplayer',
        alt: 'NovaSwift co-op multiplayer',
      },
      {
        name: 'projects/novaswift/plugin-store',
        alt: 'NovaSwift in-game plug-in store',
      },
    ],
    weight: 7,
    featured: true,
    note: 'Unofficial and unaffiliated. Ships no copyrighted game data — bring your own.',
  },

  {
    slug: 'eaglechair',
    name: 'EagleChair',
    tagline: 'A digital flagship for a furniture manufacturer.',
    summary:
      'A catalog and storefront rebuild for a commercial seating manufacturer — product catalog, configurator and quoting flow. Contract work, in development.',
    year: '2026',
    status: 'in-development',
    categories: ['client'],
    highlights: [
      'Product catalog with configurable options',
      'Quote request flow',
      'Built for a commercial furniture manufacturer',
    ],
    tech: ['React', 'TypeScript', 'Python', 'PostgreSQL'],
    links: [
      { label: 'Preview', href: 'https://joshua.eaglechair.com/', primary: true },
    ],
    image: 'projects/eaglechair-homepage',
    gallery: [
      {
        name: 'projects/eaglechair-catalog',
        alt: 'EagleChair product catalog page',
      },
    ],
    weight: 8,
  },

  {
    slug: 'rlr-project',
    name: 'The RLR Project',
    tagline: 'An early game project, kept for the record.',
    summary:
      'One of my first serious game builds. Long finished, kept here because pretending you started good helps nobody.',
    year: '2019',
    status: 'archived',
    categories: ['games'],
    highlights: [],
    tech: ['Game development'],
    links: [],
    image: 'projects/rlr',
    weight: 20,
  },

  {
    slug: 'game-dev-tycoon-mod-maker',
    name: 'Ultimate Mod Maker',
    tagline: 'A mod generator for Game Dev Tycoon. Built in 2016.',
    summary:
      'A Windows desktop app that generated Game Dev Tycoon mods from a visual editor, so you did not have to write the JavaScript by hand. Long dead, still on GitHub.',
    year: '2016',
    status: 'archived',
    categories: ['games'],
    highlights: [],
    tech: ['C#', '.NET WinForms'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/SirStig/Ultimate-Mod-Maker',
        primary: true,
      },
    ],
    image: 'projects/gamedev-mod',
    weight: 21,
    note: 'GPL-3.0 licensed.',
  },
];

/* --- Selectors ---------------------------------------------------------- */

const byWeight = (a: Project, b: Project) => a.weight - b.weight;

export const allProjects = [...projects].sort(byWeight);

export const featuredProjects = allProjects.filter((p) => p.featured);

export const projectsIn = (category: Category) =>
  allProjects.filter((p) => p.categories.includes(category));

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug);
