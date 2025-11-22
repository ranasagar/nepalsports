import React from 'react';
import { Bell, Send, Users, Smartphone } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { sendNotification } from '@/app/actions/notifications';

export default async function CommunicationsPage() {
    const supabase = await createClient();
    const { data: history } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 font-mukta flex items-center gap-2">
                    <Bell className="text-[#003087]" />
                    Push & Communications
                </h2>
                <p className="text-gray-500 text-sm">Send push notifications and manage app-wide announcements.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Compose Box */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Send size={20} className="text-gray-400" />
                            Compose Notification
                        </h3>

                        <form action={async (formData) => {
                            'use server';
                            await sendNotification(formData);
                        }} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Target Audience</label>
                                <div className="grid grid-cols-3 gap-3">
                                    <label className="cursor-pointer">
                                        <input type="radio" name="target" value="All" defaultChecked className="peer sr-only" />
                                        <div className="p-3 rounded-xl border border-gray-200 text-center hover:bg-gray-50 peer-checked:bg-blue-50 peer-checked:border-[#003087] peer-checked:text-[#003087] transition-all">
                                            <Users className="mx-auto mb-1" size={20} />
                                            <span className="text-xs font-bold">All Users</span>
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input type="radio" name="target" value="Premium" className="peer sr-only" />
                                        <div className="p-3 rounded-xl border border-gray-200 text-center hover:bg-gray-50 peer-checked:bg-yellow-50 peer-checked:border-yellow-500 peer-checked:text-yellow-700 transition-all">
                                            <Smartphone className="mx-auto mb-1" size={20} />
                                            <span className="text-xs font-bold">Premium</span>
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input type="radio" name="target" value="Schools" className="peer sr-only" />
                                        <div className="p-3 rounded-xl border border-gray-200 text-center hover:bg-gray-50 peer-checked:bg-green-50 peer-checked:border-green-500 peer-checked:text-green-700 transition-all">
                                            <Users className="mx-auto mb-1" size={20} />
                                            <span className="text-xs font-bold">Schools</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Title</label>
                                <input type="text" name="title" placeholder="e.g. Match Starting Soon!" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087] font-bold" required />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Message Body</label>
                                <textarea name="body" rows={4} placeholder="Enter your message here..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#003087]" required></textarea>
                            </div>

                            <button type="submit" className="w-full bg-[#003087] text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-all flex items-center justify-center gap-2">
                                <Send size={18} />
                                Send Notification
                            </button>
                        </form>
                    </div>
                </div>

                {/* History */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 px-2">Recent History</h3>
                    <div className="space-y-3">
                        {history?.map((item: any) => (
                            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${item.target_audience === 'All' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'
                                        }`}>{item.target_audience}</span>
                                    <span className="text-[10px] text-gray-400">{new Date(item.created_at).toLocaleDateString()}</span>
                                </div>
                                <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                                <p className="text-xs text-gray-500 line-clamp-2">{item.body}</p>
                            </div>
                        ))}
                        {(!history || history.length === 0) && (
                            <div className="text-center text-gray-400 text-sm py-8">No notifications sent yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
