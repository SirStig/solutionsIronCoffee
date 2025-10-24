import React from 'react';
import { useScrollTrigger, Slide } from '@mui/material';

interface Props {
  children: React.ReactElement;
  window?: () => Window;
}

export const HideOnScroll: React.FC<Props> = ({ children, window }) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}; 