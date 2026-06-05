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
      <div className="bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-5 md:gap-8">
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

          <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2 leading-tight">
            {facility.name}
          </h1>

          <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 text-gray-600 text-sm mb-4">
            <span className="flex items-center gap-1.5">
              <MapPin size={16} className="shrink-0" />
              <span className="text-sm">{facility.address}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Phone size={16} className="shrink-0" />
              <span className="text-sm">{facility.phone}</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button className="bg-afya-deep text-white px-4 py-2 rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2 text-xs sm:text-sm">
              <Navigation size={16} />
              <span>Directions</span>
            </button>
            <button className="bg-white text-afya-deep border border-afya-deep px-4 py-2 rounded-xl font-medium hover:bg-afya-light transition-colors flex items-center gap-2 text-xs sm:text-sm">
              <Phone size={16} />
              <span>Call</span>
            </button>
            <button className="bg-gray-100 text-gray-700 p-2 rounded-xl hover:bg-gray-200 transition-colors">
              <Share2 size={16} />
            </button>
          </div>
        </div>

        {/* Right side: Quality & Rating cards - stacked on all screens (flex-col) */}
        <div className="md:w-72 shrink-0 flex flex-col gap-3 sm:gap-4">
          {/* Quality Standards Card */}
          <div className="bg-gray-50 rounded-xl p-3 sm:p-5 border border-gray-200">
            <h3 className="text-[10px] sm:text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
              Quality Standards
            </h3>
            <div className="mb-2 sm:mb-4 w-full">
              {/* Responsive indicator: smaller on mobile, normal on desktop */}
              <div className="sm:scale-100 scale-90 origin-left">
                <SafeCareLevelIndicator level={facility.safeCareLevel} size="sm" />
              </div>
            </div>
            {facility.jciAccredited && (
              <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200">
                <JCIAccreditedBadge size="sm" />
              </div>
            )}
          </div>

          {/* Rating Card - below quality card */}
          <div
            className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 flex items-center justify-between cursor-pointer hover:border-afya-mid transition-colors"
            onClick={() => scrollToTab('reviews')}
          >
            <div>
              <div className="text-lg sm:text-2xl font-bold text-gray-800">
                {facility.rating.toFixed(1)}
              </div>
              <div className="text-[10px] sm:text-sm text-gray-500">
                {facility.reviewCount} reviews
              </div>
            </div>
            <div className="bg-afya-deep text-white p-1.5 sm:p-2 rounded-lg">
              <Star size={18} className="sm:w-6 sm:h-6 fill-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};