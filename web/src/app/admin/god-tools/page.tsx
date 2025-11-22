'use client';

import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, Database, RefreshCw, Server, Lock, Power, Activity, Check } from 'lucide-react';
import { updateSystemSetting, flushCache, getSystemSettings } from '@/app/actions/system';

export default function GodToolsPage() {
    const [settings, setSettings] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        loadSettings();
    }, []);

    async function loadSettings() {
        const data = await getSystemSettings();
        setSettings(data);
        setLoading(false);
    }

    const handleToggle = async (key: string) => {
        setActionLoading(key);
        const newValue = !settings[key];

        const result = await updateSystemSetting(key, newValue);
        if (result.success) {
            setSettings(prev => ({ ...prev, [key]: newValue }));
        }
        setActionLoading(null);
    };

    const handleFlushCache = async () => {
        setActionLoading('flush');
        await flushCache();
        setTimeout(() => setActionLoading(null), 1000);
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 font-mukta flex items-center gap-2">
                    <Shield className="text-[#DC143C]" />
                    God Tools
                </h2>
                <p className="text-gray-500 text-sm">Super admin controls. Handle with extreme caution.</p>
            </div>

            {/* Critical Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Emergency Stop */}
                <div className={`p-6 rounded-2xl border-2 transition-all ${settings['emergency_stop'] ? 'bg-red-50 border-[#DC143C]' : 'bg-white border-gray-100'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-red-100 rounded-xl">
                            <Power className="text-[#DC143C]" size={24} />
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={!!settings['emergency_stop']}
                                onChange={() => handleToggle('emergency_stop')}
                                disabled={!!actionLoading}
                            />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#DC143C]"></div>
                        </label>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Emergency Stop</h3>
                    <p className="text-sm text-gray-500">Instantly kill all active streams and put the app in read-only mode. Use only during severe incidents.</p>
                </div>

                {/* Maintenance Mode */}
                <div className={`p-6 rounded-2xl border-2 transition-all ${settings['maintenance_mode'] ? 'bg-yellow-50 border-yellow-400' : 'bg-white border-gray-100'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-yellow-100 rounded-xl">
                            <Lock className="text-yellow-600" size={24} />
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={!!settings['maintenance_mode']}
                                onChange={() => handleToggle('maintenance_mode')}
                                disabled={!!actionLoading}
                            />
                            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-yellow-400"></div>
                        </label>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Maintenance Mode</h3>
                    <p className="text-sm text-gray-500">Show a maintenance screen to all non-admin users. Useful for database migrations or major updates.</p>
                </div>
            </div>

            {/* System Utilities */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Server size={20} className="text-gray-400" />
                    System Utilities
                </h3>

                <div className="space-y-4">
                    {/* Flush Cache */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <RefreshCw className="text-blue-600" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Flush App Cache</h4>
                                <p className="text-xs text-gray-500">Revalidate all static pages and data.</p>
                            </div>
                        </div>
                        <button
                            onClick={handleFlushCache}
                            disabled={!!actionLoading}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                            {actionLoading === 'flush' ? <Activity className="animate-spin" size={16} /> : <RefreshCw size={16} />}
                            Flush
                        </button>
                    </div>

                    {/* Database Health */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <Database className="text-green-600" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">Database Status</h4>
                                <p className="text-xs text-gray-500">Connection healthy. Latency: 45ms</p>
                            </div>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Healthy
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
