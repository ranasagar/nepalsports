import React from 'react';
import { Bell, Calendar, ChevronDown, Search, Play, Clock, Home as HomeIcon, Compass, BarChart2, User, Radio, Video, Users } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export default async function Home() {
  const supabase = await createClient();

  // Fetch Live Matches
  const { data: liveMatches } = await supabase
    .from('matches')
    .select('*')
    .eq('status', 'Live')
    .order('match_time', { ascending: true });

  // Fetch Finished Matches
  const { data: finishedMatches } = await supabase
    .from('matches')
    .select('*')
    .eq('status', 'Finished')
    .order('match_time', { ascending: false })
    .limit(2);

  // Fetch Upcoming Matches
  const { data: upcomingMatches } = await supabase
    .from('matches')
    .select('*')
    .eq('status', 'Upcoming')
    .order('match_time', { ascending: true })
    .limit(3);

  return (
    <div className="px-4 pt-2">
      {/* Sub Navigation - Specific to Home */}
      <div className="bg-[#003087] -mx-4 px-6 pb-4 mb-6 rounded-b-[30px] shadow-md">
        <div className="flex justify-between items-center">
          <Link href="/live" className="text-blue-200 font-medium text-sm pb-2 hover:text-white transition-colors">LiveTV</Link>
          <div className="flex flex-col items-center">
            <Link href="/" className="text-white font-bold text-lg pb-2">Matches</Link>
            <div className="w-12 h-1 bg-white rounded-t-full"></div>
          </div>
          <Link href="/leagues" className="text-blue-200 font-medium text-sm pb-2 hover:text-white transition-colors">Leagues</Link>
        </div>
      </div>

      {/* Hero / Watch Live Section */}
      <Link href="/live" className="block relative w-full h-48 rounded-[30px] overflow-hidden mb-8 shadow-xl shadow-blue-900/20 group cursor-pointer">
        <Image
          src="https://img.freepik.com/free-photo/soccer-players-action-professional-stadium_654080-1752.jpg"
          alt="Match Banner"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#003087]/90 to-transparent"></div>

        <div className="absolute top-6 left-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-white rounded-full p-1">
              <Image src="https://flagcdn.com/w80/np.png" width={32} height={32} alt="Nepal" className="rounded-full object-cover w-full h-full" />
            </div>
            <span className="text-white font-bold text-xl">Nepal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full p-1">
              <Image src="https://flagcdn.com/w80/ae.png" width={32} height={32} alt="UAE" className="rounded-full object-cover w-full h-full" />
            </div>
            <span className="text-white/80 font-bold text-xl">UAE</span>
          </div>
        </div>

        <button className="absolute bottom-6 left-6 bg-[#E6B00F] hover:bg-[#F4C430] text-[#003087] px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 transition-colors shadow-lg">
          <Play size={16} fill="#003087" />
          Watch Live
        </button>
      </Link>

      {/* Quick Actions Grid */}
      <section className="grid grid-cols-4 gap-4 mb-8">
        <Link href="/fixtures" className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#003087] group-hover:bg-[#003087] group-hover:text-white transition-colors">
            <Calendar size={20} />
          </div>
          <span className="text-xs font-medium text-gray-600">Fixtures</span>
        </Link>
        <Link href="/radio" className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-[#E61E2A] group-hover:bg-[#E61E2A] group-hover:text-white transition-colors">
            <Radio size={20} />
          </div>
          <span className="text-xs font-medium text-gray-600">Radio</span>
        </Link>
        <Link href="/reels" className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <Video size={20} />
          </div>
          <span className="text-xs font-medium text-gray-600">Reels</span>
        </Link>
        <Link href="/schools" className="flex flex-col items-center gap-1 group">
          <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <Users size={20} />
          </div>
          <span className="text-xs font-medium text-gray-600">Schools</span>
        </Link>
      </section>

      {/* Match List Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-gray-800 text-lg">Live & Recent</h3>
          <div className="flex items-center gap-1 text-[#003087] bg-blue-50 px-3 py-1 rounded-full">
            <Clock size={12} />
            <span className="text-xs font-bold">Today</span>
          </div>
        </div>

        {/* Live Matches */}
        {liveMatches?.map((match: any) => (
          <Link href={`/match/${match.id}`} key={match.id} className="block bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 mb-4 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col items-center gap-2 w-1/3">
                <div className="w-14 h-14 p-2 rounded-full border-2 border-gray-50 shadow-sm">
                  <Image src={match.home_flag || "https://via.placeholder.com/50"} width={56} height={56} alt={match.home_team} className="w-full h-full object-contain rounded-full" />
                </div>
                <span className="font-bold text-gray-800 text-sm text-center line-clamp-1">{match.home_team}</span>
              </div>

              <div className="flex flex-col items-center w-1/3">
                <div className="text-3xl font-black text-gray-900 mb-1">{match.home_score} - {match.away_score}</div>
                <div className="text-xs text-[#DC143C] font-bold uppercase tracking-wider animate-pulse">Live</div>
              </div>

              <div className="flex flex-col items-center gap-2 w-1/3">
                <div className="w-14 h-14 p-2 rounded-full border-2 border-gray-50 shadow-sm">
                  <Image src={match.away_flag || "https://via.placeholder.com/50"} width={56} height={56} alt={match.away_team} className="w-full h-full object-contain rounded-full" />
                </div>
                <span className="font-bold text-gray-800 text-sm text-center line-clamp-1">{match.away_team}</span>
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500 px-2 border-t border-gray-50 pt-4">
              <div className="flex items-center gap-1">
                <span>{match.status_note || "1st Half"}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-red-500 font-bold">Live</span>
              </div>
            </div>
            <div className="text-center mt-3 text-[10px] text-gray-400 font-medium">
              {match.venue || "Stadium"} • {match.tournament || "Tournament"}
            </div>
          </Link>
        ))}

        {/* Finished Matches */}
        {finishedMatches?.map((match: any) => (
          <Link href={`/match/${match.id}`} key={match.id} className="block bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 opacity-80 mb-4 hover:opacity-100 transition-opacity">
            <div className="flex justify-between items-center mb-2">
              <div className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full mx-auto mb-2">FT</div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3 w-1/3">
                <div className="w-10 h-10 p-1.5 rounded-full border border-gray-100">
                  <Image src={match.home_flag || "https://via.placeholder.com/50"} width={40} height={40} alt={match.home_team} className="w-full h-full object-contain rounded-full" />
                </div>
                <span className="font-bold text-gray-700 text-sm line-clamp-1">{match.home_team}</span>
              </div>

              <div className="text-xl font-bold text-gray-900 w-1/3 text-center">{match.home_score} - {match.away_score}</div>

              <div className="flex items-center gap-3 flex-row-reverse w-1/3">
                <div className="w-10 h-10 p-1.5 rounded-full border border-gray-100">
                  <Image src={match.away_flag || "https://via.placeholder.com/50"} width={40} height={40} alt={match.away_team} className="w-full h-full object-contain rounded-full" />
                </div>
                <span className="font-bold text-gray-700 text-sm line-clamp-1">{match.away_team}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Upcoming Section */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 text-lg mb-4">Upcoming Fixtures</h3>
        {upcomingMatches?.map((match: any) => (
          <Link href={`/match/${match.id}`} key={match.id} className="block bg-white rounded-[24px] p-4 shadow-sm border border-gray-100 flex items-center justify-between mb-3 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 w-1/3">
              <Image src={match.home_flag || "https://via.placeholder.com/50"} width={32} height={32} alt={match.home_team} className="rounded-full object-cover w-8 h-8" />
              <span className="font-bold text-gray-800 text-sm line-clamp-1">{match.home_team}</span>
            </div>

            <div className="flex flex-col items-center w-1/3">
              <span className="text-[#DC143C] font-bold text-lg">{new Date(match.match_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="text-[10px] text-gray-400 font-bold uppercase">{new Date(match.match_time).toLocaleDateString([], { day: 'numeric', month: 'short' })}</span>
            </div>

            <div className="flex items-center gap-3 w-1/3 justify-end">
              <span className="font-bold text-gray-800 text-sm line-clamp-1">{match.away_team}</span>
              <Image src={match.away_flag || "https://via.placeholder.com/50"} width={32} height={32} alt={match.away_team} className="rounded-full object-cover w-8 h-8" />
            </div>
          </Link>
        ))}
        {(!upcomingMatches || upcomingMatches.length === 0) && (
          <div className="text-center text-gray-400 text-sm py-4">No upcoming matches scheduled.</div>
        )}
      </div>
    </div>
  );
}

