import { useState, useEffect } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleActivity = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.offsetHeight;
      
      setIsAtTop(scrollY < 300);
      setIsAtBottom(windowHeight + scrollY >= documentHeight - 50);

      // Show the controls if there's anywhere to scroll
      if (scrollY >= 300 || windowHeight + scrollY < documentHeight - 50) {
        setIsVisible(true);
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          setIsVisible(false);
        }, 2000);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity);
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

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div 
      className={`fixed top-1/2 right-4 md:right-8 -translate-y-1/2 z-50 flex flex-col items-center justify-center transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${(isVisible || isHovered) ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8 pointer-events-none'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={scrollToTop}
        className={`welcome-btn--float rounded-full shadow-xl backdrop-blur-md bg-black/10 hover:bg-black/20 text-black border border-black/10 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/10 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
          !isAtTop ? 'opacity-100 scale-100 hover:scale-110 p-3 md:p-4 max-h-[100px] mb-2' : 'opacity-0 scale-50 hover:scale-50 p-0 max-h-0 mb-0 !border-transparent pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={28} className="shrink-0" />
      </button>

      <button
        onClick={scrollToBottom}
        className={`welcome-btn--float rounded-full shadow-xl backdrop-blur-md bg-black/10 hover:bg-black/20 text-black border border-black/10 dark:bg-white/10 dark:hover:bg-white/20 dark:text-white dark:border-white/10 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
          !isAtBottom ? 'opacity-100 scale-100 hover:scale-110 p-3 md:p-4 max-h-[100px] mt-2' : 'opacity-0 scale-50 hover:scale-50 p-0 max-h-0 mt-0 !border-transparent pointer-events-none'
        }`}
        aria-label="Scroll to bottom"
      >
        <ArrowDown size={28} className="shrink-0" />
      </button>
    </div>
  );
}
