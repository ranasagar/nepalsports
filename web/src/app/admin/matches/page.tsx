import React from 'react';
import { Search } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import MatchListItem from '@/components/admin/MatchListItem';
import CreateMatchModal from '@/components/admin/CreateMatchModal';

// Mock Data Fallback
const MOCK_MATCHES = [
    { id: 1, home_team: 'Nepal', away_team: 'UAE', home_score: '245/8', away_score: '120/2', status: 'Live', type: 'ODI', date: '2025-04-15' },
    { id: 2, home_team: 'St. Xaviers', away_team: 'Budhanilkantha', home_score: '1-0', away_score: '0-0', status: 'Live', type: 'Football', date: '2025-04-15' },
    { id: 3, home_team: 'Nepal Police', away_team: 'APF Club', home_score: '-', away_score: '-', status: 'Upcoming', type: 'Cricket', date: '2025-04-16' },
];

export default async function MatchesPage() {
    const supabase = await createClient();

    // Fetch matches
    let { data: matchesData, error } = await supabase
        .from('matches')
        .select('*')
        .order('date', { ascending: true });

    let matches: any[] | null = matchesData;

    if (error || !matches || matches.length === 0) {
        matches = MOCK_MATCHES;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 font-mukta">Matches & Scores</h2>
                    <p className="text-gray-500 text-sm">Manage match schedules and live scoring.</p>
                </div>
                <CreateMatchModal />
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search matches..."
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#003087] focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                    />
                </div>
                <div className="flex gap-3">
                    <select className="border border-gray-200 rounded-xl px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003087] font-medium cursor-pointer hover:bg-white transition-colors">
                        <option>All Sports</option>
                        <option>Cricket</option>
                        <option>Football</option>
                    </select>
                    <select className="border border-gray-200 rounded-xl px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003087] font-medium cursor-pointer hover:bg-white transition-colors">
                        <option>All Status</option>
                        <option>Live</option>
                        <option>Upcoming</option>
                        <option>Completed</option>
                    </select>
                </div>
            </div>

            {/* Matches List */}
            <div className="space-y-4">
                {matches?.map((match: any) => (
                    <MatchListItem key={match.id} match={match} />
                ))}
            </div>
        </div>
    );
}
