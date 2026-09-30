import React from 'react';

// Load all skill icons through Vite.
const skillIcons = import.meta.glob(
  '../../resources/assets/skills/*.svg',
  {
    eager: true,
    query: '?url',
    import: 'default',
  }
);

// Map normalized (lowercase) filenames to their loaded URLs for case-insensitive lookup
const normalizedIcons = Object.keys(skillIcons).reduce((acc: Record<string, string>, key) => {
  const filename = key.split('/').pop()!.toLowerCase();
  const moduleVal = skillIcons[key] as any;
  acc[filename] = typeof moduleVal === 'string' ? moduleVal : moduleVal?.default || moduleVal;
  return acc;
}, {});

const getIconUrl = (iconFile: string) => {
  const directPath = `../../resources/assets/skills/${iconFile}`;
  const directMatch = skillIcons[directPath] as any;

  if (directMatch) {
    return typeof directMatch === 'string' ? directMatch : directMatch?.default || directMatch;
  }
  return normalizedIcons[iconFile.toLowerCase()];
};

// All skills
const ALL_SKILLS = [
  'typeScript.svg', 'React.svg', 'Vue.js.svg', 'jQuery.svg', 'HTML5.svg', 'CSS3.svg', 'JavaScript.svg', 'Redux.svg',
  'Java.svg', 'C.svg', 'C++ (CPlusPlus).svg', 'Spring.svg', 'SQL Developer.svg', 'PostgresSQL.svg', 'MySQL.svg', 'Oracle.svg',
  'Redis.svg', 'GraphQL.svg', 'Apache Kafka.svg', 'Apache Maven.svg', 'Gradle.svg', 'Sass.svg', 'PostCSS.svg', 'Ant Design.svg',
  'Material UI.svg', 'Canva.svg', 'Figma.svg', 'affinity-studio-icon.svg', 'Vercel.svg', 'Postman.svg', 'NPM.svg', 'Ubuntu.svg',
  'GitHub.svg', 'Docker.svg', 'Kubernetes.svg', 'Bash.svg', 'IntelliJ IDEA.svg', 'Visual Studio Code (VS Code).svg', 'WebStorm.svg', 'Eclipse IDE.svg', 'rabbitmq.svg'
];

// Split into 3 rows for the marquees
const row1 = ALL_SKILLS.slice(0, 14);
const row2 = ALL_SKILLS.slice(14, 28);
const row3 = ALL_SKILLS.slice(28, 41);
const ROWS = [row1, row2, row3];

const WavyLogo = () => (
  <svg width="32" height="16" viewBox="0 0 32 16" fill="none" stroke="white" strokeWidth="2" strokeLinejoin="round" className="opacity-90">
    <polyline points="0,6 4,2 8,6 12,2 16,6 20,2 24,6 28,2 32,6" />
    <polyline points="0,14 4,10 8,14 12,10 16,14 20,10 24,14 28,10 32,14" />
  </svg>
);

const smoothPlaybackRate = (target: HTMLElement, targetRate: number) => {
  if ((target as any)._animationFrame) cancelAnimationFrame((target as any)._animationFrame);
  
  const animations = target.getAnimations();
  if (!animations.length) return;
  
  let start = performance.now();
  const initialRates = animations.map(a => a.playbackRate);
  
  const animate = (time: number) => {
    const elapsed = Math.max(0, time - start);
    const progress = Math.min(elapsed / 300, 1);
    
    animations.forEach((anim, i) => {
      const initialRate = initialRates[i];
      anim.playbackRate = initialRate + (targetRate - initialRate) * progress;
    });
    
    if (progress < 1) {
      (target as any)._animationFrame = requestAnimationFrame(animate);
    }
  };
  (target as any)._animationFrame = requestAnimationFrame(animate);
};

export default function Skills() {
  return (
    <section id="skills" className="w-full bg-white py-24 flex flex-col items-center justify-center relative overflow-hidden min-h-screen">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-marquee-reverse {
          animation: marquee 40s linear infinite reverse;
          display: flex;
          width: max-content;
        }
      `}</style>

      {/* Top Tag */}
      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-1.5 mb-8 bg-[#FDFDFD] shadow-sm">
        <span className="text-[10px] font-bold tracking-widest text-gray-500">006</span>
        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
        <span className="text-[10px] font-bold tracking-widest text-black uppercase">Technologies</span>
      </div>

      {/* Main Headline */}
      <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-black mb-16 md:mb-24 text-center px-4">
        Technology Ecosystem
      </h2>

      {/* Scrolling Marquees Wrapper */}
      <div className="w-full relative py-10 flex flex-col gap-8 md:gap-12">
        
        {/* Marquee Rows */}
        {ROWS.map((row, index) => {
          // Quadruple the array to ensure smooth infinite scrolling
          const repeatedRow = [...row, ...row, ...row, ...row];
          const isReverse = index % 2 !== 0;

          return (
            <div key={index} className="w-full overflow-hidden flex items-center relative">
              {/* Fade masks for edges */}
              <div className="absolute left-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

              <div 
                className={isReverse ? 'animate-marquee-reverse' : 'animate-marquee'}
                onMouseEnter={(e) => smoothPlaybackRate(e.currentTarget, 0.2)}
                onMouseLeave={(e) => smoothPlaybackRate(e.currentTarget, 1)}
              >
                {repeatedRow.map((iconFile, i) => {
                  const iconUrl = getIconUrl(iconFile);
                  // Clean name formatting
                  let rawName = iconFile.split('.')[0];
                  if(rawName === 'C++ (CPlusPlus)') rawName = 'C++';
                  if(rawName === 'affinity-studio-icon') rawName = 'Affinity';
                  if(rawName === 'rabbitmq') rawName = 'RabbitMQ';
                  
                  return (
                    <div
                      key={`${iconFile}-${i}`}
                      className="flex items-center gap-4 md:gap-6 bg-[#FAFAFA] border border-gray-200/80 rounded-full px-6 md:px-10 py-4 md:py-6 mx-4 md:mx-6 shrink-0 shadow-[0_2px_15px_-5px_rgba(0,0,0,0.05)] hover:bg-white hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                    >
                      <span className="text-gray-800 font-bold text-base md:text-xl lg:text-2xl whitespace-nowrap group-hover:text-black transition-colors">
                        {rawName}
                      </span>
                      {iconUrl && (
                        <img
                          src={iconUrl}
                          alt={`${rawName} logo`}
                          className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Description */}
      <p className="text-gray-500 font-medium text-sm md:text-lg lg:text-xl text-center max-w-3xl mt-16 md:mt-24 px-6 leading-relaxed">
        My technology stack connects robust backend architectures, dynamic frontends, and reliable databases into a scalable, high-performance ecosystem that grows with you.
      </p>

    </section>
  );
}