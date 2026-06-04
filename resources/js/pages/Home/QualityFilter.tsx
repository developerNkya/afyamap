import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, Filter, CheckCircle2, Sliders, Star, Award, BadgeCheck } from 'lucide-react';

const qualityLevels = [
  { value: "", label: "Any Level", icon: <Shield size={14} /> },
  { value: "3", label: "Level 3+", sub: "Good", icon: <Star size={12} /> },
  { value: "4", label: "Level 4+", sub: "Excellent", icon: <Star size={12} /> },
  { value: "5", label: "Level 5", sub: "Outstanding", icon: <Award size={12} /> }
];

interface QualityFilterProps {
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  showAdvanced: boolean;
  setShowAdvanced: (show: boolean) => void;
  categories: any[];
}

export const QualityFilter: React.FC<QualityFilterProps> = ({
  selectedLevel,
  setSelectedLevel,
  showAdvanced,
  setShowAdvanced,
  categories
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  return (
    <div className="border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white">
      <div className="p-4 sm:p-5">
        {/* Desktop View */}
        <div className="hidden sm:flex sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <Sliders size={14} className="text-afya-deep" />
              <span className="text-sm font-medium text-gray-700">Quality:</span>
            </div>
            <div className="flex gap-2">
              {qualityLevels.map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setSelectedLevel(level.value)}
                  className={`group relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    selectedLevel === level.value
                      ? 'bg-afya-deep text-white shadow-md shadow-afya-deep/20'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {level.icon}
                  {level.label}
                  {level.sub && (
                    <span className={`text-[10px] ${selectedLevel === level.value ? 'text-blue-200' : 'text-gray-400'}`}>
                      {level.sub}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-afya-deep font-medium hover:underline flex items-center gap-1.5 whitespace-nowrap"
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
            className="w-full flex items-center justify-between py-2 px-3 bg-white rounded-xl border border-gray-200 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-afya-light rounded-lg">
                <Filter size={14} className="text-afya-deep" />
              </div>
              <span className="text-sm font-medium text-gray-700">Quality Filter</span>
              {selectedLevel && (
                <span className="text-xs bg-afya-deep text-white px-2 py-0.5 rounded-full">
                  {selectedLevel === '3' ? 'Level 3+' : selectedLevel === '4' ? 'Level 4+' : selectedLevel === '5' ? 'Level 5' : 'Active'}
                </span>
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
                <div className="bg-white rounded-xl border border-gray-200 p-3 space-y-2">
                  {qualityLevels.map((level) => (
                    <button
                      key={level.value}
                      type="button"
                      onClick={() => {
                        setSelectedLevel(level.value);
                        setIsMobileFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedLevel === level.value
                          ? 'bg-afya-deep text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {level.icon}
                        <span>{level.label}</span>
                        {level.sub && (
                          <span className={`text-[10px] ${selectedLevel === level.value ? 'text-blue-200' : 'text-gray-400'}`}>
                            ({level.sub})
                          </span>
                        )}
                      </div>
                      {selectedLevel === level.value && (
                        <CheckCircle2 size={14} className="text-white" />
                      )}
                    </button>
                  ))}
                  
                  <button
                    type="button"
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className="w-full text-left text-xs text-afya-deep font-medium flex items-center gap-1.5 pt-2 mt-1 border-t border-gray-100"
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
              className="mt-4 pt-4 border-t border-gray-200 overflow-hidden"
            >
              <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Facility Category
                  </label>
                  <select className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-afya-deep focus:border-transparent transition-all">
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                    Insurance Accepted
                  </label>
                  <select className="block w-full py-2.5 px-3 border border-gray-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-afya-deep focus:border-transparent transition-all">
                    <option value="">Any Insurance</option>
                    <option value="NHIF">NHIF</option>
                    <option value="Jubilee">Jubilee</option>
                    <option value="AAR">AAR</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-afya-deep focus:ring-afya-deep" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-afya-deep transition-colors flex items-center gap-1.5">
                      <BadgeCheck size={14} />
                      JCI Accredited Only
                    </span>
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};