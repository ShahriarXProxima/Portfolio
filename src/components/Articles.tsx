import React from 'react';
import { ARTICLES_DATA } from '../data/articles';
import { TrendingUp, Quote, Rocket } from 'lucide-react';

export default function Articles({ onSelectArticle }: { onSelectArticle?: (id: string) => void }) {
  // Take first 4 articles to fit the 4-card layout
  const articles = ARTICLES_DATA.slice(0, 4);

  return (
    <section id="articles" className="w-full pt-16 md:pt-24 pb-0 px-3 sm:px-6 md:px-10 bg-gradient-to-b from-gray-400 to-black flex justify-center">
      <div className="w-full max-w-[1600px] 2xl:max-w-[92vw] bg-[#F5F5F7] rounded-t-[2.5rem] md:rounded-t-[3.5rem] rounded-b-none p-8 md:p-14 lg:p-20 shadow-2xl relative overflow-hidden flex flex-col">
        
        {/* Huge Headline */}
        <div className="max-w-4xl mb-16 md:mb-24 mt-8 md:mt-0">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-black leading-[1.1]">
            Explore the latest in software, design, and 
            <span className="text-gray-300"> engineeri</span>
            <span className="text-gray-200">ng.</span>
          </h2>
          <p className="mt-8 text-gray-600 font-medium text-sm md:text-base max-w-md leading-relaxed">
            Empowering developers with intelligent insights that turn complex architectures into actionable knowledge daily.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* Card 1: Black Card */}
          <div 
            onClick={() => onSelectArticle?.(articles[0].id)}
            className="bg-[#111111] rounded-[2rem] p-8 flex flex-col justify-between aspect-[4/5] md:aspect-auto md:min-h-[380px] cursor-pointer hover:-translate-y-2 transition-transform duration-500 group shadow-lg"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-black">
              <TrendingUp size={24} />
            </div>
            <div className="mt-auto">
              <div className="text-5xl md:text-6xl font-bold text-white tracking-tighter mb-4 group-hover:scale-105 transition-transform origin-left">
                5<span className="text-3xl md:text-4xl">MIN</span>
              </div>
              <p className="text-white/70 text-xs md:text-sm font-medium leading-relaxed">
                {articles[0].title}
              </p>
            </div>
          </div>

          {/* Card 2: Dashed Border Card */}
          <div 
            onClick={() => onSelectArticle?.(articles[1].id)}
            className="bg-[#F5F5F7] border-2 border-dashed border-gray-300 rounded-[2rem] p-8 flex flex-col justify-between aspect-[4/5] md:aspect-auto md:min-h-[380px] cursor-pointer hover:-translate-y-2 transition-transform duration-500 group"
          >
            <div className="flex flex-col items-center justify-center flex-grow">
               <div className="flex -space-x-3 mb-4">
                 {[1, 2, 3, 4].map(i => (
                   <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#F5F5F7] shadow-sm flex items-center justify-center text-xs font-bold text-white
                     ${i===1 ? 'bg-blue-500' : i===2 ? 'bg-purple-500' : i===3 ? 'bg-green-500' : 'bg-orange-500'}
                   `}>
                     A{i}
                   </div>
                 ))}
               </div>
               <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                 {articles[1].readTime}
               </div>
            </div>
            <div className="mt-auto border-t border-gray-200 pt-6">
              <div className="text-4xl md:text-5xl font-bold text-black tracking-tighter mb-2">
                React
              </div>
              <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">
                {articles[1].title}
              </p>
            </div>
          </div>

          {/* Card 3: Light Gray Card with Graphic */}
          <div 
            onClick={() => onSelectArticle?.(articles[2].id)}
            className="bg-[#EAEAEA] rounded-[2rem] p-8 flex flex-col justify-between aspect-[4/5] md:aspect-auto md:min-h-[380px] cursor-pointer hover:-translate-y-2 transition-transform duration-500 group shadow-inner"
          >
            <div className="flex-grow flex items-center justify-center relative">
               {/* Radiating lines graphic */}
               <svg viewBox="0 0 100 100" className="w-40 h-40 opacity-20 absolute inset-0 m-auto animate-[spin_60s_linear_infinite]">
                 {Array.from({length: 24}).map((_, i) => (
                   <line key={i} x1="50" y1="10" x2="50" y2="25" stroke="black" strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${i * 15} 50 50)`} />
                 ))}
               </svg>
               <div className="w-16 h-16 bg-[#111111] rounded-full flex items-center justify-center text-white relative z-10 shadow-xl group-hover:scale-110 transition-transform">
                 <Rocket size={24} fill="currentColor" className="opacity-80" />
               </div>
            </div>
            <div className="mt-auto z-10 relative">
              <div className="text-lg font-bold text-black mb-2">
                TypeScript
              </div>
              <p className="text-gray-600 text-xs md:text-sm font-medium leading-relaxed line-clamp-3">
                {articles[2].description}
              </p>
            </div>
          </div>

          {/* Card 4: White Quote Card */}
          <div 
            onClick={() => onSelectArticle?.(articles[3].id)}
            className="bg-white rounded-[2rem] p-8 flex flex-col justify-between aspect-[4/5] md:aspect-auto md:min-h-[380px] cursor-pointer hover:-translate-y-2 transition-transform duration-500 group shadow-xl"
          >
            <div className="flex justify-between items-start w-full">
              <Quote size={40} className="text-black rotate-180" fill="currentColor" />
              <div className="font-serif font-bold text-xl tracking-tighter">
                CSS
              </div>
            </div>
            <div className="mt-auto">
              <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed mb-6">
                "{articles[3].description.split('.')[0]}."
              </p>
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                {articles[3].title}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
