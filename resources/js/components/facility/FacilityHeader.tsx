import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Navigation, Share2, Clock, Star } from 'lucide-react';
import { SafeCareLevelIndicator } from '../ui/SafeCareLevelIndicator';
import { JCIAccreditedBadge } from '../ui/JCIAccreditedBadge';

interface FacilityHeaderProps {
  facility: any;
  scrollToTab: (tabId: string) => void;
}

export const FacilityHeader: React.FC<FacilityHeaderProps> = ({ facility, scrollToTab }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8"
    >
      <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-6 md:gap-8">
        {/* Left side: Info & actions */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="bg-afya-light text-afya-deep px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              {facility.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-md">
              <Clock size={12} /> Open Now
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
            {facility.name}
          </h1>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-gray-600 text-sm mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              <span>{facility.address}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={16} className="shrink-0" />
              <span>{facility.phone}</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="bg-afya-deep text-white px-4 sm:px-5 py-2.5 rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2 text-sm">
              <Navigation size={18} />
              <span>Directions</span>
            </button>
            <button className="bg-white text-afya-deep border border-afya-deep px-4 sm:px-5 py-2.5 rounded-xl font-medium hover:bg-afya-light transition-colors flex items-center gap-2 text-sm">
              <Phone size={18} />
              <span>Call</span>
            </button>
            <button className="bg-gray-100 text-gray-700 p-2.5 rounded-xl hover:bg-gray-200 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        {/* Right side: Quality & Rating cards - FIXED TO PREVENT OVERFLOW */}
        <div className="md:w-72 shrink-0 flex flex-col gap-4">
          {/* Quality Standards Card */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
              Quality Standards
            </h3>
            <div className="mb-4 w-full">
              {/* Using size="md" ensures the indicator fits inside the card width */}
              <SafeCareLevelIndicator level={facility.safeCareLevel} size="md" />
            </div>
            {facility.jciAccredited && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <JCIAccreditedBadge size="md" />
              </div>
            )}
          </div>

          {/* Rating Card */}
          <div
            className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between cursor-pointer hover:border-afya-mid transition-colors"
            onClick={() => scrollToTab('reviews')}
          >
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {facility.rating.toFixed(1)}
              </div>
              <div className="text-sm text-gray-500">
                {facility.reviewCount} reviews
              </div>
            </div>
            <div className="bg-afya-deep text-white p-2 rounded-lg">
              <Star size={24} className="fill-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};