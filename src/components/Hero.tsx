import { useState, useEffect, useRef } from 'react';
import branchImg from '../../resources/assets/hand.jpg';
import gsap from 'gsap';
import { useLenis } from 'lenis/react';

export default function Hero() {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const lenis = useLenis();

  const magneticWrapRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLDivElement>(null);
  const floatBtnRef = useRef<HTMLAnchorElement>(null);
  const isInRange = useRef(false);

  useEffect(() => {
    const wrap = magneticWrapRef.current;
    const btn = magneticBtnRef.current;
    const floatBtn = floatBtnRef.current;
    if (!wrap || !btn || !floatBtn) return;

    // Chaotic floating – a looping timeline that drifts the button
    // along an irregular path so it never feels mechanical.
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl
      .to(floatBtn, { y: -7,  x: 4,   rotation: 1.5,  duration: 1.8, ease: "sine.inOut" })
      .to(floatBtn, { y: 3,   x: -5,  rotation: -1,   duration: 2.2, ease: "power1.inOut" })
      .to(floatBtn, { y: -10, x: -3,  rotation: 0.8,  duration: 1.5, ease: "sine.inOut" })
      .to(floatBtn, { y: 5,   x: 6,   rotation: -1.8, duration: 2.5, ease: "power1.inOut" })
      .to(floatBtn, { y: -4,  x: -2,  rotation: 0.5,  duration: 1.9, ease: "sine.inOut" })
      .to(floatBtn, { y: 8,   x: 3,   rotation: -0.6, duration: 2.1, ease: "power1.inOut" })
      .to(floatBtn, { y: -6,  x: -4,  rotation: 1.2,  duration: 1.7, ease: "sine.inOut" })
      .to(floatBtn, { y: 0,   x: 0,   rotation: 0,    duration: 2.0, ease: "sine.inOut" });

    const xTo = gsap.quickTo(btn, "x", { duration: 0.8, ease: "power3.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.8, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Use the wrapper's rect for stable center calculation
      const rect = wrap.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 200) {
        if (!isInRange.current) {
          isInRange.current = true;
        }
        xTo(dx * 0.5);
        yTo(dy * 0.5);
      } else if (isInRange.current) {
        isInRange.current = false;
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      floatTl.kill();
    };
  }, []);

  const roles = [
    "Software Engineer",
    "Designer",
    "Competitive Programmer",
    "Researcher"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev === roles.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [roles.length]);

  const handlePrevRole = () => {
    setCurrentRoleIndex((prev) => (prev === 0 ? roles.length - 1 : prev - 1));
  };

  const handleNextRole = () => {
    setCurrentRoleIndex((prev) => (prev === roles.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Image */}
      <img 
        src={branchImg} 
        alt="Hero Background" 
        className="absolute inset-0 w-full h-full object-cover scale-105" 
      />
      
      {/* Subtle Dark Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Content Overlays */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 text-black pointer-events-none">
          
          {/* Top Row: Logo */}
          <div className="flex justify-between items-start pointer-events-auto">
            {/* Wavy Logo similar to reference */}
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" stroke="black" strokeWidth="2.5" strokeLinejoin="round">
              <polyline points="0,6 4,2 8,6 12,2 16,6 20,2 24,6 28,2 32,6" />
              <polyline points="0,14 4,10 8,14 12,10 16,14 20,10 24,14 28,10 32,14" />
            </svg>
          </div>

          {/* Center-Left: Bracketed Text */}
          <div ref={magneticWrapRef} className="absolute top-1/2 left-6 sm:left-10 md:left-14 -translate-y-1/2 pointer-events-auto hidden md:block">
            <div ref={magneticBtnRef}>
              <a
                ref={floatBtnRef}
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById('projects');
                  if (lenis && el) {
                    lenis.scrollTo('#projects', { offset: -20 });
                    if (window.location.hash !== '#projects') {
                      window.history.pushState(null, '', '#projects');
                    }
                  } else if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                    if (window.location.hash !== '#projects') {
                      window.history.pushState(null, '', '#projects');
                    }
                  } else {
                    window.location.hash = '#projects';
                  }
                }}
                className="relative text-[11px] font-bold tracking-[0.2em] px-6 py-3.5 flex items-center justify-center uppercase bg-black/5 backdrop-blur-md hover:bg-black/10 transition-colors cursor-pointer group text-black"
              >
                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-black/80 group-hover:border-black transition-colors"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-black/80 group-hover:border-black transition-colors"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-black/80 group-hover:border-black transition-colors"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-black/80 group-hover:border-black transition-colors"></div>
                View Project
              </a>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-0 relative pointer-events-auto w-full">
            {/* Giant Text */}
            <h1 className="text-[25vw] md:text-[14vw] leading-[0.75] font-semibold tracking-tighter drop-shadow-md -ml-1 md:-ml-3 text-[#4E6813] ">
              shahríar.
            </h1>

            {/* Right details */}
            <div className="flex flex-col items-end gap-3 text-right shrink-0">
              <div key={`index-${currentRoleIndex}`} className="flex items-center gap-2 text-[9px] md:text-[10px] font-medium tracking-[0.1em] opacity-80 mb-1 animate-fade-in-scale">
                <span>0{currentRoleIndex + 1}</span>
                <span className="w-6 h-[1px] bg-black"></span>
                <span>0{roles.length}</span>
              </div>
              <div key={`role-${currentRoleIndex}`} className="text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase mb-1 animate-slide-in-bottom">
                {roles[currentRoleIndex]}
              </div>
              
              {/* Pagination/Action Buttons */}
              <div className="flex gap-2 mt-1">
                <button onClick={handlePrevRole} className="bg-black hover:bg-gray-800 text-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold transition-colors cursor-pointer text-sm">
                  &lt;
                </button>
                <button onClick={handleNextRole} className="bg-black hover:bg-gray-800 text-white w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold transition-colors cursor-pointer text-sm">
                  &gt;
                </button>
              </div>
            </div>
          </div>

        </div>
    </section>
  );
}
