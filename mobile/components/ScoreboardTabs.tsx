import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface Tab {
    id: string;
    label: string;
}

interface ScoreboardTabsProps {
    activeTab: string;
    onTabChange: (id: string) => void;
}

const tabs: Tab[] = [
    { id: 'live', label: 'Live' },
    { id: 'scorecard', label: 'Scorecard' },
    { id: 'report', label: 'Report' },
    { id: 'squads', label: 'Squads' },
];

export const ScoreboardTabs: React.FC<ScoreboardTabsProps> = ({ activeTab, onTabChange }) => {
    return (
        <View className="bg-white border-b border-gray-200">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.id}
                        onPress={() => onTabChange(tab.id)}
                        className={`
              py-3 px-2 mr-4 border-b-2
              ${activeTab === tab.id
                                ? 'border-[#0052D4]'
                                : 'border-transparent'}
            `}
                    >
                        <Text
                            className={`
                text-sm font-bold
                ${activeTab === tab.id ? 'text-[#0052D4]' : 'text-gray-500'}
              `}
                        >
                            {tab.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};
