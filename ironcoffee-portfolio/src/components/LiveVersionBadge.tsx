import { useEffect, useState } from 'react';
import type { LiveVersion } from '../content/projects';
import styles from './LiveVersionBadge.module.css';

/** Where to ask, and which field holds the version, per registry. */
function resolve(source: LiveVersion): {
  url: string;
  read: (data: unknown) => string | undefined;
} {
  switch (source.kind) {
    case 'pypi':
      return {
        url: `https://pypi.org/pypi/${source.package}/json`,
        read: (d) => (d as { info?: { version?: string } }).info?.version,
      };
    case 'npm':
      return {
        url: `https://registry.npmjs.org/${source.package}/latest`,
        read: (d) => (d as { version?: string }).version,
      };
    case 'github-release':
      return {
        url: `https://api.github.com/repos/${source.owner}/${source.repo}/releases/latest`,
        read: (d) => (d as { tag_name?: string }).tag_name,
      };
  }
}

/**
 * Shows the current published version, fetched client-side.
 *
 * Renders nothing until the request succeeds — a hardcoded version number on a
 * portfolio goes stale and quietly starts lying. If the registry is down,
 * rate-limited or blocked, the badge simply does not appear.
 */
export default function LiveVersionBadge({ source }: { source: LiveVersion }) {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const { url, read } = resolve(source);

    fetch(url, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const found = data && read(data);
        if (found) setVersion(found.replace(/^v/, ''));
      })
      .catch(() => {
        /* Offline or rate-limited — leave the badge off. */
      });

    return () => controller.abort();
  }, [source]);

  if (!version) return null;

  return <span className={styles.badge}>v{version}</span>;
}
