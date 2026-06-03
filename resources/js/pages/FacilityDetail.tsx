import React, { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { Layout } from '../components/layout/Layout';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Share2,
  Navigation,
  Shield,
  CheckCircle2,
  Star,
  MessageSquare,
  ChevronRight,
  Activity,
  Building2,
  Users,
  Calendar,
  AlertCircle } from
'lucide-react';
import { motion } from 'framer-motion';
import { facilities } from '../data/mockData';
import { SafeCareLevelIndicator } from '../components/ui/SafeCareLevelIndicator';
import { JCIAccreditedBadge } from '../components/ui/JCIAccreditedBadge';
import { StarRating } from '../components/ui/StarRating';
export const FacilityDetail = ({ facility }: { facility: any }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const tabs = [
  {
    id: 'overview',
    label: 'Overview'
  },
  {
    id: 'services',
    label: 'Services'
  },
  {
    id: 'safety',
    label: 'Safety & Certification'
  },
  {
    id: 'reviews',
    label: 'Reviews'
  },
  {
    id: 'location',
    label: 'Location'
  }];

  const scrollToTab = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(`section-${tabId}`);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 120; // offset for sticky header
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };
  if (!facility)
  return <div className="p-20 text-center">Facility not found</div>;
  return (
    <div className="bg-afya-bg min-h-screen pb-20">
      {/* Sticky Compact Top Bar (appears on scroll) */}
      <div
        className={`fixed top-0 left-0 right-0 bg-white shadow-md z-40 transition-transform duration-300 ${isSticky ? 'translate-y-0' : '-translate-y-full'}`}>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="font-bold text-afya-text truncate max-w-[200px] md:max-w-md">
              {facility.name}
            </h2>
            <div className="hidden md:block">
              <SafeCareLevelIndicator
                level={facility.safeCareLevel}
                size="sm" />
              
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-afya-deep text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2">
              <Navigation size={16} />{' '}
              <span className="hidden sm:inline">Directions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image Grid (Booking.com style) */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 mb-6">
        
        <div className="flex flex-col md:flex-row gap-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm">
          {/* Main big image */}
          <div className="w-full md:w-2/3 h-full relative group cursor-pointer overflow-hidden">
            <img
              src={facility.gallery[0]}
              alt={facility.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            
            <div className="absolute inset-0 bg-black bg-opacity-10 group-hover:bg-opacity-0 transition-all"></div>
          </div>
          {/* Side smaller images */}
          <div className="hidden md:flex w-1/3 flex-col gap-2 h-full">
            <div className="h-[calc(50%-4px)] relative group cursor-pointer overflow-hidden rounded-tr-2xl">
              <img
                src={facility.gallery[1]}
                alt="Gallery 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
            </div>
            <div className="h-[calc(50%-4px)] relative group cursor-pointer overflow-hidden rounded-br-2xl">
              <img
                src={facility.gallery[2]}
                alt="Gallery 2"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity group-hover:bg-opacity-50">
                <span className="text-white font-bold text-lg border-2 border-white px-5 py-2.5 rounded-lg hover:bg-white hover:text-black transition-colors shadow-sm">
                  View all photos
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Header Info */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.5,
          delay: 0.1
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-grow">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-afya-light text-afya-deep px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {facility.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded-md">
                <Clock size={14} /> Open Now
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-afya-text mb-3 leading-tight">
              {facility.name}
            </h1>
            <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-4">
              <span className="flex items-center gap-1">
                <MapPin size={16} /> {facility.address}
              </span>
              <span className="flex items-center gap-1">
                <Phone size={16} /> {facility.phone}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="bg-afya-deep text-white px-5 py-2.5 rounded-xl font-medium hover:bg-opacity-90 transition-colors flex items-center gap-2">
                <Navigation size={18} /> Get Directions
              </button>
              <button className="bg-white text-afya-deep border border-afya-deep px-5 py-2.5 rounded-xl font-medium hover:bg-afya-light transition-colors flex items-center gap-2">
                <Phone size={18} /> Call Facility
              </button>
              <button className="bg-gray-100 text-gray-700 p-2.5 rounded-xl hover:bg-gray-200 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>

          <div className="md:w-72 shrink-0 flex flex-col gap-4">
            {/* Quality Score Card */}
            <div className="bg-afya-bg rounded-xl p-5 border border-gray-200">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                Quality Standards
              </h3>
              <div className="mb-4">
                <SafeCareLevelIndicator
                  level={facility.safeCareLevel}
                  size="lg" />
                
              </div>
              {facility.jciAccredited &&
              <div className="mt-3 pt-3 border-t border-gray-200">
                  <JCIAccreditedBadge size="md" />
                </div>
              }
            </div>

            {/* Rating Card */}
            <div
              className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-between cursor-pointer hover:border-afya-mid transition-colors"
              onClick={() => scrollToTab('reviews')}>
              
              <div>
                <div className="text-2xl font-bold text-afya-text">
                  {facility.rating.toFixed(1)}
                </div>
                <div className="text-sm text-gray-500">
                  {facility.reviewCount} reviews
                </div>
              </div>
              <div className="bg-afya-deep text-white p-2 rounded-lg">
                <Star size={24} className="fill-white" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sticky Tabs Navigation */}
      <div className="sticky top-0 md:top-16 z-30 bg-white border-b border-gray-200 shadow-sm mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto hide-scrollbar">
            {tabs.map((tab) =>
            <button
              key={tab.id}
              onClick={() => scrollToTab(tab.id)}
              className={`whitespace-nowrap py-4 px-6 font-medium text-sm border-b-2 transition-colors ${activeTab === tab.id ? 'border-afya-accent text-afya-deep' : 'border-transparent text-gray-500 hover:text-gray-900'}`}>
              
                {tab.label}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview Section */}
            <motion.section
              initial={{
                opacity: 0
              }}
              whileInView={{
                opacity: 1
              }}
              viewport={{
                once: true,
                margin: '-100px'
              }}
              id="section-overview"
              className="scroll-mt-32">
              
              <h2 className="text-2xl font-bold text-afya-text mb-4">
                About this facility
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                {facility.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                  <Building2 className="text-afya-mid shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold">
                      Type
                    </div>
                    <div className="font-medium text-gray-900">
                      {facility.category}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                  <Calendar className="text-afya-mid shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold">
                      Established
                    </div>
                    <div className="font-medium text-gray-900">
                      {facility.established}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                  <Users className="text-afya-mid shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold">
                      Capacity
                    </div>
                    <div className="font-medium text-gray-900">
                      {facility.beds} Beds
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                  <AlertCircle className="text-afya-mid shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold">
                      Emergency
                    </div>
                    <div className="font-medium text-gray-900">
                      {facility.emergency247 ? '24/7 Available' : 'Limited'}
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                  <MessageSquare className="text-afya-mid shrink-0" />
                  <div>
                    <div className="text-xs text-gray-500 uppercase font-semibold">
                      Languages
                    </div>
                    <div className="font-medium text-gray-900">
                      {facility.languages.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-afya-text mb-3">
                Insurance Accepted
              </h3>
              <div className="flex flex-wrap gap-2">
                {facility.insurances.map((ins) =>
                <span
                  key={ins}
                  className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 shadow-sm">
                  
                    <CheckCircle2 size={16} className="text-green-500" /> {ins}
                  </span>
                )}
              </div>
            </motion.section>

            {/* Services Section */}
            <motion.section
              initial={{
                opacity: 0
              }}
              whileInView={{
                opacity: 1
              }}
              viewport={{
                once: true,
                margin: '-100px'
              }}
              id="section-services"
              className="scroll-mt-32 pt-4">
              
              <h2 className="text-2xl font-bold text-afya-text mb-6">
                Available Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {facility.services.map((service) =>
                <div
                  key={service}
                  className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
                  
                    <div className="w-12 h-12 bg-afya-light rounded-full flex items-center justify-center text-afya-deep shrink-0">
                      <Activity size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{service}</h4>
                      <p className="text-sm text-gray-500">
                        Standard care available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>

            {/* Safety & Certification Section */}
            <motion.section
              initial={{
                opacity: 0
              }}
              whileInView={{
                opacity: 1
              }}
              viewport={{
                once: true,
                margin: '-100px'
              }}
              id="section-safety"
              className="scroll-mt-32 pt-4">
              
              <h2 className="text-2xl font-bold text-afya-text mb-6">
                Safety & Certification
              </h2>

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
                <div className="bg-afya-deep p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-1">
                      SafeCare Level {facility.safeCareLevel}
                    </h3>
                    <p className="text-blue-100 text-sm">
                      Internationally recognized quality standard
                    </p>
                  </div>
                  <div className="bg-white p-3 rounded-xl">
                    <SafeCareLevelIndicator
                      level={facility.safeCareLevel}
                      size="lg"
                      showLabel={false} />
                    
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-gray-900 mb-2">
                    What does Level {facility.safeCareLevel} mean?
                  </h4>
                  <p className="text-gray-700 mb-4">
                    {facility.safeCareLevel === 5 ?
                    'This facility has reached the highest possible SafeCare level, demonstrating outstanding adherence to international quality and safety standards. They have robust systems in place to ensure patient safety, minimize risks, and continuously improve care quality.' :
                    facility.safeCareLevel === 4 ?
                    'This facility demonstrates excellent adherence to quality standards. They have implemented comprehensive safety protocols and quality management systems across most departments.' :
                    'This facility has established core safety protocols and is actively working on quality improvement plans to reach higher standards of care.'}
                  </p>
                  <button className="text-afya-deep font-medium text-sm hover:underline flex items-center gap-1">
                    Read full SafeCare methodology <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {facility.jciAccredited &&
              <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center shrink-0">
                    <Shield size={32} className="text-yellow-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                      Joint Commission International <JCIAccreditedBadge />
                    </h3>
                    <p className="text-gray-700 mb-2">
                      This facility has earned the Joint Commission
                      International (JCI) Gold Seal of Approval®, a widely
                      recognized symbol of quality that reflects an
                      organization's commitment to providing safe and effective
                      patient care.
                    </p>
                  </div>
                </div>
              }
            </motion.section>

            {/* Reviews Section */}
            <motion.section
              initial={{
                opacity: 0
              }}
              whileInView={{
                opacity: 1
              }}
              viewport={{
                once: true,
                margin: '-100px'
              }}
              id="section-reviews"
              className="scroll-mt-32 pt-4">
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-afya-text">
                  Patient Reviews
                </h2>
                <button className="bg-afya-deep text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 transition-colors">
                  Write a Review
                </button>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 flex flex-col md:flex-row gap-8 items-center">
                <div className="text-center md:border-r border-gray-200 md:pr-8">
                  <div className="text-5xl font-bold text-afya-text mb-2">
                    {facility.rating.toFixed(1)}
                  </div>
                  <StarRating
                    rating={facility.rating}
                    size="lg"
                    className="justify-center mb-2" />
                  
                  <div className="text-sm text-gray-500">
                    Based on {facility.reviewCount} reviews
                  </div>
                </div>
                <div className="flex-grow w-full">
                  {[5, 4, 3, 2, 1].map((star) => {
                    // Mock distribution
                    const percent =
                    star === 5 ?
                    60 :
                    star === 4 ?
                    25 :
                    star === 3 ?
                    10 :
                    star === 2 ?
                    3 :
                    2;
                    return (
                      <div key={star} className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1 w-12 text-sm font-medium text-gray-600">
                          {star}{' '}
                          <Star
                            size={12}
                            className="fill-gray-400 text-gray-400" />
                          
                        </div>
                        <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-afya-deep rounded-full"
                            style={{
                              width: `${percent}%`
                            }}>
                          </div>
                        </div>
                        <div className="w-10 text-right text-xs text-gray-500">
                          {percent}%
                        </div>
                      </div>);

                  })}
                </div>
              </div>

              {/* Mock Reviews List */}
              <div className="space-y-6">
                {[1, 2, 3].map((i) =>
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl border border-gray-100">
                  
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-afya-light rounded-full flex items-center justify-center text-afya-deep font-bold">
                          {['JD', 'SM', 'AK'][i - 1]}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">
                            {['John Doe', 'Sarah M.', 'Amina K.'][i - 1]}
                          </div>
                          <div className="text-xs text-gray-500">
                            2 weeks ago
                          </div>
                        </div>
                      </div>
                      <StarRating rating={5 - (i - 1) * 0.5} size="sm" />
                    </div>
                    <p className="text-gray-700">
                      {i === 1 ?
                    'Excellent facility with very professional staff. The waiting time was minimal and the doctors were very thorough in their explanation.' :
                    i === 2 ?
                    'Clean environment and clear signage. The SafeCare rating really shows in their day-to-day operations. Highly recommended.' :
                    'Good service overall, though the pharmacy queue was a bit long. The medical care itself was top notch.'}
                    </p>
                  </div>
                )}
              </div>
              <button className="w-full mt-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Load more reviews
              </button>
            </motion.section>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.5,
                delay: 0.2
              }}
              className="sticky top-32 space-y-6">
              
              {/* Location Card */}
              <section
                id="section-location"
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm scroll-mt-32">
                
                <div className="h-48 bg-gray-200 relative">
                  {/* Mock Map - In a real app use react-leaflet */}
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${facility.lat},${facility.lng}&zoom=15&size=600x300&maptype=roadmap&markers=color:red%7C${facility.lat},${facility.lng}&key=YOUR_API_KEY`}
                    alt="Map placeholder"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails
                      e.currentTarget.src =
                      'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=800';
                    }} />
                  
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
                      <MapPin
                        size={20}
                        className="text-afya-mid shrink-0 mt-0.5" />
                      
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
                      <Clock
                        size={20}
                        className="text-afya-mid shrink-0 mt-0.5" />
                      
                      <div>
                        <span className="text-gray-700 block">
                          Hours: {facility.hours}
                        </span>
                        {facility.emergency247 &&
                        <span className="text-sm text-green-600 font-medium">
                            24/7 Emergency Available
                          </span>
                        }
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
                <h4 className="font-medium text-gray-900 mb-1">
                  Is this information incorrect?
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  Help us keep AfyaMap accurate for everyone.
                </p>
                <button className="text-afya-deep text-sm font-medium hover:underline">
                  Report an issue
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>);

};

FacilityDetail.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;