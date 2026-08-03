import { ArrowUpRight } from 'lucide-react';

const SKILLS = [
  {
    title: 'Front-end',
    tags: 'TypeScript / React / Vue / Redux Toolkit / GraphQL / React Native',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    image: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'Back-end',
    tags: 'Spring Boot / PostgreSQL / MySQL / Redis / Kafka / RabbitMQ / Microservices',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-2',
    image: 'https://images.unsplash.com/photo-1473654729523-203e25dfda10?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Styles',
    tags: 'SCSS / SASS / PostCSS / Ant.d / MUI / Material UI',
    colSpan: 'md:col-span-1',
    rowSpan: 'md:row-span-1',
    image: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Design',
    tags: 'Canva / Affinity Designer / Affinity Photo / Poster Design',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-1',
    image: 'https://images.unsplash.com/photo-1507281736509-c6289f1ea0f8?auto=format&fit=crop&q=80&w=1000'
  },
  {
    title: 'DevOps',
    tags: 'Github / Docker / (CI/CD) / k8s / Bash / Shell Scripting',
    colSpan: 'md:col-span-3',
    rowSpan: 'md:row-span-1',
    image: 'https://images.unsplash.com/photo-1523997596732-56d0ebb8eacf?auto=format&fit=crop&q=80&w=1400'
  }
];

export default function Skills() {
  return (
    <section id="skills" className="px-4 md:px-12 py-12 md:py-16 w-full max-w-[90rem] mx-auto flex flex-col justify-center space-y-8 bg-transparent">
      <div className="text-orange-vivid font-mono text-xl font-bold tracking-wider text-center drop-shadow-sm mb-4">
        {/* ... Skills ... */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)] md:auto-rows-[minmax(240px,auto)]">
        {SKILLS.map((skill, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl md:rounded-[2rem] p-6 md:p-10 flex flex-col justify-end group shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] border border-white/20 dark:border-white/10 hover:border-accent dark:hover:border-accent ${skill.colSpan} ${skill.rowSpan}`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${skill.image})` }}
            />
            {/* Overlay for contrast */}
            <div className="absolute inset-0 z-10 bg-black/40 group-hover:bg-black/30 transition-colors" />

            {/* Content */}
            <div className="relative z-20 space-y-2 w-full">
              <h3 className="text-2xl md:text-3xl text-orange-vivid font-mono font-bold drop-shadow-lg">{skill.title}</h3>
              <p className="text-base md:text-xl font-mono leading-relaxed text-white font-medium drop-shadow-lg">
                {skill.tags}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
