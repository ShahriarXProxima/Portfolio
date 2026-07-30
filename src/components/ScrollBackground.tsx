import { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 499;

export default function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const [imagesLoaded, setImagesLoaded] = useState(0);

  // Pad numbers with leading zeros (e.g., 0 -> '00000', 42 -> '00042')
  const getFramePath = (index: number) => {
    return `/frames/frame_${index.toString().padStart(5, '0')}.jpg`;
  };

  useEffect(() => {
    let loadedCount = 0;

    // Preload images sequentially or all at once? 
    // To prevent blocking, we can load them eagerly but non-blocking.
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        imagesRef.current[i] = img;
        loadedCount++;
        setImagesLoaded(loadedCount);
        
        // Draw the first frame as soon as it loads if canvas is empty
        if (i === 0 && canvasRef.current) {
          const ctx = canvasRef.current.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
          }
        }
      };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let currentFrameIndex = -1;

    // Handle Resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Re-draw current frame on resize
      if (currentFrameIndex >= 0 && currentFrameIndex < FRAME_COUNT) {
        const img = imagesRef.current[currentFrameIndex];
        if (img) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const updateImage = (index: number) => {
      if (index === currentFrameIndex) return; // Only draw if changed
      
      const img = imagesRef.current[index];
      if (img) {
        // Use requestAnimationFrame to ensure smooth drawing synced with display
        animationFrameId = requestAnimationFrame(() => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        });
        currentFrameIndex = index;
      }
    };

    const handleScroll = () => {
      // The animation should start mapping *after* the hero section.
      // Hero section takes up exactly 100vh (window.innerHeight).
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Calculate how far we've scrolled past the hero
      const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight - heroHeight;
      const scrolledPastHero = Math.max(0, scrollY - heroHeight);
      
      if (scrollY < heroHeight) {
        // If we are in the hero section, keep showing the first frame
        updateImage(0);
        return;
      }

      // Calculate fraction of scrollable space (0 to 1)
      let scrollFraction = scrollableDistance > 0 ? scrolledPastHero / scrollableDistance : 0;
      
      // Clamp between 0 and 1
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));

      // Calculate the current frame index
      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.floor(scrollFraction * FRAME_COUNT)
      );

      updateImage(frameIndex);
    };

    // Initial draw
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [imagesLoaded]); // Re-run when images finish loading to ensure they draw

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-black">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover blur-md scale-[1.02]" 
      />
    </div>
  );
}
