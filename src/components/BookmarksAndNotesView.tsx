import React, { useState, useMemo } from 'react';
import { BookmarkItem, Article, NewsCategory } from '../types/news';
import { formatDate, formatRelativeTime } from '../utils/formatters';
import { 
  Bookmark, 
  FileText, 
  Trash2, 
  ExternalLink, 
  Search, 
  Download, 
  Copy, 
  Check, 
  Clock, 
  ArrowRight, 
  Tag as TagIcon,
  X,
  BookOpen
} from 'lucide-react';

interface BookmarksAndNotesViewProps {
  bookmarks: BookmarkItem[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onUpdateNotes: (articleId: string, notes: string) => void;
  onAddTag: (articleId: string, tag: string) => void;
  onRemoveTag: (articleId: string, tag: string) => void;
  onBackToFeed: () => void;
}

export const BookmarksAndNotesView: React.FC<BookmarksAndNotesViewProps> = ({
  bookmarks,
  onSelectArticle,
  onRemoveBookmark,
  onUpdateNotes,
  onAddTag,
  onRemoveTag,
  onBackToFeed,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [copiedAll, setCopiedAll] = useState(false);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tagInputMap, setTagInputMap] = useState<Record<string, string>>({});

  // Compute stats
  const totalReadMinutes = useMemo(() => {
    return bookmarks.reduce((acc, curr) => acc + (curr.article.readTimeMinutes || 3), 0);
  }, [bookmarks]);

  const articlesWithNotesCount = useMemo(() => {
    return bookmarks.filter((b) => b.notes && b.notes.trim().length > 0).length;
  }, [bookmarks]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    bookmarks.forEach((b) => {
      (b.tags || []).forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet);
  }, [bookmarks]);

  // Filter bookmarks by search, category, and tag
  const filteredBookmarks = useMemo(() => {
    return bookmarks.filter((item) => {
      // Category match
      if (selectedCategory !== 'all' && item.article.category !== selectedCategory) {
        return false;
      }

      // Tag match
      if (selectedTag !== 'all' && !(item.tags || []).includes(selectedTag)) {
        return false;
      }

      // Search match (title, description, source, notes)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.article.title.toLowerCase().includes(query);
        const matchesDesc = item.article.description.toLowerCase().includes(query);
        const matchesSource = item.article.source.name.toLowerCase().includes(query);
        const matchesNotes = (item.notes || '').toLowerCase().includes(query);
        const matchesTags = (item.tags || []).some((t) => t.toLowerCase().includes(query));

        return matchesTitle || matchesDesc || matchesSource || matchesNotes || matchesTags;
      }

      return true;
    });
  }, [bookmarks, searchQuery, selectedCategory, selectedTag]);

