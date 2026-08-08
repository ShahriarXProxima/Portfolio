import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useRef } from 'react';

interface BendingSectionProps {
  children: React.ReactNode;
  className?: string;
  imageSrc?: string;
}

export function BendingSection({ children, className = "", imageSrc }: BendingSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // We want to track the element as it enters and leaves the viewport.
  // "start end" means the top of the element hits the bottom of the viewport.
  // "end start" means the bottom of the element hits the top of the viewport.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  
  // Calculate border-radius bending.
  // At 0 (just entering), the bend is extreme (e.g. 150px)
  // At 0.5 (fully in middle), the bend is 0 (straight flat line)
  // At 1 (just leaving), the bend is extreme again.
  const bendValue = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [150, 0, 0, 150]);
  
  const borderRadius = useTransform(
    bendValue, 
    (val) => `50% 50% 50% 50% / ${val}px ${val}px ${val}px ${val}px`
  );
  
  // Optional scale down when not in focus
  const scale = useTransform(smoothProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.85]);
  
  // Parallax the inner image slightly
  const imageScale = useTransform(smoothProgress, [0, 0.5, 1], [1.2, 1, 1.2]);
  
  return (
    <div 
      ref={ref} 
      className="w-full min-h-[120vh] flex items-center justify-center p-4 md:p-12 relative"
    >
      <motion.div
        style={{
          borderRadius,
          scale,
        }}
        className={`w-full max-w-[1400px] min-h-[90vh] relative overflow-hidden flex flex-col justify-center border border-white/5 shadow-2xl ${className}`}
      >
        {imageSrc && (
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <motion.img 
              src={imageSrc} 
              style={{ scale: imageScale }}
              className="w-full h-full object-cover"
              alt=""
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
        )}
        <div className="relative z-10 w-full h-full p-8 md:p-16 flex flex-col justify-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
