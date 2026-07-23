// pages/Home/HeroSection.tsx
import { motion } from 'framer-motion';
import { Activity, ChevronDown, MapPin, Search, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { FloatingParticles } from './FloatingParticles';
import { QualityFilter } from './QualityFilter';

interface HeroSectionProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedRegion: string;
    setSelectedRegion: (region: string) => void;
    selectedService: string;
    setSelectedService: (service: string) => void;
    selectedLevel: string;
    setSelectedLevel: (level: string) => void;
    showAdvanced: boolean;
    setShowAdvanced: (show: boolean) => void;
    handleSearch: (e: React.FormEvent) => void;
    regions: any[];
    servicesList: string[];
    categories: any[];
    insurances?: any[];
    selectedInsurance?: string;
    setSelectedInsurance?: (insurance: string) => void;
    selectedCategory?: string;
    setSelectedCategory?: (category: string) => void;
    jciOnly: boolean;
    setJciOnly: (jci: boolean) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    searchQuery,
    setSearchQuery,
    selectedRegion,
    setSelectedRegion,
    selectedService,
    setSelectedService,
    selectedLevel,
    setSelectedLevel,
    showAdvanced,
    setShowAdvanced,
    handleSearch,
    regions,
    servicesList,
    categories,
    insurances = [],
    selectedInsurance = '',
    setSelectedInsurance = () => {},
    selectedCategory = '',
    setSelectedCategory = () => {},
    jciOnly,
    setJciOnly,
}) => {
    const [isSearchHovered, setIsSearchHovered] = useState(false);

    return (
        <section className="bg-afya-deep relative overflow-hidden pt-16 pb-24 text-white sm:pt-20 sm:pb-32">
            <div className="absolute inset-0 z-0 opacity-20">
                <img
                    src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=2000"
                    alt="Healthcare background"
                    className="h-full w-full object-cover"
                />
                <div className="bg-afya-deep absolute inset-0 mix-blend-multiply"></div>
            </div>

            <FloatingParticles />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm sm:mb-6"
                    >
                        <Sparkles className="h-3 w-3 text-blue-300 sm:h-3.5 sm:w-3.5" />
                        <span className="text-xs font-medium sm:text-sm">Trusted by 50,000+ patients</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-4 px-2 text-3xl font-bold tracking-tight sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl"
                    >
                        Find safer healthcare across Tanzania
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6 px-4 text-base text-blue-100 sm:mb-8 sm:text-lg md:text-xl"
                    >
                        Quality transparency improves healthcare decision-making. Compare facilities based on verified safety standards, services, and
                        patient reviews.
                    </motion.p>
                </div>

                {/* Search Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white text-gray-800 shadow-2xl"
                >
                    <form onSubmit={handleSearch}>
                        <div className="p-5 sm:p-6">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                                <div className="group relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Search className="group-focus-within:text-afya-deep h-4 w-4 text-gray-400 transition-colors sm:h-5 sm:w-5" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search facility..."
                                        className="focus:ring-afya-deep block w-full rounded-xl border border-gray-200 bg-gray-50/50 py-3 pr-3 pl-9 text-sm transition-all hover:bg-white focus:border-transparent focus:ring-2 sm:pl-10 sm:text-base"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <div className="group relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <MapPin className="group-focus-within:text-afya-deep h-4 w-4 text-gray-400 transition-colors sm:h-5 sm:w-5" />
                                    </div>
                                    <select
                                        className="focus:ring-afya-deep block w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-3 pr-8 pl-9 text-sm transition-all hover:bg-white focus:border-transparent focus:ring-2 sm:pl-10 sm:text-base"
                                        value={selectedRegion}
                                        onChange={(e) => setSelectedRegion(e.target.value)}
                                    >
                                        <option value="">All Regions</option>
                                        {regions.map((r) => (
                                            <option key={r.slug || r.id} value={r.name}>
                                                {r.name}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <ChevronDown size={16} className="text-gray-400" />
                                    </div>
                                </div>

                                <div className="group relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Activity className="group-focus-within:text-afya-deep h-4 w-4 text-gray-400 transition-colors sm:h-5 sm:w-5" />
                                    </div>
                                    <select
                                        className="focus:ring-afya-deep block w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50/50 py-3 pr-8 pl-9 text-sm transition-all hover:bg-white focus:border-transparent focus:ring-2 sm:pl-10 sm:text-base"
                                        value={selectedService}
                                        onChange={(e) => setSelectedService(e.target.value)}
                                    >
                                        <option value="">Any Service</option>
                                        {servicesList.map((s) => (
                                            <option key={s} value={s}>
                                                {s}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                        <ChevronDown size={16} className="text-gray-400" />
                                    </div>
                                </div>

                                <div>
                                    <motion.button
                                        whileHover={{ scale: 1.02, y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                        onHoverStart={() => setIsSearchHovered(true)}
                                        onHoverEnd={() => setIsSearchHovered(false)}
                                        type="submit"
                                        className="bg-afya-accent group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl px-4 py-3 font-semibold text-white shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
                                    >
                                        <motion.div
                                            animate={{ x: isSearchHovered ? [0, 3, 0] : 0 }}
                                            transition={{ repeat: isSearchHovered ? Infinity : 0, duration: 0.5 }}
                                        >
                                            <Search size={18} className="sm:h-5 sm:w-5" />
                                        </motion.div>
                                        <span>Search Facilities</span>
                                        <motion.div
                                            className="absolute inset-0 rounded-xl bg-white/20"
                                            initial={{ x: '-100%', opacity: 0 }}
                                            animate={{ x: isSearchHovered ? '100%' : '-100%', opacity: isSearchHovered ? 0.5 : 0 }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        <QualityFilter
                            selectedLevel={selectedLevel}
                            setSelectedLevel={setSelectedLevel}
                            showAdvanced={showAdvanced}
                            setShowAdvanced={setShowAdvanced}
                            categories={categories}
                            insurances={insurances}
                            selectedInsurance={selectedInsurance}
                            setSelectedInsurance={setSelectedInsurance}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            jciOnly={jciOnly}
                            setJciOnly={setJciOnly}
                        />
                    </form>
                </motion.div>
            </div>

            {/* Wave divider */}
            <div className="absolute right-0 bottom-0 left-0 hidden sm:block">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative h-8 w-full fill-current text-white sm:h-10">
                    <path
                        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                        className="fill-white"
                    ></path>
                </svg>
            </div>
        </section>
    );
};
