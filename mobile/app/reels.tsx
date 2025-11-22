import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Heart, MessageCircle, Share2, MoreVertical, Music } from 'lucide-react-native';
import { supabase } from '../lib/supabase';

const { width, height } = Dimensions.get('window');

// Mock Data Fallback
const MOCK_REELS_DATA = [
    {
        id: '1',
        user: 'CricketNepal',
        avatar: 'https://flagcdn.com/w320/np.png',
        description: 'WHAT A CATCH! 🔥 Dipendra Singh Airee flies like a bird! 🦅 #NepalCricket #CatchOfTheYear',
        video_placeholder: 'https://p.imgci.com/db/PICTURES/CMS/326200/326262.png', // Placeholder for video
        likes: '45.2K',
        comments: '1.2K',
        shares: '5.6K'
    },
    {
        id: '2',
        user: 'SagarPun',
        avatar: 'https://i.pravatar.cc/100?img=12',
        description: 'Winning moment at TU Ground! The atmosphere is electric! ⚡🇳🇵',
        video_placeholder: 'https://sxc.edu.np/uploads/slider/1684048845.jpg',
        likes: '12K',
        comments: '340',
        shares: '890'
    }
];

export default function ViralMomentsScreen() {
    const router = useRouter();
    const [reels, setReels] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetchReels();
    }, []);

    async function fetchReels() {
        try {
            const { data, error } = await supabase
                .from('reels')
                .select('*')
                .order('created_at', { ascending: false });

            if (error || !data || data.length === 0) {
                setReels(MOCK_REELS_DATA);
            } else {
                setReels(data);
            }
        } catch (e) {
            setReels(MOCK_REELS_DATA);
        } finally {
            setLoading(false);
        }
    }

    const renderItem = ({ item }: { item: any }) => (
        <View style={{ width, height: height }} className="relative bg-black">
            <Image
                source={{ uri: item.video_placeholder || item.videoPlaceholder }}
                className="absolute inset-0 w-full h-full opacity-90"
                resizeMode="cover"
            />

            {/* Overlay Gradient */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.9)']}
                className="absolute bottom-0 w-full h-3/4"
            />

            {/* Right Side Actions */}
            <View className="absolute right-4 bottom-32 items-center gap-6">
                <View className="items-center">
                    <TouchableOpacity className="bg-white/10 p-3 rounded-full backdrop-blur-md mb-1 border border-white/20 active:scale-90 transition-transform">
                        <Heart color="white" size={28} />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-xs shadow-sm">{item.likes}</Text>
                </View>
                <View className="items-center">
                    <TouchableOpacity className="bg-white/10 p-3 rounded-full backdrop-blur-md mb-1 border border-white/20 active:scale-90 transition-transform">
                        <MessageCircle color="white" size={28} />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-xs shadow-sm">{item.comments}</Text>
                </View>
                <View className="items-center">
                    <TouchableOpacity className="bg-white/10 p-3 rounded-full backdrop-blur-md mb-1 border border-white/20 active:scale-90 transition-transform">
                        <Share2 color="white" size={28} />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-xs shadow-sm">{item.shares}</Text>
                </View>
                <TouchableOpacity className="bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20 active:scale-90 transition-transform">
                    <MoreVertical color="white" size={28} />
                </TouchableOpacity>
            </View>

            {/* Bottom Info */}
            <View className="absolute bottom-8 left-4 right-20">
                <View className="flex-row items-center mb-3">
                    <Image source={{ uri: item.avatar }} className="w-10 h-10 rounded-full border-2 border-white mr-3" />
                    <Text className="text-white font-bold text-lg shadow-sm">@{item.user}</Text>
                    <TouchableOpacity className="ml-3 bg-[#DC143C] px-4 py-1.5 rounded-full shadow-md shadow-red-900/20">
                        <Text className="text-white text-xs font-bold">Follow</Text>
                    </TouchableOpacity>
                </View>
                <Text className="text-white text-sm leading-5 mb-4 font-medium shadow-sm">{item.description}</Text>

                {/* Music Ticker */}
                <View className="flex-row items-center bg-white/10 self-start px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                    <Music size={14} color="white" className="mr-2" />
                    <Text className="text-white text-xs font-bold">Original Audio - Nepal Sports Hub</Text>
                </View>
            </View>

            {/* Back Button (Absolute) */}
            <TouchableOpacity
                onPress={() => router.back()}
                className="absolute top-12 left-4 bg-black/20 p-2 rounded-full backdrop-blur-md border border-white/10"
            >
                <ArrowLeft color="white" size={24} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View className="flex-1 bg-black">
            <StatusBar style="light" />
            <FlatList
                data={reels}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                decelerationRate="fast"
                snapToInterval={height}
            />
        </View>
    );
}
