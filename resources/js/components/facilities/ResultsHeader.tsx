import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

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
  const [isSortHovered, setIsSortHovered] = useState(false);

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
        {/* Mobile Filter Button - Improved visibility */}
        <button
          className="md:hidden flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          onClick={onMobileFilterOpen}
        >
          <SlidersHorizontal size={16} className="text-gray-700" />
          <span className="text-gray-700">Filters</span>
          {activeFilterCount > 0 && (
            <span className="bg-afya-deep text-white text-xs px-1.5 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        {/* Sort Dropdown - Hero Section Style */}
        <div className="flex-1 md:flex-none flex items-center gap-2">
          <span className="text-sm text-gray-600 hidden md:inline font-medium">Sort by:</span>
          <div className="relative group">
            <select
              className="w-full md:w-auto appearance-none bg-gray-50/50 hover:bg-white border border-gray-200 rounded-xl px-4 py-2 pr-8 text-sm text-gray-700 focus:ring-2 focus:ring-afya-deep focus:border-transparent transition-all cursor-pointer"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              onMouseEnter={() => setIsSortHovered(true)}
              onMouseLeave={() => setIsSortHovered(false)}
            >
              <option value="relevant">Most Relevant</option>
              <option value="level">Highest SafeCare Level</option>
              <option value="rating">Best Reviewed</option>
              <option value="name">Name (A-Z)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown 
                size={14} 
                className={`text-gray-400 transition-transform duration-200 ${
                  isSortHovered ? 'text-afya-deep' : ''
                }`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};