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
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
    >
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="bg-afya-light text-afya-deep px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {facility.category}
            </span>
            <span className="flex items-center gap-1 text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md">
              <Clock size={14} /> Open Now
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 leading-tight">
            {facility.name}
          </h1>
          <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-4">
            <span className="flex items-center gap-1">
              <MapPin size={16} /> {facility.address}
            </span>
            <span className="flex items-center gap-1">
              <Phone size={16} /> {facility.phone}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="bg-afya-deep text-white px-5 py-2.5 rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2">
              <Navigation size={18} /> Get Directions
            </button>
            <button className="bg-white text-afya-deep border border-afya-deep px-5 py-2.5 rounded-xl font-medium hover:bg-afya-light transition-colors flex items-center gap-2">
              <Phone size={18} /> Call Facility
            </button>
            <button className="bg-gray-100 text-gray-700 p-2.5 rounded-xl hover:bg-gray-200 transition-colors">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className="md:w-72 shrink-0 flex flex-col gap-4">
          {/* Quality Score Card */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
              Quality Standards
            </h3>
            <div className="mb-4">
              <SafeCareLevelIndicator level={facility.safeCareLevel} size="lg" />
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