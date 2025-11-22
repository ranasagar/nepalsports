import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Share2, MapPin, Users, Trophy, Award, Calendar } from 'lucide-react-native';
import { supabase } from '../../lib/supabase';

const { width } = Dimensions.get('window');

// Mock Data Fallback
const MOCK_SCHOOL_DATA = {
    id: 1,
    name: 'St. Xaviers College',
    district: 'Kathmandu',
    logo_url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/54/St._Xavier%27s_College%2C_Maitighar_Logo.png/220px-St._Xavier%27s_College%2C_Maitighar_Logo.png',
    cover_url: 'https://sxc.edu.np/uploads/slider/1684048845.jpg',
    primary_color: '#003366',
    total_fans: 12500,
    rank: 3,
    bio: 'Dedicated to excellence in education and sports since 1988.',
    trophies: 12,
    athletes: 45
};

const TABS = ['Live', 'Teams', 'Players', 'Gallery', 'Wall'];

export default function SchoolDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [school, setSchool] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Live');

    useEffect(() => {
        fetchSchoolDetails();
    }, [id]);

    async function fetchSchoolDetails() {
        try {
            const { data, error } = await supabase
                .from('schools')
                .select('*')
                .eq('id', id)
                .single();

            if (error || !data) {
                setSchool(MOCK_SCHOOL_DATA);
            } else {
                setSchool(data);
            }
        } catch (e) {
            setSchool(MOCK_SCHOOL_DATA);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-[#F8FBFF]">
                <ActivityIndicator size="large" color="#003087" />
            </View>
        );
    }

    return (
        <View className="flex-1 bg-[#F8FBFF]">
            <StatusBar style="light" />

            {/* Cover Image & Header */}
            <View className="h-64 relative">
                <Image
                    source={{ uri: school.cover_url || 'https://via.placeholder.com/800x400' }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
                <View className="absolute inset-0 bg-black/30" />

                {/* Header Actions */}
                <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center z-10">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 bg-black/20 rounded-full backdrop-blur-md">
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-black/20 rounded-full backdrop-blur-md">
                        <Share2 color="white" size={24} />
                    </TouchableOpacity>
                </View>

                {/* School Info Overlay */}
                <View className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pt-12">
                    <View className="flex-row items-end gap-4">
                        <View className="w-20 h-20 bg-white rounded-2xl p-2 shadow-lg border-2 border-white items-center justify-center">
                            <Image
                                source={{ uri: school.logo_url }}
                                className="w-full h-full"
                                resizeMode="contain"
                            />
                        </View>
                        <View className="flex-1 mb-1">
                            <Text className="text-white font-bold text-xl shadow-sm">{school.name}</Text>
                            <View className="flex-row items-center gap-1">
                                <MapPin size={12} color="rgba(255,255,255,0.8)" />
                                <Text className="text-white/80 text-xs">{school.district}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Stats & Action */}
            <View className="flex-row justify-between items-center px-4 py-4 bg-white border-b border-gray-100">
                <View className="flex-row gap-6">
                    <View className="items-center">
                        <Text className="font-bold text-lg text-gray-900">{school.rank}</Text>
                        <Text className="text-xs text-gray-500 uppercase">Rank</Text>
                    </View>
                    <View className="items-center">
                        <Text className="font-bold text-lg text-gray-900">{school.total_fans?.toLocaleString()}</Text>
                        <Text className="text-xs text-gray-500 uppercase">Fans</Text>
                    </View>
                    <View className="items-center">
                        <Text className="font-bold text-lg text-gray-900">{school.trophies || 0}</Text>
                        <Text className="text-xs text-gray-500 uppercase">Trophies</Text>
                    </View>
                </View>
                <TouchableOpacity className="bg-[#003087] px-4 py-2 rounded-full shadow-md shadow-blue-200">
                    <Text className="text-white text-xs font-bold">Represent</Text>
                </TouchableOpacity>
            </View>

            {/* Tabs */}
            <View className="bg-white border-b border-gray-100">
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className={`mr-6 py-3 ${activeTab === tab ? 'border-b-2 border-[#DC143C]' : ''}`}
                        >
                            <Text className={`${activeTab === tab ? 'text-[#DC143C] font-bold' : 'text-gray-400 font-medium'} text-sm`}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Content Area */}
            <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 40 }}>
                {activeTab === 'Live' && (
                    <View>
                        <Text className="font-bold text-gray-800 mb-3">Live Feed</Text>
                        {/* Feed Item 1 */}
                        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-4">
                            <View className="flex-row items-center gap-3 mb-3">
                                <Image source={{ uri: school.logo_url }} className="w-10 h-10 rounded-full border border-gray-100" />
                                <View>
                                    <Text className="font-bold text-gray-900">{school.name}</Text>
                                    <Text className="text-xs text-gray-400">2 hours ago</Text>
                                </View>
                            </View>
                            <Text className="text-gray-700 text-sm leading-5 mb-3">
                                Victory! Our U-19 Cricket team has secured a place in the district finals after a thrilling win against Budhanilkantha. #GoXaviers
                            </Text>
                            <Image
                                source={{ uri: 'https://p.imgci.com/db/PICTURES/CMS/326200/326262.png' }}
                                className="w-full h-48 rounded-lg mb-3"
                                resizeMode="cover"
                            />
                            <View className="flex-row gap-4 border-t border-gray-50 pt-3">
                                <Text className="text-gray-500 text-xs font-bold">1.2k Likes</Text>
                                <Text className="text-gray-500 text-xs font-bold">45 Comments</Text>
                            </View>
                        </View>
                    </View>
                )}

                {activeTab === 'Teams' && (
                    <View className="items-center justify-center py-10">
                        <Text className="text-gray-400">Teams coming soon</Text>
                    </View>
                )}

                {activeTab === 'Players' && (
                    <View className="items-center justify-center py-10">
                        <Text className="text-gray-400">Player roster coming soon</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}
