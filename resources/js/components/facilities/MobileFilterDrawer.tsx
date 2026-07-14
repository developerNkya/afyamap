import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  resultCount: number;
  selectedLevels: number[];
  setSelectedLevels: (levels: number[]) => void;
  jciOnly: boolean;
  setJciOnly: (value: boolean) => void;
  selectedRegions: string[];
  setSelectedRegions: (regions: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedServices: string[];
  setSelectedServices: (services: string[]) => void;
  selectedInsurances: string[];
  setSelectedInsurances: (insurances: string[]) => void;
  toggleArrayItem: (array: any[], setArray: any, item: any) => void;
  clearFilters: () => void;
  activeFilterCount: number;
  categories: any[];
  regions: any[];
  servicesList: string[];
  insurancesList: string[];
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  resultCount,
  ...filterProps
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-4/5 max-w-sm bg-white h-full overflow-y-auto shadow-2xl"
          >
            <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-100">
              <h2 className="font-bold text-lg text-gray-800">Filters</h2>
              <button onClick={onClose} className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <div className="p-4">
              <FilterSidebar {...filterProps} />
            </div>

            <div className="sticky bottom-0 bg-white p-4 border-t border-gray-100">
              <button
                onClick={onClose}
                className="w-full bg-afya-deep hover:bg-opacity-90 text-white py-3 rounded-lg font-bold transition-colors shadow-sm"
              >
                Show {resultCount} Results
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};