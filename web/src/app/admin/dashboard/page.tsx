import React from 'react';
import { Users, Trophy, DollarSign, Activity, ArrowUpRight, MapPin } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Mock Stats Fallback
    const stats = {
        users: '12,450',
        usersTrend: '+12%',
        matches: '8',
        matchesTrend: 'Live',
        revenue: 'Rs. 1,24,000',
        revenueTrend: '+5%',
        predictions: '45,000',
        predictionsTrend: '+18%'
    };

    // Mock Activity Feed
    const activities = [
        { id: 1, user: 'Sagar K.', action: 'Predicted Nepal win', time: '2m ago' },
        { id: 2, user: 'Admin', action: 'Updated Match Score', time: '5m ago' },
        { id: 3, user: 'School Admin', action: 'Posted new result', time: '12m ago' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 font-mukta">Dashboard Overview</h2>
                <div className="text-sm text-gray-500 font-medium">Last updated: Just now</div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats.users}
                    trend={stats.usersTrend}
                    icon={<Users className="text-[#003087]" />}
                    color="blue"
                />
                <StatCard
                    title="Active Matches"
                    value={stats.matches}
                    trend={stats.matchesTrend}
                    icon={<Activity className="text-[#DC143C]" />}
                    color="red"
                />
                <StatCard
                    title="Revenue (AdMob)"
                    value={stats.revenue}
                    trend={stats.revenueTrend}
                    icon={<DollarSign className="text-yellow-600" />}
                    color="yellow"
                />
                <StatCard
                    title="Predictions"
                    value={stats.predictions}
                    trend={stats.predictionsTrend}
                    icon={<Trophy className="text-purple-600" />}
                    color="purple"
                />
            </div>

            {/* Recent Activity & Heatmap Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Heatmap Section - Takes up 2 columns */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-800 text-lg">Live User Activity</h3>
                        <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase">
                            <MapPin size={14} />
                            District View
                        </div>
                    </div>
                    <div className="h-80 bg-[#F8FBFF] rounded-xl flex items-center justify-center border border-dashed border-blue-100 relative overflow-hidden group">
                        <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Nepal_location_map.svg/1200px-Nepal_location_map.svg.png')] bg-contain bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-700"></div>

                        {/* Mock Hotspots */}
                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
                        <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-red-500 rounded-full animate-ping delay-100"></div>
                        <div className="absolute bottom-1/3 right-1/4 w-5 h-5 bg-red-500 rounded-full animate-ping delay-300"></div>

                        <span className="text-[#003087] font-bold z-10 bg-white/80 px-4 py-2 rounded-full backdrop-blur-sm shadow-sm">Real-time Heatmap Active</span>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-gray-800 mb-6 text-lg">Recent Actions</h3>
                    <div className="space-y-6">
                        {activities.map((activity) => (
                            <ActivityItem key={activity.id} user={activity.user} action={activity.action} time={activity.time} />
                        ))}
                    </div>
                    <button className="w-full mt-6 py-3 text-sm font-bold text-[#003087] bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                        View All Logs
                    </button>
                </div>
            </div>
        </div>
    );
}

const StatCard = ({ title, value, trend, icon, color }: { title: string, value: string, trend: string, icon: React.ReactNode, color: string }) => {
    const bgColors: Record<string, string> = {
        blue: 'bg-blue-50',
        red: 'bg-red-50',
        yellow: 'bg-yellow-50',
        purple: 'bg-purple-50'
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between hover:shadow-md transition-all hover:-translate-y-1 group">
            <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-1 font-mukta">{value}</h3>
                <div className="flex items-center gap-1 mt-3">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1
                        ${trend === 'Live' ? 'bg-[#DC143C]/10 text-[#DC143C] animate-pulse' : 'bg-green-50 text-green-600'}`}>
                        {trend !== 'Live' && <ArrowUpRight size={10} />}
                        {trend}
                    </span>
                    {trend !== 'Live' && <span className="text-xs text-gray-400 font-medium">vs last week</span>}
                </div>
            </div>
            <div className={`p-3 rounded-xl ${bgColors[color]} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
        </div>
    );
};

const ActivityItem = ({ user, action, time }: { user: string, action: string, time: string }) => (
    <div className="flex items-start gap-3 relative">
        <div className="w-8 h-8 bg-[#003087] rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm z-10">
            {user[0]}
        </div>
        <div className="flex-1 pb-6 border-l-2 border-gray-50 pl-4 -ml-7 mt-2">
            <div className="pl-4">
                <p className="text-sm font-bold text-gray-900">{user}</p>
                <p className="text-xs text-gray-500 mt-0.5">{action}</p>
            </div>
        </div>
        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full h-fit">{time}</span>
    </div>
);
