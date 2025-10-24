import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Box, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Check as CheckIcon } from '@mui/icons-material';

const ServiceSection = styled.section`
  padding: 4rem 0;
  background: transparent;
`;

const Services = () => {
  const services = [
    {
      title: 'Website Development',
      description: 'Professional websites that help your business grow online',
      businessValue: 'Get more customers with a website that works 24/7 for your business',
      whatYouGet: [
        'Beautiful, professional website design',
        'Works perfectly on phones, tablets, and computers',
        'Shows up higher in Google searches',
        'Online store to sell your products/services',
        'Easy way for you to update content yourself',
        'Regular maintenance and security updates'
      ],
      techSpecs: [
        'React & TypeScript',
        'FastAPI Backend',
        'Material-UI & Styled Components',
        'PostgreSQL Database',
        'AWS Cloud Infrastructure',
        'OAuth & JWT Authentication'
      ]
    },
    {
      title: 'Mobile Apps',
      description: 'Apps for your business that work on both iPhone and Android',
      businessValue: 'Stay connected with your customers through their phones',
      whatYouGet: [
        'One app that works on both iPhone and Android',
        'Customers can use your app even without internet',
        'Send notifications directly to your customers',
        'Get published on Apple App Store and Google Play',
        'Track how customers use your app',
        'Regular updates and new features'
      ],
      techSpecs: [
        'React Native & TypeScript',
        'AWS Mobile Services',
        'Firebase Integration',
        'Native Module Integration',
        'App Store Optimization',
        'Performance Analytics'
      ]
    },
    {
      title: 'Business Systems',
      description: 'Behind-the-scenes systems that power your digital operations',
      businessValue: 'Automate your business processes and keep customer data safe',
      whatYouGet: [
        'Secure customer login and account management',
        'Accept payments online safely',
        'Automatic backups of all your important data',
        'Connect different business tools together',
        'Handle thousands of customers without slowing down',
        'Detailed reports on your business performance'
      ],
      techSpecs: [
        'FastAPI & Python',
        'PostgreSQL Database',
        'AWS Cloud Services',
        'Docker Containerization',
        'JWT Authentication',
        'RESTful API Architecture'
      ]
    },
    {
      title: 'Technology Consulting',
      description: 'Expert guidance to help your business use technology effectively',
      businessValue: 'Make smart technology decisions that save money and boost productivity',
      whatYouGet: [
        'Clear technology roadmap for your business goals',
        'Move your business to the cloud safely',
        'Connect all your business tools to work together',
        'Automate repetitive tasks to save time',
        'Training for your team on new systems',
        'Ongoing support when you need help'
      ],
      techSpecs: [
        'AWS Cloud Architecture',
        'System Integration APIs',
        'Automation Frameworks',
        'Performance Monitoring',
        'Security Implementation',
        '24/7 Technical Support'
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Services - IronCoffee Solutions</title>
        <meta name="description" content="Professional web development, game development, and IT solutions. View our comprehensive service offerings and packages." />
      </Helmet>

      <Box component="section" sx={{ 
        pt: { xs: 8, md: 12 },
        pb: { xs: 4, md: 6 },
        background: 'transparent',
        zIndex: 1,
        color: ({ palette }) => palette.mode === 'light' ? 'text.primary' : 'white'
      }}>
        <Container maxWidth="lg" style={{ background: 'transparent' }}>
          <Box style={{ background: 'transparent' }}>
            <Typography 
              variant="h1" 
              sx={{ 
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: ({ palette }) => palette.mode === 'light' ? 'text.primary' : 'white'
              }}
            >
              Our Services
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ 
                mb: 4,
                fontWeight: 400,
                color: ({ palette }) => palette.mode === 'light' 
                  ? 'text.primary'
                  : 'rgba(255, 255, 255, 0.95)'
              }}
            >
              Simple solutions that make your business better
            </Typography>
          </Box>
        </Container>
      </Box>

      {services.map((service, index) => (
        <ServiceSection key={service.title}>
          <Container maxWidth="lg">
            <Grid container spacing={6} alignItems="center" direction={index % 2 === 0 ? 'row' : 'row-reverse'}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography 
                    variant="h2" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 700,
                      color: 'text.primary'
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 2, 
                      color: 'primary.main',
                      fontWeight: 600
                    }}
                  >
                    {service.businessValue}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 3, 
                      color: 'text.primary',
                      fontWeight: 400,
                      lineHeight: 1.5
                    }}
                  >
                    {service.description}
                  </Typography>
                  
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      mb: 2, 
                      fontWeight: 600,
                      color: 'secondary.main'
                    }}
                  >
                    What You Get:
                  </Typography>
                  <List sx={{ mb: 0 }}>
                    {service.whatYouGet.map((item) => (
                      <ListItem key={item} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon color="secondary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={item}
                          primaryTypographyProps={{
                            fontSize: '1rem',
                            color: 'text.primary'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card 
                  sx={{ 
                    p: 3, 
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    border: 1,
                    borderColor: 'divider'
                  }}
                >
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      mb: 3, 
                      fontWeight: 600,
                      color: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    ⚡ Technical Expertise
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 2, 
                      color: 'text.secondary',
                      fontStyle: 'italic'
                    }}
                  >
                    For developers and technical teams:
                  </Typography>
                  <List sx={{ '& .MuiListItem-root': { py: 0.5 } }}>
                    {service.techSpecs.map((spec) => (
                      <ListItem key={spec}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <CheckIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText 
                          primary={spec}
                          primaryTypographyProps={{
                            fontSize: '0.95rem',
                            color: 'text.primary',
                            fontFamily: 'monospace'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </ServiceSection>
      ))}

      <Box sx={{ 
            py: 8,                     
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            border: 1,
            borderColor: 'divider'
           }}>
        <Container maxWidth="lg">
          <Box>
            <Typography 
              variant="h2" 
              align="center" 
              sx={{ 
                mb: 6, 
                fontWeight: 700,
                color: 'text.primary'
              }}
            >
              Ready to Get Started?
            </Typography>
            <Box sx={{ textAlign: 'center' }}>
              <Button
                component={Link}
                to="/contact"
                variant="contained"
                color="secondary"
                size="large"
                sx={{ 
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem'
                }}
              >
                Schedule a Consultation
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Services; 