import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Activity, Sparkles, ChevronRight, ChevronDown } from 'lucide-react';
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
  categories
}) => {
  const [isSearchHovered, setIsSearchHovered] = useState(false);

  return (
    <section className="relative bg-afya-deep text-white pt-16 sm:pt-20 pb-24 sm:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=2000"
          alt="Healthcare background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-afya-deep mix-blend-multiply"></div>
      </div>

      <FloatingParticles />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-4 sm:mb-6"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-300" />
            <span className="text-xs sm:text-sm font-medium">Trusted by 50,000+ patients</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 px-2"
          >
            Find safer healthcare across Tanzania
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 px-4"
          >
            Quality transparency improves healthcare decision-making. Compare
            facilities based on verified safety standards, services, and
            patient reviews.
          </motion.p>
        </div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl shadow-2xl max-w-5xl mx-auto text-gray-800 overflow-hidden"
        >
          <form onSubmit={handleSearch}>
            <div className="p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-afya-deep transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search facility..."
                    className="block w-full pl-9 sm:pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-afya-deep focus:border-transparent bg-gray-50/50 hover:bg-white transition-all text-sm sm:text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-afya-deep transition-colors" />
                  </div>
                  <select
                    className="block w-full pl-9 sm:pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-afya-deep focus:border-transparent bg-gray-50/50 hover:bg-white appearance-none cursor-pointer text-sm sm:text-base transition-all"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  >
                    <option value="">All Regions</option>
                    {regions.map((r) => (
                      <option key={r.slug} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-afya-deep transition-colors" />
                  </div>
                  <select
                    className="block w-full pl-9 sm:pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-afya-deep focus:border-transparent bg-gray-50/50 hover:bg-white appearance-none cursor-pointer text-sm sm:text-base transition-all"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Any Service</option>
                    {servicesList.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown size={16} className="text-gray-400" />
                  </div>
                </div>

                <div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsSearchHovered(true)}
                    onHoverEnd={() => setIsSearchHovered(false)}
                    type="submit"
                    className="w-full bg-gradient-to-r from-afya-accent to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-md flex justify-center items-center gap-2"
                  >
                    <motion.div
                      animate={{ x: isSearchHovered ? [0, 3, 0] : 0 }}
                      transition={{ repeat: isSearchHovered ? Infinity : 0, duration: 0.5 }}
                    >
                      <Search size={18} className="sm:w-5 sm:h-5" />
                    </motion.div>
                    Search
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
            />
          </form>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0 hidden sm:block">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative w-full h-8 sm:h-10 text-white fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
        </svg>
      </div>
    </section>
  );
};