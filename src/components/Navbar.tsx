import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { HoverButton } from './HoverButton';

interface NavbarProps {
  isDark?: boolean;
  toggleTheme?: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false); // Hide on scroll down
      } else {
        setIsVisible(true); // Show on scroll up
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
    { name: 'Design', id: 'design' },
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
    <header className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[96vw] md:w-max ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0 pointer-events-none'}`}>
      <nav className="flex items-center justify-between gap-3 md:gap-10 py-2.5 px-4 md:px-6 w-full mx-auto backdrop-blur-md bg-white/30 dark:bg-black/30 rounded-full shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] transition-colors duration-300">

        {/* Sleek Logo */}
        <div
          onClick={handleLogoClick}
          className="text-lg md:text-xl font-medium tracking-tighter cursor-pointer hover:opacity-80 transition-opacity shrink-0 flex items-baseline"
        >
          <span className="font-serif font-extrabold text-gray-900 dark:text-white transition-colors duration-300">
            shahriar
          </span>
          <span className="font-serif italic text-accent font-extrabold">.dev</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <HoverButton
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="text-sm font-fira font-bold text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white hover:italic px-5 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer"
            >
              {item.name}
            </HoverButton>
          ))}
        </div>

        {/* Mobile Navigation (Compacted) */}
        <div className="flex md:hidden items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
          {navItems.map((item) => (
            <HoverButton
              key={item.id}
              onClick={() => handleScroll(item.id)}
              className="text-[11px] sm:text-xs font-fira font-bold text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white hover:italic px-2.5 sm:px-3 py-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              {item.name}
            </HoverButton>
          ))}
        </div>

        {/* Theme Toggle */}
        {toggleTheme && (
          <button
            onClick={toggleTheme}
            className={`relative shrink-0 rounded-full w-9 h-9 flex items-center justify-center transition-all duration-300 shadow-sm ml-1
              ${isDark
                ? 'bg-black/40 hover:bg-white/20'
                : 'bg-white/40 hover:bg-black/5'
              }
            `}
            aria-label="Toggle theme"
          >
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${isDark ? 'opacity-100 rotate-0 scale-100 text-yellow-400' : 'opacity-0 -rotate-90 scale-50'}`}>
              <Sun size={16} />
            </div>
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out ${!isDark ? 'opacity-100 rotate-0 scale-100 text-indigo-500' : 'opacity-0 rotate-90 scale-50 text-indigo-500'}`}>
              <Moon size={16} />
            </div>
          </button>
        )}

      </nav>
    </header>
  );
}
