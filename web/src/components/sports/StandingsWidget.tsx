import React from 'react';
import { cn } from '@/lib/utils';

interface TeamStanding {
    rank: number;
    team: string;
    played: number;
    won: number;
    draw: number;
    lost: number;
    points: number;
    logo_url?: string;
}

interface StandingsWidgetProps {
    title: string;
    standings: TeamStanding[];
    className?: string;
}

export default function StandingsWidget({ title, standings, className }: StandingsWidgetProps) {
    return (
        <div className={cn("bg-white rounded-2xl border border-gray-100 overflow-hidden", className)}>
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">{title}</h3>
                <span className="text-xs font-bold text-[#003087] cursor-pointer hover:underline">View All</span>
            </div>
            <div className="p-2">
                <table className="w-full text-xs">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-50">
                            <th className="text-left font-medium py-2 pl-2">#</th>
                            <th className="text-left font-medium py-2">Team</th>
                            <th className="text-center font-medium py-2">P</th>
                            <th className="text-center font-medium py-2">Pts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {standings.map((team) => (
                            <tr key={team.team} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                                <td className="py-3 pl-2 font-bold text-gray-500 w-8">{team.rank}</td>
                                <td className="py-3">
                                    <div className="flex items-center gap-2">
                                        <img src={team.logo_url || "https://via.placeholder.com/20"} alt={team.team} className="w-5 h-5 object-contain" />
                                        <span className="font-bold text-gray-900 truncate max-w-[100px]">{team.team}</span>
                                    </div>
                                </td>
                                <td className="text-center font-medium text-gray-500">{team.played}</td>
                                <td className="text-center font-black text-gray-900">{team.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
