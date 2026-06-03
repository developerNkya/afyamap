import React, { Component } from 'react';
import { Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
interface CategoryCardProps {
  category: {
    slug: string;
    name: string;
    icon: string;
    count: number;
  };
  index?: number;
}
export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  index = 0
}) => {
  // @ts-ignore - dynamic icon access
  const IconComponent = Icons[category.icon] || Icons.Building2;
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95
      }}
      whileInView={{
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.05
      }}
      viewport={{
        once: true
      }}>
      
      <Link
        href={`/category/${category.slug}`}
        className="group bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-afya-mid/30 transition-all duration-300 flex items-center gap-4 h-full">
        
        <div className="w-14 h-14 rounded-xl bg-afya-light flex items-center justify-center group-hover:bg-afya-deep group-hover:text-white transition-colors duration-300 text-afya-deep shrink-0 group-hover:rotate-3">
          <IconComponent size={28} strokeWidth={1.5} />
        </div>
        <div className="flex-grow text-left">
          <h3 className="font-bold text-afya-text leading-tight mb-1 group-hover:text-afya-deep transition-colors text-lg">
            {category.name}
          </h3>
          <span className="text-sm font-medium text-gray-500">
            {category.count} Facilities
          </span>
        </div>
      </Link>
    </motion.div>);

};