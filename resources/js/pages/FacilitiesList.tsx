// pages/FacilitiesList.tsx - Updated with pagination
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
import { regions, categories, servicesList, insurancesList } from '../data/mockData';

export default function FacilitiesList({ facilities = [] }: { facilities: any[] }) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const [jciOnly, setJciOnly] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevant');

  // Responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(5);
      } else {
        setItemsPerPage(10);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLevels, jciOnly, selectedRegions, selectedCategories, selectedServices, selectedInsurances, sortBy]);

  // Ensure facilities is an array
  const safeFacilities = Array.isArray(facilities) ? facilities : [];

  // Initialize filters from URL params
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('q')) setSearchQuery(params.get('q') || '');
      if (params.get('region')) setSelectedRegions([params.get('region') || '']);
      if (params.get('service')) setSelectedServices([params.get('service') || '']);
      if (params.get('level')) {
        const lvl = parseInt(params.get('level') || '0');
        if (lvl > 0) {
          const levels = [];
          for (let i = lvl; i <= 5; i++) levels.push(i);
          setSelectedLevels(levels);
        }
      }
      if (params.get('category')) setSelectedCategories([params.get('category') || '']);
      
      // Reset page to 1 when URL params change
      setCurrentPage(1);
    } catch (error) {
      console.error('Error reading URL params:', error);
    }
  }, []);

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

  // Filter logic with safe error handling
  let filteredFacilities = [];

  try {
    if (safeFacilities.length > 0) {
      filteredFacilities = safeFacilities.filter((facility) => {
        if (!facility) return false;
        
        if (searchQuery && !facility.name?.toLowerCase().includes(searchQuery.toLowerCase())) 
          return false;
        if (selectedLevels.length > 0 && !selectedLevels.includes(facility.safeCareLevel)) 
          return false;
        if (jciOnly && !facility.jciAccredited) 
          return false;
        if (selectedRegions.length > 0 && !selectedRegions.includes(facility.region)) 
          return false;
        if (selectedCategories.length > 0 && !selectedCategories.includes(facility.category)) 
          return false;
        if (selectedServices.length > 0 && !selectedServices.some((s) => facility.services?.includes(s))) 
          return false;
        if (selectedInsurances.length > 0 && !selectedInsurances.some((i) => facility.insurances?.includes(i))) 
          return false;
        
        return true;
      });
    }
  } catch (error) {
    console.error('Error filtering facilities:', error);
    filteredFacilities = [];
  }

  // Sort logic with safe error handling
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

  // Pagination - Get current page items
  const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFacilities = filteredFacilities.slice(startIndex, startIndex + itemsPerPage);

  const activeFilterCount = selectedLevels.length + (jciOnly ? 1 : 0) +
    selectedRegions.length + selectedCategories.length +
    selectedServices.length + selectedInsurances.length + (searchQuery ? 1 : 0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-header');
      if (resultsElement) {
        const yOffset = -80;
        const y = resultsElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
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
    activeFilterCount
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
              <FilterSidebar {...filterProps} categories={categories} regions={regions} servicesList={servicesList} insurancesList={insurancesList} />
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
                      key={facility.id || index}
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
                      We couldn't find any facilities matching your current filters. Try adjusting your search criteria.
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

            {/* Pagination Component */}
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