import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const Section = styled(motion.section)`
  width: 100%;
  position: relative;
`;

interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  delay = 0
}) => {
  return (
    <Section
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          delay,
          ease: [0.645, 0.045, 0.355, 1],
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </Section>
  );
};

export default AnimatedSection;
