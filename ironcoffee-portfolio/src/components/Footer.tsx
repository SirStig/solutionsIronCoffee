import React from 'react';
import styled from 'styled-components';
import { Typography, Container } from '@mui/material';

const FooterContainer = styled.footer`
  width: 100%;
  padding: clamp(1.5rem, 4vw, 3rem) 0;
  background: ${({ theme }) => theme.palette.background.paper};
  border-top: 1px solid ${({ theme }) => theme.palette.divider};
  position: relative;
  margin-top: auto;
  
  /* Enhanced responsive padding */
  @media (max-width: 320px) {
    padding: 1rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 1.25rem 0;
  }
  
  @media (min-width: 768px) {
    padding: 2rem 0;
  }
  
  @media (min-width: 1920px) {
    padding: 2.5rem 0;
  }
  
  @media (min-width: 2560px) {
    padding: 3rem 0;
  }
  
  @media (min-width: 3840px) {
    padding: 3.5rem 0;
  }
  
  @media (min-width: 7680px) {
    padding: 4rem 0;
  }
  
  /* Safe area support for notched devices */
  padding-bottom: max(clamp(1.5rem, 4vw, 3rem), env(safe-area-inset-bottom));
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  
  /* Box sizing with browser compatibility */
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  
  /* Performance optimization */
  will-change: auto;
  
  /* Touch improvements */
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: clamp(0.5rem, 2vw, 1.5rem);
  width: 100%;
  
  /* Enhanced responsive layout */
  @media (max-width: 320px) {
    gap: 0.5rem;
    flex-direction: column;
  }
  
  @media (max-width: 480px) {
    gap: 0.75rem;
    flex-direction: column;
  }
  
  @media (min-width: 481px) {
    flex-direction: row;
    gap: clamp(1rem, 3vw, 3rem);
  }
  
  @media (min-width: 1920px) {
    gap: 2.5rem;
  }
  
  @media (min-width: 2560px) {
    gap: 3rem;
  }
  
  @media (min-width: 3840px) {
    gap: 3.5rem;
  }
  
  @media (min-width: 7680px) {
    gap: 4rem;
  }
  
  /* Box sizing with browser compatibility */
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  
  /* Performance optimization */
  will-change: auto;
`;

const FooterText = styled(Typography)`
    && {
        color: ${({ theme }) => theme.palette.text.secondary};
        font-size: clamp(0.75rem, 1.8vw, 1rem);
        white-space: nowrap;
        font-weight: 400;
        letter-spacing: 0.02em;
        
        /* Enhanced responsive font sizing */
        @media (max-width: 320px) {
          font-size: 0.7rem;
          white-space: normal;
        }
        
        @media (max-width: 480px) {
          font-size: 0.75rem;
          white-space: normal;
        }
        
        @media (min-width: 481px) {
          white-space: nowrap;
        }
        
        @media (min-width: 1920px) {
          font-size: 0.95rem;
        }
        
        @media (min-width: 2560px) {
          font-size: 1.1rem;
        }
        
        @media (min-width: 3840px) {
          font-size: 1.3rem;
        }
        
        @media (min-width: 7680px) {
          font-size: 1.5rem;
        }
        
        /* Font family with fallbacks */
        font-family: "Inter", "Segoe UI", "Roboto", "-apple-system", "BlinkMacSystemFont", "Helvetica Neue", "Arial", sans-serif;
        
        /* Text rendering improvements */
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        
        /* Comprehensive transition support */
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        -webkit-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        -moz-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        -ms-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        -o-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        
        /* Touch improvements */
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <FooterContent>
          <FooterText>
            © {currentYear} IronCoffee LLC
          </FooterText>
          <FooterText>
            All rights reserved
          </FooterText>
        </FooterContent>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 