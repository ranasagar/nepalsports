import React from 'react';
import { Trophy, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { createPrediction, settlePrediction } from '@/app/actions/predictions';
import PredictionList from '@/components/admin/PredictionList';

export default async function PredictionsPage() {
    const supabase = await createClient();

    // Fetch predictions
    const { data: predictions } = await supabase
        .from('predictions')
        .select('*, matches(home_team, away_team)')
        .order('created_at', { ascending: false });

    // Fetch active matches for the dropdown
    const { data: matches } = await supabase
        .from('matches')
        .select('id, home_team, away_team')
        .eq('status', 'Upcoming');

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 font-mukta flex items-center gap-2">
                    <Trophy className="text-[#003087]" />
                    Prediction League Control
                </h2>
                <p className="text-gray-500 text-sm">Create and manage prediction fixtures for users.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Create Form */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sticky top-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Plus size={20} className="text-gray-400" />
                            New Fixture
                        </h3>

                        <form action={async (formData) => {
                            'use server';
                            await createPrediction(formData);
                        }} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Select Match</label>
                                <select name="match_id" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087] bg-white">
                                    <option value="">General Prediction (No Match)</option>
                                    {matches?.map((m: any) => (
                                        <option key={m.id} value={m.id}>{m.home_team} vs {m.away_team}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Question</label>
                                <input type="text" name="question" placeholder="e.g. Who will win the toss?" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087] font-bold" required />
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-bold text-gray-500 uppercase">Options</label>
                                <input type="text" name="option1" placeholder="Option 1 (e.g. Nepal)" className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm" required />
                                <input type="text" name="option2" placeholder="Option 2 (e.g. UAE)" className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm" required />
                                <input type="text" name="option3" placeholder="Option 3 (Optional)" className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm" />
                            </div>

                            <button type="submit" className="w-full bg-[#003087] text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 mt-4">
                                <Plus size={18} />
                                Create Fixture
                            </button>
                        </form>
                    </div>
                </div>

                {/* Active Predictions */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-lg font-bold text-gray-900 px-2">Active Fixtures</h3>
                    <PredictionList predictions={predictions || []} />
                </div>
            </div>
        </div>
    );
}
