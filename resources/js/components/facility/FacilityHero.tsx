import React from 'react';
import { motion } from 'framer-motion';

interface FacilityHeroProps {
  gallery: string[];
  name: string;
}

export const FacilityHero: React.FC<FacilityHeroProps> = ({ gallery, name }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 mb-6"
    >
      <div className="flex flex-col md:flex-row gap-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm">
        {/* Main big image */}
        <div className="w-full md:w-2/3 h-full relative group cursor-pointer overflow-hidden">
          <img
            src={gallery[0]}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all"></div>
        </div>
        
        {/* Side smaller images */}
        <div className="hidden md:flex w-1/3 flex-col gap-2 h-full">
          <div className="h-[calc(50%-4px)] relative group cursor-pointer overflow-hidden rounded-tr-2xl">
            <img
              src={gallery[1]}
              alt="Gallery 1"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="h-[calc(50%-4px)] relative group cursor-pointer overflow-hidden rounded-br-2xl">
            <img
              src={gallery[2]}
              alt="Gallery 2"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity group-hover:bg-opacity-50">
              <span className="text-white font-bold text-lg border-2 border-white px-5 py-2.5 rounded-lg hover:bg-white hover:text-black transition-colors shadow-sm">
                View all photos
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};