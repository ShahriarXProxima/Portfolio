export default function CautionStrip() {
  const repeatCount = 10;

  return (
    <div className="relative w-full overflow-hidden bg-cyan-400/90 backdrop-blur-md py-2 sm:py-3 shadow-lg z-40 pointer-events-none">
      <div className="flex w-max animate-marquee">
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

