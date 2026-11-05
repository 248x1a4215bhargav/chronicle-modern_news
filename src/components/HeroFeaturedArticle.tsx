import React, { useState } from 'react';
import { Article } from '../types/news';
import { formatRelativeTime } from '../utils/formatters';
import { Bookmark, ArrowRight, BookOpen, FileText } from 'lucide-react';

interface HeroFeaturedArticleProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  hasNotes?: boolean;
}

export const HeroFeaturedArticle: React.FC<HeroFeaturedArticleProps> = ({
  article,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  hasNotes = false,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group relative border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900/60 overflow-hidden mb-8 transition-all hover:border-stone-400 dark:hover:border-stone-700">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
        
        {/* Left Column: Image (7 cols on desktop) */}
        <div 
          onClick={() => onSelectArticle(article)}
          className="lg:col-span-7 relative h-72 sm:h-96 lg:h-full min-h-[320px] bg-stone-100 dark:bg-stone-800 overflow-hidden cursor-pointer"
        >
          {article.urlToImage && !imageError ? (
            <img
              src={article.urlToImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-900 text-stone-500 dark:text-stone-400">
              <BookOpen className="w-12 h-12 mb-2 stroke-1" />
              <span className="text-sm font-serif italic text-center max-w-xs">{article.source.name}</span>
            </div>
          )}

          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />
        </div>

        {/* Right Column: Narrative & Metadata (5 cols on desktop) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Zero-Pill Unboxed Metadata (§1.A) */}
            <div className="flex items-center flex-wrap gap-2 text-xs text-stone-500 dark:text-stone-400 font-sans tracking-wide">
              <span className="uppercase tracking-wider font-semibold text-stone-700 dark:text-stone-300">
                {article.source.name}
              </span>
              <span aria-hidden="true">·</span>
              <span>{formatRelativeTime(article.publishedAt)}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums">{article.readTimeMinutes} min read</span>
              {hasNotes && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                    <FileText className="w-3 h-3" />
                    <span>Has Note</span>
                  </span>
                </>
              )}
            </div>

            {/* Salience Tier 1 Headline */}
            <h2 
              onClick={() => onSelectArticle(article)}
              style={{ textWrap: 'balance' }}
              className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors cursor-pointer"
            >
              {article.title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400 line-clamp-3 leading-relaxed font-sans">
              {article.description}
            </p>

            {article.author && (
              <div className="text-xs text-stone-500 dark:text-stone-400 italic font-serif">
                By {article.author}
              </div>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-6 mt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
            <button
              onClick={() => onSelectArticle(article)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors cursor-pointer"
            >
              <span>Read Full Dispatch</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(article);
              }}
              className={`p-2.5 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-stone-900 border-stone-900 text-white dark:bg-stone-100 dark:border-stone-100 dark:text-stone-900'
                  : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:border-stone-400'
              }`}
              title={isBookmarked ? 'Remove from Saved Articles' : 'Save for Later & Add Notes'}
              aria-label="Bookmark article"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>

        </div>

      </div>
    </article>
  );
};
