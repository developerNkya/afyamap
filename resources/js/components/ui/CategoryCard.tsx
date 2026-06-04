import React from 'react';
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
  const IconComponent = Icons[category.icon] || Icons.Heart;
  
  const formatCount = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <Link
        href={`/category/${category.slug}`}
        className="group block bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-afya-deep/30 transition-all duration-300 h-full"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-afya-light flex items-center justify-center group-hover:bg-afya-deep transition-colors duration-300 shrink-0">
            <IconComponent size={24} strokeWidth={1.5} className="text-afya-deep group-hover:text-white transition-colors" />
          </div>
          
          <div className="flex-grow">
            <h3 className="font-bold text-afya-text mb-0.5 group-hover:text-afya-deep transition-colors">
              {category.name}
            </h3>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-afya-deep">
                {formatCount(category.count)}
              </span>
              <span className="text-xs text-gray-500">facilities</span>
            </div>
          </div>
          
          <Icons.ChevronRight size={18} className="text-gray-300 group-hover:text-afya-deep group-hover:translate-x-1 transition-all" />
        </div>
      </Link>
    </motion.div>
  );
};