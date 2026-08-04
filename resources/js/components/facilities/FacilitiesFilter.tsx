// components/facilities/FacilitiesFilter.tsx
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Filter, Sliders } from 'lucide-react';
import React, { useState } from 'react';

interface FacilitiesFilterProps {
    showAdvanced: boolean;
    setShowAdvanced: (show: boolean) => void;
    categories: any[];
    insurances?: any[];
    selectedInsurance?: string;
    setSelectedInsurance?: (insurance: string) => void;
    selectedCategory?: string;
    setSelectedCategory?: (category: string) => void;
    activeFilterCount?: number;
}

export const FacilitiesFilter: React.FC<FacilitiesFilterProps> = ({
    showAdvanced,
    setShowAdvanced,
    categories,
    insurances = [],
    selectedInsurance = '',
    setSelectedInsurance = () => {},
    selectedCategory = '',
    setSelectedCategory = () => {},
    activeFilterCount = 0,
}) => {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    return (
        <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="p-4 sm:p-5">
                {/* Desktop View */}
                <div className="hidden items-center justify-between gap-4 sm:flex sm:flex-row">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <Sliders size={14} className="text-afya-deep" />
                            <span className="text-sm font-medium text-gray-700">Filters:</span>
                        </div>

                        {/* Show active filter count */}
                        {activeFilterCount > 0 && (
                            <span className="bg-afya-deep/10 text-afya-deep inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium">
                                {activeFilterCount} active
                            </span>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        type="button"
                        onClick={() => setShowAdvanced(!showAdvanced)}
                        className="text-afya-deep flex items-center gap-1.5 text-sm font-medium whitespace-nowrap hover:underline"
                    >
                        <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={14} />
                        </motion.div>
                        {showAdvanced ? 'Less filters' : 'More filters'}
                    </motion.button>
                </div>

                {/* Mobile View */}
                <div className="sm:hidden">
                    <button
                        type="button"
                        onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                        className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm"
                    >
                        <div className="flex items-center gap-2">
                            <div className="bg-afya-light rounded-lg p-1.5">
                                <Filter size={14} className="text-afya-deep" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Filters</span>
                            {activeFilterCount > 0 && (
                                <span className="bg-afya-deep rounded-full px-2 py-0.5 text-xs text-white">{activeFilterCount}</span>
                            )}
                        </div>
                        <motion.div animate={{ rotate: isMobileFilterOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronDown size={16} className="text-gray-500" />
                        </motion.div>
                    </button>

                    <AnimatePresence>
                        {isMobileFilterOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-3 overflow-hidden"
                            >
                                <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-3">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                            Facility Category
                                        </label>
                                        <select
                                            className="focus:border-afya-deep focus:ring-afya-deep/20 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all focus:ring-2 focus:outline-none"
                                            value={selectedCategory}
                                            onChange={(e) => {
                                                setSelectedCategory(e.target.value);
                                                setIsMobileFilterOpen(false);
                                            }}
                                        >
                                            <option value="">All Categories</option>
                                            {categories.map((c) => (
                                                <option key={c.id || c.slug} value={c.name || c.slug}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                            Insurance Accepted
                                        </label>
                                        <select
                                            className="focus:border-afya-deep focus:ring-afya-deep/20 block w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all focus:ring-2 focus:outline-none"
                                            value={selectedInsurance}
                                            onChange={(e) => {
                                                setSelectedInsurance(e.target.value);
                                                setIsMobileFilterOpen(false);
                                            }}
                                        >
                                            <option value="">Any Insurance</option>
                                            {insurances.map((ins) => (
                                                <option key={ins.id || ins.insurance_id} value={ins.name}>
                                                    {ins.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setShowAdvanced(!showAdvanced)}
                                        className="text-afya-deep mt-1 flex w-full items-center gap-1.5 border-t border-gray-100 pt-2 text-left text-xs font-medium"
                                    >
                                        <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                            <ChevronDown size={12} />
                                        </motion.div>
                                        {showAdvanced ? 'Hide advanced filters' : 'Show advanced filters'}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Advanced Filters */}
                <AnimatePresence>
                    {showAdvanced && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 overflow-hidden border-t border-gray-200 pt-4"
                        >
                            <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-4 sm:space-y-0">
                                {/* Facility Category - Dynamic from DB */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                        Facility Category
                                    </label>
                                    <select
                                        className="focus:ring-afya-deep block w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition-all focus:border-transparent focus:ring-2"
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((c) => (
                                            <option key={c.id || c.slug} value={c.name || c.slug}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Insurance Accepted - Dynamic from DB */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                        Insurance Accepted
                                    </label>
                                    <select
                                        className="focus:ring-afya-deep block w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 transition-all focus:border-transparent focus:ring-2"
                                        value={selectedInsurance}
                                        onChange={(e) => setSelectedInsurance(e.target.value)}
                                    >
                                        <option value="">Any Insurance</option>
                                        {insurances.map((ins) => (
                                            <option key={ins.id || ins.insurance_id} value={ins.name}>
                                                {ins.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
