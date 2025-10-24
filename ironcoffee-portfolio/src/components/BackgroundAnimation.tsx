import React from 'react';
import styled from 'styled-components';

const GradientBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  background: ${({ theme }) => theme.palette.mode === 'light' 
    ? `
      radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.7) 0%, transparent 45%),
      radial-gradient(circle at 85% 15%, rgba(147, 51, 234, 0.6) 0%, transparent 45%),
      radial-gradient(circle at 75% 85%, rgba(16, 185, 129, 0.55) 0%, transparent 45%),
      radial-gradient(circle at 25% 75%, rgba(245, 101, 101, 0.5) 0%, transparent 45%),
      radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.45) 0%, transparent 55%),
      #CBD5E1
    `
    : `
      radial-gradient(circle at 15% 25%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 85% 15%, rgba(147, 51, 234, 0.06) 0%, transparent 50%),
      radial-gradient(circle at 75% 85%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 25% 75%, rgba(245, 101, 101, 0.04) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(251, 191, 36, 0.03) 0%, transparent 60%),
      ${theme.palette.background.default}
    `
  };
  
  /* Responsive adjustments */
  @media (max-width: 768px) {
    background: ${({ theme }) => theme.palette.mode === 'light' 
      ? `
        radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.6) 0%, transparent 55%),
        radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.55) 0%, transparent 55%),
        radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.5) 0%, transparent 55%),
        radial-gradient(circle at 30% 70%, rgba(245, 101, 101, 0.45) 0%, transparent 55%),
        #CBD5E1
      `
      : `
        radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.06) 0%, transparent 60%),
        radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.05) 0%, transparent 60%),
        radial-gradient(circle at 70% 80%, rgba(16, 185, 129, 0.04) 0%, transparent 60%),
        radial-gradient(circle at 30% 70%, rgba(245, 101, 101, 0.03) 0%, transparent 60%),
        ${theme.palette.background.default}
      `
    };
  }
  
  @media (max-width: 480px) {
    background: ${({ theme }) => theme.palette.mode === 'light' 
      ? `
        radial-gradient(circle at 25% 35%, rgba(59, 130, 246, 0.55) 0%, transparent 65%),
        radial-gradient(circle at 75% 25%, rgba(147, 51, 234, 0.5) 0%, transparent 65%),
        radial-gradient(circle at 65% 75%, rgba(16, 185, 129, 0.45) 0%, transparent 65%),
        #CBD5E1
      `
      : `
        radial-gradient(circle at 25% 35%, rgba(59, 130, 246, 0.05) 0%, transparent 70%),
        radial-gradient(circle at 75% 25%, rgba(147, 51, 234, 0.04) 0%, transparent 70%),
        radial-gradient(circle at 65% 75%, rgba(16, 185, 129, 0.03) 0%, transparent 70%),
        ${theme.palette.background.default}
      `
    };
  }
`;

const BackgroundAnimation: React.FC = () => {
  return <GradientBackground />;
};

export default BackgroundAnimation;