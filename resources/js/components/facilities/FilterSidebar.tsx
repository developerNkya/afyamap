// components/facilities/FilterSidebar.tsx
import { Activity, Bone, Brain, ChevronDown, ChevronUp, Droplets, Eye, Filter, Heart, Layers, Pill, Stethoscope } from 'lucide-react';
import React, { useState } from 'react';
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
    servicesList: string[] | Record<string, string[]>;
    insurancesList: string[];
}

// Category icon mapping
const categoryIcons: Record<string, React.ReactNode> = {
    'General Medicine': <Stethoscope size={14} />,
    Cardiology: <Heart size={14} />,
    Neurology: <Brain size={14} />,
    Orthopedics: <Bone size={14} />,
    Ophthalmology: <Eye size={14} />,
    Dermatology: <Droplets size={14} />,
    Pharmacy: <Pill size={14} />,
};

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
    // Check if services are grouped by category
    const isGrouped = servicesList && !Array.isArray(servicesList) && typeof servicesList === 'object';
    const groupedServices: Record<string, string[]> = isGrouped ? (servicesList as Record<string, string[]>) : {};
    const flatServices: string[] = Array.isArray(servicesList) ? servicesList : [];

    const [openServiceCategories, setOpenServiceCategories] = useState<Record<string, boolean>>({});

    const toggleServiceCategory = (cat: string) => {
        setOpenServiceCategories((prev) => ({
            ...prev,
            [cat]: !prev[cat],
        }));
    };

    const getCategoryIcon = (category: string) => {
        return categoryIcons[category] || <Layers size={14} />;
    };

    const hasSelectedServices = (services: string[]) => {
        return services.some((s) => selectedServices.includes(s));
    };

    const getSelectedCount = (services: string[]) => {
        return services.filter((s) => selectedServices.includes(s)).length;
    };

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

                {/* Services - Grouped by Category */}
                <div className="border-t border-gray-100 pt-4">
                    <h3 className="mb-3 text-sm font-semibold text-gray-900">Services</h3>

                    {isGrouped && Object.keys(groupedServices).length > 0 ? (
                        <div className="space-y-2">
                            {Object.entries(groupedServices).map(([category, services]) => {
                                const serviceArray = Array.isArray(services) ? services : [];
                                const isOpen = openServiceCategories[category] ?? false;
                                const hasSelected = hasSelectedServices(serviceArray);
                                const selectedCount = getSelectedCount(serviceArray);

                                return (
                                    <div key={category} className="overflow-hidden rounded-lg border border-gray-100">
                                        <button
                                            type="button"
                                            onClick={() => toggleServiceCategory(category)}
                                            className={`flex w-full items-center justify-between px-3 py-2 text-left transition-colors hover:bg-gray-50 ${
                                                hasSelected ? 'bg-afya-light/30' : ''
                                            }`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-afya-deep">{getCategoryIcon(category)}</span>
                                                <span className="text-sm font-medium text-gray-700">{category}</span>
                                                {hasSelected && selectedCount > 0 && (
                                                    <span className="bg-afya-deep rounded-full px-1.5 py-0.5 text-xs text-white">
                                                        {selectedCount}
                                                    </span>
                                                )}
                                            </div>
                                            {isOpen ? (
                                                <ChevronUp size={14} className="text-gray-400" />
                                            ) : (
                                                <ChevronDown size={14} className="text-gray-400" />
                                            )}
                                        </button>

                                        {isOpen && serviceArray.length > 0 && (
                                            <div className="border-t border-gray-100 px-3 py-2">
                                                <div className="flex flex-wrap gap-1.5">
                                                    {serviceArray.map((service) => {
                                                        const isSelected = selectedServices.includes(service);
                                                        return (
                                                            <button
                                                                key={service}
                                                                onClick={() => toggleArrayItem(selectedServices, setSelectedServices, service)}
                                                                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs transition-all duration-200 ${
                                                                    isSelected
                                                                        ? 'bg-afya-deep text-white shadow-sm'
                                                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                                }`}
                                                            >
                                                                <Activity size={10} />
                                                                {service}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {flatServices.map((service) => (
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
                    )}
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

// Make sure to export as default as well for compatibility
export default FilterSidebar;
