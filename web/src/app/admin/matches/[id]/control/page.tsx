import React from 'react';
import { Play, Pause, Square, Trophy, Flag, AlertTriangle } from 'lucide-react';

export default function MatchControlRoom() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Nepal vs UAE</h2>
                    <p className="text-gray-500 text-sm">T20 World Cup Qualifier • Live Control</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        LIVE
                    </span>
                    <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800">
                        End Match
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Score Control */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Score Update</h3>

                        <div className="grid grid-cols-2 gap-8 mb-6">
                            <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                                <h4 className="font-bold text-blue-900">Nepal</h4>
                                <div className="text-3xl font-bold text-[#0052D4] my-2">184/4</div>
                                <div className="text-sm text-blue-600">18.2 Overs</div>
                                <div className="flex justify-center gap-2 mt-4">
                                    <ControlButton label="+1" />
                                    <ControlButton label="+4" />
                                    <ControlButton label="+6" />
                                    <ControlButton label="W" color="bg-red-100 text-red-600 hover:bg-red-200" />
                                </div>
                            </div>

                            <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200 opacity-75">
                                <h4 className="font-bold text-gray-900">UAE</h4>
                                <div className="text-3xl font-bold text-gray-700 my-2">0/0</div>
                                <div className="text-sm text-gray-500">Yet to Bat</div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">Custom Commentary / Status</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#0052D4] focus:border-transparent outline-none"
                                    placeholder="e.g. Rain stopped play..."
                                />
                                <button className="bg-[#0052D4] text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions & Events */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Match Actions</h3>
                        <div className="space-y-3">
                            <ActionButton icon={<Play size={18} />} label="Start Match" />
                            <ActionButton icon={<Pause size={18} />} label="Pause / Break" />
                            <ActionButton icon={<Trophy size={18} />} label="Declare Winner" />
                            <ActionButton icon={<Flag size={18} />} label="Abandon Match" color="text-red-600 hover:bg-red-50" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-800 mb-4">Emergency</h3>
                        <button className="w-full flex items-center justify-center gap-2 bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 transition-colors">
                            <AlertTriangle size={20} />
                            Broadcast Alert
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ControlButton = ({ label, color = "bg-white border border-gray-200 hover:bg-gray-50" }: { label: string, color?: string }) => (
    <button className={`w-10 h-10 rounded-lg font-bold text-sm flex items-center justify-center transition-colors ${color}`}>
        {label}
    </button>
);

const ActionButton = ({ icon, label, color = "text-gray-700 hover:bg-gray-50" }: { icon: React.ReactNode, label: string, color?: string }) => (
    <button className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-colors border border-gray-100 ${color}`}>
        {icon}
        {label}
    </button>
);
