import React from 'react';
import { MapPin, ArrowRight, Navigation, Shield } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { SafeCareLevelIndicator } from './SafeCareLevelIndicator';
import { JCIAccreditedBadge } from './JCIAccreditedBadge';
import { StarRating } from './StarRating';

interface FacilityCardProps {
  facility: any;
  layout?: 'horizontal' | 'vertical';
  className?: string;
  index?: number;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({
  facility,
  layout = 'horizontal',
  className = '',
  index = 0
}) => {
  const isHorizontal = layout === 'horizontal';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${
        isHorizontal ? 'flex flex-col md:flex-row' : 'flex flex-col'
      } ${className}`}
    >
      {/* Image Section - Clean, no overlays */}
      <div
        className={`relative overflow-hidden ${
          isHorizontal 
            ? 'w-full md:w-64 lg:w-72 h-48 sm:h-56 md:h-auto' 
            : 'w-full h-48 sm:h-56'
        }`}
      >
        {facility.image ? (
          <img
            src={facility.image}
            alt={facility.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          /* Simple fallback background without icon */
          <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200"></div>
        )}

        {/* Badges - Only these overlays remain */}
        <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex flex-col gap-1.5 sm:gap-2">
          {facility.jciAccredited && (
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-0.5 shadow-sm">
              <JCIAccreditedBadge />
            </div>
          )}
        </div>

        {/* Distance Chip */}
        {facility.distance && (
          <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm px-2 sm:px-2.5 py-1 rounded-lg shadow-sm text-xs font-medium text-gray-700 flex items-center gap-1">
            <MapPin size={10} className="sm:w-3 sm:h-3 text-afya-deep" />
            <span className="text-[10px] sm:text-xs">{facility.distance}</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 md:p-6 flex flex-col flex-grow">
        {/* Header Row */}
        <div className="flex justify-between items-start gap-2 sm:gap-4 mb-2 sm:mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
              <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider text-afya-mid bg-afya-light px-1.5 sm:px-2 py-0.5 rounded-md">
                {facility.category}
              </span>
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-afya-text leading-tight mb-1 group-hover:text-afya-deep transition-colors line-clamp-2">
              {facility.name}
            </h3>
            <div className="flex items-center text-xs sm:text-sm text-gray-500 gap-1">
              <MapPin size={12} className="sm:w-3.5 sm:h-3.5 text-gray-400 flex-shrink-0" />
              <span className="truncate">{facility.region}</span>
            </div>
          </div>
        </div>

        {/* Quality & Rating Row */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4 py-2 sm:py-3 border-y border-gray-100">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <SafeCareLevelIndicator
              level={facility.safeCareLevel}
              size="sm"
              showLabel={false}
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700">
              Level {facility.safeCareLevel}
            </span>
          </div>
          <div className="hidden sm:block w-px h-6 sm:h-8 bg-gray-200" />
          <div className="flex sm:hidden w-full h-px bg-gray-200" />
          <div>
            <StarRating
              rating={facility.rating}
              reviewCount={facility.reviewCount}
              size="sm"
            />
          </div>
        </div>

        {/* Services */}
        <div className="mb-4 sm:mb-5 flex-grow">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {(Array.isArray(facility.services) ? facility.services : []).slice(0, 3).map((service: string, idx: number) => (
              <span
                key={idx}
                className="text-[10px] sm:text-xs bg-gray-50 border border-gray-100 text-gray-600 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium truncate max-w-[80px] sm:max-w-none"
              >
                {service.length > 12 ? service.substring(0, 10) + '...' : service}
              </span>
            ))}
            {Array.isArray(facility.services) && facility.services.length > 3 && (
              <span className="text-[10px] sm:text-xs bg-gray-50 border border-gray-100 text-gray-500 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md font-medium">
                +{facility.services.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Footer Row */}
        <div className="flex flex-row items-center justify-between gap-3 pt-3 sm:pt-4 border-t border-gray-100">
          {/* Insurance info */}
          <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs flex-1 min-w-0">
            <span className="font-semibold text-gray-400 uppercase tracking-wider text-[8px] sm:text-[10px] flex-shrink-0">
              Accepts
            </span>
            <span className="text-gray-600 font-medium truncate">
              {Array.isArray(facility.insurances) && facility.insurances.length > 0
                ? facility.insurances.slice(0, 2).join(', ') + (facility.insurances.length > 2 ? ` +${facility.insurances.length - 2}` : '')
                : 'Various'}
            </span>
          </div>
          
          {/* Buttons */}
          <div className="flex flex-row items-center gap-2 flex-shrink-0">
            <button
              className="p-1.5 sm:p-2 text-gray-400 hover:text-afya-deep hover:bg-afya-light rounded-lg transition-colors"
              title="Get Directions"
            >
              <Navigation size={16} className="sm:w-4 sm:h-4" />
            </button>
            <Link
              href={`/facility/${facility.facility_id ?? facility.id}`}
              className="group/btn flex items-center gap-1 bg-afya-deep text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-opacity-90 transition-all shadow-sm hover:shadow"
            >
              View Details
              <ArrowRight
                size={14}
                className="sm:w-3.5 sm:h-3.5 transition-transform group-hover/btn:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};