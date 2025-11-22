import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Calendar } from 'lucide-react-native';
import { supabase } from '../lib/supabase';
import { MatchCard } from '../components/MatchCard';

// Mock Data Fallback
const MOCK_FIXTURES = [
    { id: 1, home_team: 'Nepal', away_team: 'India', home_score: '-', away_score: '-', status: 'Scheduled', date: '2025-11-25T14:00:00Z', home_flag: 'https://flagcdn.com/w80/np.png', away_flag: 'https://flagcdn.com/w80/in.png' },
    { id: 2, home_team: 'Nepal', away_team: 'Pakistan', home_score: '-', away_score: '-', status: 'Scheduled', date: '2025-11-28T14:00:00Z', home_flag: 'https://flagcdn.com/w80/np.png', away_flag: 'https://flagcdn.com/w80/pk.png' },
];

export default function FixturesScreen() {
    const router = useRouter();
    const [fixtures, setFixtures] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFixtures();
    }, []);

    async function fetchFixtures() {
        try {
            const { data, error } = await supabase
                .from('matches')
                .select('*')
                .eq('status', 'Scheduled')
                .order('date', { ascending: true });

            if (error || !data || data.length === 0) {
                console.log('Using mock data for fixtures');
                setFixtures(MOCK_FIXTURES);
            } else {
                setFixtures(data);
            }
        } catch (e) {
            setFixtures(MOCK_FIXTURES);
        } finally {
            setLoading(false);
        }
    }

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => router.push(`/match/${item.id}`)}>
            <View className="mb-2">
                <Text className="text-gray-500 text-xs font-bold mb-1 ml-1">
                    {new Date(item.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </Text>
                <MatchCard
                    team1Name={item.home_team}
                    team1Flag={item.home_flag}
                    team1Score={item.home_score || "-"}
                    team2Name={item.away_team}
                    team2Flag={item.away_flag}
                    team2Score={item.away_score || "-"}
                    status={item.status}
                    target={new Date(item.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                />
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="light" />

            {/* Header */}
            <View className="bg-[#0052D4] pt-12 pb-6 px-4 shadow-lg z-10">
                <View className="flex-row items-center">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-xl ml-2">Upcoming Fixtures</Text>
                </View>
            </View>

            {/* Content */}
            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#0052D4" />
                </View>
            ) : (
                <FlatList
                    data={fixtures}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View className="items-center justify-center py-10">
                            <Calendar size={48} color="#D1D5DB" />
                            <Text className="text-gray-400 mt-4">No upcoming matches scheduled</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}
