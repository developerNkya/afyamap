import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface FacilityServicesProps {
  services: string[];
}

export const FacilityServices: React.FC<FacilityServicesProps> = ({ services }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      id="section-services"
      className="scroll-mt-32 pt-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {services.map((service) => (
          <div
            key={service}
            className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-afya-light rounded-full flex items-center justify-center text-afya-deep shrink-0">
              <Activity size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">{service}</h4>
              <p className="text-sm text-gray-500">Standard care available</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};