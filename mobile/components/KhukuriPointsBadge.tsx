import React from 'react';
import { View, Text } from 'react-native';
import { Star } from 'lucide-react-native';

interface KhukuriPointsBadgeProps {
    points: number;
}

export const KhukuriPointsBadge: React.FC<KhukuriPointsBadgeProps> = ({ points }) => {
    return (
        <View className="flex-row items-center gap-1.5 bg-white/20 px-3 py-1.5 rounded-full border border-white/30">
            <Star size={14} color="#FACC15" fill="#FACC15" />
            <Text className="text-white font-bold text-sm">{points} KP</Text>
        </View>
    );
};
