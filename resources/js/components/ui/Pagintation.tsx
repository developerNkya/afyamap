// components/ui/Pagination.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage = 10,
  totalItems = 0
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) pages.push(i);
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - (maxVisible - 1); i <= totalPages; i++) pages.push(i);
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col items-center gap-4 mt-8 pt-4 border-t border-gray-200">
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition-all ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100 hover:text-afya-deep'
          }`}
        >
          <ChevronLeft size={18} />
        </motion.button>

        {/* Page Numbers */}
        {getPageNumbers().map(page => (
          <motion.button
            key={page}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(page)}
            className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
              currentPage === page
                ? 'bg-gradient-to-r from-afya-deep to-afya-mid text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {page}
          </motion.button>
        ))}

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition-all ${
            currentPage === totalPages
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-600 hover:bg-gray-100 hover:text-afya-deep'
          }`}
        >
          <ChevronRight size={18} />
        </motion.button>
      </div>

      {/* Items per page and info */}
      <div className="text-xs text-gray-500">
        Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} facilities
      </div>
    </div>
  );
};