import React from 'react';
import { Container, Typography, Grid, Box, Avatar, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import PageTransition from '../components/PageTransition';
import AnimatedSection from '../components/AnimatedSection';

const HeroSection = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem);
  background: transparent;
`;

const Section = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: transparent;
`;

const ValuesSection = styled.section`
  padding: 0 0 clamp(5rem, 10vw, 8rem) 0;
  background: transparent;
`;

const StyledAvatar = styled(Avatar)`
  && {
    width: clamp(200px, 20vw, 300px);
    height: clamp(200px, 20vw, 300px);
    margin: 0 auto;
    box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(32px, 4vw, 48px) rgba(0, 0, 0, 0.2);
    border: 3px solid rgba(255, 255, 255, 0.1);
  }
`;

const ContentCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: clamp(16px, 2.5vw, 20px);
  padding: clamp(1.5rem, 3vw, 2.5rem);
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

const ValueTag = styled(Box)`
  display: inline-block;
  padding: clamp(0.3rem, 0.75vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50px;
  font-size: clamp(0.7rem, 1vw, 0.85rem);
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const TechStackContainer = styled(Box)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: clamp(16px, 2.5vw, 20px);
  padding: clamp(2rem, 4vw, 3rem);
  box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(32px, 4vw, 48px) rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const About = () => {
  const whyChooseMe = [
    {
      title: 'All-in-One Developer',
      description: 'I handle every aspect of your project. From initial design and SEO to frontend, backend, mobile apps, and deployment – I think through it all, figure it all out, and execute it efficiently. You get one developer who understands the entire stack.'
    },
    {
      title: 'Perfectionist Who Delivers',
      description: 'I refuse to deliver anything half-baked. If something isn\'t right, I\'ll scrap it and rebuild it entirely rather than compromise. Every client deserves perfection, and I\'m willing to work 80+ hour weeks with sleepless nights to achieve it.'
    },
    {
      title: 'Self-Taught Mastery',
      description: '15 years of coding since I was 10, with thousands of hours spent learning through trial and error. I have a deep, complex understanding of technologies because I\'ve figured them out from the ground up – no shortcuts, just comprehensive knowledge.'
    },
    {
      title: 'Fast, Efficient & Driven',
      description: 'Speed matters, but so does quality. I work efficiently without sacrificing excellence. My drive is fueled by big goals and the motivation to provide the best for my family. When I commit to your project, nothing stops me from seeing it through perfectly.'
    },
    {
      title: 'Full-Stack Infrastructure Expertise',
      description: 'Beyond code, I understand servers, networks, databases, and cloud infrastructure. I\'ve set up entire systems from scratch – AWS infrastructure, VPN servers, media servers, network administration, and more. Your entire technical ecosystem is in capable hands.'
    },
    {
      title: 'Client Satisfaction Above All',
      description: 'Your happiness is my priority. I want every single client happy, even if it means starting over completely. I\'d rather rebuild from scratch than deliver something you\'re not thrilled with. Your success is my success.'
    }
  ];

  const values = [
    'Perfectionism',
    'Dedication',
    'Excellence',
    'Innovation',
    'Client-First',
    'Problem-Solving',
    'Self-Improvement',
    'Persistence',
    'Comprehensive Understanding',
    'Quality Above All'
  ];

  const technologies = {
    frontend: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Material-UI'],
    backend: ['Python', 'FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'MySQL', 'SQLAlchemy'],
    mobile: ['React Native', 'iOS Development', 'Android Development'],
    cloudDevOps: ['Docker', 'GitHub', 'AWS', 'Dreamhost', 'CI/CD', 'Hyper-V', 'Firebase'],
    networkSystems: ['VPNs', 'Servers', 'Ollama', 'Ubiquiti', 'Network Administration', 'Firewall Configuration']
  };

  return (
    <PageTransition>
      <Helmet>
        <title>About - IronCoffee Solutions</title>
        <meta name="description" content="Learn about my expertise, values, and passion for creating exceptional digital experiences. Discover why I'm the right choice for your project." />
      </Helmet>

      <HeroSection>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <AnimatedSection>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography 
                  variant="h1" 
                  sx={{ 
                    mb: 2,
                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                    fontWeight: 700
                  }}
                >
                  Who I Am
                </Typography>
                <Typography 
                  variant="h4" 
                  sx={{ 
                    mb: 3,
                    fontWeight: 400,
                    color: 'text.secondary',
                    fontSize: { xs: '1.25rem', md: '1.5rem' }
                  }}
                >
                  Creative Technologist & Problem Solver
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3,
                    color: 'text.secondary',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.7
                  }}
                >
                  I've been coding since I was 10 years old, starting with Java mods for Minecraft and even working on the team for the first-ever mod maker for Minecraft. My journey began watching my father build mobile apps at his company, which sparked my passion for development. From there, I taught myself everything – HTML, CSS, JavaScript, Python, React, mobile development, and so much more through thousands of hours of trial, error, and relentless learning.
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    mb: 3,
                    color: 'text.secondary',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.7
                  }}
                >
                  In 2024, I made the decision to pursue development full-time. Since then, I've built everything from full e-commerce platforms with complete CMS systems to massive social media platforms, media processing applications, and complex financial systems. I'm entirely self-taught – no college, no formal training – just pure dedication and the drive to figure things out.
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    lineHeight: 1.7
                  }}
                >
                  What makes me unique? I'm a true all-in-one developer. I handle design, SEO, frontend, backend, mobile apps, DevOps, infrastructure, and everything in between. I can think through entire systems, solve complex problems quickly, and execute efficiently. I'm extremely driven, work tirelessly when needed, and strive for perfection in every single project.
                </Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
                <StyledAvatar
                  alt="Profile Picture"
                  src={`${process.env.PUBLIC_URL}/images/profile.JPEG`}
                  sx={{ 
                    bgcolor: 'secondary.main',
                  }}
                />
              </Grid>
            </Grid>
          </AnimatedSection>
        </Container>
      </HeroSection>

      <Section>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
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
              Why Choose Me
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
              What sets me apart in delivering exceptional results
            </Typography>

            <Grid container spacing={3}>
              {whyChooseMe.map((item, index) => (
                <Grid item xs={12} sm={6} md={4} key={item.title}>
                  <ContentCard
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        mb: 1.5, 
                        fontWeight: 600, 
                        fontSize: { xs: '1.1rem', md: '1.25rem' } 
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: 'text.secondary', 
                        lineHeight: 1.7, 
                        fontSize: { xs: '0.9rem', md: '0.95rem' } 
                      }}
                    >
                      {item.description}
                    </Typography>
                  </ContentCard>
                </Grid>
              ))}
            </Grid>
          </AnimatedSection>
        </Container>
      </Section>

      <ValuesSection>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
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
              My Values
            </Typography>
            <Typography 
              variant="h6" 
              align="center"
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.7
              }}
            >
              The principles that guide my work
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1.5 }}>
              {values.map((value) => (
                <ValueTag key={value}>
                  {value}
                </ValueTag>
              ))}
            </Box>
          </AnimatedSection>
        </Container>
      </ValuesSection>

      <Section>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <AnimatedSection delay={0.35}>
            <Typography 
              variant="h2" 
              align="center"
              sx={{ 
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                fontWeight: 700
              }}
            >
              My Journey & Major Projects
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
              Building ambitious projects and learning through doing
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <ContentCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 1.5, 
                      fontWeight: 600, 
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      color: 'primary.main'
                    }}
                  >
                    Project Yoked
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary', 
                      lineHeight: 1.7, 
                      fontSize: { xs: '0.9rem', md: '0.95rem' },
                      mb: 2
                    }}
                  >
                    A massive fitness social media platform I developed entirely myself as CEO/Founder. Complete mobile app, full website, and backend servers using AI for content moderation, AWS infrastructure for video processing, subscriptions, ad systems, comprehensive workout tracking with gamification, and a full admin dashboard.
                  </Typography>
                </ContentCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <ContentCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 1.5, 
                      fontWeight: 600, 
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      color: 'primary.main'
                    }}
                  >
                    Eagle Chair E-Commerce Platform
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary', 
                      lineHeight: 1.7, 
                      fontSize: { xs: '0.9rem', md: '0.95rem' },
                      mb: 2
                    }}
                  >
                    Migrating a premium furniture brand from WordPress to a fully custom solution. Complete e-commerce platform with a comprehensive CMS system, custom server architecture, and database optimization. Almost complete, with a live demo showcasing the full backend infrastructure.
                  </Typography>
                </ContentCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <ContentCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 1.5, 
                      fontWeight: 600, 
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      color: 'primary.main'
                    }}
                  >
                    EncodeForge
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary', 
                      lineHeight: 1.7, 
                      fontSize: { xs: '0.9rem', md: '0.95rem' },
                      mb: 2
                    }}
                  >
                    My own media processing application using FFMPEG for encoding, AI-powered subtitle generation, metadata extraction, and file management. Originally built in Java, now being converted to Python with PySide for a modern cross-platform experience.
                  </Typography>
                </ContentCard>
              </Grid>
              <Grid item xs={12} md={6}>
                <ContentCard
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 1.5, 
                      fontWeight: 600, 
                      fontSize: { xs: '1.1rem', md: '1.25rem' },
                      color: 'primary.main'
                    }}
                  >
                    Financial Platform
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: 'text.secondary', 
                      lineHeight: 1.7, 
                      fontSize: { xs: '0.9rem', md: '0.95rem' },
                      mb: 2
                    }}
                  >
                    Built a comprehensive financial management platform using Stripe, Plaid, and PayPal APIs with pure HTML, CSS, JavaScript, and Python FastAPI. Near completion but halted due to banking regulatory costs – a testament to taking on ambitious projects and learning from the experience.
                  </Typography>
                </ContentCard>
              </Grid>
            </Grid>
          </AnimatedSection>
        </Container>
      </Section>

      <Section>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
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
              Beyond Code
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
              What drives me and what I enjoy outside of development
            </Typography>

            <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
              <ContentCard
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary', 
                    lineHeight: 1.8, 
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    mb: 2
                  }}
                >
                  My motivation comes from having huge, ambitious goals and the drive to achieve them – no matter how impossible they may seem to others. I'm driven by the desire to provide the best for my family, which means I'm willing to work 80+ hour weeks with sleepless nights when necessary. I don't stop at obstacles; I find solutions.
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary', 
                    lineHeight: 1.8, 
                    fontSize: { xs: '1rem', md: '1.1rem' }
                  }}
                >
                  When I'm not coding, you'll find me hiking, ice skating, skiing, driving, enjoying music, fishing, camping, or exploring the outdoors. These activities recharge me and keep me balanced, allowing me to bring fresh perspectives and energy to every project.
                </Typography>
              </ContentCard>
            </Box>
          </AnimatedSection>
        </Container>
      </Section>

      <Section>
        <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
          <AnimatedSection delay={0.5}>
            <Typography 
              variant="h2" 
              align="center"
              sx={{ 
                mb: 1,
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
                fontWeight: 700
              }}
            >
              Technologies & Expertise
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
              The modern tools and technologies I work with
            </Typography>

            <TechStackContainer>
              <Grid container spacing={4}>
                {Object.entries(technologies).map(([key, techs]) => (
                  <Grid item xs={12} sm={6} md={4} key={key}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 2, 
                        fontWeight: 600, 
                        fontSize: { xs: '1rem', md: '1.1rem' }, 
                        color: 'primary.main' 
                      }}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {techs.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            background: 'rgba(255, 255, 255, 0.08)',
                            border: '1px solid rgba(255, 255, 255, 0.15)',
                            color: 'text.primary',
                            fontSize: '0.8rem',
                            height: '28px',
                            fontWeight: 500
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </TechStackContainer>
          </AnimatedSection>
        </Container>
      </Section>
    </PageTransition>
  );
};

export default About;
