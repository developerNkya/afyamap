import React from 'react';

interface FacilityTabsProps {
  activeTab: string;
  scrollToTab: (tabId: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'services', label: 'Services' },
  { id: 'safety', label: 'Safety & Certification' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'location', label: 'Location' }
];

export const FacilityTabs: React.FC<FacilityTabsProps> = ({ activeTab, scrollToTab }) => {
  return (
    <div className="sticky top-0 md:top-16 z-30 bg-white border-b border-gray-200 shadow-sm mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollToTab(tab.id)}
              className={`whitespace-nowrap py-4 px-6 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-afya-accent text-afya-deep'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};