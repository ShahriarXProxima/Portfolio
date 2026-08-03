import { useState, useEffect } from 'react';
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
import ScrollBackground from './components/ScrollBackground';

export default function App() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

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
    <div className="min-h-screen font-sans transition-colors duration-300 text-gray-900 dark:text-white">
      <ScrollBackground />
      <div className="fixed inset-0 z-0 pointer-events-none bg-graph-paper"></div>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <main className="relative z-10">
        <Hero />

        <div className="flex flex-col pb-0 pt-0">
          <StaticStrip title="ABOUT" direction="left" />
          <About />
          <StaticStrip title="SKILLS" direction="right" />
          <Skills />
          <StaticStrip title="DESIGN" direction="left" />
          <Design />
          <StaticStrip title="EXPERIENCE" direction="right" />
          <WorkExperience />
          <StaticStrip title="PROJECTS" direction="left" />
          <Projects />
          <StaticStrip title="ARTICLES" direction="right" />
          <Articles onSelectArticle={openArticle} />
        </div>
        <CautionStrip />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
