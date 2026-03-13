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
  npmUrl?: string;
  appStoreUrl?: string;
  playStoreUrl?: string;
  longDescription?: string;
  features?: string[];
  software?: string[];
  languages?: string[];
  githubPrivate?: boolean;
}

const base = process.env.PUBLIC_URL || '';

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
    description: 'AI-curated music discovery. Tell Beyond25 what you\'re in the mood for—a genre, a feeling, an activity—and get playlists tailored to you. Chat with AI, get 20+ track playlists with reasoning, save to Apple Music or Spotify with one tap, and use voice input instead of typing.',
    longDescription: 'Beyond25 is an AI-powered music discovery app that lets you find music through conversation. Describe your vibe in plain language—"Chill lo-fi for studying," "Upbeat indie for a road trip," "Songs that sound like [artist]"—and AI creates playlists of 20+ tracks with titles and reasoning for each pick. Save playlists to Apple Music or Spotify with one tap. Use voice input to describe what you want. Powered by Gemini with optional local AI via Ollama. Dark mode, no ads, no selling of your data. Free to start with 50 credits.',
    technologies: [
      'Swift',
      'Xcode',
      'iOS',
      'Gemini',
      'Ollama',
      'Apple Music API',
      'Spotify API',
      'Sign in with Apple'
    ],
    features: [
      'Chat with AI — Describe your vibe in plain language',
      'Get playlists — AI creates 20+ tracks with titles and reasoning',
      'Save to your library — Add to Apple Music or Spotify with one tap',
      'Voice input — Use the mic instead of typing',
      'AI-powered discovery using Gemini',
      'Optional local AI via Ollama (free, no credits)',
      'Dark mode',
      'No ads, no selling of your data',
      'Free credits on sign-up'
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
    liveUrl: 'https://beyond-25.com',
    liveUrlLabel: 'Website',
  },
  {
    id: 8,
    slug: 'expo-media-engine',
    title: 'Expo Media Engine',
    description: 'Professional React Native Expo module for video composition and editing. Features native hardware-accelerated video processing with text/emoji overlays, audio extraction, waveform generation, and audio mixing. Built with the Expo Modules API using AVFoundation (iOS) and MediaCodec (Android) for optimal performance. Created for Project Yoked.',
    technologies: [
      'React Native',
      'Expo',
      'TypeScript',
      'Swift',
      'Kotlin',
      'AVFoundation',
      'MediaCodec',
      'NPM'
    ],
    image: `${base}/images/projects/expo-media-engine.png`,
    category: ['React Native', 'NPM Package', 'Media Processing'],
    status: { label: 'Public Release', color: 'success' },
    npmUrl: 'https://www.npmjs.com/package/@projectyoked/expo-media-engine',
    githubUrl: 'https://github.com/SirStig/projectyoked-expo-media-engine'
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
    id: 4,
    slug: 'yokedcache',
    title: 'YokedCache',
    description: 'High-performance Python cache library with intelligent auto-invalidation, multi-backend support, and seamless FastAPI/SQLAlchemy integration. Features advanced capabilities like vector similarity search, production monitoring with Prometheus/StatsD, and comprehensive CLI tools. Delivers 60-90% database load reduction and 200-500ms faster response times.',
    technologies: [
      'Python',
      'Redis',
      'FastAPI',
      'SQLAlchemy',
      'Memcached',
      'Async/Await',
      'Prometheus',
      'StatsD',
      'PyPI',
      'CLI Tools'
    ],
    image: `${base}/images/projects/yokedcache.png`,
    category: ['Python Library', 'Backend', 'Performance'],
    status: { label: 'Public Release', color: 'success' },
    liveUrl: 'https://pypi.org/project/yokedcache/',
    githubUrl: 'https://github.com/SirStig/yokedcache'
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
