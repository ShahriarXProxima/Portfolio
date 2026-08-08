import { useState, useEffect } from 'react';
import { HoverButton } from './HoverButton';
import CurvedCarousel from './CurvedCarousel';
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
    <section id="design" className="w-full overflow-hidden relative min-h-screen flex flex-col items-center justify-center py-16">
      <div className="px-4 md:px-12 w-full flex justify-center mb-12 md:mb-16">
        <h2 className="text-5xl md:text-7xl font-jetbrains font-bold text-black dark:text-white drop-shadow-md tracking-tight text-center">Poster Design</h2>
      </div>

      {/* Curved Carousel — Full Width */}
      <CurvedCarousel
        items={
          ALL_POSTERS.map((src, idx) => (
            <div
              key={idx}
              onClick={() => {
                setAnimDir('scale');
                setSelectedPoster(src);
              }}
              style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              }}
            >
              <img
                src={src}
                alt={`Poster design ${idx + 1}`}
                style={{
                  width: 300,
                  height: 420,
                  objectFit: 'cover',
                  display: 'block',
                }}
                draggable={false}
              />
            </div>
          ))
        }
        autoplay
        autoplayMs={2000}
        radius={1200}
        angleStep={14}
        sizeDecrease={0.06}
        arrowSize={48}
        arrowInset={32}
        arrowGap={16}
        arrowBg="rgba(255,255,255,0.9)"
        arrowBorder="rgba(200,200,200,0.5)"
        arrowText="#333"
        bottomFade={false}
        style={{ height: 620 }}
      />

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
