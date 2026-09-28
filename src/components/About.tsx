import React from 'react';
import profileImg from '../../resources/assets/shahriarFamtik.jpg';
import branchImg from '../../resources/assets/branch.jpeg';

const WavyLogo = ({ color = "white" }: { color?: string }) => (
  <svg width="24" height="12" viewBox="0 0 32 16" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" className="opacity-80">
    <polyline points="0,6 4,2 8,6 12,2 16,6 20,2 24,6 28,2 32,6" />
    <polyline points="0,14 4,10 8,14 12,10 16,14 20,10 24,14 28,10 32,14" />
  </svg>
);

export default function About() {
  return (
    <section id="about" className="px-3 sm:px-6 md:px-8 py-10 md:py-16 w-full min-h-screen flex flex-col justify-center items-center bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(40,40,40,0.5)_0%,transparent_100%)] pointer-events-none z-0"></div>
      
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 relative z-10">

        {/* Card 1: About text with building background (Mimics Top-Left) */}
        <div className="lg:col-span-2 bg-[#121212] border border-white/5 rounded-[2rem] p-8 md:p-14 shadow-2xl flex flex-col justify-between aspect-[4/3] md:aspect-auto lg:aspect-[16/9] relative group overflow-hidden transition-transform duration-500 hover:-translate-y-1">
          <div className="absolute inset-0 opacity-30 z-0 mix-blend-luminosity">
            <img src={branchImg} alt="Architecture" className="w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent"></div>
          </div>
          
          <div className="flex justify-between items-start w-full relative z-10">
            <WavyLogo />
          </div>
          
          <div className="relative z-10 mt-12 md:mt-0 flex flex-col justify-end h-full">
            <p className="text-xs md:text-sm text-gray-400 font-medium leading-relaxed max-w-[320px] mb-6 md:mb-10">
              Guided by a passion for clean architecture, I merge innovative engineering with timeless design to craft software that scales effortlessly.
            </p>
            <h2 className="text-[22vw] lg:text-[11vw] font-bold tracking-tighter text-white leading-[0.75] -ml-2 drop-shadow-lg">
              About
            </h2>
          </div>
        </div>

        {/* Card 2: Portrait (Mimics Top-Right) */}
        <div className="lg:col-span-1 bg-[#121212] border border-white/5 rounded-[2rem] p-8 md:p-14 shadow-2xl flex flex-col justify-between aspect-[4/3] md:aspect-auto lg:aspect-auto relative overflow-hidden group transition-transform duration-500 hover:-translate-y-1">
          <div className="absolute inset-y-0 right-0 w-3/4 md:w-full h-full z-0 opacity-80 group-hover:opacity-100 transition-opacity duration-700">
            <img src={profileImg} alt="Shahriar Portrait" className="w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#121212]/80 via-[#121212]/40 to-transparent lg:bg-gradient-to-t"></div>
          </div>
          
          <div className="flex justify-between items-start w-full relative z-20">
            <WavyLogo />
          </div>

          <div className="relative z-20 flex flex-col justify-end h-full mt-24 lg:mt-64 pb-4">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.05] mb-3 drop-shadow-md">
              Shahriar<br/>Tahmid
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-medium tracking-wide">
            Fullstack Engineer
            </p>
          </div>
        </div>

        {/* Card 3: Bio/Philosophy (Mimics Bottom-Left) */}
        <div className="lg:col-span-1 bg-[#121212] border border-white/5 rounded-[2rem] p-8 md:p-14 shadow-2xl flex flex-col justify-between aspect-[4/3] md:aspect-auto lg:aspect-auto relative overflow-hidden group transition-transform duration-500 hover:-translate-y-1">
          <div className="flex justify-between items-start w-full">
            <WavyLogo />
          </div>

          <div className="mt-12 lg:mt-12 flex flex-col justify-center h-full max-w-lg md:ml-0">
            <h3 className="text-2xl md:text-3xl font-medium text-white leading-relaxed mb-6 md:mb-8">
              Rooted in modern software engineering principles, I approach every project with a deep respect for performance, security, and scalability.
            </h3>
            <p className="text-sm md:text-base text-gray-400 font-medium leading-relaxed mb-10 md:mb-12">
              Collaboration is at the heart of everything I do. By working closely with teams and users, I design backend systems that balance functionality and robust architecture. I am also a competitive programmer ranked top 10 in CodeTrap 2025.
            </p>
            <a href="#contact" className="inline-flex items-center justify-center bg-white text-black text-sm md:text-base font-bold px-8 py-3.5 rounded-full hover:bg-gray-200 hover:scale-105 transition-all w-max mt-2">
              Contact Me
            </a>
          </div>
        </div>

        {/* Card 4: Skills List (Mimics Bottom-Right) */}
        <div className="lg:col-span-2 bg-[#121212] border border-white/5 rounded-[2rem] p-8 md:p-14 shadow-2xl flex flex-col justify-between aspect-[4/3] md:aspect-auto lg:aspect-[16/9] relative overflow-hidden group transition-transform duration-500 hover:-translate-y-1">
          <div className="flex justify-between items-start w-full mb-8">
            <WavyLogo />
          </div>

          <div className="flex flex-col h-full mt-4 lg:mt-0 justify-end">
            <h3 className="text-2xl md:text-3xl font-medium text-white mb-8 md:mb-12">Selected Core Competencies</h3>
            
            <div className="flex flex-col w-full">
              {[
                { title: 'BACKEND DEVELOPMENT', desc: 'Spring Boot, Node.js', yr: '/ 2025' },
                { title: 'DATABASE ARCHITECTURE', desc: 'PostgreSQL, MongoDB', yr: '/ 2025' },
                { title: 'FRONTEND ENGINEERING', desc: 'React, TypeScript', yr: '/ 2024' },
                { title: 'DEVOPS & TOOLING', desc: 'Docker, Git, Linux', yr: '/ 2026' }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between py-4 md:py-6 border-b border-white/10 last:border-0 hover:bg-white/5 transition-colors px-2 -mx-2 rounded-lg cursor-pointer">
                  <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-gray-300 w-[40%]">{item.title}</span>
                  <span className="text-sm md:text-base text-gray-500 font-medium w-[40%] text-center hidden sm:block">{item.desc}</span>
                  <span className="text-xs md:text-sm text-gray-600 font-mono w-[20%] sm:w-[20%] text-right">{item.yr}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Card 5: GitHub Snake (Spans full width) */}
        <div className="lg:col-span-3 bg-[#121212] border border-white/5 rounded-[2rem] p-8 md:p-14 shadow-2xl flex flex-col justify-center items-center relative overflow-hidden group transition-transform duration-500 hover:-translate-y-1">
          <div className="flex justify-between items-start w-full mb-8 lg:mb-12">
            <h3 className="text-xl md:text-2xl font-medium text-white">GitHub Contributions</h3>
            <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/70">Track Record</span>
          </div>

          <div className="w-full max-w-5xl flex justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-500">
            {/* We only need the dark snake since the theme of this section is always dark */}
            <img
              src="https://raw.githubusercontent.com/ShahriarXProxima/ShahriarXProxima/output/github-contribution-grid-snake-dark.svg"
              alt="GitHub Snake"
              className="w-full drop-shadow-lg"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
