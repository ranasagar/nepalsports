import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ArrowLeft, ShoppingBag, Heart, Search, Filter } from 'lucide-react-native';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48) / 2;

// Mock Data
const MERCH_ITEMS = [
    { id: 1, name: 'Nepal National Jersey 2025', price: 'Rs. 2,500', image: 'https://thejerseynepal.com/images/products/1713681920728_4098.jpg', tag: 'Official' },
    { id: 2, name: 'St. Xaviers Hoodie', price: 'Rs. 1,800', image: 'https://m.media-amazon.com/images/I/71wF7YDIQkL._AC_UY1000_.jpg', tag: 'School' },
    { id: 3, name: 'Khukuri Army Cap', price: 'Rs. 800', image: 'https://m.media-amazon.com/images/I/61Z4lG5vRlL._AC_UY1000_.jpg', tag: 'Limited' },
    { id: 4, name: 'Nepal Cricket Scarf', price: 'Rs. 500', image: 'https://m.media-amazon.com/images/I/61Z4lG5vRlL._AC_UY1000_.jpg', tag: 'Accessory' }, // Placeholder image
];

export default function MerchStoreScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-gray-50">
            <StatusBar style="dark" />

            {/* Header */}
            <View className="bg-white pt-12 pb-4 px-4 shadow-sm z-10">
                <View className="flex-row justify-between items-center mb-4">
                    <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                        <ArrowLeft color="#1F2937" size={24} />
                    </TouchableOpacity>
                    <Text className="text-gray-900 font-bold text-xl">Merch Store 🛍️</Text>
                    <TouchableOpacity className="p-2 -mr-2 relative">
                        <ShoppingBag color="#1F2937" size={24} />
                        <View className="absolute top-1 right-1 w-4 h-4 bg-[#E61E2A] rounded-full items-center justify-center border border-white">
                            <Text className="text-white text-[8px] font-bold">2</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Search Bar */}
                <View className="flex-row gap-3">
                    <View className="flex-1 bg-gray-100 h-12 rounded-xl flex-row items-center px-4">
                        <Search size={20} color="#9CA3AF" />
                        <Text className="text-gray-400 ml-2">Search jerseys, caps...</Text>
                    </View>
                    <TouchableOpacity className="w-12 h-12 bg-gray-900 rounded-xl items-center justify-center">
                        <Filter size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>

                {/* Featured Banner */}
                <View className="w-full h-48 bg-[#0052D4] rounded-3xl mb-8 relative overflow-hidden">
                    <View className="absolute right-0 top-0 w-32 h-full bg-blue-500/30 skew-x-12" />
                    <View className="p-6 justify-center h-full w-2/3">
                        <View className="bg-[#E61E2A] self-start px-3 py-1 rounded-full mb-2">
                            <Text className="text-white text-xs font-bold">NEW ARRIVAL</Text>
                        </View>
                        <Text className="text-white font-bold text-2xl mb-2">Official 2025 Kit</Text>
                        <Text className="text-blue-100 text-xs mb-4">Support the Rhinos with the all-new jersey.</Text>
                        <TouchableOpacity className="bg-white px-6 py-2 rounded-full self-start">
                            <Text className="text-[#0052D4] font-bold text-xs">Shop Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Categories */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6 -mx-4 px-4">
                    {['All', 'Jerseys', 'School Merch', 'Accessories', 'Sale'].map((cat, i) => (
                        <TouchableOpacity key={cat} className={`mr-3 px-5 py-2 rounded-full border ${i === 0 ? 'bg-gray-900 border-gray-900' : 'bg-white border-gray-200'}`}>
                            <Text className={`font-bold ${i === 0 ? 'text-white' : 'text-gray-600'}`}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Grid */}
                <View className="flex-row flex-wrap justify-between pb-20">
                    {MERCH_ITEMS.map((item) => (
                        <TouchableOpacity key={item.id} className="bg-white rounded-2xl p-3 mb-4 shadow-sm border border-gray-100" style={{ width: COLUMN_WIDTH }}>
                            <View className="w-full h-40 bg-gray-50 rounded-xl mb-3 relative">
                                <Image source={{ uri: item.image }} className="w-full h-full rounded-xl" resizeMode="cover" />
                                <TouchableOpacity className="absolute top-2 right-2 w-8 h-8 bg-white/80 rounded-full items-center justify-center backdrop-blur-sm">
                                    <Heart size={16} color="#EF4444" />
                                </TouchableOpacity>
                                <View className="absolute bottom-2 left-2 bg-gray-900/80 px-2 py-1 rounded-md backdrop-blur-sm">
                                    <Text className="text-white text-[10px] font-bold">{item.tag}</Text>
                                </View>
                            </View>
                            <Text className="font-bold text-gray-800 text-sm mb-1" numberOfLines={1}>{item.name}</Text>
                            <Text className="text-[#0052D4] font-bold">{item.price}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}
