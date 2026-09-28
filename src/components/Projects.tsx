import React from 'react';
import bloodLinkImg from '../../resources/assets/bloodLink.jpg';
import titanBoostImg from '../../resources/assets/titanBoost.jpg';
import pacmanImg from '../../resources/assets/pacman.png';

const WavyLogo = () => (
  <svg width="24" height="12" viewBox="0 0 32 16" fill="none" stroke="black" strokeWidth="2.5" strokeLinejoin="round" className="opacity-80">
    <polyline points="0,6 4,2 8,6 12,2 16,6 20,2 24,6 28,2 32,6" />
    <polyline points="0,14 4,10 8,14 12,10 16,14 20,10 24,14 28,10 32,14" />
  </svg>
);

export default function Projects() {
  return (
    <section id="projects" className="px-3 sm:px-6 md:px-8 py-10 md:py-16 w-full min-h-screen flex flex-col justify-center items-center bg-[#f8c828] relative overflow-hidden">
      {/* Optional vignette to match the dark fuzzy edges in the reference image */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)] pointer-events-none z-0"></div>
      
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 relative z-10">

        {/* Card 1: Intro (Mimics Top-Right of reference) */}
        <div className="bg-white rounded-[2rem] p-8 md:p-14 shadow-2xl flex flex-col justify-between aspect-[4/3] md:aspect-auto lg:col-span-2 relative group overflow-hidden transition-transform duration-500 hover:-translate-y-2">
          <div className="flex justify-between items-start w-full">
            <WavyLogo />
          </div>
          
          <div className="max-w-md mt-12 md:mt-0">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black leading-tight mb-6">
              Shahriar —<br/>Selected Work and Case Studies.
            </h2>
            <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed max-w-sm">
              Collaboration is at the heart of everything we do. Crafting thoughtful designs that seamlessly blend functionality, performance, and scalability. Each project tells a unique story reflecting technical excellence.
            </p>
          </div>

          <div className="flex items-center gap-12 mt-12 border-t border-black/10 pt-8">
            <div>
              <div className="text-4xl md:text-6xl font-bold tracking-tighter text-black">07</div>
              <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mt-2">Months Exp</div>
            </div>
            <div>
              <div className="text-4xl md:text-6xl font-bold tracking-tighter text-black">03</div>
              <div className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-500 mt-2">Projects</div>
            </div>
          </div>
        </div>

        {/* Card 2: BloodLink (Mimics Top-Left of reference with vertical image and giant text) */}
        <div className="bg-white rounded-[2rem] p-8 md:p-14 shadow-2xl flex flex-col justify-between aspect-[4/3] md:aspect-auto lg:col-span-1 relative overflow-hidden group transition-transform duration-500 hover:-translate-y-2">
          <div className="flex justify-between items-start w-full relative z-20">
            <WavyLogo />
          </div>

          {/* Giant Text Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
            <h3 className="text-[15vw] lg:text-[7vw] font-bold tracking-tighter text-black leading-none whitespace-nowrap opacity-90">
              BloodLink
            </h3>
          </div>

          {/* Vertical Image */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1/3 md:w-1/4 h-full z-10 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
            <img src={bloodLinkImg} alt="BloodLink" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>

          <div className="relative z-20 flex justify-between items-end mt-auto h-full">
            <div className="w-full text-xs md:text-sm font-medium leading-relaxed text-gray-800 bg-white/80 p-3 backdrop-blur-sm rounded-lg hidden sm:block">
              "A full-stack blood donation platform using Spring Boot and React. Features secure JWT authentication."
            </div>
            <div className="flex gap-1.5 self-end ml-2">
               <a href="https://github.com/ShahriarXProxima" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-black text-white flex items-center justify-center text-sm font-bold hover:bg-gray-800 transition-colors">&lt;</a>
               <a href="https://github.com/ShahriarXProxima" target="_blank" rel="noopener noreferrer" className="w-8 h-8 md:w-10 md:h-10 bg-black text-white flex items-center justify-center text-sm font-bold hover:bg-gray-800 transition-colors">&gt;</a>
            </div>
          </div>
        </div>

        {/* Card 3: TitanBoost (Mimics Bottom-Left of reference with grid/tags) */}
        <div className="bg-white rounded-[2rem] p-8 md:p-14 shadow-2xl flex flex-col justify-between aspect-[4/3] md:aspect-auto lg:col-span-1 relative overflow-hidden group transition-transform duration-500 hover:-translate-y-2">
          <div className="flex justify-between items-start w-full">
            <WavyLogo />
          </div>

          <div className="mt-12 lg:mt-8 mb-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black leading-none mb-4">
              TitanBoost
            </h2>
            <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed max-w-sm">
              A lightweight Android performance-tuning toolkit for improving device responsiveness and gaming performance. Includes CPU/GPU tuning and memory cleanup.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mt-auto">
             {['Shell Script', 'C++', 'Android', 'Termux'].map(tag => (
               <div key={tag} className="aspect-square border border-black/5 flex flex-col items-center justify-center p-2 hover:bg-black/5 transition-colors cursor-pointer group/tag">
                 <div className="w-6 h-6 mb-3 bg-black/10 rounded-sm group-hover/tag:bg-black/20 transition-colors overflow-hidden flex items-center justify-center">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/50">
                     <path d="M4 17l6-6-6-6M12 19h8" />
                   </svg>
                 </div>
                 <span className="text-[10px] md:text-xs font-bold tracking-[0.1em] uppercase text-center text-black">{tag}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Card 4: Pac-Man (Mimics Bottom-Right of reference with large bottom text) */}
        <div className="bg-white rounded-[2rem] p-8 md:p-14 shadow-2xl flex flex-col justify-between aspect-[4/3] md:aspect-auto lg:col-span-2 relative overflow-hidden group transition-transform duration-500 hover:-translate-y-2">
          <div className="absolute inset-0 opacity-10 z-0 group-hover:opacity-20 transition-opacity duration-700">
             <img src={pacmanImg} alt="Pac-Man" className="w-full h-full object-cover grayscale" />
             <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
          </div>

          <div className="flex justify-between items-start w-full relative z-10">
            <WavyLogo />
          </div>

          <div className="relative z-10 flex flex-col justify-end h-full mt-12 lg:mt-0">
            <p className="text-sm md:text-base text-gray-800 font-medium leading-relaxed max-w-sm self-end text-right mb-8 md:mb-12">
              A classic 2D arcade game developed from scratch using Java Swing. Features a customizable tile-based maze, collision detection, and ghost AI with randomized movement.
            </p>
            <div className="flex justify-between items-end w-full">
              <h2 className="text-[15vw] lg:text-[7vw] font-bold tracking-tighter text-black leading-[0.8] -ml-2 drop-shadow-sm">
                Pac-Man
              </h2>
              <a href="https://github.com/ShahriarXProxima/Pac-man" target="_blank" rel="noopener noreferrer" className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-1 hover:opacity-70 transition-opacity text-black">
                ↓ GitHub
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
