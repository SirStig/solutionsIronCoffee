import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Button, Container, useScrollTrigger, Box } from '@mui/material';
import { Menu as MenuIcon, LightMode, DarkMode } from '@mui/icons-material';
import { Link, useLocation, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useTheme as useMuiTheme } from '@mui/material/styles';
import { useTheme as useThemeContext } from '../context/ThemeContext';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Portfolio from '../pages/Portfolio';
import About from '../pages/About';
import Contact from '../pages/Contact';

interface Props {
  children: React.ReactElement;
}

// Remove the hide on scroll behavior - header should always be visible
const AlwaysVisible: React.FC<Props> = ({ children }) => {
  return <>{children}</>;
};

const StyledAppBar = styled(AppBar)`
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  box-shadow: none !important;
  border: none !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.25rem 0;
  z-index: 1300;

  &.scrolled {
    /* Create a centered container that wraps content */
    display: flex;
    justify-content: center;
    align-items: center;
    
    .MuiContainer-root {
      background: ${({ theme }) => theme.palette.mode === 'dark' 
        ? 'rgba(20, 20, 20, 0.6)' 
        : 'rgba(240, 240, 240, 0.6)'} !important;
      backdrop-filter: blur(20px) saturate(200%);
      -webkit-backdrop-filter: blur(20px) saturate(200%);
      -moz-backdrop-filter: blur(20px) saturate(200%);
      border: 1px solid ${({ theme }) => theme.palette.mode === 'dark'
        ? 'rgba(255, 255, 255, 0.1)'
        : 'rgba(0, 0, 0, 0.1)'};
      border-radius: 12px;
      -webkit-border-radius: 12px;
      -moz-border-radius: 12px;
      box-shadow: 0 4px 20px ${({ theme }) => theme.palette.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.2)'
        : 'rgba(0, 0, 0, 0.1)'} !important;
      -webkit-box-shadow: 0 4px 20px ${({ theme }) => theme.palette.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.2)'
        : 'rgba(0, 0, 0, 0.1)'} !important;
      -moz-box-shadow: 0 4px 20px ${({ theme }) => theme.palette.mode === 'dark'
        ? 'rgba(0, 0, 0, 0.2)'
        : 'rgba(0, 0, 0, 0.1)'} !important;
      
      /* Match the exact width of the initial state container */
      max-width: 1200px !important; /* Same as Material-UI lg breakpoint */
      width: 100% !important;
      padding: 0 24px !important; /* Match initial state - no vertical padding */
      margin: 0 auto;
      /* This matches exactly where the content sits in the initial transparent state */
      
      /* Smooth animation - only for the background */
      animation: fadeInBackground 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      -webkit-animation: fadeInBackground 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
      -moz-animation: fadeInBackground 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    
    /* Keep same padding to prevent height jump */
    padding: 0.25rem 0;
  }
  
  @keyframes fadeInBackground {
    from {
      opacity: 0;
      transform: scale(0.95);
      -webkit-transform: scale(0.95);
      -moz-transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
      -webkit-transform: scale(1);
      -moz-transform: scale(1);
    }
  }
  
  @-webkit-keyframes fadeInBackground {
    from {
      opacity: 0;
      -webkit-transform: scale(0.95);
    }
    to {
      opacity: 1;
      -webkit-transform: scale(1);
    }
  }
  
  @-moz-keyframes fadeInBackground {
    from {
      opacity: 0;
      -moz-transform: scale(0.95);
    }
    to {
      opacity: 1;
      -moz-transform: scale(1);
    }
  }
  
  /* Responsive design - keep consistent sizing and heights */
  @media (max-width: 599px) {
    padding: 0.2rem 0;
    
    &.scrolled {
      padding: 0.2rem 0;
      
      .MuiContainer-root {
        padding: 0 16px !important; /* Match MUI xs padding - no vertical padding */
        max-width: 100% !important;
        width: calc(100% - 32px) !important; /* Account for 16px padding on each side */
        margin: 0 16px !important;
      }
    }
  }
  
  @media (min-width: 600px) and (max-width: 959px) {
    padding: 0.25rem 0;
    
    &.scrolled {
      padding: 0.25rem 0;
      
      .MuiContainer-root {
        padding: 0 24px !important; /* Match MUI sm/md padding - no vertical padding */
        max-width: 900px !important; /* MUI md breakpoint */
        width: 100% !important;
        margin: 0 auto !important;
      }
    }
  }
  
  @media (min-width: 1920px) {
    padding: 0.3rem 0;
    
    &.scrolled {
      padding: 0.3rem 0;
      
      .MuiContainer-root {
        padding: 0 24px !important; /* Match MUI lg padding - no vertical padding */
        max-width: 1200px !important; /* MUI lg breakpoint */
        width: 100% !important;
        margin: 0 auto !important;
      }
    }
  }
  
  @media (min-width: 3840px) {
    padding: 0.35rem 0;
    
    &.scrolled {
      padding: 0.35rem 0;
      
      .MuiContainer-root {
        padding: 0 24px !important; /* Match MUI xl padding - no vertical padding */
        max-width: 1536px !important; /* MUI xl breakpoint */
        width: 100% !important;
        margin: 0 auto !important;
      }
    }
  }
`;

