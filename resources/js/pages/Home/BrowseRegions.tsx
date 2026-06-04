import React from 'react';
import { motion } from 'framer-motion';
import { RegionCard } from '../../components/ui/RegionCard';

interface BrowseRegionsProps {
  regions: any[];
}

export const BrowseRegions: React.FC<BrowseRegionsProps> = ({ regions }) => {
  return (
    <section className="py-12 sm:py-16 bg-afya-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-afya-text mb-2 text-center">
            Explore by Region
          </h2>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6 sm:mb-10">
            Find quality healthcare facilities across Tanzania
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {regions.map((region, index) => (
            <motion.div
              key={region.slug}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <RegionCard region={region} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};