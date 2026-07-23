// pages/Home.tsx
import { router } from '@inertiajs/react';
import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { BrowseCategories } from '../pages/Home/BrowseCategories';
import { BrowseRegions } from '../pages/Home/BrowseRegions';
import { EducationalSection } from '../pages/Home/EducationContent';
import { FeaturedFacilities } from '../pages/Home/FeaturedFacilities';
import { HeroSection } from '../pages/Home/HeroSection';
import { StatsSection } from '../pages/Home/StatsSection';
import { TestimonialsSection } from '../pages/Home/TestimonialsSection';

export default function Home({
    facilities = [],
    regions = [],
    categories = [],
    services = [],
    insurances = [],
}: {
    facilities: any[];
    regions: any[];
    categories: any[];
    services: any[];
    insurances?: any[];
}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const [showAdvanced, setShowAdvanced] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Advanced filter states
    const [selectedInsurance, setSelectedInsurance] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [jciOnly, setJciOnly] = useState(false);

    const servicesList = services.map((s: any) => s.name);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.append('q', searchQuery);
        if (selectedRegion) params.append('region', selectedRegion);
        if (selectedService) params.append('service', selectedService);
        if (selectedLevel) params.append('level', selectedLevel);
        if (selectedInsurance) params.append('insurance', selectedInsurance);
        if (selectedCategory) params.append('category', selectedCategory);
        if (jciOnly) params.append('jci', '1');
        router.get(`/facilities?${params.toString()}`);
    };

    // Debug log - remove after confirming it works
    console.log('🏥 Home Page Data:', {
        facilities: facilities.length,
        regions: regions.length,
        categories: categories.length,
        services: services.length,
        insurances: insurances.length,
        insuranceList: insurances,
    });

    return (
        <div className="flex min-h-screen flex-col">
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
                insurances={insurances}
                selectedInsurance={selectedInsurance}
                setSelectedInsurance={setSelectedInsurance}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                jciOnly={jciOnly}
                setJciOnly={setJciOnly}
            />

            <EducationalSection currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />

            <FeaturedFacilities facilities={facilities} />

            <BrowseCategories categories={categories} />

            <BrowseRegions regions={regions} />

            <StatsSection />

            <TestimonialsSection />
        </div>
    );
}

Home.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
