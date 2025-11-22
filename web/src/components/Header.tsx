'use client';

import React from 'react';
import { Bell, Calendar, ChevronDown } from "lucide-react";
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    // Determine title based on path
    let title = "NepalSports";
    if (pathname.includes('/football')) title = "Football";
    else if (pathname.includes('/cricket')) title = "Cricket";
    else if (pathname.includes('/basketball')) title = "Basketball";
    else if (pathname.includes('/volleyball')) title = "Volleyball";

    return (
        <header className="bg-[#003087] text-white pt-4 pb-2 px-4 sticky top-0 z-50 shadow-md max-w-md mx-auto w-full">
            <div className="flex justify-between items-center mb-2">
                <Sidebar />

                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                    <span className="font-bold text-sm">{title}</span>
                    <ChevronDown size={16} />
                </div>

                <div className="flex gap-3">
                    <Link href="/fixtures" className="p-2 bg-white/10 rounded-xl backdrop-blur-sm">
                        <Calendar size={20} />
                    </Link>
                    <button className="p-2 bg-white/10 rounded-xl backdrop-blur-sm relative">
                        <Bell size={20} />
                        <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#003087]"></div>
                    </button>
                </div>
            </div>
        </header>
    );
}
