import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Article, NewsCategory, SortOption } from './types/news';
import { fetchNewsByCategory } from './services/newsApi';
import { useBookmarks } from './hooks/useBookmarks';
import { useTheme } from './hooks/useTheme';
import { TopBar } from './components/TopBar';
import { CategoryNav } from './components/CategoryNav';
import { SearchAndFilterBar } from './components/SearchAndFilterBar';
import { HeroFeaturedArticle } from './components/HeroFeaturedArticle';
import { ArticleCard } from './components/ArticleCard';
import { QuickReadsList } from './components/QuickReadsList';
import { ArticleDetailModal } from './components/ArticleDetailModal';
import { BookmarksAndNotesView } from './components/BookmarksAndNotesView';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorState } from './components/ErrorState';
import { Footer } from './components/Footer';
import { FALLBACK_ARTICLES } from './data/mockNewsData';

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
    bookmarks,
    isBookmarked,
    getBookmark,
    toggleBookmark,
    updateNotes,
    addTag,
    removeTag,
    removeBookmark,
    totalBookmarks,
  } = useBookmarks();

  const [activeView, setActiveView] = useState<'feed' | 'bookmarks'>('feed');
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('general');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Search & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  // Dedicated Detail modal
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Fetch articles when category changes
  const loadArticles = useCallback(async (cat: NewsCategory) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchNewsByCategory(cat);
      setArticles(data);
    } catch (err: any) {
      console.error('Error fetching articles:', err);
      setError(err?.message || 'Failed to fetch dispatches.');
      // Fallback
      setArticles(FALLBACK_ARTICLES.filter((a) => a.category === cat));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadArticles(selectedCategory);
  }, [selectedCategory, loadArticles]);

  // Handle category selection
  const handleCategoryChange = (category: NewsCategory) => {
    setSelectedCategory(category);
    setSearchQuery('');
    if (activeView !== 'feed') {
      setActiveView('feed');
    }
  };

  // Filter and sort articles
  const displayedArticles = useMemo(() => {
    let result = [...articles];

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.source.name.toLowerCase().includes(q) ||
          (a.author && a.author.toLowerCase().includes(q))
      );
    }

    // Sort order
    if (sortBy === 'latest') {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else if (sortBy === 'read-time') {
      result.sort((a, b) => a.readTimeMinutes - b.readTimeMinutes);
    }

    return result;
  }, [articles, searchQuery, sortBy]);

  // 3-Tier Split for editorial layout when not searching
  const { leadArticle, primaryArticles, quickReadArticles } = useMemo(() => {
    if (searchQuery.trim() || displayedArticles.length < 3) {
      return {
        leadArticle: null,
        primaryArticles: displayedArticles,
        quickReadArticles: [],
      };
    }

    return {
      leadArticle: displayedArticles[0],
      primaryArticles: displayedArticles.slice(1, 7),
      quickReadArticles: displayedArticles.slice(7),
    };
  }, [displayedArticles, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors">
      
      {/* Top Bar with Strict 3-Zone Contract */}
      <TopBar
        activeView={activeView}
        onSelectView={setActiveView}
        bookmarksCount={totalBookmarks}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {activeView === 'bookmarks' ? (
          /* Bookmarks & Notes Dedicated View */
          <BookmarksAndNotesView
            bookmarks={bookmarks}
            onSelectArticle={setSelectedArticle}
            onRemoveBookmark={removeBookmark}
            onUpdateNotes={updateNotes}
            onAddTag={addTag}
            onRemoveTag={removeTag}
            onBackToFeed={() => setActiveView('feed')}
          />
        ) : (
          /* News Feed / Home Screen View */
          <div className="space-y-6">
            
            {/* Category Navigation */}
            <CategoryNav
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              isLoading={isLoading}
            />

            {/* Search and Filters */}
            <SearchAndFilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onRefresh={() => loadArticles(selectedCategory)}
              isLoading={isLoading}
              totalArticles={displayedArticles.length}
            />

            {/* Content Display: Loading, Error, or Articles */}
            {isLoading ? (
              <LoadingSkeleton />
            ) : error && displayedArticles.length === 0 ? (
              <ErrorState
                message={error}
                onRetry={() => loadArticles(selectedCategory)}
                onUseFallback={() => setArticles(FALLBACK_ARTICLES.filter((a) => a.category === selectedCategory))}
              />
            ) : displayedArticles.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-stone-300 dark:border-stone-800 rounded-2xl bg-white/50 dark:bg-stone-900/30">
                <p className="font-serif text-lg text-stone-700 dark:text-stone-300 mb-2">
                  No dispatches found matching "{searchQuery}"
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                  Try adjusting keywords or selecting another category.
                </p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 cursor-pointer"
                >
                  Clear Search Filter
                </button>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                
                {/* Salience Tier 1: Lead Story */}
                {leadArticle && (
                  <HeroFeaturedArticle
                    article={leadArticle}
                    onSelectArticle={setSelectedArticle}
                    isBookmarked={isBookmarked(leadArticle.id)}
                    onToggleBookmark={toggleBookmark}
                    hasNotes={Boolean(getBookmark(leadArticle.id)?.notes)}
                  />
                )}

                {/* Salience Tier 2: Primary Article Grid */}
                {primaryArticles.length > 0 && (
                  <div>
                    {leadArticle && (
                      <div className="flex items-center justify-between pb-3 mb-5 border-b border-stone-200 dark:border-stone-800">
                        <h3 className="text-sm font-sans font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                          {selectedCategory} Features & Analyses
                        </h3>
                        <span className="text-xs text-stone-400 font-mono tabular-nums">
                          {primaryArticles.length} items
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {primaryArticles.map((article) => {
                        const saved = isBookmarked(article.id);
                        const bData = getBookmark(article.id);

                        return (
                          <ArticleCard
                            key={article.id}
                            article={article}
                            onSelectArticle={setSelectedArticle}
                            isBookmarked={saved}
                            onToggleBookmark={toggleBookmark}
                            hasNotes={Boolean(bData?.notes)}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Salience Tier 3: Quick Reads / Department Column */}
                {quickReadArticles.length > 0 && (
                  <QuickReadsList
                    articles={quickReadArticles}
                    onSelectArticle={setSelectedArticle}
                    isBookmarked={isBookmarked}
                    onToggleBookmark={toggleBookmark}
                  />
                )}

              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Dedicated Detail View / Reader Modal */}
      <ArticleDetailModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        isBookmarked={selectedArticle ? isBookmarked(selectedArticle.id) : false}
        onToggleBookmark={toggleBookmark}
        bookmarkData={selectedArticle ? getBookmark(selectedArticle.id) : undefined}
        onUpdateNotes={updateNotes}
        onAddTag={addTag}
        onRemoveTag={removeTag}
      />

    </div>
  );
}
