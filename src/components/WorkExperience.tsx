import React from 'react';

const EXPERIENCES = [
  {
    period: 'Jun, 2026 - Present',
    company: 'AxonCore Technologies',
    role: 'Java Developer Intern',
    stack: 'Spring Boot & PostgreSQL'
  },
  {
    period: 'Jan, 2025 - Jun, 2025',
    company: 'DriveTrain',
    role: 'Software Engineer Intern',
    stack: 'Java & Spring Boot'
  }
];

export default function WorkExperience() {
  return (
    <section id="work" className="w-full py-24 md:py-32 px-4 md:px-10 bg-[#537179] flex flex-col items-center overflow-hidden">
      
      <div className="w-full max-w-[1600px] 2xl:max-w-[92vw] mx-auto mb-16 md:mb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black leading-none drop-shadow-sm">
          Work <span className="text-gray-300">Experience.</span>
        </h2>
        <div className="flex items-center gap-4 border border-gray-200 bg-[#FAFAFA] rounded-full px-6 py-3 shadow-sm">
          <span className="w-2.5 h-2.5 bg-black rounded-full animate-pulse"></span>
          <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase text-black">Professional Journey</span>
        </div>
      </div>

      <div className="w-full max-w-[1600px] 2xl:max-w-[92vw] mx-auto grid grid-cols-1 gap-6 md:gap-8">
        {EXPERIENCES.map((exp, i) => (
          <div 
            key={i} 
            className="bg-[#F8F9FA] border border-gray-200/80 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 group hover:-translate-y-2 transition-transform duration-500 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]"
          >
            <div className="flex flex-col gap-4 md:gap-6">
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black transition-opacity group-hover:translate-x-2 duration-500 ease-out">
                {exp.company}
              </h3>
              <p className="text-gray-500 font-medium text-lg md:text-xl lg:text-2xl transition-transform duration-500 group-hover:translate-x-2">
                {exp.role}
              </p>
              <div className="flex flex-wrap gap-3 mt-4 transition-transform duration-500 group-hover:translate-x-2">
                {exp.stack.split(' & ').map(tech => (
                  <span 
                    key={tech} 
                    className="bg-white border border-gray-200 text-gray-700 text-xs md:text-sm font-bold px-5 py-2.5 rounded-full shadow-sm hover:bg-black hover:text-white transition-colors cursor-default"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-start lg:items-end gap-4 shrink-0 mt-6 lg:mt-0 w-full lg:w-auto border-t lg:border-t-0 border-gray-200 pt-6 lg:pt-0">
              <div className="bg-[#111] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-6 py-3.5 rounded-full whitespace-nowrap shadow-md group-hover:bg-white group-hover:text-black group-hover:border group-hover:border-gray-200 transition-colors">
                {exp.period}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
