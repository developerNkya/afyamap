import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
export const Contact: React.FC = () => {
  return (
    <div className="bg-afya-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-afya-text mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600">
            Have a question, want to report an issue, or need to update your
            facility's information? We're here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-afya-light rounded-xl flex items-center justify-center text-afya-deep mb-6">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Our Office
              </h3>
              <p className="text-gray-600">
                PharmAccess Foundation
                <br />
                Dar es Salaam, Tanzania
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-afya-light rounded-xl flex items-center justify-center text-afya-deep mb-6">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+255 22 123 4567</p>
              <p className="text-sm text-gray-500 mt-1">
                Mon-Fri, 8am - 5pm EAT
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-afya-light rounded-xl flex items-center justify-center text-afya-deep mb-6">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">info@afyamap.co.tz</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Send us a message
              </h2>

              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8">
                <p className="text-sm text-blue-800">
                  <strong>For facility owners:</strong> To update your
                  facility's information or quality ratings, please select
                  "Update Facility Info" as the inquiry type.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-afya-deep focus:border-afya-deep"
                      placeholder="John Doe" />
                    
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-afya-deep focus:border-afya-deep"
                      placeholder="john@example.com" />
                    
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Inquiry Type
                  </label>
                  <select className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-afya-deep focus:border-afya-deep bg-white">
                    <option>General Inquiry</option>
                    <option>Report an Issue</option>
                    <option>Suggest a Facility</option>
                    <option>Update Facility Info (Admin)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-afya-deep focus:border-afya-deep"
                    placeholder="How can we help you?">
                  </textarea>
                </div>

                <button
                  type="button"
                  className="bg-afya-deep text-white px-8 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 w-full md:w-auto">
                  
                  <Send size={20} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

Contact.layout = (page: React.ReactNode) => <Layout>{page}</Layout>;