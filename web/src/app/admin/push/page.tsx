import React from 'react';
import { Bell, Send, MessageSquare, Smartphone, CheckCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

// Mock Data Fallback
const MOCK_NOTIFICATIONS = [
    { id: 1, title: 'Nepal vs UAE Started!', body: 'The match has just begun. Tune in now!', type: 'Broadcast', sent_at: '2025-04-15T10:00:00Z', sent_count: 12500 },
    { id: 2, title: 'New Prediction League', body: 'Season 2 is live. Join now and win prizes!', type: 'Marketing', sent_at: '2025-04-14T09:00:00Z', sent_count: 45000 },
    { id: 3, title: 'Security Alert', body: 'Please verify your email address.', type: 'System', sent_at: '2025-04-10T12:00:00Z', sent_count: 150 },
];

export default async function PushPage() {
    const supabase = await createClient();

    // Fetch notifications
    let { data: notificationsData, error } = await supabase
        .from('push_notifications')
        .select('*')
        .order('sent_at', { ascending: false });

    let notifications: any[] | null = notificationsData;

    if (error || !notifications || notifications.length === 0) {
        console.log('Using mock data for notifications');
        notifications = MOCK_NOTIFICATIONS;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Push & Communication</h2>
                    <p className="text-gray-500">Send broadcasts and manage in-app messages.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Compose Notification */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                            <Send size={20} className="text-[#0052D4]" />
                            Compose Broadcast
                        </h3>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                                <input type="text" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052D4]" placeholder="e.g. Wicket! Nepal 50/1" />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Message Body</label>
                                <textarea className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052D4] h-24" placeholder="Enter your message here..."></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Target Audience</label>
                                <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052D4]">
                                    <option>All Users</option>
                                    <option>Active in last 24h</option>
                                    <option>Premium Users</option>
                                    <option>Specific User ID</option>
                                </select>
                            </div>

                            <button className="w-full bg-[#0052D4] text-white py-3 rounded-lg font-bold shadow-md hover:bg-blue-700 flex items-center justify-center gap-2">
                                <Bell size={18} />
                                Send Notification
                            </button>
                        </div>
                    </div>
                </div>

                {/* History */}
                <div className="lg:col-span-2">
                    <h3 className="font-bold text-lg text-gray-800 mb-4">Recent Broadcasts</h3>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Message</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Type</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Sent To</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Time</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {notifications?.map((notif: any) => (
                                    <tr key={notif.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{notif.title}</div>
                                            <div className="text-sm text-gray-500 truncate max-w-xs">{notif.body}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                                                {notif.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Smartphone size={14} />
                                                {(notif.sent_count || 0).toLocaleString()}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(notif.sent_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <span className="text-green-600 flex items-center justify-end gap-1 text-sm font-bold">
                                                <CheckCircle size={14} /> Sent
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
