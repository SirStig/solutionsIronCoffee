import { Writable } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App';

export interface Rendered {
  html: string;
  helmet: HelmetServerState;
}

/**
 * Renders one route to a complete HTML string.
 *
 * Uses the streaming renderer specifically because it waits on Suspense — the
 * route components are React.lazy, and onAllReady only fires once every one of
 * them has resolved. renderToString would emit the empty fallback instead.
 */
export function render(url: string): Promise<Rendered> {
  return new Promise((resolve, reject) => {
    const helmetContext: { helmet?: HelmetServerState } = {};
    const chunks: Buffer[] = [];

    const sink = new Writable({
      write(chunk: Buffer | string, _encoding, callback) {
        chunks.push(Buffer.from(chunk));
        callback();
      },
    });

    sink.on('finish', () =>
      resolve({
        html: Buffer.concat(chunks).toString('utf8'),
        helmet: helmetContext.helmet as HelmetServerState,
      })
    );

    const { pipe, abort } = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>,
      {
        onAllReady() {
          pipe(sink);
        },
        onError(error) {
          reject(error);
        },
      }
    );

    // Nothing here does I/O, so anything this slow is a hang, not slow work.
    setTimeout(() => {
      abort();
      reject(new Error(`Timed out prerendering ${url}`));
    }, 20_000).unref();
  });
}

/* Re-exported so the prerender script reads the same data the pages render
   from, without having to guess at generated chunk filenames. */
export { projects } from './content/projects';
export { posts } from './content/blog';
