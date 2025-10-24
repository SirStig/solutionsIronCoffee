import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Fab, useTheme, Zoom } from '@mui/material';
import { KeyboardArrowUp } from '@mui/icons-material';
import styled from 'styled-components';
import { useMobileDetect } from '../hooks/useMobileDetect';

const StyledFab = styled(Fab)`
  && {
    display: none; // Hide by default (desktop)
    position: fixed;
    bottom: ${({ theme }) => theme.spacing(4)};
    right: ${({ theme }) => theme.spacing(2)};
    z-index: 9999;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    @media (max-width: 768px) {
      display: flex; // Only show on mobile
      bottom: ${({ theme }) => theme.spacing(4)};
      right: ${({ theme }) => theme.spacing(2)};
    }

    &.MuiFab-root {
      background: ${({ theme }) => theme.palette.primary.main};
      color: ${({ theme }) => theme.palette.primary.contrastText};
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:hover, &:active {
        background: ${({ theme }) => theme.palette.primary.dark};
      }
      
      &:active {
        transform: scale(0.95);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      }
    }

    @media (max-width: 480px) {
      transform: scale(0.9);
      
      &:active {
        transform: scale(0.85);
      }
    }
  }
`;

export const ScrollToTopOnMount: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
};

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isMobile } = useMobileDetect();
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollY = window.pageYOffset;
      setIsVisible(scrollY > 200); // Reduced threshold for earlier appearance
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsPressed(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    // Reset pressed state after animation
    setTimeout(() => setIsPressed(false), 300);
  };

  if (!isMobile) return null;

  return (
    <Zoom in={isVisible}>
      <StyledFab
        size="small"
        aria-label="scroll back to top"
        onClick={scrollToTop}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
        style={{
          transform: isPressed ? 'scale(0.85)' : 'scale(0.9)',
        }}
      >
        <KeyboardArrowUp />
      </StyledFab>
    </Zoom>
  );
}; 