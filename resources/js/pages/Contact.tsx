import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, MessageSquare, Clock, Building2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useForm } from '@inertiajs/react';
import { Layout } from '../components/layout/Layout';
import { FloatingParticles } from '../pages/Home/FloatingParticles';

export default function Contact() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    inquiry_type: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  const staggerChildren = {
    animate: { transition: { staggerChildren: 0.1 } }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    post('/contact', {
      onSuccess: () => {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      },
      onError: (errors) => {
        setSubmitError('Please fix the errors below and try again.');
      },
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-200">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
          <p className="text-gray-600">
            Thank you for reaching out. Our team will get back to you within 48 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Hero Section */}
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
              We're here to help.
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
            <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-afya-light rounded-xl flex items-center justify-center text-afya-deep mb-5">
                <Building2 size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Our Office</h3>
              <p className="text-gray-600">
                PharmAccess Foundation<br />
                Dar es Salaam, Tanzania
              </p>
            </motion.div>

            <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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

            <motion.div variants={fadeInUp} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-afya-light rounded-xl flex items-center justify-center text-afya-deep mb-5">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@afyamap.co.tz</p>
              <p className="text-sm text-gray-500 mt-1">We'll reply within 48 hours</p>
            </motion.div>
          </motion.div>

          {/* Right column – Contact Form */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h2>
              <p className="text-gray-500 mb-6">We'll get back to you as soon as possible.</p>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-start gap-2">
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
                <p className="text-sm text-blue-800 flex items-start gap-2">
                  <MessageSquare size={18} className="shrink-0 mt-0.5" />
                  <span>
                    <strong>For facility owners:</strong> To update your facility's information or quality ratings,
                    please select <strong>"Update Facility Info"</strong> as the inquiry type.
                  </span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                      className={`w-full rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} bg-gray-50/50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all hover:bg-white focus:border-afya-deep focus:bg-white focus:outline-none focus:ring-2 focus:ring-afya-deep`}
                      placeholder="John Doe"
                      required
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={data.email}
                      onChange={(e) => setData('email', e.target.value)}
                      className={`w-full rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-200'} bg-gray-50/50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all hover:bg-white focus:border-afya-deep focus:bg-white focus:outline-none focus:ring-2 focus:ring-afya-deep`}
                      placeholder="john@example.com"
                      required
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.inquiry_type}
                    onChange={(e) => setData('inquiry_type', e.target.value)}
                    className={`w-full cursor-pointer appearance-none rounded-xl border ${errors.inquiry_type ? 'border-red-500' : 'border-gray-200'} bg-gray-50/50 px-4 py-3 pr-8 text-gray-900 transition-all hover:bg-white focus:border-afya-deep focus:bg-white focus:outline-none focus:ring-2 focus:ring-afya-deep`}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Report an Issue">Report an Issue</option>
                    <option value="Suggest a Facility">Suggest a Facility</option>
                    <option value="Update Facility Info">Update Facility Info (Admin)</option>
                  </select>
                  {errors.inquiry_type && (
                    <p className="text-red-500 text-sm mt-1">{errors.inquiry_type}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    value={data.message}
                    onChange={(e) => setData('message', e.target.value)}
                    className={`w-full resize-none rounded-xl border ${errors.message ? 'border-red-500' : 'border-gray-200'} bg-gray-50/50 px-4 py-3 text-gray-900 placeholder-gray-400 transition-all hover:bg-white focus:border-afya-deep focus:bg-white focus:outline-none focus:ring-2 focus:ring-afya-deep`}
                    placeholder="How can we help you?"
                    required
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="bg-gradient-to-r from-afya-deep to-afya-mid text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} /> Send Message
                    </>
                  )}
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