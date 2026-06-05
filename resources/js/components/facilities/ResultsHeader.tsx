import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';

interface ResultsHeaderProps {
  resultCount: number;
  activeFilterCount: number;
  sortBy: string;
  setSortBy: (value: string) => void;
  onMobileFilterOpen: () => void;
}

export const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  resultCount,
  activeFilterCount,
  sortBy,
  setSortBy,
  onMobileFilterOpen
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Healthcare Facilities</h1>
        <div className="text-gray-600 text-sm mt-1 flex items-center gap-1">
          Showing
          <AnimatePresence mode="popLayout">
            <motion.span
              key={resultCount}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="font-bold text-afya-deep inline-block"
            >
              {resultCount}
            </motion.span>
          </AnimatePresence>
          results
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          className="md:hidden flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
          onClick={onMobileFilterOpen}
        >
          <SlidersHorizontal size={16} />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </button>

        <div className="flex-1 md:flex-none flex items-center gap-2">
          <span className="text-sm text-gray-500 hidden md:inline font-medium">Sort by:</span>
          <select
            className="w-full md:w-auto bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-afya-deep focus:border-afya-deep shadow-sm transition-colors cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevant">Most Relevant</option>
            <option value="level">Highest SafeCare Level</option>
            <option value="rating">Best Reviewed</option>
            <option value="name">Name (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};