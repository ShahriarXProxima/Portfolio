interface StaticStripProps {
  title: string;
  direction?: 'left' | 'right';
}

export default function StaticStrip({ title, direction = 'left' }: StaticStripProps) {
  const repeatCount = 20;
  
  const animationClass = direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse';

  return (
    <div className="w-full overflow-hidden bg-yellow-400/80 backdrop-blur-md py-3 relative z-40">
      <div className={`flex w-max ${animationClass}`}>
        {[...Array(repeatCount)].map((_, i) => (
          <div 
            key={i} 
            className="flex items-center gap-6 px-6 text-black font-black text-xl md:text-2xl uppercase tracking-widest italic"
          >
            <span>///</span>
            <span>{title}</span>
            <span>///</span>
          </div>
        ))}
      </div>
    </div>
  );
}
