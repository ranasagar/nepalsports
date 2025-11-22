import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Share2, Settings, Maximize2, Volume2, MessageCircle, Mic } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ALSO_LIVE_MATCHES = [
    {
        id: 1,
        home_team: 'Brazil',
        away_team: 'Spain',
        home_flag: 'https://flagcdn.com/w80/br.png',
        away_flag: 'https://flagcdn.com/w80/es.png',
        score: '2 - 1',
        time: '71\'',
        league: 'UEFA Champions League',
        stadium: 'Etihad Stadium'
    },
    {
        id: 2,
        home_team: 'Uruguay',
        away_team: 'Canada',
        home_flag: 'https://flagcdn.com/w80/uy.png',
        away_flag: 'https://flagcdn.com/w80/ca.png',
        score: '2 - 1',
        time: '71\'',
        league: 'UEFA Champions League',
        stadium: 'Etihad Stadium'
    }
];

export default function LiveMatchScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-[#F8FBFF]">
            <StatusBar style="light" hidden />

            {/* Video Player Section */}
            <View className="h-[40%] bg-black relative">
                <Image
                    source={{ uri: 'https://img.freepik.com/free-photo/soccer-players-action-professional-stadium_654080-1130.jpg' }}
                    className="w-full h-full opacity-80"
                    resizeMode="cover"
                />

                {/* Overlay Controls */}
                <LinearGradient colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.6)']} className="absolute inset-0 justify-between p-4">
                    <View className="flex-row justify-between items-center mt-8">
                        <TouchableOpacity onPress={() => router.back()} className="p-2 bg-white/20 rounded-full backdrop-blur-md">
                            <ArrowLeft color="white" size={20} />
                        </TouchableOpacity>
                        <View className="bg-red-600 px-3 py-1 rounded-md flex-row items-center gap-1">
                            <View className="w-2 h-2 bg-white rounded-full animate-pulse" />
                            <Text className="text-white text-xs font-bold uppercase">Live</Text>
                        </View>
                    </View>

                    <View className="items-center">
                        <View className="w-16 h-16 bg-white/20 rounded-full items-center justify-center backdrop-blur-md border border-white/30">
                            <View className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1" />
                        </View>
                    </View>

                    <View className="flex-row justify-between items-center mb-2">
                        <View className="flex-row gap-4">
                            <Volume2 color="white" size={20} />
                            <Text className="text-white font-bold">04:32 / 90:00</Text>
                        </View>
                        <View className="flex-row gap-4">
                            <MessageCircle color="white" size={20} />
                            <Settings color="white" size={20} />
                            <Maximize2 color="white" size={20} />
                        </View>
                    </View>
                </LinearGradient>

                {/* Progress Bar */}
                <View className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
                    <View className="w-[30%] h-full bg-[#DC143C]" />
                </View>
            </View>

            <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 40 }}>
                {/* Match Info */}
                <View className="p-5 bg-white rounded-b-3xl shadow-sm mb-6">
                    <View className="flex-row justify-between items-start mb-4">
                        <View>
                            <Text className="text-2xl font-bold text-gray-900 font-mukta">Argentina vs Germany</Text>
                            <Text className="text-gray-500 text-xs font-bold mt-1">Etihad Stadium</Text>
                            <Text className="text-blue-500 text-xs font-bold mt-0.5">FIFA World Cup, 2022 12:45 AM</Text>

                            <View className="flex-row items-center gap-2 mt-3">
                                <View className="w-4 h-4 bg-gray-200 rounded-sm" />
                                <Text className="text-gray-600 text-xs font-bold">Bein Sports</Text>
                            </View>
                        </View>

                        <View className="items-end">
                            <View className="flex-row items-center gap-1 mb-1">
                                <Mic size={12} color="#6B7280" />
                                <Text className="text-gray-500 text-xs font-bold uppercase">Commentators</Text>
                            </View>
                            <Text className="text-gray-800 text-xs font-bold">Bin Yamin</Text>
                            <Text className="text-gray-800 text-xs font-bold">Sheikh Shadhin</Text>

                            <TouchableOpacity className="flex-row items-center gap-1 mt-3 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                <Text className="text-gray-600 text-xs font-bold">Arabic Commentry</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex-row gap-4 mt-2">
                        <TouchableOpacity className="p-2 bg-gray-50 rounded-full border border-gray-100">
                            <Share2 size={18} color="#374151" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Also Live Section */}
                <View className="px-5">
                    <Text className="text-gray-900 font-bold text-lg mb-4">Also Live</Text>

                    {ALSO_LIVE_MATCHES.map((match) => (
                        <View key={match.id} className="bg-white rounded-3xl p-5 mb-4 shadow-sm border border-gray-50 relative overflow-hidden">
                            {/* Green Time Badge */}
                            <View className="absolute top-4 left-1/2 -translate-x-1/2 bg-[#22C55E] px-3 py-1 rounded-full z-10 flex-row items-center gap-1">
                                <ClockIcon />
                                <Text className="text-white text-xs font-bold">{match.time}</Text>
                            </View>

                            <View className="flex-row justify-between items-center mt-6 mb-6">
                                <View className="items-center flex-1">
                                    <Text className="text-gray-600 font-bold text-sm mb-2">{match.home_team}</Text>
                                    <Image source={{ uri: match.home_flag }} className="w-10 h-10 rounded-full shadow-sm" />
                                </View>

                                <View className="items-center flex-1">
                                    <Text className="text-3xl font-bold text-gray-900 font-mukta">{match.score}</Text>
                                </View>

                                <View className="items-center flex-1">
                                    <Text className="text-gray-600 font-bold text-sm mb-2">{match.away_team}</Text>
                                    <Image source={{ uri: match.away_flag }} className="w-10 h-10 rounded-full shadow-sm" />
                                </View>
                            </View>

                            <View className="items-center mb-4">
                                <Text className="text-gray-400 text-[10px] font-bold uppercase">{match.stadium}</Text>
                                <Text className="text-blue-500 text-[10px] font-bold mt-0.5">{match.league}</Text>
                                <View className="flex-row items-center gap-1 mt-1">
                                    <View className="w-3 h-3 bg-gray-200 rounded-sm" />
                                    <Text className="text-gray-400 text-[10px] font-bold">Bein Sports</Text>
                                </View>
                            </View>

                            <TouchableOpacity className="bg-[#FFD700] self-center px-8 py-3 rounded-xl shadow-md shadow-yellow-100 flex-row items-center gap-2">
                                <View className="w-0.5 h-3 bg-black/20 mr-1" />
                                <View className="w-0.5 h-3 bg-black/20" />
                                <Text className="text-gray-900 font-bold text-xs uppercase tracking-wide">Watch Live</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const ClockIcon = () => (
    <View className="w-3 h-3 rounded-full border border-white items-center justify-center">
        <View className="w-0.5 h-1 bg-white rounded-full" />
    </View>
);
