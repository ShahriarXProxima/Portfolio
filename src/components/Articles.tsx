import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ARTICLES_DATA } from '../data/articles';

interface ArticlesProps {
  onSelectArticle?: (id: string) => void;
}

export default function Articles({ onSelectArticle }: ArticlesProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(ARTICLES_DATA.length / itemsPerPage);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 4000); // 4 seconds interval for auto-play
    return () => clearInterval(interval);
  }, [totalPages]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handleArticleClick = (id: string) => {
    if (onSelectArticle) {
      onSelectArticle(id);
    }
  };

  return (
    <section id="articles" className="px-4 md:px-12 py-12 md:py-16 w-full max-w-full flex flex-col justify-center space-y-16 bg-blue-vivid/20 dark:bg-blue-vivid/40 backdrop-blur-xl border-y border-blue-vivid/30">
      <h2 className="text-5xl md:text-6xl font-mono font-medium text-center md:text-right text-black dark:text-white drop-shadow-md">Articles</h2>

      <div className="overflow-hidden relative w-full">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentPage * 100}%)` }}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div key={pageIndex} className="w-full shrink-0 flex-none grid grid-cols-1 md:grid-cols-3 gap-6">
              {ARTICLES_DATA.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage).map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article.id)}
                  className="bg-white/40 dark:bg-primary/40 backdrop-blur-xl border border-blue-vivid/30 dark:border-blue-vivid/50 rounded-2xl md:rounded-tl-[3rem] md:rounded-br-[3rem] p-6 md:p-8 flex flex-col justify-between min-h-[300px] group hover:scale-[1.02] transition-all cursor-pointer shadow-2xl hover:border-accent dark:hover:border-accent"
                >
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold font-mono leading-tight text-black dark:text-white group-hover:text-orange-vivid dark:group-hover:text-orange-vivid transition-colors drop-shadow-sm">{article.title}</h3>
                    <p className="text-blue-deep dark:text-blue-pale text-sm font-medium leading-relaxed drop-shadow-sm">
                      {article.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-8 mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArticleClick(article.id);
                      }}
                      className="bg-orange-vivid text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-orange-vivid/80 transition-colors cursor-pointer border border-transparent shadow-lg"
                    >
                      Read more
                    </button>
                    <div className="bg-orange-vivid text-white p-2 rounded-xl group-hover:bg-orange-vivid/80 group-hover:scale-110 transition-all border border-transparent shadow-lg">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 pt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i)}
            className={`w-10 h-10 rounded-xl font-mono font-bold flex items-center justify-center transition-colors cursor-pointer shadow-lg ${currentPage === i
                ? 'bg-orange-vivid text-white border border-transparent'
                : 'bg-white/40 dark:bg-primary/40 border border-blue-vivid/30 text-blue-deep dark:text-white hover:bg-orange-vivid/20 dark:hover:border-orange-vivid'
              }`}
            aria-label={`Go to page ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-xl bg-white/40 dark:bg-primary/40 border border-blue-vivid/30 text-blue-deep dark:text-white flex items-center justify-center hover:bg-orange-vivid/20 dark:hover:border-orange-vivid transition-colors cursor-pointer shadow-lg"
          aria-label="Next page"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
