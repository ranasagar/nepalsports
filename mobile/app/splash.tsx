import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
    const router = useRouter();

    useEffect(() => {
        // Simulate splash duration then navigate to Onboarding
        const timer = setTimeout(() => {
            router.replace('/onboarding');
        }, 3500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View className="flex-1">
            <StatusBar style="light" />
            <LinearGradient
                colors={['#003087', '#001529']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="flex-1 items-center justify-center"
            >
                {/* Lottie Animation Placeholder - In real app, replace with actual khukuri.json */}
                <View className="w-64 h-64 items-center justify-center">
                    {/* Using a generic loading animation for now as we don't have the khukuri.json file yet */}
                    {/* You would import your Lottie file like: source={require('../assets/khukuri.json')} */}
                    <LottieView
                        autoPlay
                        loop={false}
                        source={{ uri: 'https://assets9.lottiefiles.com/packages/lf20_x62chJ.json' }}
                        style={{ width: 200, height: 200 }}
                    />
                </View>

                <Animated.View
                    entering={FadeInUp.delay(1000).duration(1000)}
                    className="absolute bottom-20 items-center"
                >
                    <Text className="text-white text-4xl font-bold tracking-wider font-mukta">
                        NepalSports Hub
                    </Text>
                    <View className="h-1 w-16 bg-[#DC143C] rounded-full mt-2 mb-3" />
                    <Text className="text-white/80 text-lg font-medium">
                        नेपालको खेल, नेपालको गर्व 🇳🇵
                    </Text>
                </Animated.View>
            </LinearGradient>
        </View>
    );
}
