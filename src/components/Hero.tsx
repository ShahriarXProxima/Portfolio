import React, { useState, useEffect } from 'react';
import { SOCIAL_LINKS } from '../data';
import branchImg from '../../resources/assets/branch.jpeg';

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

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

  const navItems = [
    { name: 'About me', id: 'about' },
    { name: 'Work', id: 'work' },
    { name: 'Design', id: 'design' },
    { name: 'Articles', id: 'articles' },
    { name: 'Contact me', id: 'contact' },
  ];

  const handleScroll = (id: string) => {
    setIsMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `#${id}`;
    }
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
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-10 md:p-14 text-white pointer-events-none">
          
          {/* Top Row: Logo & Menu */}
          <div className="flex justify-between items-start pointer-events-auto">
            {/* Wavy Logo similar to reference */}
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" stroke="white" strokeWidth="2.5" strokeLinejoin="round">
              <polyline points="0,6 4,2 8,6 12,2 16,6 20,2 24,6 28,2 32,6" />
              <polyline points="0,14 4,10 8,14 12,10 16,14 20,10 24,14 28,10 32,14" />
            </svg>
          </div>

          {/* Center-Left: Bracketed Text */}
          <div className="absolute top-1/2 left-6 sm:left-10 md:left-14 -translate-y-1/2 pointer-events-auto hidden md:block">
            <a href="#projects" className="relative text-[9px] font-bold tracking-[0.2em] px-4 py-2.5 flex items-center justify-center uppercase hover:bg-white/10 transition-colors cursor-pointer group">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/80 group-hover:border-white transition-colors"></div>
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/80 group-hover:border-white transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/80 group-hover:border-white transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/80 group-hover:border-white transition-colors"></div>
              View Project
            </a>
          </div>

          {/* Bottom Row */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-0 relative pointer-events-auto w-full">
            {/* Giant Text */}
            <h1 className="text-[25vw] md:text-[14vw] leading-[0.75] font-semibold tracking-tighter drop-shadow-md -ml-1 md:-ml-3 text-white">
              Shahriar
            </h1>

            {/* Right details */}
            <div className="flex flex-col items-end gap-3 text-right shrink-0">
              <div key={`index-${currentRoleIndex}`} className="flex items-center gap-2 text-[9px] md:text-[10px] font-medium tracking-[0.1em] opacity-80 mb-1 animate-fade-in-scale">
                <span>0{currentRoleIndex + 1}</span>
                <span className="w-6 h-[1px] bg-white"></span>
                <span>0{roles.length}</span>
              </div>
              <div key={`role-${currentRoleIndex}`} className="text-[10px] md:text-xs font-semibold tracking-[0.15em] uppercase mb-1 animate-slide-in-bottom">
                {roles[currentRoleIndex]}
              </div>
              
              {/* Pagination/Action Buttons */}
              <div className="flex gap-2 mt-1">
                <button onClick={handlePrevRole} className="bg-white hover:bg-gray-100 text-black w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold transition-colors cursor-pointer text-sm">
                  &lt;
                </button>
                <button onClick={handleNextRole} className="bg-white hover:bg-gray-100 text-black w-8 h-8 md:w-10 md:h-10 flex items-center justify-center font-bold transition-colors cursor-pointer text-sm">
                  &gt;
                </button>
              </div>
            </div>
          </div>

        </div>

      {/* Fullscreen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center pointer-events-auto transition-opacity duration-500">
          <button 
            className="absolute top-8 right-8 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-white hover:text-gray-300 transition-colors p-4 cursor-pointer"
            onClick={() => setIsMenuOpen(false)}
          >
            Close
          </button>
          
          <div className="flex flex-col gap-6 md:gap-10 text-center">
            {navItems.map((item, i) => (
              <a 
                key={item.id} 
                onClick={() => handleScroll(item.id)}
                className="text-white text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight hover:text-gray-400 hover:scale-105 transition-all cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
