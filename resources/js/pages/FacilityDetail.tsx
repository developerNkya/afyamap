import React, { useState, useEffect } from 'react';
import { Layout } from '../components/layout/Layout';
import { motion } from 'framer-motion';
import { FacilityHero } from '../components/facility/FacilityHero';
import { FacilityHeader } from '../components/facility/FacilityHeader';
import { FacilityTabs } from '../components/facility/FacilityTabs';
import { FacilityOverview } from '../components/facility/FacilityOverview';
import { FacilityServices } from '../components/facility/FacilityServices';
import { FacilitySafety } from '../components/facility/FacilitySafety';
import { FacilityReviews } from '../components/facility/FacilityReviews';
import { FacilitySidebar } from '../components/facility/FacilitySidebar';
import { StickyTopBar } from '../components/facility/StickyTopBar';

export default function FacilityDetail({ 
  facility, 
  comments = [], 
  ratingDistribution = {},
  auth 
}: { 
  facility: any; 
  comments?: any[]; 
  ratingDistribution?: any;
  auth: any;
}) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTab = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(`section-${tabId}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  if (!facility) {
    return <div className="p-20 text-center">Facility not found</div>;
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Sticky Top Bar */}
      <StickyTopBar isSticky={isSticky} facility={facility} />

      {/* Hero Image Grid */}
      <FacilityHero gallery={facility.gallery} name={facility.name} />

      {/* Header Info */}
      <FacilityHeader facility={facility} scrollToTab={scrollToTab} />

      {/* Sticky Tabs Navigation */}
      <FacilityTabs activeTab={activeTab} scrollToTab={scrollToTab} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            <FacilityOverview facility={facility} />
            <FacilityServices services={facility.services} />
            <FacilitySafety facility={facility} />
            <FacilityReviews 
              facility={facility} 
              comments={comments} 
              ratingDistribution={ratingDistribution}
              auth={auth}
            />
          </div>

          {/* Sidebar Area */}
          <FacilitySidebar facility={facility} />
        </div>
      </div>
    </div>
  );
}

FacilityDetail.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;