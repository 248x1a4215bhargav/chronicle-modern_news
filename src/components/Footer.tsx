import React from 'react';
import { Newspaper } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-20 border-t border-stone-200 dark:border-stone-800 bg-stone-100/50 dark:bg-stone-950/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Newspaper className="w-5 h-5 text-stone-700 dark:text-stone-300 stroke-1" />
            <div>
              <span className="font-serif font-bold text-base tracking-tight text-stone-900 dark:text-stone-100">
                CHRONICLE
              </span>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-sans">
                A modern editorial reader for curious minds. All bookmarks and notes stored locally.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-stone-500 dark:text-stone-400 font-sans">
            <span>Syndication via Open Public Feeds</span>
            <span aria-hidden="true">·</span>
            <span>Local Storage Privacy</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-[11px]">2026 Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
