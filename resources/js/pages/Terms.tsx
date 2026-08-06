// src/pages/Terms.tsx

import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, CheckCircle, Scale, Users, Globe, Clock, Heart, MessageCircle } from 'lucide-react';
import { Layout } from '../components/layout/Layout';

export default function Terms() {
    const sections = [
        {
            icon: Scale,
            title: 'Acceptance of Terms',
            content: [
                'By using AfyaMap, you agree to be bound by these Terms and Conditions.',
                'If you do not agree to these terms, please do not use our platform.',
                'We reserve the right to update these terms at any time.'
            ]
        },
        {
            icon: Users,
            title: 'User Accounts',
            content: [
                'You must be at least 18 years old to create an account.',
                'You are responsible for maintaining the confidentiality of your account credentials.',
                'You agree to provide accurate and complete information when creating your account.',
                'You are responsible for all activities that occur under your account.'
            ]
        },
        {
            icon: Shield,
            title: 'User Conduct',
            content: [
                'You agree to use AfyaMap for lawful purposes only.',
                'You will not submit false or misleading information.',
                'You will not attempt to gain unauthorized access to our systems.',
                'You will not use the platform to harass, abuse, or harm others.',
                'You will respect the privacy and rights of other users.'
            ]
        },
        {
            icon: FileText,
            title: 'Content and Reviews',
            content: [
                'Reviews and ratings must be honest and based on actual experiences.',
                'You grant AfyaMap a license to use, display, and distribute your content.',
                'We reserve the right to remove any content that violates our policies.',
                'Facility information is provided for informational purposes only.'
            ]
        },
        {
            icon: Globe,
            title: 'Third-Party Services',
            content: [
                'AfyaMap may include links to third-party websites and services.',
                'We are not responsible for the content or practices of third-party sites.',
                'Your use of third-party services is at your own risk.',
                'We do not endorse any third-party products or services.'
            ]
        },
        {
            icon: AlertTriangle,
            title: 'Disclaimer of Warranties',
            content: [
                'AfyaMap is provided "as is" without warranties of any kind.',
                'We do not guarantee the accuracy, completeness, or reliability of facility information.',
                'Healthcare decisions should not be based solely on information from our platform.',
                'We are not responsible for any outcomes resulting from your use of the platform.'
            ]
        },
        {
            icon: Heart,
            title: 'Medical Disclaimer',
            content: [
                'AfyaMap does not provide medical advice, diagnosis, or treatment.',
                'The information provided is for informational and educational purposes.',
                'Always consult a qualified healthcare professional for medical advice.',
                'In case of emergency, call your local emergency services immediately.'
            ]
        },
        {
            icon: Clock,
            title: 'Termination',
            content: [
                'We reserve the right to terminate or suspend your account at any time.',
                'You may delete your account at any time.',
                'Upon termination, your access to the platform will be revoked.',
                'Certain provisions will survive termination.'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <section className="bg-afya-deep relative overflow-hidden pt-16 pb-24 text-white sm:pt-20 sm:pb-32">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=2000"
                        alt="Terms background"
                        className="h-full w-full object-cover"
                    />
                    <div className="bg-afya-deep absolute inset-0 mix-blend-multiply"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm sm:mb-6"
                    >
                        <FileText className="h-3 w-3 text-blue-300 sm:h-3.5 sm:w-3.5" />
                        <span className="text-xs font-medium sm:text-sm">Legal Terms</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6 px-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
                    >
                        Terms & <span className="text-afya-light">Conditions</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mx-auto mb-6 max-w-2xl px-4 text-base text-blue-100 sm:mb-8 sm:text-lg md:text-xl"
                    >
                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </motion.p>
                </div>
            </section>

            <div className="mx-auto max-w-4xl space-y-8 px-4 py-16 sm:px-6 lg:px-8">
                {/* Introduction */}
                <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
                    <p className="text-lg leading-relaxed text-gray-700">
                        Welcome to AfyaMap. These Terms and Conditions govern your use of our platform. By using AfyaMap, 
                        you agree to comply with and be bound by these terms. Please read them carefully.
                    </p>
                </section>

                {/* Sections */}
                {sections.map((section, idx) => (
                    <motion.section
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-md md:p-10"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <div className="bg-afya-light text-afya-deep flex h-12 w-12 items-center justify-center rounded-xl">
                                <section.icon size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                        </div>
                        <ul className="space-y-3 pl-16">
                            {section.content.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-700">
                                    <span className="text-afya-deep mt-1.5">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.section>
                ))}

                {/* Footer */}
                <section className="rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm md:p-12">
                    <div className="text-afya-deep mb-4 inline-flex items-center gap-2">
                        <Heart size={20} />
                        <span className="font-semibold">Making healthcare better, together</span>
                    </div>
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} AfyaMap. All rights reserved.
                    </p>
                </section>
            </div>
        </div>
    );
}

Terms.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;