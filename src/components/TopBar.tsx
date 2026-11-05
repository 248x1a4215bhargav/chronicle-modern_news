import React from 'react';
import { Bookmark, Sun, Moon, Sparkles } from 'lucide-react';

interface TopBarProps {
  activeView: 'feed' | 'bookmarks';
  onSelectView: (view: 'feed' | 'bookmarks') => void;
  bookmarksCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeView,
  onSelectView,
  bookmarksCount,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-zone Top Bar Contract: Brand — Nav Links — 1 Primary Action */}
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectView('feed')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors whitespace-nowrap">
                CHRONICLE
              </span>
            </button>
          </div>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => onSelectView('feed')}
              className={`whitespace-nowrap pb-0.5 transition-colors cursor-pointer ${
                activeView === 'feed'
                  ? 'text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100 font-semibold'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
              }`}
            >
              Today's Dispatches
            </button>

            <button
              onClick={() => onSelectView('bookmarks')}
              className={`whitespace-nowrap pb-0.5 flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeView === 'bookmarks'
                  ? 'text-stone-900 dark:text-stone-100 border-b-2 border-stone-900 dark:border-stone-100 font-semibold'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200'
              }`}
            >
              <span>Saved & Notes</span>
              {bookmarksCount > 0 && (
                <span className="text-xs font-mono tabular-nums px-1.5 py-0.2 rounded-full bg-stone-200 text-stone-800 dark:bg-stone-800 dark:text-stone-200">
                  {bookmarksCount}
                </span>
              )}
            </button>

            <a
              href="#categories"
              onClick={(e) => {
                if (activeView !== 'feed') {
                  e.preventDefault();
                  onSelectView('feed');
                  setTimeout(() => {
                    document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              Sections
            </a>

            <div className="text-xs text-stone-400 dark:text-stone-500 font-serif italic hidden lg:inline">
              Daily Curated Edition
            </div>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onToggleTheme}
              className="p-2 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => onSelectView(activeView === 'feed' ? 'bookmarks' : 'feed')}
              className="flex md:hidden items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-stone-300 dark:border-stone-700 rounded-lg text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer whitespace-nowrap"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{activeView === 'feed' ? `Saved (${bookmarksCount})` : 'Feed'}</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
