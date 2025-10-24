import { useState, useEffect } from 'react';

interface MobileDetectReturn {
  isMobile: boolean;
  isTablet: boolean;
  isPortrait: boolean;
  isTouchDevice: boolean;
  isStandalone: boolean;
}

export const useMobileDetect = (): MobileDetectReturn => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      // Check if device is mobile
      setIsMobile(window.innerWidth <= 768);
      // Check if device is tablet
      setIsTablet(window.innerWidth <= 1024 && window.innerWidth > 768);
      // Check orientation
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    // Check if device supports touch
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // Check if running as PWA
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    // Initial check
    checkDevice();

    // Add event listeners
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isPortrait,
    isTouchDevice,
    isStandalone
  };
}; 