import React from 'react';
import { Chip, ChipProps, Skeleton } from '@mui/material';
import styled from 'styled-components';
import type { Project } from '../data/projects';
import { useLiveProjectStatusLabel } from '../hooks/useLiveProjectStatusLabel';

interface StatusChipProps extends Omit<ChipProps, 'color'> {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const FilledStatusChip = styled(Chip)<StatusChipProps>`
  && {
    background: ${({ theme, color }) => theme.palette[color || 'primary']?.main};
    color: white;
    font-size: 0.8rem;
    height: 28px;
    font-weight: 500;
  }
`;

type Props = { project: Project };

const LiveProjectStatusChip: React.FC<Props> = ({ project }) => {
  const { show, pending, label, color } = useLiveProjectStatusLabel(project);
  if (!show) return null;
  if (pending) {
    return (
      <Skeleton
        variant="rounded"
        width={project.liveStatus?.kind === 'npm' ? 200 : 140}
        height={28}
        sx={{ borderRadius: '14px', flexShrink: 0, bgcolor: 'action.hover' }}
      />
    );
  }
  return <FilledStatusChip label={label} color={color} size="small" />;
};

export default LiveProjectStatusChip;
