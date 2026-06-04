import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Facebook, Twitter, Instagram, Linkedin, CheckCircle, AlertCircle, Heart, ChevronRight } from 'lucide-react';
import { router } from '@inertiajs/react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Matching FeaturedFacilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4 mb-6 sm:mb-8"
        >
          <div className="w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-afya-text mb-1 sm:mb-2">
              Contact <span className="text-afya-deep">Us</span>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Have questions? We're here to help
            </p>
          </div>
          
          {/* Desktop Emergency Button */}
          <motion.a
            whileHover={{ x: 5 }}
            href="tel:+255112"
            className="hidden md:flex items-center gap-1 text-red-600 font-medium hover:underline text-sm"
          >
            Emergency: +255 112 <Heart size={14} />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Contact Information Cards - Matching FacilityCard style */}
          <div className="space-y-4">
            {/* Emergency Banner */}
            <div className="bg-gradient-to-r from-red-50 to-amber-50 rounded-xl p-4 border border-red-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart size={16} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-red-800">Emergency Assistance</h3>
                  <p className="text-xs text-red-700">24/7 emergency helpline</p>
                  <a href="tel:+255112" className="inline-block mt-1 text-lg font-bold text-red-800">
                    +255 112
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Phone, title: 'Phone', details: ['+255 123 456 789', '+255 987 654 321'], iconBg: 'bg-blue-500' },
                { icon: Mail, title: 'Email', details: ['info@afyacare.co.tz', 'support@afyacare.co.tz'], iconBg: 'bg-red-500' },
                { icon: MapPin, title: 'Office Location', details: ['Dar es Salaam, Tanzania'], iconBg: 'bg-green-500' },
                { icon: Clock, title: 'Business Hours', details: ['Mon-Fri: 8AM - 6PM', 'Sat: 9AM - 2PM'], iconBg: 'bg-purple-500' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 ${item.iconBg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon size={16} className="text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-afya-text text-sm">{item.title}</h3>
                        {item.details.map((detail, i) => (
                          <p key={i} className="text-xs text-gray-600 mt-0.5">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="group bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-lg transition-all duration-300">
              <h3 className="font-bold text-afya-text text-sm mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: '#', color: 'hover:bg-blue-600' },
                  { icon: Twitter, href: '#', color: 'hover:bg-sky-500' },
                  { icon: Instagram, href: '#', color: 'hover:bg-pink-600' },
                  { icon: Linkedin, href: '#', color: 'hover:bg-blue-700' }
                ].map((social, idx) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      className={`w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-white ${social.color} transition-all duration-300`}
                    >
                      <Icon size={14} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form - Matching FacilityCard styling */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group bg-white rounded-xl shadow-sm border border-gray-100 p-5 sm:p-6 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="font-bold text-afya-text text-lg mb-4">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-afya-deep/20 focus:border-afya-deep transition-all"
                  placeholder="Full Name"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-afya-deep/20 focus:border-afya-deep transition-all"
                  placeholder="Email Address"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-afya-deep/20 focus:border-afya-deep transition-all"
                  placeholder="Phone Number"
                />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-afya-deep/20 focus:border-afya-deep transition-all"
                >
                  <option value="">Select Subject</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Facility Listing">Facility Listing</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2.5 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-afya-deep/20 focus:border-afya-deep transition-all resize-none"
                placeholder="Your message..."
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-afya-deep to-afya-mid text-white font-semibold py-2.5 rounded-lg hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {isSubmitting ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Sending...</>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="text-xs text-green-700">Message sent! We'll get back to you soon.</span>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                  <AlertCircle size={14} className="text-red-600" />
                  <span className="text-xs text-red-700">Failed to send. Please try again.</span>
                </div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Mobile View All Button - Matching FeaturedFacilities */}
        <div className="mt-6 sm:mt-8 md:hidden">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.get('/contact')}
            className="w-full flex items-center justify-center gap-2 text-afya-deep font-medium bg-white border border-gray-200 py-3 rounded-xl hover:bg-gray-50 transition-all text-sm"
          >
            View all contact options
            <ChevronRight size={14} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};