import { motion } from 'framer-motion';
import { Award, ChevronRight, Shield } from 'lucide-react';
import React from 'react';
import { JCIAccreditedBadge } from '../ui/JCIAccreditedBadge';
import { SafeCareLevelIndicator } from '../ui/SafeCareLevelIndicator';

interface FacilitySafetyProps {
    facility: any;
}

export const FacilitySafety: React.FC<FacilitySafetyProps> = ({ facility }) => {
    // Get SafeCare level display text
    const getSafeCareLevelDisplay = (level: number) => {
        if (level === 0) return 'Not Certified Yet';
        return `Level ${level}`;
    };

    const getLevelDescription = () => {
        if (facility.safeCareLevel === 0) {
            return 'This facility has not completed any safety and quality certification';
        }
        if (facility.safeCareLevel === 5) {
            return 'This facility has reached the highest possible SafeCare level, demonstrating outstanding adherence to international quality and safety standards. They have robust systems in place to ensure patient safety, minimize risks, and continuously improve care quality.';
        }
        if (facility.safeCareLevel === 4) {
            return 'This facility demonstrates excellent adherence to quality standards. They have implemented comprehensive safety protocols and quality management systems across most departments.';
        }
        return 'This facility has established core safety protocols and is actively working on quality improvement plans to reach higher standards of care.';
    };

    const getLevelColor = (level: number) => {
        if (level === 0) return 'bg-gray-500';
        if (level >= 4) return 'bg-afya-deep';
        if (level >= 3) return 'bg-afya-mid';
        return 'bg-afya-light';
    };

    return (
        <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            id="section-safety"
            className="scroll-mt-32 pt-4"
        >
            <h2 className="mb-6 text-2xl font-bold text-gray-800">Quality & Safety Certification</h2>

            <div className="mb-6 overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <div
                    className={`${facility.safeCareLevel === 0 ? 'bg-gray-500' : 'bg-afya-deep'} flex flex-col items-start justify-between gap-4 p-6 text-white sm:flex-row sm:items-center`}
                >
                    <div>
                        <h3 className="mb-1 text-xl font-bold">
                            {facility.safeCareLevel === 0 ? 'Not Certified Yet' : `SafeCare Level ${facility.safeCareLevel}`}
                        </h3>
                        <p className={`${facility.safeCareLevel === 0 ? 'text-gray-300' : 'text-blue-100'} text-sm`}>
                            {facility.safeCareLevel === 0 ? 'Certification in progress' : 'Internationally recognized quality standard'}
                        </p>
                    </div>
                    <div className={`${facility.safeCareLevel === 0 ? 'bg-gray-600' : 'bg-white'} rounded-xl p-3`}>
                        {facility.safeCareLevel > 0 ? (
                            <SafeCareLevelIndicator level={facility.safeCareLevel} size="lg" showLabel={false} />
                        ) : (
                            <div className="flex items-center gap-2">
                                <Award size={24} className="text-gray-300" />
                                <span className="font-medium text-gray-300">Pending</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="p-6">
                    <h4 className="mb-2 font-bold text-gray-900">
                        {facility.safeCareLevel === 0 ? 'What does this mean?' : `What does Level ${facility.safeCareLevel} mean?`}
                    </h4>
                    <p className="mb-4 text-gray-700">{getLevelDescription()}</p>
                    <button className="text-afya-deep flex items-center gap-1 text-sm font-medium hover:underline">
                        Read full SafeCare methodology <ChevronRight size={16} />
                    </button>
                </div>
            </div>

            {facility.jciAccredited && (
                <div className="flex flex-col items-start gap-6 rounded-2xl border border-gray-200 bg-white p-6 sm:flex-row">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-yellow-50">
                        <Shield size={32} className="text-yellow-500" />
                    </div>
                    <div>
                        <h3 className="mb-2 flex items-center gap-2 text-xl font-bold text-gray-900">
                            Joint Commission International <JCIAccreditedBadge />
                        </h3>
                        <p className="mb-2 text-gray-700">
                            This facility has earned the Joint Commission International (JCI) Gold Seal of Approval®, a widely recognized symbol of
                            quality that reflects an organization's commitment to providing safe and effective patient care.
                        </p>
                    </div>
                </div>
            )}
        </motion.section>
    );
};
