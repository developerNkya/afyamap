import React from 'react';
import { MapPin, Phone, Mail, Send, MessageSquare, Clock, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { FloatingParticles } from '../pages/Home/FloatingParticles'; // adjust path if needed

export default function Contact() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section – identical to About page */}
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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Have a question, want to report an issue, or need to update your facility's information?
              We’re here to help.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column – Contact Info Cards */}
          <motion.div
            className="space-y-6"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-afya-light rounded-xl flex items-center justify-center text-afya-deep mb-5">
                <Building2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Office</h3>
              <p className="text-gray-600">
                PharmAccess Foundation<br />
                Dar es Salaam, Tanzania
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-afya-light rounded-xl flex items-center justify-center text-afya-deep mb-5">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+255 22 123 4567</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                <Clock size={14} />
                <span>Mon-Fri, 8am – 5pm EAT</span>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-afya-light rounded-xl flex items-center justify-center text-afya-deep mb-5">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@afyamap.co.tz</p>
              <p className="text-sm text-gray-500 mt-1">We’ll reply within 48 hours</p>
            </motion.div>
          </motion.div>

          {/* Right column – Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
              <p className="text-gray-500 mb-6">We’ll get back to you as soon as possible.</p>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <MessageSquare size={18} className="shrink-0 mt-0.5" />
                  <span>
                    <strong>For facility owners:</strong> To update your facility's information or quality ratings,
                    please select <strong>"Update Facility Info"</strong> as the inquiry type.
                  </span>
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-afya-deep focus:border-transparent transition-shadow"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-afya-deep focus:border-transparent transition-shadow"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Inquiry Type</label>
                  <select className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-afya-deep focus:border-transparent bg-white">
                    <option>General Inquiry</option>
                    <option>Report an Issue</option>
                    <option>Suggest a Facility</option>
                    <option>Update Facility Info (Admin)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-afya-deep focus:border-transparent"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="button"
                  className="bg-gradient-to-r from-afya-deep to-afya-mid text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 w-full md:w-auto"
                >
                  <Send size={20} /> Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

Contact.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;