import React from 'react';
import { Container, Typography, Box, Button, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import AnimatedSection from '../components/AnimatedSection';

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  /* Modern viewport units with fallback */
  @supports (height: 100dvh) {
    min-height: 100dvh;
  }
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  align-items: center;
  overflow: hidden;
  margin-top: -80px; /* Offset the header height to start at top */
  padding-top: 80px; /* Add padding to maintain content positioning */
  
  /* Enhanced responsive design */
  @media (max-width: 320px) {
    padding-top: clamp(60px, 15vw, 80px);
    margin-top: clamp(-60px, -15vw, -80px);
  }
  
  @media (max-width: 480px) {
    padding-top: clamp(70px, 12vw, 85px);
    margin-top: clamp(-70px, -12vw, -85px);
  }
  
  @media (min-width: 768px) {
    padding-top: clamp(80px, 8vw, 100px);
    margin-top: clamp(-80px, -8vw, -100px);
  }
  
  @media (min-width: 1920px) {
    padding-top: clamp(100px, 5vw, 120px);
    margin-top: clamp(-100px, -5vw, -120px);
  }
  
  @media (min-width: 2560px) {
    padding-top: clamp(120px, 4vw, 140px);
    margin-top: clamp(-120px, -4vw, -140px);
  }
  
  @media (min-width: 3840px) {
    padding-top: clamp(140px, 3vw, 160px);
    margin-top: clamp(-140px, -3vw, -160px);
  }
  
  @media (min-width: 7680px) {
    padding-top: clamp(160px, 2vw, 200px);
    margin-top: clamp(-160px, -2vw, -200px);
  }
`;

const HeroBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/fallbacks/hero.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  
  /* Enhanced browser compatibility */
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  
  /* Performance optimization */
  will-change: transform;
  
  /* High DPI support */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
    background-image: url('/images/fallbacks/hero.png'); /* Could be upgraded to @2x version */
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.palette.mode === 'light' 
    ? `linear-gradient(135deg, 
        rgba(59, 130, 246, 0.4) 0%, 
        rgba(147, 51, 234, 0.35) 25%, 
        rgba(16, 185, 129, 0.3) 50%, 
        rgba(245, 101, 101, 0.25) 75%, 
        rgba(251, 191, 36, 0.2) 100%
      )`
    : 'rgba(0, 0, 0, 0.75)'
  };
  z-index: 1;
  
  /* Enhanced browser compatibility for gradients */
  background: -webkit-${({ theme }) => theme.palette.mode === 'light' 
    ? `linear-gradient(135deg, 
        rgba(59, 130, 246, 0.4) 0%, 
        rgba(147, 51, 234, 0.35) 25%, 
        rgba(16, 185, 129, 0.3) 50%, 
        rgba(245, 101, 101, 0.25) 75%, 
        rgba(251, 191, 36, 0.2) 100%
      )`
    : 'rgba(0, 0, 0, 0.75)'
  };
  background: -moz-${({ theme }) => theme.palette.mode === 'light' 
    ? `linear-gradient(135deg, 
        rgba(59, 130, 246, 0.4) 0%, 
        rgba(147, 51, 234, 0.35) 25%, 
        rgba(16, 185, 129, 0.3) 50%, 
        rgba(245, 101, 101, 0.25) 75%, 
        rgba(251, 191, 36, 0.2) 100%
      )`
    : 'rgba(0, 0, 0, 0.75)'
  };
  background: -o-${({ theme }) => theme.palette.mode === 'light' 
    ? `linear-gradient(135deg, 
        rgba(59, 130, 246, 0.4) 0%, 
        rgba(147, 51, 234, 0.35) 25%, 
        rgba(16, 185, 129, 0.3) 50%, 
        rgba(245, 101, 101, 0.25) 75%, 
        rgba(251, 191, 36, 0.2) 100%
      )`
    : 'rgba(0, 0, 0, 0.75)'
  };
`;

const StyledContainer = styled(Container)`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  
  /* Enhanced mobile centering */
  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  
  @media (min-width: 768px) {
    display: block;
    text-align: left;
  }
`;

const HeroContent = styled.div`
  max-width: clamp(400px, 50vw, 800px);
  text-align: left;
  width: 100%;
  
  /* Enhanced responsive sizing */
  @media (max-width: 320px) {
    max-width: 95%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  
  @media (max-width: 480px) {
    max-width: 90%;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  
  @media (max-width: 767px) {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  
  @media (min-width: 768px) {
    text-align: left;
    max-width: clamp(500px, 45vw, 700px);
    display: block;
    margin: 0;
  }
  
  @media (min-width: 1920px) {
    max-width: clamp(700px, 40vw, 900px);
  }
  
  @media (min-width: 2560px) {
    max-width: clamp(900px, 35vw, 1200px);
  }
  
  @media (min-width: 3840px) {
    max-width: clamp(1200px, 30vw, 1600px);
  }
  
  @media (min-width: 7680px) {
    max-width: clamp(1600px, 25vw, 2400px);
  }
`;


const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  
  /* Enhanced backdrop filter with browser compatibility */
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  border-radius: clamp(16px, 2.5vw, 20px);
  padding: clamp(1.5rem, 4vw, 2.5rem) clamp(1rem, 3vw, 2rem);
  margin: clamp(1rem, 3vw, 1.5rem) 0;
  
  /* Enhanced box shadow with browser compatibility */
  box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(32px, 4vw, 48px) rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(32px, 4vw, 48px) rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(32px, 4vw, 48px) rgba(0, 0, 0, 0.1);
  
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Comprehensive transition support */
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -webkit-transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -moz-transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -ms-transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  -o-transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  
  /* Touch improvements */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  
  /* Performance optimization */
  will-change: transform, box-shadow;
  
  /* Enhanced responsive design for all screen sizes */
  @media (max-width: 320px) {
    padding: clamp(1.25rem, 4vw, 1.5rem) clamp(1rem, 3vw, 1.25rem);
    margin: clamp(0.75rem, 2.5vw, 1rem) 0;
    border-radius: clamp(12px, 4vw, 16px);
  }
  
  @media (max-width: 480px) {
    padding: clamp(1.5rem, 4.5vw, 2rem) clamp(1.25rem, 3.5vw, 1.5rem);
    margin: clamp(1rem, 3vw, 1.25rem) 0;
    border-radius: clamp(14px, 3.5vw, 18px);
  }
  
  @media (max-width: 768px) {
    padding: clamp(2rem, 4vw, 2.5rem) clamp(1.5rem, 3vw, 2rem);
    margin: clamp(1.25rem, 3.5vw, 1.5rem) 0;
  }
  
  @media (min-width: 1920px) {
    padding: 2.5rem 2rem;
    margin: 1.5rem 0;
    border-radius: 16px;
    max-width: none; /* Allow normal width but control padding */
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg,
      ${props => props.theme.palette.primary.main}15,
      ${props => props.theme.palette.secondary.main}10
    );
    /* Browser compatibility for gradients */
    background: -webkit-linear-gradient(135deg,
      ${props => props.theme.palette.primary.main}15,
      ${props => props.theme.palette.secondary.main}10
    );
    background: -moz-linear-gradient(135deg,
      ${props => props.theme.palette.primary.main}15,
      ${props => props.theme.palette.secondary.main}10
    );
    background: -o-linear-gradient(135deg,
      ${props => props.theme.palette.primary.main}15,
      ${props => props.theme.palette.secondary.main}10
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    -webkit-transition: opacity 0.4s ease;
    -moz-transition: opacity 0.4s ease;
    z-index: 0;
  }

  &:hover {
    /* Transform with full browser compatibility */
    transform: translateY(-8px);
    -webkit-transform: translateY(-8px);
    -moz-transform: translateY(-8px);
    -ms-transform: translateY(-8px);
    -o-transform: translateY(-8px);
    
    /* Enhanced responsive shadow */
    box-shadow: 0 clamp(16px, 2vw, 24px) clamp(48px, 5vw, 64px) rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 clamp(16px, 2vw, 24px) clamp(48px, 5vw, 64px) rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 clamp(16px, 2vw, 24px) clamp(48px, 5vw, 64px) rgba(0, 0, 0, 0.2);
    
    border-color: rgba(255, 255, 255, 0.2);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: translateY(-4px);
    -webkit-transform: translateY(-4px);
    -moz-transform: translateY(-4px);
    -ms-transform: translateY(-4px);
    -o-transform: translateY(-4px);
    
    transition: all 0.1s ease;
    -webkit-transition: all 0.1s ease;
    -moz-transition: all 0.1s ease;
  }
  
  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
      -webkit-transform: none;
      -moz-transform: none;
    }
    
    &:active {
      transform: scale(0.98);
      -webkit-transform: scale(0.98);
      -moz-transform: scale(0.98);
    }
  }
