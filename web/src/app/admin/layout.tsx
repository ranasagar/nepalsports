import React from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    Trophy,
    Shield,
    School,
    Radio,
    DollarSign,
    Bell,
    Settings,
    Database,
    Zap,
    Menu
} from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#F8FBFF] flex font-inter">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 fixed h-full overflow-y-auto z-30 hidden md:block shadow-sm">
                <div className="h-16 flex items-center px-6 border-b border-gray-100 bg-[#003087]">
                    <span className="text-white font-bold text-xl font-mukta tracking-wide">NepalSports <span className="text-[#DC143C]">Admin</span></span>
                </div>

                <nav className="p-4 space-y-1">
                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Core</div>
                    <AdminLink href="/admin/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" />
                    <AdminLink href="/admin/users" icon={<Users size={18} />} label="Users & Roles" />
                    <AdminLink href="/admin/matches" icon={<Trophy size={18} />} label="Matches & Scores" />
                    <AdminLink href="/admin/schools" icon={<School size={18} />} label="Schools" />

                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">Features</div>
                    <AdminLink href="/admin/predictions" icon={<Zap size={18} />} label="Prediction League" />
                    <AdminLink href="/admin/media-moderation" icon={<Shield size={18} />} label="Moderation" />
                    <AdminLink href="/admin/monetization" icon={<DollarSign size={18} />} label="Monetization" />
                    <AdminLink href="/admin/push" icon={<Bell size={18} />} label="Push & Comms" />

                    <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 mt-6">System</div>
                    <AdminLink href="/admin/logs" icon={<Database size={18} />} label="System Logs" />
                    <AdminLink href="/admin/god-tools" icon={<Settings size={18} />} label="God Tools" />
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 md:ml-64">
                {/* Header */}
                <header className="h-16 bg-[#003087] text-white flex items-center justify-between px-6 sticky top-0 z-20 shadow-md">
                    <div className="flex items-center gap-4">
                        <button className="md:hidden p-2 hover:bg-white/10 rounded-lg">
                            <Menu size={24} />
                        </button>
                        <h1 className="font-bold text-lg font-mukta tracking-wide">Admin Console</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-[#DC143C] px-3 py-1.5 rounded-full shadow-sm border border-red-400">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            <span className="text-xs font-bold uppercase tracking-wider">Live Mode</span>
                        </div>
                        <div className="w-8 h-8 bg-white text-[#003087] rounded-full flex items-center justify-center font-bold border-2 border-white/20">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 max-w-7xl mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}

const AdminLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
    <Link
        href={href}
        className="flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-blue-50 hover:text-[#003087] rounded-lg transition-all group"
    >
        <span className="group-hover:scale-110 transition-transform duration-200">{icon}</span>
        <span className="font-medium text-sm">{label}</span>
    </Link>
);
