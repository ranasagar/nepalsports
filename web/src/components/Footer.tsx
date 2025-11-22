import React from 'react';
import Link from 'next/link';
import { Home as HomeIcon, Compass, Calendar, BarChart2, User } from "lucide-react";

export default function Footer() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-4 flex justify-between items-center z-50 rounded-t-[30px] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] max-w-md mx-auto w-full">
            <Link href="/" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#003087] transition-colors">
                <HomeIcon size={24} />
                <span className="text-[10px] font-bold">Home</span>
            </Link>
            <Link href="/explore" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#003087] transition-colors">
                <Compass size={24} />
                <span className="text-[10px] font-bold">Explore</span>
            </Link>
            <Link href="/fixtures" className="w-12 h-12 bg-[#003087] rounded-full -mt-8 flex items-center justify-center shadow-lg shadow-blue-500/30 border-4 border-white">
                <Calendar size={20} color="white" />
            </Link>
            <Link href="/standings" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#003087] transition-colors">
                <BarChart2 size={24} />
                <span className="text-[10px] font-bold">Standings</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-[#003087] transition-colors">
                <User size={24} />
                <span className="text-[10px] font-bold">Profile</span>
            </Link>
        </nav>
    );
}
