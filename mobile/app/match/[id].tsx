import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, MoreHorizontal, Share2, Trophy, Users, BarChart2, Calendar } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';
import { FloatingPlayerOfMatch } from '../../components/FloatingPlayerOfMatch';

const { width } = Dimensions.get('window');

// Mock Data Fallback (Used if 'details' column is empty)
const MOCK_DETAILS = {
    voting: {
        home: 45,
        away: 35,
        draw: 20,
        home_votes: '1.6k',
        away_votes: '1.2k',
        draw_votes: '0.8k'
    },
    referee: {
        name: 'Domenico Rocca',
        country: 'Italy',
        image: 'https://i.pravatar.cc/150?img=68',
        avg_cards: { yellow: 0.89, red: 0.05 }
    },
    lineups: {
        home: [
            { name: 'Kiran', rating: '7.5', top: '5%', left: '45%' },
            { name: 'San', rating: '6.8', top: '20%', left: '15%' },
            { name: 'Ananta', rating: '7.2', top: '20%', left: '35%' },
            { name: 'Rohit', rating: '7.0', top: '20%', left: '55%' },
            { name: 'Bimal', rating: '6.9', top: '20%', left: '75%' },
            { name: 'Arik', rating: '7.1', top: '40%', left: '30%' },
            { name: 'Pujan', rating: '7.3', top: '40%', left: '50%' },
            { name: 'Laken', rating: '6.8', top: '40%', left: '70%' },
            { name: 'Anjan', rating: '7.8', top: '60%', left: '20%' },
            { name: 'Manish', rating: '7.4', top: '60%', left: '50%' },
            { name: 'Ayush', rating: '7.2', top: '60%', left: '80%' }
        ]
    },
    stats: {
        possession: { home: '55%', away: '45%' },
        shots: { home: 12, away: 8 },
        on_target: { home: 5, away: 3 },
        corners: { home: 6, away: 4 }
    }
};

const TABS = ['Details', 'Lineups', 'Standings', 'Statistics'];

