import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Share2, Award, TrendingUp, MapPin, Calendar, Menu } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';

const { width, height } = Dimensions.get('window');

// Mock Data
const MOCK_PLAYER_DATA = {
    id: 1,
    name: 'Rohit Paudel',
    role: 'Captain • Batsman',
    team: 'Nepal National Team',
    image: 'https://p.imgci.com/db/PICTURES/CMS/326200/326262.png',
    flag: 'https://flagcdn.com/w320/np.png',
    sport: 'Cricket',
    bio: 'Leading Nepal to new heights in international cricket. Known for calm leadership and solid middle-order batting.',
    stats: {
        matches: 54,
        runs: 1450,
        avg: 32.5,
        sr: 125.4,
        age: 22
    },
    timeline: [
        { year: '2024', event: 'Led Nepal in T20 World Cup' },
        { year: '2023', event: 'Scored maiden ODI Century' },
        { year: '2018', event: 'Youngest player to debut for Nepal' }
    ]
};

const TABS = ['Feed', 'Statistics', 'Career', 'Video'];

export default function PlayerProfileScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [player, setPlayer] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Statistics');

    useEffect(() => {
        fetchPlayerDetails();
    }, [id]);

    async function fetchPlayerDetails() {
        try {
            const { data, error } = await supabase
                .from('players')
                .select('*, teams(*)')
                .eq('id', id)
                .single();

            if (error || !data) {
                setPlayer(MOCK_PLAYER_DATA);
            } else {
                setPlayer(data);
            }
        } catch (e) {
            setPlayer(MOCK_PLAYER_DATA);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-[#F8FBFF]">
                <ActivityIndicator size="large" color="#003087" />
            </View>
        );
    }

    const isCricket = player.sport === 'cricket' || player.teams?.sport === 'cricket';
    const mainStatLabel = isCricket ? 'Runs' : 'Goals';
    const mainStatValue = isCricket ? (player.stats?.runs || 0) : (player.stats?.goals || 0);

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="light" />

            {/* Hero Image Section */}
            <View className="h-[65%] relative">
                <Image
                    source={{ uri: player.image_url || player.image }}
                    className="w-full h-full"
                    resizeMode="cover"
                />

                {/* Gradient Overlay */}
                <LinearGradient
                    colors={['transparent', 'rgba(0,48,135,0.4)', 'rgba(0,48,135,0.9)']}
                    className="absolute inset-0"
                />

                {/* Header Actions */}
                <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center z-10">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 bg-black/20 rounded-full backdrop-blur-sm">
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-black/20 rounded-full backdrop-blur-sm">
                        <Menu color="white" size={24} />
                    </TouchableOpacity>
                </View>

                {/* Player Info Overlay */}
                <View className="absolute bottom-0 left-0 right-0 p-6 pb-12">
                    <View className="flex-row items-center gap-3 mb-2">
                        <Image source={{ uri: player.teams?.logo_url || player.flag }} className="w-8 h-6 rounded shadow-sm" />
                        <Text className="text-white/80 font-bold uppercase tracking-widest text-xs">{player.position || player.role}</Text>
                    </View>

                    <Text className="text-white text-5xl font-bold font-mukta leading-tight mb-1 uppercase shadow-lg">
                        {player.name.split(' ')[0]}
                    </Text>
                    <Text className="text-white text-5xl font-bold font-mukta leading-tight mb-6 uppercase shadow-lg text-white/90">
                        {player.name.split(' ').slice(1).join(' ')}
                    </Text>

                    <Text className="text-white/70 text-xs font-medium mb-6 italic">
                        {player.teams?.name || player.team}
                    </Text>

                    {/* Key Stats Row */}
                    <View className="flex-row justify-between items-center bg-white/10 rounded-2xl p-4 backdrop-blur-md border border-white/10">
                        <View className="items-center flex-1">
                            <Text className="text-3xl font-bold text-white font-mukta">{player.stats?.matches || player.stats?.appearances || 0}</Text>
                            <Text className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Games</Text>
                        </View>
                        <View className="w-[1px] h-8 bg-white/20" />
                        <View className="items-center flex-1">
                            <Text className="text-3xl font-bold text-white font-mukta">{mainStatValue}</Text>
                            <Text className="text-white/60 text-[10px] uppercase font-bold tracking-wider">{mainStatLabel}</Text>
                        </View>
                        <View className="w-[1px] h-8 bg-white/20" />
                        <View className="items-center flex-1">
                            <Text className="text-3xl font-bold text-white font-mukta">{player.stats?.age || 22}</Text>
                            <Text className="text-white/60 text-[10px] uppercase font-bold tracking-wider">Years</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Bottom Content Section */}
            <View className="flex-1 bg-white -mt-6 rounded-t-[30px] overflow-hidden">
                <View className="flex-row justify-between items-center px-8 pt-6 pb-4 border-b border-gray-50">
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className="items-center"
                        >
                            <Text className={`text-sm font-bold ${activeTab === tab ? 'text-[#003087]' : 'text-gray-300'}`}>
                                {tab}
                            </Text>
                            {activeTab === tab && <View className="w-1 h-1 bg-[#DC143C] rounded-full mt-1" />}
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView className="flex-1 p-6" showsVerticalScrollIndicator={false}>
                    {activeTab === 'Statistics' && (
                        <View>
                            <View className="flex-row justify-between items-center mb-4">
                                <Text className="text-gray-800 font-bold text-lg font-mukta">Performance</Text>
                                <TouchableOpacity>
                                    <Text className="text-[#DC143C] text-xs font-bold">View All</Text>
                                </TouchableOpacity>
                            </View>

                            <View className="space-y-4">
                                {isCricket ? (
                                    <>
                                        <StatRow label="Batting Average" value={player.stats?.avg || 0} max={60} />
                                        <StatRow label="Strike Rate" value={player.stats?.sr || 0} max={200} />
                                    </>
                                ) : (
                                    <>
                                        <StatRow label="Assists" value={player.stats?.assists || 0} max={20} />
                                        <StatRow label="Clean Sheets" value={player.stats?.clean_sheets || 0} max={15} />
                                    </>
                                )}
                            </View>

                            <View className="mt-8 p-4 bg-[#F8FBFF] rounded-2xl border border-blue-50">
                                <Text className="text-gray-500 text-sm leading-6 font-medium">
                                    "{player.bio}"
                                </Text>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

const StatRow = ({ label, value, max }: { label: string, value: number, max: number }) => {
    const percentage = Math.min((value / max) * 100, 100);
    return (
        <View>
            <View className="flex-row justify-between mb-2">
                <Text className="text-gray-400 text-xs font-bold uppercase tracking-wide">{label}</Text>
                <Text className="text-gray-800 font-bold">{value}</Text>
            </View>
            <View className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <View
                    className="h-full bg-[#003087] rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </View>
        </View>
    );
};
