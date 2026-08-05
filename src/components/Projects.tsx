import { ArrowUpRight } from 'lucide-react';
import bloodLinkImg from '../../resources/bloodLink.jpg';
import titanBoostImg from '../../resources/titanBoost.jpg';
import pacmanImg from '../../resources/pacman.png';

const PROJECTS = [
  {
    title: 'BloodLink',
    tags: ['Spring Boot', 'TypeScript', 'PostgreSQL', 'React', 'JWT', 'Postman', 'Swagger'],
    description: 'Developed a full-stack blood donation platform using Spring Boot, PostgreSQL, React, and TypeScript. Implemented secure authentication via JWT and OAuth 2.0. Used Flyway for migrations and optimized the DB for scalability.',
    image: bloodLinkImg
  },
  {
    title: 'TitanBoost',
    tags: ['Shell Script', 'C++', 'Android', 'Termux',],
    description: 'A lightweight Android performance-tuning toolkit for improving device responsiveness and gaming performance. Includes CPU/GPU tuning, memory cleanup, and monitoring via a simple CLI, supporting Termux and Magisk.',
    image: titanBoostImg,
    repoUrl: 'https://github.com/ShahriarXProxima/TitanBoost'
  },
  {
    title: 'Pac-Man',
    tags: ['Java', 'Swing', 'Java AWT', 'HashSet', 'KeyListener'],
    description: 'A classic 2D arcade game developed from scratch using Java Swing. Features a customizable tile-based maze, keyboard controls, food collection, score tracking, collision detection, and ghost AI with randomized movement.',
    image: pacmanImg,
    repoUrl: 'https://github.com/ShahriarXProxima/Pac-man'
  }
];

export default function Projects() {
  return (
    <section id="projects" className="px-4 md:px-12 py-16 md:py-24 w-full max-w-full flex flex-col justify-center bg-transparent border-y border-blue-vivid/20 dark:border-blue-pale/20 transition-colors">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-24">
        
        <div className="text-center space-y-4">
          <h2 className="text-5xl md:text-7xl font-jetbrains font-bold text-black dark:text-white drop-shadow-md tracking-tight">Selected Work</h2>
          <div className="text-orange-vivid font-jetbrains text-xl font-bold tracking-wider drop-shadow-sm uppercase">
            Projects & Case Studies
          </div>
        </div>

        <div className="flex flex-col gap-24 md:gap-32">
          {PROJECTS.map((project, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-16 items-center group`}>
              
              {/* Image Container */}
              <div className="w-full md:w-1/2 aspect-[4/3] rounded-[2rem] overflow-hidden bg-white/20 dark:bg-primary/50 relative shadow-2xl border border-gray-200 dark:border-white/10 group-hover:shadow-[0_20px_50px_-15px_rgba(72,55,255,0.3)] transition-all duration-700">
                <div className="absolute inset-0 bg-blue-vivid/10 dark:bg-blue-deep/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
              </div>

              {/* Content Container */}
              <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8">
                <h3 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight drop-shadow-sm">{project.title}</h3>
                
                <div className="text-gray-800 dark:text-gray-200 font-jetbrains text-lg leading-relaxed whitespace-pre-line">
                  {project.description}
                </div>

                <div className="flex flex-wrap gap-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 rounded-lg border border-blue-vivid/20 dark:border-blue-pale/20 text-sm font-jetbrains font-bold text-blue-deep dark:text-blue-pale bg-white/80 dark:bg-primary/80 shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4">
                  {project.repoUrl ? (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-vivid text-white px-8 py-4 rounded-full font-bold hover:bg-orange-vivid/80 transition-all hover:-translate-y-1 hover:shadow-xl shadow-lg">
                      View Project <ArrowUpRight size={20} />
                    </a>
                  ) : (
                    <button className="inline-flex items-center gap-2 bg-gray-500 text-white px-8 py-4 rounded-full font-bold cursor-not-allowed shadow-lg opacity-80">
                      Private Repository <ArrowUpRight size={20} />
                    </button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
