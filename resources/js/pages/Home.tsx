import React, { useState, useEffect, useRef } from 'react';
import { router } from '@inertiajs/react';
import { Layout } from '../components/layout/Layout';
import {
  Search,
  MapPin,
  Activity,
  Shield,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Star,
  Sparkles,
  TrendingUp,
  Award,
  Heart,
  Building2,
  Globe,
  CheckCircle2,
  BadgeCheck,
  Users,
  Rocket,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { regions, categories, servicesList } from '../data/mockData';
import { FacilityCard } from '../components/ui/FacilityCard';
import { RegionCard } from '../components/ui/RegionCard';
import { CategoryCard } from '../components/ui/CategoryCard';
import { SafeCareLevelIndicator } from '../components/ui/SafeCareLevelIndicator';

// Educational slides
const educationalSlides = [
  {
    id: 1,
    title: 'What is SafeCare Level?',
    description: 'SafeCare is an internationally recognized methodology that measures healthcare quality. Levels range from 1 to 5, with 5 indicating the highest adherence to safe practices and quality standards.',
    icon: <Shield className="w-8 h-8 text-afya-deep" />,
    color: 'bg-blue-50',
    badge: 'Quality Standard',
    stats: '92% patient trust'
  },
  {
    id: 2,
    title: 'How AfyaMap Works',
    description: 'Search for facilities, compare their quality ratings, check available services, and read reviews from other patients. We make healthcare transparency simple.',
    icon: <Search className="w-8 h-8 text-afya-deep" />,
    color: 'bg-indigo-50',
    badge: 'Smart Technology',
    stats: '15k+ reviews'
  },
  {
    id: 3,
    title: 'Understanding JCI Accreditation',
    description: 'Joint Commission International (JCI) accreditation is the gold standard in global healthcare. Facilities with this badge meet rigorous international safety and quality standards.',
    icon: <Award className="w-8 h-8 text-afya-deep" />,
    color: 'bg-sky-50',
    badge: 'Premium Care',
    stats: '12 JCI facilities'
  },
  {
    id: 4,
    title: 'How to Read Quality Indicators',
    description: 'Look for the blue step-wise bar on facility cards. Filled dark blue segments show the achieved SafeCare level. Higher levels mean better safety protocols.',
    icon: <TrendingUp className="w-8 h-8 text-afya-deep" />,
    color: 'bg-cyan-50',
    badge: 'Data Driven',
    stats: 'Instant clarity'
  }
];

// Floating particles (subtle)
const FloatingParticles = () => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 8 + Math.random() * 12,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          initial={{ x: `${particle.x}%`, y: `${particle.y}%`, opacity: 0 }}
          animate={{
            y: [`${particle.y}%`, `${particle.y - 15}%`, `${particle.y}%`],
            opacity: [0, 0.5, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Animated Counter
const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const duration = 2000;
          const step = value / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-4xl font-bold">
      {count}{suffix}
    </div>
  );
};

export default function Home({ facilities = [] }: { facilities: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSearchHovered, setIsSearchHovered] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('q', searchQuery);
    if (selectedRegion) params.append('region', selectedRegion);
    if (selectedService) params.append('service', selectedService);
    if (selectedLevel) params.append('level', selectedLevel);
    router.get(`/facilities?${params.toString()}`);
  };

  const nextSlide = () => setCurrentSlide(prev => prev === educationalSlides.length - 1 ? 0 : prev + 1);
  const prevSlide = () => setCurrentSlide(prev => prev === 0 ? educationalSlides.length - 1 : prev - 1);

  const topFacilities = facilities.filter(f => f.safeCareLevel >= 4).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Original proportions restored */}
      <section className="relative bg-afya-deep text-white pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=2000"
            alt="Healthcare background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-afya-deep mix-blend-multiply"></div>
        </div>

        <FloatingParticles />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-xs font-medium">Trusted by 50,000+ patients</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Find safer healthcare across Tanzania
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-blue-100 mb-8"
            >
              Quality transparency improves healthcare decision-making. Compare
              facilities based on verified safety standards, services, and
              patient reviews.
            </motion.p>
          </div>

          {/* Search Box - Original size preserved */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl p-4 md:p-6 shadow-2xl max-w-5xl mx-auto text-gray-800"
          >
            <form onSubmit={handleSearch}>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="relative col-span-1 md:col-span-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Facility name..."
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afya-deep focus:border-afya-deep bg-gray-50 transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="relative col-span-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afya-deep focus:border-afya-deep bg-gray-50 appearance-none cursor-pointer"
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                  >
                    <option value="">All Regions</option>
                    {regions.map((r) => (
                      <option key={r.slug} value={r.name}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative col-span-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Activity className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-afya-deep focus:border-afya-deep bg-gray-50 appearance-none cursor-pointer"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                  >
                    <option value="">Any Service</option>
                    {servicesList.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setIsSearchHovered(true)}
                    onHoverEnd={() => setIsSearchHovered(false)}
                    type="submit"
                    className="w-full bg-afya-accent hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex justify-center items-center gap-2 relative overflow-hidden group"
                  >
                    <motion.div
                      animate={{ x: isSearchHovered ? [0, 3, 0] : 0 }}
                      transition={{ repeat: isSearchHovered ? Infinity : 0, duration: 0.5 }}
                    >
                      <Search size={20} />
                    </motion.div>
                    Search Facilities
                  </motion.button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <span className="text-sm font-medium text-gray-600">
                    Quality Filter:
                  </span>
                  <select
                    className="text-sm border-none bg-afya-light text-afya-deep font-medium rounded-lg py-1.5 px-3 focus:ring-0 cursor-pointer"
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    <option value="">Any SafeCare Level</option>
                    <option value="3">Level 3+ (Good)</option>
                    <option value="4">Level 4+ (Excellent)</option>
                    <option value="5">Level 5 (Outstanding)</option>
                  </select>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-sm text-afya-deep font-medium hover:underline flex items-center gap-1"
                >
                  <motion.div animate={{ rotate: showAdvanced ? 90 : 0 }}>
                    <ChevronRight size={14} />
                  </motion.div>
                  {showAdvanced ? 'Hide Advanced Filters' : 'Advanced Filters'}
                </motion.button>
              </div>

              {/* Advanced Filters Expandable */}
              <AnimatePresence>
                {showAdvanced && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden"
                  >
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Facility Category
                      </label>
                      <select className="block w-full py-2 px-3 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-afya-deep">
                        <option value="">All Categories</option>
                        {categories.map((c) => (
                          <option key={c.slug} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">
                        Insurance Accepted
                      </label>
                      <select className="block w-full py-2 px-3 border border-gray-300 rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-afya-deep">
                        <option value="">Any Insurance</option>
                        <option value="NHIF">NHIF</option>
                        <option value="Jubilee">Jubilee</option>
                        <option value="AAR">AAR</option>
                      </select>
                    </div>
                    <div className="flex items-end pb-1">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          className="rounded text-afya-deep focus:ring-afya-deep w-5 h-5"
                        />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-afya-deep transition-colors flex items-center gap-1">
                          <BadgeCheck size={14} />
                          JCI Accredited Only
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative w-full h-10 text-white fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
          </svg>
        </div>
      </section>

      {/* Educational Carousel - Original height restored */}
      <section className="py-16 bg-white -mt-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 overflow-hidden relative"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-afya-text">
                  Understanding Quality
                </h2>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  <ChevronLeft size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            </div>

            <div className="relative h-64 md:h-48">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute inset-0 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6 ${educationalSlides[currentSlide].color}`}
                >
                  <div className="bg-white p-4 rounded-full shadow-sm shrink-0">
                    {educationalSlides[currentSlide].icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-semibold bg-white/50 backdrop-blur px-2 py-0.5 rounded-full">
                        {educationalSlides[currentSlide].badge}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Users size={10} /> {educationalSlides[currentSlide].stats}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {educationalSlides[currentSlide].title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {educationalSlides[currentSlide].description}
                    </p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="text-afya-deep font-semibold text-sm flex items-center gap-1 hover:underline"
                    >
                      Read more <ArrowRight size={16} />
                    </motion.button>
                  </div>

                  {(currentSlide === 0 || currentSlide === 3) && (
                    <div className="hidden lg:block bg-white p-4 rounded-xl shadow-sm">
                      <SafeCareLevelIndicator level={4} size="lg" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {educationalSlides.map((_, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-afya-deep w-6' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Safe Facilities - Original padding restored */}
      <section className="py-16 bg-afya-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-afya-text mb-2">
                Top-Rated Safe Facilities
              </h2>
              <p className="text-gray-600">
                Facilities achieving SafeCare Level 4 and 5
              </p>
            </div>
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => router.get('/facilities?level=4')}
              className="hidden md:flex items-center gap-1 text-afya-deep font-medium hover:underline"
            >
              View all <ArrowRight size={16} />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topFacilities.map((facility, index) => (
              <motion.div
                key={facility.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                  layout="horizontal"
                  index={index}
                />
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={() => router.get('/facilities?level=4')}
            className="md:hidden w-full mt-6 flex justify-center items-center gap-1 text-afya-deep font-medium bg-white border border-gray-200 py-3 rounded-xl hover:bg-gray-50"
          >
            View all top facilities <ArrowRight size={16} />
          </motion.button>
        </div>
      </section>

      {/* Browse by Category - Original spacing */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-afya-text mb-8 text-center"
          >
            Browse by Category
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
              >
                <CategoryCard category={category} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Region - Original spacing */}
      <section className="py-16 bg-afya-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-afya-text mb-2 text-center">
              Explore by Region
            </h2>
            <p className="text-gray-600 text-center mb-10">
              Find quality healthcare facilities across Tanzania
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {regions.map((region, index) => (
              <motion.div
                key={region.slug}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <RegionCard region={region} index={index} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Strip - Original size */}
      <section className="bg-afya-deep text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            {[
              { value: 450, label: "Verified Facilities", suffix: "+", icon: <Building2 className="w-6 h-6 mx-auto mb-2 text-blue-200" /> },
              { value: 26, label: "Regions Covered", suffix: "", icon: <Globe className="w-6 h-6 mx-auto mb-2 text-blue-200" /> },
              { value: 15, label: "Patient Reviews", suffix: "k+", icon: <Heart className="w-6 h-6 mx-auto mb-2 text-blue-200" /> }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="py-4 md:py-0"
              >
                {stat.icon}
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <div className="text-blue-200 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Original size */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-afya-text mb-4">
              Are you a Facility Administrator?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Keep your facility's information up to date, display your latest
              SafeCare level, and respond to patient reviews.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.get('/admin/login')}
                className="bg-afya-deep text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-colors flex items-center gap-2 justify-center"
              >
                <Rocket size={18} />
                Admin Login
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.get('/contact')}
                className="bg-white text-afya-deep border-2 border-afya-deep px-8 py-3 rounded-xl font-bold hover:bg-afya-light transition-colors flex items-center gap-2 justify-center"
              >
                <MessageCircle size={18} />
                Contact Support
              </motion.button>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-gray-500 mt-6 flex items-center justify-center gap-1"
            >
              <CheckCircle2 className="w-4 h-4 text-afya-deep" />
              Free listing for verified facilities
            </motion.p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

Home.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;