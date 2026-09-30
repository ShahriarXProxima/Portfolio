import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { HoverButton } from './HoverButton';
import BackgroundMusic from './BackgroundMusic';

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
    { name: 'Skills', id: 'skills' },
    { name: 'Design', id: 'design' },
    { name: 'Xp', id: 'work' },
    {name: 'Projects', id:'projects'},
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
    <header className={`fixed top-4 md:top-8 left-1/2 -translate-x-1/2 w-full max-w-[1600px] 2xl:max-w-[92vw] px-4 md:px-8 z-50 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-12 opacity-0 pointer-events-none'}`}>
      <div className="flex items-center justify-between w-full">

        {/* Left Pill: Logo and Links */}
        <nav className="flex items-center gap-6 md:gap-8 bg-white dark:bg-[#111] rounded-full py-3 md:py-4 px-6 md:px-8 shadow-lg shadow-black/5 dark:shadow-white/5 border border-black/5 dark:border-white/10 transition-colors duration-300">

          {/* Logo (Rounded Rectangle Outline) */}
          <div
            onClick={handleLogoClick}
            className="w-10 h-6 md:w-12 md:h-7 border-[3px] border-black dark:border-white rounded-full cursor-pointer hover:opacity-70 transition-opacity shrink-0"
            title="Home"
          />

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.filter(item => item.id !== 'contact').map((item) => (
              <div
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer transition-colors"
              >
                {item.name}
              </div>
            ))}
          </div>

          {/* Mobile Links (Compacted) */}
          <div className="flex md:hidden items-center gap-4 overflow-x-auto no-scrollbar">
            {navItems.filter(item => item.id !== 'contact').map((item) => (
              <div
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer whitespace-nowrap"
              >
                {item.name}
              </div>
            ))}
          </div>
        </nav>

        {/* Right Section: Music & Hire Me Pill */}
        <div className="flex items-center gap-3">
          <BackgroundMusic />
          
          <div
            onClick={() => handleScroll('contact')}
            className="flex items-center gap-3 md:gap-4 bg-white dark:bg-[#111] rounded-full p-2 md:p-2.5 pr-5 md:pr-6 shadow-lg shadow-black/5 dark:shadow-white/5 border border-black/5 dark:border-white/10 cursor-pointer group transition-colors duration-300 shrink-0"
          >
            {/* Black square acting as theme toggle wrapper inside the contact pill */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                if (toggleTheme) toggleTheme();
              }}
              className="w-8 h-8 md:w-10 md:h-10 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black hover:opacity-80 transition-opacity"
              title="Toggle Theme"
            >
              <div className={`absolute flex items-center justify-center transition-all duration-500 ease-in-out ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
                <Sun size={16} />
              </div>
              <div className={`absolute flex items-center justify-center transition-all duration-500 ease-in-out ${!isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
                <Moon size={16} />
              </div>
            </div>

            <span className="text-xs md:text-sm font-semibold text-black dark:text-white group-hover:opacity-70 transition-opacity">
              Hire Me
            </span>
          </div>
        </div>

      </div>
    </header>
  );
}
