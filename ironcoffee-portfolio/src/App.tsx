import React, { useEffect } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from './context/ThemeContext';
import { createCustomTheme } from './theme/theme';
import { useTheme } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout';
import CursorFollower from './components/CursorFollower';
import BackgroundAnimation from './components/BackgroundAnimation';
import { ScrollToTopOnMount, ScrollToTopButton } from './components/ScrollToTop';
import useMagneticElements from './hooks/useMagneticElements';
import emailjs from '@emailjs/browser';
import { initGA, logPageView } from './services/analytics';
import { initSentry } from './services/errorTracking';
import { ErrorBoundary } from '@sentry/react';

// Initialize services in production
if (process.env.NODE_ENV === 'production') {
  initGA();
  initSentry();
}

// Track page views
const PageViewTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      logPageView(location.pathname + location.search);
    }
  }, [location]);

  return null;
};

const AppContent = () => {
  const { mode } = useTheme();
  const theme = React.useMemo(() => createCustomTheme(mode), [mode]);

  // Apply magnetic effects to all interactive elements globally
  useMagneticElements({
    padding: 60,
    magnetStrength: 8,
    activeTransition: 'transform 0.15s ease-out',
    inactiveTransition: 'transform 0.3s ease-in-out',
    selector: 'button, a, [role="button"], .magnetic, .MuiButton-root, .MuiIconButton-root'
  });

  useEffect(() => {
    // Initialize EmailJS with public key from environment variable
    const initEmailJS = () => {
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
      if (!publicKey) {
        console.error('EmailJS public key is not defined in environment variables');
        return;
      }
      emailjs.init(publicKey);
    };

    initEmailJS();
  }, []);

  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <>
          <BackgroundAnimation />
          <Router>
            <ScrollToTopOnMount />
            <PageViewTracker />
            <CursorFollower />
            <ErrorBoundary >
              <MainLayout />
              <ScrollToTopButton />
            </ErrorBoundary>
          </Router>
        </>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
