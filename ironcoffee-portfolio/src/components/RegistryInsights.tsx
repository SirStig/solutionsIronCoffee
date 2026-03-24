import React, { useEffect, useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import { CloudSync as CloudSyncIcon } from '@mui/icons-material';
import {
  fetchNpmInsights,
  fetchPypiInsights,
  type NpmInsights,
  type PypiInsights,
} from '../services/registryInsights';

const formatShortDate = (iso: string | null) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const formatDownloads = (n: number | null) => {
  if (n === null) return null;
  return new Intl.NumberFormat(undefined, { notation: 'compact', maximumFractionDigits: 1 }).format(
    n
  );
};

type Props = {
  slug: string;
  variant?: 'full' | 'compact';
  onClickStop?: (e: React.MouseEvent) => void;
};

const REGISTRY_SLUGS = new Set(['yokedcache', 'expo-media-engine']);

const RegistryInsights: React.FC<Props> = ({ slug, variant = 'full', onClickStop }) => {
  const [pypi, setPypi] = useState<PypiInsights | null>(null);
  const [npm, setNpm] = useState<NpmInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!REGISTRY_SLUGS.has(slug)) {
      return;
    }
    const ac = new AbortController();
    setLoading(true);
    setFailed(false);
    setPypi(null);
    setNpm(null);

    const run = async () => {
      try {
        if (slug === 'yokedcache') {
          const data = await fetchPypiInsights('yokedcache', ac.signal);
          if (!ac.signal.aborted) setPypi(data);
        } else {
          const data = await fetchNpmInsights('@projectyoked/expo-media-engine', ac.signal);
          if (!ac.signal.aborted) setNpm(data);
        }
      } catch {
        if (!ac.signal.aborted) setFailed(true);
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    };

    void run();
    return () => ac.abort();
  }, [slug]);

  if (!REGISTRY_SLUGS.has(slug)) {
    return null;
  }

  if (loading) {
    if (variant === 'compact') {
      return (
        <Box onClick={onClickStop} sx={{ mt: 1, mb: 0.5 }}>
          <Skeleton variant="text" width="75%" height={18} sx={{ bgcolor: 'action.hover' }} />
        </Box>
      );
    }
    return (
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="rounded" height={72} sx={{ bgcolor: 'action.hover', borderRadius: 2 }} />
      </Box>
    );
  }

  if (failed || (!pypi && !npm)) {
    return null;
  }

  if (variant === 'compact' && pypi) {
    const pub = formatShortDate(pypi.publishedAt);
    return (
      <Typography
        variant="caption"
        component="div"
        onClick={onClickStop}
        sx={{
          mt: 1,
          mb: 0.5,
          color: 'text.secondary',
          display: 'block',
          lineHeight: 1.5,
        }}
      >
        Live · PyPI v{pypi.version}
        {pypi.downloadsAllTimeLabel ? ` · ≈${pypi.downloadsAllTimeLabel} all-time` : ''}
        {pub ? ` · published ${pub}` : ''}
      </Typography>
    );
  }

  if (variant === 'compact' && npm) {
    const dl = formatDownloads(npm.downloadsLastMonth);
    const pub = formatShortDate(npm.latestPublishedAt);
    return (
      <Typography
        variant="caption"
        component="div"
        onClick={onClickStop}
        sx={{
          mt: 1,
          mb: 0.5,
          color: 'text.secondary',
          display: 'block',
          lineHeight: 1.5,
        }}
      >
        Live · npm latest v{npm.latest}
        {npm.stable ? ` · stable v${npm.stable}` : ''}
        {dl !== null ? ` · ${dl} dl/mo` : ''}
        {npm.downloadsAllTimeLabel ? ` · ${npm.downloadsAllTimeLabel} all-time` : ''}
        {pub ? ` · ${pub}` : ''}
      </Typography>
    );
  }

  if (pypi) {
    const pub = formatShortDate(pypi.publishedAt);
    return (
      <Box
        sx={{
          mb: 2,
          p: 1.75,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
          <CloudSyncIcon sx={{ fontSize: 18, color: 'primary.main', opacity: 0.9 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: 0.02 }}>
            Live from PyPI
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
          <strong style={{ color: 'inherit' }}>yokedcache</strong> · latest{' '}
          <strong style={{ color: 'inherit' }}>v{pypi.version}</strong>
          {pub ? ` · published ${pub}` : ''}
          {pypi.downloadsAllTimeLabel ? (
            <>
              <br />
              Approx. all-time downloads:{' '}
              <strong style={{ color: 'inherit' }}>{pypi.downloadsAllTimeLabel}</strong>
              {' '}
              <Typography component="span" variant="caption" sx={{ color: 'text.disabled' }}>
                (pepy via shields.io)
              </Typography>
            </>
          ) : null}
        </Typography>
      </Box>
    );
  }

  if (npm) {
    const dl = formatDownloads(npm.downloadsLastMonth);
    const pub = formatShortDate(npm.latestPublishedAt);
    return (
      <Box
        sx={{
          mb: 2,
          p: 1.75,
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 0.75 }}>
          <CloudSyncIcon sx={{ fontSize: 18, color: 'primary.main', opacity: 0.9 }} />
          <Typography variant="subtitle2" sx={{ fontWeight: 600, letterSpacing: 0.02 }}>
            Live from npm
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
          <strong style={{ color: 'inherit' }}>@projectyoked/expo-media-engine</strong>
          <br />
          Latest <strong style={{ color: 'inherit' }}>v{npm.latest}</strong>
          {npm.stable ? (
            <>
              {' '}
              · stable <strong style={{ color: 'inherit' }}>v{npm.stable}</strong>
            </>
          ) : null}
          {dl !== null ? (
            <>
              <br />
              Downloads (last 30 days): <strong style={{ color: 'inherit' }}>{dl}</strong>
            </>
          ) : null}
          {npm.downloadsAllTimeLabel ? (
            <>
              <br />
              All-time downloads: <strong style={{ color: 'inherit' }}>{npm.downloadsAllTimeLabel}</strong>
              {' '}
              <Typography component="span" variant="caption" sx={{ color: 'text.disabled' }}>
                (npm via shields.io)
              </Typography>
            </>
          ) : null}
          {pub ? (
            <>
              <br />
              Latest published {pub}
            </>
          ) : null}
        </Typography>
      </Box>
    );
  }

  return null;
};

export default RegistryInsights;
