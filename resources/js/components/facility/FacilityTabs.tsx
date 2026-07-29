import React from 'react';

interface FacilityTabsProps {
    activeTab: string;
    scrollToTab: (tabId: string) => void;
}

const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'services', label: 'Services' },
    { id: 'safety', label: 'Quality & Safety Certification' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location' },
];

export const FacilityTabs: React.FC<FacilityTabsProps> = ({ activeTab, scrollToTab }) => {
    return (
        <div className="sticky top-20 z-30 mb-8 border-b border-gray-200 bg-white shadow-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="hide-scrollbar flex overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => scrollToTab(tab.id)}
                            className={`border-b-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                                activeTab === tab.id ? 'border-afya-accent text-afya-deep' : 'border-transparent text-gray-500 hover:text-gray-900'
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
