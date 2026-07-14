import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { router } from '@inertiajs/react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date?: string;
  facility?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah M.',
    location: 'Dar es Salaam',
    rating: 5,
    text: "The platform helped me find a specialist for my mother within minutes. The SafeCare levels and quality indicators gave me confidence in my choice. Thank you AfyaCare!",
    date: '2 weeks ago',
    facility: 'Jakaya Kikwete Cardiac Institute'
  },
  {
    id: 2,
    name: 'John K.',
    location: 'Arusha',
    rating: 5,
    text: "I was looking for a pediatrician for my newborn son. The filters made it easy to find facilities near me with the right specialists. Great service!",
    date: '1 month ago',
    facility: 'Arusha Lutheran Medical Centre'
  },
  {
    id: 3,
    name: 'Aisha H.',
    location: 'Mwanza',
    rating: 4,
    text: "Excellent resource for finding quality healthcare. The search filters saved me so much time. I found a great dental clinic with excellent reviews.",
    date: '3 weeks ago',
    facility: 'Bugando Medical Centre'
  },
  {
    id: 4,
    name: 'Dr. James M.',
    location: 'Dodoma',
    rating: 5,
    text: "As a healthcare professional, I appreciate how this platform promotes transparency in healthcare delivery. It's helping patients make informed choices.",
    date: '1 week ago',
    facility: 'Dodoma Christian Medical Centre'
  },
  {
    id: 5,
    name: 'Fatima A.',
    location: 'Zanzibar',
    rating: 5,
    text: "Found an excellent eye hospital for my father's cataract surgery. The process was seamless, from search to booking.",
    date: '2 weeks ago',
    facility: 'Zanzibar Eye Hospital'
  }
];

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(380);

  // Check screen size and calculate card width
  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const isMobileView = width < 768;
      setIsMobile(isMobileView);
      
      // Calculate card width based on screen size
      if (isMobileView) {
        // On mobile, card takes full width minus padding
        setCardWidth(width - 32); // 32px for padding (16px on each side)
      } else if (width < 1024) {
        setCardWidth(320);
      } else {
        setCardWidth(380);
      }
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollPosition = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      setShowLeftArrow(scrollPosition > 20);
      setShowRightArrow(scrollPosition < maxScroll - 20);
      
      // Update active index based on scroll position
      const newActiveIndex = Math.round(scrollPosition / cardWidth);
      setActiveIndex(Math.min(newActiveIndex, testimonials.length - 1));
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      checkScroll();
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [cardWidth]);

  const scrollToIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (container) {
      const targetIndex = Math.max(0, Math.min(index, testimonials.length - 1));
      container.scrollTo({
        left: targetIndex * cardWidth,
        behavior: 'smooth'
      });
      setActiveIndex(targetIndex);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? activeIndex - 1 : activeIndex + 1;
    scrollToIndex(newIndex);
  };

  const averageRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-afya-text mb-2 flex items-center justify-center gap-2 flex-wrap">
            <Heart size={28} className="text-afya-deep" />
            What Our <span className="text-afya-deep">Patients Say</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Real stories from people who found quality care
          </p>
        </motion.div>

        {/* Rating Summary */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 py-3 sm:py-4 border-y border-gray-100">
          <div className="flex items-center gap-2">
            <div className="text-xl sm:text-2xl font-bold text-afya-deep">{averageRating}</div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
              ))}
            </div>
          </div>
          <div className="w-px h-6 bg-gray-200" />
          <div className="text-sm text-gray-600">{testimonials.length}+ verified reviews</div>
          <div className="w-px h-6 bg-gray-200 hidden sm:block" />
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <Heart size={14} className="text-afya-deep" />
            <span>100% recommended</span>
          </div>
        </div>

        {/* Horizontal Scrollable Testimonials with Snap Scroll */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-afya-light transition-all lg:left-[-12px]"
            >
              <ChevronLeft size={16} className="text-afya-deep" />
            </button>
          )}

          {/* Scrollable Container with Snap Scroll */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              scrollSnapType: 'x mandatory'
            }}
          >
            <div className="flex" style={{ gap: isMobile ? 16 : 20 }}>
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="flex-shrink-0 snap-start"
                  style={{ width: cardWidth }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(index * 0.05, 0.3) }}
                    className={`group bg-white rounded-xl shadow-sm border h-full flex flex-col transition-all duration-300 ${
                      activeIndex === index 
                        ? 'border-afya-deep/30 shadow-md' 
                        : 'border-gray-100 hover:shadow-lg'
                    }`}
                    style={{ height: '100%' }}
                  >
                    <div className="p-4 sm:p-5 flex flex-col h-full">
                      {/* Quote Icon */}
                      <Quote size={28} className="text-afya-deep/20 mb-3" />
                      
                      {/* Rating */}
                      <div className="flex gap-0.5 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                        {[...Array(5 - testimonial.rating)].map((_, i) => (
                          <Star key={i} size={14} className="text-gray-200" />
                        ))}
                      </div>
                      
                      {/* Testimonial Text */}
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1 line-clamp-4 sm:line-clamp-3">
                        "{testimonial.text}"
                      </p>
                      
                      {/* Author Info */}
                      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-afya-light flex items-center justify-center text-afya-deep font-bold text-sm">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-afya-text text-sm truncate">{testimonial.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className="truncate">{testimonial.location}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                            <span className="flex-shrink-0">{testimonial.date}</span>
                          </div>
                          {testimonial.facility && (
                            <p className="text-[10px] text-afya-deep mt-0.5 truncate">{testimonial.facility}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white rounded-full shadow-md border border-gray-200 flex items-center justify-center hover:bg-afya-light transition-all lg:right-[-12px]"
            >
              <ChevronRight size={16} className="text-afya-deep" />
            </button>
          )}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-6 bg-afya-deep'
                  : 'w-1.5 bg-gray-300 hover:bg-afya-deep/50'
              }`}
            />
          ))}
        </div>

        {/* Scroll Hint for Mobile */}
        {isMobile && (
          <div className="text-center mt-4">
            <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
              <ChevronLeft size={10} />
              <span>Swipe to see more reviews</span>
              <ChevronRight size={10} />
            </p>
          </div>
        )}
      </div>
    </section>
  );
};