import React, { useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import {
  Filter,
  Search,
  X,
  SlidersHorizontal,
  MapPin,
  Activity,
  Shield } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  regions,
  categories,
  servicesList,
  insurancesList } from
'../data/mockData';
import { FacilityCard } from '../components/ui/FacilityCard';
import { SafeCareLevelIndicator } from '../components/ui/SafeCareLevelIndicator';
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
    if (params.get('service'))
    setSelectedServices([params.get('service') || '']);
    if (params.get('level')) {
      const lvl = parseInt(params.get('level') || '0');
      if (lvl > 0) {
        const levels = [];
        for (let i = lvl; i <= 5; i++) levels.push(i);
        setSelectedLevels(levels);
      }
    }
    if (params.get('category'))
    setSelectedCategories([params.get('category') || '']);
  }, []);
  // Toggle helpers
  const toggleArrayItem = (
  array: any[],
  setArray: React.Dispatch<React.SetStateAction<any[]>>,
  item: any) =>
  {
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
    if (
    searchQuery &&
    !facility.name.toLowerCase().includes(searchQuery.toLowerCase()))

    return false;
    if (
    selectedLevels.length > 0 &&
    !selectedLevels.includes(facility.safeCareLevel))

    return false;
    if (jciOnly && !facility.jciAccredited) return false;
    if (
    selectedRegions.length > 0 &&
    !selectedRegions.includes(facility.region))

    return false;
    if (
    selectedCategories.length > 0 &&
    !selectedCategories.includes(facility.category))

    return false;
    if (
    selectedServices.length > 0 &&
    !selectedServices.some((s) => facility.services.includes(s)))

    return false;
    if (
    selectedInsurances.length > 0 &&
    !selectedInsurances.some((i) => facility.insurances.includes(i)))

    return false;
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
  const activeFilterCount =
  selectedLevels.length + (
  jciOnly ? 1 : 0) +
  selectedRegions.length +
  selectedCategories.length +
  selectedServices.length +
  selectedInsurances.length + (
  searchQuery ? 1 : 0);
  // Top Search Bar Handlers
  const handleTopSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The state is already bound, so we don't strictly need to do anything here
    // as the filtering is reactive. But we can prevent default form submission.
  };
  const handleTopLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (!val) {
      setSelectedLevels([]);
    } else {
      const lvl = parseInt(val);
      const levels = [];
      for (let i = lvl; i <= 5; i++) levels.push(i);
      setSelectedLevels(levels);
    }
  };
  const getTopLevelValue = () => {
    if (selectedLevels.length === 0) return '';
    return Math.min(...selectedLevels).toString();
  };
  const FilterSidebar = () =>
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg flex items-center gap-2 text-afya-text">
          <Filter size={20} /> Filters
        </h2>
        {activeFilterCount > 0 &&
      <button
        onClick={clearFilters}
        className="text-sm text-afya-accent hover:underline font-medium transition-all">
        
            Clear all
          </button>
      }
      </div>

      <div className="space-y-6">
        {/* SafeCare Level */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">
            SafeCare Level
          </h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((level) =>
          <label
            key={level}
            className="flex items-center gap-3 cursor-pointer group">
            
                <input
              type="checkbox"
              className="rounded border-gray-300 text-afya-deep focus:ring-afya-deep w-4 h-4 transition-colors"
              checked={selectedLevels.includes(level)}
              onChange={() =>
              toggleArrayItem(selectedLevels, setSelectedLevels, level)
              } />
            
                <SafeCareLevelIndicator
              level={level}
              size="sm"
              showLabel={false} />
            
                <span className="text-sm text-gray-700 group-hover:text-afya-deep transition-colors">
                  Level {level}
                </span>
              </label>
          )}
          </div>
        </div>

        {/* JCI Accreditation */}
        <div className="pt-4 border-t border-gray-100">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
            type="checkbox"
            className="rounded border-gray-300 text-afya-deep focus:ring-afya-deep w-4 h-4 transition-colors"
            checked={jciOnly}
            onChange={(e) => setJciOnly(e.target.checked)} />
          
            <span className="text-sm font-medium text-gray-900 group-hover:text-afya-deep transition-colors">
              JCI Accredited Only
            </span>
          </label>
        </div>

        {/* Categories */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">
            Facility Type
          </h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            {categories.map((cat) =>
          <label
            key={cat.slug}
            className="flex items-center gap-3 cursor-pointer group">
            
                <input
              type="checkbox"
              className="rounded border-gray-300 text-afya-deep focus:ring-afya-deep w-4 h-4 transition-colors"
              checked={selectedCategories.includes(cat.name)}
              onChange={() =>
              toggleArrayItem(
                selectedCategories,
                setSelectedCategories,
                cat.name
              )
              } />
            
                <span className="text-sm text-gray-700 group-hover:text-afya-deep transition-colors">
                  {cat.name}
                </span>
              </label>
          )}
          </div>
        </div>

        {/* Regions */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Region</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            {regions.map((reg) =>
          <label
            key={reg.slug}
            className="flex items-center gap-3 cursor-pointer group">
            
                <input
              type="checkbox"
              className="rounded border-gray-300 text-afya-deep focus:ring-afya-deep w-4 h-4 transition-colors"
              checked={selectedRegions.includes(reg.name)}
              onChange={() =>
              toggleArrayItem(
                selectedRegions,
                setSelectedRegions,
                reg.name
              )
              } />
            
                <span className="text-sm text-gray-700 group-hover:text-afya-deep transition-colors">
                  {reg.name}
                </span>
              </label>
          )}
          </div>
        </div>

        {/* Services */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Services</h3>
          <div className="flex flex-wrap gap-2">
            {servicesList.map((service) =>
          <button
            key={service}
            onClick={() =>
            toggleArrayItem(
              selectedServices,
              setSelectedServices,
              service
            )
            }
            className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${selectedServices.includes(service) ? 'bg-afya-deep text-white border-afya-deep shadow-sm' : 'bg-white text-gray-600 border-gray-300 hover:border-afya-deep hover:text-afya-deep'}`}>
            
                {service}
              </button>
          )}
          </div>
        </div>

        {/* Insurance */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">
            Insurance Accepted
          </h3>
          <div className="space-y-2">
            {insurancesList.map((ins) =>
          <label
            key={ins}
            className="flex items-center gap-3 cursor-pointer group">
            
                <input
              type="checkbox"
              className="rounded border-gray-300 text-afya-deep focus:ring-afya-deep w-4 h-4 transition-colors"
              checked={selectedInsurances.includes(ins)}
              onChange={() =>
              toggleArrayItem(
                selectedInsurances,
                setSelectedInsurances,
                ins
              )
              } />
            
                <span className="text-sm text-gray-700 group-hover:text-afya-deep transition-colors">
                  {ins}
                </span>
              </label>
          )}
          </div>
        </div>
      </div>
    </div>;

  return (
    <div className="bg-afya-bg min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Persistent Search Bar */}
        <motion.div
          initial={{
            opacity: 0,
            y: -10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.4
          }}
          className="bg-white rounded-xl shadow-md p-4 md:p-5 mb-8 border border-gray-100">
          
          <form onSubmit={handleTopSearchSubmit}>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Facility name..."
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-afya-deep focus:border-afya-deep bg-gray-50 transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} />
                
              </div>

              <div className="relative flex-1 md:max-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-afya-deep focus:border-afya-deep bg-gray-50 appearance-none transition-colors"
                  value={selectedRegions.length === 1 ? selectedRegions[0] : ''}
                  onChange={(e) =>
                  setSelectedRegions(e.target.value ? [e.target.value] : [])
                  }>
                  
                  <option value="">All Regions</option>
                  {regions.map((r) =>
                  <option key={r.slug} value={r.name}>
                      {r.name}
                    </option>
                  )}
                </select>
              </div>

              <div className="relative flex-1 md:max-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Activity className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-afya-deep focus:border-afya-deep bg-gray-50 appearance-none transition-colors"
                  value={
                  selectedServices.length === 1 ? selectedServices[0] : ''
                  }
                  onChange={(e) =>
                  setSelectedServices(e.target.value ? [e.target.value] : [])
                  }>
                  
                  <option value="">Any Service</option>
                  {servicesList.map((s) =>
                  <option key={s} value={s}>
                      {s}
                    </option>
                  )}
                </select>
              </div>

              <div className="relative flex-1 md:max-w-[200px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-afya-deep focus:border-afya-deep bg-gray-50 appearance-none transition-colors"
                  value={getTopLevelValue()}
                  onChange={handleTopLevelChange}>
                  
                  <option value="">Any Quality</option>
                  <option value="3">Level 3+ (Good)</option>
                  <option value="4">Level 4+ (Excellent)</option>
                  <option value="5">Level 5 (Outstanding)</option>
                </select>
              </div>

              <button
                type="submit"
                className="bg-afya-accent hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm flex justify-center items-center gap-2 md:w-auto w-full shrink-0">
                
                <Search size={18} />
                <span className="md:hidden lg:inline">Search</span>
              </button>
            </div>
          </form>
        </motion.div>

        {/* Header & Mobile Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-afya-text">
              Healthcare Facilities
            </h1>
            <div className="text-gray-600 text-sm mt-1 flex items-center gap-1">
              Showing
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={filteredFacilities.length}
                  initial={{
                    opacity: 0,
                    y: -10
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  exit={{
                    opacity: 0,
                    y: 10
                  }}
                  className="font-bold text-afya-deep inline-block">
                  
                  {filteredFacilities.length}
                </motion.span>
              </AnimatePresence>
              results
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              className="md:hidden flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
              onClick={() => setIsMobileFiltersOpen(true)}>
              
              <SlidersHorizontal size={16} />
              Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
            </button>

            <div className="flex-1 md:flex-none flex items-center gap-2">
              <span className="text-sm text-gray-500 hidden md:inline font-medium">
                Sort by:
              </span>
              <select
                className="w-full md:w-auto bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-afya-deep focus:border-afya-deep shadow-sm transition-colors cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}>
                
                <option value="relevant">Most Relevant</option>
                <option value="level">Highest SafeCare Level</option>
                <option value="rating">Best Reviewed</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-72 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </div>

          {/* Mobile Filters Drawer */}
          <AnimatePresence>
            {isMobileFiltersOpen &&
            <div className="fixed inset-0 z-50 flex md:hidden">
                <motion.div
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsMobileFiltersOpen(false)} />
              
                <motion.div
                initial={{
                  x: '-100%'
                }}
                animate={{
                  x: 0
                }}
                exit={{
                  x: '-100%'
                }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 200
                }}
                className="relative w-4/5 max-w-sm bg-white h-full overflow-y-auto shadow-2xl">
                
                  <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-100">
                    <h2 className="font-bold text-lg text-afya-text">
                      Filters
                    </h2>
                    <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
                    
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <FilterSidebar />
                  </div>
                  <div className="sticky bottom-0 bg-white p-4 border-t border-gray-100">
                    <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="w-full bg-afya-deep hover:bg-opacity-90 text-white py-3 rounded-lg font-bold transition-colors shadow-sm">
                    
                      Show {filteredFacilities.length} Results
                    </button>
                  </div>
                </motion.div>
              </div>
            }
          </AnimatePresence>

          {/* Main Content */}
          <div className="flex-grow">
            {/* Active Filters Chips */}
            <AnimatePresence>
              {activeFilterCount > 0 &&
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0
                }}
                animate={{
                  opacity: 1,
                  height: 'auto'
                }}
                exit={{
                  opacity: 0,
                  height: 0
                }}
                className="flex flex-wrap gap-2 mb-6">
                
                  {selectedLevels.map((level) =>
                <span
                  key={`lvl-${level}`}
                  className="inline-flex items-center gap-1.5 bg-afya-light text-afya-deep px-3 py-1.5 rounded-full text-sm font-medium border border-afya-mid/20">
                  
                      Level {level}
                      <button
                    onClick={() =>
                    toggleArrayItem(
                      selectedLevels,
                      setSelectedLevels,
                      level
                    )
                    }
                    className="hover:bg-white/50 rounded-full p-0.5 transition-colors">
                    
                        <X size={14} />
                      </button>
                    </span>
                )}
                  {jciOnly &&
                <span className="inline-flex items-center gap-1.5 bg-afya-light text-afya-deep px-3 py-1.5 rounded-full text-sm font-medium border border-afya-mid/20">
                      JCI Accredited
                      <button
                    onClick={() => setJciOnly(false)}
                    className="hover:bg-white/50 rounded-full p-0.5 transition-colors">
                    
                        <X size={14} />
                      </button>
                    </span>
                }
                  {selectedRegions.map((region) =>
                <span
                  key={`reg-${region}`}
                  className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                  
                      {region}
                      <button
                    onClick={() =>
                    toggleArrayItem(
                      selectedRegions,
                      setSelectedRegions,
                      region
                    )
                    }
                    className="hover:bg-gray-100 rounded-full p-0.5 transition-colors">
                    
                        <X size={14} className="text-gray-500" />
                      </button>
                    </span>
                )}
                  {selectedCategories.map((cat) =>
                <span
                  key={`cat-${cat}`}
                  className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
                  
                      {cat}
                      <button
                    onClick={() =>
                    toggleArrayItem(
                      selectedCategories,
                      setSelectedCategories,
                      cat
                    )
                    }
                    className="hover:bg-gray-100 rounded-full p-0.5 transition-colors">
                    
                        <X size={14} className="text-gray-500" />
                      </button>
                    </span>
                )}
                  {selectedServices.map((service) =>
                <span
                  key={`srv-${service}`}
                  className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium">
                  
                      {service}
                      <button
                    onClick={() =>
                    toggleArrayItem(
                      selectedServices,
                      setSelectedServices,
                      service
                    )
                    }
                    className="hover:bg-blue-100 rounded-full p-0.5 transition-colors">
                    
                        <X size={14} className="text-blue-600" />
                      </button>
                    </span>
                )}
                </motion.div>
              }
            </AnimatePresence>

            {/* Results List */}
            <div className="space-y-5">
              <AnimatePresence mode="popLayout">
                {filteredFacilities.length > 0 ?
                filteredFacilities.map((facility, index) =>
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                  layout="horizontal"
                  index={index} />

                ) :

                <motion.div
                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: 1
                  }}
                  exit={{
                    opacity: 0
                  }}
                  className="bg-white rounded-xl p-16 text-center border border-gray-200 shadow-sm">
                  
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      No facilities found
                    </h3>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                      We couldn't find any facilities matching your current
                      filters. Try adjusting your search criteria.
                    </p>
                    <button
                    onClick={clearFilters}
                    className="bg-afya-deep text-white px-8 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors shadow-sm">
                    
                      Clear all filters
                    </button>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

FacilitiesList.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;