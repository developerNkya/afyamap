import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation, AlertCircle } from 'lucide-react';
import { FacilityMap } from './FacilityMap';   // <-- import the map

interface FacilitySidebarProps {
  facility: any;
}

export const FacilitySidebar: React.FC<FacilitySidebarProps> = ({ facility }) => {
  return (
    <div className="lg:col-span-1">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="sticky top-32 space-y-6"
      >
        {/* Location Card */}
        <section id="section-location" className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm scroll-mt-32">
          {/* REAL DARK MAP */}
          <FacilityMap lat={facility.lat} lng={facility.lng} name={facility.name} />

          <div className="p-6">
            <h3 className="font-bold text-lg mb-4">Location & Contact</h3>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-afya-mid shrink-0 mt-0.5" />
                <span className="text-gray-700">{facility.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-afya-mid shrink-0" />
                <span className="text-gray-700">{facility.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-afya-mid shrink-0" />
                <span className="text-gray-700">{facility.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={20} className="text-afya-mid shrink-0 mt-0.5" />
                <div>
                  <span className="text-gray-700 block">Hours: {facility.hours}</span>
                  {facility.emergency247 && (
                    <span className="text-sm text-green-600 font-medium">24/7 Emergency Available</span>
                  )}
                </div>
              </li>
            </ul>
            <button
              onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${facility.lat},${facility.lng}`, '_blank')}
              className="w-full bg-afya-deep text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition-colors flex justify-center items-center gap-2"
            >
              <Navigation size={18} /> Open in Maps
            </button>
          </div>
        </section>

        {/* Report Card (unchanged) */}
        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 text-center">
          <AlertCircle size={24} className="text-gray-400 mx-auto mb-2" />
          <h4 className="font-medium text-gray-900 mb-1">Is this information incorrect?</h4>
          <p className="text-sm text-gray-500 mb-4">Help us keep AfyaMap accurate for everyone.</p>
          <button className="text-afya-deep text-sm font-medium hover:underline">Report an issue</button>
        </div>
      </motion.div>
    </div>
  );
};