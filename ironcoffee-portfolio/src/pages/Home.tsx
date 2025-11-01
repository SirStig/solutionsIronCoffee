import React from 'react';
import { Container, Typography, Box, Button, Grid, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import AnimatedSection from '../components/AnimatedSection';

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  /* Modern viewport units with fallback */
  @supports (height: 100dvh) {
    height: 100dvh;
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
    background-image: url('/images/fallbacks/hero.png');
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
`;

const StyledContainer = styled(Container)`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: clamp(6vh, 9vh, 14vh);
  
  /* Enhanced mobile centering */
  @media (max-width: 767px) {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    text-align: center;
    padding-top: clamp(5vh, 7vh, 12vh);
  }
  
  @media (min-width: 768px) {
    display: flex;
    text-align: left;
    padding-top: clamp(7vh, 11vh, 17vh);
  }
`;

const HeroContent = styled.div`
  max-width: clamp(400px, 50vw, 900px);
  text-align: center;
  width: 100%;
  margin: 0 auto;
  
  /* Enhanced responsive sizing */
  @media (max-width: 767px) {
    max-width: 90%;
  }
  
  @media (min-width: 768px) {
    max-width: clamp(500px, 45vw, 900px);
  }
`;

const HeroTag = styled(motion.div)`
  display: inline-block;
  padding: clamp(0.25rem, 0.75vw, 0.4rem) clamp(0.6rem, 1.5vw, 0.9rem);
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
  
  @media (max-width: 767px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const AboutSection = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: transparent;
`;

const StoryCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: clamp(16px, 2.5vw, 20px);
  padding: clamp(1.5rem, 4vw, 2.5rem);
  box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(32px, 4vw, 48px) rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 clamp(12px, 2vw, 20px) clamp(40px, 5vw, 60px) rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const KeywordTag = styled(Chip)`
  margin: 0.5rem 0.5rem 0.5rem 0;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: ${props => props.theme.palette.text.primary};
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateY(-2px);
  }
`;

const ServicesSection = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: transparent;
`;

const ServicesCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: clamp(16px, 2.5vw, 20px);
  padding: clamp(1rem, 2.5vw, 1.5rem);
  box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(32px, 4vw, 48px) rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 clamp(12px, 2vw, 20px) clamp(40px, 5vw, 60px) rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const FeaturedProductsSection = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: transparent;
`;

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: clamp(16px, 2.5vw, 20px);
  overflow: hidden;
  box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(32px, 4vw, 48px) rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 clamp(12px, 2vw, 20px) clamp(40px, 5vw, 60px) rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ProjectImage = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 350px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  @media (max-width: 768px) {
    height: 280px;
  }
`;

const CustomWebsiteSection = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: transparent;
`;

const ComparisonCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-radius: clamp(12px, 2vw, 16px);
  padding: clamp(1.5rem, 3vw, 2rem);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 clamp(12px, 2vw, 18px) clamp(40px, 4vw, 56px) rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const CTASection = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: transparent;
  text-align: center;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <Helmet>
        <title>IronCoffee Solutions - From Idea to Deployment</title>
        <meta name="description" content="Next-generation software solutions for websites, servers, and mobile apps. Transform your idea into a reality with custom development that delivers excellence." />
      </Helmet>

      <HeroSection>
        <HeroBackground />
        <HeroOverlay />
        <StyledContainer maxWidth="lg">
          <HeroContent>
            <AnimatedSection>
              <HeroTag
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.5rem', sm: '0.6rem', md: '0.7rem' },
                    fontWeight: 600,
                    color: 'white',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                >
                  Next-Generation Software Solutions
                </Typography>
              </HeroTag>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem', lg: '5.5rem' },
                  textAlign: 'center',
                  fontWeight: 800,
                  marginBottom: 2,
                  width: '100%',
                  lineHeight: 1.2,
                  letterSpacing: { xs: '-0.02em', sm: '-0.03em', md: '-0.04em' },
                  paddingTop: '0.1em',
                  paddingBottom: '0.15em',
                  background: 'linear-gradient(135deg, #64FFDA 0%, #3B82F6 25%, #8B5CF6 50%, #EC4899 75%, #F59E0B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'block',
                }}
              >
                From Idea to Deployment
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.15rem' },
                  textAlign: 'center',
                  marginBottom: { xs: 3, md: 4 },
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.9)',
                  width: '100%',
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.7,
                }}
              >
                Transforming your vision into powerful digital solutions. Specializing in websites, servers, and mobile apps that drive results.
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                gap: 'clamp(1rem, 3vw, 1.5rem)', 
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    component={Link}
                    to="/portfolio"
                    variant="contained"
                    size="large"
                    sx={{
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      width: { xs: '100%', sm: 'auto' },
                      minWidth: { xs: '180px', sm: '160px' },
                      color: 'white',
                    }}
                  >
                    View My Work
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    component={Link}
                    to="/contact"
                    variant="contained"
                    size="large"
                    sx={{
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      width: { xs: '100%', sm: 'auto' },
                      minWidth: { xs: '180px', sm: '160px' },
                      color: 'white',
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.95) 0%, rgba(126, 34, 206, 0.95) 100%)',
                        boxShadow: '0 6px 30px rgba(59, 130, 246, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                      }
                    }}
                  >
                    Start Your Project
                  </Button>
                </motion.div>
              </Box>
            </AnimatedSection>
          </HeroContent>
        </StyledContainer>
      </HeroSection>

      <AboutSection>
        <Container maxWidth="lg">
          <AnimatedSection delay={0.2}>
            <Typography 
              variant="h2" 
              align="center"
              sx={{ 
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                fontWeight: 700
              }}
            >
              About
            </Typography>
            <Typography 
              variant="h5" 
              align="center"
              sx={{ 
                mb: 3,
                color: 'text.secondary',
                fontWeight: 400,
                fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' }
              }}
            >
              Creative Technologist & Problem Solver
            </Typography>
            <Typography 
              variant="body1" 
              align="center"
              sx={{ 
                mb: 5,
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                lineHeight: 1.7
              }}
            >
              Passionate about crafting digital experiences that blend cutting-edge technology with intuitive design. With over a year of hands-on experience in full-stack development, I specialize in building scalable web applications, robust backend systems, and engaging mobile experiences. I thrive on turning complex problems into elegant, performant solutions that users love to interact with.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <StoryCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    My Approach
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    I believe in thorough research and understanding your unique needs before writing a single line of code. This ensures every solution is perfectly tailored to your vision and goals. Every project gets the attention it deserves – from initial research to final polish.
                  </Typography>
                </StoryCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <StoryCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    The Result
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                    There's nothing more satisfying than seeing a project come to life. I take pride in delivering solutions that not only work flawlessly but look stunning and perform exceptionally. I'm a perfectionist who creates premium deliverables that exceed expectations.
                  </Typography>
                </StoryCard>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', mt: 4, mb: 4 }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3,
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.1rem' }
                }}
              >
                What You Can Expect
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mb: 4 }}>
                {['Mission-Driven', 'Excellence', 'Innovation', 'Client-First', 'Professionalism', 'Modern Technologies', 'Premium Deliverables'].map((keyword) => (
                  <KeywordTag
                    key={keyword}
                    label={keyword}
                    sx={{
                      fontSize: { xs: '0.65rem', sm: '0.7rem', md: '0.75rem' },
                      padding: { xs: '0.2rem 0.5rem', md: '0.3rem 0.65rem' },
                      height: { xs: '22px', md: '26px' }
                    }}
                  />
                ))}
              </Box>
              <Button
                component={Link}
                to="/about"
                variant="outlined"
                size="large"
                sx={{
                  padding: '12px 32px',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                Learn More About Me
              </Button>
            </Box>
          </AnimatedSection>
        </Container>
      </AboutSection>

      <ServicesSection>
        <Container maxWidth="lg">
          <AnimatedSection delay={0.3}>
            <Typography 
              variant="h2" 
              align="center"
              sx={{ 
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                fontWeight: 700
              }}
            >
              My Services
            </Typography>
            <Typography 
              variant="h6" 
              align="center"
              sx={{ 
                mb: 5,
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7
              }}
            >
              From beautiful websites to powerful mobile apps, I build solutions that drive your business forward.
            </Typography>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <ServicesCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                    Custom Web Development
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 1.5, fontSize: { xs: '0.85rem', md: '0.9rem' } }}>
                    Stunning websites, landing pages, and web applications built from the ground up. No templates, just pure custom excellence tailored to your brand.
                  </Typography>
                  <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                    {['E-Commerce Stores', 'Business Websites', 'Web Applications', 'Landing Pages'].map((item) => (
                      <Box component="li" key={item} sx={{ mb: 0.5, color: 'text.primary', fontSize: { xs: '0.95rem', md: '1rem' }, fontWeight: 500, '&::before': { content: '"✓ "', color: 'primary.main', fontWeight: 'bold', mr: 0.75 } }}>
                        {item}
                      </Box>
                    ))}
                  </Box>
                </ServicesCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <ServicesCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                    Management Systems & CMS
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 1.5, fontSize: { xs: '0.85rem', md: '0.9rem' } }}>
                    Full-featured content management systems with click-to-edit capabilities. Manage your products, content, and business data through intuitive admin dashboards.
                  </Typography>
                  <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                    {['Click-to-Edit Content', 'Product & Inventory Management', 'Admin Dashboards', 'Custom Options Management'].map((item) => (
                      <Box component="li" key={item} sx={{ mb: 0.5, color: 'text.primary', fontSize: { xs: '0.95rem', md: '1rem' }, fontWeight: 500, '&::before': { content: '"✓ "', color: 'primary.main', fontWeight: 'bold', mr: 0.75 } }}>
                        {item}
                      </Box>
                    ))}
                  </Box>
                </ServicesCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <ServicesCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                    Mobile Apps
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 1.5, fontSize: { xs: '0.85rem', md: '0.9rem' } }}>
                    Native-performance mobile applications for iOS and Android. Beautiful interfaces, smooth animations, and powerful functionality.
                  </Typography>
                  <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                    {['iOS & Android Apps', 'Native Performance', 'Cloud Integration', 'Real-Time Features'].map((item) => (
                      <Box component="li" key={item} sx={{ mb: 0.5, color: 'text.primary', fontSize: { xs: '0.95rem', md: '1rem' }, fontWeight: 500, '&::before': { content: '"✓ "', color: 'primary.main', fontWeight: 'bold', mr: 0.75 } }}>
                        {item}
                      </Box>
                    ))}
                  </Box>
                </ServicesCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <ServicesCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Typography variant="h5" sx={{ mb: 1, fontWeight: 600, fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                    Server & Backend Solutions
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, mb: 1.5, fontSize: { xs: '0.85rem', md: '0.9rem' } }}>
                    Robust backend systems, APIs, and cloud infrastructure that scale with your business and keep everything running smoothly.
                  </Typography>
                  <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                    {['Cloud Infrastructure', 'API Development', 'Database Systems', 'DevOps & Scaling'].map((item) => (
                      <Box component="li" key={item} sx={{ mb: 0.5, color: 'text.primary', fontSize: { xs: '0.95rem', md: '1rem' }, fontWeight: 500, '&::before': { content: '"✓ "', color: 'primary.main', fontWeight: 'bold', mr: 0.75 } }}>
                        {item}
                      </Box>
                    ))}
                  </Box>
                </ServicesCard>
              </Grid>
            </Grid>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}>
              <Button
                component={Link}
                to="/services"
                variant="contained"
                size="large"
                sx={{
                  padding: '12px 32px',
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                View All Services
              </Button>
            </Box>
          </AnimatedSection>
        </Container>
      </ServicesSection>

      <FeaturedProductsSection>
        <Container maxWidth="lg">
          <AnimatedSection delay={0.4}>
            <Typography 
              variant="h2" 
              align="center"
              sx={{ 
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                fontWeight: 700
              }}
            >
              Featured Projects
            </Typography>
            <Typography 
              variant="h6" 
              align="center"
              sx={{ 
                mb: 5,
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7
              }}
            >
              See how I've helped bring ambitious ideas to life with stunning results.
            </Typography>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ProjectCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => navigate('/portfolio')}
                  style={{ cursor: 'pointer' }}
                >
                  <ProjectImage imageUrl="/images/projects/yoked.png" />
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                      Project Yoked
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                      A revolutionary fitness social platform featuring AI-powered content, comprehensive tracking, and personalized analytics. Built as CEO/Founder of Project Yoked LLC.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                      {['Mobile App', 'Web App', 'AI', 'Social Platform'].map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            fontSize: '0.65rem',
                            height: '20px',
                            padding: '0 0.5rem',
                            '& .MuiChip-label': {
                              padding: '0 0.25rem',
                              fontSize: '0.65rem',
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </ProjectCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <ProjectCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => navigate('/portfolio')}
                  style={{ cursor: 'pointer' }}
                >
                  <ProjectImage imageUrl="/images/projects/eaglechair-homepage.png" />
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ mb: 1, fontWeight: 600 }}>
                      Eagle Chair Project
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 2 }}>
                      A premium furniture brand's complete digital flagship experience. Beautiful e-commerce platform with seamless shopping and product storytelling.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                      {['E-Commerce', 'Web App', 'Premium Brand'].map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            fontSize: '0.65rem',
                            height: '20px',
                            padding: '0 0.5rem',
                            '& .MuiChip-label': {
                              padding: '0 0.25rem',
                              fontSize: '0.65rem',
                            }
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </ProjectCard>
              </Grid>
            </Grid>
          </AnimatedSection>
        </Container>
      </FeaturedProductsSection>

      <CustomWebsiteSection>
        <Container maxWidth="lg">
          <AnimatedSection delay={0.5}>
            <Typography 
              variant="h3" 
              align="center"
              sx={{ 
                mb: 2,
                fontSize: { xs: '1.5rem', sm: '1.875rem', md: '2.25rem' },
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

      <CTASection>
        <Container maxWidth="md">
          <AnimatedSection delay={0.6}>
            <Typography 
              variant="h2" 
              align="center"
              sx={{ 
                mb: 3,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                fontWeight: 700
              }}
            >
              Ready to Bring Your Idea to Life?
            </Typography>
            <Typography 
              variant="h6" 
              align="center"
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.7,
                fontSize: { xs: '1rem', md: '1.1rem' }
              }}
            >
              Let's transform your vision into a powerful digital solution. Whether it's a website, mobile app, or custom platform, I'm here to make it happen.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                size="large"
                sx={{
                  padding: '14px 36px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                Get Started Today
              </Button>
              <Button
                component={Link}
                to="/portfolio"
                variant="outlined"
                size="large"
                sx={{
                  padding: '14px 36px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                }}
              >
                View My Work
              </Button>
            </Box>
          </AnimatedSection>
        </Container>
      </CTASection>
    </PageTransition>
  );
};

export default Home;