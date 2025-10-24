import { css } from 'styled-components';

export const mobileStyles = {
  noSelect: css`
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  `,

  safePadding: css`
    padding-top: env(safe-area-inset-top);
    padding-bottom: env(safe-area-inset-bottom);
    padding-left: env(safe-area-inset-left);
    padding-right: env(safe-area-inset-right);
  `,

  touchFeedback: css`
    &:active {
      transform: scale(0.98);
      transition: transform 0.1s ease;
    }
  `,

  scrolling: css`
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    overscroll-behavior-y: contain;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  hideScrollbar: css`
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  `,

  // Comprehensive Media Queries for All Device Types and Resolutions
  mediaQueries: {
    // Mobile devices
    mobileXS: '@media (max-width: 320px)',
    mobileSmall: '@media (max-width: 375px)',
    mobile: '@media (max-width: 480px)',
    mobileLarge: '@media (max-width: 576px)',
    
    // Tablet devices
    tabletSmall: '@media (max-width: 600px)',
    tablet: '@media (max-width: 768px)',
    tabletLarge: '@media (max-width: 1024px)',
    
    // Desktop devices
    desktopSmall: '@media (max-width: 960px)',
    desktop: '@media (min-width: 1024px)',
    desktopMedium: '@media (min-width: 1280px)',
    desktopLarge: '@media (min-width: 1366px)',
    desktopXL: '@media (min-width: 1600px)',
    
    // High resolution displays
    fullHD: '@media (min-width: 1920px)',
    widescreen: '@media (min-width: 2048px)',
    qhd2K: '@media (min-width: 2560px)',
    ultrawide: '@media (min-width: 3440px)',
    uhd4K: '@media (min-width: 3840px)',
    uhd5K: '@media (min-width: 5120px)',
    uhd6K: '@media (min-width: 6016px)',
    uhd8K: '@media (min-width: 7680px)',
    
    // Device capabilities
    landscape: '@media (orientation: landscape)',
    portrait: '@media (orientation: portrait)',
    touchDevice: '@media (hover: none) and (pointer: coarse)',
    hover: '@media (hover: hover) and (pointer: fine)',
    
    // High DPI support
    retina: '@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx)',
    superRetina: '@media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 3dppx)',
    
    // Accessibility
    reducedMotion: '@media (prefers-reduced-motion: reduce)',
    highContrast: '@media (prefers-contrast: high)',
    darkMode: '@media (prefers-color-scheme: dark)',
    lightMode: '@media (prefers-color-scheme: light)',
    
    // Print
    print: '@media print',
    
    // Device orientation and aspect ratios
    squareScreen: '@media (aspect-ratio: 1/1)',
    wideScreen: '@media (min-aspect-ratio: 16/9)',
    ultraWideScreen: '@media (min-aspect-ratio: 21/9)',
    portraitPhone: '@media (max-width: 480px) and (orientation: portrait)',
    landscapePhone: '@media (max-height: 480px) and (orientation: landscape)',
    
    // Specific device targeting (careful with these)
    iphoneX: '@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
    ipadPro: '@media only screen and (min-device-width: 1024px) and (max-device-width: 1366px) and (-webkit-min-device-pixel-ratio: 2)',
  },

  // Comprehensive Typography Scaling for All Screen Sizes
  typography: {
    h1: {
      mobileXS: 'clamp(1.5rem, 8vw, 1.75rem)',
      mobileSmall: 'clamp(1.75rem, 7vw, 2rem)',
      mobile: 'clamp(2rem, 6vw, 2.25rem)',
      mobileLarge: 'clamp(2.25rem, 5.5vw, 2.5rem)',
      tabletSmall: 'clamp(2.5rem, 5vw, 2.75rem)',
      tablet: 'clamp(2.75rem, 4.5vw, 3rem)',
      tabletLarge: 'clamp(3rem, 4vw, 3.5rem)',
      desktop: 'clamp(3.5rem, 3.5vw, 4rem)',
      desktopMedium: 'clamp(4rem, 3vw, 4.5rem)',
      desktopLarge: 'clamp(4.5rem, 2.8vw, 5rem)',
      fullHD: 'clamp(5rem, 2.5vw, 6rem)',
      qhd2K: 'clamp(6rem, 2.2vw, 7rem)',
      ultrawide: 'clamp(7rem, 2vw, 8rem)',
      uhd4K: 'clamp(8rem, 1.8vw, 10rem)',
      uhd5K: 'clamp(10rem, 1.5vw, 12rem)',
      uhd6K: 'clamp(12rem, 1.2vw, 14rem)',
      uhd8K: 'clamp(14rem, 1vw, 16rem)',
    },
    h2: {
      mobileXS: 'clamp(1.25rem, 6vw, 1.5rem)',
      mobileSmall: 'clamp(1.5rem, 5.5vw, 1.75rem)',
      mobile: 'clamp(1.75rem, 5vw, 2rem)',
      mobileLarge: 'clamp(2rem, 4.5vw, 2.25rem)',
      tabletSmall: 'clamp(2.25rem, 4vw, 2.5rem)',
      tablet: 'clamp(2.5rem, 3.8vw, 2.75rem)',
      tabletLarge: 'clamp(2.75rem, 3.5vw, 3rem)',
      desktop: 'clamp(3rem, 3vw, 3.5rem)',
      desktopMedium: 'clamp(3.5rem, 2.7vw, 4rem)',
      desktopLarge: 'clamp(4rem, 2.5vw, 4.5rem)',
      fullHD: 'clamp(4.5rem, 2.2vw, 5rem)',
      qhd2K: 'clamp(5rem, 2vw, 6rem)',
      ultrawide: 'clamp(6rem, 1.8vw, 7rem)',
      uhd4K: 'clamp(7rem, 1.5vw, 8rem)',
      uhd5K: 'clamp(8rem, 1.3vw, 10rem)',
      uhd6K: 'clamp(10rem, 1.1vw, 12rem)',
      uhd8K: 'clamp(12rem, 0.9vw, 14rem)',
    },
    h3: {
      mobileXS: 'clamp(1.125rem, 5vw, 1.25rem)',
      mobileSmall: 'clamp(1.25rem, 4.5vw, 1.375rem)',
      mobile: 'clamp(1.375rem, 4vw, 1.5rem)',
      mobileLarge: 'clamp(1.5rem, 3.8vw, 1.75rem)',
      tabletSmall: 'clamp(1.75rem, 3.5vw, 2rem)',
      tablet: 'clamp(2rem, 3.2vw, 2.25rem)',
      tabletLarge: 'clamp(2.25rem, 3vw, 2.5rem)',
      desktop: 'clamp(2.5rem, 2.8vw, 3rem)',
      desktopMedium: 'clamp(3rem, 2.5vw, 3.5rem)',
      desktopLarge: 'clamp(3.5rem, 2.2vw, 4rem)',
      fullHD: 'clamp(4rem, 2vw, 4.5rem)',
      qhd2K: 'clamp(4.5rem, 1.8vw, 5rem)',
      ultrawide: 'clamp(5rem, 1.6vw, 6rem)',
      uhd4K: 'clamp(6rem, 1.4vw, 7rem)',
      uhd5K: 'clamp(7rem, 1.2vw, 8rem)',
      uhd6K: 'clamp(8rem, 1vw, 10rem)',
      uhd8K: 'clamp(10rem, 0.8vw, 12rem)',
    },
    body: {
      mobileXS: 'clamp(0.875rem, 3.5vw, 1rem)',
      mobileSmall: 'clamp(1rem, 3vw, 1.125rem)',
      mobile: 'clamp(1.125rem, 2.5vw, 1.25rem)',
      mobileLarge: 'clamp(1.25rem, 2.2vw, 1.375rem)',
      tabletSmall: 'clamp(1.375rem, 2vw, 1.5rem)',
      tablet: 'clamp(1.5rem, 1.8vw, 1.625rem)',
      tabletLarge: 'clamp(1.625rem, 1.6vw, 1.75rem)',
      desktop: 'clamp(1.75rem, 1.4vw, 1.875rem)',
      desktopMedium: 'clamp(1.875rem, 1.2vw, 2rem)',
      desktopLarge: 'clamp(2rem, 1.1vw, 2.25rem)',
      fullHD: 'clamp(2.25rem, 1vw, 2.5rem)',
      qhd2K: 'clamp(2.5rem, 0.9vw, 3rem)',
      ultrawide: 'clamp(3rem, 0.8vw, 3.5rem)',
      uhd4K: 'clamp(3.5rem, 0.7vw, 4rem)',
      uhd5K: 'clamp(4rem, 0.6vw, 5rem)',
      uhd6K: 'clamp(5rem, 0.5vw, 6rem)',
      uhd8K: 'clamp(6rem, 0.4vw, 7rem)',
    },
  },

  // Comprehensive Spacing System for All Screen Sizes
  spacing: {
    mobileXS: {
      xs: 'clamp(0.125rem, 1vw, 0.25rem)',
      sm: 'clamp(0.25rem, 1.5vw, 0.375rem)',
      md: 'clamp(0.5rem, 2vw, 0.75rem)',
      lg: 'clamp(0.75rem, 2.5vw, 1rem)',
      xl: 'clamp(1rem, 3vw, 1.25rem)',
    },
    mobileSmall: {
      xs: 'clamp(0.25rem, 1vw, 0.375rem)',
      sm: 'clamp(0.375rem, 1.5vw, 0.5rem)',
      md: 'clamp(0.75rem, 2vw, 1rem)',
      lg: 'clamp(1rem, 2.5vw, 1.25rem)',
      xl: 'clamp(1.25rem, 3vw, 1.5rem)',
    },
    mobile: {
      xs: 'clamp(0.375rem, 1vw, 0.5rem)',
      sm: 'clamp(0.5rem, 1.5vw, 0.75rem)',
      md: 'clamp(1rem, 2vw, 1.25rem)',
      lg: 'clamp(1.25rem, 2.5vw, 1.75rem)',
      xl: 'clamp(1.75rem, 3vw, 2rem)',
    },
    tablet: {
      xs: 'clamp(0.5rem, 0.8vw, 0.75rem)',
      sm: 'clamp(0.75rem, 1.2vw, 1rem)',
      md: 'clamp(1.25rem, 1.8vw, 1.75rem)',
      lg: 'clamp(1.75rem, 2.2vw, 2.5rem)',
      xl: 'clamp(2.5rem, 2.8vw, 3.5rem)',
    },
    desktop: {
      xs: 'clamp(0.75rem, 0.6vw, 1rem)',
      sm: 'clamp(1rem, 1vw, 1.5rem)',
      md: 'clamp(1.5rem, 1.5vw, 2.5rem)',
      lg: 'clamp(2.5rem, 2vw, 3.5rem)',
      xl: 'clamp(3.5rem, 2.5vw, 5rem)',
    },
    fullHD: {
      xs: 'clamp(1rem, 0.5vw, 1.25rem)',
      sm: 'clamp(1.5rem, 0.8vw, 2rem)',
      md: 'clamp(2.5rem, 1.2vw, 3rem)',
      lg: 'clamp(3.5rem, 1.6vw, 4.5rem)',
      xl: 'clamp(4.5rem, 2vw, 6rem)',
    },
    qhd2K: {
      xs: 'clamp(1.25rem, 0.4vw, 1.5rem)',
      sm: 'clamp(2rem, 0.7vw, 2.5rem)',
      md: 'clamp(3rem, 1vw, 3.5rem)',
      lg: 'clamp(4.5rem, 1.3vw, 5.5rem)',
      xl: 'clamp(5.5rem, 1.6vw, 7rem)',
    },
    ultrawide: {
      xs: 'clamp(1.5rem, 0.35vw, 1.75rem)',
      sm: 'clamp(2.5rem, 0.6vw, 3rem)',
      md: 'clamp(3.5rem, 0.9vw, 4rem)',
      lg: 'clamp(5.5rem, 1.2vw, 6.5rem)',
      xl: 'clamp(6.5rem, 1.4vw, 8rem)',
    },
    uhd4K: {
      xs: 'clamp(1.75rem, 0.3vw, 2rem)',
      sm: 'clamp(3rem, 0.5vw, 3.5rem)',
      md: 'clamp(4rem, 0.8vw, 4.5rem)',
      lg: 'clamp(6.5rem, 1vw, 7.5rem)',
      xl: 'clamp(7.5rem, 1.2vw, 9rem)',
    },
    uhd5K: {
      xs: 'clamp(2rem, 0.25vw, 2.5rem)',
      sm: 'clamp(3.5rem, 0.4vw, 4rem)',
      md: 'clamp(4.5rem, 0.7vw, 5.5rem)',
      lg: 'clamp(7.5rem, 0.9vw, 9rem)',
      xl: 'clamp(9rem, 1.1vw, 11rem)',
    },
    uhd8K: {
      xs: 'clamp(2.5rem, 0.2vw, 3rem)',
      sm: 'clamp(4rem, 0.3vw, 5rem)',
      md: 'clamp(5.5rem, 0.5vw, 7rem)',
      lg: 'clamp(9rem, 0.7vw, 11rem)',
      xl: 'clamp(11rem, 0.9vw, 14rem)',
    },
  },

  // Mobile-specific animations
  animations: {
    tapHighlight: css`
      -webkit-tap-highlight-color: transparent;
    `,
    touchRipple: css`
      position: relative;
      overflow: hidden;
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        opacity: 0;
        border-radius: 100%;
        transform: scale(1, 1) translate(-50%);
        transform-origin: 50% 50%;
      }
      &:active::after {
        opacity: 0.3;
        animation: ripple 0.5s ease-out;
      }
      @keyframes ripple {
        0% {
          transform: scale(0, 0);
          opacity: 0.5;
        }
        100% {
          transform: scale(100, 100);
          opacity: 0;
        }
      }
    `,
  },
}; 