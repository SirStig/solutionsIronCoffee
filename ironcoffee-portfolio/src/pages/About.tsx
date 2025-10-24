import React from 'react';
import { Container, Typography, Grid, Box, Card, LinearProgress, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';

const SkillCard = styled(Card)`
  padding: clamp(1.5rem, 3vw, 3rem);
  height: 100%;
  
  /* Comprehensive transition support */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  -webkit-transition: transform 0.3s ease, box-shadow 0.3s ease;
  -moz-transition: transform 0.3s ease, box-shadow 0.3s ease;
  -ms-transition: transform 0.3s ease, box-shadow 0.3s ease;
  -o-transition: transform 0.3s ease, box-shadow 0.3s ease;
  
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
    transform: translateY(-8px);
    -webkit-transform: translateY(-8px);
    -moz-transform: translateY(-8px);
    -ms-transform: translateY(-8px);
    -o-transform: translateY(-8px);
    
    /* Enhanced responsive shadow */
    box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(24px, 3vw, 40px) rgba(0, 0, 0, 0.15);
    -webkit-box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(24px, 3vw, 40px) rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(24px, 3vw, 40px) rgba(0, 0, 0, 0.15);
  }
  
  /* Enhanced responsive design */
  @media (max-width: 320px) {
    padding: clamp(1rem, 2.5vw, 1.25rem);
  }
  
  @media (max-width: 480px) {
    padding: clamp(1.25rem, 3vw, 1.75rem);
  }
  
  @media (max-width: 768px) {
    padding: clamp(1.5rem, 2.8vw, 2.25rem);
  }
  
  @media (min-width: 1920px) {
    padding: 2rem;
    max-width: 400px;
    margin: 0 auto;
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

const StyledAvatar = styled(Avatar)`
  && {
    width: clamp(180px, 15vw, 280px);
    height: clamp(180px, 15vw, 280px);
    margin-bottom: clamp(1.5rem, 3vw, 3rem);
    
    /* Enhanced box shadow with browser compatibility */
    box-shadow: 0 clamp(20px, 3vw, 32px) clamp(40px, 5vw, 64px) clamp(-15px, -2vw, -24px) rgba(2, 12, 27, 0.7),
                inset 0 0 clamp(30px, 4vw, 48px) clamp(10px, 1.5vw, 16px) rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 clamp(20px, 3vw, 32px) clamp(40px, 5vw, 64px) clamp(-15px, -2vw, -24px) rgba(2, 12, 27, 0.7),
                        inset 0 0 clamp(30px, 4vw, 48px) clamp(10px, 1.5vw, 16px) rgba(0, 0, 0, 0.2);
    -moz-box-shadow: 0 clamp(20px, 3vw, 32px) clamp(40px, 5vw, 64px) clamp(-15px, -2vw, -24px) rgba(2, 12, 27, 0.7),
                     inset 0 0 clamp(30px, 4vw, 48px) clamp(10px, 1.5vw, 16px) rgba(0, 0, 0, 0.2);
    
    /* Comprehensive transition support */
    transition: all 0.3s ease-in-out;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    
    object-fit: cover;
    -o-object-fit: cover; /* Opera support */
    border-radius: 50%;
    border: none;
    background: ${({ theme }) => theme.palette.background.default};
    
    /* Performance optimization */
    will-change: transform, box-shadow;
    
    /* Touch improvements */
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 50%;
      box-shadow: inset 0 0 clamp(20px, 3vw, 32px) clamp(5px, 1vw, 8px) rgba(0, 0, 0, 0.25);
      -webkit-box-shadow: inset 0 0 clamp(20px, 3vw, 32px) clamp(5px, 1vw, 8px) rgba(0, 0, 0, 0.25);
      -moz-box-shadow: inset 0 0 clamp(20px, 3vw, 32px) clamp(5px, 1vw, 8px) rgba(0, 0, 0, 0.25);
      pointer-events: none;
    }

    /* Enhanced responsive design for all screen sizes */
    @media (max-width: 320px) {
      width: clamp(150px, 12vw, 180px);
      height: clamp(150px, 12vw, 180px);
      margin-bottom: clamp(1rem, 2.5vw, 1.5rem);
    }

    @media (max-width: 480px) {
      width: clamp(180px, 14vw, 220px);
      height: clamp(180px, 14vw, 220px);
      margin-bottom: clamp(1.25rem, 3vw, 2rem);
    }

    @media (max-width: 768px) {
      width: clamp(220px, 16vw, 280px);
      height: clamp(220px, 16vw, 280px);
      margin-bottom: clamp(1.5rem, 3.5vw, 2.5rem);
    }

    @media (min-width: 1024px) {
      width: clamp(250px, 14vw, 320px);
      height: clamp(250px, 14vw, 320px);
    }
    
    @media (min-width: 1920px) {
      width: 250px;
      height: 250px;
      margin-bottom: 2rem;
    }

    &:hover {
      /* Transform with full browser compatibility */
      transform: scale(1.03);
      -webkit-transform: scale(1.03);
      -moz-transform: scale(1.03);
      -ms-transform: scale(1.03);
      -o-transform: scale(1.03);
      
      /* Enhanced responsive shadow on hover */
      box-shadow: 0 clamp(25px, 4vw, 40px) clamp(50px, 6vw, 80px) clamp(-12px, -1.5vw, -20px) rgba(2, 12, 27, 0.8),
                  inset 0 0 clamp(35px, 5vw, 56px) clamp(12px, 1.8vw, 20px) rgba(0, 0, 0, 0.25);
      -webkit-box-shadow: 0 clamp(25px, 4vw, 40px) clamp(50px, 6vw, 80px) clamp(-12px, -1.5vw, -20px) rgba(2, 12, 27, 0.8),
                          inset 0 0 clamp(35px, 5vw, 56px) clamp(12px, 1.8vw, 20px) rgba(0, 0, 0, 0.25);
      -moz-box-shadow: 0 clamp(25px, 4vw, 40px) clamp(50px, 6vw, 80px) clamp(-12px, -1.5vw, -20px) rgba(2, 12, 27, 0.8),
                       inset 0 0 clamp(35px, 5vw, 56px) clamp(12px, 1.8vw, 20px) rgba(0, 0, 0, 0.25);
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
  }
`;

const About = () => {
  const skills = {
    frontend: [
      { name: 'React & TypeScript', level: 90 },
      { name: 'Material-UI & Styled Components', level: 85 },
      { name: 'HTML5 & CSS3', level: 90 },
      { name: 'Framer Motion', level: 85 },
      { name: 'React Native', level: 80 },
    ],
    backend: [
      { name: 'Python & FastAPI', level: 90 },
      { name: '.NET & C#', level: 85 },
      { name: 'SQLAlchemy & PostgreSQL', level: 85 },
      { name: 'Redis & Celery', level: 80 },
      { name: 'RESTful APIs', level: 90 },
    ],
    cloud: [
      { name: 'AWS Services', level: 85 },
      { name: 'AWS CLI', level: 85 },
      { name: 'Docker & Containerization', level: 80 },
      { name: 'CI/CD Pipelines', level: 80 },
      { name: 'Firebase', level: 75 },
    ],
    gamedev: [
      { name: 'Unity Engine', level: 85 },
      { name: 'C# Game Development', level: 85 },
      { name: 'Unity UI & Physics', level: 80 },
      { name: 'Game Architecture', level: 75 },
    ],
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>About - IronCoffee Solutions</title>
        <meta name="description" content="Learn about our expertise in web development, mobile app development, backend development, and game development. Meet the creative technologist behind IronCoffee Solutions with over a year of experience." />
      </Helmet>

      <Box component="section" sx={{ 
        pt: { xs: 8, md: 12 },
        pb: { xs: 4, md: 6 },
        background: 'transparent',
        color: 'white'
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <Typography variant="h1" sx={{ 
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700
                }}>
                  About Me
                </Typography>
                <Typography variant="h4" sx={{ 
                  mb: 4,
                  fontWeight: 400,
                  color: 'rgba(255, 255, 255, 0.9)'
                }}>
                  Creative Technologist & Problem Solver
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <StyledAvatar
                  alt="Profile Picture"
                  src={`${process.env.PUBLIC_URL}/images/profile.JPEG`}
                  sx={{ 
                    margin: '0 auto',
                    bgcolor: 'secondary.main',
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Typography variant="h2" gutterBottom>
                Modern Tech Stack
              </Typography>
              <Typography variant="body1" paragraph>
                Passionate about crafting digital experiences that blend cutting-edge technology with intuitive design. With over a year of hands-on experience in full-stack development,
                I specialize in building scalable web applications, robust backend systems, and engaging mobile experiences. My journey spans from React-powered user interfaces
                to Python-driven APIs, AWS cloud architectures, and immersive Unity games. I thrive on turning complex problems into elegant, performant solutions
                that users love to interact with.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Typography variant="h3" gutterBottom>
                Frontend Development
              </Typography>
              <Box sx={{ mb: 4 }}>
                {skills.frontend.map((skill) => (
                  <Box key={skill.name} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {skill.name}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          background: 'linear-gradient(45deg, #7928CA, #FF0080)',
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Box sx={{ mt: 8 }}>
          <Typography variant="h3" gutterBottom>
            Backend & Tools
          </Typography>
          <Grid container spacing={4}>
            {[...skills.backend, ...skills.cloud].map((skill) => (
              <Grid item xs={12} sm={6} md={4} key={skill.name}>
                            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
                <SkillCard>
                  <Typography variant="h5" gutterBottom>
                    {skill.name}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={skill.level}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: 'linear-gradient(45deg, #64FFDA, #0A192F)',
                      },
                    }}
                  />
                </SkillCard>
              </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>



        <Box sx={{ mt: 8 }}>
          <Typography variant="h3" gutterBottom>
            Game Development
          </Typography>
          <Grid container spacing={4}>
            {skills.gamedev.map((skill) => (
              <Grid item xs={12} sm={6} md={3} key={skill.name}>
                            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
                <SkillCard>
                  <Typography variant="h5" gutterBottom>
                    {skill.name}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={skill.level}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 4,
                        background: 'linear-gradient(45deg, #FF49DB, #FF7CE5)',
                      },
                    }}
                  />
                </SkillCard>
              </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>


      </Container>
    </>
  );
};

export default About;
