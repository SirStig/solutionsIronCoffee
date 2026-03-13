import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useMobileDetect } from '../hooks/useMobileDetect';

const Section = styled(motion.section)`
  width: 100%;
  position: relative;
  will-change: transform, opacity;
`;

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0
}) => {
  const { isMobile } = useMobileDetect();
  
  // Optimize for mobile: trigger earlier (positive margin = before viewport), faster animation
  // Positive margin triggers BEFORE element enters viewport (better for mobile)
  // Negative margin triggers AFTER element enters viewport
  const viewportMargin = isMobile ? "100px" : "-20px";
  const animationDuration = isMobile ? 0.25 : 0.3;
  // Reduce delay on mobile for snappier feel
  const optimizedDelay = isMobile ? delay * 0.5 : delay;
  
  return (
    <Section
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: animationDuration,
          delay: optimizedDelay,
          ease: [0.645, 0.045, 0.355, 1],
        }
      }}
      viewport={{ 
        once: true, 
        margin: viewportMargin
      }}
      style={{ 
        willChange: 'transform, opacity' 
      }}
    >
      {children}
    </Section>
  );
};

export default AnimatedSection;
