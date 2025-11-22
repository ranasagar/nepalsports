import React from 'react';
import SportHeader from '@/components/sports/SportHeader';
import { createClient } from '@/utils/supabase/server';
import { MatchCard } from '@/components/MatchCard';

export default async function VolleyballScoresPage() {
    const supabase = await createClient();

    const { data: matchesData } = await supabase
        .from('matches')
        .select('*')
        .eq('sport', 'volleyball')
        .order('match_time', { ascending: false });

    const matches = matchesData as any[];

    const links = [
        { label: 'Home', href: '/volleyball' },
        { label: 'Scores', href: '/volleyball/scores' },
        { label: 'Standings', href: '/volleyball/standings' },
        { label: 'Teams', href: '/volleyball/teams' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <SportHeader sport="Volleyball" links={links} />

            <div className="max-w-4xl mx-auto px-4 py-6">
                <h2 className="font-black text-xl text-gray-900 uppercase tracking-wide border-l-4 border-[#003087] pl-3 mb-6">Scores & Fixtures</h2>

                <div className="space-y-4">
                    {matches?.map((match) => (
                        <MatchCard
                            key={match.id}
                            team1Name={match.home_team}
                            team1Flag={match.home_flag}
                            team1Score={match.home_score?.toString() || '0'}
                            team2Name={match.away_team}
                            team2Flag={match.away_flag}
                            team2Score={match.away_score?.toString() || '0'}
                            status={match.status || 'Upcoming'}
                            target={match.status_note}
                        />
                    ))}
                    {(!matches || matches.length === 0) && (
                        <div className="text-center py-10 text-gray-500">No matches found.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
