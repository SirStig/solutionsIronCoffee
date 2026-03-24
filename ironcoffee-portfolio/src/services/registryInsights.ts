export type PypiInsights = {
  registry: 'pypi';
  name: string;
  version: string;
  publishedAt: string | null;
  /** All-time downloads label from Shields (pepy aggregate), e.g. "3.7k" */
  downloadsAllTimeLabel: string | null;
};

export type NpmInsights = {
  registry: 'npm';
  name: string;
  latest: string;
  stable: string | null;
  downloadsLastMonth: number | null;
  /** All-time downloads label from Shields npm badge, e.g. "235" */
  downloadsAllTimeLabel: string | null;
  latestPublishedAt: string | null;
};

const SHIELDS_ORIGIN = 'https://img.shields.io';

async function fetchShieldsValue(
  path: string,
  signal?: AbortSignal
): Promise<string | null> {
  const url = `${SHIELDS_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`;
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) {
      return null;
    }
    const j = (await res.json()) as { value?: string };
    const v = j.value?.trim();
    return v || null;
  } catch {
    return null;
  }
}

export async function fetchPypiInsights(
  packageName: string,
  signal?: AbortSignal
): Promise<PypiInsights> {
  const enc = encodeURIComponent(packageName);
  const [pypiRes, downloadsAllTimeLabel] = await Promise.all([
    fetch(`https://pypi.org/pypi/${enc}/json`, { signal }),
    fetchShieldsValue(`/pepy/dt/${enc}.json`, signal),
  ]);
  if (!pypiRes.ok) {
    throw new Error('PyPI request failed');
  }
  const data = (await pypiRes.json()) as {
    info: { version: string };
    urls?: Array<{ upload_time_iso_8601?: string }>;
  };
  const publishedAt = data.urls?.[0]?.upload_time_iso_8601 ?? null;
  return {
    registry: 'pypi',
    name: packageName,
    version: data.info.version,
    publishedAt,
    downloadsAllTimeLabel,
  };
}

export async function fetchNpmInsights(
  packageName: string,
  signal?: AbortSignal
): Promise<NpmInsights> {
  const enc = encodeURIComponent(packageName);
  const [metaRes, dlRes, downloadsAllTimeLabel] = await Promise.all([
    fetch(`https://registry.npmjs.org/${enc}`, { signal }),
    fetch(`https://api.npmjs.org/downloads/point/last-month/${enc}`, { signal }),
    fetchShieldsValue(`/npm/dt/${enc}.json`, signal),
  ]);
  if (!metaRes.ok) {
    throw new Error('npm registry request failed');
  }
  const meta = (await metaRes.json()) as {
    name: string;
    'dist-tags'?: { latest?: string; stable?: string };
    time?: Record<string, string>;
  };
  const latest = meta['dist-tags']?.latest ?? '';
  const stableTag = meta['dist-tags']?.stable;
  const stable =
    stableTag && stableTag !== latest ? stableTag : null;

  let downloadsLastMonth: number | null = null;
  if (dlRes.ok) {
    const dl = (await dlRes.json()) as { downloads?: number };
    if (typeof dl.downloads === 'number') {
      downloadsLastMonth = dl.downloads;
    }
  }

  const latestPublishedAt = latest && meta.time?.[latest] ? meta.time[latest] : null;

  return {
    registry: 'npm',
    name: meta.name || packageName,
    latest,
    stable,
    downloadsLastMonth,
    downloadsAllTimeLabel,
    latestPublishedAt,
  };
}
