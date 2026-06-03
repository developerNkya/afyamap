import React from 'react';
import { MapPin, ArrowRight, Navigation, Shield } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Facility } from '../../data/mockData';
import { SafeCareLevelIndicator } from './SafeCareLevelIndicator';
import { JCIAccreditedBadge } from './JCIAccreditedBadge';
import { StarRating } from './StarRating';
interface FacilityCardProps {
  facility: Facility;
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
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.05
      }}
      className={`group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 flex ${isHorizontal ? 'flex-col md:flex-row' : 'flex-col'} ${className}`}>
      
      {/* Image Section */}
      <div
        className={`relative overflow-hidden ${isHorizontal ? 'w-full md:w-72 h-56 md:h-auto shrink-0' : 'w-full h-56'}`}>
        
        <img
          src={facility.image}
          alt={facility.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {facility.jciAccredited &&
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-0.5 shadow-sm">
              <JCIAccreditedBadge />
            </div>
          }
        </div>

        {/* Distance Chip */}
        {facility.distance &&
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg shadow-sm text-xs font-medium text-gray-700 flex items-center gap-1">
            <MapPin size={12} className="text-afya-deep" />
            {facility.distance}
          </div>
        }
      </div>

      {/* Content Section */}
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        {/* Header Row */}
        <div className="flex justify-between items-start mb-3 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-afya-mid bg-afya-light px-2 py-0.5 rounded-md">
                {facility.category}
              </span>
            </div>
            <h3 className="text-xl font-bold text-afya-text leading-tight mb-1.5 group-hover:text-afya-deep transition-colors">
              {facility.name}
            </h3>
            <div className="flex items-center text-sm text-gray-500 gap-1.5">
              <MapPin size={14} className="text-gray-400" />
              <span>{facility.region}</span>
            </div>
          </div>
        </div>

        {/* Quality & Rating Row */}
        <div className="flex items-center gap-4 mb-4 py-3 border-y border-gray-100">
          <div className="flex items-center gap-2">
            <SafeCareLevelIndicator
              level={facility.safeCareLevel}
              size="sm"
              showLabel={false} />
            
            <span className="text-sm font-medium text-gray-700">
              Level {facility.safeCareLevel}
            </span>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div>
            <StarRating
              rating={facility.rating}
              reviewCount={facility.reviewCount}
              size="sm" />
            
          </div>
        </div>

        {/* Services */}
        <div className="mb-5 flex-grow">
          <div className="flex flex-wrap gap-2">
            {facility.services.slice(0, 4).map((service, idx) =>
            <span
              key={idx}
              className="text-xs bg-gray-50 border border-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-medium">
              
                {service}
              </span>
            )}
            {facility.services.length > 4 &&
            <span className="text-xs bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-md font-medium">
                +{facility.services.length - 4} more
              </span>
            }
          </div>
        </div>

        {/* Footer Row */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-gray-400 uppercase tracking-wider text-[10px]">
              Accepts
            </span>
            <span className="text-gray-600 font-medium truncate max-w-[120px] md:max-w-[180px]">
              {facility.insurances.slice(0, 3).join(', ')}
              {facility.insurances.length > 3 ?
              ` +${facility.insurances.length - 3}` :
              ''}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              className="p-2 text-gray-400 hover:text-afya-deep hover:bg-afya-light rounded-lg transition-colors"
              title="Get Directions">
              
              <Navigation size={18} />
            </button>
            <Link
              href={`/facility/${facility.id}`}
              className="group/btn flex items-center gap-1.5 bg-afya-deep text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-all shadow-sm hover:shadow">
              
              View Details{' '}
              <ArrowRight
                size={16}
                className="transition-transform group-hover/btn:translate-x-1" />
              
            </Link>
          </div>
        </div>
      </div>
    </motion.div>);

};