import { AnimatePresence, motion } from 'framer-motion';
import {
    Activity,
    Bone,
    Brain,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    Droplets,
    Eye,
    Heart,
    Layers,
    Pill,
    Stethoscope,
} from 'lucide-react';
import React, { useState } from 'react';

// Category icon mapping for better visual representation
const categoryIcons: Record<string, React.ReactNode> = {
    'General Medicine': <Stethoscope size={16} />,
    Cardiology: <Heart size={16} />,
    Neurology: <Brain size={16} />,
    Orthopedics: <Bone size={16} />,
    Ophthalmology: <Eye size={16} />,
    Dermatology: <Droplets size={16} />,
    Pharmacy: <Pill size={16} />,
    // Add more as needed
};

interface FacilityServicesProps {
    services: Record<string, string[]> | string[];
    itemsPerPage?: number; // Number of categories to show per page
}

export const FacilityServices: React.FC<FacilityServicesProps> = ({
    services,
    itemsPerPage = 6, // Default to 6 categories per page
}) => {
    const isGrouped = services && !Array.isArray(services) && typeof services === 'object';

    const groupedServices: Record<string, string[]> = isGrouped ? (services as Record<string, string[]>) : {};

    const flatServices: string[] = Array.isArray(services) ? services : [];

    const categoryNames = Object.keys(groupedServices);
    const totalServices = isGrouped ? Object.values(groupedServices).reduce((acc, s) => acc + s.length, 0) : flatServices.length;

    // State for categories - all closed by default
    const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(categoryNames.length / itemsPerPage);

    // Get current page categories
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentCategories = categoryNames.slice(startIndex, endIndex);

    const toggleCategory = (cat: string) => {
        setOpenCategories((prev) => ({
            ...prev,
            [cat]: !prev[cat],
        }));
    };

    // Get icon for category with fallback
    const getCategoryIcon = (category: string) => {
        return categoryIcons[category] || <Layers size={16} />;
    };

    // Pagination controls
    const goToPreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
        // Close all categories when changing page
        setOpenCategories({});
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
        // Close all categories when changing page
        setOpenCategories({});
    };

    if (totalServices === 0) {
        return (
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                id="section-services"
                className="scroll-mt-32 pt-4"
            >
                <h2 className="mb-6 text-2xl font-bold text-gray-800">Available Services</h2>
                <p className="text-sm text-gray-400">No services listed for this facility.</p>
            </motion.section>
        );
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            id="section-services"
            className="scroll-mt-32 pt-4"
        >
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Available Services</h2>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-400">
                    {totalServices} service{totalServices !== 1 ? 's' : ''}
                </span>
            </div>

            {isGrouped && categoryNames.length > 0 ? (
                <>
                    {/* Grid of categories */}
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        {currentCategories.map((category) => {
                            const catServices = groupedServices[category] ?? [];
                            const isOpen = openCategories[category] ?? false;
                            return (
                                <div
                                    key={category}
                                    className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                                >
                                    {/* Category Header - Click to toggle independently */}
                                    <button
                                        type="button"
                                        onClick={() => toggleCategory(category)}
                                        className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors hover:bg-gray-50"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div className="bg-afya-light text-afya-deep rounded-lg p-2">{getCategoryIcon(category)}</div>
                                            <div>
                                                <span className="block text-sm font-semibold text-gray-800">{category}</span>
                                                <span className="text-xs text-gray-400">
                                                    {catServices.length} service{catServices.length !== 1 ? 's' : ''}
                                                </span>
                                            </div>
                                        </div>
                                        {isOpen ? (
                                            <ChevronUp size={18} className="flex-shrink-0 text-gray-400" />
                                        ) : (
                                            <ChevronDown size={18} className="flex-shrink-0 text-gray-400" />
                                        )}
                                    </button>

                                    {/* Services inside category - Independent animation */}
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                key="content"
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                                className="overflow-hidden"
                                            >
                                                <div className="border-t border-gray-100 px-4 pt-2 pb-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {catServices.map((service) => (
                                                            <span
                                                                key={service}
                                                                className="hover:bg-afya-light hover:text-afya-deep hover:border-afya-mid inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 transition-colors"
                                                            >
                                                                <Activity size={12} className="text-afya-deep" />
                                                                {service}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>

                    {/* Pagination Controls - Show only if more than itemsPerPage categories */}
                    {totalPages > 1 && (
                        <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-4">
                            <button
                                onClick={goToPreviousPage}
                                disabled={currentPage === 1}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                    currentPage === 1 ? 'cursor-not-allowed text-gray-300' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                <ChevronLeft size={18} />
                                Previous
                            </button>

                            {/* Page indicator */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <div className="flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => {
                                                setCurrentPage(page);
                                                setOpenCategories({}); // Close all categories on page change
                                            }}
                                            className={`h-8 w-8 rounded-lg text-sm font-medium transition-colors ${
                                                currentPage === page ? 'bg-afya-deep text-white' : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                    currentPage === totalPages ? 'cursor-not-allowed text-gray-300' : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                Next
                                <ChevronRight size={18} />
                            </button>
                        </div>
                    )}
                </>
            ) : (
                /* ── Flat list fallback (old format) ── */
                <div className="flex flex-wrap gap-2">
                    {flatServices.map((service) => (
                        <span
                            key={service}
                            className="hover:bg-afya-light hover:text-afya-deep inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors"
                        >
                            <Activity size={14} />
                            {service}
                        </span>
                    ))}
                </div>
            )}
        </motion.section>
    );
};
