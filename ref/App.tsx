import { BendingSection } from './components/BendingSection';
import { motion } from 'motion/react';
import { Layers, Cpu, Zap, LayoutTemplate, Smartphone } from 'lucide-react';

export default function App() {
  return (
    <main className="bg-[#0A0A0A] text-[#F0F0F0] font-sans w-full overflow-hidden flex flex-col items-center">
      {/* Navbar overlay */}
      <nav className="fixed top-0 left-0 right-0 flex justify-between items-center px-6 md:px-12 py-8 z-50 mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter">KINETIC.</div>
        <div className="hidden md:flex gap-10 text-xs uppercase tracking-widest font-medium opacity-60">
          <span>Work</span>
          <span>Studio</span>
          <span>Archive</span>
          <span>Contact</span>
        </div>
      </nav>

      {/* Right side interaction indicator */}
      <div className="fixed right-0 top-0 h-full w-24 border-l border-white/10 hidden lg:flex flex-col items-center justify-center gap-24 z-40 pointer-events-none">
        <div className="rotate-90 text-[10px] uppercase tracking-[0.5em] whitespace-nowrap opacity-30">Scroll Interaction Active</div>
        <div className="h-32 w-px bg-white/20"></div>
        <div className="w-2 h-2 bg-[#FF3E00] rounded-full animate-pulse"></div>
      </div>

      {/* Hero Section */}
      <BendingSection className="bg-[#0A0A0A] relative overflow-hidden">
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-white/10 scale-x-110 -rotate-12"></div>
        </div>
        <div className="relative z-20 px-4 md:px-12 flex flex-col h-full justify-center">
          <motion.div className="transform -skew-x-6">
            <span className="text-xs uppercase tracking-[0.4em] text-[#FF3E00] mb-4 block font-semibold">Volume 01 / Distortion</span>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-7xl md:text-9xl font-black leading-[0.8] tracking-tighter mb-8"
            >
              SCROLL<br/>THE<br/>FUTURE
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="text-lg max-w-md leading-relaxed opacity-40 font-light italic mb-12"
            >
              Experience a new dimension of web design. 
              Smooth, scroll-based bending animations powered by Framer Motion.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-8 items-start"
            >
              <button className="text-xs uppercase tracking-widest font-medium border-b border-[#FF3E00] pb-2 hover:text-[#FF3E00] transition-colors">
                Get Started
              </button>
              <button className="text-xs uppercase tracking-widest font-medium opacity-60 hover:opacity-100 transition-opacity">
                View Showcase
              </button>
            </motion.div>
          </motion.div>
          <div className="absolute bottom-8 right-12 text-right hidden md:block">
            <div className="text-xs uppercase tracking-widest opacity-40 mb-2">Project Scope</div>
            <div className="text-sm italic">Framer Motion / GLSL / React</div>
          </div>
        </div>
      </BendingSection>

      {/* Features Section */}
      <BendingSection 
        imageSrc="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
        className="bg-[#161616] border-t border-white/5 relative overflow-hidden flex flex-col px-4 md:px-12 pt-24 shadow-[0_-50px_100px_rgba(0,0,0,0.5)]"
      >
        <div className="transform -skew-y-6 flex-1 flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="transform skew-y-6 lg:skew-y-0">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">IMMERSIVE<br/>INTERACTIONS</h2>
              <p className="text-[#F0F0F0]/60 text-sm leading-relaxed mb-10 max-w-md">
                Every section responds to your scroll. The perspective shifts, elements scale, and the UI feels tangibly alive in 3D space.
              </p>
              <ul className="space-y-8">
                {[
                  { icon: <Cpu className="w-5 h-5" />, text: 'Hardware accelerated transforms' },
                  { icon: <Zap className="w-5 h-5" />, text: 'Spring-physics based smoothing' },
                  { icon: <Smartphone className="w-5 h-5" />, text: 'Responsive design for all devices' },
                  { icon: <Layers className="w-5 h-5" />, text: 'Beautiful 3D layering' }
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-6 text-sm uppercase tracking-widest opacity-80">
                    <div className="text-[#FF3E00]">
                      {feature.icon}
                    </div>
                    {feature.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-6 transform skew-y-6 lg:skew-y-0 mt-12 lg:mt-0 items-end">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-24 w-full max-w-sm bg-white/5 border border-white/10 flex items-center justify-between px-8 italic text-white/20 hover:border-[#FF3E00]/50 transition-colors">
                  <span className="text-xs tracking-[0.2em] uppercase">Interaction Block</span>
                  <span className="text-xs">_{String(i).padStart(2, '0')}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BendingSection>

      {/* Stats / Showcase Section */}
      <BendingSection 
        imageSrc="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
        className="bg-[#0A0A0A] relative overflow-hidden flex flex-col"
      >
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-full h-px bg-white/10 scale-x-110 rotate-12"></div>
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center text-center transform -skew-x-6 h-full">
          <span className="text-xs uppercase tracking-[0.4em] text-[#FF3E00] mb-6 block font-semibold">Performance Metrics</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">BEAUTIFULLY<br/>CRAFTED</h2>
          <p className="text-sm leading-relaxed opacity-40 font-light italic max-w-md mx-auto mb-20">
            Each block is designed to look stunning from every angle. 
            The 3D space adds depth without sacrificing readability.
          </p>
          <div className="grid md:grid-cols-3 gap-16 md:gap-24 w-full">
            {[
              { title: 'Visuals', value: '100', desc: 'Pixel-perfect rendering' },
              { title: 'Motion', value: '60', desc: 'Silky smooth animations' },
              { title: 'Depth', value: '3D', desc: 'True perspective' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-7xl font-black tracking-tighter mb-4 text-[#F0F0F0]">
                  {stat.value}<span className="text-[#FF3E00] text-3xl">.</span>
                </div>
                <div className="text-xs uppercase tracking-[0.2em] opacity-60 mb-2">
                  {stat.title}
                </div>
                <div className="text-xs italic opacity-30">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BendingSection>

      {/* CTA Section */}
      <BendingSection className="bg-[#161616] border-t border-white/5 relative overflow-hidden">
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center">
          <div className="transform skew-x-6 flex flex-col items-center">
            <LayoutTemplate className="w-12 h-12 text-[#FF3E00] mb-8 opacity-80" />
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">READY TO<br/>DIVE IN?</h2>
            <p className="text-sm leading-relaxed opacity-40 font-light italic max-w-md mx-auto mb-16">
              Transform your static websites into engaging, interactive experiences today.
            </p>
            <button className="text-xs uppercase tracking-[0.2em] font-medium border border-white/20 px-12 py-6 hover:bg-[#FF3E00] hover:border-[#FF3E00] hover:text-white transition-all duration-300 transform -skew-x-12 group">
              <span className="block transform skew-x-12 group-hover:scale-105 transition-transform">Start Building Now</span>
            </button>
          </div>
        </div>
      </BendingSection>
    </main>
  );
}
