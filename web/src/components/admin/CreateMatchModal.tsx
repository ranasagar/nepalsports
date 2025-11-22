"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { createMatch } from "@/app/actions/matches";

export default function CreateMatchModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-[#003087] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-colors flex items-center gap-2"
            >
                <Plus size={18} />
                Create Match
            </button>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Create New Match</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form
                            action={async (formData) => {
                                await createMatch(formData);
                                setIsOpen(false);
                            }}
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                        Home Team
                                    </label>
                                    <input
                                        type="text"
                                        name="home_team"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                        Away Team
                                    </label>
                                    <input
                                        type="text"
                                        name="away_team"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                        Home Flag URL
                                    </label>
                                    <input
                                        type="url"
                                        name="home_flag"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                        Away Flag URL
                                    </label>
                                    <input
                                        type="url"
                                        name="away_flag"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087]"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                    Tournament / League
                                </label>
                                <input
                                    type="text"
                                    name="tournament"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                        Date & Time
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="match_time"
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                        Venue
                                    </label>
                                    <input
                                        type="text"
                                        name="venue"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087]"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#003087] text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all mt-2"
                            >
                                Schedule Match
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
