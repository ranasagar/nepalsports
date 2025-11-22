import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Play } from 'lucide-react-native';
import { supabase } from '../lib/supabase';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Mock Data Fallback
const MOCK_MATCHES = [
    { id: 1, home_team: 'Nepal', away_team: 'UAE', home_score: '178/4', away_score: '120/6', status: 'LIVE', target: 'UAE needs 59 runs in 24 balls', home_flag: 'https://flagcdn.com/w80/np.png', away_flag: 'https://flagcdn.com/w80/ae.png', sport: 'Cricket' },
    { id: 2, home_team: 'India', away_team: 'Pakistan', home_score: '240/5', away_score: '200/8', status: 'Innings Break', target: 'Target: 241', home_flag: 'https://flagcdn.com/w80/in.png', away_flag: 'https://flagcdn.com/w80/pk.png', sport: 'Cricket' },
];

const UPCOMING_MATCHES = [
    { id: 3, home_team: 'Sweden', away_team: 'Switzerland', time: '04:30 PM', date: '03.07', home_flag: 'https://flagcdn.com/w80/se.png', away_flag: 'https://flagcdn.com/w80/ch.png' },
    { id: 4, home_team: 'Belgium', away_team: 'Japan', time: '02:00 PM', date: '04.07', home_flag: 'https://flagcdn.com/w80/be.png', away_flag: 'https://flagcdn.com/w80/jp.png' },
    { id: 5, home_team: 'France', away_team: 'Argentina', time: '3:00 PM', date: 'Today', home_flag: 'https://flagcdn.com/w80/fr.png', away_flag: 'https://flagcdn.com/w80/ar.png', isLive: true, score: '4-2' },
];

