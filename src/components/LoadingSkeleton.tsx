import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 h-72 lg:h-96 bg-stone-200 dark:bg-stone-800" />
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="h-4 w-32 bg-stone-200 dark:bg-stone-800 rounded" />
              <div className="h-8 w-full bg-stone-200 dark:bg-stone-800 rounded" />
              <div className="h-8 w-3/4 bg-stone-200 dark:bg-stone-800 rounded" />
              <div className="h-4 w-full bg-stone-200 dark:bg-stone-800 rounded" />
              <div className="h-4 w-5/6 bg-stone-200 dark:bg-stone-800 rounded" />
            </div>
            <div className="h-10 w-40 bg-stone-200 dark:bg-stone-800 rounded pt-4" />
          </div>
        </div>
      </div>

      {/* Grid Skeletons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="border border-stone-200 dark:border-stone-800 rounded-xl bg-white dark:bg-stone-900 overflow-hidden flex flex-col"
          >
            <div className="w-full aspect-[4/3] bg-stone-200 dark:bg-stone-800" />
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="h-3 w-28 bg-stone-200 dark:bg-stone-800 rounded" />
                <div className="h-5 w-full bg-stone-200 dark:bg-stone-800 rounded" />
                <div className="h-5 w-4/5 bg-stone-200 dark:bg-stone-800 rounded" />
                <div className="h-3.5 w-full bg-stone-200 dark:bg-stone-800 rounded" />
                <div className="h-3.5 w-3/4 bg-stone-200 dark:bg-stone-800 rounded" />
              </div>
              <div className="h-4 w-20 bg-stone-200 dark:bg-stone-800 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
