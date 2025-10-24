import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styled, { createGlobalStyle } from 'styled-components';
import { useMobileDetect } from '../hooks/useMobileDetect';

const CursorDot = styled(motion.div)`
  width: 10px;
  height: 10px;
  background: ${props => props.theme.palette.secondary.main};
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  border-radius: 50%;
  will-change: transform;
  transform: translate3d(-50%, -50%, 0);
  backface-visibility: hidden;
  perspective: 1000px;
  box-shadow: 0 0 10px ${props => props.theme.palette.secondary.main}40;
`;

const GlobalCursorStyle = createGlobalStyle<{ isMobileDevice: boolean }>`
  * {
    cursor: ${props => props.isMobileDevice ? 'auto' : 'none'} !important;
  }
  
  a, button, [role="button"], input, select, textarea {
    &:hover {
      cursor: ${props => props.isMobileDevice ? 'pointer' : 'none'} !important;
    }
  }
`;

const CursorFollower: React.FC = () => {
  const { isMobile, isTablet, isTouchDevice } = useMobileDetect();
  
  // Motion values for cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // More responsive spring config - still has character but faster
  const smoothSpring = { 
    damping: 25, 
    stiffness: 400, 
    mass: 0.5 
  };
  
  const dotX = useSpring(cursorX, smoothSpring);
  const dotY = useSpring(cursorY, smoothSpring);

  useEffect(() => {
    if (isMobile || isTablet || isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY, isMobile, isTablet, isTouchDevice]);

  if (isMobile || isTablet || isTouchDevice) {
    return <GlobalCursorStyle isMobileDevice={true} />;
  }

  return (
    <>
      <GlobalCursorStyle isMobileDevice={false} />
      <CursorDot
        style={{
          x: dotX,
          y: dotY,
        }}
      />
    </>
  );
};

export default CursorFollower; 