export default function MatchDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [match, setMatch] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Details');

    useEffect(() => {
        fetchMatchDetails();
    }, [id]);

    async function fetchMatchDetails() {
        try {
            const { data, error } = await supabase.from('matches').select('*').eq('id', id).single();
            if (error || !data) {
                setMatch({ ...MOCK_DETAILS, home_team: 'Nepal', away_team: 'UAE', home_score: '0', away_score: '0' }); // Minimal fallback
            } else {
                // Merge fetched data with mock details if 'details' column is missing/empty
                const details = data.details || MOCK_DETAILS;
                setMatch({ ...data, details });
            }
        } catch (e) {
            setMatch({ ...MOCK_DETAILS, home_team: 'Nepal', away_team: 'UAE' });
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <ActivityIndicator size="large" color="#003087" className="flex-1 bg-[#F8FBFF]" />;

    return (
        <View className="flex-1 bg-[#F8FBFF]">
            <StatusBar style="light" />

            {/* Header */}
            <View className="bg-[#003087] pt-12 pb-6 px-4 rounded-b-[30px] shadow-xl z-10">
                <View className="flex-row justify-between items-center mb-6">
                    <TouchableOpacity onPress={() => router.back()}><ArrowLeft color="white" size={24} /></TouchableOpacity>
                    <Text className="text-white font-bold text-lg">Match Info</Text>
                    <TouchableOpacity><MoreHorizontal color="white" size={24} /></TouchableOpacity>
                </View>

                {/* Score Card */}
                <View className="bg-white rounded-3xl p-5 shadow-lg flex-row justify-between items-center mb-4">
                    <View className="items-center flex-1">
                        <Image source={{ uri: match.home_flag }} className="w-12 h-12 rounded shadow-sm mb-2" />
                        <Text className="font-bold text-gray-900 text-xs uppercase">{match.home_team}</Text>
                    </View>
                    <View className="items-center flex-[1.5]">
                        <View className="bg-red-50 px-2 py-0.5 rounded-full mb-1">
                            <Text className="text-[#DC143C] text-[10px] font-bold uppercase">Live</Text>
                        </View>
                        <Text className="text-2xl font-bold text-gray-900 font-mukta">{match.home_score}</Text>
                        <Text className="text-[10px] text-gray-400 font-bold">VS</Text>
                        <Text className="text-xl font-bold text-gray-400 font-mukta">{match.away_score}</Text>
                    </View>
                    <View className="items-center flex-1">
                        <Image source={{ uri: match.away_flag }} className="w-12 h-12 rounded shadow-sm mb-2" />
                        <Text className="font-bold text-gray-900 text-xs uppercase">{match.away_team}</Text>
                    </View>
                </View>

                {/* Tabs */}
                <View className="flex-row justify-between px-2">
                    {TABS.map(tab => (
                        <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} className="items-center">
                            <Text className={`text-xs font-bold mb-1 ${activeTab === tab ? 'text-white' : 'text-white/60'}`}>{tab}</Text>
                            {activeTab === tab && <View className="w-1 h-1 bg-[#DC143C] rounded-full" />}
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                {activeTab === 'Details' && <DetailsTab details={match.details} />}
                {activeTab === 'Lineups' && <LineupsTab details={match.details} homeTeam={match.home_team} />}
                {activeTab === 'Standings' && <StandingsTab />}
                {activeTab === 'Statistics' && <StatisticsTab details={match.details} />}
            </ScrollView>

            <FloatingPlayerOfMatch playerName="Rohit Paudel" teamName="Nepal" stats="87 (55)" imageUrl="https://i.pravatar.cc/150?img=11" />
        </View>
    );
}

// --- Tab Components ---

const DetailsTab = ({ details }: any) => (
    <View className="p-4 space-y-6">
        {/* Voting System */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50">
            <Text className="text-center text-gray-500 text-xs font-bold uppercase mb-4">Who Will Win?</Text>
            <View className="flex-row items-center justify-center gap-4 mb-4">
                {/* Simulated Pie Chart */}
                <View className="w-32 h-32 rounded-full border-[12px] border-blue-500 relative items-center justify-center border-r-green-500 border-b-yellow-400">
                    <View className="absolute w-full h-full rounded-full border-[12px] border-transparent border-l-blue-500 rotate-45" />
                    <Text className="text-2xl font-bold text-blue-600">{details?.voting?.home}%</Text>
                    <Text className="text-[8px] text-blue-600 font-bold">Home</Text>
                </View>
                {/* Legend */}
                <View className="space-y-2">
                    <LegendItem color="bg-blue-500" label="Home" percent={`${details?.voting?.home}%`} />
                    <LegendItem color="bg-green-500" label="Away" percent={`${details?.voting?.away}%`} />
                    <LegendItem color="bg-yellow-400" label="Draw" percent={`${details?.voting?.draw}%`} />
                </View>
            </View>
            <View className="flex-row gap-3">
                <VoteButton label="Home" count={details?.voting?.home_votes} color="text-blue-600" />
                <VoteButton label="Away" count={details?.voting?.away_votes} color="text-green-600" />
                <VoteButton label="Draw" count={details?.voting?.draw_votes} color="text-yellow-600" />
            </View>
        </View>

        {/* Referee Card */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50">
            <Text className="text-center text-gray-500 text-xs font-bold uppercase mb-4">Match Referee</Text>
            <View className="flex-row items-center gap-4">
                <Image source={{ uri: details?.referee?.image }} className="w-14 h-14 rounded-full" />
                <View className="flex-1">
                    <Text className="font-bold text-gray-900">{details?.referee?.name}</Text>
                    <Text className="text-xs text-gray-500 font-bold">{details?.referee?.country}</Text>
                    <View className="flex-row items-center gap-2 mt-1">
                        <Text className="text-xs text-gray-400 font-bold">Avg Cards:</Text>
                        <View className="w-2 h-3 bg-red-500 rounded-[1px]" /><Text className="text-xs font-bold text-gray-600">{details?.referee?.avg_cards?.red}</Text>
                        <View className="w-2 h-3 bg-yellow-400 rounded-[1px]" /><Text className="text-xs font-bold text-gray-600">{details?.referee?.avg_cards?.yellow}</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
);

const LineupsTab = ({ details, homeTeam }: any) => (
    <View className="p-4">
        <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 mb-4 flex-row justify-between items-center">
            <View>
                <Text className="font-bold text-gray-900">{homeTeam}</Text>
                <Text className="text-xs text-gray-500">Avg Age: 24.5 • 4-3-3</Text>
            </View>
            <View className="bg-green-500 px-2 py-1 rounded-md">
                <Text className="text-white text-xs font-bold">7.1</Text>
            </View>
        </View>

        {/* Field View */}
        <View className="bg-[#4ADE80] h-[500px] rounded-3xl relative overflow-hidden border-4 border-white shadow-inner">
            {/* Field Lines */}
            <View className="absolute inset-4 border-2 border-white/30 rounded-xl" />
            <View className="absolute top-1/2 left-4 right-4 h-[1px] bg-white/30" />
            <View className="absolute top-1/2 left-1/2 -translate-x-8 -translate-y-8 w-16 h-16 rounded-full border-2 border-white/30" />

            {/* Players */}
            {details?.lineups?.home?.map((player: any, index: number) => (
                <PlayerMarker key={index} top={player.top} left={player.left} name={player.name} rating={player.rating} />
            ))}
        </View>
    </View>
);

const StandingsTab = () => (
    <View className="p-4">
        <View className="bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
            <View className="bg-gray-50 px-4 py-3 border-b border-gray-100">
                <Text className="text-gray-500 text-xs font-bold uppercase">Group H</Text>
            </View>
            <View className="p-4">
                <View className="flex-row mb-2 opacity-50">
                    <Text className="flex-1 text-[10px] font-bold uppercase">Team</Text>
                    <Text className="w-8 text-center text-[10px] font-bold uppercase">P</Text>
                    <Text className="w-8 text-center text-[10px] font-bold uppercase">W</Text>
                    <Text className="w-8 text-center text-[10px] font-bold uppercase">Pts</Text>
                </View>
                <StandingRow team="Nepal" p="3" w="3" pts="9" flag="https://flagcdn.com/w40/np.png" />
                <StandingRow team="UAE" p="3" w="2" pts="6" flag="https://flagcdn.com/w40/ae.png" />
                <StandingRow team="Oman" p="3" w="1" pts="3" flag="https://flagcdn.com/w40/om.png" />
                <StandingRow team="HK" p="3" w="0" pts="0" flag="https://flagcdn.com/w40/hk.png" />
            </View>
        </View>
    </View>
);

const StatisticsTab = ({ details }: any) => (
    <View className="p-4 space-y-6">
        {/* Pressing Threat Graph */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50">
            <Text className="text-center text-gray-500 text-xs font-bold uppercase mb-4">Pressing Threat</Text>
            <View className="h-32 flex-row items-end justify-between gap-1 px-2">
                {[...Array(20)].map((_, i) => (
                    <View key={i} className="w-2 bg-blue-100 rounded-t-sm relative">
                        <View
                            style={{ height: Math.random() * 80 + 10 }}
                            className={`w-full absolute bottom-0 rounded-t-sm ${i % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'}`}
                        />
                    </View>
                ))}
            </View>
            <View className="flex-row justify-between mt-2">
                <Text className="text-[10px] text-gray-400 font-bold">0'</Text>
                <Text className="text-[10px] text-gray-400 font-bold">45'</Text>
                <Text className="text-[10px] text-gray-400 font-bold">90'</Text>
            </View>
        </View>

        {/* Stats List */}
        <View className="bg-white p-5 rounded-3xl shadow-sm border border-gray-50">
            <StatRow label="Possession" home={details?.stats?.possession?.home} away={details?.stats?.possession?.away} />
            <StatRow label="Shots" home={details?.stats?.shots?.home} away={details?.stats?.shots?.away} />
            <StatRow label="On Target" home={details?.stats?.on_target?.home} away={details?.stats?.on_target?.away} />
            <StatRow label="Corners" home={details?.stats?.corners?.home} away={details?.stats?.corners?.away} />
        </View>
    </View>
);

// --- Helper Components ---

const LegendItem = ({ color, label, percent }: any) => (
    <View className="flex-row items-center gap-2">
        <View className={`w-2 h-2 rounded-full ${color}`} />
        <Text className="text-xs text-gray-500 font-bold w-12">{label}</Text>
        <Text className="text-xs font-bold text-gray-900">{percent}</Text>
    </View>
);

const VoteButton = ({ label, count, color }: any) => (
    <TouchableOpacity className="flex-1 bg-gray-50 py-2 rounded-xl items-center border border-gray-100">
        <Text className={`font-bold text-xs ${color}`}>{label}</Text>
        <Text className="text-[10px] text-gray-400 font-bold">{count}</Text>
    </TouchableOpacity>
);

const PlayerMarker = ({ top, left, name, rating }: any) => (
    <View className="absolute items-center" style={{ top, left }}>
        <View className="w-8 h-8 bg-white rounded-full items-center justify-center shadow-md border border-gray-100">
            <Text className="text-[8px] font-bold text-gray-900">{name.substring(0, 2)}</Text>
        </View>
        <View className="bg-green-600 px-1.5 py-0.5 rounded-md -mt-2 z-10">
            <Text className="text-[8px] text-white font-bold">{rating}</Text>
        </View>
        <Text className="text-[8px] text-white font-bold mt-0.5 shadow-sm">{name}</Text>
    </View>
);

const StandingRow = ({ team, p, w, pts, flag }: any) => (
    <View className="flex-row items-center py-3 border-b border-gray-50 last:border-0">
        <View className="flex-1 flex-row items-center gap-2">
            <Image source={{ uri: flag }} className="w-6 h-4 rounded-sm" />
            <Text className="font-bold text-gray-700 text-xs">{team}</Text>
        </View>
        <Text className="w-8 text-center text-xs text-gray-500 font-bold">{p}</Text>
        <Text className="w-8 text-center text-xs text-gray-500 font-bold">{w}</Text>
        <Text className="w-8 text-center text-xs text-gray-900 font-bold">{pts}</Text>
    </View>
);

const StatRow = ({ label, home, away }: any) => (
    <View className="mb-4 last:mb-0">
        <View className="flex-row justify-between mb-1">
            <Text className="font-bold text-gray-900 text-xs">{home}</Text>
            <Text className="text-[10px] font-bold text-gray-400 uppercase">{label}</Text>
            <Text className="font-bold text-gray-900 text-xs">{away}</Text>
        </View>
        <View className="flex-row h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <View className="bg-blue-500 h-full" style={{ width: '55%' }} />
            <View className="bg-red-500 h-full flex-1" />
        </View>
    </View>
);
