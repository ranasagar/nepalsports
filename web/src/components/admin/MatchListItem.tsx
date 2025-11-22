'use client';

import React, { useState } from 'react';
import { Trophy, Calendar, Edit2, Database, Check, Loader2 } from 'lucide-react';
import { generateMatchData } from '@/app/actions/matches';

export default function MatchListItem({ match }: { match: any }) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleGenData = async () => {
        setLoading(true);
        try {
            const result = await generateMatchData(match.id);
            if (result.success) {
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
            }
        } catch (error) {
            console.error('Failed to generate data', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all hover:-translate-y-0.5 group">
            {/* Match Info */}
            <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5
                        ${match.status === 'Live' ? 'bg-[#DC143C]/10 text-[#DC143C] border border-[#DC143C]/20' :
                            match.status === 'Upcoming' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                'bg-gray-100 text-gray-600 border border-gray-200'}`}>
                        {match.status === 'Live' && <span className="w-1.5 h-1.5 rounded-full bg-[#DC143C] animate-pulse" />}
                        {match.status}
                    </span>
                    <span className="text-gray-400 text-xs font-bold flex items-center gap-1 uppercase tracking-wide">
                        <Trophy size={12} /> {match.type}
                    </span>
                    <span className="text-gray-400 text-xs font-bold flex items-center gap-1 uppercase tracking-wide">
                        <Calendar size={12} /> {new Date(match.date).toLocaleDateString()}
                    </span>
                </div>

                <div className="flex items-center justify-between md:justify-start md:gap-12 w-full">
                    <div className="flex items-center gap-4 flex-1 md:flex-none md:w-48 justify-end text-right">
                        <span className="font-bold text-gray-900 text-lg font-mukta">{match.home_team}</span>
                        <div className="w-10 h-10 bg-gray-100 rounded-full border border-gray-100 shrink-0 overflow-hidden">
                            {match.home_flag && <img src={match.home_flag} alt={match.home_team} className="w-full h-full object-cover" />}
                        </div>
                    </div>

                    <div className="flex flex-col items-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-100 min-w-[100px]">
                        <div className="text-2xl font-bold text-[#003087] font-mukta tracking-tight">
                            {match.home_score || '0'} - {match.away_score || '0'}
                        </div>
                        <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Score</div>
                    </div>

                    <div className="flex items-center gap-4 flex-1 md:flex-none md:w-48 text-left">
                        <div className="w-10 h-10 bg-gray-100 rounded-full border border-gray-100 shrink-0 overflow-hidden">
                            {match.away_flag && <img src={match.away_flag} alt={match.away_team} className="w-full h-full object-cover" />}
                        </div>
                        <span className="font-bold text-gray-900 text-lg font-mukta">{match.away_team}</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-5 py-2.5 bg-[#003087] text-white rounded-xl font-bold text-sm hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10">
                    <Edit2 size={16} />
                    Update
                </button>
                <button
                    onClick={handleGenData}
                    disabled={loading || success}
                    className={`flex-1 md:flex-none px-4 py-2.5 border rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2
                        ${success
                            ? 'bg-green-50 text-green-600 border-green-200'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                >
                    {loading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : success ? (
                        <>
                            <Check size={16} />
                            Done
                        </>
                    ) : (
                        <>
                            <Database size={16} />
                            Gen Data
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
