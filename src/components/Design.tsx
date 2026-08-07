import { useState, useEffect } from 'react';
import { HoverButton } from './HoverButton';
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

const row1 = [poster1, poster2, poster3, poster4, poster5, poster6, poster7];
const row2 = [poster8, poster9, poster10, poster11, poster12, poster13];

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
    <section id="design" className="px-4 md:px-12 py-16 w-full max-w-[100rem] mx-auto space-y-16 overflow-hidden">
      <div className="text-orange-vivid font-mono text-xl font-bold tracking-wider text-center drop-shadow-sm mb-12">
        {/* ... Poster Designs ... */}
      </div>

      <div className="space-y-12 bg-blue-deep/30 dark:bg-blue-deep/50 backdrop-blur-md border border-blue-deep/20 dark:border-blue-deep rounded-2xl md:rounded-tr-[4rem] md:rounded-bl-[4rem] py-8 md:py-16 shadow-2xl relative flex flex-col overflow-hidden hover:border-accent dark:hover:border-accent transition-colors">

        {/* Row 1 - Scroll Left */}
        <div className={`flex w-max ${selectedPoster ? '' : 'animate-marquee'}`}>
          {/* We duplicate the array to allow for smooth 50% translation looping */}
          {[...row1, ...row1].map((src, idx) => (
            <div key={`r1-${idx}`} className="pr-4 md:pr-8 shrink-0">
              <img
                src={src}
                alt="Poster design"
                className="h-64 md:h-80 w-auto rounded-xl border border-gray-200 dark:border-secondary shadow-sm bg-white dark:bg-black/20 hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => setSelectedPoster(src)}
              />
            </div>
          ))}
        </div>

        {/* Row 2 - Scroll Right */}
        <div className={`flex w-max ${selectedPoster ? '' : 'animate-marquee-reverse'}`}>
          {[...row2, ...row2].map((src, idx) => (
            <div key={`r2-${idx}`} className="pr-4 md:pr-8 shrink-0">
              <img
                src={src}
                alt="Poster design"
                className="h-64 md:h-80 w-auto rounded-xl border border-gray-200 dark:border-secondary shadow-sm bg-white dark:bg-black/20 hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => setSelectedPoster(src)}
              />
            </div>
          ))}
        </div>

      </div>

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
