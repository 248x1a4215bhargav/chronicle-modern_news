import React, { useState } from 'react';
import { Article } from '../types/news';
import { formatRelativeTime } from '../utils/formatters';
import { Bookmark, BookOpen, FileText } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  hasNotes?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
  hasNotes = false,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group flex flex-col h-full bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden hover:border-stone-400 dark:hover:border-stone-700 transition-all">
      {/* Thumbnail Aspect 4:3 Container (§3.B) */}
      <div 
        onClick={() => onSelectArticle(article)}
        className="relative w-full aspect-[4/3] bg-stone-100 dark:bg-stone-800 overflow-hidden cursor-pointer"
      >
        {article.urlToImage && !imageError ? (
          <img
            src={article.urlToImage}
            alt={article.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900 text-stone-400 dark:text-stone-500">
            <BookOpen className="w-8 h-8 mb-2 stroke-1" />
            <span className="text-xs font-serif italic text-center px-4">{article.source.name}</span>
          </div>
        )}

        {/* Quick bookmark float button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleBookmark(article);
          }}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all cursor-pointer shadow-sm ${
            isBookmarked
              ? 'bg-stone-900 text-white dark:bg-white dark:text-stone-900'
              : 'bg-white/90 dark:bg-stone-900/90 text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-800'
          }`}
          title={isBookmarked ? 'Saved to bookmarks' : 'Bookmark this story'}
          aria-label="Bookmark article"
        >
          <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Narrative & Body */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-stone-700 dark:text-stone-300">
              {article.source.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>{formatRelativeTime(article.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{article.readTimeMinutes}m</span>
            {hasNotes && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                  <FileText className="w-3 h-3" />
                  <span>Note</span>
                </span>
              </>
            )}
          </div>

          {/* Headline */}
          <h3 
            onClick={() => onSelectArticle(article)}
            style={{ textWrap: 'balance' }}
            className="text-base sm:text-lg font-serif font-bold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors cursor-pointer line-clamp-2"
          >
            {article.title}
          </h3>

          {/* Brief Description */}
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
            {article.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs">
          <span className="text-stone-400 dark:text-stone-500 italic font-serif truncate max-w-[150px]">
            {article.author ? `By ${article.author}` : article.category}
          </span>
          <button
            onClick={() => onSelectArticle(article)}
            className="font-medium text-stone-900 dark:text-stone-200 hover:underline cursor-pointer"
          >
            Read Article
          </button>
        </div>
      </div>
    </article>
  );
};
