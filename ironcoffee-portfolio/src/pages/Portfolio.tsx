import React, { useState } from 'react';
import { Container, Typography, Box, Chip, Button, ChipProps, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Launch as LaunchIcon, GitHub as GitHubIcon, MenuBook as MenuBookIcon, Lock as LockIcon, Apple as AppleIcon, Shop as PlayStoreIcon } from '@mui/icons-material';
import { useMobileDetect } from '../hooks/useMobileDetect';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import RegistryInsights from '../components/RegistryInsights';

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 100%;
  min-height: 400px;
  margin-bottom: 6rem;
  cursor: pointer;
  border-radius: 16px;
  padding: 1rem;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)'};
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
    padding: 0.75rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 3rem;
    padding: 0.5rem;
    min-height: 300px;
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
  max-height: min(50vh, 480px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    max-height: min(45vh, 360px);
  }

  @media (max-width: 480px) {
    max-height: min(40vh, 300px);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: min(50vh, 480px);
  object-fit: contain;
  transition: transform 0.3s ease-in-out;

  ${MediaContainer}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    max-height: min(45vh, 360px);
  }

  @media (max-width: 480px) {
    max-height: min(40vh, 300px);
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
  max-height: min(50vh, 480px);
  object-fit: contain;
  transition: transform 0.3s ease-in-out;

  ${MediaContainer}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    max-height: min(45vh, 360px);
  }

  @media (max-width: 480px) {
    max-height: min(40vh, 300px);
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

const StatusChip = styled(Chip) <StatusChipProps>`
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

const ProjectMedia: React.FC<{ project: Project }> = ({ project }) => {
  const hasMultipleImages = project.images && project.images.length > 1;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const activeImage = hasMultipleImages
    ? project.images![currentImageIndex]
    : project.images?.[0] || project.image;

  const showVideo = project.video && (!hasMultipleImages || currentImageIndex === 0);

  const handleSelectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <MediaContainer>
        {showVideo ? (
          <ProjectVideo
            src={project.video!}
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
  const navigate = useNavigate();
  const { isMobile } = useMobileDetect();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.25 : 0.3
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

      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 8 }, px: { xs: 2, sm: 3 } }}>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: isMobile ? '100px' : '-20px' }}
            variants={fadeInUp}
            custom={index}
          >
            <ProjectContainer onClick={() => navigate(`/portfolio/${project.slug}`)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && navigate(`/portfolio/${project.slug}`)}>
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
                    {project.githubPrivate && (
                      <StatusChip
                        icon={<LockIcon />}
                        label="Private Code"
                        color="info"
                        size="small"
                      />
                    )}
                  </ProjectSubtitle>
                </ProjectHeader>

                <ProjectDescription>
                  {project.description}
                </ProjectDescription>

                <RegistryInsights
                  slug={project.slug}
                  variant="compact"
                  onClickStop={(e) => e.stopPropagation()}
                />

                <ButtonContainer onClick={(e) => e.stopPropagation()}>
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
                        {project.liveUrlLabel || 'Live Demo'}
                      </StyledButton>
                    </Link>
                  )}
                  {project.npmUrl && (
                    <Link
                      href={project.npmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="none"
                    >
                      <StyledButton
                        variant="outlined"
                        startIcon={<LaunchIcon />}
                      >
                        NPM Package
                      </StyledButton>
                    </Link>
                  )}
                  {project.appStoreUrl && (
                    <Link
                      href={project.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="none"
                    >
                      <StyledButton
                        variant="outlined"
                        startIcon={<AppleIcon />}
                      >
                        App Store
                      </StyledButton>
                    </Link>
                  )}
                  {project.playStoreUrl && (
                    <Link
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="none"
                    >
                      <StyledButton
                        variant="outlined"
                        startIcon={<PlayStoreIcon />}
                      >
                        Play Store
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
                  {project.docsUrl && (
                    <Link
                      href={project.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="none"
                    >
                      <StyledButton
                        variant="outlined"
                        startIcon={<MenuBookIcon />}
                      >
                        Documentation
                      </StyledButton>
                    </Link>
                  )}
                </ButtonContainer>
              </ContentSection>

              <MediaSection onClick={(e) => e.stopPropagation()}>
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