  // Export notes as Markdown file
  const handleExportMarkdown = () => {
    let md = `# Chronicle Reader — Personal Notebook & Saved Dispatches\n`;
    md += `*Exported on ${new Date().toLocaleDateString()} · Total saved: ${bookmarks.length} articles*\n\n---\n\n`;

    bookmarks.forEach((item, idx) => {
      md += `### ${idx + 1}. [${item.article.title}](${item.article.url})\n`;
      md += `- **Source**: ${item.article.source.name}\n`;
      md += `- **Published**: ${formatDate(item.article.publishedAt)}\n`;
      md += `- **Category**: ${item.article.category}\n`;
      if (item.tags && item.tags.length > 0) {
        md += `- **Tags**: ${item.tags.map((t) => `#${t}`).join(' ')}\n`;
      }
      md += `\n**Article Excerpt:**\n> ${item.article.description}\n\n`;
      if (item.notes && item.notes.trim()) {
        md += `**Personal Notes & Thoughts:**\n${item.notes}\n\n`;
      } else {
        md += `*No notes recorded for this dispatch.*\n\n`;
      }
      md += `---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chronicle-notes-${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Copy all notes to clipboard
  const handleCopyAll = () => {
    let text = `CHRONICLE SAVED ARTICLES & NOTES\n\n`;
    bookmarks.forEach((item, idx) => {
      text += `[${idx + 1}] ${item.article.title}\nSource: ${item.article.source.name} | Link: ${item.article.url}\n`;
      if (item.notes) {
        text += `Notes: ${item.notes}\n`;
      }
      text += `\n----------------------------------------\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleTagInputSubmit = (articleId: string, e: React.FormEvent) => {
    e.preventDefault();
    const tag = tagInputMap[articleId] || '';
    if (!tag.trim()) return;
    onAddTag(articleId, tag.trim());
    setTagInputMap((prev) => ({ ...prev, [articleId]: '' }));
  };

  return (
    <div className="py-6 space-y-8 animate-fade-in">
      
      {/* Header & Metrics Strip */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900/60 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100">
              Saved Notes & Bookmarks
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
              Your curated archive of articles, research annotations, and personal insights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {bookmarks.length > 0 && (
              <>
                <button
                  onClick={handleExportMarkdown}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  title="Download all notes as a Markdown document"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Markdown</span>
                </button>

                <button
                  onClick={handleCopyAll}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
                  title="Copy formatted text to clipboard"
                >
                  {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAll ? 'Copied' : 'Copy All'}</span>
                </button>
              </>
            )}

            <button
              onClick={onBackToFeed}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors cursor-pointer"
            >
              <span>Explore Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Metric Salience Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6">
          <div>
            <span className="text-xs font-sans text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
              Saved Dispatches
            </span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
              {bookmarks.length}
            </span>
          </div>

          <div>
            <span className="text-xs font-sans text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
              Articles With Notes
            </span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
              {articlesWithNotesCount}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="text-xs font-sans text-stone-500 dark:text-stone-400 uppercase tracking-wider block">
              Estimated Reading Queue
            </span>
            <span className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 dark:text-stone-100 font-mono tabular-nums">
              {totalReadMinutes} <span className="text-sm font-sans font-normal text-stone-500">mins</span>
            </span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {bookmarks.length === 0 ? (
        <div className="text-center py-16 px-4 border border-dashed border-stone-300 dark:border-stone-800 rounded-2xl bg-white/50 dark:bg-stone-900/30">
          <Bookmark className="w-12 h-12 mx-auto text-stone-400 dark:text-stone-600 mb-4 stroke-1" />
          <h3 className="text-lg font-serif font-semibold text-stone-900 dark:text-stone-100 mb-2">
            No Bookmarks or Notes Yet
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto mb-6">
            Click the bookmark icon on any dispatch to save it here for later reading, and jot down personal research notes directly attached to the story.
          </p>
          <button
            onClick={onBackToFeed}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <span>Browse Today's News</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search within saved dispatches & personal notes..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg py-2 px-3 text-stone-700 dark:text-stone-300 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="general">General</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="science">Science</option>
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
              </select>

              {allTags.length > 0 && (
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="text-xs bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg py-2 px-3 text-stone-700 dark:text-stone-300 focus:outline-none"
                >
                  <option value="all">All Tags</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      #{tag}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Bookmarks List */}
          <div className="space-y-6">
            {filteredBookmarks.length === 0 ? (
              <div className="py-12 text-center text-sm text-stone-500">
                No saved articles match your current search and filters.
              </div>
            ) : (
              filteredBookmarks.map((item) => {
                const isEditing = editingNotesId === item.article.id;

                return (
                  <div
                    key={item.article.id}
                    className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900/60 overflow-hidden p-5 sm:p-6 transition-all hover:border-stone-300 dark:hover:border-stone-700"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      
                      {/* Left: Article summary */}
                      <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                        <div>
                          {/* Unboxed Metadata */}
                          <div className="flex items-center flex-wrap gap-2 text-xs text-stone-500 dark:text-stone-400 mb-2">
                            <span className="font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
                              {item.article.category}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>{item.article.source.name}</span>
                            <span aria-hidden="true">·</span>
                            <span>Saved {formatRelativeTime(item.savedAt)}</span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">{item.article.readTimeMinutes}m read</span>
                          </div>

                          <h3
                            onClick={() => onSelectArticle(item.article)}
                            className="text-lg sm:text-xl font-serif font-bold text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-300 transition-colors cursor-pointer leading-snug"
                          >
                            {item.article.title}
                          </h3>

                          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 line-clamp-2">
                            {item.article.description}
                          </p>
                        </div>

                        {/* Article Actions */}
                        <div className="flex items-center gap-3 pt-2">
                          <button
                            onClick={() => onSelectArticle(item.article)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-900 dark:text-stone-100 hover:underline cursor-pointer"
                          >
                            <span>Open Reader Mode</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <a
                            href={item.article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 transition-colors"
                          >
                            <span>Original Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          <button
                            onClick={() => onRemoveBookmark(item.article.id)}
                            className="ml-auto p-1.5 text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                            title="Remove from saved articles"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Right: Personal Note & Annotation Canvas */}
                      <div className="md:col-span-5 bg-stone-50 dark:bg-stone-950/80 p-4 rounded-xl border border-stone-200 dark:border-stone-800 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                              <FileText className="w-3.5 h-3.5 text-stone-500" />
                              <span>Personal Note</span>
                            </span>
                            {item.lastEditedAt && (
                              <span className="text-[10px] text-stone-400 font-mono">
                                Edited {formatRelativeTime(item.lastEditedAt)}
                              </span>
                            )}
                          </div>

                          <textarea
                            value={item.notes}
                            onChange={(e) => onUpdateNotes(item.article.id, e.target.value)}
                            placeholder="Add personal notes, reflections, or action items..."
                            rows={3}
                            className="w-full text-xs p-2.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 leading-relaxed resize-y"
                          />
                        </div>

                        {/* Tagging */}
                        <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800">
                          <div className="flex items-center flex-wrap gap-1.5 mb-2">
                            {(item.tags || []).map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                              >
                                <span>#{t}</span>
                                <button
                                  onClick={() => onRemoveTag(item.article.id, t)}
                                  className="hover:text-red-500 cursor-pointer"
                                  title="Remove tag"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>

                          <form
                            onSubmit={(e) => handleTagInputSubmit(item.article.id, e)}
                            className="flex items-center gap-1"
                          >
                            <input
                              type="text"
                              value={tagInputMap[item.article.id] || ''}
                              onChange={(e) =>
                                setTagInputMap((prev) => ({
                                  ...prev,
                                  [item.article.id]: e.target.value,
                                }))
                              }
                              placeholder="+ Add tag (e.g. thesis, tech)..."
                              className="w-full text-[11px] px-2 py-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded text-stone-800 dark:text-stone-200 focus:outline-none"
                            />
                          </form>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}

    </div>
  );
};