`;

const WhyChooseSection = styled.section`
  padding: clamp(3rem, 6vw, 5rem) 0;
  background: transparent;
  
  /* Enhanced responsive design for all screen sizes */
  @media (max-width: 320px) {
    padding: clamp(2rem, 6vw, 3rem) 0;
  }
  
  @media (max-width: 480px) {
    padding: clamp(2.5rem, 7vw, 4rem) 0;
  }
  
  @media (max-width: 768px) {
    padding: clamp(3rem, 6vw, 5rem) 0;
  }
  
  @media (min-width: 1920px) {
    padding: 5rem 0;
  }
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  /* Maintain 16:9 aspect ratio */
  aspect-ratio: 16 / 9;
  border-radius: clamp(16px, 2.5vw, 28px);
  overflow: hidden;
  
  /* Enhanced box shadow with browser compatibility */
  box-shadow: 0 clamp(20px, 3vw, 32px) clamp(60px, 5vw, 80px) rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 clamp(20px, 3vw, 32px) clamp(60px, 5vw, 80px) rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0 clamp(20px, 3vw, 32px) clamp(60px, 5vw, 80px) rgba(0, 0, 0, 0.3);
  
  background: rgba(0, 0, 0, 0.1);
  
  /* Performance optimization */
  will-change: transform;
  
  /* Fallback for browsers that don't support aspect-ratio */
  @supports not (aspect-ratio: 16 / 9) {
    height: 0;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
  }
  
  /* Enhanced responsive design with 16:9 maintained */
  @media (max-width: 320px) {
    margin-top: clamp(1rem, 3vw, 1.5rem);
    border-radius: clamp(12px, 3vw, 16px);
    max-height: clamp(180px, 45vw, 220px);
  }
  
  @media (max-width: 480px) {
    margin-top: clamp(1.5rem, 3.5vw, 2rem);
    border-radius: clamp(14px, 3.5vw, 18px);
    max-height: clamp(220px, 42vw, 280px);
  }
  
  @media (max-width: 768px) {
    margin-top: clamp(2rem, 4vw, 3rem);
    border-radius: clamp(16px, 2.5vw, 20px);
    max-height: clamp(280px, 40vw, 350px);
  }
  
  @media (min-width: 1920px) {
    border-radius: 16px;
    max-height: 350px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    -o-object-fit: cover; /* Opera support */
    -webkit-object-fit: cover; /* Safari support */
    
    /* Performance improvements */
    will-change: transform;
    
    /* Prevent dragging */
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    
    /* Touch improvements */
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    
    /* Fallback for browsers that don't support aspect-ratio */
    @supports not (aspect-ratio: 16 / 9) {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
`;

const CustomWebsiteSection = styled.section`
  padding: clamp(3rem, 6vw, 5rem) 0;
  background: transparent;
  border-radius: 0;
  
  /* Enhanced responsive design for all screen sizes */
  @media (max-width: 320px) {
    padding: clamp(2rem, 6vw, 3rem) 0;
  }
  
  @media (max-width: 480px) {
    padding: clamp(2.5rem, 7vw, 4rem) 0;
  }
  
  @media (max-width: 768px) {
    padding: clamp(3rem, 6vw, 5rem) 0;
  }
  
  @media (min-width: 1920px) {
    padding: 5rem 0;
  }
`;

const ComparisonCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  
  /* Enhanced backdrop filter with browser compatibility */
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  
  border-radius: clamp(12px, 2vw, 16px);
  padding: clamp(1.5rem, 3vw, 2rem);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  /* Comprehensive transition support */
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -ms-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  
  /* Performance optimization */
  will-change: transform, box-shadow;
  
  /* Touch improvements */
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  
  &:hover {
    /* Transform with full browser compatibility */
    transform: translateY(-4px);
    -webkit-transform: translateY(-4px);
    -moz-transform: translateY(-4px);
    -ms-transform: translateY(-4px);
    -o-transform: translateY(-4px);
    
    /* Enhanced responsive shadow */
    box-shadow: 0 clamp(12px, 2vw, 18px) clamp(40px, 4vw, 56px) rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 0 clamp(12px, 2vw, 18px) clamp(40px, 4vw, 56px) rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 clamp(12px, 2vw, 18px) clamp(40px, 4vw, 56px) rgba(0, 0, 0, 0.15);
    
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  /* Enhanced responsive design */
  @media (max-width: 320px) {
    padding: clamp(1rem, 2.5vw, 1.25rem);
    margin-bottom: clamp(0.75rem, 2vw, 1rem);
    border-radius: clamp(10px, 2.5vw, 12px);
  }
  
  @media (max-width: 480px) {
    padding: clamp(1.25rem, 3vw, 1.5rem);
    margin-bottom: clamp(0.875rem, 2.2vw, 1.25rem);
    border-radius: clamp(12px, 2.2vw, 14px);
  }
  
  @media (max-width: 768px) {
    padding: clamp(1.5rem, 2.8vw, 2rem);
    margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
  }
  
  @media (min-width: 1920px) {
    padding: 2rem;
    border-radius: 16px;
    max-width: 500px;
    margin: 0 auto 1rem;
  }
  
  /* Touch device optimizations */
  @media (hover: none) and (pointer: coarse) {
    &:hover {
      transform: none;
      -webkit-transform: none;
      -moz-transform: none;
    }
    
    &:active {
      transform: scale(0.98);
      -webkit-transform: scale(0.98);
      -moz-transform: scale(0.98);
    }
  }
`;

const ServicesSection = styled.section`
  padding: clamp(2rem, 5vw, 4rem) 0;
  background: transparent;
  
  /* Enhanced responsive design for all screen sizes */
  @media (max-width: 320px) {
    padding: clamp(1.5rem, 4vw, 2rem) 0;
  }
  
  @media (max-width: 480px) {
    padding: clamp(1.75rem, 5vw, 2.5rem) 0;
  }
  
  @media (max-width: 768px) {
    padding: clamp(2rem, 5vw, 3rem) 0;
  }
  
  @media (min-width: 1920px) {
    padding: 4rem 0;
  }
`;

const Home = () => {
  const navigate = useNavigate();
  
  const handleServiceClick = (index: number) => {
    navigate('/services', { state: { scrollToIndex: index } });
  };

  return (
    <PageTransition>
      <Helmet>
        <title>IronCoffee Solutions - Web Development & Mobile App Solutions</title>
        <meta name="description" content="Professional web development, mobile app development, and backend solutions using React, React Native, TypeScript, FastAPI, Python, and AWS. Transform your digital presence with our expert services." />
      </Helmet>

      <HeroSection>
        <HeroBackground />
        <HeroOverlay />
        <StyledContainer maxWidth="lg">
          <HeroContent>
            <AnimatedSection>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  textAlign: { xs: 'center', sm: 'center', md: 'left' },
                  fontWeight: 700,
                  marginBottom: 3,
                  color: (theme: any) => theme.palette.mode === 'light' ? 'text.primary' : 'white',
                  width: '100%',
                  
                  /* Enhanced responsive text alignment */
                  '@media (max-width: 767px)': {
                    textAlign: 'center',
                  },
                  '@media (min-width: 768px)': {
                    textAlign: 'left',
                  },
                }}
              >
                Crafting Digital Excellence
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1rem', md: '1.3rem' },
                  textAlign: { xs: 'center', sm: 'center', md: 'left' },
                  marginBottom: 4,
                  fontWeight: 500,
                  color: (theme: any) => theme.palette.mode === 'light' ? 'text.primary' : 'rgba(255, 255, 255, 0.9)',
                  width: '100%',
                  
                  /* Enhanced responsive text alignment */
                  '@media (max-width: 767px)': {
                    textAlign: 'center',
                  },
                  '@media (min-width: 768px)': {
                    textAlign: 'left',
                  },
                }}
              >
                React & React Native • FastAPI & Python • AWS Cloud
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                gap: 'clamp(0.75rem, 3vw, 2rem)', 
                flexWrap: 'wrap',
                justifyContent: { xs: 'center', md: 'flex-start' },
                alignItems: 'center',
                width: '100%',
                
                /* Enhanced responsive layout */
                '@media (max-width: 320px)': {
                  flexDirection: 'column',
                  gap: '0.75rem',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                '@media (max-width: 480px)': {
                  flexDirection: 'column',
                  gap: '1rem',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                '@media (max-width: 767px)': {
                  flexDirection: 'column',
                  gap: '1.25rem',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                '@media (min-width: 768px)': {
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  gap: 'clamp(1.5rem, 3vw, 2rem)',
                }
              }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{ 
                    width: '100%',
                    maxWidth: '280px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    component={Link}
                    to="/contact"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{
                      padding: 'clamp(10px, 2.5vw, 16px) clamp(24px, 6vw, 40px)',
                      fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                      fontWeight: 600,
                      width: { xs: '100%', md: 'auto' },
                      minWidth: { xs: '200px', sm: '220px', md: '160px' },
                      backgroundColor: 'rgba(59, 130, 246, 0.9)',
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
                      
                      /* Comprehensive transition support */
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      WebkitTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      MozTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      
                      /* Touch improvements */
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                      
                      /* Enhanced responsive sizing */
                      '@media (max-width: 320px)': {
                        padding: '12px 20px',
                        fontSize: '0.9rem',
                        minWidth: '180px',
                      },
                      '@media (max-width: 480px)': {
                        padding: '14px 24px',
                        fontSize: '1rem',
                        minWidth: '200px',
                      },
                      '@media (min-width: 1920px)': {
                        padding: '16px 32px',
                        fontSize: '1.1rem',
                      },
                      '@media (min-width: 2560px)': {
                        padding: '16px 32px',
                        fontSize: '1.1rem',
                      },
                      
                      '&:hover': {
                        backgroundColor: 'rgba(37, 99, 235, 1)', // Darker blue for better contrast
                        color: 'white', // Ensure text stays white
                        boxShadow: '0 6px 20px rgba(59, 130, 246, 0.6)',
                        transform: 'translateY(-2px)',
                        WebkitTransform: 'translateY(-2px)',
                        MozTransform: 'translateY(-2px)',
                      }
                    }}
                  >
                    Get Started
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  style={{ 
                    width: '100%',
                    maxWidth: '280px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <Button
                    component={Link}
                    to="/portfolio"
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{
                      padding: 'clamp(10px, 2.5vw, 16px) clamp(24px, 6vw, 40px)',
                      fontSize: 'clamp(0.9rem, 2.2vw, 1.1rem)',
                      fontWeight: 600,
                      width: { xs: '100%', md: 'auto' },
                      minWidth: { xs: '200px', sm: '220px', md: '160px' },
                      borderColor: 'rgba(255, 255, 255, 0.8)',
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      borderWidth: '2px',
                      
                      /* Comprehensive transition support */
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      WebkitTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      MozTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      
                      /* Touch improvements */
                      touchAction: 'manipulation',
                      WebkitTapHighlightColor: 'transparent',
                      
                      /* Enhanced responsive sizing */
                      '@media (max-width: 320px)': {
                        padding: '12px 20px',
                        fontSize: '0.9rem',
                        minWidth: '180px',
                        borderWidth: '1.5px',
                      },
                      '@media (max-width: 480px)': {
                        padding: '14px 24px',
                        fontSize: '1rem',
                        minWidth: '200px',
                        borderWidth: '2px',
                      },
                      '@media (min-width: 1920px)': {
                        padding: '16px 32px',
                        fontSize: '1.1rem',
                      },
                      '@media (min-width: 2560px)': {
                        padding: '16px 32px',
                        fontSize: '1.1rem',
                      },
                      
                      '&:hover': {
                        borderColor: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderWidth: '2px',
                        transform: 'translateY(-2px)',
                        WebkitTransform: 'translateY(-2px)',
                        MozTransform: 'translateY(-2px)',
                        boxShadow: '0 4px 15px rgba(255, 255, 255, 0.2)',
                      }
                    }}
                  >
                    View Portfolio
                  </Button>
                </motion.div>
              </Box>
            </AnimatedSection>
          </HeroContent>
        </StyledContainer>
      </HeroSection>

      <WhyChooseSection>
        <Container maxWidth="xl">
          <AnimatedSection delay={0.3}>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h2" 
                  sx={{ 
                    mb: 4,
                    fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                    fontWeight: 700,
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Why Choose IronCoffee Solutions?
                </Typography>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 400,
                    lineHeight: 1.6,
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                    color: 'text.secondary',
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Expert craftsmanship meets cutting-edge innovation.
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    fontSize: { xs: '1rem', sm: '1.1rem' },
                    lineHeight: 1.7,
                    color: 'text.secondary',
                    textAlign: { xs: 'center', md: 'left' }
                  }}
                >
                  Professional web designer who handles everything – from stunning visuals and SEO optimization 
                  to custom functionality that perfectly showcases your business. No templates, no limitations, just pure custom excellence.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <VideoContainer>
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                  >
                    <source src="/videos/app-overview-montage.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </VideoContainer>
              </Grid>
            </Grid>
          </AnimatedSection>
        </Container>
      </WhyChooseSection>

      <ServicesSection>
        <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
          <AnimatedSection delay={0.4}>
            <Typography 
              variant="h2" 
              align="center" 
              sx={{ 
                mb: 6,
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 700
              }}
            >
              Services
            </Typography>

            <Box sx={{ maxWidth: '1200px', mx: 'auto' }}>
              {[
                {
                  title: 'Frontend Development',
                  description: 'React & TypeScript mastery creating stunning, responsive user interfaces with Material-UI, smooth animations, and pixel-perfect designs that captivate users.',
                  icon: '🎨',
                  highlight: 'Beautiful UI/UX + Lightning Performance',
                  link: '/services'
                },
                {
                  title: 'Backend Development',
                  description: 'Python, FastAPI & AWS cloud infrastructure powering scalable APIs, secure databases, and robust systems that handle enterprise-level traffic.',
                  icon: '⚙️',
                  highlight: 'Enterprise-Grade Architecture',
                  link: '/services'
                },
                {
                  title: 'Mobile App Development',
                  description: 'React Native expertise delivering native-performance mobile experiences across iOS & Android with seamless cloud integration and App Store optimization.',
                  icon: '📱',
                  highlight: 'Cross-Platform Excellence',
                  link: '/services'
                },
                {
                  title: 'IT Solutions & Consulting',
                  description: 'Complete technology strategy, cloud migration, system optimization, and technical consulting to modernize your business infrastructure and workflows.',
                  icon: '💼',
                  highlight: 'Strategic Technology Partnership',
                  link: '/services'
                },
              ].map((service, index) => (
                <AnimatedSection key={index} delay={0.2 * (index + 1)}>
                  <ServiceCard
                    onClick={() => handleServiceClick(index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Grid container spacing={3} alignItems="center">
                      <Grid item xs={12} sm={2} md={1}>
                        <Box sx={{ 
                          textAlign: { xs: 'center', sm: 'left' },
                          fontSize: { xs: '3rem', sm: '3.5rem', md: '4rem' }
                        }}>
                          {service.icon}
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={10} md={11}>
                        <Box sx={{ position: 'relative', zIndex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                          <Typography 
                            variant="h4" 
                            sx={{ 
                              mb: 1,
                              fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2rem' },
                              fontWeight: 600
                            }}
                          >
                            {service.title}
                          </Typography>
                          <Typography 
                            variant="subtitle1"
                            sx={{
                              color: 'primary.main',
                              fontSize: { xs: '0.9rem', sm: '1rem' },
                              fontWeight: 500,
                              mb: 1
                            }}
                          >
                            {service.highlight}
                          </Typography>
                          <Typography 
                            variant="body1"
                            sx={{
                              color: 'text.secondary',
                              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                              lineHeight: 1.6
                            }}
                          >
                            {service.description}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </ServiceCard>
                </AnimatedSection>
              ))}
            </Box>
          </AnimatedSection>
        </Container>
      </ServicesSection>

      <CustomWebsiteSection>
        <Container maxWidth="lg">
          <AnimatedSection delay={0.6}>
            <Typography 
              variant="h3" 
              align="center"
              sx={{ 
                mb: 2,
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                fontWeight: 700
              }}
            >
              Custom Websites vs. Template Builders
            </Typography>
            <Typography 
              variant="h6" 
              align="center"
              sx={{ 
                mb: 6,
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              Why custom development delivers superior long-term value
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ComparisonCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Typography variant="h5" sx={{ mb: 2, color: 'error.main' }}>
                    🚫 Template Builders (WordPress, Wix, Weebly)
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, '& li': { mb: 1, color: 'text.secondary' } }}>
                    <li>Monthly/yearly subscription fees forever</li>
                    <li>Limited customization options</li>
                    <li>Template-based design constraints</li>
                    <li>SEO limitations and slower performance</li>
                    <li>Vendor lock-in with migration difficulties</li>
                    <li>Generic look shared with thousands of sites</li>
                  </Box>
                </ComparisonCard>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <ComparisonCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Typography variant="h5" sx={{ mb: 2, color: 'success.main' }}>
                    ✨ Custom IronCoffee Solutions
                  </Typography>
                  <Box component="ul" sx={{ pl: 2, '& li': { mb: 1, color: 'text.secondary' } }}>
                    <li>Higher upfront cost, lower long-term expenses</li>
                    <li>100% customizable – anything you envision</li>
                    <li>Professional designer handling all aspects</li>
                    <li>Optimized SEO, performance, and conversions</li>
                    <li>Complete ownership and control</li>
                    <li>Unique design that stands out from competitors</li>
                  </Box>
                </ComparisonCard>
              </Grid>
            </Grid>
            
            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  fontWeight: 600,
                  color: 'primary.main',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
                  
                  /* Enhanced responsive sizing */
                  '@media (max-width: 320px)': {
                    fontSize: '1rem',
                    mb: 2,
                  },
                  '@media (max-width: 480px)': {
                    fontSize: '1.1rem',
                    mb: 2.5,
                  },
                  '@media (min-width: 768px)': {
                    fontSize: '1.25rem',
                  },
                  '@media (min-width: 1920px)': {
                    fontSize: '1.3rem',
                  },
                }}
              >
                Investment: Only domain + hosting costs after launch
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.7,
                  color: 'text.secondary',
                  fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
                  
                  /* Enhanced responsive sizing */
                  '@media (max-width: 320px)': {
                    fontSize: '0.95rem',
                    maxWidth: '95%',
                    lineHeight: 1.6,
                  },
                  '@media (max-width: 480px)': {
                    fontSize: '1rem',
                    maxWidth: '90%',
                    lineHeight: 1.65,
                  },
                  '@media (min-width: 768px)': {
                    fontSize: '1.1rem',
                    maxWidth: '650px',
                  },
                  '@media (min-width: 1920px)': {
                    fontSize: '1.15rem',
                    maxWidth: '700px',
                  },
                }}
              >
                I handle everything – design, development, SEO optimization, performance tuning, and strategic positioning. 
                You get a professional web designer who creates exactly what you need to showcase your business perfectly, 
                attract more customers, and stand out from the competition.
              </Typography>
            </Box>
          </AnimatedSection>
        </Container>
      </CustomWebsiteSection>
    </PageTransition>
  );
};

export default Home;
