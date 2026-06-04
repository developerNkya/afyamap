import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Globe, Heart } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export const StatsSection = () => {
  const stats = [
    { value: 450, label: "Verified Facilities", suffix: "+", icon: <Building2 className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-blue-200" /> },
    { value: 26, label: "Regions Covered", suffix: "", icon: <Globe className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-blue-200" /> },
    { value: 15, label: "Patient Reviews", suffix: "k+", icon: <Heart className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-blue-200" /> }
  ];

  return (
    <section className="bg-afya-deep text-white py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="py-3 sm:py-4"
            >
              {stat.icon}
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <div className="text-blue-200 font-medium text-sm sm:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};