import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />

            {/* Header */}
            <View className="pt-16 px-6 flex-row items-center gap-2">
                <TouchableOpacity onPress={() => router.back()}>
                    <Image source={{ uri: 'https://flagcdn.com/w40/np.png' }} className="w-6 h-6" resizeMode="contain" />
                </TouchableOpacity>
                <Text className="text-[#003087] font-bold text-xl font-mukta">NepalSports Hub</Text>
            </View>

            {/* Slanted Carousel Visual */}
            <View className="flex-1 items-center justify-center relative mt-10">
                {/* Center Card (Main) */}
                <View className="w-[260px] h-[400px] rounded-[40px] overflow-hidden shadow-2xl z-20 border-4 border-white">
                    <Image
                        source={{ uri: 'https://img.freepik.com/free-photo/soccer-player-action-stadium_1150-14606.jpg' }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.6)']} className="absolute inset-0" />
                </View>

                {/* Left Card (Slanted) */}
                <View className="absolute left-[-40px] top-20 w-[240px] h-[360px] rounded-[30px] overflow-hidden opacity-60 z-10 transform -rotate-6">
                    <Image
                        source={{ uri: 'https://img.freepik.com/free-photo/cricket-player-action_1150-14607.jpg' }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>

                {/* Right Card (Slanted) */}
                <View className="absolute right-[-40px] top-20 w-[240px] h-[360px] rounded-[30px] overflow-hidden opacity-60 z-10 transform rotate-6">
                    <Image
                        source={{ uri: 'https://img.freepik.com/free-photo/basketball-player-action_1150-14608.jpg' }}
                        className="w-full h-full"
                        resizeMode="cover"
                    />
                </View>
            </View>

            {/* Bottom Section */}
            <View className="px-8 pb-16 pt-8">
                <Text className="text-4xl font-bold text-gray-900 text-center mb-2 font-mukta">Discover</Text>
                <Text className="text-4xl font-bold text-gray-900 text-center mb-4 font-mukta">all about sports</Text>

                <Text className="text-gray-400 text-center text-sm mb-8 px-4 leading-6">
                    The only way to prove that you're a good sport is to lose.
                </Text>

                {/* Pagination Dots */}
                <View className="flex-row justify-center gap-2 mb-8">
                    <View className="w-2 h-2 rounded-full bg-gray-300" />
                    <View className="w-2 h-2 rounded-full bg-[#003087] border border-[#003087]" />
                    <View className="w-2 h-2 rounded-full bg-gray-300" />
                    <View className="w-2 h-2 rounded-full bg-gray-300" />
                </View>

                <TouchableOpacity
                    onPress={() => router.push('/auth')}
                    className="bg-[#003087] w-full py-4 rounded-2xl shadow-lg shadow-blue-200"
                >
                    <Text className="text-white text-center font-bold text-lg">Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
