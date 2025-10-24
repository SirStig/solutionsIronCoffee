import { createTheme, responsiveFontSizes, PaletteMode } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

// Extend the default theme type for styled-components
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {
    palette: Theme['palette'] & {
      tertiary: Theme['palette']['primary'];
      accent: {
        primary: string;
        secondary: string;
        tertiary: string;
      };
      customBackground: {
        dark: string;
        darker: string;
        darkest: string;
        light: string;
        gradient: string;
        glass: string;
        card: string;
      };
    };
  }
}

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    accent: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    customBackground: {
      dark: string;
      darker: string;
      darkest: string;
      light: string;
      gradient: string;
      glass: string;
      card: string;
    };
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    accent?: {
      primary: string;
      secondary: string;
      tertiary: string;
    };
    customBackground?: {
      dark: string;
      darker: string;
      darkest: string;
      light: string;
      gradient: string;
      glass: string;
      card: string;
    };
  }
}

const getDesignTokens = (mode: PaletteMode) => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      '2xl': 2560,    // 2K/QHD displays
      '3xl': 3440,    // Ultra-wide displays
      '4xl': 3840,    // 4K displays
      '5xl': 5120,    // 5K displays
      '6xl': 6016,    // 6K displays
      '7xl': 7680,    // 8K displays
      mobile: 480,
      tablet: 768,
      tabletLarge: 1024,
      desktop: 1366,
      desktopLarge: 1600,
      widescreen: 2048,
      ultrawide: 3840,
    },
  },
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#3b82f6' : '#0D9488',
      light: mode === 'dark' ? '#60a5fa' : '#14B8A6',
      dark: mode === 'dark' ? '#2564EBFF' : '#0F766E',
      contrastText: mode === 'dark' ? '#1a202c' : '#FFFFFF',
    },
    secondary: {
      main: mode === 'dark' ? '#1e40af' : '#6D28D9',
      light: mode === 'dark' ? '#3b82f6' : '#8B5CF6',
      dark: mode === 'dark' ? '#1E3B8AFF' : '#5B21B6',
      contrastText: '#FFFFFF',
    },
    tertiary: {
      main: mode === 'dark' ? '#1E40AFFF' : '#DB2777',
      light: mode === 'dark' ? '#3b82f6' : '#EC4899',
      dark: mode === 'dark' ? '#1e3a8a' : '#BE185D',
      contrastText: '#FFFFFF',
    },
    accent: {
      primary: mode === 'dark' ? '#3b82f6' : '#0D9488',
      secondary: mode === 'dark' ? '#1e40af' : '#6D28D9',
      tertiary: mode === 'dark' ? '#1E40AFFF' : '#DB2777',
    },
    background: {
      default: mode === 'dark' ? '#1a1a1a' : '#F1F5F9',
      paper: mode === 'dark' ? '#2d2d2d' : '#FFFFFF',
    },
    text: {
      primary: mode === 'dark' ? '#f1f5f9' : '#0F1520FF',
      secondary: mode === 'dark' ? '#94a3b8' : '#232D3AFF',
    },
    customBackground: {
      dark: mode === 'dark' ? '#1a1a1a' : '#E2E8F0',
      darker: mode === 'dark' ? '#2d2d2d' : '#CBD5E1',
      darkest: mode === 'dark' ? '#0f0f0f' : '#94A3B8',
      light: mode === 'dark' ? '#404040' : '#64748B',
      gradient: mode === 'dark'
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        : 'linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)',
      glass: mode === 'dark'
        ? 'rgba(45, 45, 45, 0.7)'
        : 'rgba(255, 255, 255, 0.85)',
      card: mode === 'dark'
        ? 'rgba(45, 45, 45, 0.5)'
        : 'rgba(255, 255, 255, 0.9)',
    },
  },
  typography: {
    fontFamily: [
      '"SF Mono"',
      '"Fira Code"',
      '"Monaco"',
      '"Cascadia Code"',
      '"Roboto Mono"',
      '"Consolas"',
      'monospace'
    ].join(','),
    h1: {
      fontFamily: [
        '"Calibre"',
        '"Inter"',
        '"San Francisco"',
        '"SF Pro Text"',
        '"-apple-system"',
        '"BlinkMacSystemFont"',
        '"Segoe UI"',
        '"Roboto"',
        '"Helvetica Neue"',
        '"Arial"',
        'sans-serif'
      ].join(','),
      fontSize: 'clamp(2rem, 6vw + 0.5rem, 4rem)',
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      '@media (min-width: 2560px)': {
        fontSize: '4rem',
      },
    },
    h2: {
      fontFamily: [
        '"Calibre"',
        '"Inter"',
        '"San Francisco"',
        '"SF Pro Text"',
        '"-apple-system"',
        '"BlinkMacSystemFont"',
        '"Segoe UI"',
        '"Roboto"',
        '"Helvetica Neue"',
        '"Arial"',
        'sans-serif'
      ].join(','),
      fontSize: 'clamp(1.75rem, 4vw + 0.5rem, 3rem)',
      fontWeight: 600,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
      '@media (min-width: 2560px)': {
        fontSize: '3rem',
      },
    },
    h3: {
      fontFamily: [
        '"Calibre"',
        '"Inter"',
        '"San Francisco"',
        '"SF Pro Text"',
        '"-apple-system"',
        '"BlinkMacSystemFont"',
        '"Segoe UI"',
        '"Roboto"',
        '"Helvetica Neue"',
        '"Arial"',
        'sans-serif'
      ].join(','),
      fontSize: 'clamp(1.5rem, 3vw + 0.25rem, 2rem)',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (min-width: 2560px)': {
        fontSize: '2rem',
      },
    },
    h4: {
      fontFamily: [
        '"Calibre"',
        '"Inter"',
        '"San Francisco"',
        '"SF Pro Text"',
        '"-apple-system"',
        '"BlinkMacSystemFont"',
        '"Segoe UI"',
        '"Roboto"',
        '"Helvetica Neue"',
        '"Arial"',
        'sans-serif'
      ].join(','),
      fontSize: 'clamp(1.25rem, 2.5vw + 0.25rem, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.3,
      '@media (min-width: 2560px)': {
        fontSize: '1.5rem',
      },
    },
    h5: {
      fontFamily: [
        '"Calibre"',
        '"Inter"',
        '"San Francisco"',
        '"SF Pro Text"',
        '"-apple-system"',
        '"BlinkMacSystemFont"',
        '"Segoe UI"',
        '"Roboto"',
        '"Helvetica Neue"',
        '"Arial"',
        'sans-serif'
      ].join(','),
      fontSize: 'clamp(1.125rem, 2vw + 0.125rem, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.4,
      '@media (min-width: 2560px)': {
        fontSize: 'clamp(1.5rem, 1.5vw, 2.5rem)',
      },
      '@media (min-width: 3840px)': {
        fontSize: 'clamp(1.75rem, 1.25vw, 3rem)',
      },
      '@media (min-width: 7680px)': {
        fontSize: 'clamp(2rem, 1vw, 4rem)',
      },
    },
    h6: {
      fontFamily: [
        '"SF Mono"',
        '"Fira Code"',
        '"Monaco"',
        '"Cascadia Code"',
        '"Roboto Mono"',
        '"Consolas"',
        'monospace'
      ].join(','),
      fontSize: 'clamp(1rem, 1.5vw + 0.125rem, 1.25rem)',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.1em',
    },
    subtitle1: {
      fontFamily: [
        '"SF Mono"',
        '"Fira Code"',
        '"Monaco"',
        '"Cascadia Code"',
        '"Roboto Mono"',
        '"Consolas"',
        'monospace'
      ].join(','),
      fontSize: 'clamp(1rem, 1.5vw + 0.125rem, 1.25rem)',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.1em',
    },
    body1: {
      fontFamily: [
        '"Calibre"',
        '"Inter"',
        '"San Francisco"',
        '"SF Pro Text"',
        '"-apple-system"',
        '"BlinkMacSystemFont"',
        '"Segoe UI"',
        '"Roboto"',
        '"Helvetica Neue"',
        '"Arial"',
        'sans-serif'
      ].join(','),
      fontSize: 'clamp(1rem, 1.5vw + 0.125rem, 1.375rem)',
      lineHeight: 1.7,
      '@media (min-width: 2560px)': {
        fontSize: 'clamp(1.25rem, 1vw, 2rem)',
      },
      '@media (min-width: 3840px)': {
        fontSize: 'clamp(1.5rem, 0.875vw, 2.5rem)',
      },
      '@media (min-width: 7680px)': {
        fontSize: 'clamp(1.75rem, 0.75vw, 3rem)',
      },
    },
    body2: {
      fontFamily: [
        '"Calibre"',
        '"Inter"',
        '"San Francisco"',
        '"SF Pro Text"',
        '"-apple-system"',
        '"BlinkMacSystemFont"',
        '"Segoe UI"',
        '"Roboto"',
        '"Helvetica Neue"',
        '"Arial"',
        'sans-serif'
      ].join(','),
      fontSize: 'clamp(0.875rem, 1.25vw + 0.125rem, 1.25rem)',
      lineHeight: 1.7,
      '@media (min-width: 2560px)': {
        fontSize: 'clamp(1rem, 0.875vw, 1.75rem)',
      },
      '@media (min-width: 3840px)': {
        fontSize: 'clamp(1.25rem, 0.75vw, 2.25rem)',
      },
      '@media (min-width: 7680px)': {
        fontSize: 'clamp(1.5rem, 0.625vw, 2.75rem)',
      },
    },
    button: {
      fontFamily: [
        '"SF Mono"',
        '"Fira Code"',
        '"Monaco"',
        '"Cascadia Code"',
        '"Roboto Mono"',
        '"Consolas"',
        'monospace'
      ].join(','),
      textTransform: 'none' as const,
      letterSpacing: '0.1em',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          /* Modern CSS reset with full browser compatibility */
          boxSizing: 'border-box',
          WebkitBoxSizing: 'border-box',
          MozBoxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        '*::before, *::after': {
          boxSizing: 'border-box',
          WebkitBoxSizing: 'border-box',
          MozBoxSizing: 'border-box',
        },
        html: {
          /* Font smoothing for all browsers */
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          fontSmooth: 'always',
          textRendering: 'optimizeLegibility',
          /* Touch behavior improvements */
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          KhtmlUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
          /* Scroll behavior */
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
          /* Better tap highlighting */
          WebkitTapHighlightColor: 'transparent',
          /* High DPI support */
          minResolution: '1dppx',
          WebkitMinDevicePixelRatio: 1,
          /* Modern browser features */
          fontVariantLigatures: 'common-ligatures',
          fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1',
          /* Firefox scrollbar support */
          scrollbarWidth: 'thin',
          scrollbarColor: `${mode === 'dark' ? '#334155' : '#94A3B8'} ${mode === 'dark' ? '#0f172a' : '#E2E8F0'}`,
        },
        'html, body': {
          backgroundColor: mode === 'dark' ? '#0F172A00' : '#F1F5F900',
          color: mode === 'dark' ? '#f1f5f9' : '#1E293B',
          cursor: 'none',
          /* Mobile viewport fixes - use modern approach with fallback */
          minHeight: '100vh',
          WebkitTextSizeAdjust: '100%',
          textSizeAdjust: '100%',
          /* Performance improvements */
          willChange: 'auto',
        },
        '@supports (height: 100dvh)': {
          'html, body': {
            minHeight: '100dvh',
          },
        },
        body: {
          /* Font rendering improvements */
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          textRendering: 'optimizeLegibility',
          /* Layout improvements */
          overflowX: 'hidden',
          /* Color scheme support */
          colorScheme: mode === 'dark' ? 'dark' : 'light',
          /* Mobile improvements */
          WebkitOverflowScrolling: 'touch',
          touchAction: 'manipulation',
        },
        /* Selection styles with browser compatibility */
        '::selection': {
          backgroundColor: mode === 'dark' ? 'rgba(100, 255, 218, 0.2)' : 'rgba(13, 148, 136, 0.2)',
          color: mode === 'dark' ? '#64FFDA' : '#0D9488',
        },
        '::-moz-selection': {
          backgroundColor: mode === 'dark' ? 'rgba(100, 255, 218, 0.2)' : 'rgba(13, 148, 136, 0.2)',
          color: mode === 'dark' ? '#64FFDA' : '#0D9488',
        },
        /* Comprehensive scrollbar styling */
        '::-webkit-scrollbar': {
          width: 'clamp(8px, 1vw, 12px)',
          height: 'clamp(8px, 1vw, 12px)',
        },
        '::-webkit-scrollbar-track': {
          background: mode === 'dark' ? '#0f172a' : '#E2E8F0',
          borderRadius: '6px',
        },
        '::-webkit-scrollbar-thumb': {
          background: mode === 'dark' ? '#334155' : '#94A3B8',
          borderRadius: '6px',
          border: `2px solid ${mode === 'dark' ? '#0f172a' : '#E2E8F0'}`,
          '&:hover': {
            background: mode === 'dark' ? '#3b82f6' : '#0D9488',
          },
          '&:active': {
            background: mode === 'dark' ? '#2563eb' : '#0F766E',
          },
        },
        '::-webkit-scrollbar-corner': {
          background: mode === 'dark' ? '#0f172a' : '#E2E8F0',
        },
        /* Firefox scrollbar support - merge with existing html styles */
        /* Link styles with full browser compatibility */
        a: {
          color: mode === 'dark' ? '#64FFDA' : '#0D9488',
          textDecoration: 'none',
          /* Comprehensive transition support */
          transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          WebkitTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          MozTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          msTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          OTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          /* Focus improvements */
          '&:focus-visible': {
            outline: `2px solid ${mode === 'dark' ? '#3b82f6' : '#0D9488'}`,
            outlineOffset: '2px',
            borderRadius: '2px',
          },
          '&:hover, &:focus': {
            color: mode === 'dark' ? '#9EFFEB' : '#14B8A6',
          },
        },
        /* Button reset and improvements */
        'button, input[type="submit"], input[type="reset"], input[type="button"]': {
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
          border: 'none',
          background: 'none',
          font: 'inherit',
          outline: 'none',
          /* Focus improvements */
          '&:focus-visible': {
            outline: `2px solid ${mode === 'dark' ? '#3b82f6' : '#FFFFFFFF'}`,
            outlineOffset: '2px',
          },
          /* Touch improvements */
          touchAction: 'manipulation',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        },
        /* Form element improvements */
        'input, textarea, select': {
          font: 'inherit',
          /* Mobile improvements */
          WebkitAppearance: 'none',
          MozAppearance: 'none',
          appearance: 'none',
          /* Touch improvements */
          touchAction: 'manipulation',
        },
        /* Image optimizations */
        'img, picture, video, canvas, svg': {
          display: 'block',
          maxWidth: '100%',
          height: 'auto',
          /* Performance improvements */
          imageRendering: 'optimizeQuality',
          /* Prevent dragging */
          WebkitUserDrag: 'none',
          KhtmlUserDrag: 'none',
          MozUserDrag: 'none',
          OUserDrag: 'none',
          userDrag: 'none',
          /* Touch improvements */
          WebkitTouchCallout: 'none',
        },
        /* High DPI image support */
        '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx)': {
          img: {
            imageRendering: 'crisp-edges',
            /* Fallback for older webkit */
            '@supports not (image-rendering: crisp-edges)': {
              imageRendering: '-webkit-optimize-contrast',
            },
          },
        },
        /* Print styles */
        '@media print': {
          '*': {
            background: 'transparent !important',
            color: 'black !important',
            boxShadow: 'none !important',
            textShadow: 'none !important',
          },
          'a, a:visited': {
            textDecoration: 'underline',
          },
          'a[href]:after': {
            content: '" (" attr(href) ")"',
          },
          'abbr[title]:after': {
            content: '" (" attr(title) ")"',
          },
          'pre, blockquote': {
            border: '1px solid #999',
            pageBreakInside: 'avoid',
          },
          'thead': {
            display: 'table-header-group',
          },
          'tr, img': {
            pageBreakInside: 'avoid',
          },
          'img': {
            maxWidth: '100% !important',
          },
          'p, h2, h3': {
            orphans: 3,
            widows: 3,
          },
          'h2, h3': {
            pageBreakAfter: 'avoid',
          },
        },
        /* Accessibility improvements */
        '@media (prefers-reduced-motion: reduce)': {
          '*': {
            animationDuration: '0.01ms !important',
            animationIterationCount: '1 !important',
            transitionDuration: '0.01ms !important',
            scrollBehavior: 'auto !important',
          },
        },
        /* High contrast mode support */
        '@media (prefers-contrast: high)': {
          '*': {
            forcedColorAdjust: 'auto',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 'clamp(4px, 0.5vw, 8px)',
          padding: 'clamp(8px, 1.5vw, 16px) clamp(20px, 3vw, 36px)',
          /* Comprehensive transition support */
          transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          WebkitTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          MozTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          msTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          OTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          /* Touch improvements */
          touchAction: 'manipulation',
          WebkitTapHighlightColor: 'transparent',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
          userSelect: 'none',
          /* Enhanced focus for accessibility */
          '&:focus-visible': {
            outline: `2px solid ${mode === 'dark' ? '#3b82f6' : '#0D9488'}`,
            outlineOffset: '2px',
          },
          '&:hover': {
            /* Transform with browser compatibility */
            transform: 'translateY(-2px)',
            WebkitTransform: 'translateY(-2px)',
            MozTransform: 'translateY(-2px)',
            msTransform: 'translateY(-2px)',
            OTransform: 'translateY(-2px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
            WebkitTransform: 'translateY(0px)',
            MozTransform: 'translateY(0px)',
            msTransform: 'translateY(0px)',
            OTransform: 'translateY(0px)',
          },
          /* Responsive sizing */
          '@media (min-width: 2560px)': {
            padding: 'clamp(14px, 1.2vw, 20px) clamp(32px, 2.5vw, 48px)',
            fontSize: 'clamp(1rem, 0.8vw, 1.5rem)',
          },
          '@media (min-width: 3840px)': {
            padding: 'clamp(16px, 1vw, 24px) clamp(40px, 2vw, 60px)',
            fontSize: 'clamp(1.125rem, 0.7vw, 1.75rem)',
          },
          '@media (min-width: 7680px)': {
            padding: 'clamp(20px, 0.8vw, 32px) clamp(50px, 1.5vw, 80px)',
            fontSize: 'clamp(1.25rem, 0.6vw, 2rem)',
          },
        },
        contained: {
          backgroundColor: mode === 'dark' ? 'transparent' : 'rgba(13, 148, 136, 0.1)',
          border: mode === 'dark' ? '1px solid #FFFFFFFF' : '1px solid #FFFFFFFF',
          color: mode === 'dark' ? '#FFFFFFFF' : '#FFFFFFFF',
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(13, 148, 136, 0.2)',
          },
        },
        outlined: {
          borderColor: mode === 'dark' ? '#FFFFFFFF' : '#FFFFFFFF',
          color: mode === 'dark' ? '#FFFFFFFF' : '#FFFFFFFF',
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(13, 148, 136, 0.1)',
            borderColor: mode === 'dark' ? '#64FFDA' : '#FFFFFFFF',
          },
        },
        text: {
          color: mode === 'dark' ? '#64FFDA' : '#0D9488',
          '&:hover': {
            backgroundColor: mode === 'dark' ? 'rgba(100, 255, 218, 0.1)' : 'rgba(13, 148, 136, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'rgba(255, 255, 255, 0.9)',
          /* Comprehensive backdrop filter support */
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: mode === 'dark'
            ? '1px solid rgba(59, 130, 246, 0.1)'
            : '1px solid rgba(13, 148, 136, 0.1)',
          borderRadius: 'clamp(8px, 1vw, 16px)',
          /* Enhanced box shadow with responsive sizing */
          boxShadow: mode === 'dark'
            ? 'clamp(0px, 0.5vw, 4px) clamp(4px, 1vw, 8px) clamp(20px, 2vw, 32px) rgba(0, 0, 0, 0.3)'
            : 'clamp(0px, 0.5vw, 4px) clamp(4px, 1vw, 8px) clamp(20px, 2vw, 32px) rgba(15, 23, 42, 0.1)',
          /* Comprehensive transition support */
          transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          WebkitTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          MozTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          msTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          OTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          /* Performance optimization */
          willChange: 'transform, box-shadow, border-color',
          /* Touch improvements */
          WebkitTouchCallout: 'none',
          WebkitTapHighlightColor: 'transparent',
          '&:hover': {
            /* Transform with full browser compatibility */
            transform: 'translateY(-8px)',
            WebkitTransform: 'translateY(-8px)',
            MozTransform: 'translateY(-8px)',
            msTransform: 'translateY(-8px)',
            OTransform: 'translateY(-8px)',
            /* Enhanced responsive shadow */
            boxShadow: mode === 'dark'
              ? 'clamp(0px, 0.8vw, 8px) clamp(20px, 2.5vw, 40px) clamp(30px, 3vw, 48px) clamp(-15px, -1.5vw, -24px) rgba(15, 23, 42, 0.7)'
              : 'clamp(0px, 0.8vw, 8px) clamp(20px, 2.5vw, 40px) clamp(30px, 3vw, 48px) clamp(-15px, -1.5vw, -24px) rgba(15, 23, 42, 0.2)',
            border: mode === 'dark'
              ? '1px solid #3b82f6'
              : '1px solid #FFFFFFFF',
          },
          /* Responsive scaling for high-resolution displays */
          '@media (min-width: 2560px)': {
            borderRadius: 'clamp(12px, 0.8vw, 20px)',
            padding: 'clamp(24px, 1.5vw, 32px)',
          },
          '@media (min-width: 3840px)': {
            borderRadius: 'clamp(16px, 0.6vw, 24px)',
            padding: 'clamp(32px, 1.2vw, 40px)',
          },
          '@media (min-width: 7680px)': {
            borderRadius: 'clamp(20px, 0.4vw, 32px)',
            padding: 'clamp(40px, 1vw, 56px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1e293b' : '#FFFFFF',
          backgroundImage: 'none',
          borderRadius: 'clamp(8px, 1vw, 16px)',
          /* Enhanced responsive box shadow */
          boxShadow: mode === 'dark'
            ? 'clamp(0px, 0.5vw, 4px) clamp(4px, 1vw, 8px) clamp(20px, 2vw, 32px) rgba(0, 0, 0, 0.3)'
            : 'clamp(0px, 0.5vw, 4px) clamp(4px, 1vw, 8px) clamp(20px, 2vw, 32px) rgba(15, 23, 42, 0.1)',
          /* Comprehensive transition support */
          transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          WebkitTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          MozTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          msTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          OTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark'
            ? 'rgba(15, 23, 42, 0.8)'
            : 'rgba(241, 245, 249, 0.85)',
          /* Comprehensive backdrop filter support */
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: mode === 'dark'
            ? '1px solid rgba(59, 130, 246, 0.1)'
            : '1px solid rgba(13, 148, 136, 0.1)',
          /* Comprehensive transition support */
          transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
          WebkitTransition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
          MozTransition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
          msTransition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
          OTransition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
          /* Responsive sizing */
          '@media (min-width: 2560px)': {
            height: 'clamp(64px, 4vw, 80px)',
          },
          '@media (min-width: 3840px)': {
            height: 'clamp(72px, 3.5vw, 96px)',
          },
          '@media (min-width: 7680px)': {
            height: 'clamp(80px, 3vw, 120px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark'
            ? 'rgba(100, 255, 218, 0.1)'
            : 'rgba(13, 148, 136, 0.1)',
          color: mode === 'dark' ? '#64FFDA' : '#0D9488',
          border: mode === 'dark'
            ? '1px solid rgba(100, 255, 218, 0.2)'
            : '1px solid rgba(13, 148, 136, 0.2)',
          borderRadius: 'clamp(16px, 2vw, 24px)',
          fontSize: 'clamp(0.75rem, 1vw + 0.125rem, 1rem)',
          height: 'auto',
          padding: 'clamp(4px, 0.5vw, 8px) clamp(8px, 1vw, 12px)',
          /* Comprehensive transition support */
          transition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          WebkitTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          MozTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          msTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          OTransition: 'all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1)',
          /* Touch improvements */
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
          '&:hover': {
            /* Transform with browser compatibility */
            transform: 'scale(1.05)',
            WebkitTransform: 'scale(1.05)',
            MozTransform: 'scale(1.05)',
            msTransform: 'scale(1.05)',
            OTransform: 'scale(1.05)',
          },
          /* Responsive sizing for high-resolution displays */
          '@media (min-width: 2560px)': {
            fontSize: 'clamp(0.875rem, 0.8vw, 1.25rem)',
            padding: 'clamp(6px, 0.4vw, 10px) clamp(12px, 0.8vw, 16px)',
          },
          '@media (min-width: 3840px)': {
            fontSize: 'clamp(1rem, 0.6vw, 1.5rem)',
            padding: 'clamp(8px, 0.3vw, 12px) clamp(16px, 0.6vw, 20px)',
          },
          '@media (min-width: 7680px)': {
            fontSize: 'clamp(1.125rem, 0.5vw, 1.75rem)',
            padding: 'clamp(10px, 0.25vw, 16px) clamp(20px, 0.5vw, 28px)',
          },
        },
      },
    },
  },
});

export const createCustomTheme = (mode: PaletteMode) => {
  const themeOptions = getDesignTokens(mode);
  let theme = createTheme({
    breakpoints: themeOptions.breakpoints,
    palette: themeOptions.palette,
    typography: themeOptions.typography,
    shape: themeOptions.shape,
  });
  
  // Apply component overrides separately to avoid type conflicts
  theme = createTheme(theme, {
    components: themeOptions.components,
  });
  
  theme = responsiveFontSizes(theme);
  return theme;
};

export default createCustomTheme('dark');
