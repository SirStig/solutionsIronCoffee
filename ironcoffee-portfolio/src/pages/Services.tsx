import React from 'react';
import { Container, Typography, Grid, Box, Button, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Globe, Smartphone, Database, Server, ShoppingCart, Layout, Users, Code2, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import AnimatedSection from '../components/AnimatedSection';

const HeroSection = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0 clamp(3rem, 6vw, 5rem);
  background: transparent;
  text-align: center;
`;

const CoreServicesSection = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: transparent;
`;

const ServiceCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: clamp(16px, 2.5vw, 20px);
  padding: clamp(1rem, 2vw, 1.25rem);
  box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(32px, 4vw, 48px) rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  transition: all 0.3s ease;
  text-align: left;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 clamp(12px, 2vw, 20px) clamp(40px, 5vw, 60px) rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const CoreServiceRow = styled(motion.div)`
  margin-bottom: clamp(4rem, 8vw, 6rem);
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ServiceImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: clamp(16px, 2.5vw, 20px);
  box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(32px, 4vw, 48px) rgba(0, 0, 0, 0.2);
`;

const ServiceContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const IconWrapper = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const SpecializedSection = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: transparent;
`;

const ProcessCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: clamp(16px, 2.5vw, 20px);
  padding: clamp(1.5rem, 3vw, 2rem);
  box-shadow: 0 clamp(8px, 1.5vw, 16px) clamp(32px, 4vw, 48px) rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  height: 100%;
  transition: all 0.3s ease;
  text-align: left;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 clamp(12px, 2vw, 20px) clamp(40px, 5vw, 60px) rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const ArrowWrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(59, 130, 246, 0.6);
  
  @media (max-width: 959px) {
    display: none;
  }
`;

const ProcessSection = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: transparent;
`;

const TechStackSection = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: transparent;
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

const CTASection = styled.section`
  padding: clamp(5rem, 10vw, 8rem) 0;
  background: transparent;
  text-align: center;
`;

const Services = () => {
  const coreServices = [
    {
      title: 'Web Development',
      description: 'From stunning portfolio sites for photographers and videographers to powerful e-commerce platforms with advanced search and caching. Every website is built from the ground up with beautiful designs, smooth animations, and exceptional performance.',
      icon: Globe,
      color: '#3B82F6',
      features: ['E-Commerce Platforms', 'Business Websites', 'Portfolio Sites', 'Landing Pages', 'Web Applications', 'Performance Optimized'],
      image: `${process.env.PUBLIC_URL}/images/services/web-dev.png`
    },
    {
      title: 'Content Management Systems',
      description: 'Complete CMS solutions where you have full control. Manage products, quotes, colors, finishes, and any custom options through intuitive admin dashboards. Click-to-edit content sections, automated workflows, and powerful data management.',
      icon: Database,
      color: '#8B5CF6',
      features: ['Click-to-Edit Content', 'Product & Inventory Management', 'Custom Options Management', 'Full Admin Dashboards', 'Automated Workflows', 'Data Management'],
      image: `${process.env.PUBLIC_URL}/images/services/cms.png`
    },
    {
      title: 'Mobile Apps',
      description: 'Native-performance mobile applications for iOS and Android. Built complete social platforms with real-time messaging, background notifications, subscription services, and cloud integration. Your app works seamlessly across devices.',
      icon: Smartphone,
      color: '#EC4899',
      features: ['iOS & Android Apps', 'Cloud Integration', 'Real-Time Messaging', 'Push Notifications', 'Subscription Services', 'Native Performance'],
      image: `${process.env.PUBLIC_URL}/images/services/mobile-apps.png`
    },
    {
      title: 'Backend & Infrastructure',
      description: 'Scalable backend systems, APIs, and cloud infrastructure that grow with your business. From database optimization and intelligent caching to complete DevOps solutions. I handle everything from server setup to network administration.',
      icon: Server,
      color: '#10B981',
      features: ['Cloud Infrastructure', 'API Development', 'Database Optimization', 'DevOps & Scaling', 'Network Administration', 'Server Management'],
      image: `${process.env.PUBLIC_URL}/images/services/backend-infrastructure.jpg`
    }
  ];

  const specializedServices = [
    {
      title: 'E-Commerce Solutions',
      description: 'Complete online stores with advanced features like fuzzy search, intelligent caching, and seamless checkout experiences.',
      icon: ShoppingCart
    },
    {
      title: 'Social Platforms',
      description: 'Full social media platforms with real-time messaging, feed algorithms, background notifications, and subscription services.',
      icon: Users
    },
    {
      title: 'SEO & Performance Optimization',
      description: 'Search engine optimization strategies, technical SEO audits, performance analysis, and digital marketing solutions combined with database efficiency, cost optimization, caching strategies, and lightning-fast user experiences.',
      icon: TrendingUp
    },
    {
      title: 'DevOps & Automation',
      description: 'CI/CD pipelines, containerization, infrastructure as code, automated deployments, and scalable cloud architectures.',
      icon: Code2
    },
    {
      title: 'Technical Consultation',
      description: 'Expert guidance on technology choices, architecture planning, scalability strategies, and technical problem-solving for your projects.',
      icon: MessageSquare
    },
    {
      title: 'Advanced UI/UX',
      description: 'Beautiful, interactive designs with custom SVG animations, smooth transitions, and modern interfaces.',
      icon: Layout
    }
  ];

  const developmentProcess = [
    {
      step: 'Consultation & Research',
      description: 'We discuss your vision, research your industry, analyze competitors, and explore design trends to create the perfect strategy.',
      number: '01'
    },
    {
      step: 'Design & Development',
      description: 'Beautiful designs come to life as we build your solution. Design and development work hand-in-hand for optimal results.',
      number: '02'
    },
    {
      step: 'Development & Testing',
      description: 'Continuous testing ensures everything works perfectly. We refine and polish until your solution exceeds expectations.',
      number: '03'
    },
    {
      step: 'Launch & Maintenance',
      description: 'Smooth deployment and ongoing support. Your solution goes live, and we\'re here to help it grow and evolve.',
      number: '04'
    }
  ];

  const techStack = {
    frontend: {
      title: 'Frontend Technologies',
      technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion']
    },
    backend: {
      title: 'Backend Technologies',
      technologies: ['Python', 'FastAPI', 'Celery', 'Redis', 'PostgreSQL', 'MySQL']
    },
    mobile: {
      title: 'Mobile Development',
      technologies: ['React Native']
    },
    cloudDevOps: {
      title: 'Cloud & DevOps',
      technologies: ['Docker', 'GitHub', 'AWS', 'Dreamhost', 'CI/CD', 'Hyper-V']
    },
    networkSystems: {
      title: 'Network & Systems',
      technologies: ['VPNs', 'Servers', 'Ollama', 'Ubiquiti', 'Network Administration', 'Firewall Configuration']
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Services - IronCoffee Solutions</title>
        <meta name="description" content="Comprehensive web development, mobile app development, CMS systems, and backend solutions. See how we bring your ideas to life." />
      </Helmet>

      <HeroSection>
        <Container maxWidth="lg">
          <AnimatedSection>
            <Typography 
              variant="h1" 
              sx={{ 
                mb: 2,
                fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' },
                fontWeight: 700
              }}
            >
              Services
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 0,
                fontWeight: 400,
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.7
              }}
            >
              From beautiful websites to powerful mobile apps – comprehensive solutions that drive your business forward.
            </Typography>
          </AnimatedSection>
        </Container>
      </HeroSection>

      <CoreServicesSection>
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
              Core Services
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
              Comprehensive solutions covering all aspects of web and mobile development
            </Typography>

            <Box>
              {coreServices.map((service, index) => {
                const IconComponent = service.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <CoreServiceRow
                    key={service.title}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Grid container spacing={4} alignItems="center">
                      {/* Content Side */}
                      <Grid item xs={12} md={6} order={{ xs: 2, md: isEven ? 1 : 2 }}>
                        <ServiceContentWrapper>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <IconWrapper
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: "spring", stiffness: 400, damping: 17 }}
                            >
                              <IconComponent 
                                size={40} 
                                color={service.color}
                                strokeWidth={2}
                              />
                            </IconWrapper>
                            <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', md: '2rem' } }}>
                              {service.title}
                            </Typography>
                          </Box>
                          <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7, mb: 3, fontSize: { xs: '0.95rem', md: '1.1rem' } }}>
                            {service.description}
                          </Typography>
                          <Box component="ul" sx={{ pl: 0, m: 0, listStyle: 'none' }}>
                            {service.features.map((feature) => (
                              <Box component="li" key={feature} sx={{ mb: 1, color: 'text.primary', fontSize: { xs: '0.95rem', md: '1.05rem' }, fontWeight: 500, '&::before': { content: '"✓ "', color: service.color, fontWeight: 'bold', mr: 1 } }}>
                                {feature}
                              </Box>
                            ))}
                          </Box>
                        </ServiceContentWrapper>
                      </Grid>
                      
                      {/* Image Side */}
                      <Grid item xs={12} md={6} order={{ xs: 1, md: isEven ? 2 : 1 }}>
                        <Box sx={{ height: { xs: '350px', md: '500px' }, borderRadius: '20px', overflow: 'hidden' }}>
                          <ServiceImage
                            src={service.image}
                            alt={service.title}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </CoreServiceRow>
                );
              })}
            </Box>
          </AnimatedSection>
        </Container>
      </CoreServicesSection>

      <SpecializedSection>
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
              Specialized Services
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
              Advanced solutions for complex projects and unique business needs
            </Typography>

            <Grid container spacing={2} sx={{ 
              '& > .MuiGrid-item': {
                display: 'flex',
              }
            }}>
              {specializedServices.map((service, index) => {
                const IconComponent = service.icon;
                const colors = ['#3B82F6', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#06B6D4', '#8B5CF6'];
                const serviceColor = colors[index % colors.length];
                
                 return (
                   <Grid 
                     item 
                     xs={12} 
                     sm={6} 
                     md={4} 
                     lg={4}
                     key={service.title} 
                     sx={{ 
                       display: 'flex',
                       minHeight: { 
                         xs: '140px', 
                         sm: '150px', 
                         md: '160px',
                         lg: '170px'
                       }
                     }}
                   >
                    <ServiceCard
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <IconWrapper
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          style={{ marginBottom: 0 }}
                        >
                          <IconComponent 
                            size={28} 
                            color={serviceColor}
                            strokeWidth={2}
                          />
                        </IconWrapper>
                        <Typography variant="h5" sx={{ fontWeight: 600, fontSize: { xs: '0.95rem', md: '1rem' } }}>
                          {service.title}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6, fontSize: { xs: '0.75rem', md: '0.8rem' }, textAlign: 'left' }}>
                        {service.description}
                      </Typography>
                    </ServiceCard>
                  </Grid>
                );
              })}
            </Grid>
          </AnimatedSection>
        </Container>
      </SpecializedSection>

      <ProcessSection>
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
              Development Process
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
              A streamlined approach that ensures your project succeeds from concept to launch
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'stretch', flexWrap: { xs: 'wrap', md: 'nowrap' }, gap: { xs: 2, md: 0 } }}>
              {developmentProcess.map((process, index) => (
                <React.Fragment key={process.step}>
                  <Box sx={{ 
                    flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 8px)', md: '1 1 0' }, 
                    minWidth: 0,
                    px: { md: 0.5 }
                  }}>
                    <ProcessCard
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <Box sx={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        width: { xs: '45px', md: '50px' },
                        height: { xs: '45px', md: '50px' },
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
                        color: 'white',
                        fontWeight: 700,
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        mb: 2
                      }}>
                        {process.number}
                      </Box>
                      <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600, fontSize: { xs: '1rem', md: '1.15rem' } }}>
                        {process.step}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: { xs: '0.85rem', md: '0.9rem' }, flex: 1 }}>
                        {process.description}
                      </Typography>
                    </ProcessCard>
                  </Box>
                  {index < developmentProcess.length - 1 && (
                    <ArrowWrapper sx={{ 
                      display: { xs: 'none', md: 'flex' },
                      flex: '0 0 auto',
                      alignSelf: 'center',
                      px: { md: 0.5 }
                    }}>
                      <ArrowRight size={24} />
                    </ArrowWrapper>
                  )}
                </React.Fragment>
              ))}
            </Box>
          </AnimatedSection>
        </Container>
      </ProcessSection>

      <TechStackSection>
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
              Technology Stack
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
              Modern tools and technologies powering every solution
            </Typography>

            <TechStackContainer>
              <Grid container spacing={4}>
                {Object.entries(techStack).map(([key, category]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <Box>
                      <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, fontSize: { xs: '1rem', md: '1.1rem' }, color: 'primary.main' }}>
                        {category.title}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {category.technologies.map((tech) => (
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
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </TechStackContainer>
          </AnimatedSection>
        </Container>
      </TechStackSection>

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
              Ready to Start Your Project?
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
              Let's discuss your vision and create a solution that drives your business forward.
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

export default Services;