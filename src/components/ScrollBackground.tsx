import { useEffect, useRef } from 'react';

const FRAME_COUNT = 499;

export default function ScrollBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(FRAME_COUNT).fill(null));
  const currentFrameRef = useRef<number>(0);

  const getFramePath = (index: number) => {
    return `/frames/frame_${index.toString().padStart(5, '0')}.jpg`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const drawFrame = (index: number) => {
      const img = imagesRef.current[index];
      if (img) {
        animationFrameId = requestAnimationFrame(() => {
          if (canvas.width > 0 && canvas.height > 0) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }
        });
      }
    };

    // Preload images sequentially or all at once? 
    // To prevent blocking, we eagerly load them.
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        imagesRef.current[i] = img;
        
        // Draw immediately if this is the currently required frame
        if (i === currentFrameRef.current) {
          drawFrame(i);
        }
      };
    }

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrame(currentFrameRef.current);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      const scrollableDistance = document.documentElement.scrollHeight - window.innerHeight - heroHeight;
      const scrolledPastHero = Math.max(0, scrollY - heroHeight);
      
      if (scrollY < heroHeight) {
        if (currentFrameRef.current !== 0) {
          currentFrameRef.current = 0;
          drawFrame(0);
        }
        return;
      }

      let scrollFraction = scrollableDistance > 0 ? scrolledPastHero / scrollableDistance : 0;
      scrollFraction = Math.max(0, Math.min(1, scrollFraction));
      const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(scrollFraction * FRAME_COUNT));

      if (currentFrameRef.current !== frameIndex) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none w-full h-full bg-black">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full object-cover blur-md scale-[1.02]" 
      />
    </div>
  );
}
