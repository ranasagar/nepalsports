import React from 'react';
import { View, Text, Image } from 'react-native';
import { Trophy } from 'lucide-react-native';

interface PlayerOfMatchProps {
    playerName: string;
    teamName: string;
    stats: string;
    imageUrl?: string;
}

export const FloatingPlayerOfMatch: React.FC<PlayerOfMatchProps> = ({
    playerName,
    teamName,
    stats,
    imageUrl,
}) => {
    return (
        <View className="absolute bottom-8 left-4 right-4 bg-white rounded-3xl shadow-2xl p-4 border border-gray-100 flex-row items-center gap-4">
            <View className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#0052D4] bg-gray-200 items-center justify-center">
                {imageUrl ? (
                    <Image source={{ uri: imageUrl }} className="w-full h-full" resizeMode="cover" />
                ) : (
                    <Trophy size={20} color="#0052D4" />
                )}
            </View>

            <View className="flex-1">
                <View className="flex-row items-center gap-2">
                    <Text className="font-bold text-gray-900 text-lg">{playerName}</Text>
                    <View className="bg-yellow-100 px-2 py-0.5 rounded-full border border-yellow-200">
                        <Text className="text-yellow-700 text-[10px] font-bold">POM</Text>
                    </View>
                </View>
                <Text className="text-xs text-gray-500">{teamName}</Text>
                <Text className="text-sm font-bold text-[#0052D4] mt-0.5">{stats}</Text>
            </View>
        </View>
    );
};
