import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { User, Settings, LogOut, Star, History, Trophy } from 'lucide-react';
import Link from 'next/link';
import { KhukuriPointsBadge } from '@/components/KhukuriPointsBadge';
import Image from 'next/image';

export default async function ProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Mock data for points since profiles table is not confirmed
    const khukuriPoints = 1250;
    const rank = "Gold Member";

    if (!user) {
        return (
            <div className="min-h-screen bg-[#F8FBFF] flex flex-col items-center justify-center p-6 pb-24">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                    <User size={48} className="text-[#003087]" />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome to NepalSports</h1>
                <p className="text-gray-500 text-center mb-8">Sign in to track your favorite teams, make predictions, and earn Khukuri Points.</p>
                <Link href="/login" className="w-full bg-[#003087] text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/30 text-center">
                    Login / Register
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FBFF] pb-24">
            {/* Header */}
            <div className="bg-[#003087] text-white pt-8 pb-16 px-6 rounded-b-[40px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 bg-white p-1 rounded-full mb-4 shadow-xl">
                        <Image
                            src={user.user_metadata?.avatar_url || "https://via.placeholder.com/150"}
                            alt="Profile"
                            width={96}
                            height={96}
                            className="rounded-full w-full h-full object-cover"
                        />
                    </div>
                    <h1 className="text-2xl font-bold mb-1">{user.user_metadata?.full_name || user.email?.split('@')[0]}</h1>
                    <p className="text-blue-200 text-sm mb-4">{user.email}</p>
                    <KhukuriPointsBadge points={khukuriPoints} />
                </div>
            </div>

            {/* Stats Cards */}
            <div className="px-4 -mt-8 relative z-20 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <Trophy className="text-yellow-500 mb-2" size={24} />
                    <span className="text-2xl font-black text-gray-900">12</span>
                    <span className="text-xs text-gray-400 font-bold uppercase">Predictions Won</span>
                </div>
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                    <Star className="text-purple-500 mb-2" size={24} />
                    <span className="text-2xl font-black text-gray-900">#45</span>
                    <span className="text-xs text-gray-400 font-bold uppercase">Global Rank</span>
                </div>
            </div>

            {/* Menu */}
            <div className="px-4 mt-6 space-y-3">
                <h3 className="font-bold text-gray-900 text-lg mb-2">Account</h3>

                <Link href="/profile/edit" className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-[#003087]">
                        <Settings size={20} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900">Settings</h4>
                        <p className="text-xs text-gray-500">Manage your preferences</p>
                    </div>
                </Link>

                <Link href="/profile/history" className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                        <History size={20} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-gray-900">History</h4>
                        <p className="text-xs text-gray-500">View past predictions</p>
                    </div>
                </Link>

                <form action="/auth/signout" method="post">
                    <button className="w-full flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 hover:bg-red-50 transition-colors text-left">
                        <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                            <LogOut size={20} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-bold text-gray-900">Log Out</h4>
                            <p className="text-xs text-gray-500">Sign out of your account</p>
                        </div>
                    </button>
                </form>
            </div>
        </div>
    );
}
