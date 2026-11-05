import { Article, NewsCategory } from '../types/news';
import { CATEGORIES, FALLBACK_ARTICLES } from '../data/mockNewsData';

// Helper to strip HTML tags and clean text
function stripHtml(html: string): string {
  if (!html) return '';
  const text = html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/\s+/g, ' ')
    .trim();
  return text;
}

// Estimate reading time in minutes
function calculateReadTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / 200);
  return Math.max(time, 2);
}

// Extract image URL from item object or description
function extractImageUrl(item: any, fallbackCategory: NewsCategory): string {
  // 1. Direct thumbnail or enclosure
  if (item.thumbnail && typeof item.thumbnail === 'string' && item.thumbnail.startsWith('http')) {
    return item.thumbnail;
  }
  if (item.enclosure && item.enclosure.link && typeof item.enclosure.link === 'string') {
    return item.enclosure.link;
  }
  // 2. Check description for <img src="..." />
  if (item.description) {
    const match = item.description.match(/<img[^>]+src="([^">]+)"/i);
    if (match && match[1] && match[1].startsWith('http')) {
      return match[1];
    }
  }
  if (item.content) {
    const match = item.content.match(/<img[^>]+src="([^">]+)"/i);
    if (match && match[1] && match[1].startsWith('http')) {
      return match[1];
    }
  }
  // 3. Fallback based on category
  const fallbackImages: Record<NewsCategory, string> = {
    general: '/src/assets/images/editorial_lead_journal_1793893746143.jpg',
    technology: '/src/assets/images/tech_architecture_editorial_1793893746920.jpg',
    science: '/src/assets/images/science_observatory_editorial_1793893746789.jpg',
    business: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    entertainment: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    sports: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
  };
  return fallbackImages[fallbackCategory] || fallbackImages.general;
}

// Generate consistent unique ID
function generateId(title: string, date: string): string {
  const clean = title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 40);
  const hash = Math.abs(
    (title + date).split('').reduce((acc, char) => (acc << 5) - acc + char.charCodeAt(0), 0)
  ).toString(36);
  return `${clean}-${hash}`;
}

export async function fetchNewsByCategory(category: NewsCategory): Promise<Article[]> {
  const categoryConfig = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];
  const rssUrl = categoryConfig.rssUrl;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=&count=15`;
    const response = await fetch(endpoint, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();

    if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
      const parsedArticles: Article[] = data.items.map((item: any, index: number) => {
        const cleanTitle = stripHtml(item.title || 'Untitled Dispatch');
        const cleanDesc = stripHtml(item.description || '');
        const cleanContent = stripHtml(item.content || item.description || cleanDesc);
        const imageUrl = extractImageUrl(item, category);
        const publishedAt = item.pubDate ? new Date(item.pubDate).toISOString() : new Date().toISOString();
        const readTime = calculateReadTime(cleanContent || cleanDesc);

        return {
          id: item.guid ? String(item.guid) : generateId(cleanTitle, publishedAt),
          title: cleanTitle,
          description: cleanDesc || 'Click through to review the full investigative report and sources.',
          content: cleanContent || cleanDesc,
          url: item.link || 'https://www.bbc.com/news',
          urlToImage: imageUrl,
          publishedAt,
          source: {
            name: data.feed?.title || 'BBC World Service',
            url: data.feed?.link,
          },
          category,
          author: item.author || 'Staff Foreign Correspondent',
          readTimeMinutes: readTime,
        };
      });

      // Filter out empty titles or duplicates
      const unique = parsedArticles.filter(
        (article, idx, arr) => arr.findIndex((a) => a.title === article.title) === idx
      );

      return unique;
    }

    throw new Error('No items returned from feed');
  } catch (err) {
    console.warn(`[NewsAPI] Using curated fallback articles for category "${category}":`, err);
    // Return curated articles for this category, plus general ones if needed
    const categoryFallbacks = FALLBACK_ARTICLES.filter((a) => a.category === category);
    if (categoryFallbacks.length > 0) {
      return categoryFallbacks;
    }
    return FALLBACK_ARTICLES;
  }
}

export async function fetchAllCategories(): Promise<Article[]> {
  const promises = CATEGORIES.map((cat) => fetchNewsByCategory(cat.id));
  const results = await Promise.allSettled(promises);
  
  const allArticles: Article[] = [];
  results.forEach((res) => {
    if (res.status === 'fulfilled' && Array.isArray(res.value)) {
      allArticles.push(...res.value);
    }
  });

  return allArticles.length > 0 ? allArticles : FALLBACK_ARTICLES;
}
