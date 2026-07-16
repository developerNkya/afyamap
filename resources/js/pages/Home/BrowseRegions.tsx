import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, Search } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
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
    const filteredRegions = regions.filter((region) => region.name.toLowerCase().includes(searchTerm.toLowerCase()));

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
        <section className="bg-afya-bg py-8 sm:py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header - Left Aligned */}
                <div ref={headerRef}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 flex flex-col items-start justify-between gap-3 sm:mb-8 sm:flex-row sm:items-end sm:gap-4"
                    >
                        <div className="w-full sm:w-auto">
                            <h2 className="text-afya-text mb-1 flex flex-wrap items-center gap-2 text-xl font-bold sm:mb-2 sm:text-2xl md:text-3xl">
                                <MapPin size={28} className="text-afya-deep" />
                                Explore by <span className="text-afya-deep">Region</span>
                            </h2>
                            <p className="text-xs text-gray-600 sm:text-sm md:text-base">Find quality healthcare facilities across Tanzania</p>
                        </div>

                        {/* Desktop View All Button */}
                        <motion.button
                            whileHover={{ x: 5 }}
                            onClick={() => router.get('/regions')}
                            className="text-afya-deep hidden items-center gap-1 text-sm font-medium hover:underline md:flex"
                        >
                            View all <ArrowRight size={14} />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Search Bar */}
                <div className="mb-6 max-w-xs sm:mb-8 sm:max-w-sm md:max-w-md">
                    <div className="relative">
                        <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search regions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="focus:ring-afya-deep/20 focus:border-afya-deep w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-4 pl-9 text-sm transition-all focus:ring-2 focus:outline-none"
                        />
                    </div>
                </div>

                {/* Regions Grid */}
                <AnimatePresence mode="wait">
                    {filteredRegions.length === 0 ? (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-12 text-center">
                            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                <Search size={24} className="text-gray-300" />
                            </div>
                            <h3 className="mb-1 text-base font-bold text-gray-900">No regions found</h3>
                            <p className="text-sm text-gray-500">Try searching for a different region name</p>
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="text-afya-deep mt-3 text-sm font-medium hover:underline">
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
                    <div className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
                        {/* Page Navigation */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            {/* Previous Button */}
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`rounded-lg p-2 transition-all ${
                                    currentPage === 1 ? 'cursor-not-allowed text-gray-300' : 'hover:bg-afya-light hover:text-afya-deep text-gray-600'
                                }`}
                            >
                                <ChevronLeft size={18} className="sm:h-5 sm:w-5" />
                            </button>

                            {/* Page Numbers */}
                            <div className="flex gap-1 sm:gap-2">
                                {getPageNumbers().map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => goToPage(page)}
                                        className={`h-8 min-w-[32px] rounded-lg text-xs font-medium transition-all sm:h-9 sm:min-w-[36px] sm:text-sm ${
                                            currentPage === page ? 'bg-afya-deep text-white shadow-sm' : 'hover:bg-afya-light text-gray-600'
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
                                className={`rounded-lg p-2 transition-all ${
                                    currentPage === totalPages
                                        ? 'cursor-not-allowed text-gray-300'
                                        : 'hover:bg-afya-light hover:text-afya-deep text-gray-600'
                                }`}
                            >
                                <ChevronRight size={18} className="sm:h-5 sm:w-5" />
                            </button>
                        </div>

                        {/* Page Indicator */}
                        <p className="text-[10px] text-gray-400 sm:text-xs">
                            Page {currentPage} of {totalPages}
                        </p>
                    </div>
                )}

                {/* Mobile View All Button */}
                <div className="mt-6 sm:mt-8 md:hidden">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.get('/regions')}
                        className="text-afya-deep flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium transition-all hover:bg-gray-50"
                    >
                        View all regions
                        <ArrowRight size={14} />
                    </motion.button>
                </div>
            </div>
        </section>
    );
};
