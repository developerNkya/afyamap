import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Users, Search, Award, TrendingUp } from 'lucide-react';
import { SafeCareLevelIndicator } from '../../components/ui/SafeCareLevelIndicator';

// Animated Icons with Draw Effect
const AnimatedShieldIcon = ({ isActive }: { isActive: boolean }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(isActive ? "visible" : "hidden");
  }, [isActive]);

  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 0.8, ease: "easeInOut" }, opacity: { duration: 0.2 } } }
  };

  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-afya-deep" initial="hidden" animate={controls}>
      <motion.path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" variants={draw} />
      <motion.path d="M12 8v4" variants={draw} transition={{ delay: 0.3 }} />
      <motion.path d="M12 16h.01" variants={draw} transition={{ delay: 0.5 }} />
    </motion.svg>
  );
};

const AnimatedSearchIcon = ({ isActive }: { isActive: boolean }) => {
  const controls = useAnimation();
  useEffect(() => { controls.start(isActive ? "visible" : "hidden"); }, [isActive]);
  const draw = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 0.8, ease: "easeInOut" }, opacity: { duration: 0.2 } } } };
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-afya-deep" initial="hidden" animate={controls}>
      <motion.circle cx="10" cy="10" r="7" variants={draw} />
      <motion.path d="m21 21-4.3-4.3" variants={draw} transition={{ delay: 0.4 }} />
    </motion.svg>
  );
};

const AnimatedAwardIcon = ({ isActive }: { isActive: boolean }) => {
  const controls = useAnimation();
  useEffect(() => { controls.start(isActive ? "visible" : "hidden"); }, [isActive]);
  const draw = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 0.8, ease: "easeInOut" }, opacity: { duration: 0.2 } } } };
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-afya-deep" initial="hidden" animate={controls}>
      <motion.circle cx="12" cy="8" r="6" variants={draw} />
      <motion.path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" variants={draw} transition={{ delay: 0.4 }} />
    </motion.svg>
  );
};

const AnimatedTrendingIcon = ({ isActive }: { isActive: boolean }) => {
  const controls = useAnimation();
  useEffect(() => { controls.start(isActive ? "visible" : "hidden"); }, [isActive]);
  const draw = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 0.6, ease: "easeInOut" }, opacity: { duration: 0.2 } } } };
  return (
    <motion.svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-afya-deep" initial="hidden" animate={controls}>
      <motion.polyline points="23 6 13.5 15.5 8.5 10.5 2 17" variants={draw} />
      <motion.path d="M17 6h6v6" variants={draw} transition={{ delay: 0.3 }} />
    </motion.svg>
  );
};

// Educational slides with consistent blue background
const educationalSlides = [
  { 
    id: 1, 
    title: 'What is SafeCare Level?', 
    shortTitle: 'SafeCare Levels', 
    description: 'SafeCare is an internationally recognized methodology that measures healthcare quality. Levels range from 1 to 5, with 5 indicating the highest adherence to safe practices and quality standards.', 
    shortDescription: 'International quality standard from Level 1 to 5. Level 5 is the highest safety rating.', 
    icon: <AnimatedShieldIcon isActive={true} />, 
    bgColor: 'bg-blue-50',
    badge: 'Quality Standard', 
    stats: '92% patient trust'
  },
  { 
    id: 2, 
    title: 'How AfyaMap Works', 
    shortTitle: 'How It Works', 
    description: 'Search for facilities, compare their quality ratings, check available services, and read reviews from other patients. We make healthcare transparency simple.', 
    shortDescription: 'Search, compare, review - find the best healthcare facility for your needs in seconds.', 
    icon: <AnimatedSearchIcon isActive={true} />, 
    bgColor: 'bg-blue-50',
    badge: 'Smart Technology', 
    stats: '15k+ reviews'
  },
  { 
    id: 3, 
    title: 'Understanding JCI Accreditation', 
    shortTitle: 'JCI Gold Standard', 
    description: 'Joint Commission International (JCI) accreditation is the gold standard in global healthcare. Facilities with this badge meet rigorous international safety and quality standards.', 
    shortDescription: 'The gold standard in global healthcare - only top facilities achieve this.', 
    icon: <AnimatedAwardIcon isActive={true} />, 
    bgColor: 'bg-blue-50',
    badge: 'Premium Care', 
    stats: '12 JCI facilities'
  },
  { 
    id: 4, 
    title: 'How to Read Quality Indicators', 
    shortTitle: 'Quality Indicators', 
    description: 'Look for the blue step-wise bar on facility cards. Filled dark blue segments show the achieved SafeCare level. Higher levels mean better safety protocols.', 
    shortDescription: 'Blue step-wise bars show SafeCare levels - more filled segments mean better safety.', 
    icon: <AnimatedTrendingIcon isActive={true} />, 
    bgColor: 'bg-blue-50',
    badge: 'Data Driven', 
    stats: 'Instant clarity'
  }
];

