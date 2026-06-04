import React from 'react';
import { Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

interface RegionCardProps {
  region: {
    slug: string;
    name: string;
    icon: string;
    count: number;
  };
  index?: number;
}

export const RegionCard: React.FC<RegionCardProps> = ({
  region,
  index = 0
}) => {
  // @ts-ignore - dynamic icon access
  const IconComponent = Icons[region.icon] || Icons.MapPin;

  // Truncate long region names
  const truncateName = (name: string, maxLength: number = 18) => {
    if (name.length <= maxLength) return name;
    return name.substring(0, maxLength) + '...';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Link
        href={`/region/${region.slug}`}
        className="group bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-afya-mid/30 transition-all duration-300 flex flex-col items-center text-center h-full w-full overflow-hidden"
        style={{ minHeight: '180px' }}
      >
        <div className="p-4 sm:p-5 flex flex-col items-center gap-3 w-full">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-afya-light flex items-center justify-center group-hover:bg-afya-deep group-hover:text-white transition-colors duration-300 text-afya-deep group-hover:scale-110 flex-shrink-0">
            <IconComponent size={24} strokeWidth={1.5} className="sm:w-7 sm:h-7" />
          </div>
          
          {/* Fixed height title container - prevents card lengthening */}
          <div className="min-h-[48px] flex items-center justify-center w-full">
            <h3 className="font-bold text-afya-text text-sm sm:text-base group-hover:text-afya-deep transition-colors text-center px-1 line-clamp-2">
              {truncateName(region.name)}
            </h3>
          </div>
          
          <span className="text-xs sm:text-sm font-medium text-gray-500 bg-gray-50 px-2.5 sm:px-3 py-1 rounded-full border border-gray-100 group-hover:bg-afya-light group-hover:text-afya-deep group-hover:border-afya-mid/20 transition-colors mt-auto">
            {region.count} Facilities
          </span>
        </div>
      </Link>
    </motion.div>
  );
};