import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ARTICLES_DATA, Article } from '../data/articles';
import { motion, AnimatePresence } from 'motion/react';

interface ArticlesProps {
  onSelectArticle?: (id: string) => void;
}

export default function Articles({ onSelectArticle }: ArticlesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleArticleClick = (id: string) => {
    if (onSelectArticle) {
      onSelectArticle(id);
    }
  };

  const nextArticle = () => {
    setCurrentIndex((prev) => (prev + 1) % ARTICLES_DATA.length);
  };

  const prevArticle = () => {
    setCurrentIndex((prev) => (prev - 1 + ARTICLES_DATA.length) % ARTICLES_DATA.length);
  };

  return (
    <section id="articles" className="w-full py-16 md:py-24 relative bg-transparent overflow-hidden">
      {/* Background Typographies */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 0.1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="absolute text-[12vw] font-oswald font-bold text-gray-900 dark:text-white uppercase tracking-tighter select-none whitespace-nowrap"
        >
          INSIGHTS
        </motion.div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col gap-8 md:gap-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-4 md:mb-8">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-jetbrains font-bold text-black dark:text-white drop-shadow-md tracking-tight">Writings & Thoughts</h2>
            <p className="text-gray-600 dark:text-gray-300 font-mono text-base md:text-lg max-w-2xl">
              Exploring software engineering, design patterns, and lessons learned.
            </p>
          </div>
          
          {/* Carousel Controls */}
          <div className="flex gap-4 self-start md:self-auto">
            <button 
              onClick={prevArticle}
              className="p-3 md:p-4 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-gray-300 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:border-orange-vivid/50 transition-all group shadow-sm text-black dark:text-white"
              aria-label="Previous Article"
            >
              <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={nextArticle}
              className="p-3 md:p-4 rounded-full bg-black/5 dark:bg-white/5 backdrop-blur-md border border-gray-300 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 hover:border-orange-vivid/50 transition-all group shadow-sm text-black dark:text-white"
              aria-label="Next Article"
            >
              <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3D Carousel Container */}
        <div 
          className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center perspective-[1200px]"
          style={{ perspective: '1200px' }}
        >
          <AnimatePresence initial={false}>
            {ARTICLES_DATA.map((article, index) => {
              const total = ARTICLES_DATA.length;
              
              // Calculate shortest distance in a circular array
              let offset = index - currentIndex;
              if (offset > Math.floor(total / 2)) {
                offset -= total;
              } else if (offset < -Math.floor(total / 2)) {
                offset += total;
              }

              // Hide items that are too far away
              if (Math.abs(offset) > 3) return null;

              const isCenter = offset === 0;
              const xOffsetBase = windowWidth < 768 ? 100 : 250;
              
              const xPos = offset * xOffsetBase;
              const zPos = -Math.abs(offset) * 150;
              const scalePos = 1 - Math.abs(offset) * 0.15;
              const rotateYPos = offset * -15; // cards face slightly inward
              const opacityPos = isCenter ? 1 : Math.max(0, 1 - Math.abs(offset) * 0.4);

              return (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, x: xPos + Math.sign(offset) * 100 }}
                  animate={{
                    opacity: opacityPos,
                    x: xPos,
                    z: zPos,
                    scale: scalePos,
                    rotateY: rotateYPos,
                  }}
                  exit={{ opacity: 0, scale: 0.8, x: xPos + Math.sign(offset) * -100 }}
                  transition={{
                    type: 'spring',
                    stiffness: 250,
                    damping: 30,
                    mass: 1,
                  }}
                  className={`absolute w-[300px] sm:w-[350px] md:w-[420px] h-[380px] md:h-[450px] bg-white/80 dark:bg-[#151515]/80 backdrop-blur-xl rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl border ${
                    isCenter 
                      ? 'border-gray-300 dark:border-white/30 z-30 hover:border-orange-vivid/70 hover:shadow-orange-vivid/20' 
                      : 'border-gray-200 dark:border-white/10 z-20 pointer-events-auto opacity-70'
                  } overflow-hidden cursor-pointer transition-colors duration-300 group`}
                  style={{ transformStyle: 'preserve-3d' }}
                  onClick={() => {
                    if (isCenter) {
                      handleArticleClick(article.id);
                    } else {
                      setCurrentIndex(index);
                    }
                  }}
                >
                  <div className="space-y-4 relative z-10">
                    <h3 className={`text-2xl md:text-3xl font-bold font-jetbrains leading-tight drop-shadow-sm transition-colors duration-300 ${
                      isCenter 
                        ? 'text-black dark:text-white group-hover:text-orange-vivid' 
                        : 'text-gray-700 dark:text-gray-400'
                    }`}>
                      {article.title}
                    </h3>
                    <p className={`text-sm md:text-base font-medium leading-relaxed line-clamp-4 transition-colors ${
                      isCenter 
                        ? 'text-gray-800 dark:text-gray-300' 
                        : 'text-gray-500 dark:text-gray-500'
                    }`}>
                      {article.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-orange-vivid font-mono text-xs md:text-sm font-bold bg-orange-vivid/10 px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm">
                      {article.date}
                    </span>
                    {isCenter && (
                      <div className="bg-orange-vivid text-white p-2 md:p-3 rounded-full hover:bg-orange-vivid/80 hover:scale-110 transition-transform shadow-lg">
                        <ArrowRight size={20} />
                      </div>
                    )}
                  </div>
                  
                  {/* Subtle gradient overlay to make text more legible in dark mode */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 dark:from-black/40 to-transparent pointer-events-none opacity-50 dark:opacity-100 mix-blend-overlay" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {/* Carousel Indicators */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {ARTICLES_DATA.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'w-8 bg-orange-vivid' 
                  : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40'
              }`}
              aria-label={`Go to article ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
