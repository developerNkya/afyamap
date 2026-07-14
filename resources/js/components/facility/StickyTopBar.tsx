import React from 'react';
import { Navigation } from 'lucide-react';
import { SafeCareLevelIndicator } from '../ui/SafeCareLevelIndicator';

interface StickyTopBarProps {
  isSticky: boolean;
  facility: any;
}

export const StickyTopBar: React.FC<StickyTopBarProps> = ({ isSticky, facility }) => {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bg-white shadow-md z-40 transition-transform duration-300 ${
        isSticky ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-bold text-gray-800 truncate max-w-[200px] md:max-w-md">
            {facility.name}
          </h2>
          <div className="hidden md:block">
            <SafeCareLevelIndicator level={facility.safeCareLevel} size="sm" />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-afya-deep text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2">
            <Navigation size={16} />
            <span className="hidden sm:inline">Directions</span>
          </button>
        </div>
      </div>
    </div>
  );
};