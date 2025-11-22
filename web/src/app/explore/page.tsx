import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Compass, TrendingUp, Video, Users } from 'lucide-react';
import NewsCard from '@/components/sports/NewsCard';
import Link from 'next/link';
import Image from 'next/image';

export default async function ExplorePage() {
    const supabase = await createClient();

    // Fetch latest news
    const { data: news } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    // Fetch approved reels
    const { data: reels } = await supabase
        .from('reels')
        .select('*')
        .eq('is_approved', true)
        .order('likes', { ascending: false })
        .limit(5);

    // Fetch random teams (mock random by fetching all and slicing)
    const { data: teams } = await supabase
        .from('teams')
        .select('*')
        .limit(10);

    return (
        <div className="px-4 pt-6 pb-24">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Compass className="text-[#003087]" /> Explore
            </h1>

            {/* Trending News */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <TrendingUp size={20} className="text-red-500" /> Trending News
                    </h2>
                    <Link href="/news" className="text-xs font-bold text-[#003087]">View All</Link>
                </div>
                <div className="space-y-4">
                    {news?.map((item: any) => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                    {(!news || news.length === 0) && <div className="text-gray-500 text-sm">No news available.</div>}
                </div>
            </section>

            {/* Viral Reels */}
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <Video size={20} className="text-purple-500" /> Viral Moments
                    </h2>
                    <Link href="/reels" className="text-xs font-bold text-[#003087]">View All</Link>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                    {reels?.map((reel: any) => (
                        <Link href={`/reels/${reel.id}`} key={reel.id} className="flex-shrink-0 w-32 relative aspect-[9/16] rounded-xl overflow-hidden bg-gray-100">
                            <Image
                                src={reel.thumbnail_url || "https://via.placeholder.com/150"}
                                alt={reel.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-2">
                                <span className="text-white text-xs font-bold line-clamp-2">{reel.title}</span>
                                <span className="text-gray-300 text-[10px]">{reel.views} views</span>
                            </div>
                        </Link>
                    ))}
                    {(!reels || reels.length === 0) && <div className="text-gray-500 text-sm">No reels available.</div>}
                </div>
            </section>

            {/* Popular Teams */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                        <Users size={20} className="text-blue-500" /> Popular Teams
                    </h2>
                    <Link href="/teams" className="text-xs font-bold text-[#003087]">View All</Link>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {teams?.slice(0, 4).map((team: any) => (
                        <Link href={`/team/${team.id}`} key={team.id} className="bg-white p-3 rounded-xl border border-gray-100 flex items-center gap-3 shadow-sm">
                            <Image
                                src={team.logo_url || "https://via.placeholder.com/40"}
                                alt={team.name}
                                width={40}
                                height={40}
                                className="object-contain w-10 h-10"
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 text-sm truncate">{team.name}</h3>
                                <p className="text-[10px] text-gray-500 uppercase">{team.sport}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
