import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { MapPin, Heart, Menu, X } from 'lucide-react';
export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { url } = usePage();
  const isHome = url === '/';
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-8 h-8 bg-afya-deep rounded-lg text-white">
                <MapPin size={20} className="absolute" />
                <Heart size={10} className="absolute mt-[-2px] fill-white" />
              </div>
              <span className="text-2xl font-bold text-afya-text tracking-tight">
                Afya<span className="text-afya-mid">Map</span>
              </span>
            </div>
            {isHome && (
              <span className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                Welcome to safer, smarter healthcare
              </span>
            )}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-afya-deep ${
                  url === link.path
                    ? 'text-afya-deep border-b-2 border-afya-accent py-1'
                    : 'text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/download"
              className="flex items-center text-sm font-medium text-white bg-afya-deep px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors shadow-sm"
            >
              Get the App
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-afya-deep"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg absolute w-full">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={`text-base font-medium p-2 rounded-lg ${
                  url === link.path ? 'bg-afya-light text-afya-deep' : 'text-gray-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-4 mt-2">
              <Link
                href="/download"
                className="flex items-center justify-center text-base font-medium text-white bg-afya-deep px-4 py-3 rounded-lg hover:bg-opacity-90 transition-colors w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get the App
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};