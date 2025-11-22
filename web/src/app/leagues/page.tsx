import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Trophy, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default async function LeaguesPage() {
    const supabase = await createClient();

    const { data: leagues } = await supabase
        .from('leagues')
        .select('*')
        .order('sport', { ascending: true });

    return (
        <div className="px-4 pt-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Trophy className="text-[#003087]" /> Leagues & Tournaments
            </h1>

            <div className="grid grid-cols-1 gap-4">
                {leagues?.map((league: any) => (
                    <Link href={`/${league.sport}/standings`} key={league.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow group">
                        <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 flex items-center justify-center">
                            {/* Placeholder for league logo if not present */}
                            <Trophy className="text-gray-300" size={32} />
                        </div>
                        <div className="flex-1">
                            <div className="text-[10px] font-bold text-[#003087] uppercase tracking-wider mb-1">{league.sport}</div>
                            <h3 className="font-bold text-gray-900 text-lg leading-tight group-hover:text-[#003087] transition-colors">{league.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">{league.season || 'Current Season'}</p>
                        </div>
                        <ChevronRight className="text-gray-300 group-hover:text-[#003087] transition-colors" />
                    </Link>
                ))}
                {(!leagues || leagues.length === 0) && (
                    <div className="text-center py-10 text-gray-500">No leagues found.</div>
                )}
            </div>
        </div>
    );
}