const Logo = styled(Link)`
&& {
  font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
  font-size: clamp(0.95rem, 2.5vw, 1.2rem);
  font-weight: 600;
  letter-spacing: 0.25px;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  position: relative;
  transition: all 0.3s ease;
  -webkit-transition: all 0.3s ease;
  -moz-transition: all 0.3s ease;
  -o-transition: all 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-shadow: 
    0 1px 2px rgba(0, 0, 0, 0.5),
    0 2px 5px rgba(0, 0, 0, 0.3),
    0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-1px);
    -webkit-transform: translateY(-1px);
    -moz-transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0px);
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
  }
  
  /* Responsive sizes */
  @media (max-width: 599px) {
    font-size: 0.95rem;
    letter-spacing: 0.2px;
  }
  
  @media (min-width: 600px) and (max-width: 959px) {
    font-size: 1.05rem;
    letter-spacing: 0.25px;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.3rem;
    letter-spacing: 0.3px;
  }
  
  @media (min-width: 3840px) {
    font-size: 1.5rem;
    letter-spacing: 0.4px;
  }
`;

const NavLink = styled(Button)`
  color: ${({ theme }) => {
    return theme.palette.mode === 'dark' ? '#f1f5f9' : '#111925FF';
  }};
  font-weight: 500;
  font-size: clamp(0.8rem, 1.2vw, 0.85rem);
  position: relative;
  padding: clamp(0.4rem, 0.8vw, 0.5rem) clamp(0.8rem, 1.5vw, 1rem);
  border-radius: 6px;
  -webkit-border-radius: 6px;
  -moz-border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  letter-spacing: 0.02em;
  text-transform: none;
  min-width: auto;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.palette.mode === 'dark' ? '#64FFDA' : '#0D9488'};
    transform: translateY(-2px);
    -webkit-transform: translateY(-2px);
    -moz-transform: translateY(-2px);
    text-shadow: ${({ theme }) => theme.palette.mode === 'dark'
      ? '0 0 8px rgba(100, 255, 218, 0.3)'
      : '0 0 8px rgba(13, 148, 136, 0.3)'};
    background: transparent;
  }

  &.active {
    color: ${({ theme }) => theme.palette.mode === 'dark' ? '#64FFDA' : '#0D9488'};
    font-weight: 600;
  }

  &:active {
    transform: translateY(0);
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
  }
  
  /* Responsive font sizes - smaller to prevent overlap */
  @media (max-width: 599px) {
    display: none; /* Hidden on mobile, shown in drawer */
  }
  
  @media (min-width: 1920px) {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }
  
  @media (min-width: 3840px) {
    font-size: 1rem;
    padding: 0.7rem 1.4rem;
  }
`;

const ThemeToggleButton = styled(IconButton)`
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -moz-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  -o-transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ theme }) => theme.palette.mode === 'dark' ? '#f1f5f9' : '#1E293B'};
  padding: clamp(0.3rem, 0.8vw, 0.5rem);
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.theme.palette.primary.main};
    opacity: 0;
    transition: opacity 0.3s ease;
    -webkit-transition: opacity 0.3s ease;
    -moz-transition: opacity 0.3s ease;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
  }

  &:hover {
    transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    color: ${({ theme }) => theme.palette.mode === 'dark' ? '#64FFDA' : '#0D9488'};
    
    &::after {
      opacity: 0.1;
    }
  }

  svg {
    transition: transform 0.3s ease, color 0.3s ease;
    -webkit-transition: transform 0.3s ease, color 0.3s ease;
    -moz-transition: transform 0.3s ease, color 0.3s ease;
    font-size: clamp(1rem, 1.5vw, 1.2rem);
  }

  &:hover svg {
    transform: scale(1.2);
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
  }
  
  /* Responsive sizes - smaller to match header */
  @media (min-width: 1920px) {
    padding: 0.6rem;
    
    svg {
      font-size: 1.3rem;
    }
  }
  
  @media (min-width: 3840px) {
    padding: 0.7rem;
    
    svg {
      font-size: 1.5rem;
    }
  }
`;

