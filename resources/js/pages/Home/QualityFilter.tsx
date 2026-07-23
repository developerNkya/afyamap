import { AnimatePresence, motion } from 'framer-motion';
import { Award, BadgeCheck, ChevronDown, Filter, Shield, Sliders, Star } from 'lucide-react';
import React, { useState } from 'react';

interface QualityFilterProps {
    selectedLevel: string;
    setSelectedLevel: (level: string) => void;
    showAdvanced: boolean;
    setShowAdvanced: (show: boolean) => void;
    categories: any[];
    insurances?: any[];
    selectedInsurance?: string;
    setSelectedInsurance?: (insurance: string) => void;
    selectedCategory?: string;
    setSelectedCategory?: (category: string) => void;
    jciOnly: boolean;
    setJciOnly: (jci: boolean) => void;
}

export const QualityFilter: React.FC<QualityFilterProps> = ({
    selectedLevel,
    setSelectedLevel,
    showAdvanced,
    setShowAdvanced,
    categories,
    insurances = [],
    selectedInsurance = '',
    setSelectedInsurance = () => {},
    selectedCategory = '',
    setSelectedCategory = () => {},
    jciOnly,
    setJciOnly,
}) => {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Combined quality options with levels and JCI
    const qualityOptions = [
        { value: '', label: 'All Quality', icon: <Shield size={14} /> },
        { value: 'level-1', label: 'Level 1 - Basic', icon: <Star size={12} /> },
        { value: 'level-2', label: 'Level 2 - Standard', icon: <Star size={12} /> },
        { value: 'level-3', label: 'Level 3 - Good', icon: <Star size={12} /> },
        { value: 'level-4', label: 'Level 4 - Excellent', icon: <Star size={12} /> },
        { value: 'level-5', label: 'Level 5 - Outstanding', icon: <Award size={12} /> },
        { value: 'jci', label: 'JCI Accredited Only', icon: <BadgeCheck size={14} /> },
    ];

    // Handle quality selection change
    const handleQualityChange = (value: string) => {
        if (value === 'jci') {
            setSelectedLevel('');
            setJciOnly(true);
        } else if (value.startsWith('level-')) {
            const level = value.replace('level-', '');
            setSelectedLevel(level);
            setJciOnly(false);
        } else {
            setSelectedLevel('');
            setJciOnly(false);
        }
    };

    // Get current selected option for display
    const getCurrentOption = () => {
        if (jciOnly) return qualityOptions.find((opt) => opt.value === 'jci');
        if (selectedLevel) return qualityOptions.find((opt) => opt.value === `level-${selectedLevel}`);
        return qualityOptions.find((opt) => opt.value === '');
    };

    const currentOption = getCurrentOption();

    return (
        <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
            <div className="p-4 sm:p-5">
                {/* Desktop View */}
                <div className="hidden items-center justify-between gap-4 sm:flex sm:flex-row">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <Sliders size={14} className="text-afya-deep" />
                            <span className="text-sm font-medium text-gray-700">Quality:</span>
                        </div>

                        {/* Combined Quality Dropdown */}
                        <div className="relative">
                            <select
                                className="focus:border-afya-deep focus:ring-afya-deep/20 min-w-[180px] appearance-none rounded-full border border-gray-200 bg-white px-4 py-1.5 pr-8 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:outline-none"
                                value={jciOnly ? 'jci' : selectedLevel ? `level-${selectedLevel}` : ''}
                                onChange={(e) => handleQualityChange(e.target.value)}
                            >
                                {qualityOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                <ChevronDown size={14} className="text-gray-400" />
                            </div>
                        </div>

                        {/* Show selected badge */}
                        {currentOption && currentOption.value !== '' && (
                            <span className="bg-afya-deep/10 text-afya-deep inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium">
                                {currentOption.icon}
                                {currentOption.label}
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
                            <span className="text-sm font-medium text-gray-700">Quality</span>
                            {currentOption && currentOption.value !== '' && (
                                <span className="bg-afya-deep rounded-full px-2 py-0.5 text-xs text-white">{currentOption.label}</span>
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
                                            Quality Filter
                                        </label>
                                        <select
                                            className="focus:border-afya-deep focus:ring-afya-deep/20 block w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 transition-all focus:ring-2 focus:outline-none"
                                            value={jciOnly ? 'jci' : selectedLevel ? `level-${selectedLevel}` : ''}
                                            onChange={(e) => {
                                                handleQualityChange(e.target.value);
                                                setIsMobileFilterOpen(false);
                                            }}
                                        >
                                            {qualityOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
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
                                        className="focus:ring-afya-deep block w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2"
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
                                        className="focus:ring-afya-deep block w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2"
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
