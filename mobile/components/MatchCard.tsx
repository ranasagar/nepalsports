import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface MatchCardProps {
    team1Name: string;
    team1Flag?: string;
    team1Score: string;
    team2Name: string;
    team2Flag?: string;
    team2Score: string;
    status: string;
    target?: string;
    onPress?: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
    team1Name,
    team1Flag,
    team1Score,
    team2Name,
    team2Flag,
    team2Score,
    status,
    target,
    onPress,
}) => {
    const isLive = status === 'LIVE' || status === 'Live';

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={onPress ? 0.7 : 1} className="bg-white rounded-[20px] shadow-sm p-4 border border-gray-100 w-full mb-4">
            {/* Header: Status & League */}
            <View className="flex-row justify-between items-center mb-4">
                <View className={`px-3 py-1 rounded-full flex-row items-center gap-1 ${isLive ? 'bg-red-50' : 'bg-gray-100'}`}>
                    {isLive && <View className="w-2 h-2 rounded-full bg-[#DC143C]" />}
                    <Text className={`${isLive ? 'text-[#DC143C]' : 'text-gray-500'} text-xs font-bold uppercase`}>
                        {status}
                    </Text>
                </View>
                <Text className="text-gray-400 text-xs font-medium">T20 League</Text>
            </View>

            {/* Main Content: Horizontal Layout */}
            <View className="flex-row justify-between items-center px-2">
                {/* Team 1 */}
                <View className="items-center gap-2 flex-1">
                    <View className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 bg-gray-50 items-center justify-center">
                        {team1Flag ? (
                            <Image source={{ uri: team1Flag }} className="w-full h-full" resizeMode="cover" />
                        ) : (
                            <Text className="text-gray-400 font-bold text-lg">{team1Name[0]}</Text>
                        )}
                    </View>
                    <Text className="font-bold text-gray-900 text-sm text-center w-full" numberOfLines={1}>{team1Name}</Text>
                </View>

                {/* Scores */}
                <View className="items-center flex-[1.5]">
                    <Text className="text-2xl font-bold text-[#003087]">{team1Score}</Text>
                    <Text className="text-xs text-gray-400 font-medium my-1">vs</Text>
                    <Text className="text-xl font-bold text-gray-600">{team2Score}</Text>
                </View>

                {/* Team 2 */}
                <View className="items-center gap-2 flex-1">
                    <View className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 bg-gray-50 items-center justify-center">
                        {team2Flag ? (
                            <Image source={{ uri: team2Flag }} className="w-full h-full" resizeMode="cover" />
                        ) : (
                            <Text className="text-gray-400 font-bold text-lg">{team2Name[0]}</Text>
                        )}
                    </View>
                    <Text className="font-bold text-gray-900 text-sm text-center w-full" numberOfLines={1}>{team2Name}</Text>
                </View>
            </View>

            {/* Footer: Target/Result */}
            {target && (
                <View className="mt-4 pt-3 border-t border-gray-50 items-center">
                    <View className="bg-blue-50 px-3 py-1 rounded-full">
                        <Text className="text-[#003087] text-xs font-medium text-center">
                            {target}
                        </Text>
                    </View>
                </View>
            )}
        </TouchableOpacity>
    );
};
