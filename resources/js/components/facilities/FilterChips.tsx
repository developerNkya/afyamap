import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface FilterChipsProps {
  selectedLevels: number[];
  jciOnly: boolean;
  selectedRegions: string[];
  selectedCategories: string[];
  selectedServices: string[];
  toggleArrayItem: (array: any[], setArray: any, item: any) => void;
  setJciOnly: (value: boolean) => void;
  setSelectedLevels: (levels: number[]) => void;
  setSelectedRegions: (regions: string[]) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedServices: (services: string[]) => void;
}

export const FilterChips: React.FC<FilterChipsProps> = ({
  selectedLevels,
  jciOnly,
  selectedRegions,
  selectedCategories,
  selectedServices,
  toggleArrayItem,
  setJciOnly,
  setSelectedLevels,
  setSelectedRegions,
  setSelectedCategories,
  setSelectedServices
}) => {
  const activeFilterCount = selectedLevels.length + (jciOnly ? 1 : 0) +
    selectedRegions.length + selectedCategories.length + selectedServices.length;

  if (activeFilterCount === 0) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="flex flex-wrap gap-2 mb-6"
      >
        {selectedLevels.map((level) => (
          <span
            key={`lvl-${level}`}
            className="inline-flex items-center gap-1.5 bg-afya-light text-afya-deep px-3 py-1.5 rounded-full text-sm font-medium border border-afya-mid/20"
          >
            Level {level}
            <button
              onClick={() => toggleArrayItem(selectedLevels, setSelectedLevels, level)}
              className="hover:bg-white/50 rounded-full p-0.5 transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}

        {jciOnly && (
          <span className="inline-flex items-center gap-1.5 bg-afya-light text-afya-deep px-3 py-1.5 rounded-full text-sm font-medium border border-afya-mid/20">
            JCI Accredited
            <button onClick={() => setJciOnly(false)} className="hover:bg-white/50 rounded-full p-0.5 transition-colors">
              <X size={14} />
            </button>
          </span>
        )}

        {selectedRegions.map((region) => (
          <span
            key={`reg-${region}`}
            className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
          >
            {region}
            <button
              onClick={() => toggleArrayItem(selectedRegions, setSelectedRegions, region)}
              className="hover:bg-gray-100 rounded-full p-0.5 transition-colors"
            >
              <X size={14} className="text-gray-500" />
            </button>
          </span>
        ))}

        {selectedCategories.map((cat) => (
          <span
            key={`cat-${cat}`}
            className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm"
          >
            {cat}
            <button
              onClick={() => toggleArrayItem(selectedCategories, setSelectedCategories, cat)}
              className="hover:bg-gray-100 rounded-full p-0.5 transition-colors"
            >
              <X size={14} className="text-gray-500" />
            </button>
          </span>
        ))}

        {selectedServices.map((service) => (
          <span
            key={`srv-${service}`}
            className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-sm font-medium"
          >
            {service}
            <button
              onClick={() => toggleArrayItem(selectedServices, setSelectedServices, service)}
              className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
            >
              <X size={14} className="text-blue-600" />
            </button>
          </span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};