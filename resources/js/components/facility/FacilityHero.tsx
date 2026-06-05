import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface FacilityHeroProps {
  gallery: string[];
  name: string;
}

export const FacilityHero: React.FC<FacilityHeroProps> = ({ gallery, name }) => {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Ensure we have at least 6 images (use fallbacks if needed)
  const safeGallery = gallery?.length >= 3 ? gallery : [
    'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1504813184591-01572f98c85f?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800'
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % safeGallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + safeGallery.length) % safeGallery.length);
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 mb-6"
      >
        {/* DESKTOP & TABLET: 3-image layout (no extra thumbnails below) */}
        <div className="hidden md:flex flex-col md:flex-row gap-2 h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm">
          {/* Main large image */}
          <div 
            className="w-full md:w-2/3 h-full relative group cursor-pointer overflow-hidden"
            onClick={() => openLightbox(0)}
          >
            <img
              src={safeGallery[0]}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
          </div>
          
          {/* Two side images */}
          <div className="hidden md:flex w-1/3 flex-col gap-2 h-full">
            <div 
              className="h-[calc(50%-4px)] relative group cursor-pointer overflow-hidden rounded-tr-2xl"
              onClick={() => openLightbox(1)}
            >
              <img
                src={safeGallery[1]}
                alt="Gallery 1"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all" />
            </div>
            <div 
              className="h-[calc(50%-4px)] relative group cursor-pointer overflow-hidden rounded-br-2xl"
              onClick={() => openLightbox(2)}
            >
              <img
                src={safeGallery[2]}
                alt="Gallery 2"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Overlay with "+X more" */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity group-hover:bg-black/50">
                <span className="text-white font-bold text-lg border-2 border-white px-5 py-2.5 rounded-lg hover:bg-white hover:text-black transition-colors shadow-sm">
                  +{safeGallery.length - 3} more
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE: Single main image + horizontal thumbnails + View All button */}
        <div className="md:hidden space-y-3">
          {/* Main image */}
          <div 
            className="relative w-full h-[250px] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <img
              src={safeGallery[0]}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">Tap to view</span>
            </div>
          </div>

          {/* Horizontal scrollable thumbnails */}
          <div className="overflow-x-auto scrollbar-hide pb-2">
            <div className="flex gap-2 min-w-max">
              {safeGallery.slice(0, 5).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => openLightbox(idx)}
                  className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-transparent hover:border-afya-deep transition-all"
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  {idx === 4 && safeGallery.length > 5 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold">
                      +{safeGallery.length - 4}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* View All button */}
          <button
            onClick={() => openLightbox(0)}
            className="w-full py-2 text-center text-sm font-medium text-afya-deep border border-afya-deep/30 rounded-xl hover:bg-afya-light transition-colors"
          >
            View all {safeGallery.length} photos
          </button>
        </div>
      </motion.div>

      {/* LIGHTBOX / FULLSCREEN GALLERY */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <X size={28} />
            </button>

            {/* Previous button */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <ChevronLeft size={32} />
            </button>

            {/* Next button */}
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            >
              <ChevronRight size={32} />
            </button>

            {/* Main image */}
            <div className="max-w-5xl max-h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
              <img
                src={safeGallery[currentImageIndex]}
                alt={`${name} - ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4 text-white text-sm">
                {currentImageIndex + 1} / {safeGallery.length}
              </div>
            </div>

            {/* Thumbnail strip inside lightbox (optional but helpful) */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 overflow-x-auto px-4 pb-2">
              {safeGallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                  className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex ? 'border-white' : 'border-transparent opacity-60'
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};