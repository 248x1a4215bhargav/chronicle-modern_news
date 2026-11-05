export type NewsCategory = 
  | 'general' 
  | 'technology' 
  | 'business' 
  | 'science' 
  | 'entertainment' 
  | 'sports';

export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
    url?: string;
  };
  category: NewsCategory;
  author?: string;
  readTimeMinutes: number;
}

export interface BookmarkItem {
  article: Article;
  savedAt: string;
  notes: string;
  tags?: string[];
  lastEditedAt?: string;
}

export interface CategoryInfo {
  id: NewsCategory;
  label: string;
  tagline: string;
  rssUrl: string;
}

export type SortOption = 'latest' | 'oldest' | 'read-time';
