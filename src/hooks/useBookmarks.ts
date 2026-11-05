import { useState, useEffect, useCallback } from 'react';
import { Article, BookmarkItem } from '../types/news';

const STORAGE_KEY = 'chronicle_bookmarks_v1';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse bookmarks from localStorage', e);
    }
    return [];
  });

  // Keep localStorage in sync
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to persist bookmarks to localStorage', e);
    }
  }, [bookmarks]);

  const isBookmarked = useCallback(
    (articleId: string) => {
      return bookmarks.some((b) => b.article.id === articleId);
    },
    [bookmarks]
  );

  const getBookmark = useCallback(
    (articleId: string) => {
      return bookmarks.find((b) => b.article.id === articleId);
    },
    [bookmarks]
  );

  const toggleBookmark = useCallback((article: Article) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.article.id === article.id);
      if (exists) {
        return prev.filter((b) => b.article.id !== article.id);
      } else {
        const newBookmark: BookmarkItem = {
          article,
          savedAt: new Date().toISOString(),
          notes: '',
          tags: [],
        };
        return [newBookmark, ...prev];
      }
    });
  }, []);

  const updateNotes = useCallback((articleId: string, notes: string) => {
    setBookmarks((prev) =>
      prev.map((item) => {
        if (item.article.id === articleId) {
          return {
            ...item,
            notes,
            lastEditedAt: new Date().toISOString(),
          };
        }
        return item;
      })
    );
  }, []);

  const addTag = useCallback((articleId: string, tag: string) => {
    const trimmed = tag.trim().toLowerCase();
    if (!trimmed) return;
    setBookmarks((prev) =>
      prev.map((item) => {
        if (item.article.id === articleId) {
          const existingTags = item.tags || [];
          if (!existingTags.includes(trimmed)) {
            return {
              ...item,
              tags: [...existingTags, trimmed],
              lastEditedAt: new Date().toISOString(),
            };
          }
        }
        return item;
      })
    );
  }, []);

  const removeTag = useCallback((articleId: string, tagToRemove: string) => {
    setBookmarks((prev) =>
      prev.map((item) => {
        if (item.article.id === articleId) {
          return {
            ...item,
            tags: (item.tags || []).filter((t) => t !== tagToRemove),
            lastEditedAt: new Date().toISOString(),
          };
        }
        return item;
      })
    );
  }, []);

  const removeBookmark = useCallback((articleId: string) => {
    setBookmarks((prev) => prev.filter((b) => b.article.id !== articleId));
  }, []);

  const clearAllBookmarks = useCallback(() => {
    setBookmarks([]);
  }, []);

  return {
    bookmarks,
    isBookmarked,
    getBookmark,
    toggleBookmark,
    updateNotes,
    addTag,
    removeTag,
    removeBookmark,
    clearAllBookmarks,
    totalBookmarks: bookmarks.length,
  };
}
