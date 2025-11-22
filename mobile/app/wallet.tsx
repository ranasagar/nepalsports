import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Wallet, History, Award, ChevronRight, TrendingUp } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

// Mock Data
const HISTORY_DATA = [
    { id: 1, title: 'Daily Login Bonus', points: '+50', date: 'Today, 9:00 AM', type: 'credit' },
    { id: 2, title: 'Prediction Win (NEP vs UAE)', points: '+200', date: 'Yesterday', type: 'credit' },
    { id: 3, title: 'Merch Purchase', points: '-500', date: '20 Nov', type: 'debit' },
    { id: 4, title: 'Fan Army Contribution', points: '+100', date: '19 Nov', type: 'credit' },
];

const BADGES = [
    { id: 1, name: 'Super Fan', icon: '🏆', color: 'bg-yellow-100' },
    { id: 2, name: 'Predictor', icon: '🔮', color: 'bg-purple-100' },
    { id: 3, name: 'Supporter', icon: '🤝', color: 'bg-green-100' },
];

export default function WalletScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="light" />

            {/* Header */}
            <View className="bg-[#0052D4] pt-12 pb-8 px-4 rounded-b-[40px] shadow-xl z-10">
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-xl ml-2">My Wallet 🎒</Text>
                </View>

                {/* Balance Card */}
                <View className="items-center">
                    <Text className="text-blue-200 font-bold uppercase text-sm mb-1">Total Khukuri Points</Text>
                    <View className="flex-row items-end">
                        <Text className="text-5xl font-bold text-white">2,450</Text>
                        <Text className="text-2xl mb-2 ml-1">⚔️</Text>
                    </View>
                    <TouchableOpacity className="mt-4 bg-white/20 px-6 py-2 rounded-full border border-white/30">
                        <Text className="text-white font-bold">Redeem Points</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>

                {/* Badges Section */}
                <Text className="text-gray-800 font-bold text-lg mb-4">My Badges 🎖️</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-8 -mx-4 px-4">
                    {BADGES.map((badge) => (
                        <View key={badge.id} className="mr-4 items-center">
                            <View className={`w-16 h-16 ${badge.color} rounded-full items-center justify-center mb-2 shadow-sm`}>
                                <Text className="text-2xl">{badge.icon}</Text>
                            </View>
                            <Text className="text-gray-600 text-xs font-bold">{badge.name}</Text>
                        </View>
                    ))}
                    <View className="mr-4 items-center opacity-50">
                        <View className="w-16 h-16 bg-gray-100 rounded-full items-center justify-center mb-2 border-2 border-dashed border-gray-300">
                            <Text className="text-2xl text-gray-300">?</Text>
                        </View>
                        <Text className="text-gray-400 text-xs font-bold">Locked</Text>
                    </View>
                </ScrollView>

                {/* Transaction History */}
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-gray-800 font-bold text-lg">History 📜</Text>
                    <TouchableOpacity>
                        <Text className="text-[#0052D4] font-bold text-xs">View All</Text>
                    </TouchableOpacity>
                </View>

                <View className="pb-10">
                    {HISTORY_DATA.map((item, index) => (
                        <Animated.View
                            entering={FadeInDown.delay(index * 100)}
                            key={item.id}
                            className="bg-white p-4 rounded-2xl mb-3 flex-row items-center justify-between shadow-sm border border-gray-50"
                        >
                            <View className="flex-row items-center gap-3">
                                <View className={`w-10 h-10 rounded-full items-center justify-center ${item.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                                    {item.type === 'credit' ? (
                                        <TrendingUp size={18} color="#16A34A" /> // Need to import TrendingUp
                                    ) : (
                                        <Wallet size={18} color="#DC2626" />
                                    )}
                                </View>
                                <View>
                                    <Text className="font-bold text-gray-800">{item.title}</Text>
                                    <Text className="text-gray-400 text-xs">{item.date}</Text>
                                </View>
                            </View>
                            <Text className={`font-bold text-lg ${item.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>
                                {item.points}
                            </Text>
                        </Animated.View>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}

// Import missing icon

