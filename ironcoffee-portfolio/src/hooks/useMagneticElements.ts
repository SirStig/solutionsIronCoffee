import { useEffect } from 'react';

interface MagneticConfig {
  padding?: number;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  selector?: string;
}

const useMagneticElements = ({
  padding = 100,
  magnetStrength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.5s ease-in-out',
  selector = 'button, a, [role="button"], .magnetic'
}: MagneticConfig = {}) => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    const elementStates = new Map();

    const handleMouseMove = (e: MouseEvent) => {
      elements.forEach((element) => {
        const el = element as HTMLElement;
        const { left, top, width, height } = el.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distX = Math.abs(centerX - e.clientX);
        const distY = Math.abs(centerY - e.clientY);

        if (distX < width / 2 + padding && distY < height / 2 + padding) {
          // Element is in magnetic range
          const offsetX = (e.clientX - centerX) / magnetStrength;
          const offsetY = (e.clientY - centerY) / magnetStrength;
          
          if (!elementStates.get(el)?.isActive) {
            elementStates.set(el, { isActive: true });
            el.style.transition = activeTransition;
          }
          
          el.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
          el.style.willChange = 'transform';
        } else {
          // Element is outside magnetic range
          if (elementStates.get(el)?.isActive) {
            elementStates.set(el, { isActive: false });
            el.style.transition = inactiveTransition;
          }
          
          el.style.transform = 'translate3d(0px, 0px, 0)';
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      // Reset all elements
      elements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.transform = '';
        el.style.transition = '';
        el.style.willChange = '';
      });
    };
  }, [padding, magnetStrength, activeTransition, inactiveTransition, selector]);
};

export default useMagneticElements;
