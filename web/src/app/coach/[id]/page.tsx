import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { Briefcase, Star, History } from 'lucide-react';

export default async function CoachPage({ params }: { params: { id: string } }) {
    const supabase = await createClient();
    const { id } = params;

    const { data: coachData } = await supabase
        .from('coaches')
        .select('*, teams(*)')
        .eq('id', id)
        .single();

    const coach = coachData as any;

    if (!coach) return notFound();

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-20 pb-16 px-4 relative overflow-hidden">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-40 h-40 rounded-full p-1 bg-white/10 backdrop-blur-sm">
                        <img src={coach.image_url || "https://via.placeholder.com/200"} alt={coach.name} className="w-full h-full rounded-full object-cover border-4 border-white/20" />
                    </div>
                    <div className="text-center md:text-left flex-1">
                        <h1 className="text-4xl font-black uppercase tracking-wide mb-2">{coach.name}</h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-300 text-lg font-medium mb-4">
                            <span>{coach.role}</span>
                            <span>•</span>
                            <span>{coach.nationality}</span>
                        </div>
                        {coach.teams && (
                            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                                <img src={coach.teams.logo_url} alt={coach.teams.name} className="w-6 h-6 object-contain" />
                                <span className="font-bold text-white text-sm">{coach.teams.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                            <Briefcase className="text-[#003087]" size={20} /> Experience
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            {coach.experience || "No experience details available."}
                        </p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                            <History className="text-[#003087]" size={20} /> Career History
                        </h2>
                        <ul className="space-y-4">
                            <li className="relative pl-6 border-l-2 border-gray-200 pb-4 last:pb-0">
                                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-[#003087]"></div>
                                <div className="text-sm font-bold text-gray-900">Head Coach</div>
                                <div className="text-xs text-gray-500 mb-1">2022 - Present</div>
                                <div className="text-sm text-gray-600">{coach.teams?.name || 'Current Team'}</div>
                            </li>
                            <li className="relative pl-6 border-l-2 border-gray-200 pb-4 last:pb-0">
                                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                                <div className="text-sm font-bold text-gray-900">Assistant Coach</div>
                                <div className="text-xs text-gray-500 mb-1">2018 - 2022</div>
                                <div className="text-sm text-gray-600">Previous Club</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
