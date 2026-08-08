import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollOverlay() {
  const topOverlayRef = useRef<HTMLDivElement>(null);
  const bottomOverlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // We use a global ScrollTrigger to detect scroll velocity and direction
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        // Cap the velocity for the opacity calculation
        const normalizedVelocity = Math.min(Math.abs(velocity) / 3000, 0.6);

        if (self.direction === 1) {
          // Scrolling down
          gsap.to(bottomOverlayRef.current, {
            opacity: normalizedVelocity,
            duration: 0.2,
            overwrite: 'auto'
          });
          gsap.to(topOverlayRef.current, {
            opacity: 0,
            duration: 0.2,
            overwrite: 'auto'
          });
        } else if (self.direction === -1) {
          // Scrolling up
          gsap.to(topOverlayRef.current, {
            opacity: normalizedVelocity,
            duration: 0.2,
            overwrite: 'auto'
          });
          gsap.to(bottomOverlayRef.current, {
            opacity: 0,
            duration: 0.2,
            overwrite: 'auto'
          });
        }
      },
    });

    // Fade out when scrolling stops
    let scrollTimeout: NodeJS.Timeout;
    const handleScrollStop = () => {
      gsap.to([topOverlayRef.current, bottomOverlayRef.current], {
        opacity: 0,
        duration: 0.5,
      });
    };

    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollStop, 150);
    });

    return () => {
      window.removeEventListener('scroll', handleScrollStop);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      <div
        ref={topOverlayRef}
        className="fixed top-0 left-0 w-full h-48 bg-gradient-to-b from-accent/30 to-transparent pointer-events-none z-50 opacity-0"
      />
      <div
        ref={bottomOverlayRef}
        className="fixed bottom-0 left-0 w-full h-48 bg-gradient-to-t from-accent/30 to-transparent pointer-events-none z-50 opacity-0"
      />
    </>
  );
}
