import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Play, Pause, SkipForward, SkipBack, Volume2, Radio } from 'lucide-react-native';
import Animated, { useAnimatedStyle, withRepeat, withSequence, withTiming, useSharedValue, Easing } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

import { supabase } from '../lib/supabase';

// Mock Data Fallback
const MOCK_RADIO_STATION = {
    name: 'Khukuri FM 98.2',
    show: 'Live Commentary: Nepal vs UAE',
    host: 'Sandeep Lamichhane',
    listeners: '12.5K',
    image: 'https://img.freepik.com/premium-vector/radio-station-logo-design-template_145155-3422.jpg', // Placeholder
};

export default function RadioScreen() {
    const router = useRouter();
    const [isPlaying, setIsPlaying] = useState(false);
    const [station, setStation] = useState<any>(MOCK_RADIO_STATION);

    React.useEffect(() => {
        fetchStation();
    }, []);

    async function fetchStation() {
        try {
            const { data, error } = await supabase
                .from('radio_stations')
                .select('*')
                .eq('is_active', true)
                .single();

            if (error || !data) {
                setStation(MOCK_RADIO_STATION);
            } else {
                setStation(data);
            }
        } catch (e) {
            setStation(MOCK_RADIO_STATION);
        }
    }

    // Visualizer Animation
    const bar1 = useSharedValue(10);
    const bar2 = useSharedValue(15);
    const bar3 = useSharedValue(8);
    const bar4 = useSharedValue(20);

    React.useEffect(() => {
        if (isPlaying) {
            const config = { duration: 500, easing: Easing.linear };
            bar1.value = withRepeat(withSequence(withTiming(30, config), withTiming(10, config)), -1, true);
            bar2.value = withRepeat(withSequence(withTiming(45, config), withTiming(15, config)), -1, true);
            bar3.value = withRepeat(withSequence(withTiming(25, config), withTiming(8, config)), -1, true);
            bar4.value = withRepeat(withSequence(withTiming(40, config), withTiming(20, config)), -1, true);
        } else {
            bar1.value = withTiming(10);
            bar2.value = withTiming(15);
            bar3.value = withTiming(8);
            bar4.value = withTiming(20);
        }
    }, [isPlaying]);

    const style1 = useAnimatedStyle(() => ({ height: bar1.value }));
    const style2 = useAnimatedStyle(() => ({ height: bar2.value }));
    const style3 = useAnimatedStyle(() => ({ height: bar3.value }));
    const style4 = useAnimatedStyle(() => ({ height: bar4.value }));

    return (
        <View className="flex-1 bg-[#003087]">
            <StatusBar style="light" />

            {/* Background Gradient */}
            <LinearGradient
                colors={['#003087', '#001529']}
                className="absolute inset-0 opacity-90"
            />

            {/* Header */}
            <View className="pt-12 px-4 flex-row justify-between items-center">
                <TouchableOpacity onPress={() => router.back()} className="p-2 bg-white/10 rounded-full">
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>
                <Text className="text-white/80 font-bold text-sm uppercase tracking-widest">Now Playing</Text>
                <TouchableOpacity className="p-2 bg-white/10 rounded-full">
                    <Radio color="white" size={24} />
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View className="flex-1 items-center justify-center px-8">

                {/* Album Art / Visualizer */}
                <View className="w-64 h-64 bg-white/5 rounded-3xl shadow-2xl shadow-black/40 items-center justify-center mb-12 border border-white/10 relative overflow-hidden">
                    <Image source={{ uri: station.image }} className="w-full h-full opacity-60" />
                    <View className="absolute inset-0 items-center justify-center">
                        <View className="flex-row items-end gap-2 h-16">
                            <Animated.View style={style1} className="w-3 bg-[#DC143C] rounded-full" />
                            <Animated.View style={style2} className="w-3 bg-[#DC143C] rounded-full" />
                            <Animated.View style={style3} className="w-3 bg-[#DC143C] rounded-full" />
                            <Animated.View style={style4} className="w-3 bg-[#DC143C] rounded-full" />
                            <Animated.View style={style3} className="w-3 bg-[#DC143C] rounded-full" />
                            <Animated.View style={style2} className="w-3 bg-[#DC143C] rounded-full" />
                            <Animated.View style={style1} className="w-3 bg-[#DC143C] rounded-full" />
                        </View>
                    </View>
                </View>

                {/* Info */}
                <View className="items-center mb-10">
                    <Text className="text-white font-bold text-2xl text-center mb-2 leading-8">{station.show}</Text>
                    <Text className="text-blue-200 font-medium text-lg">{station.name}</Text>
                    <View className="flex-row items-center mt-4 bg-[#DC143C]/20 px-4 py-1.5 rounded-full border border-[#DC143C]/30">
                        <View className="w-2 h-2 bg-[#DC143C] rounded-full mr-2 animate-pulse" />
                        <Text className="text-[#DC143C] text-xs font-bold uppercase">Live • {station.listeners} Listening</Text>
                    </View>
                </View>

                {/* Controls */}
                <View className="flex-row items-center gap-8">
                    <TouchableOpacity>
                        <SkipBack color="white" size={32} className="opacity-50" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setIsPlaying(!isPlaying)}
                        className="w-20 h-20 bg-white rounded-full items-center justify-center shadow-lg shadow-white/20"
                    >
                        {isPlaying ? (
                            <Pause color="#003087" size={32} fill="#003087" />
                        ) : (
                            <Play color="#003087" size={32} fill="#003087" className="ml-1" />
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <SkipForward color="white" size={32} className="opacity-50" />
                    </TouchableOpacity>
                </View>

                {/* Volume */}
                <View className="w-full flex-row items-center gap-4 mt-12 opacity-50">
                    <Volume2 color="white" size={20} />
                    <View className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <View className="w-3/4 h-full bg-white rounded-full" />
                    </View>
                </View>

            </View>
        </View>
    );
}
