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
    <section className="py-12 sm:py-16 bg-afya-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6 sm:mb-8"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-afya-text mb-2">
              Top-Rated Safe Facilities
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Facilities achieving SafeCare Level 4 and 5
            </p>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            onClick={() => router.get('/facilities?level=4')}
            className="hidden md:flex items-center gap-1 text-afya-deep font-medium hover:underline text-sm sm:text-base"
          >
            View all <ArrowRight size={14} className="sm:w-4 sm:h-4" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {topFacilities.map((facility, index) => (
            <motion.div
              key={facility.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <FacilityCard facility={facility} layout="horizontal" index={index} />
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={() => router.get('/facilities?level=4')}
          className="md:hidden w-full mt-6 flex justify-center items-center gap-1 text-afya-deep font-medium bg-white border border-gray-200 py-3 rounded-xl hover:bg-gray-50 text-sm"
        >
          View all top facilities <ArrowRight size={14} />
        </motion.button>
      </div>
    </section>
  );
};