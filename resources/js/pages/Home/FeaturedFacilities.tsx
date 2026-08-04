import { router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import React from 'react';
import { FacilityCard } from '../../components/ui/FacilityCard';

interface FeaturedFacilitiesProps {
    facilities: any[];
}

export const FeaturedFacilities: React.FC<FeaturedFacilitiesProps> = ({ facilities }) => {
    const topFacilities = facilities.filter((f) => f.safeCareLevel >= 4).slice(0, 4);

    return (
        <section className="bg-afya-bg py-8 sm:py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-6 flex flex-col items-start justify-between gap-3 sm:mb-8 sm:flex-row sm:items-end sm:gap-4"
                >
                    <div className="w-full sm:w-auto">
                        <h2 className="text-afya-text mb-1 text-xl font-bold sm:mb-2 sm:text-2xl md:text-3xl">Top-Rated Safe Care Facilities</h2>
                        <p className="text-xs text-gray-600 sm:text-sm md:text-base">Facilities with best quality standards and patient reviews</p>
                    </div>

                    {/* Desktop View All Button */}
                    <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => router.get('/facilities?level=4')}
                        className="text-afya-deep hidden items-center gap-1 text-sm font-medium hover:underline md:flex"
                    >
                        View all <ArrowRight size={14} />
                    </motion.button>
                </motion.div>

                {/* Facilities Grid */}
                <div className="grid grid-cols-1 gap-4 sm:gap-5 md:gap-6 lg:grid-cols-2">
                    {topFacilities.map((facility, index) => (
                        <motion.div
                            key={facility.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="h-full"
                        >
                            <FacilityCard facility={facility} layout="horizontal" index={index} className="h-full" />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="mt-6 sm:mt-8 md:hidden">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.get('/facilities?level=4')}
                        className="text-afya-deep flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium transition-all hover:bg-gray-50"
                    >
                        View all top facilities
                        <ArrowRight size={14} />
                    </motion.button>
                </div>

                {/* Empty state */}
                {topFacilities.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-gray-500">No facilities found</p>
                    </div>
                )}
            </div>
        </section>
    );
};
