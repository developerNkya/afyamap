import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Calendar, Users, AlertCircle, MessageSquare, CheckCircle2, CreditCard, Wallet, Smartphone } from 'lucide-react';

interface FacilityOverviewProps {
  facility: any;
}

export const FacilityOverview: React.FC<FacilityOverviewProps> = ({ facility }) => {
  // Helper to get payment method icon
  const getPaymentIcon = (shortCode: string) => {
    switch (shortCode?.toLowerCase()) {
      case 'cash':
        return <Wallet size={16} className="text-gray-500" />;
      case 'mpesa':
      case 'airtel_money':
      case 'mixx_by_yas':
        return <Smartphone size={16} className="text-gray-500" />;
      default:
        return <CreditCard size={16} className="text-gray-500" />;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      id="section-overview"
      className="scroll-mt-32"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">About this facility</h2>
      <p className="text-gray-700 leading-relaxed mb-8 text-lg">{facility.description}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
          <Building2 className="text-afya-mid shrink-0" />
          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold">Type</div>
            <div className="font-medium text-gray-900">{facility.category}</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
          <Calendar className="text-afya-mid shrink-0" />
          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold">Established</div>
            <div className="font-medium text-gray-900">{facility.established}</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
          <Users className="text-afya-mid shrink-0" />
          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold">Capacity</div>
            <div className="font-medium text-gray-900">{facility.beds} Beds</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
          <AlertCircle className="text-afya-mid shrink-0" />
          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold">Emergency</div>
            <div className="font-medium text-gray-900">
              {facility.emergency247 ? '24/7 Available' : 'Limited'}
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-start gap-3">
          <MessageSquare className="text-afya-mid shrink-0" />
          <div>
            <div className="text-xs text-gray-500 uppercase font-semibold">Languages</div>
            <div className="font-medium text-gray-900">
              {Array.isArray(facility.languages) && facility.languages.length > 0
                ? facility.languages.join(', ')
                : 'Swahili, English'}
            </div>
          </div>
        </div>
      </div>

      {/* Insurance Accepted */}
      <h3 className="text-lg font-bold text-gray-800 mb-3">Insurance Accepted</h3>
      <div className="flex flex-wrap gap-2 mb-8">
        {Array.isArray(facility.insurances) && facility.insurances.length > 0 ? (
          facility.insurances.map((ins: string) => (
            <span
              key={ins}
              className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 shadow-sm"
            >
              <CheckCircle2 size={16} className="text-green-500" /> {ins}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-sm">Insurance information not available</span>
        )}
      </div>

      {/* Payment Methods - Uniform styling like insurance */}
      <h3 className="text-lg font-bold text-gray-800 mb-3">Payment Methods</h3>
      <div className="flex flex-wrap gap-2">
        {Array.isArray(facility.payment_methods) && facility.payment_methods.length > 0 ? (
          facility.payment_methods.map((method: any) => (
            <span
              key={method.id || method.payment_method_id}
              className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 flex items-center gap-2 shadow-sm"
            >
              {getPaymentIcon(method.short_code)}
              {method.name}
            </span>
          ))
        ) : (
          <span className="text-gray-400 text-sm">Payment information not available</span>
        )}
      </div>
    </motion.section>
  );
};