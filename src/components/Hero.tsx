import { ArrowRight } from 'lucide-react';
import { SOCIAL_LINKS } from '../data';
import heroVideo from '../../resources/video3.mp4';

export default function Hero() {
  const githubUrl = SOCIAL_LINKS.find((social) => social.name.toLowerCase() === 'github-repositories')?.url || 'https://github.com/ShahriarXProxima?tab=repositories';

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center text-center px-4 md:px-12 pt-32 pb-12 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* Subtle Gradients for Text Readability at Top & Bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/80 dark:from-primary/80 via-transparent to-white/80 dark:to-primary/80 z-0 pointer-events-none transition-colors duration-300"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col justify-between items-center max-w-5xl mx-auto w-full flex-1">
        
        {/* Top Section */}
        <div className="space-y-8 mt-4 md:mt-12 animate-[fadeInDown_1s_ease-out]">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] font-serif leading-[1.1] text-gray-900 dark:text-white drop-shadow-[0_4px_10px_rgba(255,255,255,0.8)] dark:drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-tight break-words md:whitespace-nowrap">
            Full-stack <span className="font-sans font-medium text-accent italic">Developer</span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-800 dark:text-zinc-100 font-serif italic max-w-2xl mx-auto leading-relaxed drop-shadow-md dark:drop-shadow-xl font-medium px-4">
            Goal is to write maintainable, clean and understandable code so the development process is enjoyable.
          </p>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center space-y-10 mt-auto animate-[fadeInUp_1s_ease-out] w-full pb-8 pt-16">
          <a 
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-white px-10 py-5 rounded-full font-bold flex items-center gap-5 hover:bg-accent/90 hover:scale-105 transition-all duration-300 cursor-pointer mx-auto inline-flex shadow-[0_0_20px_rgba(255,78,70,0.4)] hover:shadow-[0_0_40px_rgba(255,78,70,0.6)] text-lg"
          >
            Explore Projects
            <div className="bg-white text-accent p-2.5 rounded-full">
              <ArrowRight size={20} />
            </div>
          </a>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-6 max-w-3xl pt-2">
            {SOCIAL_LINKS.map((social) => (
              <a 
                key={social.name} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-gray-700 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-all group drop-shadow-md hover:-translate-y-1"
              >
                <social.icon size={22} className="group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-sm font-bold tracking-wider uppercase">{social.name}</span>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
