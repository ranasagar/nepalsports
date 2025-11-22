import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Search, MapPin, Trophy, Users } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';

// Mock Data Fallback
const MOCK_SCHOOLS = [
    { id: 1, name: 'St. Xaviers College', district: 'Kathmandu', logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/St._Xavier%27s_College%2C_Maitighar_Logo.png/220px-St._Xavier%27s_College%2C_Maitighar_Logo.png', primary_color: '#003366', total_fans: 12500, rank: 3 },
    { id: 2, name: 'Budhanilkantha School', district: 'Kathmandu', logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Budhanilkantha_School_Logo.png/220px-Budhanilkantha_School_Logo.png', primary_color: '#800000', total_fans: 8900, rank: 5 },
    { id: 3, name: 'Little Angels School', district: 'Lalitpur', logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Little_Angels%27_School_Logo.png/220px-Little_Angels%27_School_Logo.png', primary_color: '#006400', total_fans: 15200, rank: 1 },
];

export default function SchoolsListScreen() {
    const router = useRouter();
    const [schools, setSchools] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchSchools();
    }, []);

    async function fetchSchools() {
        try {
            const { data, error } = await supabase
                .from('schools')
                .select('*')
                .order('rank', { ascending: true });

            if (error || !data || data.length === 0) {
                setSchools(MOCK_SCHOOLS);
            } else {
                setSchools(data);
            }
        } catch (e) {
            setSchools(MOCK_SCHOOLS);
        } finally {
            setLoading(false);
        }
    }

    const filteredSchools = schools.filter(school =>
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.district.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            onPress={() => router.push(`/school/${item.id}`)}
            className="bg-white mb-4 rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
            <View className="h-24 relative" style={{ backgroundColor: item.primary_color || '#003087' }}>
                <View className="absolute -bottom-8 left-6">
                    <View className="w-16 h-16 bg-white rounded-xl p-2 shadow-md border border-gray-100 items-center justify-center">
                        {item.logo_url ? (
                            <Image source={{ uri: item.logo_url }} className="w-full h-full" resizeMode="contain" />
                        ) : (
                            <Trophy size={24} color="gray" />
                        )}
                    </View>
                </View>
            </View>

            <View className="pt-10 px-6 pb-6">
                <View className="flex-row justify-between items-start">
                    <View className="flex-1 mr-2">
                        <Text className="font-bold text-lg text-gray-900 mb-1">{item.name}</Text>
                        <View className="flex-row items-center text-gray-500">
                            <MapPin size={14} color="#6B7280" />
                            <Text className="text-gray-500 text-sm ml-1">{item.district}</Text>
                        </View>
                    </View>
                    <View className="bg-blue-50 px-3 py-1 rounded-full">
                        <Text className="text-[#003087] font-bold text-xs">#{item.rank}</Text>
                    </View>
                </View>

                <View className="flex-row gap-6 mt-4 pt-4 border-t border-gray-50">
                    <View className="flex-row items-center gap-2">
                        <Users size={16} color="#9CA3AF" />
                        <Text className="text-gray-600 font-medium text-sm">{(item.total_fans || 0).toLocaleString()} Fans</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-[#F8FBFF]">
            <StatusBar style="light" />

            {/* Header: Deep Himalayan Blue */}
            <View className="bg-[#003087] pt-12 pb-6 px-4 rounded-b-[30px] shadow-md z-10">
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 bg-white/10 rounded-full">
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-xl ml-3">School Hub</Text>
                </View>

                {/* Search Bar */}
                <View className="bg-white/10 flex-row items-center px-4 py-3 rounded-xl border border-white/20">
                    <Search color="white" size={20} className="opacity-70" />
                    <TextInput
                        placeholder="Search schools..."
                        placeholderTextColor="rgba(255,255,255,0.6)"
                        className="flex-1 ml-3 text-white font-medium"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            {/* Content */}
            {loading ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" color="#003087" />
                </View>
            ) : (
                <FlatList
                    data={filteredSchools}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View className="items-center justify-center py-10">
                            <Text className="text-gray-400">No schools found</Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}
