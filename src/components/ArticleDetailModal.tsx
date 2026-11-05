import React, { useState, useEffect, useRef } from 'react';
import { Article, BookmarkItem } from '../types/news';
import { formatDate, formatRelativeTime } from '../utils/formatters';
import { 
  X, 
  ExternalLink, 
  Bookmark, 
  Share2, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Check, 
  Plus, 
  Save, 
  Tag as TagIcon,
  Type,
  Clock,
  BookOpen
} from 'lucide-react';

interface ArticleDetailModalProps {
  article: Article | null;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: (article: Article) => void;
  bookmarkData?: BookmarkItem;
  onUpdateNotes: (articleId: string, notes: string) => void;
  onAddTag: (articleId: string, tag: string) => void;
  onRemoveTag: (articleId: string, tag: string) => void;
}

export const ArticleDetailModal: React.FC<ArticleDetailModalProps> = ({
  article,
  onClose,
  isBookmarked,
  onToggleBookmark,
  bookmarkData,
  onUpdateNotes,
  onAddTag,
  onRemoveTag,
}) => {
  if (!article) return null;

  // Local note draft
  const [noteText, setNoteText] = useState(bookmarkData?.notes || '');
  const [newTagInput, setNewTagInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string>('');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');

  // Audio Speech state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPausedAudio, setIsPausedAudio] = useState(false);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Sync noteText when bookmarkData changes or article opens
  useEffect(() => {
    setNoteText(bookmarkData?.notes || '');
  }, [article.id, bookmarkData?.notes]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        stopAudio();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      stopAudio();
    };
  }, [onClose]);

  // Stop audio on unmount or article change
  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsPausedAudio(false);
  };

  const toggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech audio is not supported in this browser.');
      return;
    }

    if (isPlayingAudio && !isPausedAudio) {
      window.speechSynthesis.pause();
      setIsPausedAudio(true);
      return;
    }

    if (isPlayingAudio && isPausedAudio) {
      window.speechSynthesis.resume();
      setIsPausedAudio(false);
      return;
    }

    // Start speaking
    window.speechSynthesis.cancel();
    const narrationText = `${article.title}. Reported by ${article.source.name}. ${article.description}. ${article.content}`;
    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
      setIsPausedAudio(false);
    };

    speechUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
    setIsPausedAudio(false);
  };

  const handleSaveNotes = () => {
    if (!isBookmarked) {
      onToggleBookmark(article);
    }
    onUpdateNotes(article.id, noteText);
    setSaveStatus('Note saved');
    setTimeout(() => setSaveStatus(''), 2500);
  };

  const handleAddTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;
    if (!isBookmarked) {
      onToggleBookmark(article);
    }
    onAddTag(article.id, newTagInput.trim());
    setNewTagInput('');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(article.url || window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const fontSizeClass = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    huge: 'text-xl sm:text-2xl leading-loose',
  }[fontSize];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-start justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-6 sm:my-10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Detail Top Bar */}
        <div className="sticky top-0 z-20 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-md px-6 py-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
            <span className="font-semibold text-stone-800 dark:text-stone-200 uppercase tracking-wider">
              {article.source.name}
            </span>
            <span aria-hidden="true">·</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Read Aloud */}
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                isPlayingAudio && !isPausedAudio
                  ? 'bg-amber-100 dark:bg-amber-950/80 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title="Narrate article using text-to-speech"
            >
              {isPlayingAudio && !isPausedAudio ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="hidden sm:inline">Pause Narration</span>
                </>
              ) : isPausedAudio ? (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Resume</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Listen Aloud</span>
                </>
              )}
            </button>

            {/* Font Size Adjuster */}
            <div className="hidden sm:flex items-center border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden bg-white dark:bg-stone-900 text-xs text-stone-600 dark:text-stone-300">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1.5 ${fontSize === 'normal' ? 'bg-stone-200 dark:bg-stone-800 font-bold' : 'hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                title="Default text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1.5 ${fontSize === 'large' ? 'bg-stone-200 dark:bg-stone-800 font-bold' : 'hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                title="Larger text size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('huge')}
                className={`px-2 py-1.5 ${fontSize === 'huge' ? 'bg-stone-200 dark:bg-stone-800 font-bold' : 'hover:bg-stone-100 dark:hover:bg-stone-800'}`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Share / Copy Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              title="Copy link to clipboard"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Bookmark Toggle */}
            <button
              onClick={() => onToggleBookmark(article)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-stone-900 border-stone-900 text-white dark:bg-stone-100 dark:border-stone-100 dark:text-stone-900'
                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
              title={isBookmarked ? 'Bookmarked' : 'Add to bookmarks'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Close Modal Button */}
            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="p-2 text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="p-6 sm:p-10 max-w-3xl mx-auto">
          
          {/* Unboxed Metadata */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-stone-500 dark:text-stone-400 mb-3 font-sans">
            <span className="uppercase tracking-wider font-semibold text-stone-800 dark:text-stone-200">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.source.name}</span>
            <span aria-hidden="true">·</span>
            <span>{formatRelativeTime(article.publishedAt)}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono tabular-nums">
              <Clock className="w-3.5 h-3.5" />
              {article.readTimeMinutes} min read
            </span>
          </div>

          {/* Full Headline */}
          <h1 
            style={{ textWrap: 'balance' }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 dark:text-stone-100 leading-tight mb-4"
          >
            {article.title}
          </h1>

          {/* Byline */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-600 dark:text-stone-400 italic font-serif">
            <span>By {article.author || 'Chronicle Wire Service'}</span>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="not-italic font-sans font-medium text-xs text-stone-800 dark:text-stone-200 hover:underline inline-flex items-center gap-1"
            >
              <span>Original Source</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Hero Image */}
          {article.urlToImage && (
            <div className="mb-8 rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900">
              <img
                src={article.urlToImage}
                alt={article.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[460px] object-cover"
              />
              <div className="p-3 text-xs text-stone-500 dark:text-stone-400 font-serif italic border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950 flex items-center justify-between">
                <span>Dispatch photograph · Source archive</span>
                <span className="font-mono text-[10px] uppercase tracking-wider">{article.source.name}</span>
              </div>
            </div>
          )}

          {/* Long-form Article Narrative with Drop Cap (§2 of Museum/Editorial guide) */}
          <div className={`prose dark:prose-invert max-w-none font-sans text-stone-800 dark:text-stone-200 space-y-5 ${fontSizeClass}`}>
            <p className="first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-stone-900 dark:first-letter:text-stone-100">
              {article.content || article.description}
            </p>

            {article.content && article.description && article.content !== article.description && (
              <p className="text-stone-700 dark:text-stone-300">
                {article.description}
              </p>
            )}

            <div className="p-4 rounded-xl bg-stone-100/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 text-sm text-stone-600 dark:text-stone-300 font-serif italic">
              "Continuous factual coverage remains essential for democratic accountability, long-term civic discourse, and sound public decision making."
            </div>
          </div>

          {/* External Link Action */}
          <div className="pt-6 my-8 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-4">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 text-sm font-semibold transition-colors cursor-pointer"
            >
              <span>Read Full Article on {article.source.name}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => onToggleBookmark(article)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                isBookmarked
                  ? 'border-stone-800 dark:border-stone-200 bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100'
                  : 'border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              <span>{isBookmarked ? 'Saved in Notes & Bookmarks' : 'Save to Bookmarks'}</span>
            </button>
          </div>

          {/* Personal Notebook & Reflections Section */}
          <div className="mt-10 pt-8 border-t border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100">
                  Personal Reader Notes
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Record personal thoughts, key quotes, or research takeaways for this article.
                </p>
              </div>

              {saveStatus && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 animate-fade-in">
                  <Check className="w-3.5 h-3.5" />
                  {saveStatus}
                </span>
              )}
            </div>

            {/* Note Editor Area */}
            <div className="space-y-3">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Write your notes or reflections on this dispatch (auto-saved)..."
                rows={4}
                className="w-full p-3.5 text-sm bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-600 transition-colors leading-relaxed"
              />

              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* Tag list */}
                <div className="flex items-center flex-wrap gap-1.5">
                  {(bookmarkData?.tags || []).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300"
                    >
                      <span>#{tag}</span>
                      <button
                        onClick={() => onRemoveTag(article.id, tag)}
                        className="hover:text-red-500 cursor-pointer"
                        title="Remove tag"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}

                  {/* Add Tag Form */}
                  <form onSubmit={handleAddTagSubmit} className="inline-flex items-center gap-1">
                    <input
                      type="text"
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      placeholder="+ Add tag"
                      className="text-xs px-2 py-1 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded text-stone-800 dark:text-stone-200 w-20 focus:w-28 focus:outline-none transition-all"
                    />
                  </form>
                </div>

                {/* Save button */}
                <button
                  onClick={handleSaveNotes}
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Note</span>
                </button>
              </div>

              {bookmarkData?.lastEditedAt && (
                <div className="text-[11px] text-stone-400 dark:text-stone-500 font-mono">
                  Last edited: {new Date(bookmarkData.lastEditedAt).toLocaleTimeString()}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
