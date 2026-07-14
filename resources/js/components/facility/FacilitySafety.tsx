import React from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronRight } from 'lucide-react';
import { SafeCareLevelIndicator } from '../ui/SafeCareLevelIndicator';
import { JCIAccreditedBadge } from '../ui/JCIAccreditedBadge';

interface FacilitySafetyProps {
  facility: any;
}

export const FacilitySafety: React.FC<FacilitySafetyProps> = ({ facility }) => {
  const getLevelDescription = () => {
    if (facility.safeCareLevel === 5) {
      return 'This facility has reached the highest possible SafeCare level, demonstrating outstanding adherence to international quality and safety standards. They have robust systems in place to ensure patient safety, minimize risks, and continuously improve care quality.';
    }
    if (facility.safeCareLevel === 4) {
      return 'This facility demonstrates excellent adherence to quality standards. They have implemented comprehensive safety protocols and quality management systems across most departments.';
    }
    return 'This facility has established core safety protocols and is actively working on quality improvement plans to reach higher standards of care.';
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      id="section-safety"
      className="scroll-mt-32 pt-4"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Safety & Certification</h2>

      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-6">
        <div className="bg-afya-deep p-6 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl font-bold mb-1">SafeCare Level {facility.safeCareLevel}</h3>
            <p className="text-blue-100 text-sm">Internationally recognized quality standard</p>
          </div>
          <div className="bg-white p-3 rounded-xl">
            <SafeCareLevelIndicator level={facility.safeCareLevel} size="lg" showLabel={false} />
          </div>
        </div>
        <div className="p-6">
          <h4 className="font-bold text-gray-900 mb-2">What does Level {facility.safeCareLevel} mean?</h4>
          <p className="text-gray-700 mb-4">{getLevelDescription()}</p>
          <button className="text-afya-deep font-medium text-sm hover:underline flex items-center gap-1">
            Read full SafeCare methodology <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {facility.jciAccredited && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center shrink-0">
            <Shield size={32} className="text-yellow-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              Joint Commission International <JCIAccreditedBadge />
            </h3>
            <p className="text-gray-700 mb-2">
              This facility has earned the Joint Commission International (JCI) Gold Seal of Approval®,
              a widely recognized symbol of quality that reflects an organization's commitment to
              providing safe and effective patient care.
            </p>
          </div>
        </div>
      )}
    </motion.section>
  );
};