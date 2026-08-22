import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

// A dedicated config rather than a `test` block in vite.config.ts: Vitest did
// not reliably discover the Vite config on its own, and silently ran without
// the markdown plugin — which made every blog import fail to parse.
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test-setup.ts',
      css: true,
    },
  })
);
