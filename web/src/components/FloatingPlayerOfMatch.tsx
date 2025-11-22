import React from 'react';
import { Trophy } from 'lucide-react';

interface PlayerOfMatchProps {
    playerName: string;
    teamName: string;
    stats: string;
    imageUrl?: string;
}

export const FloatingPlayerOfMatch: React.FC<PlayerOfMatchProps> = ({
    playerName,
    teamName,
    stats,
    imageUrl,
}) => {
    return (
        <div className="fixed bottom-4 left-4 right-4 bg-white rounded-3xl shadow-2xl p-4 border border-gray-100 z-50 animate-slide-up">
            <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#0052D4]">
                    {imageUrl ? (
                        <img src={imageUrl} alt={playerName} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Trophy size={20} className="text-[#0052D4]" />
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900">{playerName}</h3>
                        <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-yellow-200">
                            POM
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">{teamName}</p>
                    <p className="text-sm font-bold text-[#0052D4] mt-0.5">{stats}</p>
                </div>
            </div>
        </div>
    );
};
