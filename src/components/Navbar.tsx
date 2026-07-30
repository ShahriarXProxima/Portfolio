import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

interface NavbarProps {
  isDark?: boolean;
  toggleTheme?: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 50) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems = [
    { name: 'About me', id: 'about' },
    { name: 'Work', id: 'work' },
    { name: 'Articles', id: 'articles' },
    { name: 'Contact me', id: 'contact' },
  ];

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `#${id}`;
    }
  };

  const handleLogoClick = () => {
    if (window.location.hash && window.location.hash.startsWith('#article/')) {
      window.location.hash = '';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 w-full z-50 backdrop-blur-xl bg-white/40 dark:bg-primary/40 border-b border-black/5 dark:border-blue-deep transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <nav className="flex items-center justify-between py-3.5 px-4 md:px-12 w-full max-w-7xl mx-auto">
        {/* Logo */}
        <div
          onClick={handleLogoClick}
          className="text-lg font-medium tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="font-sans font-bold text-orange-vivid dark:text-orange-vivid italic"> shahriar .dev</span>
        </div>

        {/* Right side container: Links row + Animated Circle Button */}
        <div className="flex items-center gap-3 md:gap-6">
          {/* Theme Toggle */}
          {toggleTheme && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}

          {/* Navigation Bar Row */}
          <div
            className={`flex items-center transition-all duration-500 ease-in-out overflow-hidden ${isOpen
              ? 'max-w-2xl opacity-100 translate-x-0'
              : 'max-w-0 opacity-0 translate-x-10 pointer-events-none'
              }`}
          >
            <div className="flex items-center gap-1.5 md:gap-3 bg-white/40 dark:bg-blue-deep/40 border border-black/5 dark:border-blue-vivid/50 px-3 py-1.5 rounded-full backdrop-blur-xl shadow-xl whitespace-nowrap">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleScroll(item.id)}
                  className="text-xs md:text-sm font-mono text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white px-3 py-1 rounded-full hover:bg-black/5 dark:hover:bg-blue-vivid/30 transition-all cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Toggle Button with Expanding Circle Animation */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative group p-2.5 rounded-full flex items-center justify-center text-gray-900 dark:text-white transition-all cursor-pointer focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {/* Animated Circle Rings */}
            <span
              className={`absolute inset-0 rounded-full border transition-all duration-500 ease-out ${isOpen
                ? 'scale-125 opacity-100 border-black/80 dark:border-white/80 animate-pulse'
                : 'scale-100 opacity-40 border-gray-400 dark:border-zinc-500 group-hover:scale-110 group-hover:border-black dark:group-hover:border-white'
                }`}
            />

            {/* Circle background fill on open */}
            <span
              className={`absolute inset-0 rounded-full bg-black/5 dark:bg-white/10 transition-all duration-500 ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`}
            />

            {/* Rotating Dashed SVG Circle Ring */}
            <svg
              className={`absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] transition-all duration-700 pointer-events-none ${isOpen ? 'rotate-180 opacity-100 scale-105' : 'rotate-0 opacity-0 scale-90'
                }`}
              viewBox="0 0 44 44"
            >
              <circle
                cx="22"
                cy="22"
                r="20"
                fill="none"
                stroke={isDark ? "white" : "black"}
                strokeWidth="1.5"
                strokeDasharray="6 4"
                className="animate-[spin_8s_linear_infinite]"
              />
            </svg>

            {/* Icon */}
            <div className={`relative z-10 transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
}
