import React from 'react';
import { AlertCircle, RotateCw } from 'lucide-react';

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  onUseFallback?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message,
  onRetry,
  onUseFallback,
}) => {
  return (
    <div className="py-16 px-6 text-center border border-stone-200 dark:border-stone-800 rounded-2xl bg-white dark:bg-stone-900/60 max-w-lg mx-auto">
      <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 mb-4">
        <AlertCircle className="w-6 h-6 stroke-1" />
      </div>

      <h3 className="text-lg font-serif font-bold text-stone-900 dark:text-stone-100 mb-2">
        Unable to Load Dispatches
      </h3>

      <p className="text-sm text-stone-600 dark:text-stone-400 mb-6 leading-relaxed">
        {message || 'The news feed could not be reached. You can retry or switch to the curated archive.'}
      </p>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 text-xs font-semibold hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors cursor-pointer"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>

        {onUseFallback && (
          <button
            onClick={onUseFallback}
            className="px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
          >
            Curated Archive
          </button>
        )}
      </div>
    </div>
  );
};