const StyledFooter = styled.footer`
  background: transparent;
  color: ${({ theme }) => theme.palette.text.primary};
  padding: clamp(1.5rem, 4vw, 3rem) 0;
  margin-top: auto;
  
  /* Enhanced responsive padding */
  @media (max-width: 320px) {
    padding: 1rem 0;
  }
  
  @media (max-width: 480px) {
    padding: 1.25rem 0;
  }
  
  @media (min-width: 768px) {
    padding: 2rem 0;
  }
  
  @media (min-width: 1920px) {
    padding: 2.5rem 0;
  }
  
  @media (min-width: 2560px) {
    padding: 3rem 0;
  }
  
  @media (min-width: 3840px) {
    padding: 3.5rem 0;
  }
  
  @media (min-width: 7680px) {
    padding: 4rem 0;
  }
  
  /* Safe area support for notched devices */
  padding-bottom: max(clamp(1.5rem, 4vw, 3rem), env(safe-area-inset-bottom));
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  
  /* Box sizing with browser compatibility */
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  
  /* Performance optimization */
  will-change: auto;
  
  /* Touch improvements */
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
`;

const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { mode, toggleTheme } = useThemeContext();
  const theme = useMuiTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setIsScrolled(trigger);
  }, [trigger]);

  const drawer = (
    <Box sx={{ 
      textAlign: 'center', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      padding: 'clamp(1rem, 3vw, 2rem)',
      paddingTop: 'clamp(1.5rem, 4vw, 3rem)',
      
      /* Enhanced responsive padding with safe area support */
      '@media (max-width: 320px)': {
        padding: '0.75rem',
        paddingTop: 'max(1.25rem, env(safe-area-inset-top))',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(0.75rem, env(safe-area-inset-left))',
        paddingRight: 'max(0.75rem, env(safe-area-inset-right))',
      },
      '@media (max-width: 480px)': {
        padding: '1rem',
        paddingTop: 'max(1.75rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(1rem, env(safe-area-inset-left))',
        paddingRight: 'max(1rem, env(safe-area-inset-right))',
      },
      '@media (min-width: 481px) and (max-width: 768px)': {
        padding: '1.5rem',
        paddingTop: 'max(2.25rem, env(safe-area-inset-top))',
        paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))',
        paddingLeft: 'max(1.5rem, env(safe-area-inset-left))',
        paddingRight: 'max(1.5rem, env(safe-area-inset-right))',
      },
      
      /* Default safe area support for larger screens */
      '@media (min-width: 769px)': {
        paddingTop: 'max(clamp(1.5rem, 4vw, 3rem), env(safe-area-inset-top))',
        paddingBottom: 'max(clamp(1rem, 3vw, 2rem), env(safe-area-inset-bottom))',
        paddingLeft: 'max(clamp(1rem, 3vw, 2rem), env(safe-area-inset-left))',
        paddingRight: 'max(clamp(1rem, 3vw, 2rem), env(safe-area-inset-right))',
      },
    }}>
      <Box sx={{ 
        mb: 'clamp(1.5rem, 4vw, 3rem)', 
        display: 'flex', 
        justifyContent: 'center',
        '@media (max-width: 320px)': { mb: '1rem' },
        '@media (max-width: 480px)': { mb: '1.5rem' },
      }}>
        <Logo 
          to="/" 
          onClick={handleDrawerToggle}
        >
          IronCoffee Solutions
        </Logo>
      </Box>
      
      <List sx={{ 
        flex: 1, 
        padding: 0,
        '& .MuiListItem-root': {
          borderRadius: 'clamp(8px, 2vw, 16px)',
          WebkitBorderRadius: 'clamp(8px, 2vw, 16px)',
          MozBorderRadius: 'clamp(8px, 2vw, 16px)',
          margin: 'clamp(0.25rem, 1.5vw, 0.75rem) 0',
          padding: 'clamp(0.75rem, 2vw, 1.25rem) clamp(1rem, 3vw, 1.5rem)',
          
          /* Comprehensive transition support */
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          WebkitTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          MozTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          msTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          OTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          
          /* Touch improvements */
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          WebkitUserSelect: 'none',
          userSelect: 'none',
          
          /* Performance optimization */
          willChange: 'transform, background-color',
          
          /* Enhanced responsive sizing */
          '@media (max-width: 320px)': {
            margin: '0.2rem 0',
            padding: '0.6rem 0.8rem',
            borderRadius: '6px',
          },
          '@media (max-width: 480px)': {
            margin: '0.3rem 0',
            padding: '0.75rem 1rem',
            borderRadius: '8px',
          },
          
          '&:hover': {
            backgroundColor: theme => theme.palette.mode === 'dark' 
              ? 'rgba(100, 255, 218, 0.1)' 
              : 'rgba(13, 148, 136, 0.1)',
            
            /* Transform with full browser compatibility */
            transform: 'translateX(8px) scale(1.02)',
            WebkitTransform: 'translateX(8px) scale(1.02)',
            MozTransform: 'translateX(8px) scale(1.02)',
            msTransform: 'translateX(8px) scale(1.02)',
            OTransform: 'translateX(8px) scale(1.02)',
          },
          
          '&:active': {
            transform: 'translateX(4px) scale(0.98)',
            WebkitTransform: 'translateX(4px) scale(0.98)',
            MozTransform: 'translateX(4px) scale(0.98)',
            msTransform: 'translateX(4px) scale(0.98)',
            OTransform: 'translateX(4px) scale(0.98)',
          },
          
          /* Touch device optimizations */
          '@media (hover: none) and (pointer: coarse)': {
            '&:hover': {
              transform: 'none',
              WebkitTransform: 'none',
              MozTransform: 'none',
            },
            '&:active': {
              transform: 'scale(0.95)',
              WebkitTransform: 'scale(0.95)',
              MozTransform: 'scale(0.95)',
              backgroundColor: theme => theme.palette.mode === 'dark' 
                ? 'rgba(100, 255, 218, 0.15)' 
                : 'rgba(13, 148, 136, 0.15)',
            }
          }
        }
      }}>
        {navItems.map((item) => (
          <ListItem 
            key={item.label} 
            component={Link} 
            to={item.path} 
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: location.pathname === item.path 
                ? theme => theme.palette.mode === 'dark' 
                  ? 'rgba(100, 255, 218, 0.15)' 
                  : 'rgba(13, 148, 136, 0.15)'
                : 'transparent',
            }}
          >
            <ListItemText 
              primary={item.label}
              sx={{
                '& .MuiTypography-root': {
                  color: location.pathname === item.path 
                    ? theme => theme.palette.mode === 'dark' ? '#64FFDA' : '#0D9488'
                    : theme => theme.palette.text.primary,
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  fontSize: 'clamp(1rem, 3.5vw, 1.4rem)',
                  letterSpacing: '0.02em',
                  
                  /* Enhanced responsive font sizing */
                  '@media (max-width: 320px)': { fontSize: '0.95rem' },
                  '@media (max-width: 480px)': { fontSize: '1.1rem' },
                  '@media (min-width: 481px) and (max-width: 768px)': { fontSize: '1.2rem' },
                  
                  /* Font family with fallbacks */
                  fontFamily: [
                    '"Inter"',
                    '"Segoe UI"',
                    '"Roboto"',
                    '"-apple-system"',
                    '"BlinkMacSystemFont"',
                    '"Helvetica Neue"',
                    '"Arial"',
                    'sans-serif'
                  ].join(','),
                  
                  /* Text rendering improvements */
                  textRendering: 'optimizeLegibility',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
      
      <Box sx={{ 
        p: 'clamp(1rem, 3vw, 2rem)', 
        display: 'flex', 
        justifyContent: 'center',
        borderTop: theme => `1px solid ${theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)'}`,
        marginTop: 'auto',
        
        /* Enhanced responsive padding */
        '@media (max-width: 320px)': { p: '0.75rem' },
        '@media (max-width: 480px)': { p: '1rem' },
      }}>
        <ThemeToggleButton 
          onClick={() => {
            toggleTheme();
            handleDrawerToggle();
          }} 
          aria-label="toggle theme"
          size="large"
          sx={{
            padding: 'clamp(0.5rem, 2vw, 0.75rem)',
            minWidth: 'clamp(44px, 12vw, 56px)',
            minHeight: 'clamp(44px, 12vw, 56px)',
            
            /* Enhanced responsive sizing */
            '@media (max-width: 320px)': {
              padding: '0.4rem',
              minWidth: '40px',
              minHeight: '40px',
            },
            '@media (max-width: 480px)': {
              padding: '0.5rem',
              minWidth: '48px',
              minHeight: '48px',
            },
            
            /* Touch improvements */
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          {mode === 'dark' ? 
            <LightMode sx={{ 
              fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
              '@media (max-width: 320px)': { fontSize: '1.1rem' },
              '@media (max-width: 480px)': { fontSize: '1.3rem' },
            }} /> : 
            <DarkMode sx={{ 
              fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
              '@media (max-width: 320px)': { fontSize: '1.1rem' },
              '@media (max-width: 480px)': { fontSize: '1.3rem' },
            }} />
          }
        </ThemeToggleButton>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      minHeight: '100vh',
    }}>
      <AlwaysVisible>
        <StyledAppBar position="fixed" className={isScrolled ? 'scrolled' : ''}>
          <Container maxWidth="lg">
            <Toolbar sx={{ 
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              minHeight: { xs: '44px', sm: '48px', md: '52px', lg: '54px', xl: '56px' },
              maxHeight: { xs: '44px', sm: '48px', md: '52px', lg: '54px', xl: '56px' },
              padding: '0 !important',
              width: '100%'
            }}>
              <Box sx={{ 
                position: 'absolute', 
                left: 0,
                display: 'flex',
                alignItems: 'center'
              }}>
                <Logo to="/">
                  IronCoffee Solutions
                </Logo>
              </Box>
              
              <Box sx={{ 
                display: { xs: 'none', md: 'flex' }, 
                alignItems: 'center',
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                gap: { md: 0.5, lg: 0.75, xl: 1 },
                flexWrap: 'nowrap',
                minWidth: 'fit-content'
              }}>
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    as={Link}
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                  >
                    {item.label}
                  </NavLink>
                ))}
              </Box>
              
              <Box sx={{ 
                position: 'absolute', 
                right: 0,
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center'
              }}>
                <ThemeToggleButton 
                  onClick={toggleTheme} 
                  aria-label="toggle theme"
                >
                  {mode === 'dark' ? <LightMode /> : <DarkMode />}
                </ThemeToggleButton>
              </Box>

              <Box sx={{ 
                display: { xs: 'flex', md: 'none' }, 
                alignItems: 'center', 
                gap: 'clamp(0.5rem, 1.5vw, 1rem)', 
                position: 'absolute', 
                right: 0,
                height: '100%'
              }}>
                <ThemeToggleButton 
                  onClick={toggleTheme} 
                  aria-label="toggle theme"
                  size="small"
                  sx={{
                    padding: 'clamp(0.25rem, 1.5vw, 0.5rem)',
                    minWidth: 'clamp(32px, 8vw, 44px)',
                    minHeight: 'clamp(32px, 8vw, 44px)',
                    /* Enhanced responsive sizing */
                    '@media (max-width: 320px)': {
                      padding: '0.2rem',
                      minWidth: '28px',
                      minHeight: '28px',
                    },
                    '@media (max-width: 480px)': {
                      padding: '0.3rem',
                      minWidth: '36px',
                      minHeight: '36px',
                    },
                    '@media (min-width: 768px)': {
                      padding: '0.4rem',
                      minWidth: '40px',
                      minHeight: '40px',
                    },
                    /* Touch improvements */
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {mode === 'dark' ? 
                    <LightMode sx={{ 
                      fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                      '@media (max-width: 320px)': { fontSize: '0.9rem' },
                      '@media (max-width: 480px)': { fontSize: '1.1rem' },
                    }} /> : 
                    <DarkMode sx={{ 
                      fontSize: 'clamp(1rem, 3vw, 1.5rem)',
                      '@media (max-width: 320px)': { fontSize: '0.9rem' },
                      '@media (max-width: 480px)': { fontSize: '1.1rem' },
                    }} />
                  }
                </ThemeToggleButton>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  size="small"
                  sx={{ 
                    color: theme => theme.palette.mode === 'dark' ? '#f1f5f9' : '#1E293B',
                    padding: 'clamp(0.25rem, 1.5vw, 0.5rem)',
                    minWidth: 'clamp(32px, 8vw, 44px)',
                    minHeight: 'clamp(32px, 8vw, 44px)',
                    
                    /* Comprehensive transition support */
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    WebkitTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    MozTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    msTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    OTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    
                    /* Touch improvements */
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    
                    /* Enhanced responsive sizing */
                    '@media (max-width: 320px)': {
                      padding: '0.2rem',
                      minWidth: '28px',
                      minHeight: '28px',
                    },
                    '@media (max-width: 480px)': {
                      padding: '0.3rem',
                      minWidth: '36px',
                      minHeight: '36px',
                    },
                    '@media (min-width: 768px)': {
                      padding: '0.4rem',
                      minWidth: '40px',
                      minHeight: '40px',
                    },
                    
                    '&:hover': {
                      /* Transform with full browser compatibility */
                      transform: 'rotate(90deg) scale(1.1)',
                      WebkitTransform: 'rotate(90deg) scale(1.1)',
                      MozTransform: 'rotate(90deg) scale(1.1)',
                      msTransform: 'rotate(90deg) scale(1.1)',
                      OTransform: 'rotate(90deg) scale(1.1)',
                      color: theme => theme.palette.mode === 'dark' ? '#64FFDA' : '#0D9488',
                    },
                    
                    '&:active': {
                      transform: 'rotate(90deg) scale(0.95)',
                      WebkitTransform: 'rotate(90deg) scale(0.95)',
                      MozTransform: 'rotate(90deg) scale(0.95)',
                      msTransform: 'rotate(90deg) scale(0.95)',
                      OTransform: 'rotate(90deg) scale(0.95)',
                    },
                    
                    /* Touch device optimizations */
                    '@media (hover: none) and (pointer: coarse)': {
                      '&:hover': {
                        transform: 'none',
                        WebkitTransform: 'none',
                        MozTransform: 'none',
                      },
                      '&:active': {
                        transform: 'scale(0.9)',
                        WebkitTransform: 'scale(0.9)',
                        MozTransform: 'scale(0.9)',
                      }
                    }
                  }}
                >
                  <MenuIcon sx={{ 
                    fontSize: 'clamp(1.1rem, 3.5vw, 1.75rem)',
                    /* Enhanced responsive sizing */
                    '@media (max-width: 320px)': { fontSize: '1rem' },
                    '@media (max-width: 480px)': { fontSize: '1.2rem' },
                    '@media (min-width: 768px)': { fontSize: '1.4rem' },
                    
                    /* Performance optimization */
                    willChange: 'transform',
                  }} />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </StyledAppBar>
      </AlwaysVisible>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box',
            WebkitBoxSizing: 'border-box',
            MozBoxSizing: 'border-box',
            
            /* Enhanced responsive width */
            width: 'clamp(260px, 75vw, 360px)',
            maxWidth: '90vw',
            minWidth: '240px',
            
            /* Enhanced responsive sizing for different screen sizes */
            '@media (max-width: 320px)': {
              width: 'clamp(240px, 85vw, 280px)',
              maxWidth: '85vw',
            },
            '@media (max-width: 480px)': {
              width: 'clamp(260px, 80vw, 300px)',
              maxWidth: '80vw',
            },
            '@media (min-width: 481px) and (max-width: 768px)': {
              width: 'clamp(300px, 70vw, 340px)',
              maxWidth: '75vw',
            },
            
            background: theme => theme.palette.mode === 'dark' 
              ? 'rgba(0, 0, 0, 0.95)' 
              : 'rgba(255, 255, 255, 0.95)',
            
            /* Enhanced backdrop filter with browser compatibility */
            backdropFilter: 'blur(20px) saturate(200%)',
            WebkitBackdropFilter: 'blur(20px) saturate(200%)',
            MozBackdropFilter: 'blur(20px) saturate(200%)',
            
            /* Responsive border radius */
            borderRadius: 'clamp(12px, 3vw, 20px) 0 0 clamp(12px, 3vw, 20px)',
            WebkitBorderRadius: 'clamp(12px, 3vw, 20px) 0 0 clamp(12px, 3vw, 20px)',
            MozBorderRadius: 'clamp(12px, 3vw, 20px) 0 0 clamp(12px, 3vw, 20px)',
            
            border: theme => `1px solid ${theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)'}`,
            
            /* Enhanced box shadow with browser compatibility */
            boxShadow: theme => `0 clamp(8px, 2vw, 16px) clamp(32px, 5vw, 48px) ${theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.5)'
              : 'rgba(0, 0, 0, 0.2)'}`,
            WebkitBoxShadow: theme => `0 clamp(8px, 2vw, 16px) clamp(32px, 5vw, 48px) ${theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.5)'
              : 'rgba(0, 0, 0, 0.2)'}`,
            MozBoxShadow: theme => `0 clamp(8px, 2vw, 16px) clamp(32px, 5vw, 48px) ${theme.palette.mode === 'dark'
              ? 'rgba(0, 0, 0, 0.5)'
              : 'rgba(0, 0, 0, 0.2)'}`,
            
            /* Performance optimization */
            willChange: 'transform',
            
            /* Touch improvements */
            WebkitTouchCallout: 'none',
            WebkitTapHighlightColor: 'transparent',
            
            /* Comprehensive transition support */
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            WebkitTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            MozTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            msTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            OTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
          '& .MuiBackdrop-root': {
            /* Enhanced backdrop filter with browser compatibility */
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            MozBackdropFilter: 'blur(4px)',
            
            /* Background with fallback */
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            
            /* Touch improvements */
            WebkitTapHighlightColor: 'transparent',
            touchAction: 'manipulation',
          }
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ 
        flexGrow: 1,
        pt: { xs: 8, md: 10 },
      }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Box>

      <StyledFooter>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 'clamp(2rem, 5vw, 6rem)',
            
            /* Enhanced responsive gap */
            '@media (max-width: 320px)': { gap: '1.5rem' },
            '@media (max-width: 480px)': { gap: '2rem' },
            '@media (min-width: 768px)': { gap: '3rem' },
            '@media (min-width: 1920px)': { gap: '4rem' },
            '@media (min-width: 2560px)': { gap: '5rem' },
            '@media (min-width: 3840px)': { gap: '6rem' },
            '@media (min-width: 7680px)': { gap: '8rem' },
          }}>
            <Box sx={{ 
              textAlign: { xs: 'center', md: 'left' },
              flex: { md: 1 },
              maxWidth: { xs: '100%', md: '60%' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              
              /* Enhanced responsive alignment */
              '@media (max-width: 320px)': { 
                textAlign: 'center',
                alignItems: 'center',
              },
              '@media (max-width: 480px)': { 
                textAlign: 'center',
                alignItems: 'center',
              },
              '@media (max-width: 767px)': { 
                textAlign: 'center',
                alignItems: 'center',
              },
              '@media (min-width: 768px)': { 
                textAlign: 'left',
                alignItems: 'flex-start',
              },
            }}>
              <Logo 
                to="/"
              >
                IronCoffee Solutions
              </Logo>
              <Box sx={{ 
                mt: 'clamp(0.5rem, 2vw, 1.5rem)', 
                opacity: 0.8,
                fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                lineHeight: 1.5,
                color: 'text.secondary',
                
                /* Enhanced responsive sizing */
                '@media (max-width: 320px)': { 
                  fontSize: '0.8rem',
                  mt: '0.5rem',
                },
                '@media (max-width: 480px)': { 
                  fontSize: '0.875rem',
                  mt: '0.75rem',
                },
                '@media (min-width: 1920px)': { 
                  fontSize: '1.1rem',
                  mt: '1rem',
                },
                '@media (min-width: 2560px)': { 
                  fontSize: '1.25rem',
                  mt: '1.25rem',
                },
                '@media (min-width: 3840px)': { 
                  fontSize: '1.5rem',
                  mt: '1.5rem',
                },
                '@media (min-width: 7680px)': { 
                  fontSize: '1.8rem',
                  mt: '2rem',
                },
                
                /* Font family with fallbacks */
                fontFamily: [
                  '"Inter"',
                  '"Segoe UI"',
                  '"Roboto"',
                  '"-apple-system"',
                  '"BlinkMacSystemFont"',
                  '"Helvetica Neue"',
                  '"Arial"',
                  'sans-serif'
                ].join(','),
                
                /* Text rendering improvements */
                textRendering: 'optimizeLegibility',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}>
                Creative Technology & IT Solutions
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 'clamp(1rem, 3vw, 3rem)',
              textAlign: { xs: 'center', md: 'left' },
              flex: { md: 1 },
              justifyContent: { xs: 'center', md: 'flex-end' },
              flexWrap: 'wrap',
              
              /* Enhanced responsive gap and layout */
              '@media (max-width: 320px)': { 
                gap: '0.75rem',
                flexDirection: 'column',
              },
              '@media (max-width: 480px)': { 
                gap: '1rem',
                flexDirection: 'column',
              },
              '@media (min-width: 481px) and (max-width: 767px)': { 
                gap: '1.5rem',
                flexDirection: 'row',
                justifyContent: 'center',
              },
              '@media (min-width: 768px)': { 
                gap: '2rem',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              },
              '@media (min-width: 1920px)': { gap: '2.5rem' },
              '@media (min-width: 2560px)': { gap: '3rem' },
              '@media (min-width: 3840px)': { gap: '3.5rem' },
              '@media (min-width: 7680px)': { gap: '4rem' },
            }}>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  style={{ 
                    color: 'inherit',
                    textDecoration: 'none',
                    opacity: 0.8,
                    fontSize: 'clamp(0.875rem, 2vw, 1.125rem)',
                    fontWeight: 500,
                    letterSpacing: '0.02em',
                    
                    /* Comprehensive transition support */
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    WebkitTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    MozTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    msTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    OTransition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    
                    /* Touch improvements */
                    WebkitTapHighlightColor: 'transparent',
                    touchAction: 'manipulation',
                    
                    /* Font family with fallbacks */
                    fontFamily: [
                      '"Inter"',
                      '"Segoe UI"',
                      '"Roboto"',
                      '"-apple-system"',
                      '"BlinkMacSystemFont"',
                      '"Helvetica Neue"',
                      '"Arial"',
                      'sans-serif'
                    ].join(','),
                    
                    /* Text rendering improvements */
                    textRendering: 'optimizeLegibility',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '1';
                    e.currentTarget.style.color = theme.palette.primary.main;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.webkitTransform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                    e.currentTarget.style.color = 'inherit';
                    e.currentTarget.style.transform = 'translateY(0px)';
                    e.currentTarget.style.webkitTransform = 'translateY(0px)';
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Box>
          </Box>

          <Box sx={{ 
            mt: 'clamp(2rem, 5vw, 4rem)',
            pt: 'clamp(1.5rem, 4vw, 3rem)',
            borderTop: theme => `1px solid ${theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)'}`,
            textAlign: 'center',
            opacity: 0.7,
            fontSize: 'clamp(0.75rem, 1.8vw, 1rem)',
            color: 'text.secondary',
            
            /* Enhanced responsive sizing */
            '@media (max-width: 320px)': { 
              mt: '1.5rem',
              pt: '1rem',
              fontSize: '0.7rem',
            },
            '@media (max-width: 480px)': { 
              mt: '2rem',
              pt: '1.25rem',
              fontSize: '0.75rem',
            },
            '@media (min-width: 1920px)': { 
              mt: '3rem',
              pt: '2rem',
              fontSize: '0.95rem',
            },
            '@media (min-width: 2560px)': { 
              mt: '3.5rem',
              pt: '2.25rem',
              fontSize: '1.1rem',
            },
            '@media (min-width: 3840px)': { 
              mt: '4rem',
              pt: '2.5rem',
              fontSize: '1.3rem',
            },
            '@media (min-width: 7680px)': { 
              mt: '5rem',
              pt: '3rem',
              fontSize: '1.5rem',
            },
            
            /* Font family with fallbacks */
            fontFamily: [
              '"Inter"',
              '"Segoe UI"',
              '"Roboto"',
              '"-apple-system"',
              '"BlinkMacSystemFont"',
              '"Helvetica Neue"',
              '"Arial"',
              'sans-serif'
            ].join(','),
            
            /* Text rendering improvements */
            textRendering: 'optimizeLegibility',
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
          }}>
            © {new Date().getFullYear()} IronCoffee LLC. All rights reserved.
          </Box>
        </Container>
      </StyledFooter>
    </Box>
  );
};

export default MainLayout; 