import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Tag } from 'lucide-react';
import { ARTICLES_DATA, Article } from '../data/articles';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollBackground from './ScrollBackground';

interface ArticleDetailProps {
  articleId: string;
  onBack: () => void;
  onSelectArticle: (id: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}

export default function ArticleDetail({ articleId, onBack, onSelectArticle, isDark, toggleTheme }: ArticleDetailProps) {
  const article: Article | undefined = ARTICLES_DATA.find((a) => a.id === articleId) || ARTICLES_DATA[0];

  const otherArticles = ARTICLES_DATA.filter((a) => a.id !== article.id);

  return (
    <div className="min-h-screen bg-transparent text-gray-900 dark:text-white selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black font-sans transition-colors duration-300">
      <ScrollBackground />
      
      {/* Header / Navbar */}
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-12 pt-12 pb-24 space-y-12 bg-white/40 dark:bg-blue-vivid/20 backdrop-blur-md rounded-2xl md:rounded-tl-[4rem] md:rounded-br-[4rem] border border-blue-vivid/30 dark:border-blue-vivid/50 shadow-2xl mt-32 mb-12">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex items-center justify-between border-b border-gray-200/50 dark:border-white/10 pb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-3 text-sm font-mono text-gray-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md border border-gray-300/50 dark:border-white/10 px-5 py-2.5 rounded-full cursor-pointer hover:border-gray-400 dark:hover:border-white/30"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-blue-deep dark:text-blue-pale font-bold">
            <span>Articles</span>
            <span>/</span>
            <span className="text-black dark:text-white truncate max-w-[200px] drop-shadow-sm">{article.id}</span>
          </div>
        </div>

        {/* Article Meta Header */}
        <header className="space-y-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="px-3.5 py-1.5 rounded-full border border-gray-200/50 dark:border-white/10 text-xs font-mono text-gray-700 dark:text-zinc-300 bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md flex items-center gap-1.5 shadow-sm"
              >
                <Tag size={12} className="text-gray-500 dark:text-zinc-500" />
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-mono font-bold leading-tight text-black dark:text-white tracking-tight drop-shadow-md">
            {article.title}
          </h1>

          {/* Author & Publish Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-gray-200/50 dark:border-white/5">
            <div className="flex items-center gap-4">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-white/10 shadow-sm"
              />
              <div>
                <div className="text-base font-bold text-black dark:text-white drop-shadow-sm">{article.author.name}</div>
                <div className="text-xs font-mono text-blue-deep dark:text-blue-pale font-bold">{article.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs font-mono text-blue-deep dark:text-blue-pale font-bold">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-blue-deep dark:text-blue-pale" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-blue-deep dark:text-blue-pale" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden bg-gray-100 dark:bg-secondary border border-gray-200/50 dark:border-secondary/50 relative group shadow-xl">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Lead Paragraph */}
        <div className="p-8 rounded-xl bg-white/40 dark:bg-blue-deep/40 backdrop-blur-md border border-gray-200/50 dark:border-blue-deep space-y-4 shadow-sm">
          <p className="text-lg md:text-xl text-black dark:text-white font-serif leading-relaxed italic font-medium drop-shadow-sm">
            "{article.description}"
          </p>
        </div>

        {/* Article Body Sections */}
        <article className="space-y-12 text-black dark:text-white leading-relaxed font-serif text-lg font-medium drop-shadow-sm">
          {article.sections.map((section, idx) => (
            <section key={idx} className="space-y-6">
              {section.heading && (
                <h2 className="text-2xl md:text-3xl font-mono font-bold text-black dark:text-white pt-4 border-t border-gray-200/50 dark:border-white/5">
                  {section.heading}
                </h2>
              )}

              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {para}
                </p>
              ))}

              {/* Bullets */}
              {section.bullets && (
                <ul className="space-y-3 pl-6 list-disc font-sans text-base text-gray-700 dark:text-zinc-300">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {/* Code Snippet */}
              {section.codeBlock && (
                <div className="rounded-xl overflow-hidden bg-white/40 dark:bg-primary/80 backdrop-blur-md border border-gray-200/50 dark:border-secondary/50 my-6 font-mono text-sm shadow-xl">
                  <div className="px-6 py-3 bg-gray-200/50 dark:bg-zinc-900/50 border-b border-gray-300/50 dark:border-white/10 flex items-center justify-between text-xs text-gray-700 dark:text-zinc-400">
                    <span className="uppercase tracking-wider font-bold">{section.codeBlock.language}</span>
                    <span className="text-gray-500 dark:text-zinc-500">Snippet</span>
                  </div>
                  <pre className="p-6 overflow-x-auto text-gray-900 dark:text-zinc-100 leading-relaxed font-medium">
                    <code>{section.codeBlock.code}</code>
                  </pre>
                </div>
              )}

              {/* Quote */}
              {section.quote && (
                <blockquote className="my-8 p-6 md:p-8 rounded-xl md:rounded-tl-[2rem] md:rounded-br-[2rem] bg-white/40 dark:bg-blue-pale/20 backdrop-blur-md border border-gray-200/50 dark:border-blue-pale/50 text-xl font-serif italic text-black dark:text-white shadow-sm flex gap-4 items-start drop-shadow-sm">
                  <span className="text-4xl text-orange-vivid dark:text-orange-vivid font-serif leading-none">"</span>
                  <div className="pt-2">{section.quote}</div>
                </blockquote>
              )}
            </section>
          ))}
        </article>

        {/* Share & Back Controls */}
        <div className="pt-12 border-t border-gray-200/50 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={onBack}
            className="bg-gray-100/80 dark:bg-white/90 text-gray-900 dark:text-black border border-gray-200/50 dark:border-transparent px-8 py-3 rounded-full font-bold flex items-center gap-3 hover:bg-white dark:hover:bg-gray-100 transition-colors cursor-pointer shadow-md"
          >
            <ArrowLeft size={16} />
            Return to Main Portfolio
          </button>

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Article URL copied to clipboard!');
              }
            }}
            className="text-xs font-mono text-gray-600 dark:text-zinc-300 hover:text-black dark:hover:text-white flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 dark:bg-zinc-800/50 backdrop-blur-md border border-gray-300/50 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 transition-colors cursor-pointer shadow-sm"
          >
            <Share2 size={14} />
            Share Article
          </button>
        </div>

        {/* More Articles Section */}
        <div className="pt-16 space-y-8 border-t border-gray-200/50 dark:border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl md:text-3xl font-mono font-medium text-gray-900 dark:text-white">
              More Articles
            </h3>
            <span className="text-xs font-mono text-gray-500 dark:text-zinc-500">Explore more posts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherArticles.slice(0, 2).map((other) => (
              <div
                key={other.id}
                onClick={() => onSelectArticle(other.id)}
                className="bg-white/40 dark:bg-blue-deep/30 backdrop-blur-md border border-gray-200/50 dark:border-blue-deep/50 hover:border-accent dark:hover:border-accent rounded-xl md:rounded-tl-[2rem] md:rounded-br-[2rem] p-6 flex flex-col justify-between group cursor-pointer transition-all hover:scale-[1.02] shadow-lg"
              >
                <div className="space-y-4">
                  <div className="text-xs font-mono text-blue-deep dark:text-blue-pale font-bold">{other.date}</div>
                  <h4 className="text-xl font-bold font-mono text-black dark:text-white leading-tight group-hover:text-orange-vivid dark:group-hover:text-orange-vivid transition-colors drop-shadow-sm">
                    {other.title}
                  </h4>
                  <p className="text-black dark:text-white text-sm font-medium leading-relaxed line-clamp-2 drop-shadow-sm">
                    {other.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 mt-4 border-t border-gray-200/50 dark:border-white/10">
                  <span className="text-xs font-mono text-gray-900 dark:text-white group-hover:underline font-bold">Read article</span>
                  <div className="bg-gray-100 dark:bg-white text-gray-900 dark:text-black p-2 rounded-full group-hover:scale-110 transition-transform shadow-md">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="relative z-10">
        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
