import React from 'react';
import SportHeader from '@/components/sports/SportHeader';
import ScoreTicker from '@/components/sports/ScoreTicker';
import NewsCard from '@/components/sports/NewsCard';
import StandingsWidget from '@/components/sports/StandingsWidget';
import { createClient } from '@/utils/supabase/server';

export default async function FootballPage() {
    const supabase = await createClient();

    // Fetch live/recent matches
    const { data: matches } = await supabase
        .from('matches')
        .select('*')
        .eq('sport', 'football')
        .order('match_time', { ascending: false })
        .limit(10);

    // Fetch news
    const { data: newsData } = await supabase
        .from('news')
        .select('*')
        .eq('sport', 'football')
        .order('created_at', { ascending: false })
        .limit(5);

    const news = newsData as any[];

    // Fetch standings (mock for now)
    const mockStandings = [
        { rank: 1, team: 'Machhindra FC', played: 13, won: 9, draw: 3, lost: 1, points: 30, logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Machhindra_FC_logo.svg/1200px-Machhindra_FC_logo.svg.png' },
        { rank: 2, team: 'Three Star Club', played: 13, won: 7, draw: 4, lost: 2, points: 25, logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Three_Star_Club_logo.svg/1200px-Three_Star_Club_logo.svg.png' },
        { rank: 3, team: 'Tribhuvan Army', played: 13, won: 6, draw: 5, lost: 2, points: 23, logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Tribhuvan_Army_Club_logo.svg/1200px-Tribhuvan_Army_Club_logo.svg.png' },
        { rank: 4, team: 'Nepal Police', played: 13, won: 5, draw: 4, lost: 4, points: 19, logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Nepal_Police_Club_logo.svg/1200px-Nepal_Police_Club_logo.svg.png' },
        { rank: 5, team: 'Sankata Club', played: 13, won: 4, draw: 5, lost: 4, points: 17, logo_url: 'https://via.placeholder.com/50' },
    ];

    const links = [
        { label: 'Home', href: '/football' },
        { label: 'Scores', href: '/football/scores' },
        { label: 'Standings', href: '/football/standings' },
        { label: 'Teams', href: '/football/teams' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <SportHeader sport="Football" links={links} />
            <ScoreTicker matches={matches || []} />

            <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Content (News) */}
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

                {/* Sidebar (Standings, etc) */}
                <div className="lg:col-span-4 space-y-6">
                    <StandingsWidget title="A-Division League" standings={mockStandings} />

                    {/* Ad Placeholder */}
                    <div className="bg-gray-200 h-64 rounded-2xl flex items-center justify-center text-gray-400 font-bold text-sm uppercase tracking-widest">
                        Advertisement
                    </div>
                </div>
            </div>
        </div>
    );
}
