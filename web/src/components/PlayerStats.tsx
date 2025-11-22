import React from 'react';
import { BarChart2 } from 'lucide-react';

interface PlayerStat {
    label: string;
    value: string | number;
}

interface PlayerStatsProps {
    stats: PlayerStat[];
    title?: string;
}

export default function PlayerStats({ stats, title = "Player Stats" }: PlayerStatsProps) {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
                <BarChart2 size={18} className="text-[#003087]" />
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">{title}</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{stat.label}</div>
                        <div className="text-xl font-black text-[#003087]">{stat.value}</div>
                    </div>
                ))}
                {stats.length === 0 && (
                    <div className="col-span-2 p-4 text-center text-gray-400 text-sm">
                        No stats available.
                    </div>
                )}
            </div>
        </div>
    );
}
