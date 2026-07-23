import { motion } from 'framer-motion';
import { Award, Clock, MapPin, Navigation, Phone, Share2, Star } from 'lucide-react';
import React from 'react';
import { JCIAccreditedBadge } from '../ui/JCIAccreditedBadge';

interface FacilityHeaderProps {
    facility: any;
    scrollToTab: (tabId: string) => void;
}

export const FacilityHeader: React.FC<FacilityHeaderProps> = ({ facility, scrollToTab }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mb-6 max-w-7xl px-4 sm:mb-8 sm:px-6 lg:px-8"
        >
            <div className="flex flex-col justify-between gap-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6 md:flex-row md:gap-8 md:p-8">
                {/* Left side: Info & actions */}
                <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="bg-afya-light text-afya-deep rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase sm:text-xs">
                            {facility.category}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-[11px] font-medium text-green-700 sm:text-xs">
                            <Clock size={12} /> Open Now
                        </span>
                    </div>

                    <h1 className="mb-2 text-xl leading-tight font-bold text-gray-800 sm:text-3xl md:text-4xl">{facility.name}</h1>

                    <div className="mb-4 flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:flex-wrap sm:gap-4">
                        <span className="flex items-center gap-1.5">
                            <MapPin size={16} className="shrink-0" />
                            <span className="text-sm">{facility.address}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Phone size={16} className="shrink-0" />
                            <span className="text-sm">{facility.phone}</span>
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <button className="bg-afya-deep hover:bg-opacity-90 flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-medium text-white transition-colors sm:text-sm">
                            <Navigation size={16} />
                            <span>Directions</span>
                        </button>
                        <button className="text-afya-deep border-afya-deep hover:bg-afya-light flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-xs font-medium transition-colors sm:text-sm">
                            <Phone size={16} />
                            <span>Call</span>
                        </button>
                        <button className="rounded-xl bg-gray-100 p-2 text-gray-700 transition-colors hover:bg-gray-200">
                            <Share2 size={16} />
                        </button>
                    </div>
                </div>

                {/* Right side: Quality & Rating cards - stacked on all screens */}
                <div className="flex shrink-0 flex-col gap-3 sm:gap-4 md:w-72">
                    {/* SafeCare Certification Card - Removed quality standards text */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-5">
                        <div className="mb-2 flex items-center gap-2 sm:mb-3">
                            <Award size={18} className="text-afya-deep" />
                            <h3 className="text-[10px] font-bold tracking-wider text-gray-500 uppercase sm:text-sm">SafeCare Certification</h3>
                        </div>
                        <div className="mb-2 w-full sm:mb-4">
                            <div className="origin-left scale-90 sm:scale-100">
                                {/* Keep the SafeCare level indicator without the "Quality Standards" label */}
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-semibold text-gray-700">Level {facility.safeCareLevel}</span>
                                    <span className="text-xs text-gray-500">
                                        {facility.safeCareLevel === 5
                                            ? '⭐ Excellence'
                                            : facility.safeCareLevel >= 4
                                              ? 'Advanced'
                                              : facility.safeCareLevel >= 3
                                                ? 'Intermediate'
                                                : 'Foundation'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {facility.jciAccredited && (
                            <div className="mt-2 border-t border-gray-200 pt-2 sm:mt-3 sm:pt-3">
                                <JCIAccreditedBadge size="sm" />
                            </div>
                        )}
                    </div>

                    {/* Patient Rating Card - Enhanced with better visual */}
                    <div
                        className="hover:border-afya-mid flex cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-white p-3 transition-colors hover:shadow-md sm:p-4"
                        onClick={() => scrollToTab('reviews')}
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-afya-deep rounded-lg p-2 text-white">
                                <Star size={20} className="fill-white" />
                            </div>
                            <div>
                                <div className="text-lg font-bold text-gray-800 sm:text-2xl">{(facility.rating ?? 0).toFixed(1)}</div>
                                <div className="text-[10px] text-gray-500 sm:text-sm">{facility.reviewCount ?? 0} patient reviews</div>
                            </div>
                        </div>
                        <div className="text-afya-deep bg-afya-light rounded-full px-3 py-1 text-xs font-medium">View all</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
