const EXPERIENCES = [
  {
    period: 'Jun,26 - Present',
    company: 'AxonCore Technologies',
    role: 'Java Developer Intern',
    stack: 'Spring Boot & PostgreSQL'
  },
  {
    period: 'Jan,25 - Jun,25',
    company: 'DriveTrain',
    role: 'Software Engineer Intern',
    stack: 'Java & Spring Boot'
  }
];

export default function WorkExperience() {
  return (
    <section id="work" className="w-full max-w-full py-16 md:py-24 relative bg-transparent backdrop-blur-md border-y border-blue-vivid/20 dark:border-blue-pale/50 transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 flex flex-col gap-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-mono font-bold text-black dark:text-white drop-shadow-md tracking-tight">Work Experience</h2>
          <div className="text-orange-vivid font-mono text-lg sm:text-2xl font-bold tracking-wider drop-shadow-sm uppercase">
            7 months
          </div>
        </div>

        <div className="space-y-16 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-transparent before:via-blue-vivid/40 dark:before:via-blue-pale/40 before:to-transparent mt-8">
          {EXPERIENCES.map((exp, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Timeline dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-primary bg-orange-vivid shadow-[0_0_15px_rgba(247,91,4,0.5)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform duration-300 group-hover:scale-125">
              </div>

              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-4rem)] p-8 md:p-10 rounded-3xl bg-white/70 dark:bg-secondary/70 backdrop-blur-sm border border-gray-200 dark:border-white/10 shadow-2xl hover:border-orange-vivid/70 dark:hover:border-orange-vivid/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(247,91,4,0.2)]">
                <div className="flex flex-col gap-4">
                  <span className="text-orange-vivid font-mono text-sm font-bold uppercase tracking-widest drop-shadow-sm whitespace-pre-line bg-orange-vivid/10 dark:bg-orange-vivid/20 px-3 py-1 rounded-full w-fit">
                    {exp.period.replace('\n', ' • ')}
                  </span>
                  <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white drop-shadow-md tracking-tight leading-none">{exp.company}</h3>
                  <p className="text-blue-deep dark:text-blue-pale font-mono text-base sm:text-xl font-medium drop-shadow-sm">{exp.role}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.stack.split(' & ').map(tech => (
                      <span key={tech} className="px-4 py-2 rounded-full border border-blue-vivid/40 dark:border-blue-pale/40 text-sm font-mono font-bold text-blue-vivid dark:text-blue-pale bg-white/60 dark:bg-primary/60 shadow-sm transition-colors hover:bg-blue-vivid hover:text-white dark:hover:bg-blue-pale dark:hover:text-primary cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
