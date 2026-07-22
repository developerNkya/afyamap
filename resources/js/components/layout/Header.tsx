import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import React, { useState } from 'react';

export const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { url } = usePage();
    const isHome = url === '/';

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Facilities', path: '/facilities' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Increased height from h-20 to h-24 and added py-2 for more vertical padding */}
                <div className="flex h-24 items-center justify-between py-2">
                    {/* Logo with navigate image below - aligned left */}
                    <Link href="/" className="flex flex-shrink-0 flex-col items-start">
                        <img
                            src="/images/logo/logo8.png"
                            alt="AfyaMap"
                            className="h-15 w-auto object-contain md:h-14 lg:h-16"
                            style={{
                                maxWidth: '200px',
                                minWidth: '140px',
                            }}
                        />
                        {/* Navigate image below logo - aligned to the same left edge */}
                        <div className="mt-0.5 flex items-center">
                            <img
                                src="/images/logo/navigate.png"
                                alt="Navigate"
                                className="h-auto w-auto object-contain"
                                style={{
                                    maxWidth: '140px',
                                    height: '20px',
                                    position: 'relative',
                                    left: '23px',
                                }}
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden items-center gap-8 md:flex">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`hover:text-afya-deep text-sm font-medium transition-colors ${
                                    url === link.path ? 'text-afya-deep border-afya-accent border-b-2 py-1' : 'text-gray-600'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-4 md:flex">
                        <Link
                            href="/download"
                            className="bg-afya-deep hover:bg-opacity-90 flex items-center rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors"
                        >
                            Get the App
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="hover:text-afya-deep p-2 text-gray-600 md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="absolute w-full border-t border-gray-100 bg-white px-4 py-4 shadow-lg md:hidden">
                    <div className="flex flex-col gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.path}
                                className={`rounded-lg p-2 text-base font-medium ${
                                    url === link.path ? 'bg-afya-light text-afya-deep' : 'text-gray-600'
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="mt-2 border-t border-gray-100 pt-4">
                            <Link
                                href="/download"
                                className="bg-afya-deep hover:bg-opacity-90 flex w-full items-center justify-center rounded-lg px-4 py-3 text-base font-medium text-white transition-colors"
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
