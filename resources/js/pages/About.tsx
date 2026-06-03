import React from 'react';
import { Shield, Activity, Search, Star, CheckCircle2 } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { SafeCareLevelIndicator } from '../components/ui/SafeCareLevelIndicator';
import { JCIAccreditedBadge } from '../components/ui/JCIAccreditedBadge';
export const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-afya-deep text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About AfyaMap</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            "Quality transparency improves healthcare decision-making."
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {/* Mission */}
        <section>
          <h2 className="text-3xl font-bold text-afya-text mb-6 text-center">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            AfyaMap is a public-facing digital health navigation tool designed
            to help people identify and choose healthcare facilities based not
            only on location and services, but also on quality and safety
            standards. We translate complex healthcare quality information into
            simple visual indicators so that users can quickly compare
            facilities and make informed choices.
          </p>
        </section>

        {/* How it Works */}
        <section id="how-it-works">
          <h2 className="text-3xl font-bold text-afya-text mb-12 text-center">
            How AfyaMap Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-afya-light rounded-2xl flex items-center justify-center mx-auto mb-6 text-afya-deep">
                <Search size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Search & Filter</h3>
              <p className="text-gray-600">
                Find facilities near you or filter by specific services,
                insurance, and quality levels.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-afya-light rounded-2xl flex items-center justify-center mx-auto mb-6 text-afya-deep">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Compare Quality</h3>
              <p className="text-gray-600">
                Look at the SafeCare Level and JCI badges to understand the
                facility's commitment to safety.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-afya-light rounded-2xl flex items-center justify-center mx-auto mb-6 text-afya-deep">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Read Reviews</h3>
              <p className="text-gray-600">
                See what other patients have experienced to make the best
                decision for your healthcare needs.
              </p>
            </div>
          </div>
        </section>

        {/* SafeCare */}
        <section id="safecare" className="bg-afya-bg rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-afya-text mb-6">
                Understanding SafeCare Levels
              </h2>
              <p className="text-gray-700 mb-6">
                SafeCare is an internationally recognized methodology that
                measures healthcare quality. The step-wise indicator shows a
                facility's progress in implementing safety and quality
                standards.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-afya-deep shrink-0 mt-1" />
                  <span>
                    <strong>Level 1-2:</strong> Establishing core safety
                    protocols.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-afya-deep shrink-0 mt-1" />
                  <span>
                    <strong>Level 3:</strong> Solid quality management systems
                    in place.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-afya-deep shrink-0 mt-1" />
                  <span>
                    <strong>Level 4-5:</strong> Outstanding adherence to
                    international standards.
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 w-full">
              <h3 className="text-center font-bold text-gray-500 uppercase tracking-wider mb-8">
                Visual Indicator
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Level 5</span>
                  <SafeCareLevelIndicator
                    level={5}
                    size="md"
                    showLabel={false} />
                  
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Level 3</span>
                  <SafeCareLevelIndicator
                    level={3}
                    size="md"
                    showLabel={false} />
                  
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Level 1</span>
                  <SafeCareLevelIndicator
                    level={1}
                    size="md"
                    showLabel={false} />
                  
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JCI */}
        <section
          id="jci"
          className="flex flex-col md:flex-row gap-12 items-center">
          
          <div className="md:w-1/3 flex justify-center">
            <div className="w-48 h-48 bg-yellow-50 rounded-full flex items-center justify-center border-8 border-white shadow-xl">
              <Activity size={80} className="text-yellow-500" />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-afya-text mb-4 flex items-center gap-4">
              JCI Accreditation <JCIAccreditedBadge size="md" />
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Joint Commission International (JCI) accreditation is considered
              the gold standard in global healthcare. Facilities that achieve
              this accreditation have undergone a rigorous evaluation process
              and have demonstrated a commitment to continuous improvement in
              patient safety and quality of care. When you see this badge on
              AfyaMap, you can be confident the facility meets the highest
              international standards.
            </p>
          </div>
        </section>

        {/* PharmAccess */}
        <section className="text-center border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Administered by PharmAccess
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AfyaMap is maintained and administered by PharmAccess, an
            international non-profit organization dedicated to improving access
            to quality healthcare in Africa.
          </p>
        </section>
      </div>
    </div>);

};

About.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;