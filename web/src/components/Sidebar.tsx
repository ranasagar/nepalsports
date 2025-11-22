'use client';

import React, { useState } from 'react';
import { Menu, X, Home, Tv, Trophy, BarChart2, User, Info, Phone, Shield } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { icon: Home, label: 'Home', href: '/' },
        { icon: Tv, label: 'Live TV', href: '/live' },
        { icon: Trophy, label: 'Leagues', href: '/leagues' },
        { icon: BarChart2, label: 'Standings', href: '/standings' },
        { icon: User, label: 'Profile', href: '/profile' },
    ];

    const footerItems = [
        { icon: Info, label: 'About Us', href: '/about' },
        { icon: Phone, label: 'Contact', href: '/contact' },
        { icon: Shield, label: 'Privacy Policy', href: '/privacy' },
    ];

    return (
        <>
            {/* Trigger Button */}
            <button onClick={toggleMenu} className="p-2 bg-white/10 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-colors text-white">
                <Menu size={20} />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm" onClick={toggleMenu} />
            )}

            {/* Sidebar Panel */}
            <div className={`fixed top-0 left-0 h-full w-72 bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-[#003087] font-bold text-xl font-mukta">NepalSports Hub</h2>
                        <button onClick={toggleMenu} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                            <X size={20} className="text-gray-600" />
                        </button>
                    </div>

                    {/* Main Menu */}
                    <nav className="space-y-2 flex-1">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={toggleMenu}
                                    className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-[#003087] text-white shadow-lg shadow-blue-200' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <Icon size={20} />
                                    <span className="font-bold">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Menu */}
                    <div className="border-t border-gray-100 pt-6 space-y-2">
                        {footerItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={toggleMenu}
                                    className="flex items-center gap-4 px-4 py-2 text-gray-400 hover:text-[#003087] transition-colors text-sm font-medium"
                                >
                                    <Icon size={16} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                        <div className="mt-6 text-center text-xs text-gray-300">
                            v1.0.0 • Made with ❤️ in Nepal
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
