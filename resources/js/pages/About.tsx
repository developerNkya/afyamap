import { motion, useInView } from 'framer-motion';
import { Award, CheckCircle2, Globe, Heart, MapPin, Search, Shield, Sparkles, Star, TrendingUp, Users } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { JCIAccreditedBadge } from '../components/ui/JCIAccreditedBadge';
import { SafeCareLevelIndicator } from '../components/ui/SafeCareLevelIndicator';
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

    // Updated SafeCare Level descriptions
    const safeCareLevels = [
        {
            level: 1,
            description: 'The quality of the services provided is likely to fluctuate and there is a risk of unsafe situations.',
        },
        {
            level: 2,
            description:
                'The facility is starting to put processes in place for high risk procedures however the quality of services provided is still likely to fluctuate and the risk of unsafe situations remains high.',
        },
        {
            level: 3,
            description:
                'The facility is starting to operate according to structured processes and procedures, however not all high risk procedures are controlled, thus the quality of services provided can still fluctuate.',
        },
        {
            level: 4,
            description:
                'The facility is accustomed to operate according to standardized procedures, and has started to monitor the implementation of their procedures and guidelines. Most of high risk procedures are monitored and controlled and the quality of services provided is less likely to fluctuate.',
        },
        {
            level: 5,
            description:
                'The facility is regularly monitoring the implementation of treatment guidelines and standard operating procedures through internal audits.',
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section – no bottom wave */}
            <section className="bg-afya-deep relative overflow-hidden pt-16 pb-24 text-white sm:pt-20 sm:pb-32">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=2000"
                        alt="Healthcare background"
                        className="h-full w-full object-cover"
                    />
                    <div className="bg-afya-deep absolute inset-0 mix-blend-multiply"></div>
                </div>
                <FloatingParticles />

                <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm sm:mb-6"
                    >
                        <Sparkles className="h-3 w-3 text-blue-300 sm:h-3.5 sm:w-3.5" />
                        <span className="text-xs font-medium sm:text-sm">Transparency in Healthcare</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6 px-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
                    >
                        About <span className="text-afya-light">AfyaMap</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mx-auto mb-6 max-w-2xl px-4 text-base text-blue-100 sm:mb-8 sm:text-lg md:text-xl"
                    >
                        "Quality transparency improves healthcare decision‑making – for everyone."
                    </motion.p>
                </div>
            </section>

            <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
                {/* Mission Statement */}
                <section className="mx-auto max-w-4xl rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm md:p-12">
                    <div className="bg-afya-light text-afya-deep mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full">
                        <Sparkles size={32} />
                    </div>
                    <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Mission</h2>
                    <p className="text-lg leading-relaxed text-gray-600">
                        AfyaMap is a public‑facing digital health navigation tool designed to help people identify and choose healthcare facilities
                        based not only on location and services, but also on quality and safety standards. We translate complex healthcare quality
                        information into simple visual indicators so that users can quickly compare facilities and make informed choices.
                    </p>
                </section>

                {/* Stats Row – no animation, just static values */}
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
                        >
                            <div className="bg-afya-light text-afya-deep mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl">
                                <stat.icon size={24} />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* How It Works */}
                <section>
                    <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">How AfyaMap Works</h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {[
                            {
                                icon: Search,
                                title: '1. Search & Filter',
                                desc: 'Find facilities near you or filter by services, insurance, and quality levels.',
                                color: 'text-blue-500',
                                bg: 'bg-blue-50',
                            },
                            {
                                icon: Shield,
                                title: '2. Compare Quality',
                                desc: 'Look at SafeCare Levels and JCI badges to understand safety commitment.',
                                color: 'text-emerald-500',
                                bg: 'bg-emerald-50',
                            },
                            {
                                icon: Star,
                                title: '3. Read Reviews',
                                desc: 'See what other patients experienced to make the best decision.',
                                color: 'text-amber-500',
                                bg: 'bg-amber-50',
                            },
                        ].map((step, idx) => (
                            <div
                                key={idx}
                                className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition-all hover:shadow-md"
                            >
                                <div
                                    className={`h-16 w-16 ${step.bg} mx-auto mb-5 flex items-center justify-center rounded-2xl ${step.color} transition-transform group-hover:scale-110`}
                                >
                                    <step.icon size={32} />
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">{step.title}</h3>
                                <p className="text-gray-600">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SafeCare Section – Updated descriptions, keeping original styling */}
                <section className="rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-8 shadow-sm md:p-12">
                    <div className="flex flex-col items-center gap-12 md:flex-row">
                        <div className="md:w-1/2">
                            <h2 className="mb-6 text-3xl font-bold text-gray-900">Understanding SafeCare Levels</h2>
                            <p className="mb-6 leading-relaxed text-gray-700">
                                SafeCare is an internationally recognised methodology that measures healthcare quality. The step‑wise indicator shows
                                a facility's progress in implementing safety and quality standards.
                            </p>
                            <ul className="space-y-4">
                                {safeCareLevels.map((item) => (
                                    <li key={item.level} className="flex items-start gap-3">
                                        <CheckCircle2 size={20} className="text-afya-deep mt-0.5 shrink-0" />
                                        <span className="text-gray-800">
                                            <strong className="font-semibold">Level {item.level}:</strong> {item.description}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-md md:w-1/2">
                            <h3 className="mb-6 text-center font-bold tracking-wider text-gray-500 uppercase">Visual Indicator</h3>
                            <div className="space-y-5">
                                {[5, 4, 3, 2, 1].map((level) => (
                                    <div key={level} className="flex items-center justify-between rounded-lg p-2 transition-colors hover:bg-gray-50">
                                        <span className="font-medium text-gray-700">Level {level}</span>
                                        <AnimatedSafeCareLevel targetLevel={level} size="md" />
                                    </div>
                                ))}
                            </div>
                            <p className="mt-6 text-center text-xs text-gray-500">Higher levels mean better safety & quality</p>
                        </div>
                    </div>
                </section>

                {/* JCI Section */}
                <section className="flex flex-col items-center gap-10 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:flex-row md:p-12">
                    <div className="flex justify-center md:w-1/3">
                        <div className="flex h-36 w-36 items-center justify-center rounded-full border-4 border-white bg-yellow-50 shadow-xl ring-1 ring-yellow-200">
                            <Award size={64} className="text-yellow-500" />
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            <h2 className="text-3xl font-bold text-gray-900">JCI Accreditation</h2>
                            <JCIAccreditedBadge size="md" />
                        </div>
                        <p className="text-lg leading-relaxed text-gray-700">
                            Joint Commission International (JCI) accreditation is considered the gold standard in global healthcare. Facilities that
                            achieve this accreditation have undergone a rigorous evaluation process and demonstrate a commitment to continuous
                            improvement in patient safety and quality of care. When you see this badge on AfyaMap, you can be confident the facility
                            meets the highest international standards.
                        </p>
                    </div>
                </section>

                {/* PharmAccess Footer */}
                <div className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                    <h2 className="mb-3 text-2xl font-bold text-gray-900">Administered by PharmAccess</h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        AfyaMap is maintained and administered by PharmAccess, an international non‑profit organisation dedicated to improving access
                        to quality healthcare in Africa.
                    </p>
                    <div className="text-afya-deep mt-6 inline-flex items-center gap-2 text-sm">
                        <Heart size={16} />
                        <span>Making healthcare better, together</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

About.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;
