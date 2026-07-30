import { ArrowUpRight } from 'lucide-react';

const SKILLS = [
  {
    title: 'Front-end',
    tags: 'TypeScript / React / Vue / Redux Toolkit / GraphQL / React Native',
  },
  {
    title: 'Styles',
    tags: 'SCSS / SASS / PostCSS / Ant.d / MUI / Material UI',
    hasLink: true,
  },
  {
    title: 'Back-end',
    tags: 'Spring Boot / PostgreSQL / MySQL / Redis / Kafka / RabbitMQ / Microservices',
  },
  {
    title: 'Design',
    tags: 'Canva / Affinity Designer / Affinity Photo / Poster Design',
  }
];

export default function Skills() {
  return (
    <section className="px-4 md:px-12 py-12 md:py-16 w-full max-w-full flex flex-col justify-center space-y-6 bg-white/40 dark:bg-primary/20 backdrop-blur-xl">
      {SKILLS.map((skill, index) => (
        <div key={index} className="bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-none md:rounded-tl-[2rem] md:rounded-br-[2rem] p-6 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-accent dark:hover:border-accent transition-colors shadow-2xl">
          <div className="space-y-4 w-full">
            <h3 className="text-2xl text-blue-vivid dark:text-orange-vivid font-mono font-bold drop-shadow-sm">{skill.title}</h3>
            <p className="text-xl md:text-2xl font-mono leading-relaxed text-black dark:text-white font-medium drop-shadow-md">
              {skill.tags}
            </p>
          </div>
          {/* {skill.hasLink && (
            <button className="bg-gray-100 dark:bg-white text-gray-900 dark:text-black p-4 rounded-full self-start md:self-auto group-hover:bg-gray-200 dark:group-hover:bg-zinc-200 transition-colors border border-gray-200 dark:border-transparent">
              <ArrowUpRight size={24} />
            </button>
          )} */}
        </div>
      ))}

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 pt-4 items-center">
        <div className="flex-1 text-2xl md:text-4xl text-orange-vivid dark:text-orange-vivid font-mono font-bold leading-[120%] py-4 md:py-4 md:px-2 drop-shadow-md">
          Some of my favorite technologies, topics, or tools that I've worked with...
        </div>
        <div className="flex-[3] w-full bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-none md:rounded-tr-[2rem] md:rounded-bl-[2rem] p-6 md:p-10 shadow-2xl hover:border-accent dark:hover:border-accent transition-colors">
          <h3 className="text-2xl text-blue-vivid dark:text-blue-pale font-mono font-bold drop-shadow-sm mb-4">DevOps</h3>
          <p className="text-xl md:text-2xl font-mono leading-relaxed text-black dark:text-white font-medium drop-shadow-md">
            Github / Docker / (CI/CD) / k8s / Bash / Shell Scripting
          </p>
        </div>
      </div>
    </section>
  );
}
