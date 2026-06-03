import React, { Component } from 'react';
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
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.05
      }}
      viewport={{
        once: true
      }}>
      
      <Link
        href={`/region/${region.slug}`}
        className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-afya-mid/30 transition-all duration-300 flex flex-col items-center text-center h-full">
        
        <div className="w-16 h-16 rounded-full bg-afya-light flex items-center justify-center mb-4 group-hover:bg-afya-deep group-hover:text-white transition-colors duration-300 text-afya-deep group-hover:scale-110">
          <IconComponent size={32} strokeWidth={1.5} />
        </div>
        <h3 className="font-bold text-afya-text mb-1.5 text-lg group-hover:text-afya-deep transition-colors">
          {region.name}
        </h3>
        <span className="text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-100 group-hover:bg-afya-light group-hover:text-afya-deep group-hover:border-afya-mid/20 transition-colors">
          {region.count} Facilities
        </span>
      </Link>
    </motion.div>);

};