import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CautionStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const repeatCount = 10;

  useGSAP(() => {
    gsap.to(stripRef.current, {
      x: -300,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1, // Smooth scrubbing tied to scroll
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-cyan-400/90 backdrop-blur-md py-2 sm:py-3 shadow-lg z-40 pointer-events-none">
      <div ref={stripRef} className="flex w-max">
        {[...Array(repeatCount)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-6 text-black font-black text-xl md:text-2xl uppercase tracking-widest italic"
          >
            <span>///</span>
            <span>OPEN TO WORK!</span>
            <span>///</span>
          </div>
        ))}
      </div>
    </div>
  );
}

