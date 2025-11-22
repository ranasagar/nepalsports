import React from 'react';
import SportHeader from '@/components/sports/SportHeader';
import StandingsWidget from '@/components/sports/StandingsWidget';

export default function FootballStandingsPage() {
    const mockStandings = [
        { rank: 1, team: 'Machhindra FC', played: 13, won: 9, draw: 3, lost: 1, points: 30, logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b6/Machhindra_FC_logo.svg/1200px-Machhindra_FC_logo.svg.png' },
        { rank: 2, team: 'Three Star Club', played: 13, won: 7, draw: 4, lost: 2, points: 25, logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Three_Star_Club_logo.svg/1200px-Three_Star_Club_logo.svg.png' },
        { rank: 3, team: 'Tribhuvan Army', played: 13, won: 6, draw: 5, lost: 2, points: 23, logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/66/Tribhuvan_Army_Club_logo.svg/1200px-Tribhuvan_Army_Club_logo.svg.png' },
        { rank: 4, team: 'Nepal Police', played: 13, won: 5, draw: 4, lost: 4, points: 19, logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3e/Nepal_Police_Club_logo.svg/1200px-Nepal_Police_Club_logo.svg.png' },
        { rank: 5, team: 'Sankata Club', played: 13, won: 4, draw: 5, lost: 4, points: 17, logo_url: 'https://via.placeholder.com/50' },
        { rank: 6, team: 'Jawalakhel Youth', played: 13, won: 4, draw: 5, lost: 4, points: 17, logo_url: 'https://via.placeholder.com/50' },
        { rank: 7, team: 'APF Club', played: 13, won: 4, draw: 4, lost: 5, points: 16, logo_url: 'https://via.placeholder.com/50' },
        { rank: 8, team: 'Manang Marshyangdi', played: 13, won: 4, draw: 3, lost: 6, points: 15, logo_url: 'https://via.placeholder.com/50' },
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

            <div className="max-w-4xl mx-auto px-4 py-6">
                <h2 className="font-black text-xl text-gray-900 uppercase tracking-wide border-l-4 border-[#003087] pl-3 mb-6">League Tables</h2>

                <div className="space-y-8">
                    <StandingsWidget title="Martyr's Memorial A-Division League" standings={mockStandings} />
                    <StandingsWidget title="Nepal Super League (NSL)" standings={[]} />
                </div>
            </div>
        </div>
    );
}
