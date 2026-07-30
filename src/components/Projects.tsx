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
    <section id="projects" className="px-4 md:px-12 py-12 md:py-16 w-full max-w-full flex flex-col justify-center bg-gray-stone/20 dark:bg-gray-stone/40 backdrop-blur-xl border-y border-gray-stone/50">
      <div className="text-orange-vivid font-mono text-xl font-bold tracking-wider text-center drop-shadow-sm mb-12">
        ... /Projects ...
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl mx-auto">
        {PROJECTS.map((project, index) => (
          <div key={index} className={`flex flex-col bg-white/40 dark:bg-primary/40 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl transition-all hover:scale-[1.02] hover:border-accent dark:hover:border-accent ${index === 0 ? 'md:col-span-2 md:flex-row gap-8 items-center' : 'gap-6'}`}>
            <div className={`flex flex-col flex-1 space-y-6 ${index === 0 ? 'order-1 md:order-2' : ''}`}>
              <h3 className="text-3xl md:text-5xl font-bold text-black dark:text-white drop-shadow-md">{project.title}</h3>

              <div className="flex flex-wrap gap-2">
                {project.tags.slice(0, 5).map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full border border-blue-vivid/30 dark:border-blue-pale/30 text-xs font-mono font-bold text-blue-vivid dark:text-blue-pale bg-white/50 dark:bg-primary/50">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-blue-deep dark:text-white font-sans font-medium text-base md:text-lg leading-relaxed whitespace-pre-line drop-shadow-sm">
                {project.description}
              </div>

              <div className="pt-2">
                {project.repoUrl ? (
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-orange-vivid text-white px-5 py-3 rounded-full font-bold hover:bg-orange-vivid/80 transition-colors shadow-lg">
                    View Code <ArrowUpRight size={18} />
                  </a>
                ) : (
                  <button className="inline-flex items-center gap-2 bg-orange-vivid text-white px-5 py-3 rounded-full font-bold hover:bg-orange-vivid/80 transition-colors shadow-lg">
                    Private Repo <ArrowUpRight size={18} />
                  </button>
                )}
              </div>
            </div>

            <div className={`flex-[1.2] w-full rounded-xl overflow-hidden bg-white/20 dark:bg-primary/50 border border-white/20 relative group shadow-lg ${index === 0 ? 'order-2 md:order-1 h-full' : 'aspect-video'}`}>
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
