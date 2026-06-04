import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Stethoscope } from 'lucide-react';
import { CategoryCard } from '../../components/ui/CategoryCard';

interface BrowseCategoriesProps {
  categories: any[];
}

export const BrowseCategories: React.FC<BrowseCategoriesProps> = ({ categories }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default 10 items (2 rows of 5)
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setIsMobile(true);
        setItemsPerPage(5); // Mobile: 1 row of 5
      } else {
        setIsMobile(false);
        setItemsPerPage(10); // Tablet/Desktop: 2 rows of 5
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Filter categories based on search
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Reset to page 1 when itemsPerPage changes (screen resize)
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + itemsPerPage);

  // Handle page navigation with smooth scroll to top
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    
    // Scroll to the categories section header
    setTimeout(() => {
      if (headerRef.current) {
        const yOffset = -80; // Adjust for fixed headers
        const y = headerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  // Also scroll when search term changes
  useEffect(() => {
    if (searchTerm) {
      setTimeout(() => {
        if (headerRef.current) {
          const yOffset = -80;
          const y = headerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [searchTerm]);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = isMobile ? 3 : 5;
    
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

  // Get visible item range for display
  const startItem = startIndex + 1;
  const endItem = Math.min(startIndex + itemsPerPage, filteredCategories.length);

  return (
    <section ref={sectionRef} className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Add ref for scrolling target */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8"
          >
            {/* Icon inside title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-afya-text mb-2 flex items-center justify-center gap-2 flex-wrap">
              <Stethoscope size={28} className="text-afya-deep" />
              Browse by <span className="text-afya-deep">Category</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              {filteredCategories.length} healthcare categories available
            </p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-afya-deep/20 focus:border-afya-deep transition-all"
            />
          </div>
        </div>

        {/* Results Info */}
        {filteredCategories.length > 0 && (
          <div className="text-center mb-4">
            <p className="text-xs text-gray-500">
              {searchTerm ? (
                <>Showing <span className="font-semibold text-afya-deep">{startItem}-{endItem}</span> of{' '}
                <span className="font-semibold text-afya-deep">{filteredCategories.length}</span> categories matching "<span className="font-medium">{searchTerm}</span>"</>
              ) : (
                <>Showing <span className="font-semibold text-afya-deep">{startItem}-{endItem}</span> of{' '}
                <span className="font-semibold text-afya-deep">{filteredCategories.length}</span> categories</>
              )}
            </p>
          </div>
        )}

        {/* Categories Display with Pagination */}
        <AnimatePresence mode="wait">
          {filteredCategories.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search size={24} className="text-gray-300" />
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-1">No categories found</h3>
              <p className="text-sm text-gray-500">Try searching for something else</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-3 text-afya-deep font-medium text-sm hover:underline"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          ) : isMobile ? (
            // List View on Mobile (with pagination)
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2 sm:space-y-3"
            >
              {paginatedCategories.map((category, index) => (
                <CategoryCard key={category.slug} category={category} layout="list" index={index} />
              ))}
            </motion.div>
          ) : (
            // Grid View on Tablet/Desktop (2 rows of 5 = 10 items per page)
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5"
            >
              {paginatedCategories.map((category, index) => (
                <CategoryCard key={category.slug} category={category} layout="grid" index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination Controls - Only show if more than 1 page */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-3 mt-8 sm:mt-10">
            {/* Items per page indicator */}
            <div className="text-[10px] text-gray-400">
              {isMobile ? '5 items per page' : '10 items per page (2 rows)'}
            </div>
            
            {/* Page Navigation */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Previous Button */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all ${
                  currentPage === 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-afya-light hover:text-afya-deep'
                }`}
              >
                <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
              </button>

              {/* Page Numbers */}
              <div className="flex gap-1 sm:gap-2">
                {getPageNumbers().map(page => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`min-w-[32px] h-8 sm:min-w-[36px] sm:h-9 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                      currentPage === page
                        ? 'bg-afya-deep text-white shadow-sm'
                        : 'text-gray-600 hover:bg-afya-light'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-all ${
                  currentPage === totalPages
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-afya-light hover:text-afya-deep'
                }`}
              >
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Page Indicator */}
            <p className="text-[10px] sm:text-xs text-gray-400">
              Page {currentPage} of {totalPages}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};