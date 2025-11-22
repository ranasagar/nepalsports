import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, Camera, Mic, Send, MapPin } from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Mock Data
const REPORTS = [
    {
        id: 1,
        user: 'Sagar Pun',
        avatar: 'https://i.pravatar.cc/100?img=12',
        time: '2 mins ago',
        text: 'Huge six by Kushal Bhurtel! The crowd is going wild here at TU Ground! 🏟️🔥',
        image: 'https://sxc.edu.np/uploads/slider/1684048845.jpg',
        likes: 45,
        verified: true
    },
    {
        id: 2,
        user: 'Ramesh Thapa',
        avatar: 'https://i.pravatar.cc/100?img=33',
        time: '5 mins ago',
        text: 'Wicket! Sandeep takes the crucial wicket of the UAE captain. Game on! 🏏',
        likes: 120,
        verified: false
    }
];

export default function LiveReportingScreen() {
    const router = useRouter();
    const [reportText, setReportText] = useState('');

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="light" />

            {/* Header */}
            <View className="bg-[#0052D4] pt-12 pb-6 px-4 rounded-b-[30px] shadow-xl z-10">
                <View className="flex-row justify-between items-center mb-4">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                        <ArrowLeft color="white" size={24} />
                    </TouchableOpacity>
                    <View className="items-center">
                        <Text className="text-white font-bold text-lg">Live Ground Report 🎙️</Text>
                        <View className="flex-row items-center opacity-80">
                            <MapPin size={12} color="white" />
                            <Text className="text-white text-xs ml-1">TU Cricket Ground</Text>
                        </View>
                    </View>
                    <View className="w-10" />
                </View>
            </View>

            <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>

                {/* Input Area */}
                <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6">
                    <View className="flex-row gap-3 mb-3">
                        <Image source={{ uri: 'https://i.pravatar.cc/100?img=5' }} className="w-10 h-10 rounded-full bg-gray-200" />
                        <TextInput
                            placeholder="What's happening on the ground?"
                            className="flex-1 text-gray-800 text-base"
                            multiline
                            value={reportText}
                            onChangeText={setReportText}
                        />
                    </View>
                    <View className="flex-row justify-between items-center border-t border-gray-100 pt-3">
                        <View className="flex-row gap-4">
                            <TouchableOpacity>
                                <Camera size={24} color="#0052D4" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Mic size={24} color="#0052D4" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity className={`px-6 py-2 rounded-full ${reportText ? 'bg-[#0052D4]' : 'bg-gray-200'}`}>
                            <Text className={`font-bold ${reportText ? 'text-white' : 'text-gray-400'}`}>Post</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Feed */}
                <Text className="text-gray-800 font-bold text-lg mb-4">Live Updates 🔴</Text>

                {REPORTS.map((report) => (
                    <View key={report.id} className="bg-white p-4 rounded-2xl mb-4 shadow-sm border border-gray-100">
                        <View className="flex-row justify-between items-start mb-2">
                            <View className="flex-row gap-3">
                                <Image source={{ uri: report.avatar }} className="w-10 h-10 rounded-full bg-gray-200" />
                                <View>
                                    <View className="flex-row items-center gap-1">
                                        <Text className="font-bold text-gray-900">{report.user}</Text>
                                        {report.verified && (
                                            <View className="bg-blue-500 rounded-full p-0.5">
                                                <Text className="text-white text-[6px] font-bold px-0.5">✓</Text>
                                            </View>
                                        )}
                                    </View>
                                    <Text className="text-gray-400 text-xs">{report.time}</Text>
                                </View>
                            </View>
                        </View>

                        <Text className="text-gray-800 text-base leading-6 mb-3">{report.text}</Text>

                        {report.image && (
                            <Image source={{ uri: report.image }} className="w-full h-48 rounded-xl mb-3" resizeMode="cover" />
                        )}

                        <View className="flex-row gap-6 border-t border-gray-50 pt-3">
                            <TouchableOpacity className="flex-row items-center gap-1">
                                <Text className="text-xl">🔥</Text>
                                <Text className="text-gray-500 text-xs font-bold">{report.likes}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="flex-row items-center gap-1">
                                <Text className="text-xl">💬</Text>
                                <Text className="text-gray-500 text-xs font-bold">Reply</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

            </ScrollView>
        </View>
    );
}
