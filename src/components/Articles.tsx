import { ArrowRight } from 'lucide-react';
import { ARTICLES_DATA, Article } from '../data/articles';
import { HoverButton } from './HoverButton';

interface ArticlesProps {
  onSelectArticle?: (id: string) => void;
}

export default function Articles({ onSelectArticle }: ArticlesProps) {
  const handleArticleClick = (id: string) => {
    if (onSelectArticle) {
      onSelectArticle(id);
    }
  };

  // Split articles into two rows for the carousel
  const midIndex = Math.ceil(ARTICLES_DATA.length / 2);
  const row1 = ARTICLES_DATA.slice(0, midIndex);
  const row2 = ARTICLES_DATA.slice(midIndex);

  const ArticleCard = ({ article }: { article: Article }) => (
    <div
      onClick={() => handleArticleClick(article.id)}
      className="w-[320px] md:w-[420px] shrink-0 bg-white/10 dark:bg-white/5 backdrop-blur-xl rounded-xl p-6 md:p-8 flex flex-col justify-between min-h-[320px] group hover:scale-105 transition-all duration-500 cursor-pointer shadow-xl mx-4 border border-white/10 hover:border-orange-vivid/70 hover:shadow-orange-vivid/20"
    >
      <div className="space-y-4">
        <h3 className="text-2xl font-bold font-jetbrains leading-tight text-black dark:text-white group-hover:text-orange-vivid transition-colors drop-shadow-sm">
          {article.title}
        </h3>
        <p className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-relaxed drop-shadow-sm line-clamp-3">
          {article.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-8 mt-auto">
        <HoverButton
          onClick={(e) => {
            e.stopPropagation();
            handleArticleClick(article.id);
          }}
          className="bg-orange-vivid text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-orange-vivid/80 transition-colors cursor-pointer border border-transparent shadow-lg"
        >
          Read more
        </HoverButton>
        <div className="bg-orange-vivid text-white p-2 rounded-full group-hover:bg-orange-vivid/80 group-hover:scale-110 transition-transform border border-transparent shadow-lg">
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );

  return (
    <section id="articles" className="py-16 md:py-24 w-full max-w-full flex flex-col justify-center space-y-16 bg-transparent overflow-hidden">
      <div className="px-4 md:px-12 w-full flex justify-center">
        <h2 className="text-5xl md:text-6xl font-jetbrains font-medium text-black dark:text-white drop-shadow-md">Articles</h2>
      </div>

      <div className="relative w-full flex flex-col gap-8 overflow-hidden group/section">
        {/* Row 1 - Moving right to left */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {[...row1, ...row1].map((article, index) => (
            <ArticleCard key={`row1-${article.id}-${index}`} article={article} />
          ))}
        </div>
        
        {/* Row 2 - Moving left to right */}
        <div 
          className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]" 
          style={{ animationDuration: '45s' }}
        >
          {[...row2, ...row2].map((article, index) => (
            <ArticleCard key={`row2-${article.id}-${index}`} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
