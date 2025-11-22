import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Menu, Search } from 'lucide-react-native';
import { MatchCard } from '../../components/MatchCard'; // Assuming this exists from previous session
import { KhukuriPointsBadge } from '../../components/KhukuriPointsBadge'; // Assuming this exists

// Mock Data
const LIVE_MATCHES = [
    { id: '1', team1: 'Nepal', team2: 'UAE', score1: '145/3', score2: '142/9', status: 'LIVE', type: 'Cricket' },
    { id: '2', team1: 'St. Xaviers', team2: 'Budhanilkantha', score1: '2', score2: '1', status: 'LIVE', type: 'Football' },
];

const FEATURED_MATCH = {
    title: "ACC Premier Cup Final",
    team1: "Nepal",
    team2: "UAE",
    time: "LIVE NOW",
    venue: "TU Cricket Ground"
};

export default function HomeScreen() {
    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="light" />

            {/* Fixed Royal Blue Header */}
            <View className="pt-12 pb-4 px-4 bg-[#0052D4] rounded-b-[30px] z-10 shadow-xl">
                <View className="flex-row justify-between items-center mb-4">
                    <TouchableOpacity>
                        <Menu color="white" size={24} />
                    </TouchableOpacity>

                    <View className="flex-row items-center gap-2">
                        {/* Logo would go here */}
                        <Text className="text-white font-bold text-xl tracking-wider">NepalSports</Text>
                    </View>

                    <TouchableOpacity>
                        <Image
                            source={{ uri: 'https://i.pravatar.cc/100' }}
                            className="w-9 h-9 rounded-full border-2 border-white/30"
                        />
                    </TouchableOpacity>
                </View>

                <View className="flex-row justify-between items-end px-1">
                    <View>
                        <Text className="text-blue-200 text-sm font-medium">Namaste,</Text>
                        <Text className="text-white text-2xl font-bold">Aakash! 👋</Text>
                    </View>
                    <KhukuriPointsBadge points={1250} />
                </View>

                {/* Search Bar */}
                <View className="mt-6 bg-white/10 border border-white/20 rounded-2xl flex-row items-center px-4 py-3">
                    <Search color="rgba(255,255,255,0.6)" size={20} />
                    <Text className="text-white/60 ml-3 font-medium">Search matches, players, schools...</Text>
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

                {/* Hero Section - Featured Match */}
                <View className="mt-6 px-4">
                    <Text className="text-gray-800 font-bold text-lg mb-3 ml-1">Featured Match 🔥</Text>
                    <View className="h-48 w-full rounded-3xl overflow-hidden relative shadow-lg shadow-blue-900/20">
                        <Image
                            source={{ uri: 'https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1280,q_80/lsci/db/PICTURES/CMS/354500/354553.jpg' }}
                            className="w-full h-full absolute"
                            resizeMode="cover"
                        />
                        <LinearGradient
                            colors={['transparent', 'rgba(0,0,0,0.8)']}
                            className="absolute inset-0 justify-end p-5"
                        >
                            <View className="bg-[#E61E2A] self-start px-3 py-1 rounded-full mb-2">
                                <Text className="text-white text-xs font-bold">LIVE NOW</Text>
                            </View>
                            <Text className="text-white text-2xl font-bold">{FEATURED_MATCH.team1} vs {FEATURED_MATCH.team2}</Text>
                            <Text className="text-white/80 font-medium">{FEATURED_MATCH.title} • {FEATURED_MATCH.venue}</Text>
                        </LinearGradient>
                    </View>
                </View>

                {/* Live Matches Horizontal Scroll */}
                <View className="mt-8">
                    <View className="flex-row justify-between items-center px-5 mb-3">
                        <Text className="text-gray-800 font-bold text-lg">Live Matches 🔴</Text>
                        <TouchableOpacity><Text className="text-[#0052D4] font-semibold">View All</Text></TouchableOpacity>
                    </View>

                    <FlatList
                        horizontal
                        data={LIVE_MATCHES}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20, gap: 15 }}
                        renderItem={({ item }) => (
                            <View className="w-72 bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mr-4">
                                <View className="flex-row justify-between mb-4">
                                    <View className="bg-red-50 px-2 py-1 rounded-lg border border-red-100">
                                        <Text className="text-[#E61E2A] text-xs font-bold">• LIVE</Text>
                                    </View>
                                    <Text className="text-gray-400 text-xs font-medium">{item.type}</Text>
                                </View>

                                <View className="flex-row justify-between items-center mb-2">
                                    <View className="flex-row items-center gap-2">
                                        <View className="w-6 h-6 rounded-full bg-gray-200" />
                                        <Text className="font-bold text-gray-800 text-base">{item.team1}</Text>
                                    </View>
                                    <Text className="font-bold text-gray-800 text-base">{item.score1}</Text>
                                </View>

                                <View className="flex-row justify-between items-center">
                                    <View className="flex-row items-center gap-2">
                                        <View className="w-6 h-6 rounded-full bg-gray-200" />
                                        <Text className="font-bold text-gray-800 text-base">{item.team2}</Text>
                                    </View>
                                    <Text className="font-bold text-gray-800 text-base">{item.score2}</Text>
                                </View>

                                <View className="mt-4 pt-3 border-t border-gray-100">
                                    <Text className="text-orange-500 text-xs font-medium text-center">Nepal need 4 runs in 2 balls</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>

                {/* Quick Tabs */}
                <View className="mt-8 px-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10 }}>
                        {['All', 'Cricket cricket', 'Football ⚽', 'School 🏫', 'Volleyball 🏐'].map((tab, i) => (
                            <TouchableOpacity key={i} className={`px-6 py-2.5 rounded-full ${i === 0 ? 'bg-[#0052D4]' : 'bg-white border border-gray-200'}`}>
                                <Text className={`font-semibold ${i === 0 ? 'text-white' : 'text-gray-600'}`}>{tab}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Viral Reels Section */}
                <View className="mt-8 px-4">
                    <Text className="text-gray-800 font-bold text-lg mb-3 ml-1">Viral Moments ⚡</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12 }}>
                        {[1, 2, 3].map((item) => (
                            <View key={item} className="w-32 h-48 bg-gray-800 rounded-2xl overflow-hidden relative">
                                <Image
                                    source={{ uri: `https://picsum.photos/200/300?random=${item}` }}
                                    className="w-full h-full opacity-80"
                                />
                                <View className="absolute bottom-2 left-2 right-2">
                                    <Text className="text-white text-xs font-bold leading-tight">Dipendra Singh Airee hits 6 sixes!</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

            </ScrollView>
        </View>
    );
}
