import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const ContentWrapper = styled(motion.div)`
  width: 100%;
`;

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.645, 0.045, 0.355, 1],
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <ContentWrapper
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={childVariants}
            initial="hidden"
            animate="visible"
            custom={index}
          >
            {child}
          </motion.div>
        ))}
      </ContentWrapper>
    </AnimatePresence>
  );
};

export default PageTransition; 