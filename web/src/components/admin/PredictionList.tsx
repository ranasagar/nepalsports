'use client';

import React, { useState } from 'react';
import { CheckCircle, Clock, Trophy } from 'lucide-react';
import { settlePrediction } from '@/app/actions/predictions';

export default function PredictionList({ predictions }: { predictions: any[] }) {
    return (
        <div className="space-y-4">
            {predictions.map((pred) => (
                <PredictionItem key={pred.id} prediction={pred} />
            ))}
            {predictions.length === 0 && (
                <div className="text-center text-gray-400 py-12 bg-white rounded-3xl border border-gray-100">
                    No active prediction fixtures.
                </div>
            )}
        </div>
    );
}

function PredictionItem({ prediction }: { prediction: any }) {
    const [loading, setLoading] = useState(false);

    const handleSettle = async (option: string) => {
        if (!confirm(`Mark "${option}" as the correct answer? This will distribute points to winners.`)) return;
        setLoading(true);
        await settlePrediction(prediction.id, option);
        setLoading(false);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2 inline-block
                        ${prediction.status === 'Open' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        {prediction.status}
                    </span>
                    <h4 className="font-bold text-gray-900 text-lg">{prediction.question}</h4>
                    {prediction.matches && (
                        <p className="text-xs text-gray-500 mt-1">
                            Match: {prediction.matches.home_team} vs {prediction.matches.away_team}
                        </p>
                    )}
                </div>
                <div className="bg-blue-50 p-2 rounded-xl">
                    <Trophy className="text-[#003087]" size={20} />
                </div>
            </div>

            {/* Options / Settle Controls */}
            {prediction.status === 'Open' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                    {prediction.options.map((option: string, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => handleSettle(option)}
                            disabled={loading}
                            className="px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-[#003087] hover:text-white hover:border-[#003087] transition-all"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            ) : (
                <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100 flex items-center gap-2 text-green-700 font-bold text-sm">
                    <CheckCircle size={16} />
                    Winner: {prediction.correct_option}
                </div>
            )}
        </div>
    );
}
