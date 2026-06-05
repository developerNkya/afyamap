import React, { useEffect, useState, useRef } from 'react';
import { Shield, Activity, Search, Star, CheckCircle2, Heart, MapPin, Award, Users, Globe, TrendingUp, Sparkles } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { SafeCareLevelIndicator } from '../components/ui/SafeCareLevelIndicator';
import { JCIAccreditedBadge } from '../components/ui/JCIAccreditedBadge';
import { FloatingParticles } from '../pages/Home/FloatingParticles';

// Simple trigger to show the indicator (no animation, just appears)
const AnimatedSafeCareLevel = ({ targetLevel, size = 'md' }: { targetLevel: number; size?: 'sm' | 'md' | 'lg' }) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (isInView) setShow(true);
  }, [isInView]);

  return (
    <div ref={ref}>
      {show ? (
        <SafeCareLevelIndicator level={targetLevel} size={size} showLabel={false} />
      ) : (
        // invisible placeholder to avoid layout shift
        <div className="h-[32px] w-full max-w-[200px]" />
      )}
    </div>
  );
};

export default function About() {
  const stats = [
    { label: 'Facilities Listed', value: '200+', icon: MapPin },
    { label: 'Patient Reviews', value: '15k+', icon: Users },
    { label: 'Covered Regions', value: '26', icon: Globe },
    { label: 'Accuracy Rate', value: '98%', icon: TrendingUp },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section – no bottom wave */}
      <section className="relative bg-afya-deep text-white pt-16 sm:pt-20 pb-24 sm:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=2000"
            alt="Healthcare background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-afya-deep mix-blend-multiply"></div>
        </div>
        <FloatingParticles />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 mb-4 sm:mb-6"
          >
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-300" />
            <span className="text-xs sm:text-sm font-medium">Transparency in Healthcare</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 px-2"
          >
            About <span className="text-afya-light">AfyaMap</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-blue-100 mb-6 sm:mb-8 px-4 max-w-2xl mx-auto"
          >
            "Quality transparency improves healthcare decision‑making – for everyone."
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Mission Statement */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center max-w-4xl mx-auto">
          <div className="w-16 h-16 bg-afya-light rounded-full flex items-center justify-center mx-auto mb-6 text-afya-deep">
            <Sparkles size={32} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            AfyaMap is a public‑facing digital health navigation tool designed to help people
            identify and choose healthcare facilities based not only on location and services,
            but also on quality and safety standards. We translate complex healthcare quality
            information into simple visual indicators so that users can quickly compare
            facilities and make informed choices.
          </p>
        </section>

        {/* Stats Row – no animation, just static values */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-afya-light rounded-xl flex items-center justify-center mx-auto mb-3 text-afya-deep">
                <stat.icon size={24} />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How AfyaMap Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Search, title: '1. Search & Filter', desc: 'Find facilities near you or filter by services, insurance, and quality levels.', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: Shield, title: '2. Compare Quality', desc: 'Look at SafeCare Levels and JCI badges to understand safety commitment.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { icon: Star, title: '3. Read Reviews', desc: 'See what other patients experienced to make the best decision.', color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                <div className={`w-16 h-16 ${step.bg} rounded-2xl flex items-center justify-center mx-auto mb-5 ${step.color} group-hover:scale-110 transition-transform`}>
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SafeCare Section – visual indicators appear once, no step‑by‑step */}
        <section className="bg-gradient-to-r from-blue-50 to-white rounded-3xl p-8 md:p-12 shadow-sm border border-blue-100">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding SafeCare Levels</h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                SafeCare is an internationally recognised methodology that measures healthcare quality.
                The step‑wise indicator shows a facility's progress in implementing safety and quality standards.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-afya-deep shrink-0 mt-0.5" />
                  <span className="text-gray-800"><strong className="font-semibold">Level 1‑2:</strong> Establishing core safety protocols.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-afya-deep shrink-0 mt-0.5" />
                  <span className="text-gray-800"><strong className="font-semibold">Level 3:</strong> Solid quality management systems in place.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-afya-deep shrink-0 mt-0.5" />
                  <span className="text-gray-800"><strong className="font-semibold">Level 4‑5:</strong> Outstanding adherence to international standards.</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-md border border-gray-100 w-full">
              <h3 className="text-center font-bold text-gray-500 uppercase tracking-wider mb-6">Visual Indicator</h3>
              <div className="space-y-5">
                {[5, 3, 1].map(level => (
                  <div key={level} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-700">Level {level}</span>
                    <AnimatedSafeCareLevel targetLevel={level} size="md" />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-6">Higher levels mean better safety & quality</p>
            </div>
          </div>
        </section>

        {/* JCI Section */}
        <section className="flex flex-col md:flex-row gap-10 items-center bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
          <div className="md:w-1/3 flex justify-center">
            <div className="w-36 h-36 bg-yellow-50 rounded-full flex items-center justify-center border-4 border-white shadow-xl ring-1 ring-yellow-200">
              <Award size={64} className="text-yellow-500" />
            </div>
          </div>
          <div className="md:w-2/3">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h2 className="text-3xl font-bold text-gray-900">JCI Accreditation</h2>
              <JCIAccreditedBadge size="md" />
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              Joint Commission International (JCI) accreditation is considered the gold standard in global healthcare.
              Facilities that achieve this accreditation have undergone a rigorous evaluation process and demonstrate
              a commitment to continuous improvement in patient safety and quality of care. When you see this badge on
              AfyaMap, you can be confident the facility meets the highest international standards.
            </p>
          </div>
        </section>

        {/* PharmAccess Footer */}
        <div className="text-center bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Administered by PharmAccess</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AfyaMap is maintained and administered by PharmAccess, an international non‑profit organisation
            dedicated to improving access to quality healthcare in Africa.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm text-afya-deep">
            <Heart size={16} />
            <span>Making healthcare better, together</span>
          </div>
        </div>
      </div>
    </div>
  );
}

About.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;