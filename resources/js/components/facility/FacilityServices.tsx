import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ChevronDown, ChevronUp } from 'lucide-react';

interface FacilityServicesProps {
  services: string[];
}

const INITIAL_VISIBLE = 12;

export const FacilityServices: React.FC<FacilityServicesProps> = ({ services }) => {
  const [showAll, setShowAll] = useState(false);
  const visibleServices = showAll ? services : services.slice(0, INITIAL_VISIBLE);
  const hasMore = services.length > INITIAL_VISIBLE;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      id="section-services"
      className="scroll-mt-32 pt-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Services</h2>

      {/* Chips layout instead of large cards */}
      <div className="flex flex-wrap gap-2">
        {visibleServices.map((service) => (
          <span
            key={service}
            className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-afya-light hover:text-afya-deep transition-colors"
          >
            <Activity size={14} />
            {service}
          </span>
        ))}
      </div>

      {/* Show more / Show less button */}
      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-4 text-afya-deep text-sm font-medium flex items-center gap-1 hover:underline"
        >
          {showAll ? (
            <>Show less <ChevronUp size={16} /></>
          ) : (
            <>Show all {services.length} services <ChevronDown size={16} /></>
          )}
        </button>
      )}
    </motion.section>
  );
};