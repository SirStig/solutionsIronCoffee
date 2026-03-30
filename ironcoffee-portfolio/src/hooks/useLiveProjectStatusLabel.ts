import { useEffect, useState } from 'react';
import type { Project } from '../data/projects';
import {
  fetchGithubReleaseTag,
  fetchNpmInsights,
  fetchPypiInsights,
} from '../services/registryInsights';

export function useLiveProjectStatusLabel(project: Project): {
  show: boolean;
  pending: boolean;
  label: string;
  color: NonNullable<Project['status']>['color'];
} {
  const st = project.status;
  const live = project.liveStatus;
  const fallback = st?.label ?? '';

  const [resolved, setResolved] = useState<string | null>(() =>
    live ? null : st ? st.label : null
  );
  const [pending, setPending] = useState(() => Boolean(live && st));

  useEffect(() => {
    if (!st) {
      setResolved(null);
      setPending(false);
      return;
    }
    if (!live) {
      setResolved(st.label);
      setPending(false);
      return;
    }

    const ac = new AbortController();
    setPending(true);
    setResolved(null);

    void (async () => {
      try {
        let next = fallback;
        if (live.kind === 'pypi') {
          const d = await fetchPypiInsights(live.package, ac.signal);
          next = `v${d.version}`;
        } else if (live.kind === 'npm') {
          const d = await fetchNpmInsights(live.package, ac.signal);
          next = `npm latest: v${d.latest}`;
        } else {
          const tag = await fetchGithubReleaseTag(live.owner, live.repo, ac.signal);
          if (tag) next = tag;
        }
        if (!ac.signal.aborted) setResolved(next);
      } catch {
        if (!ac.signal.aborted) setResolved(fallback);
      } finally {
        if (!ac.signal.aborted) setPending(false);
      }
    })();

    return () => ac.abort();
  }, [project]);

  return {
    show: Boolean(st),
    pending,
    label: resolved ?? fallback,
    color: st?.color ?? 'primary',
  };
}
