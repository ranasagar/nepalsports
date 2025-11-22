import React from 'react';

interface MatchCardProps {
    team1Name: string;
    team1Flag?: string;
    team1Score: string;
    team2Name: string;
    team2Flag?: string;
    team2Score: string;
    status: string;
    target?: string;
}

export const MatchCard: React.FC<MatchCardProps> = ({
    team1Name,
    team1Flag,
    team1Score,
    team2Name,
    team2Flag,
    team2Score,
    status,
    target,
}) => {
    const isLive = status === 'LIVE' || status === 'Live';

    return (
        <div className="bg-white rounded-[20px] shadow-sm hover:shadow-md hover:border-[#003087] transition-all p-4 border border-gray-100 w-full max-w-md cursor-pointer group">
            {/* Header: Status & League */}
            <div className="flex justify-between items-center mb-4">
                <div className={`px-3 py-1 rounded-full ${isLive ? 'bg-red-50' : 'bg-gray-100'}`}>
                    <div className="flex items-center gap-1">
                        {isLive && <div className="w-2 h-2 rounded-full bg-[#DC143C] animate-pulse" />}
                        <span className={`${isLive ? 'text-[#DC143C]' : 'text-gray-500'} text-xs font-bold uppercase`}>
                            {status}
                        </span>
                    </div>
                </div>
                <span className="text-gray-400 text-xs font-medium">T20 League</span>
            </div>

            {/* Main Content: Horizontal Layout */}
            <div className="flex justify-between items-center px-2">
                {/* Team 1 */}
                <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center group-hover:border-blue-100 transition-colors">
                        {team1Flag ? (
                            <img src={team1Flag} alt={team1Name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400 font-bold text-lg">{team1Name[0]}</span>
                        )}
                    </div>
                    <span className="font-bold text-gray-900 text-sm text-center truncate w-full">{team1Name}</span>
                </div>

                {/* Scores */}
                <div className="flex flex-col items-center flex-[1.5]">
                    <span className="text-2xl font-bold text-[#003087]">{team1Score}</span>
                    <span className="text-xs text-gray-400 font-medium my-1">vs</span>
                    <span className="text-xl font-bold text-gray-600">{team2Score}</span>
                </div>

                {/* Team 2 */}
                <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center group-hover:border-blue-100 transition-colors">
                        {team2Flag ? (
                            <img src={team2Flag} alt={team2Name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400 font-bold text-lg">{team2Name[0]}</span>
                        )}
                    </div>
                    <span className="font-bold text-gray-900 text-sm text-center truncate w-full">{team2Name}</span>
                </div>
            </div>

            {/* Footer: Target/Result */}
            {target && (
                <div className="mt-4 pt-3 border-t border-gray-50 flex justify-center">
                    <span className="text-[#003087] text-xs font-medium text-center bg-blue-50 px-3 py-1 rounded-full">
                        {target}
                    </span>
                </div>
            )}
        </div>
    );
};
