import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Activity, Shield, ChevronDown } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedRegions: string[];
  setSelectedRegions: (regions: string[]) => void;
  selectedServices: string[];
  setSelectedServices: (services: string[]) => void;
  selectedLevels: number[];
  setSelectedLevels: (levels: number[]) => void;
  regions: any[];
  servicesList: string[];
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedRegions,
  setSelectedRegions,
  selectedServices,
  setSelectedServices,
  selectedLevels,
  setSelectedLevels,
  regions,
  servicesList
}) => {
  const [isSearchHovered, setIsSearchHovered] = useState(false);

  const getTopLevelValue = () => {
    if (selectedLevels.length === 0) return '';
    return Math.min(...selectedLevels).toString();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-lg p-4 md:p-5 mb-8 border border-gray-200"
    >
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input - Facility Name */}
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-afya-deep transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search facility name..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-afya-deep focus:border-transparent bg-gray-50/50 hover:bg-white transition-all text-gray-900 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Region Select */}
          <div className="relative flex-1 md:max-w-[200px] group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-afya-deep transition-colors" />
            </div>
            <select
              className="block w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-afya-deep focus:border-transparent bg-gray-50/50 hover:bg-white appearance-none transition-all cursor-pointer text-gray-900"
              value={selectedRegions.length === 1 ? selectedRegions[0] : ''}
              onChange={(e) => setSelectedRegions(e.target.value ? [e.target.value] : [])}
            >
              <option value="">All Regions</option>
              {regions.map((r) => (
                <option key={r.id ?? r.slug} value={r.name}>{r.name}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Service Select */}
          <div className="relative flex-1 md:max-w-[200px] group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Activity className="h-5 w-5 text-gray-400 group-focus-within:text-afya-deep transition-colors" />
            </div>
            <select
              className="block w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-afya-deep focus:border-transparent bg-gray-50/50 hover:bg-white appearance-none transition-all cursor-pointer text-gray-900"
              value={selectedServices.length === 1 ? selectedServices[0] : ''}
              onChange={(e) => setSelectedServices(e.target.value ? [e.target.value] : [])}
            >
              <option value="">Any Service</option>
              {servicesList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Quality Level Select */}
          <div className="relative flex-1 md:max-w-[200px] group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Shield className="h-5 w-5 text-gray-400 group-focus-within:text-afya-deep transition-colors" />
            </div>
            <select
              className="block w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-afya-deep focus:border-transparent bg-gray-50/50 hover:bg-white appearance-none transition-all cursor-pointer text-gray-900"
              value={getTopLevelValue()}
              onChange={handleTopLevelChange}
            >
              <option value="">Any Quality</option>
              <option value="3">⭐ Level 3+ (Good)</option>
              <option value="4">⭐⭐ Level 4+ (Excellent)</option>
              <option value="5">⭐⭐⭐ Level 5 (Outstanding)</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Search Button - Matching Hero Section Style */}
          <button
            type="submit"
            onMouseEnter={() => setIsSearchHovered(true)}
            onMouseLeave={() => setIsSearchHovered(false)}
            className="bg-gradient-to-r from-afya-deep to-afya-mid hover:from-afya-mid hover:to-afya-deep text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg flex justify-center items-center gap-2 md:w-auto w-full shrink-0 relative overflow-hidden group"
          >
            <motion.div
              animate={{ x: isSearchHovered ? [0, 3, 0] : 0 }}
              transition={{ repeat: isSearchHovered ? Infinity : 0, duration: 0.5 }}
            >
              <Search size={18} />
            </motion.div>
            <span>Search</span>
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-white/20 rounded-xl"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: isSearchHovered ? "100%" : "-100%", opacity: isSearchHovered ? 0.5 : 0 }}
              transition={{ duration: 0.6 }}
            />
          </button>
        </div>
      </form>
    </motion.div>
  );
};