import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import WorkExperience from './components/WorkExperience';
import Projects from './components/Projects';
import Articles from './components/Articles';
import Design from './components/Design';
import Footer from './components/Footer';
import ArticleDetail from './components/ArticleDetail';
import StaticStrip from './components/StaticStrip';
import CautionStrip from './components/CautionStrip';
import ShimmerBackground from './components/ShimmerBackground';
import LoadingScreen from './components/LoadingScreen';
import ScrollReveal from './components/ScrollReveal';
import ScrollOverlay from './components/ScrollOverlay';
import footerBg from '../resources/assets/footer.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [showLoading, setShowLoading] = useState(true);
  const parallaxBgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(parallaxBgRef.current, {
      yPercent: 20, // Parallax effect
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // Lock body scroll during loading
  useEffect(() => {
    if (showLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLoading]);

  // Sync hash routing e.g. #article/kafka-springboot or section scrolling
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#article/')) {
        const articleId = hash.replace('#article/', '');
        setSelectedArticleId(articleId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setSelectedArticleId(null);
        if (hash) {
          const sectionId = hash.replace('#', '');
          setTimeout(() => {
            const el = document.getElementById(sectionId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const openArticle = (id: string) => {
    setSelectedArticleId(id);
    window.location.hash = `#article/${id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeArticle = () => {
    setSelectedArticleId(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isDark, setIsDark] = useState(true); // Dark mode by default

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  if (selectedArticleId) {
    return (
      <ArticleDetail
        articleId={selectedArticleId}
        onBack={closeArticle}
        onSelectArticle={openArticle}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />
    );
  }

  return (
    <>
      <ScrollOverlay />
      {showLoading && <LoadingScreen onComplete={() => setShowLoading(false)} />}
      <div className="min-h-screen font-sans transition-colors duration-300 text-gray-900 dark:text-white">
        <ShimmerBackground isDark={isDark} />
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main className="relative z-10">
          <Hero />

          <div className="relative flex flex-col pb-0 pt-0 overflow-hidden">
            <div
              ref={parallaxBgRef}
              className="absolute inset-0 z-0 w-full h-full"
              style={{
                backgroundImage: `url(${footerBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(20px)',
                transform: 'scaleX(1.05) scaleY(-1.05)'
              }}
            />

            <div className="relative z-10 w-full">
              <StaticStrip title="ABOUT" direction="left" />
              <ScrollReveal><About /></ScrollReveal>
              <StaticStrip title="SKILLS" direction="right" />
              <ScrollReveal><Skills /></ScrollReveal>
              <StaticStrip title="DESIGN" direction="left" />
              <ScrollReveal><Design /></ScrollReveal>
              <StaticStrip title="EXPERIENCE" direction="right" />
              <ScrollReveal><WorkExperience /></ScrollReveal>
              <StaticStrip title="PROJECTS" direction="left" />
              <ScrollReveal><Projects /></ScrollReveal>
              <StaticStrip title="ARTICLES" direction="right" />
              <ScrollReveal><Articles onSelectArticle={openArticle} /></ScrollReveal>
            </div>
          </div>
          <CautionStrip />
        </main>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