export const EducationalSection = ({ currentSlide, setCurrentSlide }: { currentSlide: number; setCurrentSlide: (slide: number) => void }) => {
  const [key, setKey] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % educationalSlides.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + educationalSlides.length) % educationalSlides.length);
  };

  // Auto-scroll effect - starts immediately and runs infinitely
  useEffect(() => {
    // Start the auto-scroll timer immediately
    autoScrollRef.current = setInterval(() => {
      if (!isHovering) {
        nextSlide();
      }
    }, 1000);
    
    // Cleanup on unmount
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isHovering]); // Re-run when isHovering changes

  // Re-trigger animations on slide change
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [currentSlide]);

  return (
    <section 
      className="py-12 sm:py-16 bg-white -mt-8 sm:-mt-16 relative z-20"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 md:p-8 border-b border-gray-100">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-afya-text">Understanding Healthcare Quality</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Learn how to make informed healthcare decisions</p>
            </div>
            <div className="flex gap-2">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={prevSlide} className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
              </motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={nextSlide} className="p-1.5 sm:p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                <ChevronRight size={16} className="sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>

          {/* Carousel Content */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className={`${educationalSlides[currentSlide].bgColor}`}
              >
                <div className="p-4 sm:p-6 md:p-8">
                  {/* Desktop Layout: Row */}
                  <div className="hidden md:flex flex-row gap-6 md:gap-8">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-md">
                        {React.cloneElement(educationalSlides[currentSlide].icon, { key, isActive: true })}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-afya-deep text-white shadow-sm">
                          <Shield size={12} className="text-white" />
                          {educationalSlides[currentSlide].badge}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-white/60 px-2.5 py-1 rounded-full">
                          <Users size={10} className="sm:w-3 sm:h-3" />
                          {educationalSlides[currentSlide].stats}
                        </span>
                      </div>
                      
                      <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                        {educationalSlides[currentSlide].title}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        {educationalSlides[currentSlide].description}
                      </p>
                      
                      <motion.button whileHover={{ x: 5 }} className="text-afya-deep font-semibold text-xs sm:text-sm flex items-center gap-1 hover:underline mt-4">
                        Learn more <ArrowRight size={12} className="sm:w-4 sm:h-4" />
                      </motion.button>
                    </div>

                    {/* SafeCare Level - Desktop Right (SHOWN ON ALL SLIDES) */}
                    <div className="flex-shrink-0 flex justify-center items-center">
                      <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-sm border border-gray-100">
                        <SafeCareLevelIndicator level={4} size="md" />
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout: Icon at top-right, content below */}
                  <div className="md:hidden">
                    {/* Top row with Icon on the right */}
                    <div className="flex justify-end mb-4">
                      <div className="bg-white p-3 rounded-2xl shadow-md inline-block">
                        {React.cloneElement(educationalSlides[currentSlide].icon, { key, isActive: true })}
                      </div>
                    </div>
                    
                    {/* Content below */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-afya-deep text-white shadow-sm">
                          <Shield size={12} className="text-white" />
                          {educationalSlides[currentSlide].badge}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-600 bg-white/60 px-2.5 py-1 rounded-full">
                          <Users size={10} className="sm:w-3 sm:h-3" />
                          {educationalSlides[currentSlide].stats}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-bold text-gray-900 mb-2">
                        {educationalSlides[currentSlide].shortTitle}
                      </h3>
                      
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {educationalSlides[currentSlide].shortDescription}
                      </p>
                      
                      <motion.button whileHover={{ x: 5 }} className="text-afya-deep font-semibold text-xs flex items-center gap-1 hover:underline mt-4">
                        Learn more <ArrowRight size={12} />
                      </motion.button>
                    </div>
                    
                    {/* SafeCare Level - Mobile: Below content, right aligned (SHOWN ON ALL SLIDES) */}
                    <div className="flex justify-end mt-4 pt-3 border-t border-gray-200/50">
                      <div className="bg-white/90 backdrop-blur p-2.5 rounded-lg shadow-sm">
                        <SafeCareLevelIndicator level={4} size="sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-1.5 sm:gap-2 p-3 sm:p-4 bg-gray-50/50 border-t border-gray-100">
            {educationalSlides.map((_, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.2 }}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-afya-deep w-6 sm:w-8' : 'bg-gray-300 w-1.5 sm:w-2'}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};