import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { HoverButton } from './HoverButton';
// Dynamically import all posters from the resources/posters directory
const posterModules = import.meta.glob('../../resources/posters/*.{png,jpg,jpeg,webp}', { eager: true, query: '?url', import: 'default' });

// Sort them by the number in the filename to maintain poster1, poster2, etc. order
const ALL_POSTERS = Object.keys(posterModules).sort((a, b) => {
  const numA = parseInt(a.match(/poster(\d+)/)?.[1] || '0', 10);
  const numB = parseInt(b.match(/poster(\d+)/)?.[1] || '0', 10);
  return numA - numB;
}).map(key => posterModules[key] as string);

export default function Design() {
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);
  const [animDir, setAnimDir] = useState<'up' | 'down' | 'scale'>('scale');

  const baseColors = ["#03624C", "#DCEEFF", "#7DA7D9", "#FFFFFF", "#FF4D00"];
  const colors = [...baseColors, baseColors[0]];
  const [colorIndex, setColorIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setColorIndex((prev) => prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (colorIndex === baseColors.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setColorIndex(0);
      }, 750);
      return () => clearTimeout(timeout);
    }
  }, [colorIndex, baseColors.length]);

  useEffect(() => {
    const header = document.querySelector('header');
    if (selectedPoster) {
      document.body.style.overflow = 'hidden';
      if (header) header.style.display = 'none';
    } else {
      document.body.style.overflow = 'unset';
      if (header) header.style.display = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPoster) return;
      if (e.key === 'Escape') setSelectedPoster(null);
      if (e.key === 'ArrowUp') navigatePoster('up');
      if (e.key === 'ArrowDown') navigatePoster('down');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      if (header) header.style.display = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPoster]);

  const navigatePoster = (direction: 'up' | 'down', e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!selectedPoster) return;
    const currentIndex = ALL_POSTERS.indexOf(selectedPoster);
    if (currentIndex === -1) return;
    
    setAnimDir(direction);
    let nextIndex;
    if (direction === 'up') {
      // UP arrow -> Previous poster (slides down from top)
      nextIndex = currentIndex === 0 ? ALL_POSTERS.length - 1 : currentIndex - 1;
    } else {
      // DOWN arrow -> Next poster (slides up from bottom)
      nextIndex = currentIndex === ALL_POSTERS.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedPoster(ALL_POSTERS[nextIndex]);
  };

  return (
    <section id="design" className="w-full bg-[#2EC4B6] overflow-hidden relative flex flex-col items-center justify-center pt-16 pb-0">
      
      <div className="px-4 md:px-12 w-full flex justify-end mb-12 md:mb-16 relative z-10 pb-4 md:pb-6">
        <h2 className="text-[12vw] md:text-[9vw] font-bold leading-[0.9] tracking-tighter text-right lowercase break-words w-full font-sans text-black dark:text-white drop-shadow-md pb-4">
          <span>Poster </span>
          <span className="text-[#FF4D00] relative inline-block glitch-effect" data-text="design">design</span>
        </h2>
      </div>

      {/* 3-Column Moving Grid matching reference design */}
      <div className="w-full h-[75vh] md:h-[90vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 relative z-10 overflow-hidden bg-black/5 dark:bg-transparent">
        {[0, 1, 2].map((colIndex) => {
          const colPosters = ALL_POSTERS.filter((_, i) => i % 3 === colIndex);
          const direction = colIndex % 2 === 0 ? 'up' : 'down';
          
          return (
            <div 
              key={colIndex} 
              className={`relative w-full h-full overflow-hidden flex-col ${colIndex === 1 ? 'hidden md:flex' : colIndex === 2 ? 'hidden lg:flex' : 'flex'}`}
            >
              <motion.div
                className="flex flex-col w-full"
                animate={{ y: direction === 'up' ? ['0%', '-50%'] : ['-50%', '0%'] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
              >
                {[...colPosters, ...colPosters].map((src, idx) => (
                  <div
                    key={`${colIndex}-${idx}`}
                    className="relative group cursor-pointer overflow-hidden aspect-video md:aspect-[16/10] lg:aspect-video w-full flex-shrink-0"
                    onClick={() => {
                      setAnimDir('scale');
                      setSelectedPoster(src);
                    }}
                  >
                    <img
                      src={src}
                      alt={`Poster design ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      draggable={false}
                    />
                    {/* Hover Overlay matching the play button reference */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 w-16 h-16 rounded-full bg-black/80 flex items-center justify-center backdrop-blur-sm text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Optional subtle corner text to mimic the reference image text '2025-26 | 1:25 MIN. OVERVIEW' */}
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white/80 text-xs font-medium tracking-wider">
                      {new Date().getFullYear()}-{String(new Date().getFullYear() + 1).slice(-2)}
                    </div>
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white/80 text-xs font-medium tracking-wider uppercase">
                      View Poster
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Fullscreen Poster Modal */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center py-12 px-16 sm:px-24 bg-black/80 dark:bg-black/90 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedPoster(null)}
        >
          <HoverButton
            className="fixed top-4 right-4 md:top-8 md:right-8 p-2 md:p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all duration-300 z-[110] backdrop-blur-md shadow-lg flex items-center justify-center"
            onClick={() => setSelectedPoster(null)}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </HoverButton>

          <div className="relative inline-flex items-center justify-center max-h-full max-w-full">
            <div className="absolute -right-16 md:-right-20 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
              <HoverButton
                className="p-2 md:p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg flex items-center justify-center"
                onClick={(e) => navigatePoster('up', e)}
                aria-label="Previous Poster"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </HoverButton>
              <HoverButton
                className="p-2 md:p-3 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg flex items-center justify-center"
                onClick={(e) => navigatePoster('down', e)}
                aria-label="Next Poster"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </HoverButton>
            </div>

            <img
              key={selectedPoster}
              src={selectedPoster}
              alt="Enlarged poster design"
              className={`max-w-full max-h-[85vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10 ${
                animDir === 'up' ? 'animate-slide-in-top' : animDir === 'down' ? 'animate-slide-in-bottom' : 'animate-fade-in-scale'
              }`}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
