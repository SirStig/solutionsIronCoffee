import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Chip, Button, ChipProps, Link } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Launch as LaunchIcon, GitHub as GitHubIcon, MenuBook as MenuBookIcon, Lock as LockIcon, Apple as AppleIcon, Shop as PlayStoreIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { getProjectBySlug, Project } from '../data/projects';
import PageTransition from '../components/PageTransition';
import RegistryInsights from '../components/RegistryInsights';
import LiveProjectStatusChip from '../components/LiveProjectStatusChip';

const BackButton = styled(Button)`
  && {
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.palette.text.secondary};
    min-height: 44px;
    min-width: 44px;
    &:hover {
      background: ${({ theme }) => theme.palette.primary.main}10;
    }

    @media (max-width: 480px) {
      margin-bottom: 1.25rem;
    }
  }
`;

const HeroSection = styled.section`
  padding: clamp(3rem, 6vw, 5rem) 0 clamp(2rem, 4vw, 3rem);
  background: transparent;

  @media (max-width: 768px) {
    padding: clamp(2rem, 4vw, 3rem) 0 clamp(1.5rem, 3vw, 2rem);
  }

  @media (max-width: 480px) {
    padding: clamp(1.5rem, 3vw, 2rem) 0 clamp(1rem, 2vw, 1.5rem);
  }
`;

const MediaContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  max-height: min(50vh, 500px);
  margin: 0 auto 2rem;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    max-height: min(45vh, 380px);
    margin-bottom: 1.25rem;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    max-height: min(40vh, 320px);
    margin-bottom: 1rem;
    border-radius: 10px;
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: min(50vh, 500px);
  object-fit: contain;
  display: block;

  @media (max-width: 768px) {
    max-height: min(45vh, 380px);
  }

  @media (max-width: 480px) {
    max-height: min(40vh, 320px);
  }
`;

const ProjectVideo = styled.video`
  width: 100%;
  height: 100%;
  max-height: min(50vh, 500px);
  object-fit: contain;
  display: block;

  @media (max-width: 768px) {
    max-height: min(45vh, 380px);
  }

  @media (max-width: 480px) {
    max-height: min(40vh, 320px);
  }
`;

const ThumbnailStrip = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
  flex-wrap: wrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 0.25rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-top: 0.75rem;
    justify-content: flex-start;
  }

  @media (max-width: 480px) {
    gap: 0.4rem;
    margin-top: 0.5rem;
  }
`;

