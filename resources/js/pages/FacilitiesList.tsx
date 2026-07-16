// pages/FacilitiesList.tsx - Connected to DB (normalized schema)
import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { FacilityCard } from '../components/ui/FacilityCard';
import { FilterSidebar } from '../components/facilities/FilterSidebar';
import { MobileFilterDrawer } from '../components/facilities/MobileFilterDrawer';
import { FilterChips } from '../components/facilities/FilterChips';
import { SearchBar } from '../components/facilities/SearchBar';
import { ResultsHeader } from '../components/facilities/ResultsHeader';
import { Pagination } from '../components/ui/Pagintation';

interface FacilitiesListProps {
  facilities: any[];
  regions:    any[];
  categories: any[];
  services:   any[];
  insurances: any[];
  filters?:   Record<string, string>;
}

export default function FacilitiesList({
  facilities  = [],
  regions     = [],
  categories  = [],
  services    = [],
  insurances  = [],
  filters     = {},
}: FacilitiesListProps) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage]   = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter States
  const [searchQuery,        setSearchQuery]        = useState(filters.q            ?? '');
  const [selectedLevels,     setSelectedLevels]     = useState<number[]>([]);
  const [jciOnly,            setJciOnly]            = useState(false);
  const [selectedRegions,    setSelectedRegions]    = useState<string[]>(
    filters.region ? [filters.region] : []
  );
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    filters.category ? [filters.category] : []
  );
  const [selectedServices,   setSelectedServices]   = useState<string[]>(
    filters.service ? [filters.service] : []
  );
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>(
    filters.insurance ? [filters.insurance] : []
  );
  const [sortBy,             setSortBy]             = useState('relevant');

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 640 ? 5 : 10);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLevels, jciOnly, selectedRegions, selectedCategories, selectedServices, selectedInsurances, sortBy]);

  // Build flat service/insurance name lists from DB objects
  const servicesList   = services.map((s: any) => s.name);
  const insurancesList = insurances.map((i: any) => i.name);

  // Ensure facilities is an array
  const safeFacilities = Array.isArray(facilities) ? facilities : [];

  // Toggle helper
  const toggleArrayItem = (
    array: any[],
    setArray: React.Dispatch<React.SetStateAction<any[]>>,
    item: any
  ) => {
    try {
      if (array.includes(item)) {
        setArray(array.filter((i) => i !== item));
      } else {
        setArray([...array, item]);
      }
    } catch (error) {
      console.error('Error toggling filter:', error);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedLevels([]);
    setJciOnly(false);
    setSelectedRegions([]);
    setSelectedCategories([]);
    setSelectedServices([]);
    setSelectedInsurances([]);
  };

  // ── Client-side filter (on top of server-side results) ──────────────────
  let filteredFacilities: any[] = [];

  try {
    filteredFacilities = safeFacilities.filter((facility) => {
      if (!facility) return false;

      if (searchQuery &&
          !facility.name?.toLowerCase().includes(searchQuery.toLowerCase()))
        return false;

      if (selectedLevels.length > 0 &&
          !selectedLevels.includes(facility.safeCareLevel))
        return false;

      if (jciOnly && !facility.jciAccredited)
        return false;

      if (selectedRegions.length > 0 &&
          !selectedRegions.includes(facility.region))
        return false;

      if (selectedCategories.length > 0 &&
          !selectedCategories.includes(facility.category))
        return false;

      if (selectedServices.length > 0) {
        const fServices = Array.isArray(facility.services) ? facility.services : [];
        if (!selectedServices.some((s) => fServices.includes(s)))
          return false;
      }

      if (selectedInsurances.length > 0) {
        const fInsurances = Array.isArray(facility.insurances) ? facility.insurances : [];
        if (!selectedInsurances.some((i) => fInsurances.includes(i)))
          return false;
      }

      return true;
    });
  } catch (error) {
    console.error('Error filtering facilities:', error);
    filteredFacilities = [];
  }

  // ── Sort ─────────────────────────────────────────────────────────────────
  try {
    if (sortBy === 'level') {
      filteredFacilities.sort((a, b) => (b.safeCareLevel || 0) - (a.safeCareLevel || 0));
    } else if (sortBy === 'rating') {
      filteredFacilities.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
      filteredFacilities.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
  } catch (error) {
    console.error('Error sorting facilities:', error);
  }

  // ── Pagination ────────────────────────────────────────────────────────────
  const totalPages          = Math.ceil(filteredFacilities.length / itemsPerPage);
  const startIndex          = (currentPage - 1) * itemsPerPage;
  const paginatedFacilities = filteredFacilities.slice(startIndex, startIndex + itemsPerPage);

  const activeFilterCount =
    selectedLevels.length + (jciOnly ? 1 : 0) +
    selectedRegions.length + selectedCategories.length +
    selectedServices.length + selectedInsurances.length +
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

  const filterProps = {
    selectedLevels,
    setSelectedLevels,
    jciOnly,
    setJciOnly,
    selectedRegions,
    setSelectedRegions,
    selectedCategories,
    setSelectedCategories,
    selectedServices,
    setSelectedServices,
    selectedInsurances,
    setSelectedInsurances,
    toggleArrayItem,
    clearFilters,
    activeFilterCount,
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedRegions={selectedRegions}
          setSelectedRegions={setSelectedRegions}
          selectedServices={selectedServices}
          setSelectedServices={setSelectedServices}
          selectedLevels={selectedLevels}
          setSelectedLevels={setSelectedLevels}
          regions={regions}
          servicesList={servicesList}
        />

        {/* Header with ID for smooth scroll */}
        <div id="results-header">
          <ResultsHeader
            resultCount={filteredFacilities.length}
            activeFilterCount={activeFilterCount}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onMobileFilterOpen={() => setIsMobileFiltersOpen(true)}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-72 shrink-0">
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
              selectedLevels={selectedLevels}
              jciOnly={jciOnly}
              selectedRegions={selectedRegions}
              selectedCategories={selectedCategories}
              selectedServices={selectedServices}
              toggleArrayItem={toggleArrayItem}
              setJciOnly={setJciOnly}
              setSelectedLevels={setSelectedLevels}
              setSelectedRegions={setSelectedRegions}
              setSelectedCategories={setSelectedCategories}
              setSelectedServices={setSelectedServices}
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
                    className="bg-white rounded-xl p-16 text-center border border-gray-200 shadow-sm"
                  >
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search size={32} className="text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No facilities found
                    </h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                      We couldn't find any facilities matching your current filters.
                      Try adjusting your search criteria.
                    </p>
                    <button
                      onClick={clearFilters}
                      className="bg-afya-deep text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow-sm"
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