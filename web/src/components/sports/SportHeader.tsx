"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface SportHeaderProps {
    sport: string; // 'football', 'cricket', 'basketball', 'volleyball'
    links: { label: string; href: string }[];
}

export default function SportHeader({ sport, links }: SportHeaderProps) {
    const pathname = usePathname();

    return (
        <div className="sticky top-14 z-40 bg-white border-b border-gray-100 shadow-sm overflow-x-auto scrollbar-hide">
            <div className="flex items-center px-4 h-12 gap-6 min-w-max">
                <span className="font-black text-lg uppercase tracking-wider text-gray-900 font-mukta border-r border-gray-100 pr-6">
                    {sport}
                </span>
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-bold uppercase tracking-wide transition-colors relative py-3",
                                isActive ? "text-[#003087]" : "text-gray-500 hover:text-gray-800"
                            )}
                        >
                            {link.label}
                            {isActive && (
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#003087] rounded-t-full" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
