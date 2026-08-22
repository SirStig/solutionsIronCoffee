import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import markdown from './plugins/vite-plugin-markdown.mjs';

export default defineConfig({
  plugins: [react(), markdown()],
  base: '/',

  build: {
    outDir: 'build',
    // The prerenderer reads this to find each route's chunk and emit a
    // modulepreload for it.
    manifest: true,
    // Sourcemaps would double the upload to Dreamhost for no user-facing gain.
    sourcemap: false,
    target: 'es2020',
    cssTarget: 'chrome100',
    // Inline anything under 2KB rather than paying for a request.
    assetsInlineLimit: 2048,
    rollupOptions: {
      output: {
        // Keep the vendor core in one long-lived chunk so a content edit never
        // invalidates React for returning visitors. Everything else splits by
        // route automatically via React.lazy.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (/[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/.test(id)) {
            return 'react';
          }
          if (id.includes('react-router')) return 'router';
        },
      },
    },
  },

  // The prerender bundle is executed directly by Node as ESM, so everything it
  // touches has to be bundled in — several dependencies still ship CommonJS and
  // would fail on a named import otherwise. This output is temporary and gets
  // deleted once prerendering finishes.
  ssr: {
    noExternal: true,
  },

  server: {
    port: 5173,
  },

});
