const EXPERIENCES = [
  {
    period: 'Jun,26 - Present',
    company: 'AxonCore Technologies',
    role: 'Java Developer Intern',
    stack: 'Spring Boot & PostgreSQL'
  },
  {
    period: 'Jan,25 - Jun,25\n0 year\n6 months',
    company: 'DriveTrain',
    role: 'Software Engineer Intern',
    stack: 'Java & Spring Boot'
  }
];

export default function WorkExperience() {
  return (
    <section id="work" className="px-4 md:px-12 py-12 md:py-16 w-full max-w-full flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16 bg-blue-pale/40 dark:bg-blue-pale/20 backdrop-blur-xl border-y border-blue-vivid/20 dark:border-blue-pale/50 shadow-2xl hover:border-accent dark:hover:border-accent transition-colors">
      <div className="flex-1 space-y-12">
        <h2 className="text-5xl md:text-6xl font-mono font-medium text-right md:text-left">Work</h2>
      </div>
      <div className="flex-[2] space-y-12">
        <div className="space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-6 md:gap-12 border-b border-gray-200 dark:border-secondary/50 pb-8 last:border-0 hover:text-accent transition-colors">
              <div className="w-32 text-sm text-orange-vivid dark:text-orange-vivid font-bold whitespace-pre-line font-mono uppercase tracking-wider drop-shadow-sm">
                {exp.period}
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-black dark:text-white drop-shadow-md">{exp.company}</div>
                <div className="text-blue-deep dark:text-blue-vivid font-mono text-base font-medium drop-shadow-sm">
                  {exp.role} | {exp.stack}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-right text-2xl font-mono text-blue-vivid dark:text-blue-pale font-bold pt-8 italic drop-shadow-sm">
          Work experience<br />
          <span className="text-orange-vivid dark:text-orange-vivid text-3xl">7 months +</span>
        </div>
      </div>
    </section>
  );
}
