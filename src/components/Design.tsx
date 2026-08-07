import { useState, useEffect } from 'react';
import { HoverButton } from './HoverButton';
import CurvedCarousel from './CurvedCarousel';
import poster1 from '../../resources/poster1.jpg';
import poster2 from '../../resources/poster2.jpg';
import poster3 from '../../resources/poster3.jpg';
import poster4 from '../../resources/poster4.jpg';
import poster5 from '../../resources/poster5.jpg';
import poster6 from '../../resources/poster6.jpg';
import poster7 from '../../resources/poster7.jpg';
import poster8 from '../../resources/poster8.jpg';
import poster9 from '../../resources/poster9.jpg';
import poster10 from '../../resources/poster10.png';
import poster11 from '../../resources/poster11.jpg';
import poster12 from '../../resources/poster12.jpg';
import poster13 from '../../resources/poster13.jpg';

const ALL_POSTERS = [
  poster1, poster2, poster3, poster4, poster5, poster6, poster7,
  poster8, poster9, poster10, poster11, poster12, poster13,
];

export default function Design() {
  const [selectedPoster, setSelectedPoster] = useState<string | null>(null);

  useEffect(() => {
    const header = document.querySelector('header');
    if (selectedPoster) {
      document.body.style.overflow = 'hidden';
      if (header) header.style.display = 'none';
    } else {
      document.body.style.overflow = 'unset';
      if (header) header.style.display = '';
    }

    return () => {
      document.body.style.overflow = 'unset';
      if (header) header.style.display = '';
    };
  }, [selectedPoster]);

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
              onClick={() => setSelectedPoster(src)}
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
        autoplayMs={3000}
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
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 bg-black/80 dark:bg-black/90 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedPoster(null)}
        >
          <HoverButton
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-all duration-300 z-50 backdrop-blur-md"
            onClick={() => setSelectedPoster(null)}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </HoverButton>
          <img
            src={selectedPoster}
            alt="Enlarged poster design"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
