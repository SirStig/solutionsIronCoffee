import {
  createElement,
  lazy,
  type ComponentType,
  type ReactElement,
} from 'react';

/**
 * Code-split route components that can be resolved before hydration.
 *
 * Every page is prerendered, so hydration finds real markup inside the Suspense
 * boundary. If the route's chunk hasn't resolved by then, React renders the
 * fallback instead, sees markup that doesn't match, and throws the prerendered
 * DOM away to re-render the whole route on the client.
 *
 * Whether that happens is a race. On a cold load the modulepreload the
 * prerenderer injects usually wins, and it looks fine. On a warm cache — the
 * common case, where the entry bundle is cached but this route's chunk isn't —
 * React reaches hydration first and the page is rebuilt from scratch.
 *
 * `route()` removes the race: after `preload()` resolves, the wrapper renders
 * the real component synchronously and never suspends. `lazy` still backs
 * in-app navigation, where suspending is exactly what should happen.
 */
type RouteComponent = (() => ReactElement) & {
  preload: () => Promise<unknown>;
};

/** Routes take no props; React Router supplies params through hooks. */
function route(
  loader: () => Promise<{ default: ComponentType }>
): RouteComponent {
  let Resolved: ComponentType | null = null;
  let pending: Promise<unknown> | null = null;

  const Lazy = lazy(loader);

  const preload = () => {
    pending ??= loader().then((module) => {
      Resolved = module.default;
      return module;
    });
    return pending;
  };

  return Object.assign(() => createElement(Resolved ?? Lazy), { preload });
}

export const Work = route(() => import('./pages/Work'));
export const Apps = route(() => import('./pages/Apps'));
export const OpenSource = route(() => import('./pages/OpenSource'));
export const Games = route(() => import('./pages/Games'));
export const ProjectPage = route(() => import('./pages/ProjectPage'));
export const Blog = route(() => import('./pages/Blog'));
export const BlogPost = route(() => import('./pages/BlogPost'));
export const About = route(() => import('./pages/About'));
export const Contact = route(() => import('./pages/Contact'));
export const NotFound = route(() => import('./pages/NotFound'));

/** First match wins, so more specific patterns come first. */
const matchers: [RegExp, RouteComponent][] = [
  [/^\/work\/[^/]+$/, ProjectPage],
  [/^\/portfolio\/[^/]+$/, ProjectPage],
  [/^\/work\/?$/, Work],
  [/^\/portfolio\/?$/, Work],
  [/^\/apps\/?$/, Apps],
  [/^\/open-source\/?$/, OpenSource],
  [/^\/games\/?$/, Games],
  [/^\/blog\/[^/]+$/, BlogPost],
  [/^\/blog\/?$/, Blog],
  [/^\/about\/?$/, About],
  [/^\/services\/?$/, About],
  [/^\/contact\/?$/, Contact],
];

/**
 * Resolves the component this pathname will render. Home is in the entry
 * bundle, so it needs nothing; anything unrecognised renders the 404 page.
 */
export function preloadRoute(pathname: string): Promise<unknown> {
  if (pathname === '/' || pathname === '') return Promise.resolve();

  const match = matchers.find(([pattern]) => pattern.test(pathname));
  return (match ? match[1] : NotFound).preload().catch(() => {
    // A failed preload isn't fatal — Suspense retries during render.
  });
}
