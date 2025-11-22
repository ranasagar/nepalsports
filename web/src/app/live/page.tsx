import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Play, Radio, Tv } from 'lucide-react';
import { MatchCard } from '@/components/MatchCard';
import Link from 'next/link';
import Image from 'next/image';

export default async function LivePage() {
    const supabase = await createClient();

    // Fetch live matches
    const { data: liveMatches } = await supabase
        .from('matches')
        .select('*')
        .eq('status', 'Live');

    // Fetch active radio stations
    const { data: radioStations } = await supabase
        .from('radio_stations')
        .select('*')
        .eq('is_active', true)
        .limit(3);

    return (
        <div className="px-4 pt-6 pb-24">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Tv className="text-[#003087]" /> Live Center
            </h1>

            {/* Live Matches */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        Live Matches
                    </h2>
                </div>
                <div className="space-y-4">
                    {liveMatches?.map((match: any) => (
                        <Link href={`/match/${match.id}`} key={match.id} className="block">
                            <MatchCard
                                team1Name={match.home_team}
                                team1Flag={match.home_flag}
                                team1Score={match.home_score.toString()}
                                team2Name={match.away_team}
                                team2Flag={match.away_flag}
                                team2Score={match.away_score.toString()}
                                status={match.status}
                                target={match.status_note}
                            />
                        </Link>
                    ))}
                    {(!liveMatches || liveMatches.length === 0) && (
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 text-center">
                            <p className="text-gray-500 text-sm">No live matches at the moment.</p>
                            <Link href="/fixtures" className="text-[#003087] font-bold text-xs mt-2 inline-block">Check Fixtures</Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Live Radio */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <Radio size={20} className="text-orange-500" /> Live Radio
                    </h2>
                    <Link href="/radio" className="text-xs font-bold text-[#003087]">Listen All</Link>
                </div>
                <div className="grid grid-cols-1 gap-3">
                    {radioStations?.map((station: any) => (
                        <Link href="/radio" key={station.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center relative overflow-hidden">
                                {station.logo_url ? (
                                    <Image src={station.logo_url} alt={station.name} fill className="object-cover" />
                                ) : (
                                    <Radio size={20} className="text-orange-500" />
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900">{station.name}</h3>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> On Air • {station.location}
                                </p>
                            </div>
                            <div className="w-8 h-8 bg-[#003087] rounded-full flex items-center justify-center text-white">
                                <Play size={12} fill="white" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Live TV Placeholder */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <Tv size={20} className="text-blue-500" /> Live TV Channels
                    </h2>
                </div>
                <div className="bg-gradient-to-r from-[#003087] to-blue-600 rounded-2xl p-6 text-white text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-bold text-xl mb-2">Premium Live Streaming</h3>
                        <p className="text-blue-100 text-sm mb-4">Watch NTV Plus, Action Sports, and more directly on NepalSports Hub.</p>
                        <button className="bg-white text-[#003087] px-6 py-2 rounded-full font-bold text-sm">Coming Soon</button>
                    </div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                </div>
            </section>
        </div>
    );
}
