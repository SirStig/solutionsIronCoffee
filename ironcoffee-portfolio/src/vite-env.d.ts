/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * `.md` files are compiled to plain objects by plugins/vite-plugin-markdown.mjs
 * before they ever reach TypeScript.
 */
declare module '*.md' {
  const post: {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    html: string;
    readingTime: number;
    tags?: string[];
    headings?: { id: string; text: string; depth: number }[];
    image?: string;
    draft?: boolean;
  };
  export default post;
}
