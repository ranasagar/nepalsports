import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Match {
    id: string;
    home_team: string;
    away_team: string;
    home_score: number;
    away_score: number;
    status: string;
    home_flag?: string;
    away_flag?: string;
}

interface ScoreTickerProps {
    matches: Match[];
}

export default function ScoreTicker({ matches }: ScoreTickerProps) {
    if (!matches || matches.length === 0) return null;

    return (
        <div className="bg-white border-b border-gray-100 py-3 overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-3 px-4 min-w-max">
                {matches.map((match) => (
                    <div key={match.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-2 pr-4 border border-gray-100 min-w-[200px]">
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img src={match.home_flag || "https://via.placeholder.com/20"} alt={match.home_team} className="w-5 h-5 rounded-full object-cover" />
                                    <span className="text-xs font-bold text-gray-900 truncate max-w-[80px]">{match.home_team}</span>
                                </div>
                                <span className="text-xs font-bold text-gray-900">{match.home_score}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img src={match.away_flag || "https://via.placeholder.com/20"} alt={match.away_team} className="w-5 h-5 rounded-full object-cover" />
                                    <span className="text-xs font-bold text-gray-900 truncate max-w-[80px]">{match.away_team}</span>
                                </div>
                                <span className="text-xs font-bold text-gray-900">{match.away_score}</span>
                            </div>
                        </div>
                        <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
                        <div className="text-[10px] font-bold text-gray-500 uppercase w-12 text-center">
                            {match.status === 'Live' ? <span className="text-red-500 animate-pulse">Live</span> : match.status}
                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-center w-10 h-10 bg-gray-50 rounded-full border border-gray-100 shrink-0">
                    <ChevronRight size={16} className="text-gray-400" />
                </div>
            </div>
        </div>
    );
}
