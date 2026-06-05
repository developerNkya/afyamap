import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Activity, Shield } from 'lucide-react';

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
      className="bg-white rounded-xl shadow-md p-4 md:p-5 mb-8 border border-gray-100"
    >
      <form onSubmit={handleSubmit}>
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
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative flex-1 md:max-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-afya-deep focus:border-afya-deep bg-gray-50 appearance-none transition-colors"
              value={selectedRegions.length === 1 ? selectedRegions[0] : ''}
              onChange={(e) => setSelectedRegions(e.target.value ? [e.target.value] : [])}
            >
              <option value="">All Regions</option>
              {regions.map((r) => (
                <option key={r.slug} value={r.name}>{r.name}</option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 md:max-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-afya-deep focus:border-afya-deep bg-gray-50 appearance-none transition-colors"
              value={selectedServices.length === 1 ? selectedServices[0] : ''}
              onChange={(e) => setSelectedServices(e.target.value ? [e.target.value] : [])}
            >
              <option value="">Any Service</option>
              {servicesList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="relative flex-1 md:max-w-[200px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Shield className="h-5 w-5 text-gray-400" />
            </div>
            <select
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-afya-deep focus:border-afya-deep bg-gray-50 appearance-none transition-colors"
              value={getTopLevelValue()}
              onChange={handleTopLevelChange}
            >
              <option value="">Any Quality</option>
              <option value="3">Level 3+ (Good)</option>
              <option value="4">Level 4+ (Excellent)</option>
              <option value="5">Level 5 (Outstanding)</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-afya-accent hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-sm flex justify-center items-center gap-2 md:w-auto w-full shrink-0"
          >
            <Search size={18} />
            <span className="md:hidden lg:inline">Search</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};