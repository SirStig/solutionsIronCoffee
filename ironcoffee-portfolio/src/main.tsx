import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { preloadRoute } from './routes';
import { initAnalytics } from './services/analytics';

const container = document.getElementById('root') as HTMLElement;

const tree = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

// The build prerenders every route to static HTML. Hydrate it when it's there,
// mount fresh when it isn't (dev server, or a path the prerenderer didn't cover).
//
// Hydration waits for the current route's chunk. If React reaches the Suspense
// boundary before the chunk lands it renders the fallback, finds markup that
// doesn't match the prerendered HTML, and rebuilds the page from scratch — which
// happens reliably on a warm cache. The modulepreload the prerenderer injects
// means this wait is usually already over by the time we get here.
if (container.hasChildNodes()) {
  preloadRoute(window.location.pathname).then(() => {
    hydrateRoot(container, tree);
  });
} else {
  createRoot(container).render(tree);
}

// Analytics and error tracking are deferred until the page is idle so they
// never compete with the first render.
if (import.meta.env.PROD) {
  const start = () => {
    initAnalytics();
    import('./services/errorTracking').then((m) => m.initErrorTracking());
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(start, { timeout: 4000 });
  } else {
    setTimeout(start, 2000);
  }
}
