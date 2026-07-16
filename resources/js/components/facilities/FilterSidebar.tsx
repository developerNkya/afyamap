import React from 'react';
import { Filter, Shield } from 'lucide-react';
import { SafeCareLevelIndicator } from '../ui/SafeCareLevelIndicator';

interface FilterSidebarProps {
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

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
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
  categories,
  regions,
  servicesList,
  insurancesList
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg flex items-center gap-2 text-gray-800">
          <Filter size={20} /> Filters
        </h2>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-afya-accent hover:underline font-medium transition-all"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* SafeCare Level */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">SafeCare Level</h3>
          <div className="space-y-3">
            {[5, 4, 3, 2, 1].map((level) => (
              <label key={level} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-afya-deep focus:ring-afya-deep w-4 h-4 transition-colors"
                  checked={selectedLevels.includes(level)}
                  onChange={() => toggleArrayItem(selectedLevels, setSelectedLevels, level)}
                />
                <SafeCareLevelIndicator level={level} size="sm" showLabel={false} />
                <span className="text-sm text-gray-700 group-hover:text-afya-deep transition-colors">
                  Level {level}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* JCI Accreditation */}
        <div className="pt-4 border-t border-gray-100">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-afya-deep focus:ring-afya-deep w-4 h-4 transition-colors"
              checked={jciOnly}
              onChange={(e) => setJciOnly(e.target.checked)}
            />
            <span className="text-sm font-medium text-gray-900 group-hover:text-afya-deep transition-colors">
              JCI Accredited Only
            </span>
          </label>
        </div>

        {/* Categories */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Facility Type</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            {categories.map((cat) => (
              <label key={cat.id ?? cat.slug} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-afya-deep focus:ring-afya-deep w-4 h-4 transition-colors"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => toggleArrayItem(selectedCategories, setSelectedCategories, cat.name)}
                />
                <span className="text-sm text-gray-700 group-hover:text-afya-deep transition-colors">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Region</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            {regions.map((reg) => (
              <label key={reg.id ?? reg.slug} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-afya-deep focus:ring-afya-deep w-4 h-4 transition-colors"
                  checked={selectedRegions.includes(reg.name)}
                  onChange={() => toggleArrayItem(selectedRegions, setSelectedRegions, reg.name)}
                />
                <span className="text-sm text-gray-700 group-hover:text-afya-deep transition-colors">
                  {reg.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Services</h3>
          <div className="flex flex-wrap gap-2">
            {servicesList.map((service) => (
              <button
                key={service}
                onClick={() => toggleArrayItem(selectedServices, setSelectedServices, service)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-200 ${
                  selectedServices.includes(service)
                    ? 'bg-afya-deep text-white border-afya-deep shadow-sm'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-afya-deep hover:text-afya-deep'
                }`}
              >
                {service}
              </button>
            ))}
          </div>
        </div>

        {/* Insurance */}
        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-3 text-sm">Insurance Accepted</h3>
          <div className="space-y-2">
            {insurancesList.map((ins) => (
              <label key={ins} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-afya-deep focus:ring-afya-deep w-4 h-4 transition-colors"
                  checked={selectedInsurances.includes(ins)}
                  onChange={() => toggleArrayItem(selectedInsurances, setSelectedInsurances, ins)}
                />
                <span className="text-sm text-gray-700 group-hover:text-afya-deep transition-colors">
                  {ins}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};