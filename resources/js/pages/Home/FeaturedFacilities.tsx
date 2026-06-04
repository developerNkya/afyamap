import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { router } from '@inertiajs/react';
import { FacilityCard } from '../../components/ui/FacilityCard';

interface FeaturedFacilitiesProps {
  facilities: any[];
}

export const FeaturedFacilities: React.FC<FeaturedFacilitiesProps> = ({ facilities }) => {
  const topFacilities = facilities.filter(f => f.safeCareLevel >= 4).slice(0, 4);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-afya-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-afya-text mb-1 sm:mb-2">
              Top-Rated Safe Facilities
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Facilities achieving SafeCare Level 4 and 5
            </p>
          </div>
          
          {/* Desktop View All Button */}
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => router.get('/facilities?level=4')}
            className="hidden md:flex items-center gap-1 text-afya-deep font-medium hover:underline text-sm"
          >
            View all <ArrowRight size={14} />
          </motion.button>
        </motion.div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
          {topFacilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <FacilityCard 
                facility={facility} 
                layout="horizontal" 
                index={index} 
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-6 sm:mt-8 md:hidden">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.get('/facilities?level=4')}
            className="w-full flex items-center justify-center gap-2 text-afya-deep font-medium bg-white border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all text-sm"
          >
            View all top facilities
            <ArrowRight size={14} />
          </motion.button>
        </div>
        
        {/* Empty state */}
        {topFacilities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No facilities found</p>
          </div>
        )}
      </div>
    </section>
  );
};