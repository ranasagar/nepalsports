import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Crown, ChevronRight, Trophy } from 'lucide-react-native';
import Slider from '@react-native-community/slider';

const { width } = Dimensions.get('window');

export default function PredictionLeagueScreen() {
    const router = useRouter();
    const [prediction, setPrediction] = useState(150);

    return (
        <View className="flex-1 bg-[#F8FBFF]">
            <StatusBar style="light" />

            {/* Header: Deep Himalayan Blue */}
            <View className="bg-[#003087] pt-12 pb-6 px-4 rounded-b-[30px] shadow-xl z-10">
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 bg-white/10 rounded-full">
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-xl ml-3">Prediction League</Text>
                </View>

                <View className="bg-white/10 p-5 rounded-2xl border border-white/20 flex-row items-center justify-between backdrop-blur-md">
                    <View>
                        <Text className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">Your Season Rank</Text>
                        <View className="flex-row items-baseline gap-1">
                            <Text className="text-white text-4xl font-bold">#452</Text>
                            <Text className="text-blue-200 text-sm font-medium">/ 12k</Text>
                        </View>
                    </View>
                    <View className="items-end">
                        <Text className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-1">Total Points</Text>
                        <View className="flex-row items-center gap-1">
                            <Trophy size={20} color="#FACC15" />
                            <Text className="text-[#FACC15] text-3xl font-bold">1,250</Text>
                        </View>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

                {/* Active Prediction Card */}
                <View className="m-4 mt-6 bg-white rounded-3xl p-6 shadow-lg shadow-blue-900/5 border border-gray-100">
                    <View className="flex-row justify-between items-center mb-6">
                        <View className="flex-row items-center gap-2">
                            <View className="w-2 h-6 bg-[#DC143C] rounded-full" />
                            <Text className="text-[#003087] font-bold text-lg">Predict & Win</Text>
                        </View>
                        <View className="bg-red-50 px-3 py-1 rounded-full border border-red-100">
                            <Text className="text-[#DC143C] text-[10px] font-bold">CLOSES IN 2H</Text>
                        </View>
                    </View>

                    <View className="flex-row justify-between items-center mb-8 px-2">
                        <View className="items-center gap-2">
                            <Image source={{ uri: 'https://flagcdn.com/w320/np.png' }} className="w-14 h-14 rounded-full border-2 border-gray-100" />
                            <Text className="font-bold text-gray-900">Nepal</Text>
                        </View>
                        <View className="items-center">
                            <Text className="text-gray-300 font-bold text-2xl">VS</Text>
                        </View>
                        <View className="items-center gap-2">
                            <Image source={{ uri: 'https://flagcdn.com/w320/ae.png' }} className="w-14 h-14 rounded-full border-2 border-gray-100" />
                            <Text className="font-bold text-gray-900">UAE</Text>
                        </View>
                    </View>

                    <View className="items-center mb-8 bg-gray-50 p-6 rounded-2xl border border-gray-100">
                        <Text className="text-gray-500 font-bold uppercase text-xs mb-3 tracking-widest">Nepal's Total Runs?</Text>
                        <Text className="text-6xl font-bold text-[#003087] mb-4">{Math.floor(prediction)}</Text>
                        <Slider
                            style={{ width: '100%', height: 40 }}
                            minimumValue={100}
                            maximumValue={300}
                            minimumTrackTintColor="#003087"
                            maximumTrackTintColor="#E5E7EB"
                            thumbTintColor="#DC143C"
                            value={prediction}
                            onValueChange={setPrediction}
                        />
                        <View className="flex-row justify-between w-full mt-2">
                            <Text className="text-gray-400 text-xs font-bold">100</Text>
                            <Text className="text-gray-400 text-xs font-bold">300</Text>
                        </View>
                    </View>

                    <TouchableOpacity className="bg-[#003087] py-4 rounded-2xl shadow-lg shadow-blue-200 items-center active:scale-95 transition-transform">
                        <Text className="text-white font-bold text-lg tracking-wide">Lock Prediction 🔒</Text>
                    </TouchableOpacity>
                </View>

                {/* Leaderboard Preview */}
                <View className="px-4 mb-10">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-[#003087] font-bold text-lg">Top Predictors</Text>
                        <TouchableOpacity className="flex-row items-center gap-1">
                            <Text className="text-gray-400 text-xs font-bold uppercase">View All</Text>
                            <ChevronRight size={14} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>

                    {[1, 2, 3].map((rank) => (
                        <View key={rank} className="flex-row items-center bg-white p-4 rounded-2xl mb-3 border border-gray-100 shadow-sm">
                            <View className={`w-8 h-8 items-center justify-center rounded-full mr-4 ${rank === 1 ? 'bg-yellow-50 border border-yellow-100' : rank === 2 ? 'bg-gray-50 border border-gray-200' : 'bg-orange-50 border border-orange-100'}`}>
                                <Text className={`font-bold ${rank === 1 ? 'text-yellow-600' : rank === 2 ? 'text-gray-600' : 'text-orange-600'}`}>{rank}</Text>
                            </View>
                            <Image source={{ uri: `https://i.pravatar.cc/100?img=${rank + 10}` }} className="w-10 h-10 rounded-full mr-3 border border-gray-100" />
                            <View className="flex-1">
                                <Text className="font-bold text-gray-900 text-base">User {rank}</Text>
                                <Text className="text-gray-400 text-xs font-medium">9{rank}% Accuracy</Text>
                            </View>
                            <View className="bg-blue-50 px-3 py-1 rounded-full">
                                <Text className="font-bold text-[#003087] text-sm">2,4{rank}0 pts</Text>
                            </View>
                        </View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}
