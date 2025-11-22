import React from 'react';
import { Shield, Check, X, AlertTriangle, MessageSquare, Image as ImageIcon, Video, Eye } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

// Mock Data Fallback
const MOCK_REPORTS = [
    { id: 1, content_type: 'report', reporter_id: 'user_123', reason: 'Inappropriate content', status: 'pending', created_at: new Date().toISOString(), content_id: 'report_1' },
    { id: 2, content_type: 'comment', reporter_id: 'user_456', reason: 'Spam link', status: 'flagged', created_at: new Date(Date.now() - 300000).toISOString(), content_id: 'comment_5' },
    { id: 3, content_type: 'reel', reporter_id: 'user_789', reason: 'Copyright violation', status: 'pending', created_at: new Date(Date.now() - 600000).toISOString(), content_id: 'reel_9' },
];

export default async function ModerationPage() {
    const supabase = await createClient();

    // Fetch content reports
    let { data: reportsData, error } = await supabase
        .from('content_reports')
        .select('*')
        .order('created_at', { ascending: false });

    let reports: any[] | null = reportsData;

    if (error || !reports || reports.length === 0) {
        reports = MOCK_REPORTS;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 font-mukta">Media Moderation</h2>
                    <p className="text-gray-500 text-sm">Review and moderate user-generated content.</p>
                </div>
                <div className="flex gap-3">
                    <span className="bg-[#FACC15]/10 text-[#FACC15] border border-[#FACC15]/20 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                        <AlertTriangle size={14} /> {reports?.filter((r: any) => r.status === 'pending').length || 0} Pending
                    </span>
                    <span className="bg-[#DC143C]/10 text-[#DC143C] border border-[#DC143C]/20 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2">
                        <Shield size={14} /> {reports?.filter((r: any) => r.status === 'flagged').length || 0} Flagged
                    </span>
                </div>
            </div>

            {/* Moderation Queue */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports?.map((item: any) => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-all hover:-translate-y-1 group">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                            <div className="flex items-center gap-2">
                                {item.content_type === 'report' && <ImageIcon size={16} className="text-[#003087]" />}
                                {item.content_type === 'reel' && <Video size={16} className="text-purple-500" />}
                                {item.content_type === 'comment' && <MessageSquare size={16} className="text-gray-500" />}
                                <span className="font-bold text-sm text-gray-700 capitalize font-mukta">{item.content_type}</span>
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{new Date(item.created_at).toLocaleTimeString()}</span>
                        </div>

                        {/* Media Preview (Simulated if URL exists) */}
                        <div className="h-56 bg-gray-100 relative flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                            <div className="text-center">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wide block mb-2">Content ID</span>
                                <span className="text-gray-500 font-mono text-sm bg-white px-2 py-1 rounded border border-gray-200">{item.content_id}</span>
                            </div>

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                                <button className="bg-white text-gray-900 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-lg">
                                    <Eye size={16} /> View Content
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-8 h-8 bg-gray-100 rounded-full border border-gray-200" />
                                <div>
                                    <div className="font-bold text-sm text-gray-900 font-mukta">User {item.reporter_id?.substring(0, 6)}</div>
                                    <div className="text-xs text-gray-500">Reporter</div>
                                </div>
                            </div>
                            <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                                <div className="text-[10px] font-bold text-[#DC143C] uppercase tracking-wide mb-1">Report Reason</div>
                                <p className="text-gray-800 text-sm font-medium leading-relaxed">{item.reason}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-4 border-t border-gray-100 flex gap-3 bg-gray-50/30">
                            <button className="flex-1 bg-white border border-gray-200 text-gray-600 py-2.5 rounded-xl font-bold text-sm hover:bg-green-50 hover:text-green-700 hover:border-green-200 transition-all flex items-center justify-center gap-2 shadow-sm">
                                <Check size={16} /> Ignore
                            </button>
                            <button className="flex-1 bg-[#DC143C] text-white py-2.5 rounded-xl font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-red-900/20">
                                <X size={16} /> Ban User
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
