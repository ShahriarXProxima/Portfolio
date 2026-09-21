import React from 'react';

// Base relative path for your skill icons
const ICON_BASE_PATH = './resources/assets/skill icons';

// All 41 icons distributed across 5 rows
const SKILL_ROWS = [
  // Row 1: Web & Front-end Core
  ['typeScript.svg', 'React.svg', 'Vue.js.svg', 'jQuery.svg', 'HTML5.svg', 'CSS3.svg', 'JavaScript.svg', 'Redux.svg'],
  // Row 2: Languages & Databases
  ['Java.svg', 'C.svg', 'C++ (CPlusPlus).svg', 'Spring.svg', 'SQL Developer.svg', 'PostgresSQL.svg', 'MySQL.svg', 'Oracle.svg'],
  // Row 3: Infrastructure, Build Tools & Styling
  ['Redis.svg', 'GraphQL.svg', 'Apache Kafka.svg', 'Apache Maven.svg', 'Gradle.svg', 'Sass.svg', 'PostCSS.svg', 'Ant Design.svg'],
  // Row 4: Design, Utilities & Environments
  ['Material UI.svg', 'Canva.svg', 'Figma.svg', 'affinity-studio-icon.svg', 'Vercel.svg', 'Postman.svg', 'NPM.svg', 'Ubuntu.svg'],
  // Row 5: DevOps, IDEs & Messaging
  ['GitHub.svg', 'Docker.svg', 'Kubernetes.svg', 'Bash.svg', 'IntelliJ IDEA.svg', 'Visual Studio Code (VS Code).svg', 'WebStorm.svg', 'Eclipse IDE.svg', 'rabbitmq.svg'],
];

export default function Skills() {
  return (
    // Updated outer section background to pure white
    <section id="skills" className="w-full bg-white py-20 px-2 sm:px-6 md:px-12 flex justify-center items-center overflow-hidden">
      
      {/* Animation keyframes & Cyberpunk typography styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700;900&family=JetBrains+Mono:wght@500;700&display=swap');

        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-marquee-reverse {
          animation: marquee 35s linear infinite reverse;
          display: flex;
          width: max-content;
        }
        .animate-marquee:hover, .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }

        .font-cyber {
          font-family: 'Chakra Petch', sans-serif;
        }
        .font-tech-mono {
          font-family: 'JetBrains Mono', monospace;
        }
      `}</style>

      {/* MacBook Pro M2 Frame Container with subtle ambient shadow */}
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center drop-shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
        
        {/* 1. MacBook Pro Display Screen Aluminum Enclosure */}
        <div className="w-full bg-[#121318] rounded-t-[1.8rem] rounded-b-[0.4rem] p-2.5 sm:p-3 pb-2 border border-neutral-800 relative">
          
          {/* Liquid Retina Display Container (Thin Black Bezel) */}
          <div className="w-full bg-black rounded-t-[1.3rem] rounded-b-md p-1.5 sm:p-2 relative overflow-hidden">
            
            {/* Signature MacBook Pro Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-4 sm:h-5 bg-black rounded-b-xl z-30 flex items-center justify-center space-x-2 border-b border-x border-neutral-900/80">
              <div className="w-2 h-2 rounded-full bg-[#0a0a0c] border border-cyan-500/40 flex items-center justify-center">
                <div className="w-0.5 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_4px_#00f0ff]" />
              </div>
              <div className="w-1 h-1 rounded-full bg-[#08080a]" />
            </div>

            {/* 2. Inner Display Screen Canvas */}
            <div className="w-full bg-white rounded-t-xl rounded-b-sm pt-8 sm:pt-10 pb-8 pl-0 pr-0 border border-neutral-200 relative overflow-hidden">
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
                
                {/* Left Side: 5 Continuously Scrolling Marquee Rows */}
                <div className="w-full lg:w-4/5 flex flex-col space-y-4 sm:space-y-5 overflow-hidden pl-0">
                  {SKILL_ROWS.map((row, index) => {
                    const repeatedRow = [...row, ...row, ...row, ...row];

                    return (
                      <div key={index} className="w-full overflow-hidden flex items-center">
                        <div className={index % 2 === 0 ? "animate-marquee" : "animate-marquee-reverse"}>
                          {repeatedRow.map((iconFile, i) => (
                            <div 
                              key={i} 
                              className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-2 sm:mx-3 flex items-center justify-center transition-transform duration-300 hover:scale-110"
                            >
                              <img 
                                src={`${ICON_BASE_PATH}/${iconFile}`} 
                                alt={`${iconFile.split('.')[0]} logo`} 
                                className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18 object-contain" 
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Right Side: Cyberpunk Vertical "SKILLS" Typography */}
                <div className="w-full lg:w-1/5 flex flex-col lg:flex-row items-end justify-center shrink-0 pr-0">
                  <div className="flex flex-col items-end justify-center pr-0">
                    
                    {/* Micro Tagline */}
                    <span className="font-tech-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-cyan-600 font-bold mb-2 pr-2 sm:pr-3 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                      // SYS_CORE
                    </span>

                    {/* Vertical Header */}
                    <h2 className="font-cyber text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-neutral-950 uppercase leading-none [writing-mode:vertical-rl] rotate-180 pr-0 select-none">
                      SKILLS
                    </h2>
                    
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* 3. MacBook Pro Base */}
        <div className="w-[102%] -mt-[1px] h-3.5 sm:h-4 bg-gradient-to-b from-[#22242c] via-[#16171d] to-[#0c0d11] rounded-b-xl relative flex justify-center border-t border-neutral-700/50 shadow-lg">
          <div className="w-16 sm:w-24 h-1.5 sm:h-2 bg-[#0c0d11] rounded-b-md border-x border-b border-neutral-700/50 shadow-inner" />
        </div>

      </div>
    </section>
  );
}