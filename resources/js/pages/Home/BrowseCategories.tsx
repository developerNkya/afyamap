import React from 'react';
import { motion } from 'framer-motion';
import { CategoryCard } from '../../components/ui/CategoryCard';

interface BrowseCategoriesProps {
  categories: any[];
}

export const BrowseCategories: React.FC<BrowseCategoriesProps> = ({ categories }) => {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-afya-text mb-6 sm:mb-8 text-center"
        >
          Browse by Category
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <CategoryCard category={category} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};