import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Users, Trophy, MapPin, Calendar } from 'lucide-react';

export default async function TeamPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { id } = params;

    // Fetch Team Details
    const { data: teamData } = await supabase
        .from('teams')
        .select('*')
        .eq('id', id)
        .single();

    const team = teamData as any;

    if (!team) return notFound();

    // Fetch Squad
    const { data: players } = await supabase
        .from('players')
        .select('*')
        .eq('team_id', id);

    // Fetch Coach
    const { data: coachData } = await supabase
        .from('coaches')
        .select('*')
        .eq('team_id', id)
        .single();

    const coach = coachData as any;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Header */}
            <div className="bg-[#003087] text-white pt-20 pb-10 px-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 relative z-10">
                    <div className="w-32 h-32 bg-white rounded-full p-2 shadow-lg">
                        <img src={team.logo_url || "https://via.placeholder.com/150"} alt={team.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide mb-2">{team.name}</h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-blue-100 text-sm font-medium">
                            <span className="flex items-center gap-1"><Trophy size={14} /> Est. {team.founded_year}</span>
                            <span className="flex items-center gap-1"><MapPin size={14} /> {team.home_ground}</span>
                            <span className="bg-white/20 px-3 py-0.5 rounded-full text-white uppercase text-xs tracking-wider">{team.sport}</span>
                        </div>
                    </div>
                    <div className="ml-auto mt-4 md:mt-0">
                        <button className="bg-[#DC143C] hover:bg-red-700 text-white px-6 py-2 rounded-full font-bold shadow-lg transition-transform active:scale-95">
                            Join Fan Army
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content: Squad */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Coach */}
                    {coach && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                                <Users className="text-[#003087]" size={20} /> Head Coach
                            </h2>
                            <div className="flex items-center gap-4">
                                <img src={coach.image_url || "https://via.placeholder.com/100"} alt={coach.name} className="w-16 h-16 rounded-full object-cover border-2 border-gray-100" />
                                <div>
                                    <h3 className="font-bold text-gray-900">{coach.name}</h3>
                                    <p className="text-sm text-gray-500">{coach.experience}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Squad List */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                            <Users className="text-[#003087]" size={20} /> Squad
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {players?.map((player: any) => (
                                <div key={player.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer group">
                                    <div className="relative">
                                        <img src={player.image_url || "https://via.placeholder.com/100"} alt={player.name} className="w-12 h-12 rounded-full object-cover border border-gray-100" />
                                        <div className="absolute -bottom-1 -right-1 bg-[#003087] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                            {player.jersey_number}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 text-sm group-hover:text-[#003087] transition-colors">{player.name}</h3>
                                        <p className="text-xs text-gray-500">{player.position}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar: Stats/Fixtures */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                            <Calendar className="text-[#003087]" size={20} /> Upcoming
                        </h2>
                        <div className="text-center py-8 text-gray-400 text-sm">
                            No upcoming matches scheduled.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
