import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleActivity = () => {
      // Only show if user has scrolled down past the top section
      if (window.scrollY > 300) {
        setIsVisible(true);
        
        // Clear existing timeout
        clearTimeout(timeoutId);
        
        // Set new timeout to hide after 2 seconds of inactivity
        timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      } else {
        // Force hide if we are at the top
        setIsVisible(false);
      }
    };

    // Add event listeners for both mouse movement and scrolling
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity);

    // Initial check
    handleActivity();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-1/2 right-8 -translate-y-1/2 z-50 p-4 rounded-full transition-all duration-500 shadow-xl backdrop-blur-md border 
        bg-black/10 hover:bg-black/20 text-black border-black/10
        dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/10
        ${(isVisible || isHovered) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <ArrowUp size={28} />
    </button>
  );
}
