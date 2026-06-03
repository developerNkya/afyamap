import React from 'react';
import { Link } from '@inertiajs/react';
import {
  MapPin,
  Heart,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone } from
'lucide-react';
export const Footer: React.FC = () => {
  return (
    <footer className="bg-afya-text text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative flex items-center justify-center w-8 h-8 bg-white rounded-lg text-afya-text">
                <MapPin size={20} className="absolute" />
                <Heart
                  size={10}
                  className="absolute mt-[-2px] fill-afya-text" />
                
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Afya<span className="text-afya-mid">Map</span>
              </span>
            </Link>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Welcome to safer, smarter healthcare. AfyaMap helps you navigate
              healthcare openly using quality information to make informed
              decisions.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-afya-accent transition-colors">
                
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-afya-accent transition-colors">
                
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-afya-accent transition-colors">
                
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Explore Col */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2 inline-block">
              Explore
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/facilities"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  
                  Browse Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities?filter=jci"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  
                  JCI Accredited Centers
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities?level=5"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  
                  SafeCare Level 5 Facilities
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities?category=maternity"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  
                  Maternity Clinics
                </Link>
              </li>
              <li>
                <Link
                  href="/facilities?category=emergency"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  
                  Emergency Centers
                </Link>
              </li>
            </ul>
          </div>

          {/* About Col */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2 inline-block">
              About
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  
                  About AfyaMap
                </Link>
              </li>
              <li>
                <Link
                  href="/about#safecare"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  
                  Understanding SafeCare Levels
                </Link>
              </li>
              <li>
                <Link
                  href="/about#jci"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  
                  What is JCI Accreditation?
                </Link>
              </li>
              <li>
                <Link
                  href="/about#how-it-works"
                  className="text-gray-300 hover:text-white transition-colors text-sm">
                  
                  How it Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2 inline-block">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-afya-mid shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Dar es Salaam, Tanzania
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-afya-mid shrink-0" />
                <span className="text-gray-300 text-sm">+255 22 123 4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-afya-mid shrink-0" />
                <span className="text-gray-300 text-sm">
                  info@afyamap.co.tz
                </span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/20">
                
                Report a Facility Issue
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} AfyaMap. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Administered by</span>
            <span className="font-bold text-white">PharmAccess</span>
          </div>
        </div>
      </div>
    </footer>);

};