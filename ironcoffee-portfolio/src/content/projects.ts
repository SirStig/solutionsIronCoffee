/**
 * Every project, in one place.
 *
 * House rules for copy, so this file never bloats again:
 *   tagline:    one line, under ~70 characters. It is the whole pitch.
 *   summary:    two or three sentences. What it is, who it's for, why it exists.
 *   highlights: at most five, each a short phrase, not a sentence.
 *   tech:       at most eight. The ones worth knowing, not the full lockfile.
 *
 * Nothing here should be a number that can go stale. No download counts, no
 * star counts. Those get fetched live or not shown at all.
 *
 * On voice: this copy is meant to sound like the blog posts, because the same
 * person wrote both. Use contractions. Undersell. Name the thing that doesn't
 * work yet. The tells to stay away from are tidy rule-of-three lists, the
 * balanced "not X, but Y" construction, and every entry resolving on a neat
 * closing line. `crucible prose grade` catches most of them if you feed it
 * the copy as a file, which is worth doing before editing this.
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
  /** Shown as a small note where relevant: license, source availability. */
  note?: string;
}

export const statusLabels: Record<Status, string> = {
  live: 'Live',
  beta: 'In beta',
  'in-development': 'In development',
  archived: 'Archived',
  'shut-down': 'Shut down',
};

/** Everything at or past this weight is kept for the record, not the pitch. */
export const ARCHIVE_WEIGHT = 20;