const ThumbnailButton = styled.button<{ $isActive: boolean }>`
  border: none;
  padding: 0;
  background: transparent;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  flex-shrink: 0;
  outline: ${({ $isActive, theme }) =>
    $isActive
      ? `2px solid ${theme.palette.primary.main}`
      : `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'}`};
  transition: transform 0.2s ease, outline-color 0.2s ease;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: translateY(-3px);
  }

  @media (max-width: 480px) {
    border-radius: 8px;
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

  @media (max-width: 480px) {
    width: 56px;
    height: 38px;
  }
`;

const ContentSection = styled.section`
  padding: clamp(2rem, 4vw, 4rem) 0;
  background: transparent;

  @media (max-width: 768px) {
    padding: clamp(1.5rem, 3vw, 2.5rem) 0;
  }

  @media (max-width: 480px) {
    padding: clamp(1rem, 2vw, 1.5rem) 0;
  }
`;

const SubtitleRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-bottom: 1rem;
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

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 2rem 0;

  @media (max-width: 480px) {
    gap: 0.4rem;
    margin: 1.5rem 0;
  }
`;

const StyledChip = styled(Chip)`
  && {
    background: ${({ theme }) => theme.palette.primary.main}15;
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 0.8rem;
    height: 28px;
    border: 1px solid ${({ theme }) => theme.palette.primary.main}30;
    &:hover {
      background: ${({ theme }) => theme.palette.primary.main}25;
    }

    @media (max-width: 480px) {
      font-size: 0.75rem;
      height: 26px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.75rem;
    margin-top: 1.5rem;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1.25rem;
  }
`;

const FeaturesList = styled.ul`
  margin: 1.5rem 0;
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  line-height: 1.8;

  @media (max-width: 480px) {
    margin: 1rem 0;
    padding-left: 1.25rem;
    font-size: 0.95rem;
    line-height: 1.7;
  }
`;

const ProjectMediaDetail: React.FC<{ project: Project }> = ({ project }) => {
  const hasMultipleImages = project.images && project.images.length > 1;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const activeImage = hasMultipleImages
    ? project.images![currentImageIndex]
    : project.images?.[0] || project.image;

  const showVideo = project.video && (!hasMultipleImages || currentImageIndex === 0);

  return (
    <>
      <MediaContainer>
        {showVideo ? (
          <ProjectVideo
            src={project.video}
            autoPlay
            muted
            loop
            playsInline
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              const img = document.createElement('img');
              img.src = activeImage;
              img.alt = project.title;
              target.parentNode?.replaceChild(img, target);
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
              onClick={() => setCurrentImageIndex(index)}
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

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center', px: { xs: 2, sm: 3 } }}>
        <Typography variant="h4" sx={{ mb: 2 }}>Project not found</Typography>
        <Button onClick={() => navigate('/portfolio')} startIcon={<ArrowBackIcon />}>
          Back to Portfolio
        </Button>
      </Container>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{project.title} | Portfolio - IronCoffee Solutions</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={[project.title, ...project.technologies, ...(project.category || []), 'Joshua Kac', 'IronCoffee'].join(', ')} />
        <meta name="author" content="Joshua Kac" />
        <link rel="canonical" href={`https://solutions.ironcoffee.com/portfolio/${project.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://solutions.ironcoffee.com/portfolio/${project.slug}`} />
        <meta property="og:title" content={`${project.title} | IronCoffee Solutions`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={`https://solutions.ironcoffee.com${project.image.startsWith('/') ? '' : '/'}${project.image.replace(/^\//, '')}`} />
        <meta property="article:author" content="Joshua Kac" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${project.title} | IronCoffee Solutions`} />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={`https://solutions.ironcoffee.com${project.image.startsWith('/') ? '' : '/'}${project.image.replace(/^\//, '')}`} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": project.appStoreUrl || project.playStoreUrl || project.npmUrl ? "SoftwareApplication" : "CreativeWork",
          "name": project.title,
          "description": project.longDescription || project.description,
          "url": `https://solutions.ironcoffee.com/portfolio/${project.slug}`,
          "image": `https://solutions.ironcoffee.com${project.image.startsWith('/') ? '' : '/'}${project.image.replace(/^\//, '')}`,
          "author": { "@id": "https://solutions.ironcoffee.com/#person" },
          "creator": { "@id": "https://solutions.ironcoffee.com/#person" },
          "publisher": { "@id": "https://solutions.ironcoffee.com/#organization" },
          "keywords": project.technologies.join(', '),
          ...(project.appStoreUrl || project.playStoreUrl ? { "applicationCategory": "MobileApplication", "operatingSystem": [project.appStoreUrl && "iOS", project.playStoreUrl && "Android"].filter(Boolean).join(', ') } : {}),
          ...(project.npmUrl ? { "applicationCategory": "DeveloperApplication" } : {}),
          ...(project.liveUrl ? { "sameAs": [project.liveUrl, project.githubUrl, project.npmUrl, project.appStoreUrl, project.playStoreUrl].filter(Boolean) } : {})
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://solutions.ironcoffee.com/" },
            { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://solutions.ironcoffee.com/portfolio" },
            { "@type": "ListItem", "position": 3, "name": project.title, "item": `https://solutions.ironcoffee.com/portfolio/${project.slug}` }
          ]
        })}</script>
      </Helmet>

      <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4, md: 6 }, px: { xs: 2, sm: 3 } }}>
        <BackButton
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/portfolio')}
          size="small"
        >
          Back to Portfolio
        </BackButton>

        <HeroSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.25rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              {project.title}
            </Typography>
            <SubtitleRow>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                {project.category.join(' • ')}
              </Typography>
              <LiveProjectStatusChip key={project.slug} project={project} />
              {project.isPrivate && (
                <StatusChip icon={<LockIcon />} label="Private" color="error" size="small" />
              )}
              {project.githubPrivate && (
                <StatusChip icon={<LockIcon />} label="Private Code" color="info" size="small" />
              )}
            </SubtitleRow>
            <ProjectMediaDetail project={project} />
          </motion.div>
        </HeroSection>

        <ContentSection>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <RegistryInsights slug={project.slug} variant="full" />
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                lineHeight: 1.8,
                fontSize: { xs: '1rem', sm: '1.1rem' },
                mb: 2,
              }}
            >
              {project.longDescription || project.description}
            </Typography>

            {project.features && project.features.length > 0 && (
              <Box sx={{ mb: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                  Features
                </Typography>
                <FeaturesList>
                  {project.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </FeaturesList>
              </Box>
            )}

            <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600, fontSize: { xs: '1rem', sm: '1.125rem' } }}>
              Technologies
            </Typography>
            <TechStack>
              {project.technologies.map((tech) => (
                <StyledChip key={tech} label={tech} size="small" />
              ))}
            </TechStack>

            <ButtonContainer>
              {project.liveUrl && (
                <Button
                  variant="outlined"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<LaunchIcon />}
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    minHeight: 44,
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.main', color: 'primary.contrastText' },
                  }}
                >
                  {project.liveUrlLabel || 'Live Demo'}
                </Button>
              )}
              {project.npmUrl && (
                <Button
                  variant="outlined"
                  href={project.npmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<LaunchIcon />}
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    minHeight: 44,
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.main', color: 'primary.contrastText' },
                  }}
                >
                  NPM Package
                </Button>
              )}
              {project.appStoreUrl && (
                <Button
                  variant="outlined"
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<AppleIcon />}
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    minHeight: 44,
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.main', color: 'primary.contrastText' },
                  }}
                >
                  App Store
                </Button>
              )}
              {project.playStoreUrl && (
                <Button
                  variant="outlined"
                  href={project.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<PlayStoreIcon />}
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    minHeight: 44,
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.main', color: 'primary.contrastText' },
                  }}
                >
                  Play Store
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="outlined"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GitHubIcon />}
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    minHeight: 44,
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.main', color: 'primary.contrastText' },
                  }}
                >
                  View Code
                </Button>
              )}
              {project.docsUrl && (
                <Button
                  variant="outlined"
                  href={project.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<MenuBookIcon />}
                  sx={{
                    color: 'primary.main',
                    borderColor: 'primary.main',
                    minHeight: 44,
                    width: { xs: '100%', sm: 'auto' },
                    '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.main', color: 'primary.contrastText' },
                  }}
                >
                  Documentation
                </Button>
              )}
            </ButtonContainer>
            {project.downloadsBadgeUrl && project.githubUrl && (
              <Box sx={{ mt: 2 }}>
                <Link
                  href={`${project.githubUrl}/releases`}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ display: 'inline-flex', lineHeight: 0 }}
                >
                  <Box
                    component="img"
                    src={project.downloadsBadgeUrl}
                    alt="Total GitHub release downloads"
                    loading="lazy"
                    decoding="async"
                    sx={{ height: 20, display: 'block' }}
                  />
                </Link>
              </Box>
            )}
          </motion.div>
        </ContentSection>
      </Container>
    </PageTransition>
  );
};

export default ProjectPage;
