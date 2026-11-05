import React from 'react';
import { Search, X, RotateCw, ArrowUpDown } from 'lucide-react';
import { SortOption } from '../types/news';

interface SearchAndFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  onRefresh: () => void;
  isLoading: boolean;
  totalArticles: number;
}

const QUICK_TOPICS = ['Artificial Intelligence', 'Clean Energy', 'Space', 'Markets', 'Architecture'];

export const SearchAndFilterBar: React.FC<SearchAndFilterBarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  onRefresh,
  isLoading,
  totalArticles,
}) => {
  return (
    <div className="py-4 space-y-3">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search headlines, journalists, topics..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-600 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Controls: Sort and Refresh */}
        <div className="flex items-center gap-2.5 justify-end">
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg py-1.5 px-2.5 text-xs text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-400 cursor-pointer"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Earliest</option>
              <option value="read-time">Shortest Read</option>
            </select>
          </div>

          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg text-stone-700 dark:text-stone-300 transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh current edition"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Quick suggestions & result counter */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-stone-400 dark:text-stone-500 whitespace-nowrap">Suggested:</span>
          {QUICK_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => onSearchChange(searchQuery === topic ? '' : topic)}
              className={`px-2 py-0.5 rounded text-xs transition-colors cursor-pointer whitespace-nowrap ${
                searchQuery.toLowerCase() === topic.toLowerCase()
                  ? 'bg-stone-800 text-stone-100 dark:bg-stone-200 dark:text-stone-900 font-medium'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800/60'
              }`}
            >
              {topic}
            </button>
          ))}
        </div>

        <div className="text-stone-400 dark:text-stone-500 font-mono tabular-nums whitespace-nowrap">
          {totalArticles} {totalArticles === 1 ? 'dispatch' : 'dispatches'}
        </div>
      </div>
    </div>
  );
};
