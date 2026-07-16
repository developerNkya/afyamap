import React from 'react';
import { Link } from '@inertiajs/react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  category: {
    id?: number | string;
    slug?: string;
    name: string;
    icon?: string;
    count?: number;
  };
  index?: number;
  layout?: 'grid' | 'list';
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  index = 0,
  layout = 'grid'
}) => {
  // @ts-ignore - dynamic icon access
  const IconComponent = Icons[category.icon] || Icons.Building2;
  
  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  // Direct link to /facilities – no query parameters
  const facilitiesUrl = '/facilities';

  // LIST VIEW LAYOUT - Horizontal card for mobile
  if (layout === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.03 }}
        className="w-full"
      >
        <Link
          href={facilitiesUrl}
          className="group flex items-center gap-3 sm:gap-4 bg-white rounded-xl p-3 sm:p-4 border border-gray-100 hover:border-afya-deep/30 hover:shadow-md transition-all duration-300"
        >
          {/* Icon */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-afya-light flex items-center justify-center group-hover:bg-afya-deep transition-colors duration-300 shrink-0">
            <IconComponent size={18} strokeWidth={1.5} className="text-afya-deep group-hover:text-white transition-colors sm:size-5" />
          </div>
          
          {/* Content */}
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-afya-text text-sm sm:text-base group-hover:text-afya-deep transition-colors">
                {category.name}
              </h3>
              <Icons.ChevronRight size={14} className="text-gray-300 group-hover:text-afya-deep group-hover:translate-x-1 transition-all sm:size-4" />
            </div>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-base font-bold text-afya-deep">
                {formatCount(category.count)}
              </span>
              <span className="text-[10px] sm:text-xs text-gray-500">facilities</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // GRID VIEW LAYOUT - Card for desktop
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="h-full"
    >
      <Link
        href={facilitiesUrl}
        className="group block bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-afya-mid/30 transition-all duration-300 h-full"
      >
        <div className="flex flex-col items-start gap-3">
          <div className="w-12 h-12 rounded-xl bg-afya-light flex items-center justify-center group-hover:bg-afya-deep transition-colors duration-300">
            <IconComponent size={22} strokeWidth={1.5} className="text-afya-deep group-hover:text-white transition-colors" />
          </div>
          
          <div className="w-full">
            <h3 className="font-bold text-afya-text text-sm mb-1 group-hover:text-afya-deep transition-colors line-clamp-2">
              {category.name}
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-afya-deep">
                {formatCount(category.count)}
              </span>
              <span className="text-xs text-gray-500">facilities</span>
            </div>
          </div>
          
          <Icons.ChevronRight size={16} className="text-gray-300 group-hover:text-afya-deep group-hover:translate-x-1 transition-all ml-auto" />
        </div>
      </Link>
    </motion.div>
  );
};