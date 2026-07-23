import { Filter } from 'lucide-react';
import React from 'react';
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
    insurancesList,
}) => {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-lg font-bold text-gray-800">
                    <Filter size={20} /> Filters
                </h2>
                {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-afya-accent text-sm font-medium transition-all hover:underline">
                        Clear all
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {/* SafeCare Level */}
                <div>
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">SafeCare Level</h3>
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((level) => (
                            <label key={level} className="group flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="text-afya-deep focus:ring-afya-deep h-4 w-4 rounded border-gray-300 transition-colors"
                                    checked={selectedLevels.includes(level)}
                                    onChange={() => toggleArrayItem(selectedLevels, setSelectedLevels, level)}
                                />
                                <SafeCareLevelIndicator level={level} size="sm" showLabel={false} />
                                <span className="group-hover:text-afya-deep text-sm text-gray-700 transition-colors">Level {level}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* JCI Accreditation */}
                <div className="border-t border-gray-100 pt-4">
                    <label className="group flex cursor-pointer items-center gap-3">
                        <input
                            type="checkbox"
                            className="text-afya-deep focus:ring-afya-deep h-4 w-4 rounded border-gray-300 transition-colors"
                            checked={jciOnly}
                            onChange={(e) => setJciOnly(e.target.checked)}
                        />
                        <span className="group-hover:text-afya-deep text-sm font-medium text-gray-900 transition-colors">JCI Accredited</span>
                    </label>
                </div>

                {/* Categories */}
                <div className="border-t border-gray-100 pt-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">Facility Type</h3>
                    <div className="custom-scrollbar max-h-40 space-y-2 overflow-y-auto pr-2">
                        {categories.map((cat) => (
                            <label key={cat.id ?? cat.slug} className="group flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="text-afya-deep focus:ring-afya-deep h-4 w-4 rounded border-gray-300 transition-colors"
                                    checked={selectedCategories.includes(cat.name)}
                                    onChange={() => toggleArrayItem(selectedCategories, setSelectedCategories, cat.name)}
                                />
                                <span className="group-hover:text-afya-deep text-sm text-gray-700 transition-colors">{cat.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Regions */}
                <div className="border-t border-gray-100 pt-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">Region</h3>
                    <div className="custom-scrollbar max-h-40 space-y-2 overflow-y-auto pr-2">
                        {regions.map((reg) => (
                            <label key={reg.id ?? reg.slug} className="group flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="text-afya-deep focus:ring-afya-deep h-4 w-4 rounded border-gray-300 transition-colors"
                                    checked={selectedRegions.includes(reg.name)}
                                    onChange={() => toggleArrayItem(selectedRegions, setSelectedRegions, reg.name)}
                                />
                                <span className="group-hover:text-afya-deep text-sm text-gray-700 transition-colors">{reg.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Services */}
                <div className="border-t border-gray-100 pt-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">Services</h3>
                    <div className="flex flex-wrap gap-2">
                        {servicesList.map((service) => (
                            <button
                                key={service}
                                onClick={() => toggleArrayItem(selectedServices, setSelectedServices, service)}
                                className={`rounded-full border px-3 py-1.5 text-xs transition-all duration-200 ${
                                    selectedServices.includes(service)
                                        ? 'bg-afya-deep border-afya-deep text-white shadow-sm'
                                        : 'hover:border-afya-deep hover:text-afya-deep border-gray-300 bg-white text-gray-600'
                                }`}
                            >
                                {service}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Insurance */}
                <div className="border-t border-gray-100 pt-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">Insurance Accepted</h3>
                    <div className="space-y-2">
                        {insurancesList.map((ins) => (
                            <label key={ins} className="group flex cursor-pointer items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="text-afya-deep focus:ring-afya-deep h-4 w-4 rounded border-gray-300 transition-colors"
                                    checked={selectedInsurances.includes(ins)}
                                    onChange={() => toggleArrayItem(selectedInsurances, setSelectedInsurances, ins)}
                                />
                                <span className="group-hover:text-afya-deep text-sm text-gray-700 transition-colors">{ins}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
