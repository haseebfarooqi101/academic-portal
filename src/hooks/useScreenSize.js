import { useState, useEffect } from 'react';

export function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    isMobile: false,
    isTablet: false,
    isDesktop: true
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper function to get field width based on screen size
  const getFieldWidth = () => {
    if (screenSize.isMobile) {
      // For very narrow screens (like 300px), use more aggressive padding
      if (screenSize.width < 400) {
        return `calc(100vw - 32px)`; // 16px padding on each side
      }
      // For regular mobile screens
      return `calc(100vw - 48px)`; // 24px padding on each side
    }
    return '416px'; // Desktop/tablet keeps original width
  };

  const getMaxFieldWidth = () => {
    if (screenSize.isMobile) {
      if (screenSize.width < 400) {
        return `${screenSize.width - 32}px`; // Ensure it never exceeds screen
      }
      return '380px';
    }
    return '416px';
  };

  return { ...screenSize, getFieldWidth, getMaxFieldWidth };
}