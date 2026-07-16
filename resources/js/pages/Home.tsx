import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Layout } from '../components/layout/Layout';
import { EducationalSection } from '../pages/Home/EducationContent';
import { HeroSection } from '../pages/Home/HeroSection';
import { FeaturedFacilities } from '../pages/Home/FeaturedFacilities';
import { BrowseCategories } from '../pages/Home/BrowseCategories';
import { BrowseRegions } from '../pages/Home/BrowseRegions';
import { StatsSection } from '../pages/Home/StatsSection';
import { CTASection } from '../pages/Home/CTASection';
import { TestimonialsSection } from '../pages/Home/TestimonialsSection';
import { ContactSection } from '../pages/Home/ContactSection';

export default function Home({ 
  facilities = [], 
  regions = [], 
  categories = [], 
  services = [] 
}: { 
  facilities: any[], 
  regions: any[], 
  categories: any[], 
  services: any[] 
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const servicesList = services.map((s: any) => s.name);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (selectedRegion) params.append('region', selectedRegion);
    if (selectedService) params.append('service', selectedService);
    if (selectedLevel) params.append('level', selectedLevel);
    router.get(`/facilities?${params.toString()}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedService={selectedService}
        setSelectedService={setSelectedService}
        selectedLevel={selectedLevel}
        setSelectedLevel={setSelectedLevel}
        showAdvanced={showAdvanced}
        setShowAdvanced={setShowAdvanced}
        handleSearch={handleSearch}
        regions={regions}
        servicesList={servicesList}
        categories={categories}
      />

      <EducationalSection currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />

      <FeaturedFacilities facilities={facilities} />

      <BrowseCategories categories={categories} />

      <BrowseRegions regions={regions} />

      <StatsSection />

      {/* NEW: Testimonials Section */}
      <TestimonialsSection />

      {/* NEW: Contact Section */}
      {/* <ContactSection /> */}

      {/* <CTASection /> */}
    </div>
  );
}

Home.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;