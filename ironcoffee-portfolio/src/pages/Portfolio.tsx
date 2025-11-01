import React, { useState } from 'react';
import { Container, Typography, Box, Chip, Button, ChipProps, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Launch as LaunchIcon, GitHub as GitHubIcon, Lock as LockIcon } from '@mui/icons-material';

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 100%;
  min-height: 400px;
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  
  @media (max-width: 768px) {
    order: 2;
  }
`;

const MediaSection = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 400px;

  @media (max-width: 768px) {
    min-height: 300px;
    order: 1;
  }

  @media (max-width: 480px) {
    min-height: 250px;
  }
`;

const MediaContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  ${MediaContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ThumbnailStrip = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const ThumbnailButton = styled.button<{ $isActive: boolean }>`
  border: none;
  padding: 0;
  background: transparent;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  outline: ${({ $isActive, theme }) =>
    $isActive
      ? `2px solid ${theme.palette.primary.main}`
      : `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`};
  transition: transform 0.2s ease, outline-color 0.2s ease;
  -webkit-transition: transform 0.2s ease, outline-color 0.2s ease;
  -moz-transition: transform 0.2s ease, outline-color 0.2s ease;
  -o-transition: transform 0.2s ease, outline-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const ThumbnailImage = styled.img`
  width: 80px;
  height: 55px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 64px;
    height: 44px;
  }
`;

const ProjectVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease-in-out;

  ${MediaContainer}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const ProjectTitle = styled(Typography)`
  && {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.palette.text.primary};

    @media (max-width: 768px) {
      font-size: 1.75rem;
    }

    @media (max-width: 480px) {
      font-size: 1.5rem;
    }
  }
`;

const ProjectSubtitle = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const ProjectDescription = styled(Typography)`
  && {
    color: ${({ theme }) => theme.palette.text.secondary};
    line-height: 1.6;
    margin-bottom: 2rem;
    font-size: 1rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    gap: 0.4rem;
    margin-top: 0.75rem;
  }
`;

const StyledChip = styled(Chip)`
  && {
    background: ${({ theme }) => theme.palette.primary.main}15;
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 0.8rem;
    height: 28px;
    border: 1px solid ${({ theme }) => theme.palette.primary.main}30;
    
    @media (max-width: 768px) {
      font-size: 0.75rem;
      height: 26px;
    }
    
    &:hover {
      background: ${({ theme }) => theme.palette.primary.main}25;
    }
  }
`;

interface StatusChipProps extends Omit<ChipProps, 'color'> {
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

const StatusChip = styled(Chip)<StatusChipProps>`
  && {
    background: ${({ theme, color }) => theme.palette[color || 'primary']?.main};
    color: white;
    font-size: 0.8rem;
    height: 28px;
    font-weight: 500;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const StyledButton = styled(Button)`
  && {
    color: ${({ theme }) => theme.palette.primary.main};
    border-color: ${({ theme }) => theme.palette.primary.main};
    padding: 0.5rem 1.5rem;
    
    &:hover {
      border-color: ${({ theme }) => theme.palette.primary.main};
      background: ${({ theme }) => theme.palette.primary.main}10;
    }
  }
`;

interface ProjectStatus {
  label: string;
  color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  images?: string[];
  video?: string;
  category: string[];
  status?: ProjectStatus;
  isPrivate?: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

const ProjectMedia: React.FC<{ project: Project }> = ({ project }) => {
  const hasMultipleImages = project.images && project.images.length > 1;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const activeImage = hasMultipleImages
    ? project.images![currentImageIndex]
    : project.images?.[0] || project.image;

  const handleSelectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <MediaContainer>
        {project.video ? (
          <ProjectVideo
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              const imageElement = document.createElement('img');
              imageElement.src = activeImage;
              imageElement.alt = project.title;
              imageElement.className = target.className;
              imageElement.style.cssText = target.style.cssText;
              target.parentNode?.replaceChild(imageElement, target);
            }}
          />
        ) : (
          <ProjectImage src={activeImage} alt={`${project.title} screenshot`} />
        )}
      </MediaContainer>
      {hasMultipleImages && (
        <ThumbnailStrip>
          {project.images!.map((img, index) => (
            <ThumbnailButton
              key={img}
              type="button"
              onClick={() => handleSelectImage(index)}
              $isActive={index === currentImageIndex}
            >
              <ThumbnailImage src={img} alt={`${project.title} thumbnail ${index + 1}`} />
            </ThumbnailButton>
          ))}
        </ThumbnailStrip>
      )}
    </>
  );
};