export default function Home() {
    const router = useRouter();
    const [matches, setMatches] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMatches();
    }, []);

    async function fetchMatches() {
        try {
            const { data, error } = await supabase.from('matches').select('*').order('date', { ascending: true });
            setMatches(error || !data || data.length === 0 ? MOCK_MATCHES : data);
        } catch (e) {
            setMatches(MOCK_MATCHES);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View className="flex-1 bg-[#F8FBFF]">
            <StatusBar style="dark" />

            {/* Header */}
            <View className="pt-14 pb-4 px-6 flex-row justify-between items-center bg-white shadow-sm z-10">
                <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 bg-[#003087] rounded-full items-center justify-center shadow-md">
                        <Image source={{ uri: 'https://flagcdn.com/w40/np.png' }} className="w-6 h-6" resizeMode="contain" />
                    </View>
                    <Text className="text-2xl font-bold text-gray-900 font-mukta">Matches</Text>
                </View>
                <TouchableOpacity className="p-2 bg-red-50 rounded-full relative">
                    <Bell size={20} color="#DC143C" />
                    <View className="absolute top-2 right-2 w-2 h-2 bg-[#DC143C] rounded-full border border-white" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Nav Tabs */}
                <View className="flex-row justify-between px-6 py-4 bg-white border-b border-gray-50">
                    {['LiveTV', 'Matches', 'Leagues'].map((item, index) => (
                        <TouchableOpacity key={index} onPress={() => index === 0 && router.push('/match/live')}>
                            <Text className={`text-sm font-bold ${index === 1 ? 'text-[#003087]' : 'text-gray-400'}`}>
                                {item}
                            </Text>
                            {index === 1 && <View className="h-1 w-full bg-[#003087] rounded-full mt-1" />}
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Live TV Banner */}
                <View className="mt-6 mx-6 h-48 rounded-3xl overflow-hidden relative shadow-lg shadow-blue-200">
                    <Image
                        source={{ uri: 'https://img.freepik.com/free-photo/soccer-players-action-professional-stadium_654080-1130.jpg' }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} className="absolute inset-0" />

                    <View className="absolute inset-0 items-center justify-center">
                        <View className="flex-row items-center justify-between w-full px-8 mb-4">
                            <Image source={{ uri: 'https://flagcdn.com/w80/ar.png' }} className="w-12 h-12 rounded-full border-2 border-white" />
                            <Image source={{ uri: 'https://flagcdn.com/w80/de.png' }} className="w-12 h-12 rounded-full border-2 border-white" />
                        </View>

                        <TouchableOpacity
                            onPress={() => router.push('/match/live')}
                            className="bg-[#FFD700] px-6 py-2.5 rounded-xl flex-row items-center gap-2 shadow-md"
                        >
                            <View className="w-6 h-6 bg-black/10 rounded-full items-center justify-center">
                                <Play size={12} color="black" fill="black" />
                            </View>
                            <Text className="text-black font-bold text-xs uppercase tracking-wide">Watch Live</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* League Header */}
                <View className="mt-8 mx-6 bg-white rounded-t-3xl p-4 pb-2 border-b border-gray-50">
                    <Text className="text-center text-gray-400 text-xs font-bold uppercase">UEFA Champions League</Text>
                </View>

                {/* Live Match Card */}
                <View className="mx-6 bg-white rounded-b-3xl p-6 shadow-sm border border-gray-50 mb-6">
                    <View className="items-center mb-4">
                        <View className="bg-[#22C55E] px-3 py-1 rounded-full flex-row items-center gap-1">
                            <View className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                            <Text className="text-white text-[10px] font-bold">71'</Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => router.push(`/match/${matches[0]?.id || 1}`)}>
                        <View className="flex-row justify-between items-center mb-4">
                            <View className="items-center flex-1">
                                <Text className="font-bold text-gray-900 text-sm mb-2">{matches[0]?.home_team}</Text>
                                <Image source={{ uri: matches[0]?.home_flag }} className="w-10 h-10 rounded-full shadow-sm" />
                            </View>

                            <View className="items-center flex-1">
                                <Text className="text-3xl font-bold text-[#003087] font-mukta">{matches[0]?.home_score}</Text>
                                <Text className="text-[10px] text-gray-400 font-bold my-1">VS</Text>
                                <Text className="text-2xl font-bold text-gray-400 font-mukta">{matches[0]?.away_score}</Text>
                            </View>

                            <View className="items-center flex-1">
                                <Text className="font-bold text-gray-900 text-sm mb-2">{matches[0]?.away_team}</Text>
                                <Image source={{ uri: matches[0]?.away_flag }} className="w-10 h-10 rounded-full shadow-sm" />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View className="items-center">
                        <Text className="text-gray-400 text-[10px] font-bold">Etihad Stadium</Text>
                        <Text className="text-blue-500 text-[10px] font-bold mt-0.5">UEFA Champions League 12:45 AM</Text>
                        <TouchableOpacity className="mt-3 flex-row items-center gap-1">
                            <Text className="text-[#22C55E] text-[10px] font-bold uppercase">See all</Text>
                            <View className="w-1 h-1 bg-[#22C55E] rounded-full" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Upcoming List */}
                <View className="mx-6 mb-8">
                    <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">FIFA World Cup</Text>
                    {UPCOMING_MATCHES.map((match) => (
                        <View key={match.id} className="bg-white p-4 rounded-2xl flex-row justify-between items-center shadow-sm border border-gray-50 mb-3">
                            <View className="flex-row items-center gap-3 flex-1">
                                <Text className="text-gray-900 font-bold text-sm w-16">{match.home_team}</Text>
                                <Image source={{ uri: match.home_flag }} className="w-8 h-6 rounded shadow-sm" />
                            </View>

                            <View className="items-center px-4">
                                <Text className="text-[#DC143C] font-bold text-xs">{match.time}</Text>
                                <Text className="text-gray-400 text-[8px] font-bold">{match.date}</Text>
                            </View>

                            <View className="flex-row items-center gap-3 flex-1 justify-end">
                                <Image source={{ uri: match.away_flag }} className="w-8 h-6 rounded shadow-sm" />
                                <Text className="text-gray-900 font-bold text-sm w-16 text-right">{match.away_team}</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}
