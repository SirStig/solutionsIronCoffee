import React, { useState } from 'react';
import { Container, Typography, Grid, Box, TextField, Button, Card, IconButton, Snackbar, Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Email as EmailIcon, Phone as PhoneIcon, LocationOn as LocationIcon, LinkedIn as LinkedInIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import emailjs from '@emailjs/browser';

const ContactCard = styled(motion(Card))`
  padding: 2rem;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const ContactInfo = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  
  .MuiSvgIcon-root {
    margin-right: 1rem;
    color: ${props => props.theme.palette?.secondary.main};
  }
`;

const SocialButton = styled(IconButton)`
  margin: 0 0.5rem;
  color: ${props => props.theme.palette?.primary.main};
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.palette?.secondary.main};
    transform: translateY(-4px);
  }
`;

const SocialLink = styled.a`
  text-decoration: none;
`;

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

      if (!serviceId || !templateId) {
        throw new Error('EmailJS configuration is missing');
      }

      const result = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }
      );

      if (result.status === 200) {
        setSnackbar({
          open: true,
          message: 'Message sent successfully! I will get back to you soon.',
          severity: 'success',
        });

        // Clear form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('EmailJS error:', error);
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again later.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false,
    }));
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
        <title>Contact - IronCoffee Solutions</title>
        <meta name="description" content="Get in touch with us for web development, game development, and IT solutions. Schedule a consultation or discuss your project needs." />
      </Helmet>

      <Box component="section" sx={{ 
        pt: { xs: 8, md: 12 },
        pb: { xs: 4, md: 6 },
        background: 'transparent',
        color: ({ palette }) => palette.mode === 'light' ? 'text.primary' : 'white'
      }}>
        <Container maxWidth="lg">
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
              Get in Touch
            </Typography>
            <Typography variant="h4" sx={{ 
              mb: 4,
              fontWeight: 400,
              color: ({ palette }) => palette.mode === 'light' 
                ? 'text.primary'
                : 'rgba(255, 255, 255, 0.9)'
            }}>
              Let's Discuss Your Next Project
            </Typography>
          </motion.div>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={7}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Typography variant="h2" gutterBottom>
                Send a Message
              </Typography>
              <Typography variant="body1" sx={{ mb: 4 }}>
                Have a project in mind? Fill out the form below and I'll get back to you as soon as possible.
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={6}
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      size="large"
                      disabled={loading}
                      sx={{ 
                        px: 6,
                        py: 1.5,
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={5}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <ContactCard>
                <Typography variant="h2" gutterBottom>
                  Contact Info
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <ContactInfo>
                    <EmailIcon />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Email
                      </Typography>
                      <Typography variant="body1">
                        joshua@ironcoffee.com
                      </Typography>
                    </Box>
                  </ContactInfo>

                  <ContactInfo>
                    <LocationIcon />
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Location
                      </Typography>
                      <Typography variant="body1">
                        Parker, CO
                      </Typography>
                    </Box>
                  </ContactInfo>
                </Box>

                <Typography variant="h6" gutterBottom>
                  Connect with Me
                </Typography>
                <Box>
                  <SocialLink href="https://www.linkedin.com/in/joshua-kac-aa50b7131" target="_blank" rel="noopener noreferrer">
                    <SocialButton aria-label="LinkedIn">
                      <LinkedInIcon />
                    </SocialButton>
                  </SocialLink>
                  <SocialLink href="https://github.com/SirStig" target="_blank" rel="noopener noreferrer">
                    <SocialButton aria-label="GitHub">
                      <GitHubIcon />
                    </SocialButton>
                  </SocialLink>
                </Box>
              </ContactCard>
            </motion.div>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Contact; 