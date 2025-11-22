import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Shirt, Activity, Award } from 'lucide-react';

export default async function PlayerPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { id } = params;

    const { data: playerData } = await supabase
        .from('players')
        .select('*, teams(*)')
        .eq('id', id)
        .single();

    const player = playerData as any;

    if (!player) return notFound();

    const stats = player.stats || {};

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-[#003087] to-[#001f5c] text-white pt-20 pb-16 px-4 relative overflow-hidden">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-40 h-40 rounded-full p-1 bg-white/20 backdrop-blur-sm">
                        <img src={player.image_url || "https://via.placeholder.com/200"} alt={player.name} className="w-full h-full rounded-full object-cover border-4 border-white" />
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <h1 className="text-4xl font-black uppercase tracking-wide">{player.name}</h1>
                            <span className="bg-white/20 px-3 py-1 rounded-lg text-xl font-bold font-mono">#{player.jersey_number}</span>
                        </div>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-blue-200 text-lg font-medium mb-4">
                            <span>{player.position}</span>
                            <span>•</span>
                            <span>{player.nationality}</span>
                        </div>
                        {player.teams && (
                            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                                <img src={player.teams.logo_url} alt={player.teams.name} className="w-6 h-6 object-contain" />
                                <span className="font-bold text-white text-sm">{player.teams.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Appearances</div>
                    <div className="text-3xl font-black text-[#003087]">{stats.appearances || 0}</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                        {player.position === 'Goalkeeper' ? 'Clean Sheets' : (player.position === 'Bowler' ? 'Wickets' : 'Goals')}
                    </div>
                    <div className="text-3xl font-black text-[#003087]">
                        {player.position === 'Goalkeeper' ? (stats.clean_sheets || 0) : (player.position === 'Bowler' ? (stats.wickets || 0) : (stats.goals || 0))}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">
                        {player.position === 'Goalkeeper' ? 'Saves' : (player.position === 'Bowler' ? 'Economy' : 'Assists')}
                    </div>
                    <div className="text-3xl font-black text-[#003087]">
                        {player.position === 'Goalkeeper' ? (stats.saves || 0) : (player.position === 'Bowler' ? (stats.economy || 0) : (stats.assists || 0))}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                            <Activity className="text-[#003087]" size={20} /> Bio
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {player.bio || "No biography available for this player."}
                        </p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                            <Award className="text-[#003087]" size={20} /> Achievements
                        </h2>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-1.5 shrink-0"></div>
                                <span>National Team Debut (2019)</span>
                            </li>
                            <li className="flex items-start gap-3 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0"></div>
                                <span>A-Division League Winner (2022)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
