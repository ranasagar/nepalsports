import React from 'react';
import SportHeader from '@/components/sports/SportHeader';
import ScoreTicker from '@/components/sports/ScoreTicker';
import NewsCard from '@/components/sports/NewsCard';
import StandingsWidget from '@/components/sports/StandingsWidget';
import { createClient } from '@/utils/supabase/server';

export default async function CricketPage() {
    const supabase = await createClient();

    const { data: matchesData } = await supabase
        .from('matches')
        .select('*')
        .eq('sport', 'cricket')
        .order('match_time', { ascending: false })
        .limit(10);

    const matches = matchesData as any[];

    const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .eq('sport', 'cricket')
        .order('created_at', { ascending: false })
        .limit(5);

    const news = newsData as any[];

    const mockStandings = [
        { rank: 1, team: 'Kathmandu Kings XI', played: 5, won: 4, draw: 0, lost: 1, points: 8, logo_url: 'https://via.placeholder.com/50' },
        { rank: 2, team: 'Lalitpur Patriots', played: 5, won: 3, draw: 0, lost: 2, points: 6, logo_url: 'https://via.placeholder.com/50' },
        { rank: 3, team: 'Bhairahawa Gladiators', played: 5, won: 3, draw: 0, lost: 2, points: 6, logo_url: 'https://via.placeholder.com/50' },
        { rank: 4, team: 'Pokhara Rhinos', played: 5, won: 2, draw: 0, lost: 3, points: 4, logo_url: 'https://via.placeholder.com/50' },
        { rank: 5, team: 'Chitwan Tigers', played: 5, won: 2, draw: 0, lost: 3, points: 4, logo_url: 'https://via.placeholder.com/50' },
        { rank: 6, team: 'Biratnagar Warriors', played: 5, won: 1, draw: 0, lost: 4, points: 2, logo_url: 'https://via.placeholder.com/50' },
    ];

    const links = [
        { label: 'Home', href: '/cricket' },
        { label: 'Scores', href: '/cricket/scores' },
        { label: 'Series', href: '/cricket/series' },
        { label: 'Teams', href: '/cricket/teams' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <SportHeader sport="Cricket" links={links} />
            <ScoreTicker matches={matches || []} />

            <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                    <h2 className="font-black text-xl text-gray-900 uppercase tracking-wide border-l-4 border-[#003087] pl-3">Top Stories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {news?.map((item, index) => (
                            <NewsCard key={item.id} news={item} featured={index === 0} />
                        ))}
                        {(!news || news.length === 0) && (
                            <div className="col-span-2 text-center py-10 text-gray-500">No news available.</div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <StandingsWidget title="Everest Premier League" standings={mockStandings} />
                    <div className="bg-gray-200 h-64 rounded-2xl flex items-center justify-center text-gray-400 font-bold text-sm uppercase tracking-widest">
                        Advertisement
                    </div>
                </div>
            </div>
        </div>
    );
}
