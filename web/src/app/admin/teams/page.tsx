import React from 'react';
import { createClient } from '@/utils/supabase/server';

export default async function AdminTeamsPage() {
    const supabase = await createClient();
    const { data: teams } = await supabase.from('teams').select('*').order('created_at', { ascending: false });

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Teams Management</h1>
                <button className="bg-[#003087] text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-800 transition-colors">
                    + Add Team
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider">Team</th>
                            <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider">Sport</th>
                            <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider">Founded</th>
                            <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider">Home Ground</th>
                            <th className="px-6 py-4 font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {teams?.map((team: any) => (
                            <tr key={team.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img src={team.logo_url || "https://via.placeholder.com/40"} alt={team.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                                        <span className="font-bold text-gray-900">{team.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-600 capitalize">{team.sport}</td>
                                <td className="px-6 py-4 text-gray-500">{team.founded_year}</td>
                                <td className="px-6 py-4 text-gray-500">{team.home_ground}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-blue-600 hover:text-blue-800 font-bold mr-3">Edit</button>
                                    <button className="text-red-500 hover:text-red-700 font-bold">Delete</button>
                                </td>
                            </tr>
                        ))}
                        {(!teams || teams.length === 0) && (
                            <tr>
                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">No teams found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
