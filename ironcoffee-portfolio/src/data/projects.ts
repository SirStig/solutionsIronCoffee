export interface ProjectStatus {
  label: string;
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  images?: string[];
  video?: string;
  category: string[];
  status?: ProjectStatus;
  isPrivate?: boolean;
  liveUrl?: string;
  liveUrlLabel?: string;
  githubUrl?: string;
  docsUrl?: string;
  npmUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  longDescription?: string;
  features?: string[];
  software?: string[];
  languages?: string[];
  githubPrivate?: boolean;
}

const base = import.meta.env.BASE_URL;

export const projects: Project[] = [
  {
    id: 1,
    slug: 'project-yoked',
    title: 'Project Yoked',
    description: 'Revolutionary fitness social platform featuring AI-powered content moderation, Instagram-style interactions, comprehensive fitness tracking, personalized progress analytics, and virtual personal training. Leading development as CEO/Founder of Project Yoked LLC, creating the future of connected fitness experiences.',
    longDescription: 'Project Yoked is a full-featured fitness social platform built from the ground up. Beyond core social and fitness tracking, it includes home screen Widgets, Quick Actions for fast logging, and an Apple Watch app for on-the-go tracking. The trails system offers AllTrails-style discovery and mapping, while the cardio system provides Strava-like activity tracking and analytics.',
    technologies: [
      'React.js',
      'React Native',
      'Swift',
      'Xcode',
      'TypeScript',
      'AWS CLI',
      'AWS',
      'FastAPI',
      'Python',
      'PostgreSQL'
    ],
    features: [
      'AI-powered content moderation',
      'Instagram-style social interactions',
      'Home screen Widgets',
      'Quick Actions for fast logging',
      'Apple Watch App (In Progress)',
      'Full trails system (AllTrails-style)',
      'Full cardio system (Strava-style)',
      'Comprehensive fitness tracking',
      'Personalized progress analytics',
      'Virtual personal training'
    ],
    image: `${base}/images/projects/yoked.png`,
    video: `${base}/videos/app-overview-montage.mp4`,
    images: [
      `${base}/images/projects/yoked.png`,
      `${base}/images/projects/projectyoked/AProCoachInYourPocket.png`,
      `${base}/images/projects/projectyoked/MainSplitLeft.png`,
      `${base}/images/projects/projectyoked/MainSplitRight.png`,
      `${base}/images/projects/projectyoked/2.6Food700Exercises.png`,
      `${base}/images/projects/projectyoked/SocialWithSUbstance.png`,
      `${base}/images/projects/projectyoked/Recovery1.1.4.png`,
      `${base}/images/projects/projectyoked/YourJourneyReplayed.png`
    ],
    category: ['Mobile App', 'Web App', 'AI'],
    status: { label: 'Live', color: 'success' },
    liveUrl: 'https://www.projectyoked.com',
    liveUrlLabel: 'Website',
    appStoreUrl: 'https://apps.apple.com/us/app/project-yoked/id6747534923',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.projectyoked.mobile',
    isPrivate: true,
  },
  {
    id: 2,
    slug: 'eaglechair',
    title: 'EagleChair Digital Flagship',
    description: 'End-to-end commerce experience for a premium furniture brand featuring a FastAPI backend with JWT auth, async PostgreSQL, Redis caching, and a modern React storefront focused on product storytelling and conversions.',
    technologies: [
      'FastAPI',
      'Python',
      'PostgreSQL',
      'Redis',
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS'
    ],
    image: `${base}/images/projects/eaglechair-homepage.png`,
    images: [
      `${base}/images/projects/eaglechair-homepage.png`,
      `${base}/images/projects/eaglechair-catalog.png`,
      `${base}/images/projects/eaglechair-product-dropdown.png`
    ],
    category: ['Web App', 'E-commerce'],
    status: { label: 'In Development', color: 'warning' },
    liveUrl: 'https://joshua.eaglechair.com/',
    githubPrivate: true,
  },
  {
    id: 9,
    slug: 'beyond25',
    title: 'Beyond25',
    description:
      'AI-curated music discovery (in development). Describe what you want to hear and get playlists with reasoning—connect Apple Music or YouTube Music to save to your library, or use Lite mode with no music account (catalog metadata, previews, and links). Spotify is not offered for most users: Spotify\'s public API path effectively requires very large scale (on the order of ~250K MAU) before extended access. Premium Gemini research and larger playlists, plus optional local Ollama, are part of the product vision as the app and full checkout ship.',
    longDescription:
      'Beyond25 is built with Expo and React Native (TypeScript), targeting native and web from one codebase. It turns plain-language vibes into playlists through chat and curation flows. Link Apple Music for full curation against your catalog, library context, and one-tap saves, or sign in with Google for YouTube Music to save playlists, like videos, and use your YouTube playlists or liked videos as chat context. Lite mode needs no music service: you still get AI playlists and public catalog metadata, with previews where Apple or other APIs allow, and library save stays off until you connect. Spotify connect, search, and save are not available to the general public because Spotify keeps third-party apps in restricted developer access until they qualify for extended API use—requirements that imply very large active audiences (roughly on the order of ~250K MAU). The app may still surface Spotify in settings for transparency; authorized accounts may use it only for internal testing. Powered by Gemini (premium) with optional Ollama locally. Dark mode, no ads, no selling of your data. The marketing site is live for early access—users can create accounts and explore—but subscribing and buying credit packs on the web is not available yet, and the mobile app is not released on the App Store. Still preparing for full release.',
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'Gemini',
      'Ollama',
      'Apple Music API',
      'YouTube Music',
      'Google Sign-In',
      'Sign in with Apple',
    ],
    features: [
      'Playlists — Describe your vibe; AI builds your mix in seconds',
      'Discover — Chat with AI to find songs and artists',
      'Curating — Premium Gemini research for deeper playlist builds',
      'Edit and save — Apple Music or YouTube Music when connected',
      'Lite mode — No music account; previews, links, and catalog metadata until you connect',
      'Local AI — Ollama for free curation without spending credits',
      'Voice input — Use the mic instead of typing',
      'Dark mode, no ads, no selling of your data',
      'Pricing: credit packs and subscriptions planned; web checkout and App Store release still in progress',
    ],
    image: `${base}/images/projects/beyond25/CreatePlaylistsInSeconds.png`,
    images: [
      `${base}/images/projects/beyond25/CreatePlaylistsInSeconds.png`,
      `${base}/images/projects/beyond25/DiscoverSongs&Artists.png`,
      `${base}/images/projects/beyond25/Spotify&AppleMusic.png`,
      `${base}/images/projects/beyond25/CreatePlaylistsWithThousandsOfSongs.png`,
      `${base}/images/projects/beyond25/SplitImage1.png`,
      `${base}/images/projects/beyond25/SplitImage2.png`,
      `${base}/images/projects/beyond25/PlaylistsChat.png`,
      `${base}/images/projects/beyond25/Curating.png`
    ],
    category: ['Mobile App', 'AI', 'Music'],
    status: { label: 'Preparing for Release', color: 'info' },
    liveUrl: 'https://www.beyond-25.com',
    liveUrlLabel: 'Website',
  },
  {
    id: 8,
    slug: 'expo-media-engine',
    title: 'Expo Media Engine',
    description:
      'MIT-licensed native video composition for Expo on iOS and Android. Multi-track timeline, frame-accurate live preview (AVPlayer / OpenGL ES), nine filters, eight transitions, full audio mixing with fades and keyframes, interactive Skia-ready overlays, and fast stitch plus H.264/H.265 export. npm latest is 1.0.0-alpha-3 (pre-release line); pin @projectyoked/expo-media-engine@0.1.3 for the stable 0.1.x line. Built for and used in production in the Project Yoked app.',
    longDescription:
      'Expo Media Engine brings hardware-accelerated editing to React Native without proprietary SDKs or per-minute billing. The pre-release line on npm (latest 1.0.0-alpha-3) offers multi-track composition, preview that matches export, filters and transitions, multi-track audio with automation, useCompositionOverlays for Skia-aligned overlays, concatenation with transcoding fallback, and compression presets. The stable 0.1.x line focuses on basic single-video export and audio utilities—pin @projectyoked/expo-media-engine@0.1.3 if you want that track.',
    technologies: [
      'Expo',
      'Expo Modules API',
      'React Native',
      'TypeScript',
      'JavaScript',
      'Swift',
      'Kotlin',
      'AVFoundation',
      'Core Image',
      'MediaCodec',
      'OpenGL ES 2.0',
    ],
    features: [
      'Multi-track video, audio, text, and image layers with timing and transforms',
      'Live preview aligned with export (iOS AVPlayer, Android OpenGL ES 2.0)',
      'Nine filters and eight transitions with adjustable duration',
      'Multi-track audio mixing, fades, and keyframe volume automation',
      'useCompositionOverlays hook for interactive overlays in Skia space',
      'Stitch and compress with H.264/H.265 presets; MIT-licensed Swift and Kotlin',
    ],
    image: `${base}/images/projects/expo-media-engine.png`,
    category: ['React Native', 'NPM Package', 'Media Processing'],
    status: { label: 'npm latest: 1.0.0-alpha-3', color: 'info' },
    npmUrl: 'https://www.npmjs.com/package/@projectyoked/expo-media-engine',
    githubUrl: 'https://github.com/SirStig/projectyoked-expo-media-engine',
    docsUrl: 'https://sirstig.github.io/projectyoked-expo-media-engine/',
  },
  {
    id: 4,
    slug: 'yokedcache',
    title: 'YokedCache',
    description:
      'Version 1.0.0 on PyPI. Production-oriented Python caching for FastAPI: Redis-backed storage with tag-aware auto-invalidation, decorators and dependencies that fit existing endpoints, and multi-backend routing across Redis, Memcached, memory, disk, and SQLite. Includes resilience patterns (circuit breaker, retries, stale-if-error), HTTP caching middleware (ETag, Cache-Control), Prometheus/StatsD metrics, optional vector-style cache helpers, and a CLI for keys, stats, and health.',
    longDescription:
      'YokedCache 1.0.0 is a full stable release on PyPI. It is designed so you do not have to bolt on a separate documentation stack to operate it in production: clear hooks for invalidation, observability, and degradation under load. Use it to cut database pressure and speed up API responses while keeping invalidation predictable. Install with pip install yokedcache; full guides and API reference live on the documentation site.',
    technologies: [
      'Python',
      'FastAPI',
      'Redis',
      'orjson',
      'PyYAML',
      'Click',
      'SQLAlchemy',
      'aiomcache',
      'diskcache',
      'aiosqlite',
      'Prometheus',
      'StatsD',
      'OpenTelemetry',
      'NumPy',
      'SciPy',
      'scikit-learn',
      'FuzzyWuzzy',
    ],
    features: [
      'Tag-aware invalidation and dependency-friendly cache patterns',
      'FastAPI-first decorators and injectable dependencies',
      'Multi-backend configuration: Redis, Memcached, memory, disk, SQLite',
      'Resilience: circuit breaker, retries, stale-if-error style behavior',
      'HTTP caching: ETag and Cache-Control middleware for 304-friendly APIs',
      'Observability: Prometheus, StatsD, and tracing-friendly cache spans',
      'Optional vector / similarity helpers and a CLI for inspection and health',
    ],
    image: `${base}/images/projects/yokedcache.png`,
    category: ['Python Library', 'Backend', 'Performance'],
    status: { label: 'v1.0.0', color: 'success' },
    liveUrl: 'https://pypi.org/project/yokedcache/',
    liveUrlLabel: 'PyPI',
    githubUrl: 'https://github.com/SirStig/yokedcache',
    docsUrl: 'https://sirstig.github.io/yokedcache/',
  },
  {
    id: 3,
    slug: 'encodeforge',
    title: 'EncodeForge',
    description: 'Cross-platform media processing suite combining hardware-accelerated video encoding, AI-powered subtitle generation with Whisper, and smart metadata-driven file renaming inside a polished desktop UI.',
    technologies: [
      'JavaFX',
      'Python',
      'FastAPI',
      'FFmpeg',
      'OpenAI Whisper',
      'PyTorch',
      'Docker'
    ],
    image: `${base}/images/projects/encodeforge-encoder.png`,
    images: [
      `${base}/images/projects/encodeforge-encoder.png`,
      `${base}/images/projects/encodeforge-metadata.png`,
      `${base}/images/projects/encodeforge-subtitles.png`
    ],
    category: ['Desktop App', 'AI', 'Media Processing'],
    status: { label: 'Public Release', color: 'success' },
    githubUrl: 'https://github.com/SirStig/EncodeForge'
  },
  {
    id: 5,
    slug: 'financial-project',
    title: 'Financial Project',
    description: 'Next-generation financial management platform with bank-level security, real-time transaction processing, and intelligent financial insights. Built with modern APIs for seamless payment integration and comprehensive financial tracking.',
    technologies: [
      'HTML',
      'CSS',
      'JavaScript',
      'Python',
      'FastAPI',
      'StripeAPI',
      'PlaidAPI',
      'PayPal API',
      'PostgreSQL',
      'SQLAlchemy'
    ],
    image: `${base}/images/projects/financial.png`,
    category: ['Web App', 'FinTech'],
    status: { label: 'Halted', color: 'warning' },
    isPrivate: true
  },
  {
    id: 6,
    slug: 'rlr-project',
    title: 'The RLR Project',
    description: 'Exciting arcade-style game inspired by the popular Starcraft 2 mini-game "Runling Run". A collaborative project showcasing Unity expertise, physics-based gameplay, and multiplayer networking features.',
    technologies: [
      'Unity',
      'C#',
      'Unity UI',
      'Unity Physics',
      'Unity Networking'
    ],
    image: `${base}/images/projects/rlr.png`,
    status: { label: 'Old Project', color: 'error' },
    category: ['Game Development']
  },
  {
    id: 7,
    slug: 'game-dev-tycoon-mod-maker',
    title: 'Game Dev Tycoon Mod Maker',
    description: 'Powerful modding toolkit for Game Dev Tycoon that empowers creators to build custom content, modify game mechanics, and extend gameplay. Features an intuitive interface for seamless mod development and community sharing.',
    technologies: [
      '.NET',
      'C#',
    ],
    image: `${base}/images/projects/gamedev-mod.png`,
    status: { label: 'Old Project', color: 'error' },
    category: ['Desktop App'],
    githubUrl: 'https://github.com/SirStig/Ultimate-Mod-Maker'
  }
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
