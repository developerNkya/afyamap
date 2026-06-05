import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Navigation, AlertCircle } from 'lucide-react';

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
          <div className="h-48 bg-gray-200 relative">
            <img
              src={`https://maps.googleapis.com/maps/api/staticmap?center=${facility.lat},${facility.lng}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${facility.lat},${facility.lng}&key=YOUR_API_KEY`}
              alt="Map placeholder"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800';
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
              <div className="bg-white p-2 rounded-full shadow-lg text-afya-accent">
                <MapPin size={32} className="fill-current" />
              </div>
            </div>
          </div>
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
            <button className="w-full bg-afya-deep text-white py-3 rounded-xl font-bold hover:bg-opacity-90 transition-colors flex justify-center items-center gap-2">
              <Navigation size={18} /> Open in Maps
            </button>
          </div>
        </section>

        {/* Report Card */}
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