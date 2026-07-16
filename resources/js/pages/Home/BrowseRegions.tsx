import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { RegionCard } from '../../components/ui/RegionCard';

interface BrowseRegionsProps {
  regions: any[];
}

export const BrowseRegions: React.FC<BrowseRegionsProps> = ({ regions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setIsMobile(true);
        setItemsPerPage(6); // Mobile: 2 cols x 3 rows = 6 items
      } else if (width < 768) {
        setIsMobile(true);
        setItemsPerPage(9); // Small tablet: 3 cols x 3 rows = 9 items
      } else {
        setIsMobile(false);
        setItemsPerPage(12); // Desktop: 4 cols x 3 rows = 12 items
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Filter regions based on search
  const filteredRegions = regions.filter(region =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase())
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
  const totalPages = Math.ceil(filteredRegions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRegions = filteredRegions.slice(startIndex, startIndex + itemsPerPage);

  // Handle page navigation with smooth scroll to top
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    setTimeout(() => {
      if (headerRef.current) {
        const yOffset = -80;
        const y = headerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  // Scroll when search changes
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

  // Get grid columns based on screen size
  const getGridCols = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 'grid-cols-2';
      if (window.innerWidth < 768) return 'grid-cols-3';
    }
    return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
  };

  return (
    <section className="py-12 sm:py-16 bg-afya-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-afya-text mb-2 flex items-center justify-center gap-2 flex-wrap">
              <MapPin size={28} className="text-afya-deep" />
              Explore by <span className="text-afya-deep">Region</span>
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Find quality healthcare facilities across Tanzania
            </p>
          </motion.div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-6 sm:mb-8">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search regions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-afya-deep/20 focus:border-afya-deep transition-all"
            />
          </div>
        </div>

        {/* Regions Grid */}
        <AnimatePresence mode="wait">
          {filteredRegions.length === 0 ? (
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
              <h3 className="font-bold text-gray-900 text-base mb-1">No regions found</h3>
              <p className="text-sm text-gray-500">Try searching for a different region name</p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-3 text-afya-deep font-medium text-sm hover:underline"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`grid ${getGridCols()} gap-3 sm:gap-4 md:gap-6`}
            >
              {paginatedRegions.map((region, index) => (
                <RegionCard key={region.id ?? region.slug} region={region} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination Controls - Only show if more than 1 page */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-3 mt-8 sm:mt-10">
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