import profileImg from '../../resources/shahriarFamtik.jpg';

export default function About() {
  return (
    <section id="about" className="px-4 md:px-12 py-12 md:py-20 w-full max-w-[90rem] mx-auto space-y-8">
      {/* Intro Header */}
      <div className="text-orange-vivid font-mono text-xl font-bold tracking-wider text-center drop-shadow-sm mb-4">
        ... About me ...
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-auto">
        
        {/* Card 1: Greeting & Title (col-span-2) */}
        <div className="md:col-span-2 bg-white/40 dark:bg-primary/20 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-8 md:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-accent dark:hover:border-accent group flex flex-col justify-center">
          <h3 className="text-4xl md:text-6xl font-medium font-serif text-gray-900 dark:text-white leading-[1.1] drop-shadow-sm">
            Hello! I'm <span className="text-accent italic font-bold">Shahriar</span>,
          </h3>
          <h4 className="text-xl md:text-3xl font-mono text-blue-deep dark:text-blue-pale mt-4 mb-6 font-medium">
            Backend Engineer & Student
          </h4>
          <p className="text-lg md:text-xl text-gray-700 dark:text-zinc-300 font-sans leading-relaxed max-w-2xl">
            A results-driven Backend Engineer and Software Engineering student at Daffodil International University. 
            I specialize in building scalable backend systems, designing REST APIs, and optimizing relational databases with clean, maintainable code.
          </p>
        </div>

        {/* Card 2: Portrait (col-span-1) */}
        <div className="md:col-span-1 bg-white/40 dark:bg-primary/20 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-4 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-accent dark:hover:border-accent overflow-hidden group flex items-center justify-center">
          <div className="w-full h-full min-h-[300px] rounded-[1.5rem] overflow-hidden relative">
            <img 
              src={profileImg} 
              alt="Shahriar Portrait" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </div>

        {/* Card 3: Experience/Focus (col-span-1) */}
        <div className="md:col-span-1 bg-gradient-to-br from-blue-vivid/20 to-orange-vivid/20 dark:from-blue-vivid/30 dark:to-orange-vivid/30 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-accent dark:hover:border-accent flex flex-col justify-center gap-4">
           <h4 className="text-2xl font-mono font-bold text-gray-900 dark:text-white drop-shadow-sm">
             My Focus
           </h4>
           <p className="text-lg text-gray-800 dark:text-zinc-200 font-sans leading-relaxed">
             Passionate about clean architecture, continuous learning, and leveraging technology to solve real-world problems. 
           </p>
           <div className="flex flex-wrap gap-2 mt-2">
             <span className="px-3 py-1 bg-white/50 dark:bg-black/30 rounded-full text-sm font-mono font-bold text-blue-deep dark:text-blue-pale border border-white/40 dark:border-white/10">Docker</span>
             <span className="px-3 py-1 bg-white/50 dark:bg-black/30 rounded-full text-sm font-mono font-bold text-blue-deep dark:text-blue-pale border border-white/40 dark:border-white/10">PostgreSQL</span>
             <span className="px-3 py-1 bg-white/50 dark:bg-black/30 rounded-full text-sm font-mono font-bold text-accent border border-white/40 dark:border-white/10">Spring Boot</span>
           </div>
        </div>

        {/* Card 4: GitHub Snake (col-span-2) */}
        <div className="md:col-span-2 bg-white/40 dark:bg-primary/20 backdrop-blur-xl border border-gray-200/50 dark:border-white/10 rounded-[2rem] p-6 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:border-accent dark:hover:border-accent flex flex-col justify-center items-center overflow-hidden">
          <div className="w-full flex justify-between items-center mb-6">
            <h4 className="text-2xl font-mono font-bold text-gray-900 dark:text-white drop-shadow-sm">GitHub Contributions</h4>
            <span className="text-sm font-mono text-gray-500 dark:text-zinc-400 hidden sm:block">Track Record</span>
          </div>
          
          <img 
            src="https://raw.githubusercontent.com/ShahriarXProxima/ShahriarXProxima/output/github-contribution-grid-snake.svg" 
            alt="GitHub Snake (Light)"
            className="w-full max-w-4xl dark:hidden drop-shadow-sm"
          />
          <img 
            src="https://raw.githubusercontent.com/ShahriarXProxima/ShahriarXProxima/output/github-contribution-grid-snake-dark.svg" 
            alt="GitHub Snake (Dark)"
            className="w-full max-w-4xl hidden dark:block drop-shadow-md"
          />
        </div>

      </div>
    </section>
  );
}
