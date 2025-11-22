import React from 'react';
import { DollarSign, ShoppingBag, Layout, TrendingUp, Plus, CreditCard, BarChart3 } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export default async function MonetizationPage() {
    const supabase = await createClient();

    // Mock data for now as no table exists
    const REVENUE_STREAMS = [
        { id: 1, name: 'Google AdMob', type: 'Ads', status: 'Active', revenue: 'Rs. 1,25,000', growth: '+12%' },
        { id: 2, name: 'Official Merch Store', type: 'Merchandise', status: 'Active', revenue: 'Rs. 45,000', growth: '+5%' },
        { id: 3, name: 'Sponsor: Coca-Cola', type: 'Sponsorship', status: 'Active', revenue: 'Rs. 5,00,000', growth: '0%' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 font-mukta">Monetization</h2>
                    <p className="text-gray-500 text-sm">Manage revenue streams, ads, and sponsorships.</p>
                </div>
                <button className="bg-[#003087] text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-800 transition-colors flex items-center gap-2">
                    <Plus size={18} />
                    Add Stream
                </button>
            </div>

            {/* Revenue Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-50 rounded-xl text-green-600 group-hover:bg-green-100 transition-colors">
                            <DollarSign size={24} />
                        </div>
                        <span className="bg-green-50 text-green-600 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                            <TrendingUp size={12} /> +8.5%
                        </span>
                    </div>
                    <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Total Revenue (This Month)</div>
                    <div className="text-3xl font-bold text-gray-900 font-mukta">Rs. 6,70,000</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 rounded-xl text-[#003087] group-hover:bg-blue-100 transition-colors">
                            <Layout size={24} />
                        </div>
                        <span className="bg-blue-50 text-[#003087] px-2 py-1 rounded-lg text-xs font-bold">Active</span>
                    </div>
                    <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Ad Impressions</div>
                    <div className="text-3xl font-bold text-gray-900 font-mukta">1.2M</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-100 transition-colors">
                            <ShoppingBag size={24} />
                        </div>
                        <span className="bg-green-50 text-green-600 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                            <TrendingUp size={12} /> +15%
                        </span>
                    </div>
                    <div className="text-gray-400 text-[10px] font-bold uppercase tracking-wider mb-1">Merch Sales</div>
                    <div className="text-3xl font-bold text-gray-900 font-mukta">145 Orders</div>
                </div>
            </div>

            {/* Active Streams */}
            <div>
                <h3 className="font-bold text-lg text-gray-800 mb-6 font-mukta">Active Revenue Streams</h3>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Source</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Type</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Revenue (YTD)</th>
                                <th className="px-6 py-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {REVENUE_STREAMS.map((stream) => (
                                <tr key={stream.id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-5 font-bold text-gray-900 font-mukta text-lg">{stream.name}</td>
                                    <td className="px-6 py-5 text-sm text-gray-500 font-medium flex items-center gap-2">
                                        {stream.type === 'Ads' && <Layout size={16} className="text-blue-500" />}
                                        {stream.type === 'Merchandise' && <ShoppingBag size={16} className="text-purple-500" />}
                                        {stream.type === 'Sponsorship' && <CreditCard size={16} className="text-green-500" />}
                                        {stream.type}
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-green-50 text-green-700 border border-green-100">
                                            {stream.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 font-bold text-gray-800 font-mukta text-lg">
                                        {stream.revenue} <span className="text-green-500 text-xs ml-1 font-inter">({stream.growth})</span>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button className="text-[#003087] font-bold text-sm hover:underline decoration-2 underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end gap-1 ml-auto">
                                            <BarChart3 size={16} /> Configure
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
