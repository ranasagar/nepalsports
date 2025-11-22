import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { ArrowLeft, Share2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface LiveHeaderProps {
    title: string;
}

export const LiveHeaderWithBack: React.FC<LiveHeaderProps> = ({ title }) => {
    const router = useRouter();

    return (
        <View className="bg-[#0052D4] pt-safe">
            <SafeAreaView>
                <View className="h-14 flex-row items-center justify-between px-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2 -ml-2 rounded-full active:bg-white/10"
                    >
                        <ArrowLeft size={24} color="white" />
                    </TouchableOpacity>

                    <Text className="font-bold text-lg text-white truncate flex-1 text-center mx-4" numberOfLines={1}>
                        {title}
                    </Text>

                    <TouchableOpacity className="p-2 -mr-2 rounded-full active:bg-white/10">
                        <Share2 size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};
