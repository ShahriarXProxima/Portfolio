import { useState, useEffect } from 'react';
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
    <div 
      className={`fixed top-1/2 right-8 -translate-y-1/2 z-50 transition-all duration-500 ${(isVisible || isHovered) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
      style={{ mixBlendMode: 'difference' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={scrollToTop}
        className="welcome-btn--float p-4 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110"
        style={{
          background: 'white',
          border: 'none',
          color: 'black',
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp size={28} />
      </button>
    </div>
  );
}
