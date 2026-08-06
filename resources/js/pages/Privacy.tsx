// resources/js/pages/Privacy.tsx

import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, Mail, FileText, Users, Cookie } from 'lucide-react';

export default function Privacy() {
    const sections = [
        {
            icon: Shield,
            title: 'Information We Collect',
            content: [
                'Personal information you provide (name, email, phone number, location)',
                'Healthcare facility search history and preferences',
                'Device and usage information (IP address, browser type, device type)',
                'Location data (with your consent)',
                'Reviews and ratings you submit'
            ]
        },
        {
            icon: Database,
            title: 'How We Use Your Information',
            content: [
                'To help you find and compare healthcare facilities',
                'To improve our search and recommendation algorithms',
                'To send you relevant healthcare information and updates',
                'To analyze usage patterns and improve user experience',
                'To ensure the accuracy and reliability of facility data'
            ]
        },
        {
            icon: Lock,
            title: 'Data Security',
            content: [
                'We implement industry-standard encryption (SSL/TLS)',
                'Regular security audits and vulnerability assessments',
                'Access controls and authentication protocols',
                'Secure data storage and transmission practices',
                'Compliance with data protection regulations'
            ]
        },
        {
            icon: Users,
            title: 'Information Sharing',
            content: [
                'We do not sell your personal information to third parties',
                'We share information with healthcare facilities only with your consent',
                'We may share anonymized data for research and analytics',
                'We comply with legal requirements and law enforcement requests'
            ]
        },
        {
            icon: Cookie,
            title: 'Cookies and Tracking',
            content: [
                'We use cookies to improve user experience and analyze usage',
                'Essential cookies for basic functionality',
                'Analytics cookies to understand how users interact with our platform',
                'You can manage cookie preferences in your browser settings'
            ]
        },
        {
            icon: Mail,
            title: 'Your Rights',
            content: [
                'Access your personal data at any time',
                'Request correction or deletion of your data',
                'Opt-out of marketing communications',
                'Request data portability',
                'Withdraw consent at any time'
            ]
        },
        {
            icon: Eye,
            title: 'Data Retention',
            content: [
                'We retain your data only as long as necessary',
                'Account data is kept until you request deletion',
                'Usage data is anonymized after 12 months',
                'Review and rating data may be kept for historical accuracy'
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
                        alt="Privacy background"
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
                        <Shield className="h-3 w-3 text-blue-300 sm:h-3.5 sm:w-3.5" />
                        <span className="text-xs font-medium sm:text-sm">Your Privacy Matters</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-6 px-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
                    >
                        Privacy <span className="text-afya-light">Policy</span>
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
                        AfyaMap is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, 
                        and safeguard your information when you use our platform. Please read this policy carefully. By using AfyaMap, 
                        you agree to the collection and use of information in accordance with this policy.
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

                {/* Contact Section */}
                {/* <section className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">Contact Us</h2>
                    <p className="mb-4 text-gray-700">
                        If you have any questions about this Privacy Policy, please contact us:
                    </p>
                    <div className="space-y-2 text-gray-600">
                        <p><strong>Email:</strong> privacy@afyamap.com</p>
                        <p><strong>Phone:</strong> +255 123 456 789</p>
                        <p><strong>Address:</strong> Dar es Salaam, Tanzania</p>
                    </div>
                </section> */}
            </div>
        </div>
    );
}