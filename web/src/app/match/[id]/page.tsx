import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { ArrowLeft, Calendar, MapPin, Share2, Trophy, Users, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MatchCommentary from '@/components/MatchCommentary';

export default async function MatchDetailsPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { id } = params;

    const { data: matchData, error } = await supabase
        .from('matches')
        .select('*')
        .eq('id', id)
        .single();

    const match = matchData as any;

    if (error || !match) {
        notFound();
    }

    // Parse details or use defaults if empty
    // Parse details or use defaults if empty
    const details: any = match.details || {};
    const lineups = details?.lineups || { home: [], away: [] };
    const stats = details?.stats || {
        possession: { home: 50, away: 50 },
        shots: { home: 0, away: 0 },
        on_target: { home: 0, away: 0 },
        corners: { home: 0, away: 0 }
    };
    const voting = details?.voting || { home: 33, away: 33, draw: 34 };

    return (
        <div className="min-h-screen bg-[#F8FBFF] pb-20 font-mukta">
            {/* Header */}
            <div className="bg-[#003087] text-white p-4 sticky top-0 z-50 flex items-center justify-between shadow-md">
                <Link href="/" className="p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <span className="font-bold text-lg">Match Details</span>
                <button className="p-2 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors">
                    <Share2 size={20} />
                </button>
            </div>

            <main className="max-w-md mx-auto">
                {/* Score Card */}
                <div className="bg-white p-6 rounded-b-[30px] shadow-sm border-b border-gray-100 mb-6">
                    <div className="text-center text-gray-500 text-xs font-bold uppercase mb-4 flex items-center justify-center gap-2">
                        <Trophy size={12} />
                        {match.tournament} • {match.status}
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <div className="flex flex-col items-center gap-3 w-1/3">
                            <div className="w-16 h-16 p-2 rounded-full border border-gray-100 shadow-sm">
                                <Image src={match.home_flag || "https://via.placeholder.com/64"} width={64} height={64} alt={match.home_team} className="w-full h-full object-contain rounded-full" />
                            </div>
                            <span className="font-bold text-gray-900 text-center leading-tight">{match.home_team}</span>
                        </div>

                        <div className="flex flex-col items-center w-1/3">
                            <div className="text-4xl font-black text-gray-900 mb-1">{match.home_score} - {match.away_score}</div>
                            <div className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-500">
                                {match.status === 'Live' ? <span className="text-red-500 animate-pulse">LIVE</span> : match.status_note || 'FT'}
                            </div>
                        </div>

                        <div className="flex flex-col items-center gap-3 w-1/3">
                            <div className="w-16 h-16 p-2 rounded-full border border-gray-100 shadow-sm">
                                <Image src={match.away_flag || "https://via.placeholder.com/64"} width={64} height={64} alt={match.away_team} className="w-full h-full object-contain rounded-full" />
                            </div>
                            <span className="font-bold text-gray-900 text-center leading-tight">{match.away_team}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-xs text-gray-500 border-t border-gray-50 pt-4">
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(match.match_time).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{new Date(match.match_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{match.venue}</span>
                        </div>
                    </div>
                </div>

                {/* Voting Section */}
                <div className="px-4 mb-6">
                    <h3 className="font-bold text-gray-900 mb-3">Who will win?</h3>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-2 text-xs font-bold text-gray-500">
                            <span>{match.home_team}</span>
                            <span>Draw</span>
                            <span>{match.away_team}</span>
                        </div>
                        <div className="flex h-3 rounded-full overflow-hidden mb-2">
                            <div className="bg-[#003087]" style={{ width: `${voting.home}%` }}></div>
                            <div className="bg-gray-300" style={{ width: `${voting.draw}%` }}></div>
                            <div className="bg-[#DC143C]" style={{ width: `${voting.away}%` }}></div>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-[#003087]">{voting.home}%</span>
                            <span className="text-gray-500">{voting.draw}%</span>
                            <span className="text-[#DC143C]">{voting.away}%</span>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="px-4 mb-6">
                    <h3 className="font-bold text-gray-900 mb-3">Match Stats</h3>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                        <StatRow label="Possession" home={stats.possession?.home} away={stats.possession?.away} suffix="%" />
                        <StatRow label="Shots" home={stats.shots?.home} away={stats.shots?.away} />
                        <StatRow label="On Target" home={stats.on_target?.home} away={stats.on_target?.away} />
                        <StatRow label="Corners" home={stats.corners?.home} away={stats.corners?.away} />
                    </div>
                </div>

                {/* Commentary Section */}
                <div className="px-4 mb-6">
                    <MatchCommentary commentary={details?.commentary || []} />
                </div>

                {/* Lineups Section (Simple List for now) */}
                <div className="px-4 mb-6">
                    <h3 className="font-bold text-gray-900 mb-3">Lineups</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-[#003087] text-sm mb-3 border-b border-gray-50 pb-2">{match.home_team}</h4>
                            <ul className="space-y-2">
                                {lineups.home?.map((player: any, i: number) => (
                                    <li key={i} className="text-xs font-medium text-gray-700 flex items-center gap-2">
                                        <span className="w-4 text-gray-400">{i + 1}</span>
                                        {player.name}
                                    </li>
                                ))}
                                {(!lineups.home || lineups.home.length === 0) && <li className="text-xs text-gray-400 italic">No lineup available</li>}
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                            <h4 className="font-bold text-[#DC143C] text-sm mb-3 border-b border-gray-50 pb-2">{match.away_team}</h4>
                            <ul className="space-y-2">
                                {lineups.away?.map((player: any, i: number) => (
                                    <li key={i} className="text-xs font-medium text-gray-700 flex items-center gap-2">
                                        <span className="w-4 text-gray-400">{i + 1}</span>
                                        {player.name}
                                    </li>
                                ))}
                                {(!lineups.away || lineups.away.length === 0) && <li className="text-xs text-gray-400 italic">No lineup available</li>}
                            </ul>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

function StatRow({ label, home, away, suffix = '' }: { label: string, home: any, away: any, suffix?: string }) {
    const homeVal = parseInt(home) || 0;
    const awayVal = parseInt(away) || 0;
    const total = homeVal + awayVal || 1;
    const homePct = (homeVal / total) * 100;
    const awayPct = (awayVal / total) * 100;

    return (
        <div>
            <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                <span>{home}{suffix}</span>
                <span className="text-gray-400 font-medium">{label}</span>
                <span>{away}{suffix}</span>
            </div>
            <div className="flex h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="bg-[#003087]" style={{ width: `${homePct}%` }}></div>
                <div className="bg-[#DC143C]" style={{ width: `${awayPct}%` }}></div>
            </div>
        </div>
    );
}
