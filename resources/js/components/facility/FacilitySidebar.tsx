import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation, AlertCircle } from 'lucide-react';
import { FacilityMap } from './FacilityMap';

interface FacilitySidebarProps {
  facility: any;
}

export const FacilitySidebar: React.FC<FacilitySidebarProps> = ({ facility }) => {
  // Helper function to format opening hours
  const formatOpeningHours = () => {
    if (!facility.opening_days) {
      return { days: 'Hours not specified', hours: '' };
    }

    const days = facility.opening_days.split(',').map((day: string) => day.trim());
    const openTime = facility.open_time || '00:00';
    const closeTime = facility.close_time || '23:59';

    // Check if it's 24/7
    if (days.length === 7 && openTime === '00:00' && closeTime === '23:59') {
      return { days: 'Everyday', hours: 'Open 24/7' };
    }

    // Format time (convert 24h to 12h format)
    const formatTime = (time: string) => {
      if (!time || time === '00:00') return '12:00 AM';
      if (time === '12:00') return '12:00 PM';
      if (time === '23:59') return '11:59 PM';
      
      const [hours, minutes] = time.split(':').map(Number);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const hour12 = hours % 12 || 12;
      return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    };

    const formattedOpen = formatTime(openTime);
    const formattedClose = formatTime(closeTime);

    // If it's a single day
    if (days.length === 1) {
      return { days: days[0], hours: `${formattedOpen} - ${formattedClose}` };
    }

    // If it's a consecutive range (e.g., Monday - Friday)
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const dayIndices = days.map((d: string) => dayOrder.indexOf(d)).filter((i: number) => i !== -1);
    
    // Check if days are consecutive
    const isConsecutive = dayIndices.every((idx: any, i: number) => i === 0 || idx === dayIndices[i-1] + 1);
    
    if (isConsecutive && dayIndices.length > 1) {
      return { 
        days: `${days[0]} - ${days[days.length - 1]}`, 
        hours: `${formattedOpen} - ${formattedClose}` 
      };
    }

    // Multiple non-consecutive days
    return { days: days.join(', '), hours: `${formattedOpen} - ${formattedClose}` };
  };

  const { days, hours } = formatOpeningHours();

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
                <div className="flex-1">
                  {/* Opening Days */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-gray-700">Days:</span>
                    <span className="text-gray-700">{days}</span>
                  </div>
                  {/* Opening Hours */}
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-gray-700">Hours:</span>
                    <span className="text-gray-700">{hours}</span>
                  </div>
                  {facility.emergency247 && (
                    <span className="text-sm text-green-600 font-medium block mt-1">
                      🚨 24/7 Emergency Available
                    </span>
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