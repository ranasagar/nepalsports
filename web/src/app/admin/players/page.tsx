import React from 'react';
import { createClient } from '@/utils/supabase/server';

export default async function AdminPlayersPage() {
    const supabase = await createClient();
    const { data: players } = await supabase
        .from('players')
        .select('*, teams(name, logo_url)')
        .order('created_at', { ascending: false });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Players Management</h1>
                <button className="bg-[#003087] text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-800 transition-colors">
                    + Add Player
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider">Player</th>
                            <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider">Team</th>
                            <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider">Position</th>
                            <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider">Nationality</th>
                            <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {players?.map((player: any) => (
                            <tr key={player.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={player.image_url || "https://via.placeholder.com/40"} alt={player.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                        <div>
                                            <div className="font-bold text-gray-900">{player.name}</div>
                                            <div className="text-xs text-gray-500">#{player.jersey_number}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {player.teams ? (
                                        <div className="flex items-center gap-2">
                                            <img src={player.teams.logo_url || "https://via.placeholder.com/20"} alt={player.teams.name} className="w-6 h-6 object-contain" />
                                            <span className="font-medium text-gray-700">{player.teams.name}</span>
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 italic">Free Agent</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-600">{player.position}</td>
                                <td className="px-6 py-4 text-gray-500">{player.nationality}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:text-blue-800 font-bold mr-3">Edit</button>
                                    <button className="text-red-500 hover:text-red-700 font-bold">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {(!players || players.length === 0) && (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No players found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
