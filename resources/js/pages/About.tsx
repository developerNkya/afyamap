import React from 'react';
import { Shield, Activity, Search, Star, CheckCircle2, Heart, MapPin, Award, Users, Globe, TrendingUp, Sparkles } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { SafeCareLevelIndicator } from '../components/ui/SafeCareLevelIndicator';
import { JCIAccreditedBadge } from '../components/ui/JCIAccreditedBadge';

export default function About() {
  const stats = [
    { label: 'Facilities Listed', value: '200+', icon: MapPin },
    { label: 'Patient Reviews', value: '15k+', icon: Users },
    { label: 'Covered Regions', value: '26', icon: Globe },
    { label: 'Accuracy Rate', value: '98%', icon: TrendingUp },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section – with subtle wave */}
      <div className="relative bg-gradient-to-r from-afya-deep to-afya-mid text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,40 350,0 500,20 C650,40 800,0 950,10 C1100,20 1150,30 1200,0 L1200,120 L0,120 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <Heart size={16} className="text-afya-light" />
            <span className="text-sm font-medium">Transparency in Healthcare</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            About <span className="text-afya-light">AfyaMap</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            "Quality transparency improves healthcare decision‑making – for everyone."
          </p>
        </div>
        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-10 text-white fill-current">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
          </svg>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Mission Statement – Card style */}
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

        {/* Stats Row */}
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

        {/* How It Works – 3 step cards */}
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

        {/* SafeCare Section – Visual & explanatory */}
        <section className="bg-gradient-to-r from-blue-50 to-white rounded-3xl p-8 md:p-12 shadow-sm border border-blue-100">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding SafeCare Levels</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                SafeCare is an internationally recognised methodology that measures healthcare quality.
                The step‑wise indicator shows a facility's progress in implementing safety and quality standards.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-afya-deep shrink-0 mt-0.5" />
                  <span><strong className="font-semibold">Level 1‑2:</strong> Establishing core safety protocols.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-afya-deep shrink-0 mt-0.5" />
                  <span><strong className="font-semibold">Level 3:</strong> Solid quality management systems in place.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-afya-deep shrink-0 mt-0.5" />
                  <span><strong className="font-semibold">Level 4‑5:</strong> Outstanding adherence to international standards.</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-md border border-gray-100 w-full">
              <h3 className="text-center font-bold text-gray-500 uppercase tracking-wider mb-6">Visual Indicator</h3>
              <div className="space-y-5">
                {[5, 3, 1].map(level => (
                  <div key={level} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-gray-700">Level {level}</span>
                    <SafeCareLevelIndicator level={level} size="md" showLabel={false} />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 text-center mt-6">Higher levels mean better safety & quality</p>
            </div>
          </div>
        </section>

        {/* JCI Section – Gold standard */}
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
            <p className="text-gray-600 leading-relaxed text-lg">
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
          <p className="text-gray-500 max-w-2xl mx-auto">
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