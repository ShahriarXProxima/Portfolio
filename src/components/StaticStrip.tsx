import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StaticStripProps {
  title: string;
  direction?: 'left' | 'right';
}

export default function StaticStrip({ title, direction = 'left' }: StaticStripProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const repeatCount = 10;

  useGSAP(() => {
    const xMovement = direction === 'left' ? -300 : 300;
    
    gsap.to(stripRef.current, {
      x: xMovement,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1, // Smooth scrubbing tied to scroll
      },
    });
  }, { scope: containerRef, dependencies: [direction] });

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-yellow-400/90 backdrop-blur-md py-2 sm:py-3 shadow-lg z-40 pointer-events-none">
      <div 
        ref={stripRef} 
        className="flex w-max"
        style={{ marginLeft: direction === 'right' ? '-300px' : '0' }}
      >
        {[...Array(repeatCount)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-6 px-6 text-black font-black text-xl md:text-2xl uppercase tracking-widest italic"
          >
            <span>///</span>
            <span>{title}</span>
            <span>///</span>
          </div>
        ))}
      </div>
    </div>
  );
}