export const projects: Project[] = [
  {
    slug: 'beyond25',
    name: 'Beyond25',
    tagline: 'It reads the music press before it builds you a playlist.',
    summary:
      'An AI music curator that does the reading first. It runs real searches, pulls from the music press, then resolves every track against a live catalog so nothing it hands you is invented. One tap saves the finished thing to Apple Music or YouTube Music.',
    story:
      "Ask most AI playlist tools for something and they'll confidently give you songs that don't exist. Beyond25 goes and reads first. It searches, pulls from Wikipedia, Genius, Billboard, Rolling Stone and the Grammys, and shows you the sources above the result. Then every track gets matched against a real catalog before it reaches you.\n\nThere are two ways to brief it. Type it in chat, or open Canvas and build the thing with your hands, dragging moods and eras and genres and artists around until the pile looks right. Blend lets a few people feed one playlist from a shared link. Discover is where the published ones end up.\n\nIt isn't one model in there, it's a chain of them, and every link has its own cost and its own ways of being subtly wrong. So I built an admin-only Lab that swaps the model behind each step independently and runs five configurations against the same brief at once. That's how a research pass went from about forty seconds down to five.\n\nIt runs on iPhone, iPad, Android, the web and natively on Mac. If you'd rather nothing left the house, point it at a local Ollama model, or let it use Apple's on-device models on iOS.",
    year: '2026',
    status: 'live',
    categories: ['apps'],
    highlights: [
      'Cites its sources: Wikipedia, Genius, Billboard, Rolling Stone',
      'Every track resolved against a live catalog, so the playlist plays',
      'Canvas: drag moods and eras around instead of describing them',
      'Blend: a few people, one link, one playlist',
      'Runs local through Ollama or Apple on-device models',
    ],
    tech: [
      'Expo',
      'React Native',
      'TypeScript',
      'FastAPI',
      'PostgreSQL',
      'pgvector',
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
    image: 'projects/beyond25/mac-canvas',
    gallery: [
      {
        name: 'projects/beyond25/mac-playlist-sources',
        alt: 'A finished Beyond25 playlist on Mac, with the sources it read listed above the track list and a one-tap save to Apple Music',
      },
      {
        name: 'projects/beyond25/mac-discover',
        alt: 'The Beyond25 Discover feed on Mac, browsing playlists other people have published',
      },
      {
        name: 'projects/beyond25/ios-blend',
        alt: 'A Beyond25 Blend on iPhone, where several people feed one playlist from a shared link',
      },
      {
        name: 'projects/beyond25/mac-local-ai',
        alt: 'Beyond25 settings on Mac, pointed at a local Ollama model instead of the cloud',
      },
      {
        name: 'projects/beyond25/mac-music-services',
        alt: 'Beyond25 music service settings on Mac, with Apple Music and YouTube Music connected',
      },
    ],
    weight: 1,
    featured: true,
  },

  {
    slug: 'ourlee',
    name: 'Ourlee',
    tagline: 'One private space for a couple, or a whole household.',
    summary:
      "A shared calendar, photo library, notes, prayer log and location map for two people, or now for a household of up to fifty. No feed, no discovery, nobody in it you didn't invite. It exists because I didn't like any of the apps built for couples, and because my partner is on Android while I'm on iOS.",
    story:
      "I didn't like any of the couples apps. The interfaces are rough, and the decent ones want real money for what is basically a shared calendar. So I built the one I wanted.\n\nThe constraint that shaped everything: I'm on iOS, my partner is on Android, and it had to be identical on both from day one. One Expo and React Native Web codebase goes to iOS, Android and the web against a FastAPI backend.\n\nIt's grown past couples. A household is now two to fifty people with roles, so a family can use it, and you can turn a couple into a family and back without losing anything. Some things stay two-person on purpose. Private Messages and In Step, the cooperative game, both refuse cleanly on a household bigger than two rather than half-working and being strange about it.\n\nWhat's in it: a shared calendar that syncs both ways with Google, Apple CalDAV and ICS, a shared photo library, notes with markdown and scripture references, goals with milestones, plans, a prayer log, live location, nine home-screen widgets, and a faith layer with a daily verse and multi-day devotionals. There's no AI in it anywhere, which was a decision rather than an oversight. The verses and devotionals are written by people.\n\nIt's in closed beta on TestFlight and Google Play. The public site says coming soon until the billing cutover is finished.",
    year: '2026',
    status: 'beta',
    categories: ['apps'],
    highlights: [
      'Households of two to fifty, switchable between couple and family',
      'Calendar syncs both ways with Google, Apple CalDAV and ICS',
      'Shared photos, notes, goals, plans, prayer log and live location',
      'Nine native home-screen widgets across iOS and Android',
      'No AI anywhere in it, no ads, no third-party analytics',
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
    links: [{ label: 'ourlee.app', href: 'https://www.ourlee.app', primary: true }],
    image: 'projects/ourlee/home',
    gallery: [
      {
        name: 'projects/ourlee/together',
        alt: 'The Ourlee Together tab, with the distance between two partners on a map, the shared photo library, plans and goals',
      },
      {
        name: 'projects/ourlee/faith',
        alt: "Ourlee's Faith tab, showing the daily verse, a pray-together session and multi-day devotionals",
      },
      {
        name: 'projects/ourlee/calendar',
        alt: 'The Ourlee shared calendar in month view, with events from both partners colored by owner',
      },
      {
        name: 'projects/ourlee/prayer-log',
        alt: 'The Ourlee prayer log, with prayers tagged as petition, thanksgiving or intercession and one marked answered',
      },
      {
        name: 'projects/ourlee/notes',
        alt: 'The Ourlee note editor, with a markdown toolbar and inline scripture references',
      },
      {
        name: 'projects/ourlee/themes',
        alt: 'The Ourlee theme store, previewing a theme across the whole app before applying it',
      },
    ],
    weight: 2,
    featured: true,
    note: 'Closed beta on TestFlight and Google Play. Public launch is pending store billing setup.',
  },

  {
    slug: 'novaswift',
    name: 'NovaSwift',
    tagline: 'A space sim from 2002, rebuilt from scratch in Swift.',
    summary:
      "A ground-up rebuild of EV Nova, written in Swift so it runs natively on Mac, iPad, iPhone and Apple TV. Newtonian flight, the galaxy map, the mission system, co-op over Wi-Fi or Game Center, and an in-game plug-in store. It ships none of the original game's files. You bring your own copy.",
    story:
      "I played EV Nova constantly as a kid and it barely runs on anything modern. I set out to make it playable again. I did not expect that to mean writing an entire game engine, but that is what it turned out to mean.\n\nThe hard part isn't the flight physics or the rendering. It's that nobody wrote down how the original works. The ship AI lives in resource tables that had to be pulled apart and guessed at from the outside, by watching what the game actually did. That AI is still the weakest thing in here and I would rather say so than have someone find out.\n\nSomewhere in the middle of fixing a performance problem I built a fairly serious debug console: live frame timings broken down per subsystem, a command prompt, inspectors for ships and outfits and governments. It started as instrumentation and turned into the thing I use most.\n\nA Godot port for Linux and Windows is in progress on the side, sharing the same Swift engine underneath. Flight, combat and the HUD work there. Sound and the galaxy map don't yet, and nothing on those platforms has been verified anywhere but CI.\n\nMost of the engine, and the digging through resource formats behind it, was built working alongside Claude Code. I'd rather say that outright than have someone assume otherwise.",
    year: '2026',
    status: 'beta',
    categories: ['games', 'open-source'],
    highlights: [
      'Written from scratch in Swift, native on Mac, iPad, iPhone and Apple TV',
      'Velocity-Verlet flight, with the original inertialess hulls still right',
      'Ship AI reconstructed from reverse-engineered resource tables',
      'Co-op over local Wi-Fi or Game Center',
      'Debug console with per-subsystem frame timings',
    ],
    tech: [
      'Swift',
      'SwiftUI',
      'SpriteKit',
      'GameKit',
      'MultipeerConnectivity',
      'Godot',
      'SwiftPM',
    ],
    links: [
      {
        label: 'TestFlight beta',
        href: 'https://testflight.apple.com/join/3FBzwwq1',
        primary: true,
      },
      { label: 'Site', href: 'https://sirstig.github.io/NovaSwift/' },
      { label: 'GitHub', href: 'https://github.com/SirStig/NovaSwift' },
    ],
    image: 'projects/novaswift/presentation-modes',
    gallery: [
      {
        name: 'projects/novaswift/dev-console',
        alt: 'The NovaSwift debug console: a live engine log beside per-subsystem frame timings and a command prompt',
      },
      {
        name: 'projects/novaswift/story-guide',
        alt: 'The NovaSwift story guide, tracking progress through seven campaigns with locked steps and prerequisites',
      },
      {
        name: 'projects/novaswift/host-lobby',
        alt: 'Hosting a NovaSwift co-op lobby, with per-lobby rules for PvP, splash damage and permadeath',
      },
      {
        name: 'projects/novaswift/plugin-manager',
        alt: 'The NovaSwift plug-in manager, with community total conversions installed and reorderable',
      },
      {
        name: 'projects/novaswift/flight-hud',
        alt: 'NovaSwift flight on iPhone, with touch controls and the original metal status bar',
      },
      {
        name: 'projects/novaswift/galaxy-map',
        alt: 'The NovaSwift galaxy map, showing systems, hyperspace routes and government territory',
      },
    ],
    weight: 3,
    featured: true,
    note: 'Unofficial and unaffiliated. Ships no copyrighted game data. Bring your own copy.',
  },

  {
    slug: 'crucible',
    name: 'Crucible',
    tagline: 'Grades what an AI agent just wrote or drew, and names the fix.',
    summary:
      'An MCP server and CLI that checks game content an agent just generated, then hands back a specific named fix so it can try again. It never calls a model to do that. One tier is deterministic pattern and pixel analysis; the other hands the calling agent a named rubric item and records the verdict it comes back with.',
    story:
      'An agent writes a line of dialogue or draws a sprite, and that\'s usually where it stops, because "make it better" isn\'t an instruction a model can act on. Crucible turns it into a loop instead. Generate, check against named craft knowledge, get a specific fix, regenerate.\n\nThe prose side reads plain dialogue and flags the usual tells: said-bookisms, adjacent lines saying the same thing twice, stock phrases like "delve into" and "a tapestry of", and the balanced contrast template you start seeing everywhere once you look for it. One of those on its own is fine and gets logged as information. Three in the same file promotes every instance to a failure, because at that point it has stopped being a rhetorical choice and become a tic.\n\nSentence rhythm is the check I like most. It takes the coefficient of variation of words per sentence and warns when every line takes the same beat to read, which is what generated writing does. Under four sentences it says nothing at all rather than drawing a conclusion from too little data.\n\nThe visual side takes pixel art authored as SVG and rasterizes it with anti-aliasing off, which is the only thing that makes one SVG unit really be one pixel. Without that the detectors would be reading blur instead of a grid. Then it goes looking for banding, jaggies, stray fragments and sealed holes, and reports them at pixel coordinates. The banding check segments regions and measures how straight a shared border is, because a band and a border following a curved silhouette look identical if all you do is count colors.\n\nThe rubrics are JSON and they cite where they came from: Derek Yu on pixel art, Thomas and Johnston, James Gurney. There is no default style profile, deliberately. Ship one and every project that installs this starts sounding the same.',
    year: '2026',
    status: 'live',
    categories: ['open-source'],
    highlights: [
      'Deterministic tier needs no API key; the rubric tier the agent judges',
      'Catches stock phrasing, said-bookisms and balanced-contrast templates',
      'Sentence rhythm scored statistically rather than by keyword',
      'Pixel art rasterized with anti-aliasing off, so detectors read a real grid',
      "Agents can't raise their own iteration budget once a loop has started",
    ],
    tech: [
      'TypeScript',
      'Model Context Protocol',
      'Zod',
      'resvg',
      'Commander',
      'Vitest',
      'Node',
    ],
    links: [
      {
        label: 'npm',
        href: 'https://www.npmjs.com/package/crucible-mcp',
        primary: true,
      },
      { label: 'GitHub', href: 'https://github.com/SirStig/Crucible' },
    ],
    image: 'projects/crucible/cover',
    gallery: [
      {
        name: 'projects/crucible/prose-grade',
        alt: 'Crucible grading a scene of game dialogue, listing each finding with its line number and a specific fix',
      },
      {
        name: 'projects/crucible/sprite-findings',
        alt: 'Crucible grading a pixel-art sprite, reporting banding, jaggies and sealed holes at exact pixel coordinates',
      },
      {
        name: 'projects/crucible/foliage',
        alt: "Pixel-art foliage generated by Crucible's L-system presets, rendered at an exact pixel grid",
      },
    ],
    weight: 4,
    featured: true,
    liveVersion: { kind: 'npm', package: 'crucible-mcp' },
    note: 'MIT licensed. Node 22.12+. The folder on my machine still says CanvasLoop.',
  },

  {
    slug: 'yokedcache',
    name: 'YokedCache',
    tagline: 'One async API, five backends, and tags that really invalidate.',
    summary:
      "A Python caching library that came out of Project Yoked and outlived it. One async API behaves the same across in-process memory, Redis, Memcached, disk and SQLite. Tag a key, invalidate the tag, done. It's in the backend of nearly everything I ship now, including the client work.",
    story:
      "I was writing a cache layer inside Project Yoked and kept reading other people's caching libraries wondering why something this simple needed to be that complicated. So I pulled mine out, rebuilt it properly, and named it after the project it came from. Yoked, as in jacked.\n\nOne async-first API, identical across memory, Redis, Memcached, disk and SQLite. The memory backend needs no setup at all, so tests run without any infrastructure standing behind them.\n\nPast get and set it does the parts most libraries skip. Invalidation by tag or by pattern instead of only by key, so there's no hand-rolled cache-busting logic anywhere. SQLAlchemy helpers. Optional HTTP caching middleware for Starlette. Real observability through Prometheus, StatsD and OpenTelemetry.\n\nIt's the one library I reach for without thinking about it. EagleChair runs on it, Ourlee runs on it.",
    year: '2026',
    status: 'live',
    categories: ['open-source'],
    highlights: [
      'One API across memory, Redis, Memcached, disk and SQLite',
      'Invalidate by tag or by pattern, not just by key',
      'Memory backend needs no setup, so tests run with no infrastructure',
      'Prometheus, StatsD and OpenTelemetry built in',
      'Optional Starlette HTTP caching middleware',
    ],
    tech: [
      'Python',
      'asyncio',
      'Redis',
      'Memcached',
      'SQLAlchemy',
      'Starlette',
      'OpenTelemetry',
    ],
    links: [
      {
        label: 'Docs',
        href: 'https://sirstig.github.io/yokedcache/',
        primary: true,
      },
      { label: 'PyPI', href: 'https://pypi.org/project/yokedcache/' },
      { label: 'GitHub', href: 'https://github.com/SirStig/yokedcache' },
    ],
    image: 'projects/yokedcache',
    weight: 5,
    featured: true,
    liveVersion: { kind: 'pypi', package: 'yokedcache' },
    note: 'MIT licensed. Python 3.10+.',
  },

  {
    slug: 'encodeforge',
    name: 'EncodeForge',
    tagline: "An FFmpeg GUI that doesn't make you learn FFmpeg.",
    summary:
      'A free, open-source desktop app for encoding video, generating subtitles on your own machine, and renaming media from metadata. I run a Jellyfin server, FileBot was the only tool that was genuinely good at renaming, and it stopped there. Everything else was a pile of separate CLI tools.',
    story:
      "FileBot renames well and does nothing else. Jellyfin and Plex are both mediocre at re-encoding, compression and subtitles. The tools to do all of that properly already exist, FFmpeg and Whisper among them, but nothing free tied them together in one window.\n\nThe first version was JavaFX, picked so one codebase could go everywhere. It worked, and it was janky. Java is the language I first really got into coding with and I've grown to dislike writing it, so over a long stretch of spare time I rewrote the whole thing in Python with a PySide6 UI.\n\nWhat's there now: hardware encoding through NVENC, AMF, Quick Sync and VideoToolbox, subtitles generated locally with faster-whisper so nothing gets uploaded anywhere, and renaming that pulls from eight metadata sources with a manual picker for when it guesses wrong. It'll move, copy, hardlink or symlink files into a library layout and carry the sidecars along with them.\n\n0.5.0 is the first stable release of that rewrite, and it's worth being straight about what isn't done. The CLI can rename but can't encode yet. A few subtitle scrapers quietly break whenever the sites they scrape change. The macOS build is Apple Silicon only. Plenty left to do.",
    year: '2026',
    status: 'live',
    categories: ['open-source'],
    highlights: [
      'Hardware encoding via NVENC, AMF, Quick Sync and VideoToolbox',
      'Subtitles generated locally with faster-whisper. Nothing uploaded',
      'Eight metadata sources, with a manual picker when it guesses wrong',
      'Renames into a library layout: move, copy, hardlink or symlink',
      'Windows, macOS and Linux, with deb, rpm and AppImage builds',
    ],
    tech: ['Python', 'PySide6', 'Qt 6', 'FFmpeg', 'faster-whisper', 'Nuitka'],
    links: [
      {
        label: 'Download',
        href: 'https://github.com/SirStig/EncodeForge/releases',
        primary: true,
      },
      { label: 'Docs', href: 'https://sirstig.github.io/EncodeForge/' },
      { label: 'GitHub', href: 'https://github.com/SirStig/EncodeForge' },
    ],
    image: 'projects/encodeforge-encoder',
    gallery: [
      {
        name: 'projects/encodeforge-metadata',
        alt: 'EncodeForge previewing a rename, with original and suggested filenames side by side and the matching source shown per row',
      },
      {
        name: 'projects/encodeforge-subtitles',
        alt: 'EncodeForge generating subtitles locally, with per-provider availability and a language grid',
      },
    ],
    weight: 6,
    liveVersion: { kind: 'github-release', owner: 'SirStig', repo: 'EncodeForge' },
    note: 'MIT licensed.',
  },

  {
    slug: 'kickstart-exchange',
    name: 'Kickstart Exchange for Expo',
    tagline: 'A Swift-only banner SDK, installable from npm.',
    summary:
      "Kickstart Exchange is a free cross-promotion network for indie Apple apps: your app shows other people's banners and they show yours. The official SDK is SwiftUI and Swift Package Manager only, so React Native and Expo apps couldn't touch it. This hosts the real SwiftUI view inside your React tree instead of reimplementing it.",
    story:
      "The thing I wanted to avoid was reimplementing the banner. Redraw it in JS and I own every bug in it forever and I'm permanently behind whatever upstream ships next. So the package hosts the actual view through Expo's SwiftUI host and passes props straight down. Anything you don't set falls through to the SDK's own defaults rather than to something I picked.\n\nMost of the work was plumbing. CocoaPods won't let a dynamic pod depend on a static one, and ExpoModulesCore hard-codes itself static, so the one piece that has to be dynamic, the Swift Package Manager dependency, lives in its own pod and the Expo pod depends on that. The bridge itself is a single line: an `@_exported import` of the upstream module.\n\nThe bug I would never have guessed: hosting with content matching on both axes applies `fixedSize` horizontally, SwiftUI throws away the width React Native proposed and lays out at its ideal width instead, and Yoga writes that back into the tree. Any ad with a long enough title and the banner hangs off the side of the phone. Matching vertically only fixed it.\n\nOn Android it installs and does nothing, on purpose. The exchange only serves Apple platforms, so the Kotlin module is empty with a comment explaining why. That beats a build that breaks because the package is in the tree.",
    year: '2026',
    status: 'live',
    categories: ['open-source'],
    highlights: [
      "Hosts the official SwiftUI view, so upstream's fixes are your fixes",
      "Unset props fall through to the SDK's own defaults, not mine",
      "Split into two podspecs to get around CocoaPods' static linkage rule",
      'Android and web install cleanly and render nothing, deliberately',
    ],
    tech: [
      'TypeScript',
      'Swift',
      'SwiftUI',
      'Expo Modules API',
      'React Native',
      'CocoaPods',
      'Swift Package Manager',
      'Kotlin',
    ],
    links: [
      {
        label: 'npm',
        href: 'https://www.npmjs.com/package/react-native-kickstart-exchange',
        primary: true,
      },
      {
        label: 'GitHub',
        href: 'https://github.com/SirStig/react-native-kickstart-exchange',
      },
    ],
    image: 'projects/kickstart-exchange/cover',
    weight: 7,
    liveVersion: { kind: 'npm', package: 'react-native-kickstart-exchange' },
    note: 'MIT licensed. Unofficial, and not affiliated with Kickstart Exchange or the author of the SDK it wraps. iOS 18 and up.',
  },

  {
    slug: 'afriglyph',
    name: 'AfriGlyph',
    tagline: 'An AI-generated one-pager, rebuilt as a real site.',
    summary:
      'AfriGlyph sells a reactions API to African fintechs: one call after a payment succeeds returns culturally specific celebration art for the success screen. The founder had got a long way building the landing page with AI, but it was one 174KB HTML file. I rebuilt it as an Astro site, did the mobile layout properly, rewrote the copy and added the API code block.',
    story:
      "He'd got further on his own than most people do. The page looked decent on a desktop. It was also a single file with every style inline, no mobile navigation at all, two media queries, no skip link, no structured data and no share image.\n\nI rebuilt it as an Astro project: a layout, eleven components, a token file, one small script. Then the responsive work, which is most of what was actually wrong. A real hamburger menu with focus handling, a scroll lock and escape to close. Two media queries became six, including a tablet band that had been falling apart. Reduced motion is respected now, so the reveal animations and the glyph carousel simply don't run if you've asked for that.\n\nThe code block on the hero is mine. It shows the real POST and the real response, which for a developer-facing API is most of the pitch, and there wasn't one before.\n\nThen a pass over the copy: the hero, how it works, the in-app section, the pilot offer. It deploys from GitHub Actions to Pages on his domain.",
    year: '2026',
    status: 'live',
    categories: ['client'],
    highlights: [
      'Rebuilt a single 174KB HTML file as a component-based Astro site',
      'Real mobile nav: focus handling, scroll lock, escape to close',
      'Two media queries became six, including a tablet band that was broken',
      'Added the request and response code block on the hero',
      'Skip link, JSON-LD, canonical and share images that were all missing',
    ],
    tech: [
      'Astro',
      'TypeScript',
      'CSS custom properties',
      'GitHub Actions',
      'GitHub Pages',
    ],
    links: [
      { label: 'afriglyph.com', href: 'https://afriglyph.com', primary: true },
      { label: 'GitHub', href: 'https://github.com/SirStig/afriglyph' },
    ],
    image: 'projects/afriglyph/home',
    gallery: [
      {
        name: 'projects/afriglyph/in-app',
        alt: 'The AfriGlyph in-app section, showing a glyph playing on a payment success screen beside four supporting points',
      },
      {
        name: 'projects/afriglyph/how-it-works',
        alt: 'The AfriGlyph how-it-works section, walking through the single API call made after a transaction',
      },
      {
        name: 'projects/afriglyph/mobile',
        alt: 'The AfriGlyph hero at phone width, with the rebuilt responsive layout and the API code block below it',
      },
      {
        name: 'projects/afriglyph/mobile-nav',
        alt: 'The AfriGlyph mobile menu open, the navigation that the original single-file page had no version of',
      },
    ],
    weight: 8,
    featured: true,
    note: 'Built free for the founder. The product and the business are his.',
  },

  {
    slug: 'eaglechair',
    name: 'EagleChair',
    tagline: 'A B2B catalog and quoting platform for a seating manufacturer.',
    summary:
      'Contract work: the whole thing behind a commercial seating manufacturer. Companies register, browse the catalog, build a cart of configured products and submit a quote. Behind that sits an admin panel with tiered pricing, a CMS, and a PDF catalog importer that stages whatever it parses so a person can check it before it goes live.',
    story:
      "The brief was a catalog and a quote flow. It turned into roughly 300 endpoints and around fifty models, because a B2B furniture order has considerably more moving parts than a shopping cart.\n\nAccounts are companies rather than people, each with a pricing tier, shipping addresses and an approval state. Quotes carry attachments, history, several shipping destinations and per-item allocations. Admin staff are a separate auth system entirely, with their own token type, passkeys and TOTP.\n\nThe part I enjoyed most is the catalog importer. Their product data lives in PDFs. It parses layout text with pdfplumber, pulls images with PyMuPDF, and writes everything into staging tables so somebody reviews it before it becomes real products. There's also a Gemini-backed assistant in the admin panel for searching their own catalog and documents.\n\nIt caches on YokedCache, which is my own library, so this is the first place that ended up in something a client pays for.",
    year: '2026',
    status: 'in-development',
    categories: ['client'],
    highlights: [
      'Around 300 endpoints, with company accounts rather than user accounts',
      'Quote cart with configured options, attachments and multi-destination shipping',
      'PDF catalog importer that stages parsed products for human review',
      'Passkeys and TOTP for admin staff, on a separate auth system',
      'Tiered B2B pricing, plus a CMS behind everything on the public site',
    ],
    tech: [
      'FastAPI',
      'Python',
      'React',
      'Vite',
      'MySQL',
      'SQLAlchemy',
      'Redis',
      'Tailwind',
    ],
    links: [
      { label: 'Preview', href: 'https://joshua.eaglechair.com/', primary: true },
    ],
    image: 'projects/eaglechair-homepage',
    gallery: [
      {
        name: 'projects/eaglechair-catalog',
        alt: 'The EagleChair product catalog, filtered by category with configurable options per product',
      },
    ],
    weight: 9,
    note: "Contract work, still in progress. The preview is a staging build, not the client's live site.",
  },

  {
    slug: 'project-yoked',
    name: 'Project Yoked',
    tagline: "The most ambitious thing I've built. It's off, not gone.",
    summary:
      "An all-in-one fitness platform: workout tracking, a short-form video feed, nutrition, per-muscle recovery modeling against an anatomical diagram, AI coaching, an Apple Watch app and a trail mapping system. I was co-founder and CTO and built the stack. It's shut down now. The marketing site still loads, the platform behind it doesn't.",
    story:
      "Project Yoked was meant to replace half a dozen fitness subscriptions with one app. A workout library and tracker, a reels feed, social, gamification, analytics, nutrition, and a Recovery Engine that modeled fatigue per muscle group against an interactive anatomical diagram. On top of that an Apple Watch app, home-screen widgets, Quick Actions, and near the end a whole trails system running self-hosted Nominatim for geocoding.\n\nI owned the stack. FastAPI backend, React on the web, React Native on mobile, plus the architecture, the infrastructure and the deploys.\n\nIt's shut down and I'm not going to dress that up. It was too much surface area for the team behind it. The marketing site still loads because it was served off the same backend, so you can go and look, but nothing behind it works and the signup buttons go nowhere.\n\nI could turn it back on. Almost everything I do well now I learned building this, and two libraries fell out of it and outlived it: YokedCache, which I still use every day, and the Expo Media Engine.",
    year: '2025',
    status: 'shut-down',
    categories: ['apps'],
    highlights: [
      'Full stack owned end to end: backend, web, mobile, infrastructure',
      'Per-muscle Recovery Engine against an interactive anatomical diagram',
      'Apple Watch app, home-screen widgets and Quick Actions',
      'Trail mapping and cardio on self-hosted Nominatim geocoding',
      'Spun out two libraries that are still published today',
    ],
    tech: [
      'FastAPI',
      'Python',
      'React',
      'React Native',
      'PostgreSQL',
      'PostGIS',
      'Celery',
      'Redis',
    ],
    links: [
      {
        label: 'projectyoked.com',
        href: 'https://www.projectyoked.com',
        primary: true,
      },
    ],
    image: 'projects/projectyoked',
    gallery: [
      {
        name: 'projects/projectyoked/Recovery1.1.4',
        alt: "Project Yoked's Recovery Engine, showing per-muscle fatigue on an interactive anatomical diagram",
      },
      {
        name: 'projects/projectyoked/AProCoachInYourPocket',
        alt: 'The Project Yoked AI coach, generating a workout from a conversation',
      },
      {
        name: 'projects/projectyoked/cardio',
        alt: 'Project Yoked cardio and trail tracking, with a recorded route on a map',
      },
      {
        name: 'projects/projectyoked/SocialWithSUbstance',
        alt: 'The Project Yoked social feed, mixing short-form video with logged workouts',
      },
    ],
    weight: 10,
    note: 'Shut down. The marketing site still loads, the platform behind it does not. Nothing there will sign you up.',
  },

  {
    slug: 'expo-media-engine',
    name: 'Expo Media Engine',
    tagline: 'Video editing in Expo, without the per-year license.',
    summary:
      'A native video editing engine for Expo. Multi-track timeline, waveforms, filters, transitions and a real-time preview renderer, running over AVFoundation on iOS and MediaCodec on Android, with no proprietary SDK behind it.',
    story:
      "Project Yoked needed real editing, closer to CapCut than to a trim tool. Every option for React Native was one of three bad ones: FFmpeg running on-device, which is buggy, enormous and has since been deprecated for this kind of use; a handful of open-source libraries with almost no features; or a proprietary SDK that costs thousands a year to license. None of it fit, so I wrote the engine myself in native code.\n\nThe goal was the whole picture in one package. Multi-track composition, waveforms, audio mixing, overlays, filters, transitions, and its own real-time renderer for preview, export and compression, all behind a single Expo module over AVFoundation on iOS and MediaCodec with OpenGL ES on Android.\n\nIt's been on hiatus since Project Yoked shut down. The core still mostly works, last time I looked. It doesn't make any money, so it gets whatever time is left over, which lately has been none. Ourlee still has it installed.",
    year: '2026',
    status: 'archived',
    categories: ['open-source'],
    highlights: [
      'Multi-track composition with real-time preview',
      'Nine filters and eight transitions',
      'Native AVFoundation and MediaCodec, with no proprietary SDK',
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
        label: 'Docs',
        href: 'https://sirstig.github.io/projectyoked-expo-media-engine/',
        primary: true,
      },
      {
        label: 'GitHub',
        href: 'https://github.com/SirStig/projectyoked-expo-media-engine',
      },
    ],
    image: 'projects/expo-media-engine',
    weight: 11,
    liveVersion: { kind: 'npm', package: '@projectyoked/expo-media-engine' },
    note: 'MIT licensed. Needs a dev build, not Expo Go. On hiatus, and the current release is an alpha.',
  },

  {
    slug: 'rlr-project',
    name: 'The RLR Project',
    tagline: 'One of the first things I built. Kept for the record.',
    summary:
      "One of my first serious game builds. Long finished. It's here because pretending you started good helps nobody.",
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
      "A Windows app that generated Game Dev Tycoon mods from a visual editor, so you didn't have to write the JavaScript by hand. Long dead, still on GitHub.",
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

/**
 * The project either side of this one, in the order the work index shows them.
 * Archive entries are excluded on both sides: landing on a 2016 WinForms app
 * as the thing after a live product reads as the site having run out.
 */
export const adjacentProjects = (slug: string) => {
  const list = allProjects.filter((p) => p.weight < ARCHIVE_WEIGHT);
  const i = list.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return { prev: list[i - 1], next: list[i + 1] };
};
