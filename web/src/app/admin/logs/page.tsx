import React from 'react';
import { Database, Shield, AlertCircle, Info, Clock } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

// Mock Data Fallback
const MOCK_LOGS = [
    { id: 1, action: 'User Banned', details: 'Banned user_123 for spamming', admin: 'SuperAdmin', ip: '192.168.1.1', created_at: '2025-04-15T10:30:00Z', level: 'warning' },
    { id: 2, action: 'Match Created', details: 'Created match Nepal vs UAE', admin: 'Editor', ip: '192.168.1.5', created_at: '2025-04-15T09:15:00Z', level: 'info' },
    { id: 3, action: 'System Config', details: 'Updated emergency mode settings', admin: 'SuperAdmin', ip: '192.168.1.1', created_at: '2025-04-14T18:00:00Z', level: 'critical' },
];

export default async function LogsPage() {
    const supabase = await createClient();

    // Fetch logs
    let { data: logsData, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false });

    let logs: any[] | null = logsData;

    if (error || !logs || logs.length === 0) {
        console.log('Using mock data for logs');
        logs = MOCK_LOGS;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">System Logs</h2>
                    <p className="text-gray-500">Audit trail of administrative actions and system events.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50">Export CSV</button>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Admin</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Details</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Time</th>
                            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Level</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {logs?.map((log: any) => (
                            <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-gray-900">{log.action}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                                            {log.admin?.[0]}
                                        </div>
                                        <span className="text-sm text-gray-600">{log.admin}</span>
                                    </div>
                                    <div className="text-xs text-gray-400 mt-0.5">{log.ip}</div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {log.details}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {new Date(log.created_at).toLocaleString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${log.level === 'critical' ? 'bg-red-100 text-red-800' :
                                            log.level === 'warning' ? 'bg-orange-100 text-orange-800' :
                                                'bg-blue-100 text-blue-800'}`}>
                                        {log.level}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
