import React from 'react';
import { Article } from '../types/news';
import { formatRelativeTime } from '../utils/formatters';
import { ArrowUpRight, Bookmark } from 'lucide-react';

interface QuickReadsListProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onToggleBookmark: (article: Article) => void;
}

export const QuickReadsList: React.FC<QuickReadsListProps> = ({
  articles,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  if (articles.length === 0) return null;

  return (
    <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900/60 p-6 mb-8">
      <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 mb-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
            Chronicle Briefs & Short Reads
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 font-sans mt-0.5">
            Rapid dispatches and ongoing developing stories
          </p>
        </div>
      </div>

      <div className="divide-y divide-stone-100 dark:divide-stone-800/80">
        {articles.map((article, idx) => {
          const indexNum = String(idx + 1).padStart(2, '0');
          const saved = isBookmarked(article.id);

          return (
            <div
              key={article.id}
              className="group py-3.5 flex items-start gap-4 hover:bg-stone-50/60 dark:hover:bg-stone-800/30 px-2 rounded-lg transition-colors"
            >
              {/* Editorial Numbering (Clean human editorial format §1.B) */}
              <span className="text-xs font-mono font-medium text-stone-400 dark:text-stone-500 pt-0.5 tabular-nums shrink-0">
                {indexNum}.
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1">
                  <span className="font-semibold text-stone-700 dark:text-stone-300 truncate max-w-[140px]">
                    {article.source.name}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{formatRelativeTime(article.publishedAt)}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{article.readTimeMinutes}m</span>
                </div>

                <h4
                  onClick={() => onSelectArticle(article)}
                  className="text-sm font-medium text-stone-900 dark:text-stone-100 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors cursor-pointer line-clamp-1"
                >
                  {article.title}
                </h4>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 pt-1">
                <button
                  onClick={() => onToggleBookmark(article)}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    saved
                      ? 'text-stone-900 dark:text-stone-100'
                      : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                  }`}
                  title={saved ? 'Remove bookmark' : 'Bookmark brief'}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${saved ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => onSelectArticle(article)}
                  className="p-1.5 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors cursor-pointer"
                  title="Open dispatch"
                >
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
