import { motion } from 'framer-motion';
import { Activity, ChevronDown, MapPin, Search, Shield } from 'lucide-react';
import React, { useState } from 'react';

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
    // Add JCI props
    jciOnly?: boolean;
    setJciOnly?: (jci: boolean) => void;
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
    servicesList,
    jciOnly = false,
    setJciOnly = () => {},
}) => {
    const [isSearchHovered, setIsSearchHovered] = useState(false);

    // Combined quality options with levels and JCI
    const qualityOptions = [
        { value: '', label: 'All Quality' },
        { value: 'level-1', label: 'Level 1 - Basic' },
        { value: 'level-2', label: 'Level 2 - Standard' },
        { value: 'level-3', label: 'Level 3 - Good' },
        { value: 'level-4', label: 'Level 4 - Excellent' },
        { value: 'level-5', label: 'Level 5 - Outstanding' },
        { value: 'jci', label: 'JCI Accredited Only' },
    ];

    // Get current selected quality value
    const getQualityValue = () => {
        if (jciOnly) return 'jci';
        if (selectedLevels.length > 0) {
            const minLevel = Math.min(...selectedLevels);
            return `level-${minLevel}`;
        }
        return '';
    };

    // Handle quality selection change
    const handleQualityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;

        if (value === 'jci') {
            setSelectedLevels([]);
            setJciOnly(true);
        } else if (value.startsWith('level-')) {
            const level = parseInt(value.replace('level-', ''));
            // Set levels from this level up to 5
            const levels = [];
            for (let i = level; i <= 5; i++) levels.push(i);
            setSelectedLevels(levels);
            setJciOnly(false);
        } else {
            setSelectedLevels([]);
            setJciOnly(false);
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
            className="mb-8 rounded-xl border border-gray-200 bg-white p-4 shadow-lg md:p-5"
        >
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-3 md:flex-row">
                    {/* Search Input - Facility Name */}
                    <div className="group relative flex-1">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="group-focus-within:text-afya-deep h-5 w-5 text-gray-400 transition-colors" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search facility name..."
                            className="focus:ring-afya-deep block w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pr-3 pl-10 text-gray-900 placeholder-gray-400 transition-all hover:bg-white focus:border-transparent focus:ring-2"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Region Select */}
                    <div className="group relative flex-1 md:max-w-[200px]">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <MapPin className="group-focus-within:text-afya-deep h-5 w-5 text-gray-400 transition-colors" />
                        </div>
                        <select
                            className="focus:ring-afya-deep block w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-3 pr-8 pl-10 text-gray-900 transition-all hover:bg-white focus:border-transparent focus:ring-2"
                            value={selectedRegions.length === 1 ? selectedRegions[0] : ''}
                            onChange={(e) => setSelectedRegions(e.target.value ? [e.target.value] : [])}
                        >
                            <option value="">All Regions</option>
                            {regions.map((r) => (
                                <option key={r.id ?? r.slug} value={r.name}>
                                    {r.name}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Service Select */}
                    <div className="group relative flex-1 md:max-w-[200px]">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Activity className="group-focus-within:text-afya-deep h-5 w-5 text-gray-400 transition-colors" />
                        </div>
                        <select
                            className="focus:ring-afya-deep block w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-3 pr-8 pl-10 text-gray-900 transition-all hover:bg-white focus:border-transparent focus:ring-2"
                            value={selectedServices.length === 1 ? selectedServices[0] : ''}
                            onChange={(e) => setSelectedServices(e.target.value ? [e.target.value] : [])}
                        >
                            <option value="">Any Service</option>
                            {servicesList.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Quality Level Select - Combined with JCI */}
                    <div className="group relative flex-1 md:max-w-[220px]">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Shield className="group-focus-within:text-afya-deep h-5 w-5 text-gray-400 transition-colors" />
                        </div>
                        <select
                            className="focus:ring-afya-deep block w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-3 pr-8 pl-10 text-gray-900 transition-all hover:bg-white focus:border-transparent focus:ring-2"
                            value={getQualityValue()}
                            onChange={handleQualityChange}
                        >
                            {qualityOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Search Button - Matching Hero Section Style */}
                    <button
                        type="submit"
                        onMouseEnter={() => setIsSearchHovered(true)}
                        onMouseLeave={() => setIsSearchHovered(false)}
                        className="from-afya-deep to-afya-mid hover:from-afya-mid hover:to-afya-deep group relative flex w-full shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r px-6 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg md:w-auto"
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
                            className="absolute inset-0 rounded-xl bg-white/20"
                            initial={{ x: '-100%', opacity: 0 }}
                            animate={{ x: isSearchHovered ? '100%' : '-100%', opacity: isSearchHovered ? 0.5 : 0 }}
                            transition={{ duration: 0.6 }}
                        />
                    </button>
                </div>
            </form>
        </motion.div>
    );
};
