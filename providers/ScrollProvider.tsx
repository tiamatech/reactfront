import React, { useEffect } from 'react';

interface ScrollProviderProps {
  children: React.ReactNode;
}

const ScrollProvider: React.FC<ScrollProviderProps> = ({ children }) => {
  useEffect(() => {
    const preventDefaultScroll = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
    };

    // Add passive touch event listeners
    document.addEventListener('touchmove', preventDefaultScroll, { passive: true });
    document.addEventListener('touchstart', preventDefaultScroll, { passive: true });

    return () => {
      document.removeEventListener('touchmove', preventDefaultScroll);
      document.removeEventListener('touchstart', preventDefaultScroll);
    };
  }, []);

  return <>{children}</>;
};

export default ScrollProvider;
