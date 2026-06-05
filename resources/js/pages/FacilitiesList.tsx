import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FacilityCard } from '../components/ui/FacilityCard';
import { FilterSidebar } from '../components/facilities/FilterSidebar';
import { MobileFilterDrawer } from '../components/facilities/MobileFilterDrawer';
import { FilterChips } from '../components/facilities/FilterChips';
import { SearchBar } from '../components/facilities/SearchBar';
import { ResultsHeader } from '../components/facilities/ResultsHeader';
import { regions, categories, servicesList, insurancesList } from '../data/mockData';

export default function FacilitiesList({ facilities = [] }: { facilities: any[] }) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevels, setSelectedLevels] = useState<number[]>([]);
  const [jciOnly, setJciOnly] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedInsurances, setSelectedInsurances] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('relevant');

  // Initialize filters from URL params
  useEffect(() => {
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
  }, []);

  // Toggle helper
  const toggleArrayItem = (
    array: any[],
    setArray: React.Dispatch<React.SetStateAction<any[]>>,
    item: any
  ) => {
    if (array.includes(item)) {
      setArray(array.filter((i) => i !== item));
    } else {
      setArray([...array, item]);
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

  // Filter logic
  let filteredFacilities = facilities.filter((facility) => {
    if (searchQuery && !facility.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (selectedLevels.length > 0 && !selectedLevels.includes(facility.safeCareLevel)) return false;
    if (jciOnly && !facility.jciAccredited) return false;
    if (selectedRegions.length > 0 && !selectedRegions.includes(facility.region)) return false;
    if (selectedCategories.length > 0 && !selectedCategories.includes(facility.category)) return false;
    if (selectedServices.length > 0 && !selectedServices.some((s) => facility.services.includes(s))) return false;
    if (selectedInsurances.length > 0 && !selectedInsurances.some((i) => facility.insurances.includes(i))) return false;
    return true;
  });

  // Sort logic
  if (sortBy === 'level') {
    filteredFacilities.sort((a, b) => b.safeCareLevel - a.safeCareLevel);
  } else if (sortBy === 'rating') {
    filteredFacilities.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'name') {
    filteredFacilities.sort((a, b) => a.name.localeCompare(b.name));
  }

  const activeFilterCount = selectedLevels.length + (jciOnly ? 1 : 0) +
    selectedRegions.length + selectedCategories.length +
    selectedServices.length + selectedInsurances.length + (searchQuery ? 1 : 0);

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

        {/* Header & Mobile Toggle */}
        <ResultsHeader
          resultCount={filteredFacilities.length}
          activeFilterCount={activeFilterCount}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onMobileFilterOpen={() => setIsMobileFiltersOpen(true)}
        />

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
                {filteredFacilities.length > 0 ? (
                  filteredFacilities.map((facility, index) => (
                    <FacilityCard
                      key={facility.id}
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
                      <SearchIcon size={32} className="text-gray-400" />
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
          </div>
        </div>
      </div>
    </div>
  );
}

FacilitiesList.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;