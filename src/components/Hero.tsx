import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';
import { HoverButton } from './HoverButton';
import branchImg from '../../resources/branch.jpeg';
import flowerImg from '../../resources/flower.jpeg';

export default function Hero() {
  const githubUrl = SOCIAL_LINKS.find((social) => social.name.toLowerCase() === 'github-repositories')?.url || 'https://github.com/ShahriarXProxima?tab=repositories';

  const containerRef = useRef<HTMLElement>(null);
  const circleRef = useRef<SVGCircleElement>(null);

  // Ref for mouse physics state to avoid React re-renders on animation frames
  const mousePos = useRef({ x: -500, y: -500, targetX: -500, targetY: -500, scale: 0, targetScale: 0 });

  useEffect(() => {
    let animationFrameId: number;
    let time = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if the device is touch-only to disable the effect
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const animate = () => {
      time += 0.05;
      const m = mousePos.current;

      // Interpolate towards target (smooth following)
      m.x += (m.targetX - m.x) * 0.15;
      m.y += (m.targetY - m.y) * 0.15;
      m.scale += (m.targetScale - m.scale) * 0.1;

      if (circleRef.current) {
        // Subtle breathing effect based on time
        const breath = prefersReducedMotion ? 0 : Math.sin(time) * 15;
        // Base radius 250px + breathing, scaled by hover state (0 to 1)
        const radius = Math.max(0, (300 + breath) * m.scale);

        circleRef.current.setAttribute('cx', m.x.toString());
        circleRef.current.setAttribute('cy', m.y.toString());
        circleRef.current.setAttribute('r', radius.toString());
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Mouse coordinates relative to the hero section
      mousePos.current.targetX = e.clientX - rect.left;
      mousePos.current.targetY = e.clientY - rect.top;
      mousePos.current.targetScale = 1;
    }
  };

  const handleMouseLeave = () => {
    mousePos.current.targetScale = 0;
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      // Instantly set starting position to avoid flying from 0,0
      if (mousePos.current.scale < 0.1) {
        mousePos.current.x = e.clientX - rect.left;
        mousePos.current.y = e.clientY - rect.top;
      }
      mousePos.current.targetX = e.clientX - rect.left;
      mousePos.current.targetY = e.clientY - rect.top;
      mousePos.current.targetScale = 1;
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative w-full min-h-screen flex flex-col items-center text-center px-4 sm:px-6 md:px-12 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-12 overflow-hidden"
    >
      {/* Interactive Botanical Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        {/* Base Branch Image */}
        <img
          src={branchImg}
          alt="Branch Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Revealed Flower Image using SVG Mask for perfection & performance */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <filter id="organic-filter" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
                <animate attributeName="baseFrequency" dur="12s" values="0.015;0.025;0.015" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" result="displaced">
                <animate attributeName="scale" dur="6s" values="30;70;30" repeatCount="indefinite" />
              </feDisplacementMap>
              <feGaussianBlur in="displaced" stdDeviation="15" result="blurred" />
            </filter>

            <mask id="organic-mask">
              <circle
                ref={circleRef}
                cx="-500"
                cy="-500"
                r="0"
                fill="white"
                filter="url(#organic-filter)"
              />
            </mask>
          </defs>

          <image
            href={flowerImg}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#organic-mask)"
          />
        </svg>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-between items-center max-w-5xl mx-auto w-full flex-1 pointer-events-none">

        {/* Top Section */}
        <div className="space-y-6 sm:space-y-8 mt-4 md:mt-12 animate-[fadeInDown_1s_ease-out] pointer-events-auto">
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[7.5rem] font-serif leading-[1.1] text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-tight break-words md:whitespace-nowrap">
            Full-stack <span className="font-sans font-medium text-accent italic">Developer</span>
          </h1>

          <p className="text-base sm:text-lg md:text-2xl text-zinc-100 font-serif italic max-w-2xl mx-auto leading-relaxed drop-shadow-xl font-medium px-2 sm:px-4">
            Goal is to write maintainable, clean and understandable code so the development process is enjoyable.
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center space-y-6 sm:space-y-10 mt-auto animate-[fadeInUp_1s_ease-out] w-full pb-4 sm:pb-8 pt-8 sm:pt-16 pointer-events-auto">
          <HoverButton as="a"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white px-6 sm:px-10 py-3 sm:py-5 rounded-full font-bold flex items-center gap-3 sm:gap-5 hover:bg-accent/90 hover:scale-105 transition-all duration-300 cursor-pointer mx-auto inline-flex shadow-[0_0_20px_rgba(255,78,70,0.4)] hover:shadow-[0_0_40px_rgba(255,78,70,0.6)] text-sm sm:text-lg"
          >
            Explore Projects
            <div className="bg-white text-accent p-2.5 rounded-full z-10 pointer-events-none">
              <ArrowRight size={20} />
            </div>
          </HoverButton>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-5 sm:gap-x-10 gap-y-4 sm:gap-y-6 max-w-3xl pt-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 sm:gap-3 text-zinc-100 bg-black/40 backdrop-blur-md px-4 py-2 sm:px-6 sm:py-2.5 rounded-full border border-white/10 hover:bg-black/60 hover:text-white hover:border-white/20 transition-all duration-300 group shadow-lg hover:-translate-y-1"
              >
                <social.icon size={18} className="group-hover:scale-110 group-hover:text-accent transition-all duration-300 shrink-0 sm:[width:20px] sm:[height:20px]" />
                <span className="text-xs sm:text-sm font-bold tracking-wider uppercase">{social.name}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
