import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { BarChart2, Filter } from 'lucide-react';
import StandingsWidget from '@/components/sports/StandingsWidget';

export default async function StandingsPage() {
    const supabase = await createClient();

    // Fetch leagues
    const { data: leagues } = await supabase
        .from('leagues')
        .select('*')
        .order('sport', { ascending: true });

    // Fetch all teams to distribute among leagues (mock logic since we lack league_id in teams)
    const { data: teams } = await supabase
        .from('teams')
        .select('*');

    // Helper to generate mock standings for a league
    const generateMockStandings = (sport: string) => {
        const sportTeams = teams?.filter((t: any) => t.sport.toLowerCase() === sport.toLowerCase()) || [];
        return sportTeams.map((team: any, index: number) => ({
            rank: index + 1,
            team: team.name,
            played: Math.floor(Math.random() * 10) + 5,
            won: Math.floor(Math.random() * 5),
            draw: Math.floor(Math.random() * 3),
            lost: Math.floor(Math.random() * 3),
            points: Math.floor(Math.random() * 20),
            logo_url: team.logo_url
        })).sort((a, b) => b.points - a.points).map((item, index) => ({ ...item, rank: index + 1 }));
    };

    return (
        <div className="px-4 pt-6 pb-24">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart2 className="text-[#003087]" /> Standings
            </h1>

            <div className="space-y-8">
                {leagues?.map((league: any) => {
                    const standings = generateMockStandings(league.sport);
                    if (standings.length === 0) return null;

                    return (
                        <div key={league.id}>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-1 h-6 bg-[#003087] rounded-full"></div>
                                <h2 className="font-bold text-lg text-gray-800">{league.name}</h2>
                            </div>
                            <StandingsWidget
                                title={`${league.season || 'Current'} Season`}
                                standings={standings}
                            />
                        </div>
                    );
                })}

                {(!leagues || leagues.length === 0) && (
                    <div className="text-center py-10 text-gray-500">No active leagues found.</div>
                )}
            </div>
        </div>
    );
}
