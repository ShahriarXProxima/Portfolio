import profileImg from '../../resources/shahriarFamtik.jpg';

export default function About() {
  return (
    <section id="about" className="px-4 md:px-12 py-12 md:py-16 w-full max-w-[90rem] mx-auto flex flex-col gap-12 md:gap-16 bg-white/40 dark:bg-gradient-to-br dark:from-blue-vivid/40 dark:via-blue-deep/40 dark:to-orange-vivid/40 backdrop-blur-xl rounded-2xl md:rounded-tr-[4rem] md:rounded-bl-[4rem] border border-gray-200/50 dark:border-orange-vivid/50 shadow-2xl">
      {/* Row 1: About Me text + Photo */}
      <div className="space-y-8 w-full">
        {/* <div className="text-gray-500 dark:text-zinc-500 font-mono text-sm tracking-wider text-left">
          ... /About me ...
        </div> */}
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16">
          <div className="w-56 h-56 md:w-80 md:h-80 shrink-0 rounded-xl overflow-hidden border border-gray-200 dark:border-secondary shadow-lg transition-transform duration-700 hover:scale-105 hover:border-accent dark:hover:border-accent">
            <img 
              src={profileImg} 
              alt="Portrait" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6 flex-[2]">
            <h3 className="text-3xl md:text-5xl font-medium font-serif text-gray-900 dark:text-white text-left">
              Hello! I'm <span className="text-accent">Shahriar</span>,
            </h3>
            <p className="text-base md:text-xl text-gray-700 dark:text-zinc-300 font-serif leading-relaxed text-left">
              A results-driven Backend Engineer and Software Engineering student at Daffodil International University with a strong foundation in building scalable backend systems using Java and Spring Boot. Skilled in designing REST APIs, optimizing relational databases, and delivering clean, maintainable code.
            </p>
            <p className="text-base md:text-xl text-gray-700 dark:text-zinc-300 font-serif leading-relaxed text-left">
              Proficient in Docker, Git/GitHub, and PostgreSQL. A competitive programmer with a track record of achievement, including a Top 10 finish at the DIU Code Trap Programming Contest. Passionate about clean architecture, continuous learning, and leveraging technology to solve real-world problems.
            </p>
          </div>
        </div>
      </div>

      {/* Row 2: GitHub Contribution Snake Widget */}
      <div className="w-full bg-gray-50/40 dark:bg-blue-deep/40 border border-gray-200 dark:border-blue-deep rounded-xl p-4 md:p-8 shadow-sm dark:shadow-none flex flex-col justify-center items-center overflow-hidden hover:border-accent dark:hover:border-accent transition-colors">
         <h4 className="text-xl md:text-2xl font-mono text-accent mb-8">GitHub Contributions</h4>
         
         {/* Light Mode SVG */}
         <img 
           src="https://raw.githubusercontent.com/ShahriarXProxima/ShahriarXProxima/output/github-contribution-grid-snake.svg" 
           alt="GitHub Snake Contribution Grid (Light)"
           className="w-full max-w-5xl dark:hidden"
         />
         
         {/* Dark Mode SVG */}
         <img 
           src="https://raw.githubusercontent.com/ShahriarXProxima/ShahriarXProxima/output/github-contribution-grid-snake-dark.svg" 
           alt="GitHub Snake Contribution Grid (Dark)"
           className="w-full max-w-5xl hidden dark:block"
         />
      </div>
    </section>
  );
}