const Portfolio = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'Project Yoked',
      description: 'Revolutionary fitness social platform featuring AI-powered content moderation, Instagram-style interactions, comprehensive fitness tracking, personalized progress analytics, and virtual personal training. Leading development as CEO/Founder of Project Yoked LLC, creating the future of connected fitness experiences.',
      technologies: [
        'React.js',
        'React Native',
        'TypeScript',
        'AWS CLI',
        'AWS',
        'FastAPI',
        'Python',
        'PostgreSQL'
      ],
      image: `${process.env.PUBLIC_URL}/images/projects/yoked.png`,
      video: `${process.env.PUBLIC_URL}/videos/app-overview-montage.mp4`,
      category: ['Mobile App', 'Web App', 'AI'],
      status: { label: 'In Development', color: 'warning' },
      isPrivate: true,
    },
    {
      id: 2,
      title: 'EagleChair Digital Flagship',
      description: 'End-to-end commerce experience for a premium furniture brand featuring a FastAPI backend with JWT auth, async PostgreSQL, Redis caching, and a modern React storefront focused on product storytelling and conversions.',
      technologies: [
        'FastAPI',
        'Python',
        'PostgreSQL',
        'Redis',
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS'
      ],
      image: `${process.env.PUBLIC_URL}/images/projects/eaglechair-homepage.png`,
      images: [
        `${process.env.PUBLIC_URL}/images/projects/eaglechair-homepage.png`,
        `${process.env.PUBLIC_URL}/images/projects/eaglechair-catalog.png`,
        `${process.env.PUBLIC_URL}/images/projects/eaglechair-product-dropdown.png`
      ],
      category: ['Web App', 'E-commerce'],
      status: { label: 'In Development', color: 'warning' },
      liveUrl: 'https://joshua.eaglechair.com/',
      githubUrl: 'https://github.com/SirStig/eaglechair'
    },
    {
      id: 3,
      title: 'EncodeForge',
      description: 'Cross-platform media processing suite combining hardware-accelerated video encoding, AI-powered subtitle generation with Whisper, and smart metadata-driven file renaming inside a polished desktop UI.',
      technologies: [
        'JavaFX',
        'Python',
        'FastAPI',
        'FFmpeg',
        'OpenAI Whisper',
        'PyTorch',
        'Docker'
      ],
      image: `${process.env.PUBLIC_URL}/images/projects/encodeforge-encoder.png`,
      images: [
        `${process.env.PUBLIC_URL}/images/projects/encodeforge-encoder.png`,
        `${process.env.PUBLIC_URL}/images/projects/encodeforge-metadata.png`,
        `${process.env.PUBLIC_URL}/images/projects/encodeforge-subtitles.png`
      ],
      category: ['Desktop App', 'AI', 'Media Processing'],
      status: { label: 'Public Release', color: 'success' },
      githubUrl: 'https://github.com/SirStig/EncodeForge'
    },
    {
      id: 4,
      title: 'YokedCache',
      description: 'High-performance Python cache library with intelligent auto-invalidation, multi-backend support, and seamless FastAPI/SQLAlchemy integration. Features advanced capabilities like vector similarity search, production monitoring with Prometheus/StatsD, and comprehensive CLI tools. Delivers 60-90% database load reduction and 200-500ms faster response times.',
      technologies: [
        'Python',
        'Redis',
        'FastAPI',
        'SQLAlchemy',
        'Memcached',
        'Async/Await',
        'Prometheus',
        'StatsD',
        'PyPI',
        'CLI Tools'
      ],
      image: `${process.env.PUBLIC_URL}/images/projects/yokedcache.png`,
      category: ['Python Library', 'Backend', 'Performance'],
      status: { label: 'Public Release', color: 'success' },
      liveUrl: 'https://pypi.org/project/yokedcache/',
      githubUrl: 'https://github.com/SirStig/yokedcache'
    },
    {
      id: 5,
      title: 'Financial Project',
      description: 'Next-generation financial management platform with bank-level security, real-time transaction processing, and intelligent financial insights. Built with modern APIs for seamless payment integration and comprehensive financial tracking.',
      technologies: [
        'HTML',
        'CSS',
        'JavaScript',
        'Python',
        'FastAPI',
        'StripeAPI',
        'PlaidAPI',
        'PayPal API',
        'PostgreSQL',
        'SQLAlchemy'
      ],
      image: `${process.env.PUBLIC_URL}/images/projects/financial.png`,
      category: ['Web App', 'FinTech'],
      status: { label: 'Halted', color: 'warning' },
      isPrivate: true
    },
    {
      id: 6,
      title: 'The RLR Project',
      description: 'Exciting arcade-style game inspired by the popular Starcraft 2 mini-game "Runling Run". A collaborative project showcasing Unity expertise, physics-based gameplay, and multiplayer networking features.',
      technologies: [
        'Unity',
        'C#',
        'Unity UI',
        'Unity Physics',
        'Unity Networking'
      ],
      image: `${process.env.PUBLIC_URL}/images/projects/rlr.png`,
      status: { label: 'Old Project', color: 'error' },
      category: ['Game Development']
    },
    {
      id: 7,
      title: 'Game Dev Tycoon Mod Maker',
      description: 'Powerful modding toolkit for Game Dev Tycoon that empowers creators to build custom content, modify game mechanics, and extend gameplay. Features an intuitive interface for seamless mod development and community sharing.',
      technologies: [
        '.NET',
        'C#',
      ],
      image: `${process.env.PUBLIC_URL}/images/projects/gamedev-mod.png`,
      status: { label: 'Old Project', color: 'error' },
      category: ['Desktop App'],
      githubUrl: 'https://github.com/SirStig/Ultimate-Mod-Maker'
    }
  ];

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
        <title>Portfolio - IronCoffee Solutions</title>
        <meta name="description" content="Explore our portfolio of web applications, mobile apps, and software solutions." />
      </Helmet>

      <Box component="section" sx={{ 
        pt: { xs: 6, md: 12 },
        pb: { xs: 3, md: 6 },
        background: 'transparent',
        color: (theme: any) => theme.palette.mode === 'light' ? 'text.primary' : 'white'
      }}>
        <Container maxWidth="lg">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <Typography variant="h1" sx={{ 
              mb: { xs: 2, md: 3 },
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              fontWeight: 700
            }}>
              Portfolio
            </Typography>
            <Typography variant="h4" sx={{ 
              mb: { xs: 3, md: 4 },
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' },
              fontWeight: 400,
              color: (theme: any) => theme.palette.mode === 'light' 
                ? 'text.primary'
                : 'rgba(255, 255, 255, 0.9)'
            }}>
              Featured Projects & Work
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 } }}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={index}
          >
            <ProjectContainer>
              <ContentSection>
                <ProjectHeader>
                  <ProjectTitle>
                    {project.title}
                  </ProjectTitle>
                  <ProjectSubtitle>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ 
                        color: 'text.secondary',
                        fontWeight: 500,
                        fontSize: '1.1rem'
                      }}
                    >
                      {project.category.join(' • ')}
                    </Typography>
                    {project.status && (
                      <StatusChip 
                        label={project.status.label}
                        color={project.status.color}
                        size="small"
                      />
                    )}
                    {project.isPrivate && (
                      <StatusChip 
                        icon={<LockIcon />}
                        label="Private"
                        color="error"
                        size="small"
                      />
                    )}
                  </ProjectSubtitle>
                </ProjectHeader>
                
                <ProjectDescription>
                  {project.description}
                </ProjectDescription>

                <ButtonContainer>
                  {project.liveUrl && (
                    <Link 
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="none"
                    >
                      <StyledButton
                        variant="outlined"
                        startIcon={<LaunchIcon />}
                      >
                        Live Demo
                      </StyledButton>
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="none"
                    >
                      <StyledButton
                        variant="outlined"
                        startIcon={<GitHubIcon />}
                      >
                        View Code
                      </StyledButton>
                    </Link>
                  )}
                </ButtonContainer>
              </ContentSection>

              <MediaSection>
                <ProjectMedia project={project} />
                <TechStack>
                  {project.technologies.map((tech) => (
                    <StyledChip
                      key={tech}
                      label={tech}
                      size="small"
                    />
                  ))}
                </TechStack>
              </MediaSection>
            </ProjectContainer>
          </motion.div>
        ))}
      </Container>
    </>
  );
};

export default Portfolio;
