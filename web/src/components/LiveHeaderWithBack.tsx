import React from 'react';
import { ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';

interface LiveHeaderProps {
    title: string;
}

export const LiveHeaderWithBack: React.FC<LiveHeaderProps> = ({ title }) => {
    return (
        <header className="bg-[#0052D4] text-white h-14 fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 shadow-md">
            <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-white/10 transition-colors">
                <ArrowLeft size={24} />
            </Link>

            <h1 className="font-bold text-lg truncate flex-1 text-center mx-4">
                {title}
            </h1>

            <button className="p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors">
                <Share2 size={24} />
            </button>
        </header>
    );
};
