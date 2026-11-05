import React from 'react';
import { CATEGORIES } from '../data/mockNewsData';
import { NewsCategory } from '../types/news';
import { 
  Globe2, 
  Cpu, 
  TrendingUp, 
  FlaskConical, 
  Film, 
  Trophy 
} from 'lucide-react';

interface CategoryNavProps {
  selectedCategory: NewsCategory;
  onSelectCategory: (category: NewsCategory) => void;
  isLoading: boolean;
}

const CATEGORY_ICONS: Record<NewsCategory, React.ComponentType<{ className?: string }>> = {
  general: Globe2,
  technology: Cpu,
  business: TrendingUp,
  science: FlaskConical,
  entertainment: Film,
  sports: Trophy,
};

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
  isLoading,
}) => {
  const currentCategory = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <div id="categories" className="py-4 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar pb-1">
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-900 rounded-lg shrink-0">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id];
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                disabled={isLoading && isActive}
                className={`flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-xs font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-900 dark:text-stone-100' : 'text-stone-500 dark:text-stone-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center text-xs text-stone-500 dark:text-stone-400 italic font-serif shrink-0">
          {currentCategory.tagline}
        </div>
      </div>
    </div>
  );
};
