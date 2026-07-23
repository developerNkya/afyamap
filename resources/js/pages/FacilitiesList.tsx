// pages/FacilitiesList.tsx - Server-side filtering via Inertia router
import { router } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { FilterChips } from '../components/facilities/FilterChips';
import { FilterSidebar } from '../components/facilities/FilterSidebar';
import { MobileFilterDrawer } from '../components/facilities/MobileFilterDrawer';
import { ResultsHeader } from '../components/facilities/ResultsHeader';
import { SearchBar } from '../components/facilities/SearchBar';
import { Layout } from '../components/layout/Layout';
import { FacilityCard } from '../components/ui/FacilityCard';
import { Pagination } from '../components/ui/Pagintation';
import { QualityFilter } from '../pages/Home/QualityFilter'; // Import QualityFilter

interface FacilitiesListProps {
    facilities: any[];
    regions: any[];
    categories: any[];
    services: any[];
    insurances: any[];
    filters?: Record<string, string>;
}

export default function FacilitiesList({
    facilities = [],
    regions = [],
    categories = [],
    services = [],
    insurances = [],
    filters = {},
}: FacilitiesListProps) {
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    // Pagination State (client-side only — server returns all matches)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [sortBy, setSortBy] = useState('relevant');

    // ── Filter state — synced to server via Inertia router ──────────────────
    const [searchQuery, setSearchQuery] = useState(filters.q ?? '');
    const [selectedLevel, setSelectedLevel] = useState(filters.level ?? '');
    const [jciOnly, setJciOnly] = useState(filters.jci === '1' ?? false);
    const [selectedRegions, setSelectedRegions] = useState<string[]>(filters.region ? [filters.region] : []);
    const [selectedCategories, setSelectedCategories] = useState<string[]>(filters.category ? [filters.category] : []);
    const [selectedServices, setSelectedServices] = useState<string[]>(filters.service ? [filters.service] : []);
    const [selectedInsurances, setSelectedInsurances] = useState<string[]>(filters.insurance ? [filters.insurance] : []);
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [selectedInsurance, setSelectedInsurance] = useState(filters.insurance || '');
    const [selectedCategory, setSelectedCategory] = useState(filters.category || '');

    // Responsive items per page
    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth < 640 ? 5 : 10);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Reset page when data changes
    useEffect(() => {
        setCurrentPage(1);
    }, [facilities]);

    // ── Push filters to server via Inertia ───────────────────────────────────
    const applyServerFilters = useCallback(
        (overrides: Record<string, any> = {}) => {
            const params: Record<string, string> = {};

            const q = overrides.q !== undefined ? overrides.q : searchQuery;
            if (q) params.q = q;

            const regions = overrides.regions !== undefined ? overrides.regions : selectedRegions;
            if (regions.length === 1) params.region = regions[0];

            const cats = overrides.categories !== undefined ? overrides.categories : selectedCategories;
            if (cats.length === 1) params.category = cats[0];

            const srvs = overrides.services !== undefined ? overrides.services : selectedServices;
            if (srvs.length === 1) params.service = srvs[0];

            const ins = overrides.insurances !== undefined ? overrides.insurances : selectedInsurances;
            if (ins.length === 1) params.insurance = ins[0];

            // Quality filters
            const level = overrides.level !== undefined ? overrides.level : selectedLevel;
            if (level) params.level = level;

            const jci = overrides.jci !== undefined ? overrides.jci : jciOnly;
            if (jci) params.jci = '1';

            router.get('/facilities', params, {
                preserveScroll: true,
                preserveState: true,
            });
        },
        [searchQuery, selectedRegions, selectedCategories, selectedServices, selectedInsurances, selectedLevel, jciOnly],
    );

    // Build flat service/insurance name lists
    const servicesList = services.map((s: any) => s.name);
    const insurancesList = insurances.map((i: any) => i.name);

    // Ensure facilities is an array
    const safeFacilities = Array.isArray(facilities) ? facilities : [];

    // Toggle helper — updates local state and fires server request
    const toggleArrayItem = (array: any[], setArray: React.Dispatch<React.SetStateAction<any[]>>, item: any) => {
        const next = array.includes(item) ? array.filter((i) => i !== item) : [...array, item];
        setArray(next);

        // Determine which filter this is and push to server
        if (setArray === setSelectedRegions) {
            applyServerFilters({ regions: next });
        } else if (setArray === setSelectedCategories) {
            applyServerFilters({ categories: next });
        } else if (setArray === setSelectedServices) {
            applyServerFilters({ services: next });
        } else if (setArray === setSelectedInsurances) {
            applyServerFilters({ insurances: next });
        }
    };

    // Clear ALL filters — navigate to clean /facilities
    const clearFilters = () => {
        setSearchQuery('');
        setSelectedLevel('');
        setJciOnly(false);
        setSelectedRegions([]);
        setSelectedCategories([]);
        setSelectedServices([]);
        setSelectedInsurances([]);
        setSelectedInsurance('');
        setSelectedCategory('');
        router.get('/facilities', {}, { preserveScroll: false });
    };

    // Handle search submit
    const handleSearch = (q: string) => {
        setSearchQuery(q);
        applyServerFilters({ q });
    };

    // ── Client-side: sort + JCI + level (fast, no round-trip) ────────────────
    let filteredFacilities = [...safeFacilities];

    // Apply level filter
    if (selectedLevel) {
        const levelNum = parseInt(selectedLevel);
        filteredFacilities = filteredFacilities.filter((f) => f.safeCareLevel >= levelNum);
    }

    if (jciOnly) {
        filteredFacilities = filteredFacilities.filter((f) => f.jciAccredited);
    }

    // Sort
    if (sortBy === 'level') {
        filteredFacilities.sort((a, b) => (b.safeCareLevel || 0) - (a.safeCareLevel || 0));
    } else if (sortBy === 'rating') {
        filteredFacilities.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
        filteredFacilities.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    // ── Pagination ─────────────────────────────────────────────────────────────
    const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedFacilities = filteredFacilities.slice(startIndex, startIndex + itemsPerPage);

    const activeFilterCount =
        (selectedLevel ? 1 : 0) +
        (jciOnly ? 1 : 0) +
        selectedRegions.length +
        selectedCategories.length +
        selectedServices.length +
        selectedInsurances.length +
        (searchQuery ? 1 : 0);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setTimeout(() => {
            const el = document.getElementById('results-header');
            if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        }, 100);
    };

    // Handle quality filter changes
    const handleQualityChange = (level: string, jci: boolean) => {
        setSelectedLevel(level);
        setJciOnly(jci);
        applyServerFilters({ level, jci });
    };

    const filterProps = {
        selectedLevels: selectedLevel ? [parseInt(selectedLevel)] : [],
        setSelectedLevels: (levels: number[]) => {
            const newLevel = levels.length > 0 ? levels[0].toString() : '';
            setSelectedLevel(newLevel);
            applyServerFilters({ level: newLevel });
        },
        jciOnly,
        setJciOnly: (jci: boolean) => {
            setJciOnly(jci);
            applyServerFilters({ jci });
        },
        selectedRegions,
        setSelectedRegions: (next: string[]) => {
            setSelectedRegions(next);
            applyServerFilters({ regions: next });
        },
        selectedCategories,
        setSelectedCategories: (next: string[]) => {
            setSelectedCategories(next);
            applyServerFilters({ categories: next });
        },
        selectedServices,
        setSelectedServices: (next: string[]) => {
            setSelectedServices(next);
            applyServerFilters({ services: next });
        },
        selectedInsurances,
        setSelectedInsurances: (next: string[]) => {
            setSelectedInsurances(next);
            applyServerFilters({ insurances: next });
        },
        toggleArrayItem,
        clearFilters,
        activeFilterCount,
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Search Bar */}
                <SearchBar
                    searchQuery={searchQuery}
                    setSearchQuery={handleSearch}
                    selectedRegions={selectedRegions}
                    setSelectedRegions={(next: string[]) => {
                        setSelectedRegions(next);
                        applyServerFilters({ regions: next });
                    }}
                    selectedServices={selectedServices}
                    setSelectedServices={(next: string[]) => {
                        setSelectedServices(next);
                        applyServerFilters({ services: next });
                    }}
                    selectedLevels={selectedLevel ? [parseInt(selectedLevel)] : []}
                    setSelectedLevels={(levels: number[]) => {
                        const newLevel = levels.length > 0 ? levels[0].toString() : '';
                        setSelectedLevel(newLevel);
                        applyServerFilters({ level: newLevel });
                    }}
                    regions={regions}
                    servicesList={servicesList}
                />

                {/* Quality Filter - Same as Home page */}
                <div className="mt-4">
                    <QualityFilter
                        selectedLevel={selectedLevel}
                        setSelectedLevel={(level: string) => {
                            setSelectedLevel(level);
                            applyServerFilters({ level });
                        }}
                        showAdvanced={showAdvanced}
                        setShowAdvanced={setShowAdvanced}
                        categories={categories}
                        insurances={insurances}
                        selectedInsurance={selectedInsurance}
                        setSelectedInsurance={(insurance: string) => {
                            setSelectedInsurance(insurance);
                            // If insurance is selected, add to filters
                            if (insurance) {
                                setSelectedInsurances([insurance]);
                                applyServerFilters({ insurances: [insurance] });
                            } else {
                                setSelectedInsurances([]);
                                applyServerFilters({ insurances: [] });
                            }
                        }}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={(category: string) => {
                            setSelectedCategory(category);
                            if (category) {
                                setSelectedCategories([category]);
                                applyServerFilters({ categories: [category] });
                            } else {
                                setSelectedCategories([]);
                                applyServerFilters({ categories: [] });
                            }
                        }}
                        jciOnly={jciOnly}
                        setJciOnly={(jci: boolean) => {
                            setJciOnly(jci);
                            applyServerFilters({ jci });
                        }}
                    />
                </div>

                {/* Header with ID for smooth scroll */}
                <div id="results-header" className="mt-4">
                    <ResultsHeader
                        resultCount={filteredFacilities.length}
                        activeFilterCount={activeFilterCount}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        onMobileFilterOpen={() => setIsMobileFiltersOpen(true)}
                    />
                </div>

                <div className="mt-4 flex flex-col gap-8 md:flex-row">
                    {/* Desktop Sidebar */}
                    <div className="hidden w-72 shrink-0 md:block">
                        <div className="sticky top-24">
                            <FilterSidebar
                                {...filterProps}
                                categories={categories}
                                regions={regions}
                                servicesList={servicesList}
                                insurancesList={insurancesList}
                            />
                        </div>
                    </div>

                    {/* Mobile Filters Drawer */}
                    <MobileFilterDrawer
                        isOpen={isMobileFiltersOpen}
                        onClose={() => setIsMobileFiltersOpen(false)}
                        resultCount={filteredFacilities.length}
                        {...filterProps}
                        categories={categories}
                        regions={regions}
                        servicesList={servicesList}
                        insurancesList={insurancesList}
                    />

                    {/* Main Content */}
                    <div className="flex-grow">
                        {/* Active Filters Chips */}
                        <FilterChips
                            selectedLevels={selectedLevel ? [parseInt(selectedLevel)] : []}
                            jciOnly={jciOnly}
                            selectedRegions={selectedRegions}
                            selectedCategories={selectedCategories}
                            selectedServices={selectedServices}
                            toggleArrayItem={toggleArrayItem}
                            setJciOnly={setJciOnly}
                            setSelectedLevels={(levels: number[]) => {
                                const newLevel = levels.length > 0 ? levels[0].toString() : '';
                                setSelectedLevel(newLevel);
                                applyServerFilters({ level: newLevel });
                            }}
                            setSelectedRegions={(next: string[]) => {
                                setSelectedRegions(next);
                                applyServerFilters({ regions: next });
                            }}
                            setSelectedCategories={(next: string[]) => {
                                setSelectedCategories(next);
                                applyServerFilters({ categories: next });
                            }}
                            setSelectedServices={(next: string[]) => {
                                setSelectedServices(next);
                                applyServerFilters({ services: next });
                            }}
                        />

                        {/* Results List */}
                        <div className="space-y-5">
                            <AnimatePresence mode="popLayout">
                                {paginatedFacilities.length > 0 ? (
                                    paginatedFacilities.map((facility, index) => (
                                        <FacilityCard
                                            key={facility.facility_id || facility.id || index}
                                            facility={facility}
                                            layout="horizontal"
                                            index={index}
                                        />
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="rounded-xl border border-gray-200 bg-white p-16 text-center shadow-sm"
                                    >
                                        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-50">
                                            <Search size={32} className="text-gray-400" />
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">No facilities found</h3>
                                        <p className="mx-auto mb-8 max-w-md text-gray-500">
                                            We couldn't find any facilities matching your current filters. Try adjusting your search criteria.
                                        </p>
                                        <button
                                            onClick={clearFilters}
                                            className="bg-afya-deep hover:bg-opacity-90 rounded-lg px-8 py-3 font-medium text-white shadow-sm transition-colors"
                                        >
                                            Clear all filters
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Pagination */}
                        {filteredFacilities.length > 0 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                itemsPerPage={itemsPerPage}
                                totalItems={filteredFacilities.length}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

FacilitiesList.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
