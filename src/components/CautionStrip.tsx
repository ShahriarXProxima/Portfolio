export default function CautionStrip() {
  // Repeating text blocks so it fills the screen twice for seamless scrolling
  const repeatCount = 20;

  return (
    <div className="w-full overflow-hidden bg-cyan-400/80 backdrop-blur-md py-3 relative z-40 border-y border-cyan-500/50">
      <div className="flex w-max animate-marquee">
        {/* We create two groups of the same text so it loops seamlessly. 
            The marquee animation moves from 0 to -50% of the total width. */}
        {[...Array(repeatCount)].map((_, i) => (
          <div 
            key={i} 
            className="flex items-center gap-6 px-6 text-black font-black text-xl md:text-2xl uppercase tracking-widest italic"
          >
            <span>///</span>
            <span>OPEN TO WORK!</span>
            <span>///</span>
          </div>
        ))}
      </div>
    </div>
  );
}
