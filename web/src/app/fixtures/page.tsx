import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function FixturesPage() {
    const supabase = await createClient();

    // Fetch all upcoming matches
    const { data: matches } = await supabase
        .from('matches')
        .select('*')
        .eq('status', 'Upcoming')
        .order('match_time', { ascending: true });

    // Group matches by date
    const groupedMatches: { [key: string]: any[] } = {};
    matches?.forEach((match: any) => {
        const date = new Date(match.match_time).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
        if (!groupedMatches[date]) {
            groupedMatches[date] = [];
        }
        groupedMatches[date].push(match);
    });

    return (
        <div className="px-4 pt-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Calendar className="text-[#003087]" /> Match Calendar
            </h1>

            {Object.keys(groupedMatches).length === 0 ? (
                <div className="text-center py-10 text-gray-500">No upcoming matches found.</div>
            ) : (
                Object.entries(groupedMatches).map(([date, dateMatches]) => (
                    <div key={date} className="mb-8">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 sticky top-[72px] bg-[#F8FBFF] py-2 z-10">
                            {date}
                        </h2>
                        <div className="space-y-3">
                            {dateMatches.map((match: any) => (
                                <Link href={`/match/${match.id}`} key={match.id} className="block bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[10px] font-bold text-[#003087] bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                                            {match.sport}
                                        </span>
                                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                                            <Clock size={12} />
                                            <span>{new Date(match.match_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 w-5/12">
                                            <Image src={match.home_flag || "https://via.placeholder.com/40"} width={32} height={32} alt={match.home_team} className="rounded-full object-cover w-8 h-8" />
                                            <span className="font-bold text-gray-900 text-sm line-clamp-2">{match.home_team}</span>
                                        </div>

                                        <div className="text-xs font-bold text-gray-400">VS</div>

                                        <div className="flex items-center gap-3 w-5/12 justify-end text-right">
                                            <span className="font-bold text-gray-900 text-sm line-clamp-2">{match.away_team}</span>
                                            <Image src={match.away_flag || "https://via.placeholder.com/40"} width={32} height={32} alt={match.away_team} className="rounded-full object-cover w-8 h-8" />
                                        </div>
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-1 text-xs text-gray-400">
                                        <MapPin size={12} />
                                        <span className="line-clamp-1">{match.venue} • {match.tournament}</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
