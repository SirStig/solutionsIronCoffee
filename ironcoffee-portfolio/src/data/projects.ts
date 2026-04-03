export interface ProjectStatus {
  label: string;
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export type ProjectLiveStatus =
  | { kind: 'pypi'; package: string }
  | { kind: 'npm'; package: string }
  | { kind: 'github-release'; owner: string; repo: string };

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
  /** Shields.io or similar image URL; shown linking to GitHub Releases when githubUrl is set */
  downloadsBadgeUrl?: string;
  /** When set, status chip label is fetched at runtime; `status.label` is fallback if the request fails */
  liveStatus?: ProjectLiveStatus;
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
    image: `${base}images/projects/yoked.png`,
    video: `${base}videos/app-overview-montage.mp4`,
    images: [
      `${base}images/projects/yoked.png`,
      `${base}images/projects/projectyoked/AProCoachInYourPocket.png`,
      `${base}images/projects/projectyoked/MainSplitLeft.png`,
      `${base}images/projects/projectyoked/MainSplitRight.png`,
      `${base}images/projects/projectyoked/2.6Food700Exercises.png`,
      `${base}images/projects/projectyoked/SocialWithSUbstance.png`,
      `${base}images/projects/projectyoked/Recovery1.1.4.png`,
      `${base}images/projects/projectyoked/YourJourneyReplayed.png`
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
    image: `${base}images/projects/eaglechair-homepage.png`,
    images: [
      `${base}images/projects/eaglechair-homepage.png`,
      `${base}images/projects/eaglechair-catalog.png`,
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
      'Your AI music curator (in development). Describe what you want to hear—the AI researches, curates, and builds playlists you can sync to Apple Music or YouTube Music, or use Lite mode with no music account (catalog metadata, previews, and links). Spotify connect, search, and save are not available to most users: Spotify\'s extended API path effectively requires very large scale (on the order of ~250K MAU). Premium Gemini research, larger playlists, and optional local Ollama are part of the product as web checkout and the App Store release ship.',
    longDescription:
      'Beyond25 is an AI-powered music curator built with Expo and React Native (TypeScript), targeting native and web from one codebase. You describe the vibe; the app researches tracks, curates, and delivers playlists through chat and dedicated curation flows. Link Apple Music for full curation against your catalog, library context, and one-tap saves, or sign in with Google for YouTube Music to save playlists, like videos, and use your YouTube playlists or liked videos as chat context. Lite mode needs no music service: you still get AI playlists and public catalog metadata, with previews where Apple or other APIs allow, and library save stays off until you connect. Spotify connect, search, and save are not available to the general public because Spotify keeps third-party apps in restricted developer access until they qualify for extended API use—requirements that imply very large active audiences (roughly on the order of ~250K MAU). The app may still surface Spotify in settings for transparency; authorized accounts may use it only for internal testing. Powered by Gemini (premium) with optional Ollama locally. Dark mode, no ads, no selling of your data. The marketing site at beyond-25.com is live for early access—users can create accounts and explore—but subscribing and buying credit packs on the web is not available yet, and the mobile app is not on the App Store. Preparing for full release.',
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
      'Marketing site — Early access signup, demo, features, and pricing story',
      'Curating — Premium flows to build playlists with clear progress and results',
      'Research — AI-driven discovery before tracks land in your mix',
      'Playlist in chat — Full playlists surfaced inline in the conversation',
      'Playlist detail — Review, edit, and save when Apple Music or YouTube Music is connected',
      'Music providers — Apple Music, YouTube Music, and transparency for Spotify restrictions',
      'Lite mode — No music account; previews, links, and catalog metadata until you connect',
      'Local AI — Ollama for curation without spending cloud credits',
      'Voice input — Mic instead of typing where supported',
      'Dark mode, no ads, no selling of your data',
      'Pricing: credit packs and subscriptions planned; web checkout and App Store release still in progress',
    ],
    image: `${base}images/projects/beyond25/marketing-site.png`,
    images: [
      `${base}images/projects/beyond25/marketing-site.png`,
      `${base}images/projects/beyond25/curating.png`,
      `${base}images/projects/beyond25/researching.png`,
      `${base}images/projects/beyond25/playlist-in-chat.png`,
      `${base}images/projects/beyond25/playlist-detail.png`,
      `${base}images/projects/beyond25/settings-music-providers.png`,
      `${base}images/projects/beyond25/ollama-provider.png`,
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
      'MIT-licensed native video composition for Expo on iOS and Android. Multi-track timeline, frame-accurate live preview (AVPlayer / OpenGL ES), nine filters, eight transitions, full audio mixing with fades and keyframes, interactive Skia-ready overlays, and fast stitch plus H.264/H.265 export. Check npm for the current latest (pre-release) tag; pin @projectyoked/expo-media-engine@0.1.3 for the stable 0.1.x line. Built for and used in production in the Project Yoked app.',
    longDescription:
      'Expo Media Engine brings hardware-accelerated editing to React Native without proprietary SDKs or per-minute billing. The pre-release line on npm offers multi-track composition, preview that matches export, filters and transitions, multi-track audio with automation, useCompositionOverlays for Skia-aligned overlays, concatenation with transcoding fallback, and compression presets. The stable 0.1.x line focuses on basic single-video export and audio utilities—pin @projectyoked/expo-media-engine@0.1.3 if you want that track.',
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
    image: `${base}images/projects/expo-media-engine.png`,
    category: ['React Native', 'NPM Package', 'Media Processing'],
    status: { label: 'npm latest', color: 'info' },
    liveStatus: { kind: 'npm', package: '@projectyoked/expo-media-engine' },
    npmUrl: 'https://www.npmjs.com/package/@projectyoked/expo-media-engine',
    githubUrl: 'https://github.com/SirStig/projectyoked-expo-media-engine',
    docsUrl: 'https://sirstig.github.io/projectyoked-expo-media-engine/',
  },
  {
    id: 4,
    slug: 'yokedcache',
    title: 'YokedCache',
    description:
      'On PyPI. Production-oriented Python caching for FastAPI: Redis-backed storage with tag-aware auto-invalidation, decorators and dependencies that fit existing endpoints, and multi-backend routing across Redis, Memcached, memory, disk, and SQLite. Includes resilience patterns (circuit breaker, retries, stale-if-error), HTTP caching middleware (ETag, Cache-Control), Prometheus/StatsD metrics, optional vector-style cache helpers, and a CLI for keys, stats, and health.',
    longDescription:
      'YokedCache is a stable, production-oriented library on PyPI. It is designed so you do not have to bolt on a separate documentation stack to operate it in production: clear hooks for invalidation, observability, and degradation under load. Use it to cut database pressure and speed up API responses while keeping invalidation predictable. Install with pip install yokedcache; full guides and API reference live on the documentation site.',
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
    image: `${base}images/projects/yokedcache.png`,
    category: ['Python Library', 'Backend', 'Performance'],
    status: { label: 'PyPI', color: 'success' },
    liveStatus: { kind: 'pypi', package: 'yokedcache' },
    liveUrl: 'https://pypi.org/project/yokedcache/',
    liveUrlLabel: 'PyPI',
    githubUrl: 'https://github.com/SirStig/yokedcache',
    docsUrl: 'https://sirstig.github.io/yokedcache/',
  },
  {
    id: 3,
    slug: 'encodeforge',
    title: 'EncodeForge',
    description:
      'Open-source desktop FFmpeg GUI for Windows, macOS, and Linux: GPU batch encoding (NVENC, AMF, Quick Sync, VideoToolbox), local AI subtitles via faster-whisper, and smart renaming from TMDB, TVDB, AniDB, and more — Fluent Design UI with PySide6.',
    longDescription:
      'EncodeForge is a free MIT-licensed desktop app that pairs a Fluent Design interface (PySide6 / PyQt-Fluent-Widgets) with FFmpeg, Nuitka-built binaries, and local faster-whisper transcription — no cloud required for subtitles. Queue encodes, normalize audio, pull subtitles from multiple providers as fallback, and preview metadata-driven renames before applying. Downloads and docs live on the project site; releases ship on GitHub.',
    technologies: [
      'Python',
      'PySide6',
      'PyQt-Fluent-Widgets',
      'FFmpeg',
      'faster-whisper',
      'Nuitka',
      'Qt 6',
    ],
    features: [
      'Hardware-accelerated batch encoding (NVENC, AMF, Quick Sync, VideoToolbox)',
      'Local AI subtitles with faster-whisper (90+ languages), plus multi-provider download fallback',
      'Smart renaming from TMDB, TVDB, AniDB, Kitsu, Jikan, TVmaze, and more with preview',
      'Dark and light themes, queue management, and exportable logs',
    ],
    image: `${base}images/projects/encodeforge-encoder.png`,
    images: [
      `${base}images/projects/encodeforge-encoder.png`,
      `${base}images/projects/encodeforge-metadata.png`,
      `${base}images/projects/encodeforge-subtitles.png`
    ],
    category: ['Desktop App', 'AI', 'Media Processing'],
    status: { label: 'Release', color: 'info' },
    liveStatus: { kind: 'github-release', owner: 'SirStig', repo: 'EncodeForge' },
    liveUrl: 'https://sirstig.github.io/EncodeForge/',
    liveUrlLabel: 'Website',
    githubUrl: 'https://github.com/SirStig/EncodeForge',
    downloadsBadgeUrl:
      'https://img.shields.io/github/downloads/SirStig/EncodeForge/total?style=flat-square&label=downloads',
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
    image: `${base}images/projects/financial.png`,
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
    image: `${base}images/projects/rlr.png`,
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
    image: `${base}images/projects/gamedev-mod.png`,
    status: { label: 'Old Project', color: 'error' },
    category: ['Desktop App'],
    githubUrl: 'https://github.com/SirStig/Ultimate-Mod-Maker'
  }
];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);
